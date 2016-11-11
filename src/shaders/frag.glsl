uniform float time;

varying vec3 pos;

void main() {
    vec3 color;
    color = pos * sin(time) + 0.2;

    gl_FragColor = vec4(color, 1.0);
}
