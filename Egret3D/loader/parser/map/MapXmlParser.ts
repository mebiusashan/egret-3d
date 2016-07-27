module egret3d {

    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MapXmlParser {

        /**
        * @language zh_CN
        * 地图配置信息的版本号
        * @version Egret 3.0
        * @platform Web,Native
        */
        public version: number = 1;
        /**
         * @language zh_CN
         * 节点列表 
         * @version Egret 3.0
         * @platform Web,Native
         */
        public nodeList: Array<MapNodeData> = new Array<MapNodeData>();
        public hudList: Array<HUDData> = new Array<HUDData>();

        public matDict: any = {};

        public lightDict: any = {};

        public directLight: boolean = false;
        public pointLight: boolean = false;

        public textures: any = [];

        public taskDict: any = {};

        private parseTexture(node: Node) {
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

                this.textures.push(data);

                this.calculateTextureTask(data);

            }
        }
        constructor(data: any) {

            var versionList: NodeList = data.getElementsByTagName("version");
            this.version = Number(versionList[0].textContent);

            var matList: NodeList = data.getElementsByTagName("mat");
            var nodeList: NodeList = data.getElementsByTagName("node");
            var environment: NodeList = data.getElementsByTagName("env");
            var cameraAnimList: NodeList = data.getElementsByTagName("cameraAnims");
            var hudList: NodeList = data.getElementsByTagName("hud");
            var textureList: NodeList = data.getElementsByTagName("texture");

            this.parseEnvironment(environment);

            for (var i: number = 0; i < matList.length; i++) {
                var matNodeData = this.parseMat(matList[i]);
                if (matNodeData) {
                    this.matDict[matNodeData.id] = matNodeData;

                    this.calculateMatTask(matNodeData);
                }
            }

            for (var i: number = 0; i < nodeList.length; i++) {
                var mapNodeData: MapNodeData = this.parseNode(nodeList[i]);
                if (mapNodeData) {
                    this.nodeList.push(mapNodeData);
                    this.calculateNodeTask(mapNodeData);
                }
            }

            for (var i: number = 0; i < textureList.length; i++) {
                this.parseTexture(textureList[i]);
            }

            for (var i: number = 0; i < hudList.length; i++) {
                var hudNodeData = this.parseHud(hudList[i]);
                if (hudNodeData) {
                    this.hudList.push(hudNodeData);
                    this.calculateHudTask(hudNodeData);
                }
            }

            for (var i: number = 0; i < this.nodeList.length; i++) {
                var mapNodeData: MapNodeData = this.nodeList[i];

                if (mapNodeData.type == "Camera3D") {
                    var camera: Camera3D = new Camera3D();
                    camera.fieldOfView = mapNodeData.fov;
                    camera.near = mapNodeData.clipNear;
                    camera.far = mapNodeData.clipFar;

                    mapNodeData.object3d = camera;

                }
                else if (mapNodeData.type == "Billboard") {
                    mapNodeData.object3d = new Billboard(new TextureMaterial(CheckerboardTexture.texture));
                }
                else if (mapNodeData.type == "Terrain") {
                    mapNodeData.object3d = new Object3D();
                }
                else {
                    mapNodeData.object3d = new Object3D();
                }
                mapNodeData.object3d.name = mapNodeData.name;
                mapNodeData.object3d.visible = mapNodeData.visible;
                mapNodeData.object3d.position = new Vector3D(mapNodeData.x, mapNodeData.y, mapNodeData.z);
                mapNodeData.object3d.orientation = new Quaternion(mapNodeData.rx, mapNodeData.ry, mapNodeData.rz, mapNodeData.rw);
                mapNodeData.object3d.scale = new Vector3D(mapNodeData.sx, mapNodeData.sy, mapNodeData.sz);
            }

            this.processNode();
        }

        private parseMethod(node: Node): MatMethodData[] {
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

        private parseMat(node: Node): MatSphereData {
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


        private processNode() {
            for (var i: number = 0; i < this.nodeList.length; i++) {
                var mapNodeData0: MapNodeData = this.nodeList[i];
                for (var j: number = 0; j < this.nodeList.length; j++) {
                    var mapNodeData1: MapNodeData = this.nodeList[j];
                    if (mapNodeData0.parent == mapNodeData1.insID) {
                        mapNodeData1.object3d.addChild(mapNodeData0.object3d);
                        break;
                    }
                }
            }
        }

        private parseNode(node: Node):MapNodeData {
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
                else  {
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
                //else if (nodeName == "lightIds") {
                //    if (item.textContent == null || item.textContent == "") {
                //        data.lightIds = [];
                //    } else if (item.textContent.indexOf(",") == -1) {
                //        data.lightIds = [item.textContent];
                //    } else {
                //        data.lightIds = (item.textContent + "").split(",");
                //    }
                //}
            }

            ////使外部使用更方便
            //if (data.skinClips == null) {
            //    data.skinClips = [];
            //}
            //if (data.lightIds == null) {
            //    data.lightIds = [];
            //}
            //for (var i: number = 0; i < data.lightIds.length; i++) {
            //    data.lightIds[i] = Number(data.lightIds[i]);
            //}
            //if (data.lightIds.indexOf(0) == -1) {
            //    data.lightIds.push(0);//平行光默认被追加
            //}
            ////
            //if (data.materialIDs == null) {
            //    data.materialIDs = [];
            //}
            //for (var i: number = 0; i < data.materialIDs.length; i++) {
            //    data.materialIDs[i] = Number(data.materialIDs[i]);
            //}


            return data;
        }


        private parseEnvironment(environment: NodeList): void {
            if (environment.length <= 0) {
                return;
            }
            //灯光全局配置
            var dlOpen: boolean;
            var plOpen: boolean;

            //this.enableDirectLight = dlOpen;
            //this.enablePointLight = plOpen;

            //解析灯光
            var item: Node;
            var item0: Node;
            var item1: Node;
            var attr: Attr = null;

            for (var iii: number = 0; iii < environment[0].attributes.length; ++iii) {
                attr = environment[0].attributes[iii];
                this[attr.name] = (attr.value == "open");
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

                        this.lightDict[lightData.id] = lightData;

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
                        }
                    }
                    else if (item0.nodeName == "fog") {

                    }
                }
            }

        }

        private parseHud(node: Node): HUDData {
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

        protected calculateMatTask(data: MatSphereData) {
            if (data.diffuseTextureName != "") {
                this.taskDict[data.diffuseTextureName] = 0;
            }

            if (data.normalTextureName != "") {
                this.taskDict[data.normalTextureName] = 0;
            }

            if (data.specularTextureName != "") {
                this.taskDict[data.specularTextureName] = 0;
            }

            for (var i: number = 0; i < data.methods.length; ++i) {
                var methodData: MatMethodData = data.methods[i];

                for (var j: number = 0; j < methodData.texturesData.length; ++j) {
                    var texData: any = methodData.texturesData[j];
                    if (texData.path) {
                        this.taskDict[texData.path] = 0;
                    }
                }
            }
        }

        protected calculateNodeTask(data: MapNodeData) {
            if (data.path) {
                this.taskDict[data.path] = 0;
            }


            for (var j: number = 0; j < data.skinClips.length; j++) {

                var eamData: any = data.skinClips[j];
                if (eamData.path) {
                    this.taskDict[eamData.path] = 0;
                }
            }

            for (var j: number = 0; j < data.propertyAnims.length; ++j) {
                var propertyAnimsData: any = data.propertyAnims[j];
                if (propertyAnimsData.path) {
                    this.taskDict[propertyAnimsData.path] = 0;
                }
            }
        }

        protected calculateHudTask(data: HUDData) {
            if (data.texture) {
                this.taskDict[data.texture] = 0;
            }
        }

        protected calculateTextureTask(data: any) {
            if (data.path) {
                this.taskDict[data.path] = 0;
            }
        }

        private nodeFilter(node: Node): boolean {
            return node.nodeName == "#text" || node.nodeName == "#comment";
        }
    }
}