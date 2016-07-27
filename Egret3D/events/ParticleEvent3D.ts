module egret3d {

    /**
    * @private
    * @language zh_CN
    * @class egret3d.ParticleEvent3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParticleEvent3D extends Event3D {

        /**
         * @language zh_CN
         * EMIT_PARTICLE_BIRTH 常量定义 一个子粒子出生
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static EMIT_PARTICLE_BIRTH: string = "EMIT_PARTICLE_BIRTH";

        /**
         * @language zh_CN
         * EMIT_PARTICLE_DEATH 常量定义 一个子粒子死亡
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static EMIT_PARTICLE_DEATH: string = "EMIT_PARTICLE_DEATH";
        public position: Vector3D;
      
    }
}