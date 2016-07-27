module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.ParserUtils
    * @classdesc
    * 用 ParserUtils 类 解析所有egret自定义 文件
    * @see egret3d.EventDispatcher 
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ParserUtils extends EventDispatcher {

        /**
        * @language zh_CN
        * 解析出的文件对象
        */
        public datas: any;

        /**
        * @language zh_CN
        * 文件格式
        */
        public dataFormat: string;

        private _event: ParserEvent3D = new ParserEvent3D();

        /**
        * @language zh_CN
        * 传入数据流对象，解析出相应的数据对象.
        * 解析dds tga jpg png esm eam eca
        * @param buffer 需要解析的数据流
        * @returns 是否解析成功
        */
        public parser(buffer: ArrayBuffer): boolean {
            var bytes: ByteArray = new ByteArray(buffer);
            var fileFormatBytes: ByteArray = new ByteArray();
            bytes.readBytes(fileFormatBytes, 0, 3);
            bytes.position = 0;
            var fileFormat: number = 0;
            fileFormat |= fileFormatBytes.readUnsignedByte() << 16;
            fileFormat |= fileFormatBytes.readUnsignedByte() << 8;
            fileFormat |= fileFormatBytes.readUnsignedByte();
            switch (fileFormat) {
                case 0x00444453: // dds
                    this.datas = DDSParser.parse(buffer);
                    this.dataFormat = ".dds";
                    this.doLoadComplete();
                    break;
                case 0x00000002:
                case 0x00000010:
                    this.datas = TGAParser.parse(buffer);
                    this.dataFormat = ".tga";
                    this.doLoadComplete();
                    break;
                case 0x00FFD8FF: // jpg
                    var blob: Blob = new Blob([buffer]);
                    this.dataFormat = ".jpg";
                    var img = document.createElement("img");
                    if (window['createObjectURL'] != undefined) { // basic
                        img.src = window['createObjectURL'](blob);
                    } else if (window['URL'] != undefined) { // mozilla(firefox)
                        img.src = window['URL'].createObjectURL(blob);
                    } else if (window['webkitURL'] != undefined) { // webkit or chrome
                        img.src = window['webkitURL'].createObjectURL(blob);
                    }
                    img.onload = () => this.onLoad(img);
                    break;
                case 0x0089504E: // png
                    var blob: Blob = new Blob([buffer]);
                    this.dataFormat = ".png";
                    var img = document.createElement("img");
                    if (window['createObjectURL'] != undefined) { // basic
                        img.src = window['createObjectURL'](blob);
                    } else if (window['URL'] != undefined) { // mozilla(firefox)
                        img.src = window['URL'].createObjectURL(blob);
                    } else if (window['webkitURL'] != undefined) { // webkit or chrome
                        img.src = window['webkitURL'].createObjectURL(blob);
                    }
                    img.onload = () => this.onLoad(img);
                    break;
                case 0x0065736D: // esm
                    this.dataFormat = ".esm";
                    this.datas = ESMParser.parse(buffer);
                    this.doLoadComplete();
                    break;
                case 0x0065616D: // eam
                    this.dataFormat = ".eam";
                    this.datas = EAMParser.parse(buffer);
                    this.doLoadComplete();
                    break;
                case 0x00656361: // eca
                    this.dataFormat = ".eca";
                    this.datas = ECAParser.parse(buffer);
                    this.doLoadComplete();
                    break;
                default:
                    return false;
            }
            return true;
        }

        protected onLoad(img: HTMLImageElement) {
            this.datas = new ImageTexture(img);
            this.doLoadComplete();
        }

        protected doLoadComplete() {
            this._event.eventType = ParserEvent3D.PARSER_COMPLETE;
            this._event.data = this;
            this._event.parser = this;
            this.dispatchEvent(this._event);
        }
    }
}