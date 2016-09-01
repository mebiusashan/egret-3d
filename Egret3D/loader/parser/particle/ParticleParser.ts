module egret3d {
    /**
     * @private 
     * @language zh_CN
     * @class egret3d.ParticleParser
     * @classdesc
     * 用 ParticleParser 解析粒子文件
     */
    export class ParticleParser {

        /**
         * @language zh_CN
         * 粒子的版本号
         * @version Egret 3.0
         * @platform Web,Native
         */
        public version: string;

        public data: ParticleData;
        /**
        * @language zh_CN
        * constructor 
        */
        constructor() {

        }

        /**
         * @language zh_CN
         * @param xml 粒子特效的数据解析
         * @returns ParticleData
         */

        public parseJson(text:string): ParticleData {
            this.data = new ParticleData();
           
            var parser: ParticleJsonParser = new ParticleJsonParser();
            parser.parse(eval("(" + text + ")"), this.data);
            this.version = parser.version;

            this.data.validate();
            return this.data;
        }

        public parseXml(text:string): ParticleData {
            this.data = new ParticleData();

            var parser: ParticleXmlParser = new ParticleXmlParser();
            parser.parse(XMLParser.parse(text), this.data);
            this.version = parser.version;

            this.data.validate();
            return this.data;
        }
      

    }

}