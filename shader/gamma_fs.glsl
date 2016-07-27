
const float gamma = 2.2;

float toLinear_float_v1(float v) {
  return pow(v, gamma);
}

vec2 toLinear_vec2_v1(vec2 v) {
  return pow(v, vec2(gamma));
}

vec3 toLinear_vec3_v1(vec3 v) {
  return pow(v, vec3(gamma));
}

vec4 toLinear_vec4_v1(vec4 v) {
  return vec4(toLinear_vec3_v1(v.rgb), v.a);
}

float toGamma_float_v2(float v) {
  return pow(v, 1.0 / gamma);
}

vec2 toGamma_vec2_v2(vec2 v) {
  return pow(v, vec2(1.0 / gamma));
}

vec3 toGamma_vec3_v2(vec3 v) {
  return pow(v, vec3(1.0 / gamma));
}

vec4 toGamma_vec4_v2(vec4 v) {
  return vec4(toGamma_vec3_v2(v.rgb), v.a);
}

vec4 textureLinear(sampler2D uTex, vec2 uv) {
  return toLinear_vec4_v1(texture2D(uTex, uv));
}