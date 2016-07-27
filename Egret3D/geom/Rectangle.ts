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
        constructor(x: number = 0, y: number = 0, width: number = 32, height: number = 32) {
            this.x = x;
            this.y = y;
            this.width = width; 
            this.height = height;
        }

        /**
        * @language zh_CN
        * 复制矩形数据
        * @param other 被复制的矩形
        * @version Egret 3.0
        * @platform Web,Native
        */
        public copy(other: Rectangle): Rectangle {
            this.x = other.x;
            this.y = other.y;
            this.width = other.width;
            this.height = other.height;
            return this;
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

    }
} 