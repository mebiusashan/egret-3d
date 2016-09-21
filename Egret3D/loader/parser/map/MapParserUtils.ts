module egret3d {

    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MapParserUtils {

        public static parserConfig(dataConfig: string, type: string): MapConfigParser {
            var config = null;
            switch (type) {
                case "xml":
                    config = XMLParser.parse(dataConfig);
                    break;
                case "json":
                    config = eval("(" + dataConfig + ")");
                    break;
            }
            return new MapConfigParser(config, type);
        }

        public static mapParser(type: string, data: any, mapConfigParser: MapConfigParser) {

            var mapParser: MapParser;
            switch (type) {
                case "xml":
                    mapParser = new MapXmlParser(data, mapConfigParser);
                    break;
                case "json":
                    mapParser = new MapJsonParser(data, mapConfigParser);
                    break;
            }
            if (mapParser) {
                mapParser.parser();
            }
        }

        public static particleParser(type: string, text: string): ParticleData {
            var particleData: ParticleData;
            switch (type) {
                case "xml":
                    particleData = new ParticleParser().parseXml(text);
                    break;
                case "json":
                    particleData = new ParticleParser().parseJson(text);
                    break;
            }
            return particleData;
        }

        public static jsonVersion(version: number, data: any, mapConfigParser: MapConfigParser): MapJsonParser {
            var parser: MapJsonParser;
            switch (version) {
                case 1:
                    parser = new MapJsonParser_1(data, mapConfigParser);
                    break;
            }

            return parser;
        }

        public static xmlVersion(version: number, data: any, mapConfigParser: MapConfigParser): MapXmlParser {
            var parser: MapXmlParser;
            switch (version) {
                case 1:
                    parser = new MapXmlParser_1(data, mapConfigParser);
                    break;
            }

            return parser;
        }

        public static binVersion(version: number, data: any, mapConfigParser: MapConfigParser): MapBinParser {

            return null;
        }
    }
}