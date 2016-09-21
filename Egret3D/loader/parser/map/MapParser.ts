module egret3d {

    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MapParser {
        protected _mapConfigParser: MapConfigParser;
        protected _data: any;
        protected _versionParser: MapParser;

        constructor(data: any, mapConfigParser: MapConfigParser) {
            this._data = data;
            this._mapConfigParser = mapConfigParser;
            this._versionParser = null;
        }

        public parser() {
        }

        public parseTexture(node: any) {

        }

        public parseMethod(node: any): MatMethodData[] {
            return null;
        }

        public parseMat(node: any): MatSphereData {
            return null;
        }

        public parseNode(node: any): MapNodeData {
            return null;
        }

        public parseEnvironment(environment: any): void {

        }

        public parseHud(node: any): HUDData {
            return null;
        }
    }
}