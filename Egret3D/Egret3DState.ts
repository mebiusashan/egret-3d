module egret3d {

    /**
     * @private
     */
    class FPSInfo{
        private static fps: number = 16.6666 ; //ms 
        private averageFPS: number = 60;
        private averageDelay: number = 16;

        private delayNumber: number = 0;
        private countFrame: number = 30;

        public update(time: number, delay: number):string {
            this.delayNumber += delay - 1; 
            if (this.countFrame-- == 0) {
                this.countFrame = 30;
                this.averageDelay = Math.floor(this.delayNumber / this.countFrame);
                this.averageFPS = Math.floor(1000 / this.averageDelay);
                this.averageFPS = Math.min(this.averageFPS,60);
                this.delayNumber = 0;
            }
            return " " + this.averageFPS.toString() + " fps/" + this.averageDelay.toString() + " delay";
        }
    }

    /**
     * @private
     */
    export class Egret3DState {

        private static use: boolean = false; 


        private static _info: HTMLDivElement;
        private static _time: HTMLDivElement;
        private static _dataInfo: HTMLDivElement; //vertex length | vertex face length | draw call | draw program number | number mouse objects

        private static fpsInfo: FPSInfo = new FPSInfo();
        private static info: string;

        static initState() {
            Egret3DState.use = true; 
            Egret3DState._info = <HTMLDivElement>document.createElement("div");
            Egret3DState._time = <HTMLDivElement>document.createElement("div");
            Egret3DState._dataInfo = <HTMLDivElement>document.createElement("div");

            //font-size: 100px; text-align: center; color: #9e9e9e; 
            Egret3DState._info.style.fontSize = "14px";
            Egret3DState._info.style.backgroundColor = "rgba(158,158,158,0.3)";
            Egret3DState._info.style.width = "200px";
            Egret3DState._info.style.fontFamily = "Corbel";

            Egret3DState._dataInfo.style.fontFamily = "12px";
            Egret3DState._dataInfo.style.fontSize = "12px";
            Egret3DState._dataInfo.style.backgroundColor = "rgba(158,158,158,0.3)";
            Egret3DState._dataInfo.style.width = "200px";
            Egret3DState._dataInfo.style.fontFamily = "Corbel";

            Egret3DState._info.onselect = null;
            Egret3DState._time.onselect = null;
            Egret3DState._dataInfo.onselect = null;

            document.body.appendChild(Egret3DState._info);
            document.body.appendChild(Egret3DState._time);
            document.body.appendChild(Egret3DState._dataInfo);

            Egret3DState._info.style.color = "lightblue";
            Egret3DState._time.style.color = "lightblue";
            Egret3DState._dataInfo.style.color = "lightblue";

            Egret3DState._info.innerText = " Egret3D Graphics " ; 
        }

        public static showTime( time:number , delay:number ) {
            if (!Egret3DState.use) Egret3DState.initState();
            Egret3DState._time.innerText = Egret3DState.fpsInfo.update(time, delay);
            if (window.performance && window.performance["memory"])
                this.showDataInfo("memory: " + window.performance["memory"]["usedJSHeapSize"].toString());
        }

        public static showDataInfo(...data) {
            if (!Egret3DState.use) Egret3DState.initState();
           // Egret3DState._dataInfo.innerText = "";
            var d: any;
            for (d in data) {
                if (data[d])
                    this.info += data[d].toString() + "\r\t"  ;
            }
        }

        public static show() {
            Egret3DState._dataInfo.innerText = this.info;
            this.info = " ";
        }
    }
}