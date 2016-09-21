module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Matrix4_4
     * @classdesc
     *
     * Matrix4_4 类表示一个转换矩阵，该矩阵确定三维 (3D) 显示对象的位置和方向。
     * 该矩阵可以执行转换功能，包括平移（沿 x、y 和 z 轴重新定位）、旋转和缩放（调整大小）.
     * Matrix4_4 类还可以执行透视投影，这会将 3D 坐标空间中的点映射到二维 (2D) 视图.
     * 单一矩阵可以将多个转换组合在一起，并一次性对 3D 显示对象应用这些转换.
     * 例如，可以将一个矩阵应用于 3D 坐标，以便依次执行旋转和平移.
     * 
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Matrix4_4 {
        
        /**
        * @language zh_CN
        * 一个由 16 个数字组成的矢量，其中，每四个元素可以是 4x4 矩阵的一行或一列
        * @version Egret 3.0
        * @platform Web,Native
        */
        public rawData: Float32Array;
        public static helpMatrix: Matrix4_4 = new Matrix4_4();
        /**
        * @language zh_CN
        * 构造
        * @param datas {number[16]}
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(datas: Float32Array = null) {
            if (datas)
            {
                this.rawData = datas;
            }
            else
                this.rawData = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }

        /**
        * @language zh_CN
        * 生成一个注视目标的矩阵.
        * @param eye 眼睛的位置.
        * @param at 目标的位置.
        * @param up 向上的方向.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lookAt(eye: Vector3D, at: Vector3D, up: Vector3D) {
            at.subtract(eye,Vector3D.HELP_0)
            var zaxis: Vector3D = Vector3D.HELP_0;
            zaxis.normalize();
            var xaxis: Vector3D = up.crossProduct(zaxis, Vector3D.HELP_1);
            xaxis.normalize();
            var yaxis = zaxis.crossProduct(xaxis, Vector3D.HELP_2);

            this.rawData[0] = xaxis.x;
            this.rawData[1] = yaxis.x;
            this.rawData[2] = zaxis.x;
            this.rawData[3] = 0;

            this.rawData[4] = xaxis.y;
            this.rawData[5] = yaxis.y;
            this.rawData[6] = zaxis.y;
            this.rawData[7] = 0;

            this.rawData[8] = xaxis.z;
            this.rawData[9] = yaxis.z;
            this.rawData[10] = zaxis.z;
            this.rawData[11] = 0;

            this.rawData[12] = -xaxis.dotProduct(eye);
            this.rawData[13] = -yaxis.dotProduct(eye);
            this.rawData[14] = -zaxis.dotProduct(eye);

            this.rawData[15] = 1;
        }

        /**
        * @language zh_CN
        * 矩阵相乘.
        * @param mat4 相乘的矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public multiply(mat4: Matrix4_4) {
            var a = this.rawData, b = mat4.rawData, r = Matrix4_4.helpMatrix;

            r[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
            r[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
            r[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
            r[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

            r[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
            r[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
            r[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
            r[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

            r[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
            r[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
            r[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
            r[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

            r[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
            r[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
            r[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
            r[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];
            for (var i = 0; i < 16; i++) this.rawData[i] = r[i];
        }

        /**
        * @private
        * @language zh_CN
        */
        public perspectiveB(fov: number, aspect: number, near: number, far: number) : Matrix4_4{
            var y = Math.tan(fov * Math.PI / 360) * near;
            var x = y * aspect;
            return this.frustum(-x, x, -y, y, near, far);
        }

        /**
        * @private
        * @language zh_CN
        */
        public frustum(l: number, r: number, b: number, t: number, n: number, f: number): Matrix4_4 {
            var m = this.rawData;

            m[0] = 2 * n / (r - l);
            m[1] = 0;
            m[2] = (r + l) / (r - l);
            m[3] = 0;

            m[4] = 0;
            m[5] = 2 * n / (t - b);
            m[6] = (t + b) / (t - b);
            m[7] = 0;

            m[8] = 0;
            m[9] = 0;
            m[10] = -(f + n) / (f - n);
            m[11] = -2 * f * n / (f - n);

            m[12] = 0;
            m[13] = 0;
            m[14] = -1;
            m[15] = 0;

            return this;
        }

        //public ortho(l: number, r: number, b: number, t: number, n: number, f: number): Matrix4_4 {
        //    var m = this.rawData;

        //    m[0] = 2 / (r - l);
        //    m[1] = 0;
        //    m[2] = 0;
        //    m[3] = -(r + l) / (r - l);

        //    m[4] = 0;
        //    m[5] = 2 / (t - b);
        //    m[6] = 0;
        //    m[7] = -(t + b) / (t - b);

        //    m[8] = 0;
        //    m[9] = 0;
        //    m[10] = -2 / (f - n);
        //    m[11] = -(f + n) / (f - n);

        //    m[12] = 0;
        //    m[13] = 0;
        //    m[14] = 0;
        //    m[15] = 1;

        //    return this;
        //}

        /**
        * @language zh_CN
        * 生成一个透视投影矩阵.
        * @param fovy 观察时y 轴方向的角度，就是观察范围夹角。
        * @param aspect 横纵比，在视空间宽度除以高度.
        * @param zn 近裁剪面位置Z值.
        * @param zf 远裁剪面位置Z值.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public perspective(fovy: number, aspect: number, zn: number, zf: number) {
            var angle: number = fovy * (Math.PI / 180.0);
            var yScale: number = Math.tan((Math.PI  - angle) / 2.0);
            var xScale: number = yScale / aspect;

            this.rawData[0] = xScale;
            this.rawData[1] = 0;
            this.rawData[2] = 0;
            this.rawData[3] = 0;

            this.rawData[4] = 0;
            this.rawData[5] = yScale;
            this.rawData[6] = 0;
            this.rawData[7] = 0;

            this.rawData[8] = 0;
            this.rawData[9] = 0;
            this.rawData[10] = zf / (zf - zn);
            this.rawData[11] = 1;

            this.rawData[12] = 0;
            this.rawData[13] = 0;
            this.rawData[14] = -zn * zf / (zf - zn);
            this.rawData[15] = 0;
        }

        /**
        * @language zh_CN
        * 生成一个透视投影矩阵.
        * @param w 屏幕的宽度。
        * @param h 屏幕的高度.
        * @param zn 近裁剪面位置Z值.
        * @param zf 远裁剪面位置Z值.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public ortho(w: number, h: number, zn: number, zf: number) {
            this.rawData[0] = 2 / w;
            this.rawData[1] = 0;
            this.rawData[2] = 0;
            this.rawData[3] = 0;

            this.rawData[4] = 0;
            this.rawData[5] = 2 / h;
            this.rawData[6] = 0;
            this.rawData[7] = 0;

            this.rawData[8] = 0;
            this.rawData[9] = 0;
            this.rawData[10] = 1 / (zf - zn);
            this.rawData[11] = 0;

            this.rawData[12] = 0;
            this.rawData[13] = 0;
            this.rawData[14] = zn / (zn - zf);
            this.rawData[15] = 1 ;
        }

        /**
        * @language zh_CN
        * 生成一个透视投影矩阵.
        * @param l 观察时X轴最小值.
        * @param r 观察时X轴最大值.
        * @param b 观察时Y轴最小值。
        * @param t 观察时Y轴最大值.
        * @param zn 近裁剪面位置Z值.
        * @param zf 远裁剪面位置Z值.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public orthoOffCenter(l: number, r: number, b: number, t: number, zn: number, zf: number) {
            this.rawData[0] = 2 / (r - l);
            this.rawData[1] = 0;
            this.rawData[2] = 0;
            this.rawData[3] = 0;

            this.rawData[4] = 0;
            this.rawData[5] = 2 / (t - b);
            this.rawData[6] = 0;
            this.rawData[7] = 0;

            this.rawData[8] = 0;
            this.rawData[9] = 0;
            this.rawData[10] = 1.0 / (zf - zn);
            this.rawData[11] = 0;
            
            this.rawData[12] = (l + r) / (l - r);
            this.rawData[13] = (t + b) / (b - t);
            this.rawData[14] = zn / (zn - zf);
            this.rawData[15] = 1;
        }

        /**
        * @language zh_CN
        * 计算出一个方向变换到另一个方向的旋转矩阵
        * @param fromDirection 初始方向
        * @param toDirection 变换后的方向
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fromToRotation(fromDirection: Vector3D, toDirection: Vector3D) {
            var EPSILON: number = 0.000001;
            var v: Vector3D = Vector3D.HELP_0;
            toDirection.crossProduct(fromDirection, v);
            var e: number = toDirection.dotProduct(fromDirection);

            if (e > 1.0 - EPSILON) {
                this.identity();
            }
            else if (3 < -1.0 + EPSILON) {

                var up: Vector3D = Vector3D.HELP_1;
                var left: Vector3D = Vector3D.HELP_2;
                var invlen: number = 0;

                var fxx, fyy, fzz, fxy, fxz, fyz;
                var uxx, uyy, uzz, uxy, uxz, uyz;
                var lxx, lyy, lzz, lxy, lxz, lyz;

                left.x = 0.0; left.y = fromDirection.z; left.z = -fromDirection.y;
                if (left.dotProduct(left) < EPSILON) {

                    left.x = -fromDirection.z; left.y = 0.0; left.z = fromDirection.x;
                }
                /* normalize "left" */
                invlen = 1.0 / Math.sqrt(left.dotProduct(left));
                left[0] *= invlen;
                left[1] *= invlen;
                left[2] *= invlen;

                left.crossProduct(fromDirection, up);

                fxx = -fromDirection.x * fromDirection.x; fyy = -fromDirection.y * fromDirection.y; fzz = -fromDirection.z * fromDirection.z;
                fxy = -fromDirection.x * fromDirection.y; fxz = -fromDirection.x * fromDirection.z; fyz = -fromDirection.y * fromDirection.z;

                uxx = up.x * up.x; uyy = up.y * up.y; uzz = up.z * up.z;
                uxy = up.x * up.y; uxz = up.x * up.z; uyz = up.y * up.z;

                lxx = -left.x * left.x; lyy = -left.y * left.y; lzz = -left.z * left.z;
                lxy = -left.x * left.y; lxz = -left.x * left.z; lyz = -left.y * left.z;


                this.rawData[0] = fxx + uxx + lxx; this.rawData[1] = fxy + uxy + lxy; this.rawData[2] = fxz + uxz + lxz;
                this.rawData[4] = this.rawData[1]; this.rawData[5] = fyy + uyy + lyy; this.rawData[6] = fyz + uyz + lyz;
                this.rawData[8] = this.rawData[2]; this.rawData[9] = this.rawData[6]; this.rawData[10] = fzz + uzz + lzz;

                this.rawData[3] = 0;
                this.rawData[7] = 0;
                this.rawData[11] = 0;
                this.rawData[15] = 1;
            }
            else {
                var hvx, hvz, hvxy, hvxz, hvyz;
                var h = (1.0 - e) / v.dotProduct(v);
                hvx = h * v.x;
                hvz = h * v.z;
                hvxy = hvx * v.y;
                hvxz = hvx * v.z;
                hvyz = hvz * v.y;
                this.rawData[0] = e + hvx * v.x; this.rawData[1] = hvxy - v.z; this.rawData[2] = hvxz + v.y;
                this.rawData[4] = hvxy + v.z; this.rawData[5] = e + h * v.y * v.y; this.rawData[6] = hvyz - v.x;
                this.rawData[8] = hvxz - v.y; this.rawData[9] = hvyz + v.x; this.rawData[10] = e + hvz * v.z;

                this.rawData[3] = 0;
                this.rawData[7] = 0;
                this.rawData[11] = 0;
                this.rawData[15] = 1;
            }
        }


        /**
        * @language zh_CN
        * 计算出一个方向变换到另一个方向的旋转矩阵
        * @param fromDirection 初始方向
        * @param toDirection 变换后的方向
        * @param target 计算出的旋转矩阵 默认为null 结果会返回
        * @returns Quaternion 计算出的旋转矩阵 如果 target为null 就会创建新实例返回
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static fromToRotation(fromDirection: Vector3D, toDirection: Vector3D, target: Matrix4_4 = null): Matrix4_4 {
            if (!target) {
                target = new Matrix4_4();
            }

            target.fromToRotation(fromDirection, toDirection);
            return target;
        }

        /**
        * @language zh_CN
        * 通过将当前 Matrix4_4 对象与另一个 Matrix4_4 对象相乘来前置一个矩阵
        * @param lhs 目标矩阵.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public append(lhs: Matrix4_4) {
            var m111: number = this.rawData[0], m121: number = this.rawData[4], m131: number = this.rawData[8], m141: number = this.rawData[12], m112: number = this.rawData[1], m122: number = this.rawData[5], m132: number = this.rawData[9], m142: number = this.rawData[13], m113: number = this.rawData[2], m123: number = this.rawData[6], m133: number = this.rawData[10], m143: number = this.rawData[14], m114: number = this.rawData[3], m124: number = this.rawData[7], m134: number = this.rawData[11], m144: number = this.rawData[15], m211: number = lhs.rawData[0], m221: number = lhs.rawData[4], m231: number = lhs.rawData[8], m241: number = lhs.rawData[12], m212: number = lhs.rawData[1], m222: number = lhs.rawData[5], m232: number = lhs.rawData[9], m242: number = lhs.rawData[13], m213: number = lhs.rawData[2], m223: number = lhs.rawData[6], m233: number = lhs.rawData[10], m243: number = lhs.rawData[14], m214: number = lhs.rawData[3], m224: number = lhs.rawData[7], m234: number = lhs.rawData[11], m244: number = lhs.rawData[15];

            this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
            this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
            this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
            this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;

            this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
            this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
            this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
            this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;

            this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
            this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
            this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
            this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;

            this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
            this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
            this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
            this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
        }

        /**
        * @language zh_CN
        * 矩阵相加.
        * @param lhs 目标矩阵.
        * @returns 相加后的结果.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public add(lhs: Matrix4_4): Matrix4_4 {
            var m111: number = this.rawData[0], m121: number = this.rawData[4], m131: number = this.rawData[8], m141: number = this.rawData[12], m112: number = this.rawData[1], m122: number = this.rawData[5], m132: number = this.rawData[9], m142: number = this.rawData[13], m113: number = this.rawData[2], m123: number = this.rawData[6], m133: number = this.rawData[10], m143: number = this.rawData[14], m114: number = this.rawData[3], m124: number = this.rawData[7], m134: number = this.rawData[11], m144: number = this.rawData[15], m211: number = lhs.rawData[0], m221: number = lhs.rawData[4], m231: number = lhs.rawData[8], m241: number = lhs.rawData[12], m212: number = lhs.rawData[1], m222: number = lhs.rawData[5], m232: number = lhs.rawData[9], m242: number = lhs.rawData[13], m213: number = lhs.rawData[2], m223: number = lhs.rawData[6], m233: number = lhs.rawData[10], m243: number = lhs.rawData[14], m214: number = lhs.rawData[3], m224: number = lhs.rawData[7], m234: number = lhs.rawData[11], m244: number = lhs.rawData[15];

            this.rawData[0] = m111 + m211;
            this.rawData[1] = m112 + m212;
            this.rawData[2] = m113 + m213;
            this.rawData[3] = m114 + m214;

            this.rawData[4] = m121 + m221;
            this.rawData[5] = m122 + m222;
            this.rawData[6] = m123 + m223;
            this.rawData[7] = m124 + m224;

            this.rawData[8] =  m131 + m231;
            this.rawData[9] =  m132 + m232;
            this.rawData[10] = m133 + m233;
            this.rawData[11] = m134 + m234;

            this.rawData[12] = m141 + m241;
            this.rawData[13] = m142 + m242;
            this.rawData[14] = m143 + m243;
            this.rawData[15] = m144 + m244;
            return this;
        }

        /**
        * @language zh_CN
        * 矩阵相减.
        * @param lhs 目标矩阵.
        * @returns Matrix4_4 相加减的结果.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public sub(lhs: Matrix4_4): Matrix4_4 {
            var m111: number = this.rawData[0], m121: number = this.rawData[4], m131: number = this.rawData[8], m141: number = this.rawData[12], m112: number = this.rawData[1], m122: number = this.rawData[5], m132: number = this.rawData[9], m142: number = this.rawData[13], m113: number = this.rawData[2], m123: number = this.rawData[6], m133: number = this.rawData[10], m143: number = this.rawData[14], m114: number = this.rawData[3], m124: number = this.rawData[7], m134: number = this.rawData[11], m144: number = this.rawData[15], m211: number = lhs.rawData[0], m221: number = lhs.rawData[4], m231: number = lhs.rawData[8], m241: number = lhs.rawData[12], m212: number = lhs.rawData[1], m222: number = lhs.rawData[5], m232: number = lhs.rawData[9], m242: number = lhs.rawData[13], m213: number = lhs.rawData[2], m223: number = lhs.rawData[6], m233: number = lhs.rawData[10], m243: number = lhs.rawData[14], m214: number = lhs.rawData[3], m224: number = lhs.rawData[7], m234: number = lhs.rawData[11], m244: number = lhs.rawData[15];

            this.rawData[0] = m111 - m211;
            this.rawData[1] = m112 - m212;
            this.rawData[2] = m113 - m213;
            this.rawData[3] = m114 - m214;

            this.rawData[4] = m121 - m221;
            this.rawData[5] = m122 - m222;
            this.rawData[6] = m123 - m223;
            this.rawData[7] = m124 - m224;

            this.rawData[8] = m131 - m231;
            this.rawData[9] = m132 - m232;
            this.rawData[10] = m133 - m233;
            this.rawData[11] = m134 - m234;

            this.rawData[12] = m141 - m241;
            this.rawData[13] = m142 - m242;
            this.rawData[14] = m143 - m243;
            this.rawData[15] = m144 - m244;
            return this;
        }

        /**
        * @language zh_CN
        * 矩阵乘分量.
        * @param v .
        * @returns Matrix4_4 返回一个相乘后的结果 矩阵.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public mult(v:number): Matrix4_4 {
            this.rawData[0] *= v;
            this.rawData[1] *= v;
            this.rawData[2] *= v;
            this.rawData[3] *= v;

            this.rawData[4] *= v;
            this.rawData[5] *= v;
            this.rawData[6] *= v;
            this.rawData[7] *= v;

            this.rawData[8] *= v;
            this.rawData[9] *= v;
            this.rawData[10] *= v;
            this.rawData[11] *= v;

            this.rawData[12] *= v;
            this.rawData[13] *= v;
            this.rawData[14] *= v;
            this.rawData[15] *= v;
            return this;
        }
        
        /**
        * @language zh_CN
        * 创建一个欧拉旋转矩阵.
        * @param x 绕x轴旋转角度.
        * @param y 绕y轴旋转角度.
        * @param z 绕z轴旋转角度.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public rotation(x: number, y: number, z: number) {
            this.appendRotation(x, Vector3D.X_AXIS);
            this.appendRotation(y, Vector3D.Y_AXIS);
            this.appendRotation(z, Vector3D.Z_AXIS);
        }

        /**
        * @language zh_CN
        * 当前矩阵乘 (按axis轴旋转degrees角度创建出来的矩阵)
        * @param degrees 旋转角度.
        * @param axis 绕axis轴旋转角度.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public appendRotation(degrees: number, axis: Vector3D): void
        {
            var m: Matrix4_4 = Matrix4_4.getAxisRotation(axis.x, axis.y, axis.z, degrees);
            ///this.append(m);

            var tmp: Matrix4_4 = MathUtil.CALCULATION_MATRIX;
            var s: number, c: number;

            var angle: number = degrees * MathUtil.DEGREES_TO_RADIANS;
            s = Math.sin(angle);
            c = Math.cos(angle);

            if (axis.x == 1) {
                tmp.rawData[0] = 1.0; tmp.rawData[1] = 0.0; tmp.rawData[2] = 0.0; tmp.rawData[3] = 0.0;
                tmp.rawData[4] = 0.0; tmp.rawData[5] = c; tmp.rawData[6] = s; tmp.rawData[7] = 0.0;
                tmp.rawData[8] = 0.0; tmp.rawData[9] = -s; tmp.rawData[10] = c; tmp.rawData[7] = 0.0;
                tmp.rawData[12] = 0.0; tmp.rawData[13] = 0.0; tmp.rawData[14] = 0.0; tmp.rawData[15] = 1.0;
            }

            if (axis.y == 1) {
                tmp.rawData[0] = c; tmp.rawData[1] = 0.0; tmp.rawData[2] = -s; tmp.rawData[3] = 0.0;
                tmp.rawData[4] = 0.0; tmp.rawData[5] = 1.0; tmp.rawData[6] = 0.0; tmp.rawData[7] = 0.0;
                tmp.rawData[8] = s; tmp.rawData[9] = 0.0; tmp.rawData[10] = c; tmp.rawData[11] = 0.0;
                tmp.rawData[12] = 0.0; tmp.rawData[13] = 0.0; tmp.rawData[14] = 0.0; tmp.rawData[15] = 1.0;
            }

            if (axis.z == 1) {
                tmp.rawData[0] = c; tmp.rawData[1] = s; tmp.rawData[2] = 0.0; tmp.rawData[3] = 0.0;
                tmp.rawData[4] = -s; tmp.rawData[5] = c; tmp.rawData[6] = 0.0; tmp.rawData[7] = 0.0;
                tmp.rawData[8] = 0.0; tmp.rawData[9] = 0.0; tmp.rawData[10] = 1.0; tmp.rawData[11] = 0.0;
                tmp.rawData[12] = 0.0; tmp.rawData[13] = 0.0; tmp.rawData[14] = 0.0; tmp.rawData[15] = 1.0;
            }

            this.append(tmp);
        }

        /**
        * @language zh_CN
        * 生成一个缩放矩阵
        * @param xScale x轴缩放
        * @param yScale y轴缩放
        * @param zScale z轴缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public appendScale(xScale: number, yScale: number, zScale: number) {
            this.rawData[0] = xScale; this.rawData[1] = 0.0; this.rawData[2] = 0.0;
            this.rawData[4] = 0.0; this.rawData[5] = yScale; this.rawData[6] = 0.0;
            this.rawData[8] = 0.0; this.rawData[9] = 0.0; this.rawData[10] = zScale;
        }

        /**
        * @language zh_CN
        * 加上一个平移矩阵
        * @param x x轴坐标
        * @param y y轴坐标
        * @param z z轴坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public appendTranslation(x: number, y: number, z: number) {
            this.rawData[12] += x;
            this.rawData[13] += y;
            this.rawData[14] += z;
        }

        /**
        * @language zh_CN
        * 返回一个当前矩阵的克隆矩阵
        * @returns Matrix4_4 克隆后的矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): Matrix4_4 {
            var ret: Matrix4_4 = new Matrix4_4();
            ret.copyFrom(this);
            return ret;
        }

        /**
        * @language zh_CN
        * 给当前矩阵其中一行赋值
        * @param column 拷贝的行
        * @param vector3D 拷贝的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copyColumnFrom(column: number, vector3D: Vector3D) {
            switch (column) {
                case 0:
                    this.rawData[0] = vector3D.x;
                    this.rawData[1] = vector3D.y;
                    this.rawData[2] = vector3D.z;
                    this.rawData[3] = vector3D.w;
                    break;
                case 1:
                    this.rawData[4] = vector3D.x;
                    this.rawData[5] = vector3D.y;
                    this.rawData[6] = vector3D.z;
                    this.rawData[7] = vector3D.w;
                    break;
                case 2:
                    this.rawData[8] = vector3D.x;
                    this.rawData[9] = vector3D.y;
                    this.rawData[10] = vector3D.z;
                    this.rawData[11] = vector3D.w;
                    break;
                case 3:
                    this.rawData[12] = vector3D.x;
                    this.rawData[13] = vector3D.y;
                    this.rawData[14] = vector3D.z;
                    this.rawData[15] = vector3D.w;
                    break;
                default:
                    ///throw new ArgumentError("ArgumentError, Column " + column + " out of bounds [0, ..., 3]");
            }
        }

        /**
        * @language zh_CN
        * 拷贝矩阵中的其中一行 把值存在vector3D.
        * @param column 拷贝的行
        * @param vector3D 拷贝存值目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copyRowTo(column: number, vector3D: Vector3D) {
            switch (column) {
                case 0:
                    vector3D.x = this.rawData[0];
                    vector3D.y = this.rawData[1];
                    vector3D.z = this.rawData[2];
                    vector3D.w = this.rawData[3];
                    break;
                case 1:
                    vector3D.x = this.rawData[4];
                    vector3D.y = this.rawData[5];
                    vector3D.z = this.rawData[6];
                    vector3D.w = this.rawData[7];
                    break;
                case 2:
                    vector3D.x = this.rawData[8];
                    vector3D.y = this.rawData[9];
                    vector3D.z = this.rawData[10];
                    vector3D.w = this.rawData[11];
                    break;
                case 3:
                    vector3D.x = this.rawData[12];
                    vector3D.y = this.rawData[13];
                    vector3D.z = this.rawData[14];
                    vector3D.w = this.rawData[15];
                    break;
                default:
                   /// throw new ArgumentError("ArgumentError, Column " + column + " out of bounds [0, ..., 3]");
            }
        }

        /**
        * @language zh_CN
        * 把一个矩阵的值赋给当前矩阵.
        * @param sourceMatrix3D 源矩阵.
        * @returns 返回当前矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copyFrom(sourceMatrix3D: Matrix4_4): Matrix4_4 {
            var len: number = sourceMatrix3D.rawData.length;
            for (var c: number = 0; c < len; c++)
                this.rawData[c] = sourceMatrix3D.rawData[c];
            return this;
        }

        /**
        * @language zh_CN
        * 把一个 float 数组赋值给当前矩阵.
        * @param vector 源数组.
        * @param index 从数组的index 开始copy.
        * @param transpose 是否转置当前矩阵.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copyRawDataFrom(vector: Float32Array, index: number = 0, transpose: boolean = false): void {
            if (transpose)
                this.transpose();

            var len: number = vector.length - index;
            for (var c: number = 0; c < len; c++)
                this.rawData[c] = vector[c + index];

            if (transpose)
                this.transpose();
        }
        
        /**
        * @language zh_CN
        * 把当前矩阵的值拷贝给一个 float 数组.
        * @param vector 目标数组.
        * @param index 从数组的index 开始copy.
        * @param transpose 是否转置当前矩阵.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copyRawDataTo(vector: Float32Array, index: number = 0, transpose: boolean = false) {
            if (transpose)
                this.transpose();

            var len: number = this.rawData.length
            for (var c: number = 0; c < len; c++)
                vector[c + index] = this.rawData[c];

            if (transpose)
                this.transpose();
        }


        /**
        * @language zh_CN
        * 给当前矩阵的某一列 赋值
        * @param col 列
        * @param vector3D 值来源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copyColFrom(col: number, vector3D: Vector3D) {
            switch (col) {
                case 0:
                    this.rawData[0] = vector3D.x;
                    this.rawData[4] = vector3D.y;
                    this.rawData[8] = vector3D.z;
                    this.rawData[12] = vector3D.w;
                    break;
                case 1:
                    this.rawData[1] = vector3D.x;
                    this.rawData[5] = vector3D.y;
                    this.rawData[9] = vector3D.z;
                    this.rawData[13] = vector3D.w;
                    break;
                case 2:
                    this.rawData[2] = vector3D.x;
                    this.rawData[6] = vector3D.y;
                    this.rawData[10] = vector3D.z;
                    this.rawData[14] = vector3D.w;
                    break;
                case 3:
                    this.rawData[3] = vector3D.x;
                    this.rawData[7] = vector3D.y;
                    this.rawData[11] = vector3D.z;
                    this.rawData[15] = vector3D.w;
                    break;
                default:
                    new Error( "no more raw!" );
            }
        }
        
        /**
        * @language zh_CN
        * 拷贝当前矩阵的某一列
        * @param col 列
        * @param vector3D 拷贝目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copyColTo(col: number, vector3D: Vector3D) {
            switch (col) {
                case 0:
                    vector3D.x = this.rawData[0];
                    vector3D.y = this.rawData[4];
                    vector3D.z = this.rawData[8];
                    vector3D.w = this.rawData[12];
                    break;
                case 1:
                    vector3D.x = this.rawData[1];
                    vector3D.y = this.rawData[5];
                    vector3D.z = this.rawData[9];
                    vector3D.w = this.rawData[13];
                    break;
                case 2:
                    vector3D.x = this.rawData[2];

                    vector3D.y = this.rawData[6];
                    vector3D.z = this.rawData[10];
                    vector3D.w = this.rawData[14];
                    break;
                case 3:
                    vector3D.x = this.rawData[3];
                    vector3D.y = this.rawData[7];
                    vector3D.z = this.rawData[11];
                    vector3D.w = this.rawData[15]
                    break;
                default:
                    new Error("no more raw!");
            }
        }
                
        /**
        * @language zh_CN
        * 拷贝当前矩阵
        * @param dest 拷贝目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copyToMatrix3D(dest: Matrix4_4) {
            dest.rawData = this.rawData.slice(0);
        }

        /**
        * @language zh_CN
        * 分解当前矩阵
        * @param orientationStyle 分解类型
        * @returns Vector3D[3] pos rot scale
        * @version Egret 3.0
        * @platform Web,Native
        */
        public decompose(orientationStyle: string = "eulerAngles", target: Vector3D[] = null): Vector3D[] {
            var q: Quaternion = MathUtil.CALCULATION_QUATERNION;
            var vec: Vector3D[] = target ? target : [new Vector3D(), new Vector3D(), new Vector3D()];
            this.copyRawDataTo(Matrix4_4.helpMatrix.rawData);
            var mr = Matrix4_4.helpMatrix.rawData;

            var pos: Vector3D = vec[0];
            pos.x = mr[12];
            pos.y = mr[13];
            pos.z = mr[14];
            mr[12] = 0;
            mr[13] = 0;
            mr[14] = 0;

            var scale: Vector3D = vec[2];

            scale.x = Math.sqrt(mr[0] * mr[0] + mr[1] * mr[1] + mr[2] * mr[2]);
            scale.y = Math.sqrt(mr[4] * mr[4] + mr[5] * mr[5] + mr[6] * mr[6]);
            scale.z = Math.sqrt(mr[8] * mr[8] + mr[9] * mr[9] + mr[10] * mr[10]);

            if (mr[0] * (mr[5] * mr[10] - mr[6] * mr[9]) - mr[1] * (mr[4] * mr[10] - mr[6] * mr[8]) + mr[2] * (mr[4] * mr[9] - mr[5] * mr[8]) < 0)
                scale.z = -scale.z;

            mr[0] /= scale.x;
            mr[1] /= scale.x;
            mr[2] /= scale.x;
            mr[4] /= scale.y;
            mr[5] /= scale.y;
            mr[6] /= scale.y;
            mr[8] /= scale.z;
            mr[9] /= scale.z;
            mr[10] /= scale.z;

            var rot = vec[1];

            switch (orientationStyle) {
                case Orientation3D.AXIS_ANGLE:

                    rot.w = Math.acos((mr[0] + mr[5] + mr[10] - 1) / 2);

                    var len: number = Math.sqrt((mr[6] - mr[9]) * (mr[6] - mr[9]) + (mr[8] - mr[2]) * (mr[8] - mr[2]) + (mr[1] - mr[4]) * (mr[1] - mr[4]));
                    rot.x = (mr[6] - mr[9]) / len;
                    rot.y = (mr[8] - mr[2]) / len;
                    rot.z = (mr[1] - mr[4]) / len;

                    break;
                case Orientation3D.QUATERNION:

                    var tr = mr[0] + mr[5] + mr[10];

                    if (tr > 0) {
                        rot.w = Math.sqrt(1 + tr) / 2;

                        rot.x = (mr[6] - mr[9]) / (4 * rot.w);
                        rot.y = (mr[8] - mr[2]) / (4 * rot.w);
                        rot.z = (mr[1] - mr[4]) / (4 * rot.w);
                    } else if ((mr[0] > mr[5]) && (mr[0] > mr[10])) {
                        rot.x = Math.sqrt(1 + mr[0] - mr[5] - mr[10]) / 2;

                        rot.w = (mr[6] - mr[9]) / (4 * rot.x);
                        rot.y = (mr[1] + mr[4]) / (4 * rot.x);
                        rot.z = (mr[8] + mr[2]) / (4 * rot.x);
                    } else if (mr[5] > mr[10]) {
                        rot.y = Math.sqrt(1 + mr[5] - mr[0] - mr[10]) / 2;

                        rot.x = (mr[1] + mr[4]) / (4 * rot.y);
                        rot.w = (mr[8] - mr[2]) / (4 * rot.y);
                        rot.z = (mr[6] + mr[9]) / (4 * rot.y);
                    } else {
                        rot.z = Math.sqrt(1 + mr[10] - mr[0] - mr[5]) / 2;

                        rot.x = (mr[8] + mr[2]) / (4 * rot.z);
                        rot.y = (mr[6] + mr[9]) / (4 * rot.z);
                        rot.w = (mr[1] - mr[4]) / (4 * rot.z);
                    }


                    break;
                case Orientation3D.EULER_ANGLES:
                    var tr = mr[0] + mr[5] + mr[10];

                    if (tr > 0) {
                        q.w = Math.sqrt(1 + tr) / 2;

                        q.x = (mr[6] - mr[9]) / (4 * q.w);
                        q.y = (mr[8] - mr[2]) / (4 * q.w);
                        q.z = (mr[1] - mr[4]) / (4 * q.w);
                    } else if ((mr[0] > mr[5]) && (mr[0] > mr[10])) {
                        q.x = Math.sqrt(1 + mr[0] - mr[5] - mr[10]) / 2;

                        q.w = (mr[6] - mr[9]) / (4 * q.x);
                        q.y = (mr[1] + mr[4]) / (4 * q.x);
                        q.z = (mr[8] + mr[2]) / (4 * q.x);
                    } else if (mr[5] > mr[10]) {
                        rot.y = Math.sqrt(1 + mr[5] - mr[0] - mr[10]) / 2;

                        q.x = (mr[1] + mr[4]) / (4 * q.y);
                        q.w = (mr[8] - mr[2]) / (4 * q.y);
                        q.z = (mr[6] + mr[9]) / (4 * q.y);
                    } else {
                        q.z = Math.sqrt(1 + mr[10] - mr[0] - mr[5]) / 2;

                        q.x = (mr[8] + mr[2]) / (4 * q.z);
                        q.y = (mr[6] + mr[9]) / (4 * q.z);
                        q.w = (mr[1] - mr[4]) / (4 * q.z);
                    }
                    q.toEulerAngles(rot);

                    break;
            }

            vec[0] = pos;
            vec[1] = rot;
            vec[2] = scale;

            return vec;
        }

        
        /**
        * @language zh_CN
        * 当前矩阵变换一个向量
        * @param v 要变换的向量
        * @param target 默认为 null 如果当前参数为null那么就会new一个新的Vector3D返回
        * @returns Vector3D 变换后的向量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public deltaTransformVector(v: Vector3D, target: Vector3D = null): Vector3D {
            if (!target) {
                target = new Vector3D();
            }
            var x: number = v.x;
            var y: number = v.y;
            var z: number = v.z;

            target.x = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8];
            target.y = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9];
            target.z = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10];
            target.w = x * this.rawData[3] + y * this.rawData[7] + z * this.rawData[11];
            return target;
        }

        /**
        * @language zh_CN
        * 单位化当前矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public identity() {
            this.rawData[1] = 0;
            this.rawData[2] = 0;
            this.rawData[3] = 0;
            this.rawData[4] = 0;
            this.rawData[6] = 0;
            this.rawData[7] = 0;
            this.rawData[8] = 0;
            this.rawData[9] = 0;
            this.rawData[11] = 0;
            this.rawData[12] = 0;
            this.rawData[13] = 0;
            this.rawData[14] = 0;

            this.rawData[0]     = 1;
            this.rawData[5]     = 1;
            this.rawData[10]    = 1;
            this.rawData[15]    = 1;

        }

        /**
        * @language zh_CN
        * 填充当前矩阵
        * @param value 填充的值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fill( value:number ) {
            this.rawData[1] = value;
            this.rawData[2] = value;
            this.rawData[3] = value;
            this.rawData[4] = value;
            this.rawData[6] = value;
            this.rawData[7] = value;
            this.rawData[8] = value;
            this.rawData[9] = value;
            this.rawData[11] = value;
            this.rawData[12] = value;
            this.rawData[13] = value;
            this.rawData[14] = value;
            this.rawData[0] = value;
            this.rawData[5] = value;
            this.rawData[10] = value;
            this.rawData[15] = value;
        }

        /**
        * @language zh_CN
        * 当前矩阵求逆
        * @version Egret 3.0
        * @platform Web,Native
        */
        public invers33() {
            /// Invert a 3x3 using cofactors.  This is about 8 times faster than
            /// the Numerical Recipes code which uses Gaussian elimination.

           var rkInverse_00 = this.rawData[5] * this.rawData[10] - this.rawData[9] * this.rawData[6];
           var rkInverse_01 = this.rawData[8] * this.rawData[6] - this.rawData[4] * this.rawData[10];
           var rkInverse_02 = this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5];
           var rkInverse_10 = this.rawData[9] * this.rawData[2] - this.rawData[1] * this.rawData[10];
           var rkInverse_11 = this.rawData[0] * this.rawData[10] - this.rawData[8] * this.rawData[2];
           var rkInverse_12 = this.rawData[8] * this.rawData[1] - this.rawData[0] * this.rawData[9];
           var rkInverse_20 = this.rawData[1] * this.rawData[6] - this.rawData[5] * this.rawData[2];
           var rkInverse_21 = this.rawData[4] * this.rawData[2] - this.rawData[0] * this.rawData[6];
           var rkInverse_22 = this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1];

           var fDet: number =
               this.rawData[0] * rkInverse_00 +
               this.rawData[4] * rkInverse_10 +
               this.rawData[8] * rkInverse_20;

            if (Math.abs(fDet) > 0.00000000001) {
                var fInvDet: number = 1.0 / fDet;

                this.rawData[0] = fInvDet * rkInverse_00;
                this.rawData[4] = fInvDet * rkInverse_01;
                this.rawData[8] = fInvDet * rkInverse_02;
                this.rawData[1] = fInvDet * rkInverse_10;
                this.rawData[5] = fInvDet * rkInverse_11;
                this.rawData[9] = fInvDet * rkInverse_12;
                this.rawData[2] = fInvDet * rkInverse_20;
                this.rawData[6] = fInvDet * rkInverse_21;
                this.rawData[10] = fInvDet * rkInverse_22  ;
            }
        }

        public static transpose(matrix: Matrix4_4, result: Matrix4_4) {
            result = result || new Matrix4_4();
            var m = matrix.rawData, r = result.rawData;
            r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
            r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
            r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
            r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];
            return result;
        };

        public static inverse(matrix: Matrix4_4, result: Matrix4_4) {
            result = result || new Matrix4_4();
            var m = matrix.rawData, r = result.rawData;

            r[0] = m[5] * m[10] * m[15] - m[5] * m[14] * m[11] - m[6] * m[9] * m[15] + m[6] * m[13] * m[11] + m[7] * m[9] * m[14] - m[7] * m[13] * m[10];
            r[1] = -m[1] * m[10] * m[15] + m[1] * m[14] * m[11] + m[2] * m[9] * m[15] - m[2] * m[13] * m[11] - m[3] * m[9] * m[14] + m[3] * m[13] * m[10];
            r[2] = m[1] * m[6] * m[15] - m[1] * m[14] * m[7] - m[2] * m[5] * m[15] + m[2] * m[13] * m[7] + m[3] * m[5] * m[14] - m[3] * m[13] * m[6];
            r[3] = -m[1] * m[6] * m[11] + m[1] * m[10] * m[7] + m[2] * m[5] * m[11] - m[2] * m[9] * m[7] - m[3] * m[5] * m[10] + m[3] * m[9] * m[6];

            r[4] = -m[4] * m[10] * m[15] + m[4] * m[14] * m[11] + m[6] * m[8] * m[15] - m[6] * m[12] * m[11] - m[7] * m[8] * m[14] + m[7] * m[12] * m[10];
            r[5] = m[0] * m[10] * m[15] - m[0] * m[14] * m[11] - m[2] * m[8] * m[15] + m[2] * m[12] * m[11] + m[3] * m[8] * m[14] - m[3] * m[12] * m[10];
            r[6] = -m[0] * m[6] * m[15] + m[0] * m[14] * m[7] + m[2] * m[4] * m[15] - m[2] * m[12] * m[7] - m[3] * m[4] * m[14] + m[3] * m[12] * m[6];
            r[7] = m[0] * m[6] * m[11] - m[0] * m[10] * m[7] - m[2] * m[4] * m[11] + m[2] * m[8] * m[7] + m[3] * m[4] * m[10] - m[3] * m[8] * m[6];

            r[8] = m[4] * m[9] * m[15] - m[4] * m[13] * m[11] - m[5] * m[8] * m[15] + m[5] * m[12] * m[11] + m[7] * m[8] * m[13] - m[7] * m[12] * m[9];
            r[9] = -m[0] * m[9] * m[15] + m[0] * m[13] * m[11] + m[1] * m[8] * m[15] - m[1] * m[12] * m[11] - m[3] * m[8] * m[13] + m[3] * m[12] * m[9];
            r[10] = m[0] * m[5] * m[15] - m[0] * m[13] * m[7] - m[1] * m[4] * m[15] + m[1] * m[12] * m[7] + m[3] * m[4] * m[13] - m[3] * m[12] * m[5];
            r[11] = -m[0] * m[5] * m[11] + m[0] * m[9] * m[7] + m[1] * m[4] * m[11] - m[1] * m[8] * m[7] - m[3] * m[4] * m[9] + m[3] * m[8] * m[5];

            r[12] = -m[4] * m[9] * m[14] + m[4] * m[13] * m[10] + m[5] * m[8] * m[14] - m[5] * m[12] * m[10] - m[6] * m[8] * m[13] + m[6] * m[12] * m[9];
            r[13] = m[0] * m[9] * m[14] - m[0] * m[13] * m[10] - m[1] * m[8] * m[14] + m[1] * m[12] * m[10] + m[2] * m[8] * m[13] - m[2] * m[12] * m[9];
            r[14] = -m[0] * m[5] * m[14] + m[0] * m[13] * m[6] + m[1] * m[4] * m[14] - m[1] * m[12] * m[6] - m[2] * m[4] * m[13] + m[2] * m[12] * m[5];
            r[15] = m[0] * m[5] * m[10] - m[0] * m[9] * m[6] - m[1] * m[4] * m[10] + m[1] * m[8] * m[6] + m[2] * m[4] * m[9] - m[2] * m[8] * m[5];

            var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];
            for (var i = 0; i < 16; i++) r[i] /= det;
            return result;
        };

        /**
        * @language zh_CN
        * 当前矩阵求逆
        * @returns boolean 是否能求逆
        * @version Egret 3.0
        * @platform Web,Native
        */
        public invert(): boolean {
            var d = this.determinant;
            var invertable = Math.abs(d) > 0.00000000001;

            if (invertable) {
                d = 1 / d;
                var m11: number = this.rawData[0];
                var m21: number = this.rawData[4];
                var m31: number = this.rawData[8];
                var m41: number = this.rawData[12];
                var m12: number = this.rawData[1];
                var m22: number = this.rawData[5];
                var m32: number = this.rawData[9];
                var m42: number = this.rawData[13];
                var m13: number = this.rawData[2];
                var m23: number = this.rawData[6];
                var m33: number = this.rawData[10];
                var m43: number = this.rawData[14];
                var m14: number = this.rawData[3];
                var m24: number = this.rawData[7];
                var m34: number = this.rawData[11];
                var m44: number = this.rawData[15];

                this.rawData[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
                this.rawData[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
                this.rawData[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
                this.rawData[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
                this.rawData[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
                this.rawData[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
                this.rawData[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
                this.rawData[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
                this.rawData[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
                this.rawData[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
                this.rawData[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
                this.rawData[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
                this.rawData[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
                this.rawData[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
                this.rawData[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
                this.rawData[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
            }
            return invertable;
        }
        
        /**
        * @language zh_CN
        * 生成一个变换矩阵
        * @param pos  位移
        * @param scale 缩放
        * @param rot 旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public makeTransform(pos: Vector3D, scale: Vector3D, rot: Quaternion) {
            this.appendScale(scale.x, scale.y, scale.z);
            rot.toMatrix3D(MathUtil.CALCULATION_MATRIX);
            this.append(MathUtil.CALCULATION_MATRIX);

            this.rawData[12] = pos.x;
            this.rawData[13] = pos.y;
            this.rawData[14] = pos.z;
            this.rawData[15] = 1;
        }

        /**
        * @language zh_CN
        * 生成一个变换矩阵
        * @param components Vector3D[3] 位移 旋转 缩放
        * @returns boolean 生成是否成功
        * @version Egret 3.0
        * @platform Web,Native
        */
        public recompose(components: Vector3D[]): boolean {

            MathUtil.CALCULATION_QUATERNION.fromEulerAngles(components[1].x, components[1].y, components[1].z);
            this.makeTransform(components[0], components[2], MathUtil.CALCULATION_QUATERNION);
            return true;
        }

        /**
        * @language zh_CN
        * 用当前矩阵变换一个3D向量
        * @param v 变换的向量
        * @param target 如果当前参数为null那么就会new一个新的Vector3D返回
        * @returns Vector3D 变换后的向量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public transformVector(v: Vector3D, target: Vector3D = null): Vector3D {
            if (!target) {
                target = new Vector3D();
            }

            var x: number = v.x;
            var y: number = v.y;
            var z: number = v.z;

            target.x = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12];
            target.y = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13];
            target.z = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14];
            target.w = x * this.rawData[3] + y * this.rawData[7] + z * this.rawData[11] + this.rawData[15];

            return target;
        }

        /**
        * @language zh_CN
        * 用当前矩阵变换一个3D向量
        * @param v 变换的向量
        * @param target 如果当前参数为null那么就会new一个新的Vector3D返回
        * @returns Vector3D 变换后的向量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public transformVector4(v: Vector3D, target: Vector3D = null): Vector3D {
            if (!target) {
                target = new Vector3D();
            }

            var x: number = v.x;
            var y: number = v.y;
            var z: number = v.z;
            var w: number = v.w;

            target.x = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + w * this.rawData[12];
            target.y = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + w * this.rawData[13];
            target.z = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + w * this.rawData[14];
            target.w = x * this.rawData[3] + y * this.rawData[7] + z * this.rawData[11] + w * this.rawData[15];

            return target;
        }

        /**
        * @language zh_CN
        * 用当前矩阵变换一个3D向量
        * @param v 变换的向量
        * @param target 如果当前参数为null那么就会new一个新的Vector3D返回
        * @returns Vector3D 变换后的向量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public mat3TransformVector(v: Vector3D, target: Vector3D = null): Vector3D {
            if (!target) {
                target = new Vector3D();
            }

            var x: number = v.x;
            var y: number = v.y;
            var z: number = v.z;

            target.x = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] ;
            target.y = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] ;
            target.z = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10];

            return target;
        }
        
        /**
        * @language zh_CN
        * 用当前矩阵变换一个3D平面
        * @param plane 变换的平面
        * @returns Plane3D 变换后的平面
        * @version Egret 3.0
        * @platform Web,Native
        */
        public transformPlane(plane: Plane3D): Plane3D {
            var mat: Matrix4_4 = new Matrix4_4();
            mat.copyFrom(this);
            mat.invert();
            mat.transpose();
            var v: Vector3D = new Vector3D(plane.a, plane.b, plane.c, plane.d);
            v.copyFrom(mat.transformVector(v));
            var p: Plane3D = new Plane3D();
            p.a = v.x;
            p.b = v.y;
            p.c = v.z;
            p.d = v.w / Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);

            return p;
        }


                
        /**
        * @language zh_CN
        * 当前矩阵转置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public transpose() {
           
            for (var i: number = 0; i < Matrix4_4.helpMatrix.rawData.length; i++ ){
                Matrix4_4.helpMatrix.rawData[i] = this.rawData[i] ;
            }

            this.rawData[1] = Matrix4_4.helpMatrix.rawData[4];
            this.rawData[2] = Matrix4_4.helpMatrix.rawData[8];
            this.rawData[3] = Matrix4_4.helpMatrix.rawData[12];
            this.rawData[4] = Matrix4_4.helpMatrix.rawData[1];
            this.rawData[6] = Matrix4_4.helpMatrix.rawData[9];
            this.rawData[7] = Matrix4_4.helpMatrix.rawData[13];
            this.rawData[8] = Matrix4_4.helpMatrix.rawData[2];
            this.rawData[9] = Matrix4_4.helpMatrix.rawData[6];
            this.rawData[11] = Matrix4_4.helpMatrix.rawData[14];
            this.rawData[12] = Matrix4_4.helpMatrix.rawData[3];
            this.rawData[13] = Matrix4_4.helpMatrix.rawData[7];
            this.rawData[14] = Matrix4_4.helpMatrix.rawData[11];
        }
                        
        /**
        * @language zh_CN
        * 生成一个(以x,y,z为中心轴旋转degrees角度)的矩阵
        * @param x 中心轴的x
        * @param y 中心轴的y
        * @param z 中心轴的z
        * @param degrees 旋转角度
        * @returns Matrix4_4 矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static getAxisRotation(x: number, y: number, z: number, degrees: number): Matrix4_4 {
            var m: Matrix4_4 = new Matrix4_4();

            var rad = degrees * (Math.PI / 180);
            var c: number = Math.cos(rad);
            var s: number = Math.sin(rad);
            var t: number = 1 - c;
            var tmp1: number, tmp2: number;

            m.rawData[0] = c + x * x * t;
            m.rawData[5] = c + y * y * t;
            m.rawData[10] = c + z * z * t;

            tmp1 = x * y * t;
            tmp2 = z * s;
            m.rawData[1] = tmp1 + tmp2;
            m.rawData[4] = tmp1 - tmp2;
            tmp1 = x * z * t;
            tmp2 = y * s;
            m.rawData[8] = tmp1 + tmp2;
            m.rawData[2] = tmp1 - tmp2;
            tmp1 = y * z * t;
            tmp2 = x * s;
            m.rawData[9] = tmp1 - tmp2;
            m.rawData[6] = tmp1 + tmp2;

            return m;
        }

        /**
        * @language zh_CN
        * 返回矩阵行列式
        *  
        * @returns number 行列式值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get determinant(): number {
            return ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7]) + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7]) + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3]) - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3]) + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]));
        }

        
        /**
        * @language zh_CN
        * 返回矩阵位移
        *  
        * @returns Vector3D 位移
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get position(): Vector3D {
            return new Vector3D(this.rawData[12], this.rawData[13], this.rawData[14]);
        }

        /**
        * @language zh_CN
        * 设置矩阵位移
        *  
        * @param value 位移
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set position(value: Vector3D) {
            this.rawData[12] = value.x;
            this.rawData[13] = value.y;
            this.rawData[14] = value.z;
        }

        /**
        * @language zh_CN
        * 返回矩阵缩放
        *  
        * @returns Vector3D 缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scale(): Vector3D {
            return new Vector3D(this.rawData[0], this.rawData[5], this.rawData[10]);
        }

        /**
        * @language zh_CN
        * 以字符串返回矩阵的值
        *  
        * @returns string 字符
        * @version Egret 3.0
        * @platform Web,Native
        */
        public toString(): string {
            return "matrix3d(" + Math.round(this.rawData[0] * 1000) / 1000 + "," + Math.round(this.rawData[1] * 1000) / 1000 + "," + Math.round(this.rawData[2] * 1000) / 1000 + "," + Math.round(this.rawData[3] * 1000) / 1000 + "," + Math.round(this.rawData[4] * 1000) / 1000 + "," + Math.round(this.rawData[5] * 1000) / 1000 + "," + Math.round(this.rawData[6] * 1000) / 1000 + "," + Math.round(this.rawData[7] * 1000) / 1000 + "," + Math.round(this.rawData[8] * 1000) / 1000 + "," + Math.round(this.rawData[9] * 1000) / 1000 + "," + Math.round(this.rawData[10] * 1000) / 1000 + "," + Math.round(this.rawData[11] * 1000) / 1000 + "," + Math.round(this.rawData[12] * 1000) / 1000 + "," + Math.round(this.rawData[13] * 1000) / 1000 + "," + Math.round(this.rawData[14] * 1000) / 1000 + "," + Math.round(this.rawData[15] * 1000) / 1000 + ")";
        }

        /**
        * @language zh_CN
        * 求两个矩阵之间的差值
        * @param m0 矩阵0
        * @param m1 矩阵1
        * @param t 时间差 0.0 - 1.0
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lerp(m0: Matrix4_4, m1: Matrix4_4, t: number): void {
            ///t(m1 - m0) + m0
            this.copyFrom(m1).sub(m0).mult(t).add(m0);
        }
    }
}