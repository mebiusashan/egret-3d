module egret3d {

    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MapJsonParser {

        private _mapConfigParser: MapConfigParser;

        constructor(data: any, mapConfigParser: MapConfigParser) {
            this._mapConfigParser = mapConfigParser;

            this._mapConfigParser.version = Number(data.version);

            this.parseEnvironment(data.env);

            if (data.mats) {
                for (var i: number = 0; i < data.mats.length; i++) {
                    var matNodeData = this.parseMat(data.mats[i]);
                    if (matNodeData) {
                        this._mapConfigParser.matDict[matNodeData.id] = matNodeData;

                        this._mapConfigParser.calculateMatTask(matNodeData);
                    }
                }
            }

            if (data.nodes) {
                for (var i: number = 0; i < data.nodes.length; i++) {
                    var mapNodeData: MapNodeData = this.parseNode(data.nodes[i]);
                    if (mapNodeData) {
                        this._mapConfigParser.nodeList.push(mapNodeData);
                        this._mapConfigParser.calculateNodeTask(mapNodeData);
                    }
                }
            }

            if (data.textures) {
                for (var i: number = 0; i < data.textures.length; i++) {
                    this.parseTexture(data.textures[i]);
                }
            }

            if (data.huds) {
                for (var i: number = 0; i < data.huds.length; i++) {
                    var hudNodeData = this.parseHud(data.huds[i]);
                    if (hudNodeData) {
                        this._mapConfigParser.hudList.push(hudNodeData);
                        this._mapConfigParser.calculateHudTask(hudNodeData);
                    }
                }
            }

            this._mapConfigParser.processNode();
        }

        private parseMethod(node: any): MatMethodData[] {
            var list = [];

            var method: MatMethodData;

            for (var key in node) {
                method = new MatMethodData();
                method.type = key;
                var item: any = node[key]
                for (var met in item) {
                    if (met == "textures") {
                        for (var varKey in item.textures) {
                            var textureData: any = {};
                            for (var texKey in item.textures[varKey]) {
                                textureData[texKey] = item.textures[varKey][texKey];
                            }
                            method.texturesData.push(textureData);
                        }
                    }
                    else {
                        var v: string = typeof method[met];
                        if (v == "string") {
                            method[met] = item[met];
                        }
                        else if (v == "number") {
                            method[met] = Number(item[met]);
                        }
                        else if (v == "boolean") {
                            method[met] = (item[met] == "true" ? true : false);
                        }
                        else {
                            method[met] = item[met];
                        }
                    }
                }

                list.push(method);
            }

            return list;
        }

        private parseMat(node: any): MatSphereData {
            var data: MatSphereData = new MatSphereData();

            for (var key in node) {
                switch (key) {
                    case "uvRectangle":
                        data.uvRectangle.x = Number(node.uvRectangle.x);
                        data.uvRectangle.y = Number(node.uvRectangle.y);
                        data.uvRectangle.width = Number(node.uvRectangle.width);
                        data.uvRectangle.height = Number(node.uvRectangle.height);
                        break;
                    case "methods":
                        data.methods = this.parseMethod(node.methods);
                        break;
                    case "blendMode":
                        data[key] = BlendMode[node[key]];
                        break;
                    case "lightIds":
                        var splits: string[] = node[key].split(",");
                        for (var j: number = 0; j < splits.length; ++j) {
                            data.lightIds.push(Number(splits[j]));
                        }
                        break;
                    default:
                        var type: string = typeof data[key];
                        if (type == "number") {
                            data[key] = Number(node[key]);
                        }
                        else if (type == "boolean") {
                            data[key] = (node[key] == "true");
                        }
                        else if (type == "string") {
                            data[key] = node[key];
                        }
                        break;
                }
            }
            return data;
        }

        private parseNode(node: any): MapNodeData {

            var data: MapNodeData = new MapNodeData();

            for (var key in node) {
                if (key == "pos" || key == "rot" || key == "scale") {
                    for (var tKey in node[key]) {
                        data[tKey] = Number(node[key][tKey]);
                    }
                }
                else if (key == "geometry") {
                    for (var gKey in node[key]) {
                        if (gKey == "type") {
                            data.geometry[gKey] = node[key][gKey];
                        }
                        else {
                            data.geometry[gKey] = Number(node[key][gKey]);
                        }
                    }
                }
                else if (key == "skinClips") {
                    for (var i: number = 0; i < node.skinClips.length; ++i) {
                        data.skinClips.push(node.skinClips[i]);
                    }
                }
                else if (key == "propertyAnims") {
                    for (var i: number = 0; i < node.propertyAnims.length; ++i) {
                        data.propertyAnims.push(node.propertyAnims[i]);
                    }
                }
                else if (key == "mats") {
                    data.materialIDs = (node[key] + "").split(",");
                }
                else if (key == "subs") {
                    for (var i: number = 0; i < node.subs.length; ++i) {
                        data.childs.push(node.subs[i]);
                    }
                }
                else {
                    var v: string = typeof data[key]; 
                    if (v == "number") {
                        data[key] = Number(node[key]);
                    }
                    else if (v == "boolean") {
                        data[key] = (node[key] == "true") ? true : false;
                    }
                    else {
                        data[key] = node[key];
                    }
                }
            }

            return data;
        }


        private parseEnvironment(environment: any): void {

            this._mapConfigParser.directLight = (environment.directLight == "open")
            this._mapConfigParser.pointLight = (environment.pointLight == "open")
            if (!environment.lights) {
                return;
            }

            for (var i: number = 0; i < environment.lights.length; ++i) {
                var lightData: MapLightData = new MapLightData();
                var item: any = environment.lights[i];
                for (var key in item) {
                    switch (key) {
                        case "id":
                        case "diffuseColor":
                        case "ambientColor":
                        case "intensity":
                        case "halfIntensity":
                        case "falloff":
                        case "radius":
                            lightData[key] = Number(item[key]);
                            break;
                        case "type":
                            lightData[key] = item.type;
                            break;
                        case "direction":
                            lightData.direction.x = Number(item[key].x);
                            lightData.direction.y = Number(item[key].y);
                            lightData.direction.z = Number(item[key].z);
                            break;
                        case "position":
                            lightData.position.x = Number(item[key].x);
                            lightData.position.y = Number(item[key].y);
                            lightData.position.z = Number(item[key].z);
                            break;
                    }
                }

                this._mapConfigParser.lightDict[lightData.id] = lightData;
            }
        }

        private parseHud(node: any): HUDData {
            var hudData: HUDData = new HUDData();

            for (var key in node) {
                if (key == "pos" || key == "rot" || key == "size") {
                    for (var tKey in node[key]) {
                        hudData[tKey] = Number(node[key][tKey]);
                    }
                }
                else if (key == "bothside") {
                    hudData[key] = (node[key] == "true");
                }
                else {
                    hudData[key] = node[key];
                }
            }

            return hudData;
        }

        private parseTexture(node: any) {

            this._mapConfigParser.textures.push(node);
            this._mapConfigParser.calculateTextureTask(node);
        }
    }
}