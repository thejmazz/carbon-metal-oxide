#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

uniform float time;

varying vec3 pos;

void main() {
    vec3 color;
    color = pos * sin(time) + 0.2;

    /* color = snoise3(pos); */
    color = vec3(snoise4(vec4(pos, time * 0.25))) * 0.25 + vec3(0.72, 0.88, 0.23);

    /* color = mix() */

    gl_FragColor = vec4(color, 1.0);
}
