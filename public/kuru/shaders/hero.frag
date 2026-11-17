precision highp float;
uniform float uTime;uniform vec2 uRes;uniform vec2 uMouse;
// The brand primary (--kuru-primary); every tone below is derived from it.
uniform vec3 uPrimary;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
vec3 field(vec2 uv){
 float t=uTime*0.3;vec2 m=(uMouse-0.5);
 float yr=sin(uv.y*2.3-t*0.6)+0.6*sin(uv.y*1.1+t*0.35+1.7);
 float phase=t*0.7+m.x*2.0;
 float w=sin(uv.x*8.5+yr*1.4+phase)*0.6+sin(uv.x*4.5-yr*0.8+phase*0.55)*0.45+sin(uv.x*15.0+yr*0.5-phase*0.3)*0.2;
 float f=w*0.5+0.5;
 f=pow(clamp(f,0.,1.),2.0);
 vec2 asp=vec2(uRes.x/uRes.y,1.);
 float d=distance(uv*asp,uMouse*asp);
 f+=smoothstep(0.5,0.0,d)*0.5;
 vec3 deep=uPrimary*uPrimary;
 vec3 c0=deep*0.18,c1=deep*0.5,c2=uPrimary;
 vec3 col=mix(c0,c1,smoothstep(0.15,0.6,f));
 col=mix(col,c2,smoothstep(0.72,1.02,f));
 vec3 A=deep*0.27;
 vec3 B=uPrimary*0.69;
 vec3 C=deep*0.4;
 col=mix(col,A,0.20*smoothstep(0.55,0.05,f));
 col=mix(col,C,0.05*smoothstep(0.25,0.75,f));
 col=mix(col,B,0.07*smoothstep(0.65,1.0,f));
 col=mix(col,vec3(0.0),smoothstep(0.10,0.0,f)*0.2);
 return col;
}
void main(){
 vec2 uv=gl_FragCoord.xy/uRes.xy;
 float rods=30.0;
 float x=uv.x*rods;float id=floor(x);float lens=fract(x)-0.5;
 float center=(id+0.5)/rods;
 float mag=1.7;float bend=lens-(lens*lens*lens)*0.6;
 float sx=center+bend*(mag/rods);
 float disp=lens*(2.0/rods);
 vec3 col=vec3(field(vec2(sx+disp,uv.y)).r,field(vec2(sx,uv.y)).g,field(vec2(sx-disp,uv.y)).b);
 col+=pow(max(0.,1.0-abs(lens)*2.35),10.0)*0.18;
 col*=1.0-smoothstep(0.37,0.5,abs(lens))*0.28;
 col+=(hash(gl_FragCoord.xy*1.3)-0.5)*0.02;
 gl_FragColor=vec4(col,1.0);
}
