"use client";

import * as React from "react";

export function HeroCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return;

    let running = true;
    let animationFrameId = 0;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;

    const pointer = [0.72, 0.5];
    const target = [0.72, 0.5];
    let isVisible = true;
    let lastTime = 0;
    const startTime = performance.now();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fetch and compile shader
    fetch("/kuru/shaders/hero.frag")
      .then((res) => {
        if (!res.ok) throw new Error("Shader unavailable");
        return res.text();
      })
      .then((fragmentSource) => {
        if (!running || !canvas.isConnected) return;

        function compileShader(type: number, source: string): WebGLShader | null {
          const shader = gl!.createShader(type);
          if (!shader) return null;
          gl!.shaderSource(shader, source);
          gl!.compileShader(shader);
          if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
            gl!.deleteShader(shader);
            return null;
          }
          return shader;
        }

        const vertexShader = compileShader(
          gl.VERTEX_SHADER,
          "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}"
        );
        const pixelShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);

        if (!vertexShader || !pixelShader) return;

        program = gl.createProgram();
        if (!program) return;

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, pixelShader);
        gl.linkProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(pixelShader);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

        gl.useProgram(program);

        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 3, -1, -1, 3]),
          gl.STATIC_DRAW
        );

        const positionLocation = gl.getAttribLocation(program, "p");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const uTimeLocation = gl.getUniformLocation(program, "uTime");
        const uResLocation = gl.getUniformLocation(program, "uRes");
        const uMouseLocation = gl.getUniformLocation(program, "uMouse");
        const uPrimaryLocation = gl.getUniformLocation(program, "uPrimary");

        // Primary brand green #6fff54 -> [0.435, 1.0, 0.329]
        gl.uniform3fv(uPrimaryLocation, new Float32Array([0.43529, 1.0, 0.32941]));

        function draw(seconds: number) {
          if (!gl || !program) return;
          gl.uniform1f(uTimeLocation, seconds);
          gl.uniform2f(uResLocation, canvas!.width, canvas!.height);
          gl.uniform2f(uMouseLocation, pointer[0], pointer[1]);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
          canvas!.style.opacity = "1";
        }

        function resize() {
          if (!canvas || !gl) return;
          const scale = Math.min(
            1,
            Math.sqrt(650000 / Math.max(1, canvas.clientWidth * canvas.clientHeight))
          );
          canvas.width = Math.max(2, Math.round(canvas.clientWidth * scale));
          canvas.height = Math.max(2, Math.round(canvas.clientHeight * scale));
          gl.viewport(0, 0, canvas.width, canvas.height);
          draw(reducedMotion ? 0 : (performance.now() - startTime) / 1000);
        }

        function tick(now: number) {
          if (!running) return;
          animationFrameId = requestAnimationFrame(tick);
          if (now - lastTime < 1000 / 30) return; // 30 FPS cap
          lastTime = now;

          pointer[0] += (target[0] - pointer[0]) * 0.06;
          pointer[1] += (target[1] - pointer[1]) * 0.06;
          draw((now - startTime) / 1000);
        }

        function handlePointerMove(e: PointerEvent) {
          const bounds = canvas!.getBoundingClientRect();
          target[0] = (e.clientX - bounds.left) / bounds.width;
          target[1] = 1 - (e.clientY - bounds.top) / bounds.height;
        }

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);

        const intersectionObserver = new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !document.hidden && !reducedMotion) {
            animationFrameId = requestAnimationFrame(tick);
          } else {
            cancelAnimationFrame(animationFrameId);
          }
        });
        intersectionObserver.observe(canvas);

        window.addEventListener("pointermove", handlePointerMove, { passive: true });

        resize();
        if (isVisible && !reducedMotion) {
          animationFrameId = requestAnimationFrame(tick);
        }
      })
      .catch((err) => {
        console.warn("Hero WebGL shader skipped:", err);
      });

    return () => {
      running = false;
      cancelAnimationFrame(animationFrameId);
      if (gl) {
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="kuru-hero-background pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}

