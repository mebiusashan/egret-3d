module egret3d {

    export class PropertyAnimEvent3D extends Event3D {

        /**
        * @language zh_CN
        * 动画播放完一个周期的事件
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static EVENT_PLAY_COMPLETE: string = "event_play_complete";

        constructor(eventType: string = null, data: any = null) {
            super(eventType, data);
        }
    }

}