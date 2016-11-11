#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

uniform float time;

varying vec3 pos;

/* vec3 rgbToHex (in float r, in float g, in float b) { */
/*     return vec3(r / 255.0, g / 255.0, b / 255.0); */
/* } */

void main() {
    vec3 color;
    color = pos * sin(time) + 0.2;

    vec3 green = vec3(0.72, 0.88, 0.23);
    vec3 blue = vec3(46.0 / 255.0, 190.0 / 255.0, 245.0 / 255.0);

    /* color = snoise3(pos); */
    /* color = vec3(snoise4(vec4(pos, time * 0.25))) * 0.25 + green; */

    /* color = abs(vec3(snoise4(vec4(pos*16.0, time * 0.25)))) + green; */

    float noise = snoise3(vec3(pos*16.0 + time * 0.05));
    float baseNoise = snoise4(vec4(pos * 0.5, time * 0.25)) * 0.25;

    if (noise > 0.5) {
        color = blue;
    } else {
        color = vec3(baseNoise) + green;
    }


    /* 46, 190, 245 / */

    /* color = mix() */

    gl_FragColor = vec4(color, 1.0);
}
