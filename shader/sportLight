lightingInfo computeSpotLighting(vec3 viewDirectionW, vec3 vNormal, vec4 lightData, vec4 lightDirection, vec3 diffuseColor, vec3 specularColor, float range, float roughness, float NdotV) {
    lightingInfo result;

    vec3 direction = lightData.xyz - vPositionW;
    vec3 lightVectorW = normalize(direction);
    float attenuation = max(0., 1.0 - length(direction) / range);

    // diffuse
    float cosAngle = max(0.0000001, dot(-lightDirection.xyz, lightVectorW));
    float spotAtten = 0.0;

    if (cosAngle >= lightDirection.w)
    {
        cosAngle = max(0., pow(cosAngle, lightData.w));
        spotAtten = clamp((cosAngle - lightDirection.w) / (1. - cosAngle), 0.0, 1.0);

        // Diffuse
        vec3 H = normalize(viewDirectionW - lightDirection.xyz);
        float NdotL = max(0.00000000001, dot(vNormal, -lightDirection.xyz));
        float VdotH = clamp(dot(viewDirectionW, H), 0.00000000001, 1.0);

        float diffuseTerm = computeDiffuseTerm(NdotL, NdotV, VdotH, roughness);
        result.diffuse = diffuseTerm * diffuseColor * attenuation * spotAtten;

#ifdef SPECULARTERM
        // Specular
        float NdotH = max(0.00000000001, dot(vNormal, H));

        vec3 specTerm = computeSpecularTerm(NdotH, NdotL, NdotV, VdotH, roughness, specularColor);
        result.specular = specTerm  * attenuation * spotAtten;
#endif

        return result;
    }

    result.diffuse = vec3(0.);
#ifdef SPECULARTERM
    result.specular = vec3(0.);
#endif

    return result;
}