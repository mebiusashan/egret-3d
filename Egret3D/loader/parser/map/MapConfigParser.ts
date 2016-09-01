module egret3d {

    /**
    * @language zh_CN
    * @private
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class MapConfigParser {

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

        constructor(data: any, type: string) {
            switch (type) {
                case "xml":
                    new MapXmlParser(data, this);
                    break;
                case "json":
                    new MapJsonParser(data, this);
                    break;
            }
        }


        public calculateMatTask(data: MatSphereData) {
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

        public calculateNodeTask(data: MapNodeData) {
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

        public calculateHudTask(data: HUDData) {
            if (data.texture) {
                this.taskDict[data.texture] = 0;
            }
        }

        public calculateTextureTask(data: any) {
            if (data.path) {
                this.taskDict[data.path] = 0;
            }
        }

        public processNode() {
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
                if (mapNodeData.tagName != "") {
                    mapNodeData.object3d.tag.name = mapNodeData.tagName;
                }
            }

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
    }
}