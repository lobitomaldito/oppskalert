import React, { useRef, useEffect } from 'react';

const vertexShaderSource = `#version 300 es
precision highp float;
in vec4 position;
void main() {
  gl_Position = position;
}
`;

const fragmentShaderSource = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
*/
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define S smoothstep
#define N normalize
#define MN min(R.x,R.y)
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
#define PI radians(180.)

float box(vec3 p, vec3 s, float r) {
	p=abs(p)-s+r;
	return length(max(p,.0))+min(.0,max(max(p.x,p.y),p.z))-r;
}
float map(vec3 p) {
	p.y=abs(p.y)-2.875;
	p.y-=sin(T*2.-p.z*.25)*2.75;
	p.xz*=rot(PI/4.);
	float d=box(p,vec3(10,.1,10),.005);
	return d*.5;
}
bool march(inout vec3 p, vec3 rd) {
	for (int i=0; i<400; i++) {
		float d=map(p);
		if (abs(d)<1e-2) return true;
		if (d>40.) return false;
		p+=rd*d;
	}
    return false;
}
vec3 norm(vec3 p) {
	float h=1e-2; vec2 k=vec2(-1,1);
	return N(
		k.xyy*map(p+k.xyy*h)+
		k.yxy*map(p+k.yxy*h)+
		k.yyx*map(p+k.yyx*h)+
		k.xxx*map(p+k.xxx*h)
	);
}
float shadow(vec3 p, vec3 lp) {
	float shd=1., maxd=length(lp-p);
	vec3 l=N(lp-p);
	for (float i=1e-2; i<maxd;) {
		float d=map(p+l*i);
		if (abs(d)<1e-2) {
			shd=.0;
			break;
		}
		shd=min(shd,128.*d/i);
		i+=d;
	}
	return shd;
}
float calcAO(vec3 p, vec3 n) {
	float occ=.0, sca=1.;
	for (float i=.0; i<5.; i++) {
		float
		h=.01+i*.09,
		d=map(p+h*n);
		occ+=(h-d)*sca;
		sca*=.55;
		if (occ>.35) break;
	}
	return clamp(1.-3.*occ,.0,1.)*(.5+.5*n.y);
}
vec3 render(vec2 uv) {
	vec3 col=vec3(1),
	p=vec3(0,0,-30),
	rd=N(vec3(uv,1));
	if (march(p,rd)) {
		col=vec3(0);
		vec3 n=norm(p), lp=vec3(0,10,-20), l=N(lp-p);
		float dif=clamp(dot(l,n),.0,1.), ao=calcAO(p,n),
		shd=shadow(p+n*5e-2,lp), spe=pow(clamp(dot(reflect(rd,n),l),.0,1.),15.),
		fre=pow(clamp(1.+dot(rd,n),.0,1.),5.);
		col+=.5+dif*dif*shd*ao;
		col=mix(spe*vec3(1),col,fre);
		col=tanh(col*col);
		col=pow(col,vec3(.4545));
	}
	return col;
}
#define AA
void main() {
	vec2 uv=(FC-.5*R)/MN;
	vec3 col=render(uv);
	#ifdef AA
	for (float x=.0; x<=1.; x++) {
		for (float y=.0; y<=1.; y++)
			col+=render(uv+(vec2(x,y)-.5)/R);
	}
	col/=5.;
	#endif
	col=S(1.2,-.2,col);
    O=vec4(col,1);
}
`;

const WavingCanvas = ({ className = "" }) => {
    const canvasRef = useRef(null);
    const requestRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl2');

        if (!gl) {
            console.error('WebGL2 not supported');
            return;
        }

        // Compile Shader Function
        const compileShader = (type, source) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compile error:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        // Create Program
        const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
            return;
        }

        gl.useProgram(program);

        const vertices = new Float32Array([
            -1, 1,
            -1, -1,
            1, 1,
            1, -1
        ]);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const resolutionLocation = gl.getUniformLocation(program, "resolution");
        const timeLocation = gl.getUniformLocation(program, "time");

        const resize = () => {
            // Limit pixel ratio to 2 for performance on high-DPI
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        };

        window.addEventListener('resize', resize);
        resize();

        const startTime = performance.now();
        const render = (time) => {
            const elapsedTime = (time - startTime) / 1000.0;

            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform1f(timeLocation, elapsedTime);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            requestRef.current = requestAnimationFrame(render);
        };

        requestRef.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(requestRef.current);
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.deleteBuffer(buffer);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`w-full h-full block ${className}`}
            style={{ touchAction: 'none' }}
        />
    );
};

export default WavingCanvas;
