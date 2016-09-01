module egret3d {
    export class Egret3DLog {
        public static outError(message: any) {
            console.log("Error:" + message);
        }

        public static outWarn(message: any) {
            console.log("Warning:" + message);
        }

        public static outDebug(message: any) {
            if (Egret3DEngine.instance.debug) {
                console.log("Debug:" + message);
            }
        }
    }
}