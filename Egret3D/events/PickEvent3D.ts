module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.PickEvent3D
    * @classdesc
    * PickEvent3D 是所有引擎中可操作物体拣选事件的事件类型标记。
    * 当IRender对象开启了 enablePick ，并且监听了PickEvent3D事件后，
    * 鼠标或触摸对IRender对象进行操作后会产生一些对应的事件进行影响。
    * 只有Object3D对象调用addEventListener 才会产生下类事件
    * @includeExample events/PickEvent3D.ts
    * @see egret3d.Event3D
    * @see egret3d.EventDispatcher
    * @see egret3d.Object3D
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class PickEvent3D extends Event3D {

        /**
         * @language zh_CN
         * PICK_CLICK 点击拣选事件
         * 手机上没有此事件 
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static PICK_CLICK: string = "onPickClick";

        /**
         * @language zh_CN
         * PICK_DOWN  按下拣选事件
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static PICK_DOWN: string = "onPickDown";

        /**
         * @language zh_CN
         * PICK_UP 弹起拣选事件
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static PICK_UP: string = "onPickUp";

        /**
         * @language zh_CN
         * PICK_MOVE 光标移动拣选
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static PICK_MOVE: string = "onPickMove";

        /**
         * @language zh_CN
         * PICK_WHEEL 滚轮滚动拣选事件
         * @version Egret 3.0
         * @platform Web,Native
         */
        public static PICK_WHEEL: string = "onPickWheel";

        /**
         * @language zh_CN
         * 拣选结果数据。
         * @version Egret 3.0
         * @platform Web,Native
         */
        public pickResult: PickResult;

    }
}