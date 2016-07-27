module egret3d {
  
    /**
    * @private
    */
    export enum TextureMethodType {
        diffuse,
        normal,
        specular,
        color,
        shadow
    }

    /**
    * @private
    */
    export enum ShaderPhaseType {
        start_vertex,
        local_vertex,
        global_vertex,
        end_vertex,

        start_fragment,
        materialsource_fragment,
        diffuse_fragment,
        normal_fragment,
        matCap_fragment,
        specular_fragment,
        shadow_fragment,
        lighting_fragment,
        multi_end_fragment,
        end_fragment,
    }
}