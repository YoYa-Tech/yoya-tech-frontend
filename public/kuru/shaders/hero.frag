precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
// YoYa Tech Cobalt Royal Blue
uniform vec3 uPrimary;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec3 field(vec2 uv){
  float t = uTime * 0.28;
  vec2 m = uMouse - 0.5;
  float yr = sin(uv.y * 2.3 - t * 0.6) + 0.6 * sin(uv.y * 1.1 + t * 0.35 + 1.7);
  float phase = t * 0.7 + m.x * 1.8;
  float w = sin(uv.x * 8.5 + yr * 1.4 + phase) * 0.6 + sin(uv.x * 4.5 - yr * 0.8 + phase * 0.55) * 0.45 + sin(uv.x * 15.0 + yr * 0.5 - phase * 0.3) * 0.2;
  float f = w * 0.5 + 0.5;
  f = pow(clamp(f, 0.0, 1.0), 2.0);

  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  float d = distance(uv * asp, uMouse * asp);
  // Smooth hover bloom under the cursor — strictly cyan-blue radiance
  float hover = smoothstep(0.48, 0.0, d);
  f += hover * 0.42;

  // Strict YoYa Tech brand palette: Deep Space Navy -> Dark Cobalt -> Royal Blue -> Electric Cyan -> Ice Glow
  vec3 cBase = vec3(0.008, 0.024, 0.071);
  vec3 cNavy = vec3(0.012, 0.10, 0.32);
  vec3 cRoyal = uPrimary; // [0.00784, 0.36471, 0.92941]
  vec3 cCyan = vec3(0.12, 0.62, 1.0);
  vec3 cGlow = vec3(0.35, 0.82, 1.0);

  vec3 col = mix(cBase, cNavy, smoothstep(0.12, 0.50, f));
  col = mix(col, cRoyal, smoothstep(0.50, 0.85, f));
  col = mix(col, cCyan, smoothstep(0.85, 1.15, f) * 0.75);
  col = mix(col, cGlow, hover * smoothstep(0.70, 1.25, f) * 0.55);

  return col;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  float rods = 30.0;
  float x = uv.x * rods;
  float id = floor(x);
  float lens = fract(x) - 0.5;
  float center = (id + 0.5) / rods;
  float mag = 1.7;
  float bend = lens - (lens * lens * lens) * 0.6;
  float sx = center + bend * (mag / rods);

  // Sample unified color field without chromatic aberration channel split
  vec3 col = field(vec2(sx, uv.y));
  col += pow(max(0.0, 1.0 - abs(lens) * 2.35), 10.0) * 0.16;
  col *= 1.0 - smoothstep(0.37, 0.5, abs(lens)) * 0.28;
  col += (hash(gl_FragCoord.xy * 1.3) - 0.5) * 0.02;

  gl_FragColor = vec4(col, 1.0);
}
