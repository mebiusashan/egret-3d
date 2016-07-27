module egret3d {

    
    /**
     * @language zh_CN
     * 鼠标键码
     * @version Egret 3.0
     * @platform Web,Native
     */
    export enum MouseCode {

        /**
        * @language zh_CN
        * 鼠标左键
        * @version Egret 3.0
        * @platform Web,Native
        */
        Mouse_Left = 0,

        /**
        * @language zh_CN
        * 鼠标中键
        * @version Egret 3.0
        * @platform Web,Native
        */
        Mouse_Mid = 1,

        /**
        * @language zh_CN
        * 鼠标右键
        * @version Egret 3.0
        * @platform Web,Native
        */
        Mouse_Right = 2,
    }

    /**
    * @language zh_CN
    * @class egret3d.MouseEvent3D
    * @classdesc
    * MouseEvent3D 是所有引擎中可操作鼠标事件节点 的事件类型标记。
    * 只有Input.addEventListener 才会产生下类事件
    * @includeExample events/MouseEvent3D.ts
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @see egret3d.Input
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MouseEvent3D extends Event3D {

        /**
         * @language zh_CN
         * MOUSE_CLICK 常量定义 onClick 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static MOUSE_CLICK: string = "onMouseClick";

        /**
         * @language zh_CN
         * MOUSE_DOWN 常量定义 onMouseDown 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static MOUSE_DOWN: string = "onMouseDown";

        /**
         * @language zh_CN
         * MOUSE_UP 常量定义 onMouseUp 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static MOUSE_UP: string = "onMouseUp";

        /**
         * @language zh_CN
         * MOUSE_MOVE 常量定义 onMouseMove 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static MOUSE_MOVE: string = "onMouseMove";

        /**
         * @language zh_CN
         * MOUSE_OVER 常量定义 onMouseMove 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static MOUSE_OVER: string = "onMouseOver";
        
        /**
         * @language zh_CN
         * MOUSE_WHEEL 常量定义 onMouseWheel 事件对象的 type 属性的值。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static MOUSE_WHEEL: string = "onMouseWheel";

                
        /**
         * @language zh_CN
         * 鼠标code值
         * @version Egret 3.0
         * @platform Web,Native
         */
        public mouseCode: number = 0;
    }
}