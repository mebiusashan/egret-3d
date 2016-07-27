varying vec4 varying_pos;
void main() {
       varying_pos = uniform_modelMatrix * uniform_viewMatrix * vec4(e_position, 1.0) ; 
}

                      