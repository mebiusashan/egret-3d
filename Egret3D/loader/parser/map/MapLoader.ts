module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.MapLoader
    * @classdesc
    * 加载egret地图类
    * 用于加载和解析egret地图文件的类，加载完毕后，mesh内容已经添加到了container中.
    * 主要封装了esm/eca/png/eam的加载和组装，以及mesh的render method相关信息，和灯光数据的生效.
    * 加载完毕后，会派发事件LoaderEvent3D.LOADER_COMPLETE
    * @see egret3d.EventDispatcher
    *
    * @includeExample loader/parser/map/MapLoader.ts
    * @version Egret 3.0
    * @platform Web,Native
    */

    export class MapLoader extends EventDispatcher {

        ///**
        //* @language zh_CN
        //* 属性动画对象，加载完成后 需要更新
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public propertyAnims: Array<PropertyAnim> = new Array<PropertyAnim>();

        /**
        * @language zh_CN
        * 场景对象的所有根节点.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public container: Object3D = null;

        /**
        * @language zh_CN
        * 是否自动播放动画  默认不自动播放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public autoPlayAnimation: boolean = false;

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get mapParser(): MapConfigParser {
            return this._mapParser;
        }

        private _pathRoot: string = "";
        private _path: string = "";
        private _mapParser: MapConfigParser = null;
        private _taskCount: number = 0;
        private _event: LoaderEvent3D = new LoaderEvent3D();

        private _type: string = "";

        /**
        * @language zh_CN
        * 任务总数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public taskTotal: number = 0;

        /**
        * @language zh_CN
        * 当前完成的任务个数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public taskCurrent: number = 0;

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public view3d: View3D;

        private _taskDict: any = {};
        private _textures: any = {};

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public skinClipDict: any = {};

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public huds: HUD[] = [];

        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lightDict: any = {};

        /**
        * @language zh_CN
        * 加载场景配置文件 .json 或 .xml
        * @param url 默认参数为null  场景文件路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(url: string = null) {
            super();
            this.container = new Object3D();
            if (url) {
                this.load(url);
            }
        }

        /**
        * @language zh_CN
        * 查找贴图
        * @param name 贴图名字
        * @version Egret 3.0
        * @platform Web,Native
        */
        public findTexture(name: string): ITexture {
            return this._textures[name];
        }

        /**
        * @language zh_CN
        * 加载场景
        * @param url 场景文件路径
        * @version Egret 3.0
        * @platform Web,Native
        */
        public load(url: string) {
            this.reset();

            var s_pos: number = url.lastIndexOf("/");
            s_pos++;
            this._pathRoot = url.substr(0, s_pos);
            this._path = url;

            s_pos = url.lastIndexOf(".");
            s_pos++;
            this._type = url.substr(s_pos, url.length - s_pos);

            this.taskTotal++;
            this._taskDict[this._path] = 1;

            this.addTask();
            var loader: URLLoader = AssetManager.instance.loadAsset(this._path, this.onConfigLoad, this);
        }

        /**
        * @language zh_CN
        * 释放所有数据
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose() {
            super.dispose();
            this.reset();
        }

        private reset() {
            AssetManager.instance.dispose(this);

            this.container.dispose();
            this.taskTotal = 0;
            this.taskCurrent = 0;
            this._taskCount = 0;
            this._taskDict = {};
            this._textures = {};
            this.skinClipDict = {};
            this.huds = [];
            this.lightDict = {};
            this._mapParser = null;

            this._event.target = null;
            this._event.loader = null;
            this._event.data = null;
        }

        private parseConfig(dataConfig: string, type: string) {
            this._mapParser = MapParserUtils.parserConfig(dataConfig, type);

            for (var v in this._mapParser.taskDict) {
                this.taskTotal++;
                this._taskDict[this._pathRoot + v] = 1;
            }

            this.processSkinClip();
            this.createLight();

            for (var i: number = 0; i < this._mapParser.nodeList.length; i++) {
                var mapNodeData: MapNodeData = this._mapParser.nodeList[i];
                if (!mapNodeData.object3d.parent) {
                    this.container.addChild(mapNodeData.object3d);
                }

                if (mapNodeData.type == "Object3D" || mapNodeData.type == "Camera3D") {
                    this.doLoadEpa(mapNodeData);
                }

                switch (mapNodeData.type) {
                    case "Mesh":
                        if (mapNodeData.path) {
                            var path: string = this._pathRoot + mapNodeData.path;

                            this.addTask();
                            var loader: URLLoader = AssetManager.instance.loadAsset(path, this.onEsmLoad, this, mapNodeData);
                        }
                        else if (mapNodeData.geometry) {
                           this.processMesh(mapNodeData, GeometryUtil.createGemetryForType(mapNodeData.geometry.type, mapNodeData.geometry));
                        }
                        break;
                    case "Terrain":
                        if (mapNodeData.path) {
                            var path: string = this._pathRoot + mapNodeData.path;

                            this.addTask();
                            var loader: URLLoader = AssetManager.instance.loadAsset(path, this.onHeightImg, this, mapNodeData);
                        }
                        break;
                    case "ParticleEmitter":
                        if (mapNodeData.path) {
                            var path: string = this._pathRoot + mapNodeData.path;

                            this.addTask();
                            var loader: URLLoader = AssetManager.instance.loadAsset(path, this.onParticleXML, this, mapNodeData);
                        }
                        break;
                }
            }

            for (var i: number = 0; i < this._mapParser.textures.length; ++i) {
                var data: any = this._mapParser.textures[i];
                var path: string = this._pathRoot + data.path;

                this.addTask();
                var loader: URLLoader = AssetManager.instance.loadAsset(path, this.onTexture, this, data.name);
            }

            for (var i: number = 0; i < this._mapParser.hudList.length; ++i) {
                var hudData: HUDData = this._mapParser.hudList[i];
                var hud: HUD = new HUD();

                hud.name = hudData.name;
                hud.bothside = hudData.bothside;
                hud.x = hudData.x;
                hud.y = hudData.y;
                hud.rotationX = hudData.rx;
                hud.rotationY = hudData.ry;
                hud.rotationZ = hudData.rz;
                hud.width = hudData.width;
                hud.height = hudData.height;

                if (hudData.vs) {
                    hud.vsShader = hudData.vs;
                }

                if (hudData.fs) {
                    hud.fsShader = hudData.fs;
                }

                this.huds.push(hud);
                hudData.hud = hud;

                if (!hudData.texture) {
                    continue;
                }
                var path: string = this._pathRoot + hudData.texture;
                AssetManager.instance.loadAsset(path, this.onHudTexture, this, hudData);
            }
        }

        private onParticleXML(e:LoaderEvent3D) {
            var load: URLLoader = e.loader;
            var mapNodeData: MapNodeData = e.param;

            var particleData: ParticleData = load["ParticleData"];
            if (!particleData) {
                particleData = MapParserUtils.particleParser(this._type, load.data);
                load["ParticleData"] = particleData;
                particleData.fileUrl = load.url;
                particleData.fileName = load.fileName;
            }

            this.processParticle(particleData, mapNodeData);

            this.processTask(load);
        }

        private processParticle(particleData: ParticleData, nodeData: MapNodeData): ParticleEmitter {
            if (!particleData.shape.meshFile && !particleData.property.meshFile) {
                this.processParticleGeometry(particleData, nodeData);
            }
            else {

                if (particleData.shape.meshFile) {
                    var path: string = this._pathRoot + particleData.shape.meshFile;

                    this.addTask();

                    var parData: any = {};
                    parData.particle = particleData;
                    parData.nodeData = nodeData;
                    parData.type = "shape";

                    var loader: URLLoader = AssetManager.instance.loadAsset(path, this.onParticleEsmLoad, this, parData);
                }

                if (particleData.property.meshFile) {

                    var path: string = this._pathRoot + particleData.property.meshFile;

                    this.addTask();

                    var parData: any = {};
                    parData.particle = particleData;
                    parData.nodeData = nodeData;
                    parData.type = "property";

                    var loader: URLLoader = AssetManager.instance.loadAsset(path, this.onParticleEsmLoad, this, parData);
                }
            }

            return null;
        }

        private processParticleGeometry(particleData: ParticleData, nodeData: MapNodeData) {
            particleData.materialData = this._mapParser.matDict[nodeData.materialIDs[0]];
            var particleNode: ParticleEmitter = new ParticleEmitter(particleData, new TextureMaterial());

            this.processObject3d(nodeData, particleNode);

            particleNode.play();
            this.processMat(nodeData);
        }

        private processObject3d(nodeData: MapNodeData, object3d: Object3D) {
            object3d.name = nodeData.object3d.name;
            object3d.visible = nodeData.object3d.visible;
            object3d.position = nodeData.object3d.position;
            object3d.orientation = nodeData.object3d.orientation;
            object3d.scale = nodeData.object3d.scale;
            object3d.tag = nodeData.object3d.tag;
            nodeData.object3d.swapObject(object3d);
            nodeData.object3d = object3d;
        }

        private onConfigLoad(e: LoaderEvent3D) {
            var loader: URLLoader = e.loader;

            this.parseConfig(loader.data, this._type);
            this.processTask(loader);

            //loader.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onConfigLoad, this);
        }

        private onHeightImg(e: LoaderEvent3D) {
            var load: URLLoader = e.loader;
            var mapNodeData: MapNodeData = e.param;
            var geometry: any = mapNodeData.geometry;

            var mesh: Terrain = new Terrain(load.data, geometry.width, geometry.height, geometry.depth, geometry.segmentsW, geometry.segmentsH, false, new TextureMaterial(load.data));

            this.processHeightMesh(mapNodeData, mesh);
            this.doLoadEpa(mapNodeData);
            this.processTask(load);
        }

        private onTexture(e: LoaderEvent3D) {
            var load: URLLoader = e.loader;
            var name: string = e.param;
            this._textures[name] = load.data;
            this.processTask(load);
        }

        private onHudTexture(e: LoaderEvent3D) {
            var load: URLLoader = e.loader;
            var hudData: HUDData = e.param;
            hudData.hud.diffuseTexture = load.data;
            this.processTask(load);
        }

        private onMaterialTexture(e: LoaderEvent3D) {
            var load: URLLoader = e.loader;
            var textureData: any = e.param;
            var mesh: Mesh = null;
            var mat: MaterialBase = null;
            var mapNodeData: MapNodeData = textureData.mapNodeData;
            mesh = <Mesh>mapNodeData.object3d;
            mat = mesh.getMaterial(textureData.matID);
            mat[textureData.type] = load.data;

            this.processTask(load);
        }

        private onMethodTexture(e:LoaderEvent3D) {
            var load: URLLoader = e.loader;
            var methodData: any = e.param;
            methodData.method[methodData.textureName] = load.data;

            this.processTask(load);
        }

        private doLoadEpa(mapNodeData: MapNodeData) {

            if (mapNodeData.propertyAnims) {
                for (var j: number = 0; j < mapNodeData.propertyAnims.length; ++j) {
                    var propertyAnimsData: any = mapNodeData.propertyAnims[j];

                    var path: string = this._pathRoot + propertyAnimsData["path"];

                    this.addTask();
                    var loader: URLLoader = AssetManager.instance.loadAsset(path, this.onEpaLoad, this, mapNodeData);
                }
            }
        }

        private processEpa(mapNodeData: MapNodeData, pro: PropertyAnim) {
            mapNodeData.object3d.bindAnimation(pro);
            if (this.autoPlayAnimation) {
                if (mapNodeData.object3d.proAnimation) {
                    mapNodeData.object3d.proAnimation.play();
                }
            }
        }

        private processHeightMesh(mapNodeData: MapNodeData, mesh: Mesh) {

            this.processObject3d(mapNodeData, mesh);

            this.processMat(mapNodeData);
        }

        private processMesh(mapNodeData: MapNodeData, geometry: Geometry) {

            var animation: SkeletonAnimation = this.skinClipDict[mapNodeData.skeletonAnimation];

            var mesh: Mesh = new Mesh(geometry, new TextureMaterial(), animation);

            this.processObject3d(mapNodeData, mesh);

            this.processMat(mapNodeData);

            for (var j: number = 0; j < mapNodeData.skinClips.length; j++) {

                var eamData: any = mapNodeData.skinClips[j];


                var path: string = this._pathRoot + eamData["path"];

                var loadData: any = {};
                loadData.eamData = eamData;
                loadData.mapNodeData = mapNodeData;

                this.addTask();
                var loader: URLLoader = AssetManager.instance.loadAsset(path, this.onEamLoad, this, loadData);
            }
        }

        private onEsmLoad(e:LoaderEvent3D) {
            var load: URLLoader = e.loader;
            var mapNodeData: MapNodeData = e.param;
            if (mapNodeData) {
                this.processMesh(mapNodeData, load.data);


                this.doLoadEpa(mapNodeData);
            }

            this.processTask(load);
        }

        private onParticleEsmLoad(e:LoaderEvent3D) {
            var load: URLLoader = e.loader;
            var parData: any = e.param;

            var particle: ParticleData = parData.particle;
            var nodeData: MapNodeData = parData.nodeData;
            switch (parData.type) {
                case "shape":
                    particle.shape.geometry = load.data;
                    break;
                case "property":
                    particle.property.geometry = load.data;
                    break;
            }
            var needLoad: number = 0;
            var loaded: number = 0;
            if (particle.shape.meshFile) {
                needLoad ++;
            }
            if (particle.property.meshFile) {
                needLoad ++;
            }
            if (particle.shape.geometry) {
                loaded ++;
            }
            if (particle.property.geometry) {
                loaded ++;
            }

            if (loaded == needLoad) {
                this.processParticleGeometry(particle, nodeData);
            }

            this.processTask(load);
        }

        private onEamLoad(e: LoaderEvent3D) {
            var load: URLLoader = e.loader;
            var loadData: any = e.param;

            var clip: SkeletonAnimationClip = load.data;
            clip.animationName = loadData.eamData.name;

            var mesh: Mesh = <Mesh>loadData.mapNodeData.object3d;
            mesh.animation.skeletonAnimationController.addSkeletonAnimationClip(clip.clone());
            if (this.autoPlayAnimation) {
                mesh.animation.play(clip.animationName, 1.0, false, false);
            }
            this.processTask(load);
        }


        private onSkinClip(e: LoaderEvent3D) {
            var load: URLLoader = e.loader;
            var loadData: any = e.param;

            var skeletonAnimation: SkeletonAnimation = loadData.skinClip;

            var clip: SkeletonAnimationClip = load.data;
            clip.animationName = loadData.name;
            clip = clip.clone();

            skeletonAnimation.addSkeletonAnimationClip(clip);

            if (this.autoPlayAnimation) {
                skeletonAnimation.play(clip.animationName, 1.0, false, false);
            }
            this.processTask(load);
        }

        private onEpaLoad(e: LoaderEvent3D) {
            var load: URLLoader = e.loader;
            var mapNodeData: MapNodeData = e.param;
            var pa: PropertyAnim = load.data;
            var clonePa: PropertyAnim = pa.clone();
            this.processEpa(mapNodeData, clonePa);
       
            this.processTask(load);

            //load.removeEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onEpaLoad, this);
        }
        
        private addTask() {
            this._taskCount++;
        }

        private processTaskCurrent(load: URLLoader) {
            if (this._taskDict[load.url]) {
                this.taskCurrent++;
                delete this._taskDict[load.url];
            }

            this._event.eventType = LoaderEvent3D.LOADER_PROGRESS;
            this._event.target = this;
            this._event.loader = load;
            this._event.data = load;
            this.dispatchEvent(this._event);
        }

        private processTask(load: URLLoader) {
            this.processTaskCurrent(load);

            this._taskCount--;

            //console.log("---" + load.url + "---" + this._taskCount);
            if (this._taskCount <= 0) {

                var subEmitters: ParticleEmitter[] = [];
                for (var i: number = 0; i < this._mapParser.nodeList.length; i++) {
                    var mapNodeData: MapNodeData = this._mapParser.nodeList[i];
                    
                    if (mapNodeData.object3d instanceof ParticleEmitter) {
                        var patEmitter: ParticleEmitter = <ParticleEmitter>mapNodeData.object3d;
                        for (var j: number = 0; j < mapNodeData.childs.length; ++j) {
                            var childData: any = mapNodeData.childs[j];
                            var childPatEmitter: Object3D = this.container.findObject3D(childData.name);
                            subEmitters.push(<ParticleEmitter>childPatEmitter);
                            if (childPatEmitter instanceof ParticleEmitter) {
                                patEmitter.addSubEmitter(Number(ParticleDataSubEmitterPhase[childData.phase]), <ParticleEmitter>childPatEmitter);
                            }
                        }
                    }

                    if (mapNodeData.boneBind.skeletonAnimation) {
                        var id: number = Number(mapNodeData.boneBind.skeletonAnimation);
                        var skeletonAnimation: SkeletonAnimation = this.skinClipDict[id];
                        skeletonAnimation.bindToJointPose(mapNodeData.boneBind.boneName, mapNodeData.object3d);
                    }
                }

                var tempEmitter: ParticleEmitter;
                for (var i: number = 0; i < subEmitters.length; i++) {
                    tempEmitter = subEmitters[i];
                    if (tempEmitter && tempEmitter.parent) {
                        tempEmitter.parent.removeChild(tempEmitter);
                    }
                }

                this._event.eventType = LoaderEvent3D.LOADER_COMPLETE;
                this._event.target = this;

                if (this.view3d) {
                    for (var i: number = 0; i < this.huds.length; ++i) {
                        this.view3d.addHUD(this.huds[i]);
                    }
                }

                this.dispatchEvent(this._event);
            }

        }

        private addImaTask(name: string, type: string, matID: number, mapNodeData: MapNodeData, material:MaterialBase):URLLoader {
            var load: URLLoader = null;

            var path: string = this._pathRoot + name;

            var textureData: any = {};
            textureData.type = type;
            textureData.matID = matID;
            textureData.mapNodeData = mapNodeData;

            this.addTask();
            var loader: URLLoader = AssetManager.instance.loadAsset(path, this.onMaterialTexture, this, textureData);

            return load;
        }

        private addMethodImgTask(name:string, method:MethodBase, textureName:string): URLLoader {
            var path: string = this._pathRoot + name;

            var methodData: any = {};
            methodData.method = method;
            methodData.textureName = textureName;

            this.addTask();
            var loader: URLLoader = AssetManager.instance.loadAsset(path, this.onMethodTexture, this, methodData);

            return loader;
        }


        private processMat(mapNodeData: MapNodeData) {
            var mesh: Mesh = <Mesh>mapNodeData.object3d;
            for (var i: number = 0; i < mapNodeData.materialIDs.length; ++i) {
                var matData: MatSphereData = this._mapParser.matDict[mapNodeData.materialIDs[i]];
                if (!matData) {
                    continue;
                }

                var material: TextureMaterial = <TextureMaterial>mesh.getMaterial(i);
                if (!material) {
                    material = new TextureMaterial();
                    mesh.addSubMaterial(i, material);
                }

                var load: URLLoader = null;

                if (matData.diffuseTextureName != "") {
                    load = this.addImaTask(matData.diffuseTextureName, "diffuseTexture", i, mapNodeData, material);
                }

                if (matData.normalTextureName != "") {
                    load = this.addImaTask(matData.normalTextureName, "normalTexture", i, mapNodeData, material);
                }

                if (matData.specularTextureName != "") {
                    load = this.addImaTask(matData.specularTextureName, "specularTexture", i, mapNodeData, material);
                }

                if (matData.matcapTextureName != "") {
                    load = this.addImaTask(matData.matcapTextureName, "matcapTexture", i, mapNodeData, material);
                }

                material.diffuseColor = matData.diffuseColor;
                material.ambientColor = matData.ambientColor;
                material.specularColor = matData.specularColor;
                material.tintColor = matData.tintColor;
                material.alpha = matData.alpha;
                material.specularLevel = matData.specularLevel;
                material.gloss = matData.gloss;


                material.castShadow = matData.castShadow;
                material.acceptShadow = matData.acceptShadow;
                material.repeat = matData.repeat;
                material.bothside = matData.bothside;

                material.drawMode = matData.drawMode;
                material.cullMode = matData.cullMode;
                material.blendMode = matData.blendMode;

                material.cutAlpha = matData.cutAlpha;

                material.uvRectangle.copyFrom(matData.uvRectangle);

                var lightGroup: LightGroup = new LightGroup();

                for (var j: number = 0; j < matData.lightIds.length; ++j) {
                    var light: LightBase = this.lightDict[matData.lightIds[j]];
                    if (light) {
                        lightGroup.addLight(light);
                    }
                }

                if (lightGroup.lightNum > 0) {
                    material.lightGroup = lightGroup;
                }

                this.processMethod(material, matData);
            }

            //if (typeof mesh != "ParticleEmitter") {
            //    if (this.lightGroup.lightNum > 0) {
            //        mesh.lightGroup = this.lightGroup;
            //    }
            //}
        }

        private processMethod(material: MaterialBase, matData: MatSphereData) {
            var load: URLLoader = null;
            var method: MatMethodData = null;

            for (method of matData.methods) {
                var defaultTexture: ITexture = CheckerboardTexture.texture;

                if (method.type == MatMethodData.methodType.lightmapMethod) {
                    var lightmapMethod: LightmapMethod = new LightmapMethod(method.usePower);
                    material.diffusePass.addMethod(lightmapMethod);
                    lightmapMethod.lightTexture = defaultTexture;
                    

                    var textureData: any = method.texturesData[0];
                    load = this.addMethodImgTask(textureData.path, lightmapMethod, textureData.attributeName);
                }
                else if (method.type == MatMethodData.methodType.uvRollMethod) {
                    var uvScrollMethod: UVRollMethod = new UVRollMethod();
                    material.diffusePass.addMethod(uvScrollMethod);

                    uvScrollMethod.speedU = method.uSpeed;
                    uvScrollMethod.speedV = method.vSpeed;
                    material.repeat = true;

                    uvScrollMethod.start(true);
                }
                else if (method.type == MatMethodData.methodType.uvSpriteSheetMethod) {
                    var uvSpriteSheetMethod: UVSpriteSheetMethod = new UVSpriteSheetMethod(method.frameNum, method.row, method.col, method.totalTime);
                    material.diffusePass.addMethod(uvSpriteSheetMethod);
                    uvSpriteSheetMethod.isLoop = method.loop;
                    uvSpriteSheetMethod.delayTime = method.delayTime;
                    if (method.play) {
                        uvSpriteSheetMethod.start(true);
                    }
                }
                else if (method.type == MatMethodData.methodType.mulUvRollMethod) {

                    var uvMethod: MulUVRollMethod = new MulUVRollMethod();
                    material.diffusePass.addMethod(uvMethod);

                    uvMethod.diffuseTexture1 = defaultTexture;

                    uvMethod.setSpeedU(0, method.uSpeed);
                    uvMethod.setSpeedV(0, method.vSpeed);

                    var textureData: any = method.texturesData[0];

                    uvMethod.setSpeedU(1, textureData.uSpeed);
                    uvMethod.setSpeedV(1, textureData.vSpeed);

                    load = this.addMethodImgTask(textureData.path, uvMethod, textureData.attributeName);

                    material.repeat = true;
                    uvMethod.start(true);
                }
                else if (method.type == MatMethodData.methodType.alphaMaskMethod) {
                    var maskmapMethod: AlphaMaskMethod = new AlphaMaskMethod();
                    material.diffusePass.addMethod(maskmapMethod);

                    maskmapMethod.maskTexture = defaultTexture;

                    var textureData: any = method.texturesData[0];

                    load = this.addMethodImgTask(textureData.path, maskmapMethod, textureData.attributeName);
                }
                else if (method.type == MatMethodData.methodType.streamerMethod) {
                    var streamerMethod: StreamerMethod = new StreamerMethod();
                    material.diffusePass.addMethod(streamerMethod);
                    streamerMethod.steamerTexture = defaultTexture;
                    var textureData: any = method.texturesData[0];

                    load = this.addMethodImgTask(textureData.path, streamerMethod, textureData.attributeName);

                    streamerMethod.speedU = method.uSpeed;
                    streamerMethod.speedV = method.vSpeed;
                    streamerMethod.start(true);
                }
                else if (method.type == MatMethodData.methodType.terrainARGBMethod) {
                    var terrainARGBMethod: TerrainARGBMethod = new TerrainARGBMethod(defaultTexture, defaultTexture, defaultTexture, defaultTexture, defaultTexture);
                    material.diffusePass.addMethod(terrainARGBMethod);
                    var textureData: any = null;
                    for (var i: number = 0; i < method.texturesData.length; ++i) {
                        textureData = method.texturesData[i];

                        load = this.addMethodImgTask(textureData.path, terrainARGBMethod, textureData.attributeName);

                        if (i != 0) {
                            
                            terrainARGBMethod.setUVTitling(i - 1, Number(textureData.uvTitlingX), Number(textureData.uvTitlingY));
                        }
                    }

                }
                else if (method.type == MatMethodData.methodType.waterWaveMethod) {
                    var waterWaveMethod: WaterWaveMethod = new WaterWaveMethod();
                    material.diffusePass.addMethod(waterWaveMethod);
                    if (method["deepWaterColor"]) {
                        waterWaveMethod.deepWaterColor = Number( method["deepWaterColor"]);
                    }

                    if (method["shallowWaterColor"]) {
                        waterWaveMethod.shallowWaterColor = Number( method["shallowWaterColor"]);
                    }

                    material.repeat = true;
                }
                else if (method.type == MatMethodData.methodType.waterNormalMethod) {

                    var waterNormalMethod: WaterNormalMethod = new WaterNormalMethod();
                    material.diffusePass.addMethod(waterNormalMethod);
                    waterNormalMethod.normalTextureA = defaultTexture;
                    waterNormalMethod.normalTextureB = defaultTexture;

                    if (method["uScale"] && method["vScale"]) {
                        waterNormalMethod.setUvScale(Number(method["uScale"]), Number( method["vScale"]));
                    }


                    var textureData: any = null;
                    for (var i: number = 0; i < method.texturesData.length; ++i) {
                        textureData = method.texturesData[i];

                        waterNormalMethod.setUvSpeed(i, Number(textureData.uSpeed), Number(textureData.vSpeed));
                        load = this.addMethodImgTask(textureData.path, waterNormalMethod, textureData.attributeName);
                    }

                }
            }
        }

        private processSkinClip() {
            for (var key in this._mapParser.skeletonAnimationDict) {
                var skinClip: any = this._mapParser.skeletonAnimationDict[key];
                var id: number = Number(key);

                var skeletonAnimation: SkeletonAnimation = new SkeletonAnimation();
                this.skinClipDict[id] = skeletonAnimation;

                for (var i: number = 0; i < skinClip.clips.length; ++i) {
                    var clip: any = skinClip.clips[i];

                    var path: string = this._pathRoot + clip.path;
                    clip.skinClip = skeletonAnimation;

                    this.addTask();
                    var loader: URLLoader = AssetManager.instance.loadAsset(path, this.onSkinClip, this, clip);
                }
            }
        }

        //灯光
        private createLight(): void {
            var mapLightData: MapLightData = null;
            for (var key in this._mapParser.lightDict) {

                mapLightData = this._mapParser.lightDict[key];

                if (mapLightData.type == LightType.directlight && this._mapParser.directLight) {
                    var dirLight: DirectLight = new DirectLight(mapLightData.direction);
                    dirLight.lightId = mapLightData.id;
                    dirLight.diffuse = mapLightData.diffuseColor;

                    dirLight.ambient = mapLightData.ambientColor;
                    dirLight.halfIntensity = mapLightData.halfIntensity;
                    dirLight.intensity = mapLightData.intensity;

                    this.lightDict[mapLightData.id] = dirLight;

                } else if (mapLightData.type == LightType.pointlight && this._mapParser.pointLight) {
                    var pLight: PointLight = new PointLight(0);
                    pLight.lightId = mapLightData.id;
                    pLight.position = mapLightData.position;

                    pLight.ambient = mapLightData.ambientColor;
                    pLight.diffuse = mapLightData.diffuseColor;
                    pLight.radius = mapLightData.radius;

                    pLight.cutoff = mapLightData.falloff;
                    pLight.intensity = mapLightData.intensity;

                    this.lightDict[mapLightData.id] = pLight;
                }
            }

        }
    }
}