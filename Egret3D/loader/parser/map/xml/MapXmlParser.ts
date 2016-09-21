module egret3d {

    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MapXmlParser extends MapParser {

        constructor(data: any, mapConfigParser: MapConfigParser) {
            super(data, mapConfigParser);

            var versionList: NodeList = data.getElementsByTagName("version");
            this._mapConfigParser.version = Number(versionList[0].textContent);
        }

        public parser() {

            this._versionParser = MapParserUtils.xmlVersion(this._mapConfigParser.version, this._data, this._mapConfigParser);

            var matList: NodeList = this._data.getElementsByTagName("mat");
            var nodeList: NodeList = this._data.getElementsByTagName("node");
            var environment: NodeList = this._data.getElementsByTagName("env");
            var cameraAnimList: NodeList = this._data.getElementsByTagName("cameraAnims");
            var hudList: NodeList = this._data.getElementsByTagName("hud");
            var textureList: NodeList = this._data.getElementsByTagName("texture");

            this.parseEnvironment(environment);

            for (var i: number = 0; i < matList.length; i++) {
                var matNodeData = this._versionParser.parseMat(matList[i]);
                if (matNodeData) {
                    this._mapConfigParser.matDict[matNodeData.id] = matNodeData;

                    this._mapConfigParser.calculateMatTask(matNodeData);
                }
            }

            for (var i: number = 0; i < nodeList.length; i++) {
                var mapNodeData: MapNodeData = this._versionParser.parseNode(nodeList[i]);
                if (mapNodeData) {
                    this._mapConfigParser.nodeList.push(mapNodeData);
                    this._mapConfigParser.calculateNodeTask(mapNodeData);
                }
            }

            for (var i: number = 0; i < textureList.length; i++) {
                this.parseTexture(textureList[i]);
            }

            for (var i: number = 0; i < hudList.length; i++) {
                var hudNodeData = this._versionParser.parseHud(hudList[i]);
                if (hudNodeData) {
                    this._mapConfigParser.hudList.push(hudNodeData);
                    this._mapConfigParser.calculateHudTask(hudNodeData);
                }
            }

            this._mapConfigParser.processNode();
        }     

        protected nodeFilter(node: Node): boolean {
            return node.nodeName == "#text" || node.nodeName == "#comment";
        }
    }
}