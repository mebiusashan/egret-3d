#extension GL_OES_standard_derivatives : enable
vec3 flatNormal(vec3 pos){
    vec3 fdx = dFdx(pos);
    vec3 fdy = dFdy(pos);
    return normalize(cross(fdx, fdy));
}