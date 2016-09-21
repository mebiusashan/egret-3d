module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Rectangle
     * @classdesc
     * Rectangle 类 表示矩形
     * 
     * Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。 
     * 
     * Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其它属性。
     * 
     * 您可以使用 new Rectangle() 构造函数创建 Rectangle 对象。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Rectangle {

        /**
        * @language zh_CN
        * 矩形左上角的 x 坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public x: number = 0;
        
        /**  
        * @language zh_CN
        * 矩形左上角的 y 坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public y: number = 0;
        
        /**
        * @language zh_CN
        * 矩形的宽度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public width: number = 0;
        
        /**
        * @language zh_CN
        * 矩形的高度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public height: number = 0;
                
     
        /**
         * @language zh_CN
         * 创建一个新 Rectangle 对象，其左上角由 x 和 y 参数指定，并具有指定的 width 和 height 参数。
         * @param x 矩形左上角的 x 坐标。 
         * @param y 矩形左上角的 y 坐标。 
         * @param width 矩形的宽度
         * @param height 矩形的高度
         * @version Egret 3.0
         * @platform Web,Native
         */
        constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
            this.x = x;
            this.y = y;
            this.width = width; 
            this.height = height;
        }

        /**
        * @language zh_CN
        * 从一个矩形拷贝数据
        * @param rect 拷贝的对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copyFrom(rect: Rectangle): void {
            this.x = rect.x;
            this.y = rect.y;
            this.width = rect.width;
            this.height = rect.height;
        }

        /**
        * @language zh_CN
        * 拷贝数据到一个矩形
        * @param rect 拷贝到目标矩形
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copyTo(rect: Rectangle): void {
            rect.copyFrom(this);
        }

        /**
         * @language zh_CN
         * 检测x y 是否在当前矩形内
         * @param x  x 坐标。 
         * @param y  y 坐标。
         * @returns boolean 是否在当前矩形内
         * @version Egret 3.0
         * @platform Web,Native
         */
        public inner(x: number, y: number): boolean {
            if (x < this.x || x > this.x + this.width ||
                y < this.y || y > this.y + this.height) {
                return false;
            } 

            return true;
        }

        /**
         * @language zh_CN
         * 检测x y 是否在当前矩形内
         * @param x  x 坐标。 
         * @param y  y 坐标。
         * @returns boolean 是否在当前矩形内
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static pointInRect(x: number, y: number, lt_x: number, lt_y: number, rb_x: number, rb_y: number): boolean {
            if (x < lt_x || x > rb_x ||
                y < lt_y || y > rb_y) {
                return false;
            }

            return true;
        }

        /**
         * @language zh_CN
         * 是否相等
         * @param rectangle  比较的对象
         * @returns boolean 相等返回ture
         * @version Egret 3.0
         * @platform Web,Native
         */
        public equal(rectangle: Rectangle): boolean {
            return !((this.x != rectangle.x) ||
                     (this.y != rectangle.y) ||
                     (this.width != rectangle.width) ||
                     (this.height != rectangle.height));
        }

        /**
         * @language zh_CN
         * 是否相等
         * @param rectangle  比较的对象
         * @returns boolean 相等返回ture
         * @version Egret 3.0
         * @platform Web,Native
         */
        public equalArea(x: number, y: number, width: number, height: number): boolean {
            return !((this.x != x) ||
                (this.y != y) ||
                (this.width != width) ||
                (this.height != height));
        }

       /**
         * @language zh_CN
         * 返回相交区域
         * @param source  比较区域
         * @param target  目标接参
         * @returns Rectangle 返回相交的区域
         * @version Egret 3.0
         * @platform Web,Native
         */
        public equalInnerArea(source: Rectangle, target: Rectangle): boolean {
            var Xa1 = this.x; 
            var Ya1 = this.y; 

            var Xa2 = this.x + this.width; 
            var Ya2 = this.y + this.height; 

            var Xb1 = source.x;
            var Yb1 = source.y;

            var Xb2 = source.x + source.width;
            var Yb2 = source.y + source.height; 

            if (Math.max(Xa1, Xb1) <= Math.min(Xa2, Xb2) &&
                Math.max(Ya1, Yb1) <= Math.min(Ya2, Yb2)) {
                return true;
            }
            return false;
        }

        public innerArea(source: Rectangle, target: Rectangle): Rectangle {
            target = target || new Rectangle();
            var Xa1 = this.x;
            var Ya1 = this.y;

            var Xa2 = this.x + this.width;
            var Ya2 = this.y + this.height;

            var Xb1 = source.x;
            var Yb1 = source.y;

            var Xb2 = source.x + source.width;
            var Yb2 = source.y + source.height;

            var top: number = Math.max(Ya1, Yb1);
            var bottom: number = Math.min(Ya2, Yb2);
            var left: number = Math.max(Xa1, Xb1);
            var right: number = Math.min(Xb2, Xa2);
            if (top >= 0 && bottom >= 0 && (bottom - top) >= 0 && (right - left) > 0) {
                target.x = left;
                target.y = top;
                target.width = right - left;
                target.height = bottom - top;
            } else {
                target.x = 0;
                target.y = 0;
                target.width = 0;
                target.height = 0;
            }
            return target;
        }


        public setTo(x: number, y: number, width: number, height: number): void {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }




    }
} 