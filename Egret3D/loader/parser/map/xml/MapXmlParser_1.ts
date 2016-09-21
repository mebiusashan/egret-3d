module egret3d {

    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MapXmlParser_1 extends MapXmlParser {

        public parseTexture(node: Node) {
            if (node.childNodes.length == 1)
                return null;

            var attr: Attr = null;
            var item: Node;
            var i: number = 0;
            var count: number = 0;
            for (i = 0, count = node.childNodes.length; i < count; i++) {
                item = node.childNodes[i];
                if (this.nodeFilter(item))
                    continue;

                var data: any = {};
                for (var j: number = 0; j < item.attributes.length; ++j) {
                    attr = item.attributes[j];
                    data[attr.name] = attr.value;
                }

                this._mapConfigParser.textures.push(data);

                this._mapConfigParser.calculateTextureTask(data);

            }
        }

        public parseMethod(node: Node): MatMethodData[] {
            if (node.childNodes.length <= 1)
                return null;

            var list = [];
            var item: Node;
            var nodeName: string;
            var count: number = 0;
            var method: MatMethodData;
            var attr: Attr = null;
            for (var i = 0, count = node.childNodes.length; i < count; i++) {
                item = node.childNodes[i];
                nodeName = item.nodeName;
                if (this.nodeFilter(item))
                    continue;
                method = new MatMethodData();
                method.type = nodeName;

                for (var j: number = 0; j < item.attributes.length; ++j) {
                    attr = item.attributes[j];
                    var v: string = typeof method[attr.name];
                    if (v == "string") {
                        method[attr.name] = attr.value;
                    }
                    else if (v == "number") {
                        method[attr.name] = Number(attr.value);
                    }
                    else if (v == "boolean") {
                        method[attr.name] = (attr.value == "true" ? true : false);
                    }
                    else {
                        method[attr.name] = attr.value;
                    }
                }

                for (var j: number = 0; j < item.childNodes.length; ++j) {
                    var textureItem: Node = item.childNodes[j];
                    if (this.nodeFilter(textureItem)) {
                        continue;
                    }
                    var textureData: any = {};
                    for (var k: number = 0; k < textureItem.attributes.length; ++k) {
                        attr = textureItem.attributes[k];
                        textureData[attr.name] = attr.value;
                    }

                    method.texturesData.push(textureData);
                }

                list.push(method);
            }
            return list;
        }

        public parseMat(node: Node): MatSphereData {
            if (node.childNodes.length == 0)
                return null;
            var data: MatSphereData = new MatSphereData();

            var attr: Attr = null;
            for (var i: number = 0; i < node.attributes.length; ++i) {
                attr = node.attributes[i];
                data[attr.name] = attr.value;
            }

            var item: Node;
            var nodeName: string;
            var count: number = 0;
            for (var i = 0, count = node.childNodes.length; i < count; i++) {
                item = node.childNodes[i];
                nodeName = item.nodeName;
                if (this.nodeFilter(item)) {
                    continue;
                }

                if (nodeName == "methods") {
                    data.methods = this.parseMethod(item);
                }
                else if (nodeName == "uvRectangle") {
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        data.uvRectangle[item.attributes[j].name] = Number(item.attributes[j].value);
                    }
                }
                else if (nodeName == "blendMode") {
                    data[item.nodeName] = BlendMode[item.textContent];
                }
                else if (nodeName == "lightIds") {
                    if (item.textContent) {
                        var splits: string[] = item.textContent.split(",");
                        for (var j: number = 0; j < splits.length; ++j) {
                            data.lightIds.push(Number(splits[j]));
                        }
                    }
                }
                else {
                    var v: string = typeof data[item.nodeName];
                    if (v == "string") {
                        data[item.nodeName] = item.textContent;
                    }
                    else if (v == "number") {
                        data[item.nodeName] = Number(item.textContent);
                    }
                    else if (v == "boolean") {
                        data[item.nodeName] = (item.textContent == "true" ? true : false);
                    }
                }
            }

            return data;
        }

        public parseNode(node: Node): MapNodeData {
            if (node.childNodes.length == 1)
                return null;

            var attr: Attr = null;

            var data: MapNodeData = new MapNodeData();

            for (var i: number = 0; i < node.attributes.length; ++i) {
                attr = node.attributes[i];
                var v: string = typeof data[attr.name];
                if (v == "number") {
                    data[attr.name] = Number(attr.value);
                }
                else if (v == "boolean") {
                    data[attr.name] = (attr.value == "true") ? true : false;
                }
                else {
                    data[attr.name] = attr.value;
                }
            }

            var item: Node;
            var nodeName: string;
            var i: number = 0;
            var count: number = 0;
            for (i = 0, count = node.childNodes.length; i < count; i++) {
                item = node.childNodes[i];
                nodeName = item.nodeName;
                if (this.nodeFilter(item)) {
                    continue;
                }
                if (nodeName == "pos") {
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        data[attr.nodeName] = Number(attr.value);
                    }
                }
                else if (nodeName == "rot") {
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        data[attr.nodeName] = Number(attr.value);
                    }
                }
                else if (nodeName == "scale") {
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        data[attr.nodeName] = Number(attr.value);
                    }
                }
                else if (nodeName == "mat") {
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        if (attr.nodeName == "id") {
                            data.materialIDs = (attr.value + "").split(",");
                        }
                    }
                }
                else if (nodeName == "skinClip") {
                    var skinClipData: any = {};
                    data.skinClips.push(skinClipData);
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        skinClipData[attr.nodeName] = attr.value;
                    }
                }
                else if (nodeName == "propertyAnim") {
                    var propertyAnimsData: any = {};
                    data.propertyAnims.push(propertyAnimsData);
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        propertyAnimsData[attr.nodeName] = attr.value;
                    }
                }
                else if (nodeName == "geometry") {
                    var geo: any = {};
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        if (attr.name == "type") {
                            geo[attr.name] = attr.value;
                        }
                        else {

                            geo[attr.name] = Number(attr.value);
                        }
                    }
                    data.geometry = geo;
                }
                else if (nodeName == "sub") {
                    var childData: any = {};
                    for (var j: number = 0; j < item.attributes.length; ++j) {
                        attr = item.attributes[j];
                        childData[attr.name] = attr.value;
                    }
                    data.childs.push(childData);
                }
            }

            return data;
        }

        public parseEnvironment(environment: NodeList): void {
            if (environment.length <= 0) {
                return;
            }

            //解析灯光
            var item: Node;
            var item0: Node;
            var item1: Node;
            var attr: Attr = null;

            for (var iii: number = 0; iii < environment[0].attributes.length; ++iii) {
                attr = environment[0].attributes[iii];
                this._mapConfigParser[attr.name] = (attr.value == "open");
            }


            for (var i = 0, count = environment.length; i < count; i++) {
                item = environment[i];
                for (var ii: number = 0; ii < item.childNodes.length; ++ii) {
                    item0 = item.childNodes[ii];
                    if (this.nodeFilter(item0))
                        continue;
                    if (item0.nodeName == "light") {

                        var lightData: MapLightData = new MapLightData();

                        for (var iii: number = 0; iii < item0.attributes.length; ++iii) {
                            attr = item0.attributes[iii];
                            if (attr.name == "id") {
                                lightData[attr.name] = Number(attr.value);
                            }
                            else {
                                lightData[attr.name] = attr.value;
                            }
                        }

                        this._mapConfigParser.lightDict[lightData.id] = lightData;

                        for (var iii: number = 0; iii < item0.childNodes.length; ++iii) {
                            item1 = item0.childNodes[iii];

                            if (this.nodeFilter(item1)) {
                                continue;
                            }

                            if (item1.nodeName == "direction") {
                                for (var iiii: number = 0; iiii < item1.attributes.length; ++iiii) {
                                    attr = item1.attributes[iiii];
                                    lightData.direction[attr.name] = Number(attr.value);
                                }
                            }
                            else if (item1.nodeName == "position") {
                                for (var iiii: number = 0; iiii < item1.attributes.length; ++iiii) {
                                    attr = item1.attributes[iiii];
                                    lightData.position[attr.name] = Number(attr.value);
                                }
                            }
                            else if (item1.nodeName == "type") {
                                lightData.type = LightType[item1.textContent];
                            }
                            else {
                                lightData[item1.nodeName] = Number(item1.textContent);
                            }
                        }
                    }
                    else if (item0.nodeName == "fog") {

                    }
                }
            }
        }

        public parseHud(node: Node): HUDData {
            if (node.childNodes.length == 1)
                return null;

            var attr: Attr = null;

            var hudData: HUDData = new HUDData();


            for (var i: number = 0; i < node.attributes.length; ++i) {
                attr = node.attributes[i];
                if (attr.nodeName == "bothside") {
                    hudData[attr.nodeName] = (attr.value == "true");
                }
                else {
                    hudData[attr.nodeName] = attr.value;
                }
            }
            var item: Node;
            var nodeName: string;
            var i: number = 0;
            var count: number = 0;
            for (i = 0, count = node.childNodes.length; i < count; i++) {
                item = node.childNodes[i];
                nodeName = item.nodeName;
                if (this.nodeFilter(item)) {
                    continue;
                }
                for (var j: number = 0; j < item.attributes.length; ++j) {
                    attr = item.attributes[j];
                    if (nodeName == "shader") {
                        hudData[attr.nodeName] = attr.value;
                    }
                    else {
                        hudData[attr.nodeName] = Number(attr.value);
                    }
                }
            }

            return hudData;
        }
    }
} 