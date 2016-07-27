vec2 quadratic_bezier(vec2 A, vec2 B, vec2 C, float t)
{
    vec2 D = mix(A, B, t);
    vec2 E = mix(B, C, t); 

    return mix(D, E, t);
}

vec2 cubic_bezier(vec2 A, vec2 B, vec2 C, vec2 D, float t)
{
    vec2 E = mix(A, B, t);
    vec2 F = mix(B, C, t);
    vec2 G = mix(C, D, t);

    return quadratic_bezier(E, F, G, t);
}