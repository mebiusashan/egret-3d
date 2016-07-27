module egret3d {

    export enum PassType { diffusePass, colorPass, normalPass, shadowPass, lightPass, matCapPass, depthPass_8, depthPass_32, CubePass }

    export class PassUtil{
        public static PassAuto : boolean[] = [true,true,true,false,false,true,true,true];
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
                case PassType.matCapPass:
                    materialData.shaderPhaseTypes[PassType.matCapPass] = []; 
                    return [new MatCapPass(materialData)];
                case PassType.CubePass:
                    materialData.shaderPhaseTypes[PassType.diffusePass] = [];
                    return [new CubePass(materialData)];
            }
            return null;
        }
    }
}