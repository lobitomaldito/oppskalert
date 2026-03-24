#version 300 es
precision highp float;

uniform vec2 resolution;
uniform float time;

out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);
    float d = length(uv);
    float pulse = sin(d * 10.0 - time * 2.0) * 0.5 + 0.5;
    
    vec3 col = mix(vec3(0.0), vec3(0.2, 0.4, 0.8), pulse);
    
    // Create a 3D-like folding/waving effect based on the provided image
    float wave = sin(uv.x * 5.0 + time) * cos(uv.y * 5.0 - time);
    col += vec3(wave * 0.2);
    
    // Add specular highlight for the "folded paper" look
    float highlight = max(0.0, sin(uv.x * 10.0 - time * 3.0) * cos(uv.y * 10.0 + time * 2.0));
    col += vec3(highlight * 0.5);

    // Fade edges
    col *= smoothstep(0.5, 0.2, length(uv));

    // Convert to grayscale for the Brutalist style
    float gray = dot(col, vec3(0.299, 0.587, 0.114));
    
    // Invert for white-on-black or black-on-white depending on background
    fragColor = vec4(vec3(1.0 - gray), 1.0);
}
