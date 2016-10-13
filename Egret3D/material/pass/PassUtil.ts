module egret3d {

    export enum PassType { diffusePass, colorPass, normalPass, shadowPass, lightPass, matCapPass, depthPass_8, depthPass_32, CubePass, Gbuffer , PickPass  }

    export class PassUtil{
        public static PassAuto : boolean[] = [true,true,true,false,false,true,true,true,true,true];
        public static CreatPass(pass: PassType,materialData:MaterialData):MaterialPass[] {
            switch (pass) {
                case PassType.colorPass:
                    materialData.shaderPhaseTypes[PassType.colorPass] = []; 
                    return [new ColorPass(materialData)];

                case PassType.diffusePass:
                    materialData.shaderPhaseTypes[PassType.diffusePass] = []; 
                    return [new DiffusePass(materialData)];

                case PassType.shadowPass:
                    materialData.shaderPhaseTypes[PassType.shadowPass] = []; 
                    return [new ShadowPass(materialData)];

                case PassType.depthPass_8:
                    materialData.shaderPhaseTypes[PassType.depthPass_8] = []; 
                    return [new PositionPass(materialData)];

                case PassType.normalPass:
                    materialData.shaderPhaseTypes[PassType.normalPass] = [];
                    return [new NormalPass(materialData)];

                case PassType.Gbuffer:
                    materialData.shaderPhaseTypes[PassType.Gbuffer] = [];
                    return [new GbufferPass(materialData)];

                case PassType.PickPass:
                    materialData.shaderPhaseTypes[PassType.PickPass] = [];
                    return [new PickPass(materialData)];
            }
            return null;
        }
    }
}