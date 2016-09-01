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
        * 颜色变化矩阵(r,g,b)
        * @version Egret 3.0
        * @platform Web,Native
        */
        public m44: Matrix4_4 = new Matrix4_4();

        /**
        * @language zh_CN
        * 透明度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public alpha: number = 1.0;

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

        /**
        * @language zh_CN
        * 缩放颜色，对rgba进行对应比例的系数缩放
        * @param color 颜色缩放系数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public scale(r: number = 1.0, g: number = 1.0, b: number = 1.0, a: number = 1.0): void {
            this.m44.appendScale(r, g, b);
            this.alpha *= a;
        }

        /**
        * @language zh_CN
        * 偏移颜色，对rgba进行对应便宜
        * @param color 颜色缩放系数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public offset(r: number = 0.0, g: number = 0.0, b: number = 0.0, a: number = 0.0): void {
            this.m44.appendTranslation(r, g, b);
            this.alpha += a;
        }


        /**
        * @language zh_CN
        * 灰度变换
        * @param color 颜色缩放系数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public gray(): void {
            var grayFloats: Float32Array = new Float32Array(16);
            grayFloats[0] = 0.2126;
            grayFloats[1] = 0.7152;
            grayFloats[2] = 0.0722;
            grayFloats[3] = 1;

            grayFloats[4] = 0.2126;
            grayFloats[5] = 0.7152;
            grayFloats[6] = 0.0722;
            grayFloats[7] = 1;

            grayFloats[8] = 0.2126;
            grayFloats[9] = 0.7152;
            grayFloats[10] = 0.0722;
            grayFloats[11] = 1;

            grayFloats[12] = 0;
            grayFloats[13] = 0;
            grayFloats[14] = 0;
            grayFloats[15] = 1;


            this.m44.copyRawDataFrom(grayFloats, 0, false);
        }

        /**
        * @language zh_CN
        * 重置数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public reset(): void {
            this.m44.identity();
            this.alpha = 1;
        }

        /**
        * @language zh_CN
        * 颜色变换叠加
        * @param ctf 叠加的颜色变换的矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public multiply(ctf: ColorTransform): void {
            this.m44.multiply(ctf.m44);
            this.alpha *= ctf.alpha;
        }


        /**
        * @language zh_CN
        * 拷贝一个颜色变换数据
        * @param ctf 拷贝对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copyFrom(ctf: ColorTransform): void {
            this.m44.copyFrom(ctf.m44);
            this.alpha = ctf.alpha;
        }

        /**
        * @language zh_CN
        * 拷贝该颜色变换数据
        * @param ctf 拷贝至目标对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copyTo(ctf: ColorTransform): void {
            ctf.copyFrom(this);
        }



        /**
         * @language zh_CN
         * 设置颜色值
         * @param rgb 0xffffff格式
         * @version Egret 3.0
         * @platform Web,Native
         */
        public setColorRGB(value: number): void {
            var r: number = value & 0xff0000;
            r >>= 16;

            var g: number = value & 0xff00;
            g >>= 8;

            var b: number = value & 0xff;

            r /= 0xff;
            g /= 0xff;
            b /= 0xff;

            this.m44.identity();
            this.scale(r, g, b, 1.0);
        }


    }
} 