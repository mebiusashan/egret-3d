uniform mat4 uniform_modelMatrix;
uniform mat4 uniform_viewMatrix;

varying vec4 varying_mvPose;
void main() {
       varying_mvPose = uniform_modelMatrix * uniform_viewMatrix * vec4(e_position, 1.0) ; 
}

                      