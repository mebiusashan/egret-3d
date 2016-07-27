module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Vector3D
     * @classdesc
     * 用 Vector3D 表示三维空间中的位置,也可以做4维向量,当为3维向量时w始终为0。</p>
     * 定义了一个三元的浮点向量。</p>
     * 当使用一个向量表示一个表面法线时，向量应该是标准化的。</p>
     * 其他用途的定向矢量的大小不变。当用作一个点，元素的矢量表示在三维空间中的位置。</p>
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Vector3D {

        /**
        * @language en_US
        * The x axis defined as a Vector3D object with coordinates (1,0,0).
        */
        /**
        * @language zh_CN
        * X轴坐标 (1,0,0).
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static X_AXIS: Vector3D = new Vector3D(1, 0, 0);

        /**
        * @language en_US
        * The y axis defined as a Vector3D object with coordinates (0,1,0).
        */
        /**
        * @language zh_CN
        * Y轴坐标 (0,1,0).
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static Y_AXIS: Vector3D = new Vector3D(0, 1, 0);

        /**
        * @language en_US
        * The z axis defined as a Vector3D object with coordinates (0,0,1).
        */
        /**
        * @language zh_CN
        * Z轴坐标 (0,0,1).
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static Z_AXIS: Vector3D = new Vector3D(0, 0, 1);

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static HELP_0: Vector3D = new Vector3D();

                /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static HELP_1: Vector3D = new Vector3D();

                /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static HELP_2: Vector3D = new Vector3D();

                /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static HELP_3: Vector3D = new Vector3D();


        /**
        * @language en_US
        * The first element of a Vector3D object, such as the x coordinate of
        * a point in the three-dimensional space. The default value is 0.
        */
        /**
        * @language zh_CN
        * 在三维空间中x坐标，默认值是0
        * @version Egret 3.0
        * @platform Web,Native
        */
        public x: number = 0;

        /**
        * @language en_US
        * The second element of a Vector3D object, such as the y coordinate of
        * a point in the three-dimensional space. The default value is 0.
        */
        /**
        * @language zh_CN
        * 在三维空间中y坐标，默认值是0
        * @version Egret 3.0
        * @platform Web,Native
        */
        public y: number = 0;

        /**
        * @language en_US
        * The third element of a Vector3D object, such as the y coordinate of
        * a point in the three-dimensional space. The default value is 0.
        */
        /**
        * @language zh_CN
        * 在三维空间中z坐标，默认值是0
        * @version Egret 3.0
        * @platform Web,Native
        */
        public z: number = 0;

        /**
        * @language zh_CN
        * 可作为一种透视投影的三维位置或投影
        * 也可以做四元数中的w
        * @version Egret 3.0
        * @platform Web,Native
        */
        public w: number = 0;

        /**
        * @language en_US
        *  设置w分量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set a(value: number) {
            this.w = value;
        }

        /**
        * @language en_US
        *  设置x分量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set r(value: number) {
            this.x = value;
        }

        /**
        * @language en_US
        *  设置y分量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set g(value: number) {
            this.y = value;
        }

        /**
        * @language en_US
        *  设置z分量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set b(value: number) {
            this.z = value;
        }

        /**
        * @language en_US
        *  得到w分量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get a(): number {
            return this.w;
        }

        /**
        * @language en_US
        *  得到x分量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get r(): number {
            return this.x;
        }

        /**
        * @language en_US
        *  得到y分量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get g(): number {
            return this.y;
        }

        /**
        * @language en_US
        *  得到z分量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get b(): number {
            return this.z;
        }

        /**
        * @language en_US
        * The length, magnitude, of the current Vector3D object from the
        * origin (0,0,0) to the object's x, y, and z coordinates. The w
        * property is ignored. A unit vector has a length or magnitude of
        * one.
        */
        /**
        * @language zh_CN
        * 向量的长度，原点(0, 0, 0)到(x, y, z)的距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get length(): number {
            return Math.sqrt(this.lengthSquared);
        }

        /**
        * @language en_US
        * The square of the length of the current Vector3D object, calculated。
        * using the x, y, and z properties. The w property is ignored. Use the
        * <code>lengthSquared()</code> method whenever possible instead of the
        * slower <code>Math.sqrt()</code> method call of the
        * <code>Vector3D.length()</code> method.
        */
        /**
        * @language zh_CN
        * 3维向量的坐标x的平方加 y的平方加 z的平方
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get lengthSquared(): number {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }

        /**
        * @language en_US
        * Creates an instance of a Vector3D object. If you do not specify a。
        * parameter for the constructor, a Vector3D object is created with
        * the elements (0,0,0,0).
        *
        * @param x The first element, such as the x coordinate.
        * @param y The second element, such as the y coordinate.
        * @param z The third element, such as the z coordinate.
        * @param w An optional element for additional data such as the angle
        *          of rotation.
        */
        /**
        * @language zh_CN
        * 创建一个对象实例，默认为(0, 0, 0, 0)
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }

        /**
        * @language en_US
        * Adds the value of the x, y, and z elements of the current Vector3D。
        * object to the values of the x, y, and z elements of another Vector3D
        * object. The <code>add()</code> method does not change the current
        * Vector3D object. Instead, it returns a new Vector3D object with
        * the new values.
        *
        * <p>The result of adding two vectors together is a resultant vector.
        * One way to visualize the result is by drawing a vector from the
        * origin or tail of the first vector to the end or head of the second
        * vector. The resultant vector is the distance between the origin
        * point of the first vector and the end point of the second vector.
        * </p>
        */
        /**
        * @language zh_CN
        * 向量相加，结果返回一个新实例
        * @returns Vector3D 结果返回
        * @version Egret 3.0
        * @platform Web,Native
        */
        public add(a: Vector3D): Vector3D {
            return new Vector3D(this.x + a.x, this.y + a.y, this.z + a.z, this.w + a.w)
        }

        /**
        * @language en_US
        * Returns a new Vector3D object that is an exact copy of the current
        * Vector3D object.
        *
        * @returns A new Vector3D object that is a copy of the current
        * Vector3D object.
        */
        /**
        * @language zh_CN
        * 克隆一个Vector3D
        * @returns 返回克隆后的实例
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): Vector3D {
            return new Vector3D(this.x, this.y, this.z, this.w);
        }

        /**
        * @language en_US
        * Copies all of vector data from the source Vector3D object into the
        * calling Vector3D object.
        *
        * @param src The Vector3D object from which to copy the data.
        */
        /**
        * @language zh_CN
        * 复制Vector3D对象
        * @param src 数据源
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copyFrom(src: Vector3D): void {
            this.x = src.x;
            this.y = src.y;
            this.z = src.z;
            this.w = src.w;
        }

        /**
        * @language en_US
        * Returns a new Vector3D object that is perpendicular (at a right。
        * angle) to the current Vector3D and another Vector3D object. If the
        * returned Vector3D object's coordinates are (0,0,0), then the two
        * Vector3D objects are parallel to each other.
        *
        * <p>You can use the normalized cross product of two vertices of a
        * polygon surface with the normalized vector of the camera or eye
        * viewpoint to get a dot product. The value of the dot product can
        * identify whether a surface of a three-dimensional object is hidden
        * from the viewpoint.</p>
        *
        * @param a A second Vector3D object.
        * @returns A new Vector3D object that is perpendicular to the current
        *          Vector3D object and the Vector3D object specified as the
        *          parameter.
        */
        /**
        * @language zh_CN
        * 两个Vector3D进行叉乘 this 叉乘 a
        * 叉乘后的结果是这两条向量的垂直向量
        * @param a 
        * @returns Vector3D 返回叉乘结果
        * @version Egret 3.0
        * @platform Web,Native
        */
        public crossProduct(a: Vector3D, target: Vector3D = null ): Vector3D {
            target = target || new Vector3D(); 
            target.x = this.y * a.z - this.z * a.y;
            target.y = this.z * a.x - this.x * a.z;
            target.z = this.x * a.y - this.y * a.x;
            target.w = 1 ;
            return target;
        }

        /**
        * @language en_US
        * Decrements the value of the x, y, and z elements of the current。
        * Vector3D object by the values of the x, y, and z elements of
        * specified Vector3D object. Unlike the
        * <code>Vector3D.subtract()</code> method, the
        * <code>decrementBy()</code> method changes the current Vector3D
        * object and does not return a new Vector3D object.
        *
        * @param a The Vector3D object containing the values to subtract from
        *          the current Vector3D object.
        */
        /**
        * @language zh_CN
        * 当前向量减去a向量，结果赋值给自己
        * @param a 减去的向量
        * @version Egret 3.0
        * @platform Web,Native
        */
        public decrementBy(a: Vector3D) {
            this.x -= a.x;
            this.y -= a.y;
            this.z -= a.z;
        }

        /**
        * @language en_US
        * Returns the distance between two Vector3D objects. The。
        * <code>distance()</code> method is a static method. You can use it
        * directly as a method of the Vector3D class to get the Euclidean
        * distance between two three-dimensional points.
        *
        * @param pt1 A Vector3D object as the first three-dimensional point.
        * @param pt2 A Vector3D object as the second three-dimensional point.
        * @returns The distance between two Vector3D objects.
        */
        /**
        * @language zh_CN
        * 计算两个Vector3D之间的距离
        * @param pt1 坐标1
        * @param pt2 坐标2
        * @returns number 两个Vector3D之间的距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        static distance(pt1: Vector3D, pt2: Vector3D): number {
            var x: number = (pt1.x - pt2.x);
            var y: number = (pt1.y - pt2.y);
            var z: number = (pt1.z - pt2.z);
            return Math.sqrt(x * x + y * y + z * z);
        }

        /**
        * @language en_US
        * If the current Vector3D object and the one specified as the。
        * parameter are unit vertices, this method returns the cosine of the
        * angle between the two vertices. Unit vertices are vertices that
        * point to the same direction but their length is one. They remove the
        * length of the vector as a factor in the result. You can use the
        * <code>normalize()</code> method to convert a vector to a unit
        * vector.
        *
        * <p>The <code>dotProduct()</code> method finds the angle between two
        * vertices. It is also used in backface culling or lighting
        * calculations. Backface culling is a procedure for determining which
        * surfaces are hidden from the viewpoint. You can use the normalized
        * vertices from the camera, or eye, viewpoint and the cross product of
        * the vertices of a polygon surface to get the dot product. If the dot
        * product is less than zero, then the surface is facing the camera or
        * the viewer. If the two unit vertices are perpendicular to each
        * other, they are orthogonal and the dot product is zero. If the two
        * vertices are parallel to each other, the dot product is one.</p>
        *
        * @param a The second Vector3D object.
        * @returns A scalar which is the dot product of the current Vector3D
        *          object and the specified Vector3D object.
        *
        */
        /**
        * @language zh_CN
        * 计算两个Vector3D的点积,返回两个Vector3D之间的夹角关系
        * @param a 另一个Vector3D
        * @returns number 返回两个Vector3D之间的夹角关系
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dotProduct(a: Vector3D): number {
            return this.x * a.x + this.y * a.y + this.z * a.z;
        }

        /**
        * @language en_US
        * @param toCompare The Vector3D object to be compared with the current
        *                  Vector3D object.
        * @param allFour   An optional parameter that specifies whether the w
        *                  property of the Vector3D objects is used in the
        *                  comparison.
        * @returns A value of true if the specified Vector3D object is equal
        *          to the current Vector3D object; false if it is not equal.
        */
        /**
        * @language zh_CN
        * 求两个Vector3D的值是否全等
        * @param toCompare 与些Vector3D进行比较
        * @param allFour 默认参数为1，是否比较w分量
        * @returns boolean 全等返回true
        * @version Egret 3.0
        * @platform Web,Native
        */
        public equals(toCompare: Vector3D, allFour: boolean = false): boolean {
            return (this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w));
        }

        /**
        * @language en_US

        * Increments the value of the x, y, and z elements of the current
        * Vector3D object by the values of the x, y, and z elements of a
        * specified Vector3D object. Unlike the <code>Vector3D.add()</code>
        * method, the <code>incrementBy()</code> method changes the current
        * Vector3D object and does not return a new Vector3D object.
        *
        * @param a The Vector3D object to be added to the current Vector3D
        *          object.
        */
        /**
        * @language zh_CN
        * 当前Vector3D加等于a Vector3D，只加x y z 3个分量
        * @param a 加等a
        * @version Egret 3.0
        * @platform Web,Native
        */
        public incrementBy(a: Vector3D) {
            this.x += a.x;
            this.y += a.y;
            this.z += a.z;
        }

        /**
        * @language zh_CN
        * 当前Vector3D除分量 或者 除Vector3D
        * @param v 如果是number就是除分量 如果为Vector3D 就是除Vector3D
        * @return Vector3D 返回自己，计算之后的结果
        * @version Egret 3.0
        * @platform Web,Native
        */
        public divide(v): Vector3D {
            if (v instanceof Vector3D) return new Vector3D(this.x / v.x, this.y / v.y, this.z / v.z);
            else {
                this.x = this.x / v;
                this.y = this.y / v;
                this.z = this.z / v;
            }
            return this;
        }

        /**
        * @language en_US
        * Sets the current Vector3D object to its inverse. The inverse object
        * is also considered the opposite of the original object. The value of
        * the x, y, and z properties of the current Vector3D object is changed
        * to -x, -y, and -z.
        */
        /**
        * @language zh_CN
        * 当前Vector3D x y z 3个分量取反
        * @version Egret 3.0
        * @platform Web,Native
        */
        public negate(): void {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
        }

        /**
        * @language en_US
        * Scales the line segment between(0,0) and the current point to a set
        * length.
        *
        * @param thickness The scaling value. For example, if the current
        * Vector3D object is (0,3,4), and you normalize it to
        * 1, the point returned is at(0,0.6,0.8).
        */
        /**
        * @language zh_CN
        * 当前Vector3D标准化
        * @param thickness 默认参数为1，使当前Vector3D的长度为thickness 原点(0, 0, 0)到(x, y, z)的距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public normalize(thickness: number = 1) {
            if (this.length != 0) {
                var invLength = thickness / this.length;
                this.x *= invLength;
                this.y *= invLength;
                this.z *= invLength;
                return;
            }
        }

        /**
        * @language en_US
        * Scales the current Vector3D object by a scalar, a magnitude. The
        * Vector3D object's x, y, and z elements are multiplied by the scalar
        * number specified in the parameter. For example, if the vector is
        * scaled by ten, the result is a vector that is ten times longer. The
        * scalar can also change the direction of the vector. Multiplying the
        * vector by a negative number reverses its direction.
        *
        * @param s A multiplier (scalar) used to scale a Vector3D object.
        */
        /**
        * @language zh_CN
        * 当前Vector3D扩大s倍
        * @param s 扩大的倍数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public scaleBy(s: number): void {
            this.x *= s;
            this.y *= s;
            this.z *= s;
        }

        /**
        * @language en_US
        * Sets the members of Vector3D to the specified values
        *
        * @param xa The first element, such as the x coordinate.
        * @param ya The second element, such as the y coordinate.
        * @param za The third element, such as the z coordinate.
        */
        /**
        * @language zh_CN
        * 填充当前Vector3D的x, y, z
        * @param xa 
        * @param yz 
        * @param za 
        * @param wz
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setTo(xa: number, ya: number, za: number, wa:number = 1): void {
            this.x = xa;
            this.y = ya;
            this.z = za;
            this.w = wa;
        }

        /**
        * @language en_US
        * Subtracts the value of the x, y, and z elements of the current
        * Vector3D object from the values of the x, y, and z elements of
        * another Vector3D object. The <code>subtract()</code> method does not
        * change the current Vector3D object. Instead, this method returns a
        * new Vector3D object with the new values.
        *
        * @param a The Vector3D object to be subtracted from the current
        *          Vector3D object.
        * @returns A new Vector3D object that is the difference between the
        *          current Vector3D and the specified Vector3D object.
        */
        /**
        * @language zh_CN
        * 当前Vector3D减去a Vector3D 结果返回新实例
        * @param a 减去的Vector3D
        * @param target 默认参数为null,如果当前参数为null那么就会new一个新的Vector3D返回
        * @returns Vector3D 结果返回
        * @version Egret 3.0
        * @platform Web,Native
        */
        public subtract(a: Vector3D, target: Vector3D = null): Vector3D {
            if (!target) {
                target = new Vector3D();
            }
            target.setTo(this.x - a.x, this.y - a.y, this.z - a.z);
            return target;
        }

        /**
        * @language zh_CN
        * 当前Vector3D乘other Vector3D 结果返回新实例
        * @param a 相乘的Vector3D
        * @param target 如果当前参数为null那么就会new一个新的Vector3D返回
        * @returns Vector3D 结果返回
        * @version Egret 3.0
        * @platform Web,Native
        */
        public multiply(other: Vector3D, target: Vector3D = null): Vector3D {
            if (!target) {
                target = new Vector3D();
            }

            var x0: number = this.x;
            var y0: number = this.y;
            var z0: number = this.z;

            var x1: number = other.x;
            var y1: number = other.y;
            var z1: number = other.z;

            target.setTo(x0 * x1, y0 * y1, z0 * z1);
            return target;
        }
        
        /**
        * @language zh_CN
        * 当前Vector3D除以other Vector3D 结果返回新实例
        * @param a 相除的Vector3D
        * @param target 如果当前参数为null那么就会new一个新的Vector3D返回
        * @returns Vector3D 结果返回
        * @version Egret 3.0
        * @platform Web,Native
        */
        public divided(other: Vector3D, target: Vector3D = null): Vector3D {
            if (!target) {
                target = new Vector3D();
            }

            var x0: number = this.x;
            var y0: number = this.y;
            var z0: number = this.z;

            var x1: number = other.x;
            var y1: number = other.y;
            var z1: number = other.z;

            target.setTo(x0 / x1, y0 / y1, z0 / z1);
            return target;
        }
        
        /**
        * @language zh_CN
        * 计算两个Vector3D之间的线性差值，结果为当前对象
        * @param v0 Vector3D 1
        * @param v1 Vector3D 2
        * @param t 时刻
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lerp(v0: Vector3D, v1: Vector3D, t: number): void {
            var v0x: number = v0.x, v0y: number = v0.y, v0z: number = v0.z, v0w: number = v0.w;
            var v1x: number = v1.x, v1y: number = v1.y, v1z: number = v1.z, v1w: number = v1.w;

            this.x = (v1x - v0x) * t + v0x;
            this.y = (v1y - v0y) * t + v0y;
            this.z = (v1z - v0z) * t + v0z;
            this.w = (v1w - v0w) * t + v0w;
        }


        private Dot(v0: Vector3D, v1:Vector3D):number {
            return v0.x * v1.x + v0.y * v1.y + v0.z * v1.z;
        }
        private OrthoNormalVectorFast(n: Vector3D, target:Vector3D):Vector3D
        {
            if (!target) {
                target = new Vector3D();
            }

            var a: number;
            var k: number;

            if (Math.abs(n.z) > 0.70710678) {
                // choose p in y-z plane
                a = n.y * n.y + n.z * n.z;
                k = 1.0 / Math.sqrt(a);
                target.x = 0;
                target.y = -n.z * k;
                target.z = n.y * k;
            }
            else {
                // choose p in x-y plane
                a = n.x * n.x + n.y * n.y;
                k = 1.0 / Math.sqrt(a);
                target.x = -n.y * k;
                target.y = n.x * k;
                target.z = 0;
            }

            return target;
        }
        public slerp(lhs: Vector3D, rhs: Vector3D, t: number): void {
            var lhsMag: number = Math.sqrt(this.Dot(lhs, lhs));
            var rhsMag: number = Math.sqrt(this.Dot(rhs, rhs));

            if (lhsMag < 0.00001 || rhsMag < 0.00001) {
                return this.lerp(lhs, rhs, t);
            }

            var lerpedMagnitude: number = lhsMag + t * (rhsMag - lhsMag);

            var dot: number = this.Dot(lhs, rhs) / (lhsMag * rhsMag);

            // direction is almost the same
            if (dot > 1.0 - 0.00001)
            {
                return this.lerp(lhs, rhs, t);
            }
            // directions are almost opposite
            else if (dot < -1.0 + 0.00001)
            {
                Vector3D.HELP_0.copyFrom(lhs);
                var lhsNorm: Vector3D = Vector3D.HELP_0.divide(lhsMag);
                this.OrthoNormalVectorFast(lhsNorm, Vector3D.HELP_1);
                var axis: Vector3D = Vector3D.HELP_1;
                Quaternion.HELP_0.fromAxisAngle(Vector3D.HELP_1, 3.1415926 * t * MathUtil.RADIANS_TO_DEGREES);
                var m: Matrix4_4 = Quaternion.HELP_0.toMatrix3D(Matrix4_4.helpMatrix);
                m.transformVector(lhsNorm, this);
                this.scaleBy(lerpedMagnitude);
                return;
            }
            // normal case
            else {
                lhs.dotProduct;
                this.Cross(lhs, rhs, Vector3D.HELP_0);
                var axis: Vector3D = Vector3D.HELP_0;
                Vector3D.HELP_1.copyFrom(lhs);
                var lhsNorm: Vector3D = Vector3D.HELP_1.divide(lhsMag);
                axis.normalize();
                var angle:number = Math.acos(dot) * t;
                Quaternion.HELP_0.fromAxisAngle(axis, angle * MathUtil.RADIANS_TO_DEGREES);
                var m: Matrix4_4 = Quaternion.HELP_0.toMatrix3D(Matrix4_4.helpMatrix);
                m.transformVector(lhsNorm, this);
                this.scaleBy(lerpedMagnitude);
                return;
            }
        }
        private Cross(lhs: Vector3D, rhs: Vector3D, target:Vector3D = null): Vector3D {
            if (!target) {
                target = new Vector3D();
            }
            target.x = lhs.y * rhs.z - lhs.z * rhs.y;
            target.y = lhs.z * rhs.x - lhs.x * rhs.z;
            target.z = lhs.x * rhs.y - lhs.y * rhs.x;
            return target;
        }
                
        /**
        * @language zh_CN
        * 当前Vector3D以字符串形式返回
        * @returns string
        * @version Egret 3.0
        * @platform Web,Native
        */
        public toString(): string {
            return "<" + this.x + ", " + this.y + ", " + this.z + ">";
        }
                        
        /**
        * @language zh_CN
        * 解析字符串为Vector3D
        * @param str 格式用空格间隔开，只解析为x,y,z
        * @version Egret 3.0
        * @platform Web,Native
        */
        public parsing(str: string): void {

            var strS: string[] = str.split(" ");

            if (strS.length < 3)
                return;

            this.x = parseFloat(strS[0]);
            this.y = parseFloat(strS[1]);
            this.z = parseFloat(strS[2]);
        }
    }
}

