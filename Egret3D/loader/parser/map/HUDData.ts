module egret3d {
    /**
    * @private
    */
    export class HUDData {
        public name: string;
        public texture: string;
        public bothside: boolean = false;
        public x: number;
        public y: number;
        public rx: number;
        public ry: number;
        public rz: number;
        public width: number;
        public height: number;
        public hud: HUD;
        public vs: string;
        public fs: string;
    }
}