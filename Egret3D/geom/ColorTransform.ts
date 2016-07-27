module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.ColorTransform
     * @classdesc
     * 可使用 ColorTransform 类调整显示对象的颜色值
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class ColorTransform {
        /**
        * @language zh_CN
        * 颜色变化矩阵。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public m44: Matrix4_4 = new Matrix4_4();
        /**
        * @language zh_CN
        * 颜色偏移数组
        * @version Egret 3.0
        * @platform Web,Native
        */
        public vec4: Float32Array = new Float32Array(4);

        /**
        * @language zh_CN
        * 重置数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public reset(): void {
            this.m44.identity();
            this.vec4.fill(0);
        }

        /**
         * @language zh_CN
         * @class egret3d.ColorTransform
         * @classdesc
         * ColorTransform 用到的数据，用于偏色某个材质球
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor() {

        }
    }
} 