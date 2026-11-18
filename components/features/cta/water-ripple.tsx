"use client";

import * as React from "react";

const VERTEX = `attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }`;

const FRAGMENT = `precision highp float;
uniform vec3 u_colors[4];
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_cursor;

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 palette(float x) {
  float f = clamp(x, 0.0, 1.0) * 3.0;
  vec3 col = mix(u_colors[0], u_colors[1], smoothstep(0.0, 1.0, clamp(f, 0.0, 1.0)));
  col = mix(col, u_colors[2], smoothstep(0.0, 1.0, clamp(f - 1.0, 0.0, 1.0)));
  return mix(col, u_colors[3], smoothstep(0.0, 1.0, clamp(f - 2.0, 0.0, 1.0)));
}

vec3 shade(vec2 p, float t) {
  vec2 q = p * 2.44;
  float field = 0.0;
  float weight = 0.55;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    q += vec2(
      sin(q.y * (1.7 + fi * 0.09) + t * (0.35 + fi * 0.04) + 1.0),
      cos(q.x * (1.5 + fi * 0.11) - t * (0.28 + fi * 0.03))
    ) * 0.269;
    field += weight / (0.08 + abs(sin(q.x + q.y + fi * 0.72)));
    weight *= 0.62;
    q = q.yx * vec2(-1.08, 1.04);
  }
  return palette(1.0 - exp(-field * 0.0292));
}

void main() {
  float unit = min(u_resolution.x, u_resolution.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / unit;
  if (u_cursor.z > 0.001) {
    vec2 cursor = 0.5 * u_cursor.xy * u_resolution.xy / unit;
    vec2 delta = p - cursor;
    float dist = length(delta);
    float mask = u_cursor.z * (1.0 - smoothstep(0.0, 0.46, dist));
    float wave = sin(dist / 0.46 * 18.0 - u_time * 5.0);
    p -= delta / max(dist, 0.0001) * wave * mask * 0.0315;
  }
  p *= 1.26;
  p += 0.204 * vec2(sin(u_time * 0.31), cos(u_time * 0.23));
  vec3 col = shade(p, u_time);
  col += (grainHash(gl_FragCoord.xy + vec2(17.0, 31.0)) - 0.5) * 0.098;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

const DARK_PALETTE = [
  0.0, 0.0, 0.0,
  0.17, 0.17, 0.17,
  0.5, 0.5, 0.5,
  0.95, 0.95, 0.95,
];

const LIGHT_PALETTE = [
  1.0, 1.0, 1.0,
  0.78, 0.78, 0.78,
  0.36, 0.36, 0.36,
  0.05, 0.05, 0.05,
];

export function WaterRipple() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const vertex = compile(gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uColors = gl.getUniformLocation(program, "u_colors");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uCursor = gl.getUniformLocation(program, "u_cursor");

    const applyPalette = () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      gl.uniform3fv(uColors, new Float32Array(isLight ? LIGHT_PALETTE : DARK_PALETTE));
    };
    applyPalette();

    const themeObserver = new MutationObserver(applyPalette);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    let frame = 0;
    let running = true;
    let isVisible = true;
    const start = performance.now();
    let last = 0;

    let target = { x: 0, y: 0, z: 0 };
    let cursor = { x: 0, y: 0, z: 0 };

    function resize() {
      if (!canvas || !gl) return;
      const rect = canvas.getBoundingClientRect();
      const scale = Math.min(1, Math.sqrt(700000 / Math.max(1, rect.width * rect.height)));
      canvas.width = Math.max(2, Math.round(rect.width * scale));
      canvas.height = Math.max(2, Math.round(rect.height * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function draw(now: number) {
      if (!running || !isVisible || document.hidden) return;
      frame = requestAnimationFrame(draw);
      if (now - last < 1000 / 30) return;
      last = now;

      cursor.x += (target.x - cursor.x) * 0.1;
      cursor.y += (target.y - cursor.y) * 0.1;
      cursor.z += (target.z - cursor.z) * 0.1;

      gl!.uniform2f(uResolution, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, ((now - start) / 1000) * 0.86);
      gl!.uniform3f(uCursor, cursor.x, cursor.y, cursor.z);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      canvas!.style.opacity = "1";
    }

    function onPointerMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (inside) {
        target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        target.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        target.z = 1;
      } else {
        target.z = 0;
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) frame = requestAnimationFrame(draw);
      else cancelAnimationFrame(frame);
    });
    intersectionObserver.observe(canvas);

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    resize();
    frame = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("mousemove", onPointerMove);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className="kuru-closing-ripple pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden opacity-60">
      <canvas
        ref={canvasRef}
        data-kuru-ripple=""
        className="h-full w-full opacity-0 transition-opacity duration-700"
        aria-hidden="true"
      />
    </div>
  );
}
