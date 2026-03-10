import React, { useRef, useEffect } from 'react';

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// A faithful recreation of the visual "folding/waving paper" effect from the screenshot
// Optimized for black and white brutalist aesthetic
const fragmentShaderSource = `
  precision highp float;
  uniform vec2 resolution;
  uniform float time;

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);
    
    // Core wave math to create the folded paper/infinity shape
    float x = uv.x * 3.0;
    float y = uv.y * 3.0;
    
    // Create the dual overlapping waves
    float wave1 = sin(x - time) * 0.5;
    float wave2 = sin(x + time) * 0.5;
    
    // Thickness of the "paper" edge
    float edgeThickness = 0.05;
    
    // Calculate distance to the waves
    float dist1 = abs(y - wave1);
    float dist2 = abs(y - wave2);
    
    // Create the solid shapes with smooth edges
    float shape1 = smoothstep(edgeThickness, 0.0, dist1);
    float shape2 = smoothstep(edgeThickness, 0.0, dist2);
    
    // Fill the area between the waves to create the folded volume
    float volume = 0.0;
    if ((y < wave1 && y > wave2) || (y > wave1 && y < wave2)) {
       volume = 1.0;
    }
    
    // Combine and add shading
    float shadowDist = min(dist1, dist2);
    float shading = 1.0 - smoothstep(0.0, 0.5, shadowDist + (sin(x + time*0.5)*0.2));
    
    // Compute final color (using whites/grays for the volume, dark for background)
    vec3 color = vec3(0.0); // Background dark
    
    if (shape1 > 0.0 || shape2 > 0.0 || volume > 0.0) {
      // The surface of the wave
      float bright = 0.8 + shading * 0.2; // Base white/gray
      
      // Add a subtle specular highlight on the crests
      float highlight = pow(max(0.0, sin(x*2.0 - time*2.0)), 4.0) * 0.3;
      
      color = vec3(bright + highlight);
    }
    
    // Masking the edges so it doesn't span infinitely (like a pill/capsule mask)
    float mask = smoothstep(1.2, 0.8, length(vec2(x*0.4, y)));
    color *= mask;

    // Output final color (we invert since we want it on a dark background usually, or adapt)
    // The design system is black and white brutalist, so we want the object to be bright on dark
    gl_FragColor = vec4(color, mask);
  }
`;

const WavingCanvas = ({ className = "" }) => {
    const canvasRef = useRef(null);
    const requestRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!gl) {
            console.error('WebGL not supported');
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

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
            return;
        }

        gl.useProgram(program);

        // Setup coordinates (full screen quad)
        const vertices = new Float32Array([
            -1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
            -1.0, 1.0, 1.0, -1.0, 1.0, 1.0
        ]);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Get uniform locations
        const resolutionLocation = gl.getUniformLocation(program, "resolution");
        const timeLocation = gl.getUniformLocation(program, "time");

        const resize = () => {
            // Use devicePixelRatio for crisp rendering
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            // gl.viewport MUST be synchronized with canvas.width/height
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        };

        window.addEventListener('resize', resize);
        resize();

        // Render loop
        const startTime = performance.now();
        const render = (time) => {
            // time in ms
            const elapsedTime = (time - startTime) / 1000.0;

            // Clear with transparent black
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform1f(timeLocation, elapsedTime);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestRef.current = requestAnimationFrame(render);
        };

        requestRef.current = requestAnimationFrame(render);

        // Cleanup
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
