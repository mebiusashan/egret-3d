module egret3d {

    export class Class_StarWalk extends Class_View3D {

        private view: View3D;
        private gui: QuadStage;
        private particle: ParticleEmitter;
        private panController: PanController;
        private quenLoad: QuenLoad = new QuenLoad();
        private constellationArray: Constellation[] = [];
        private space: Object3D = new Object3D();
        public constructor() {
            super();

            Egret3DEngine.instance.debug = false ;

            this.view = new View3D(0, 0, window.innerWidth, window.innerHeight);
            this.view.camera3D.far = 10000000000;
            this._egret3DCanvas.addView3D(this.view);
            this.view.camera3D.lookAt(new Vector3D(0, 1, 0), new Vector3D(0, 0, 0));
            this.view.addChild3D(this.space);
            this.panController = new PanController(this.view, this.space);


            this._egret3DCanvas.addEventListener(Event3D.ENTER_FRAME, this.update, this);

            this.gui = this.view.getGUIStage();
            TextureResourceManager.getInstance().loadTexture("resource/ui/fonts.json", "resource/ui/fonts.png", this.gui);
            TextureResourceManager.getInstance().loadTexture("resource/ui/gui.json", "resource/ui/GUI.png", this.gui);
            TextureResourceManager.getInstance().addEventListener(LoaderEvent3D.LOADER_COMPLETE, this.onLoadFonts, this);
        }

        private onLoadFonts() {
            gui.BitmapFont.load(TextureResourceManager.getInstance().getTextureDic());
            this.quenLoad.addEventListener(QuenLoad.QUENLOAD_COMPLETE, this.loadComplete, this);
            this.quenLoad.addLoaderQuen("resource/StarWalk/sky_nightime.png");
            this.quenLoad.addLoaderQuen("resource/StarWalk/effect.png");
            this.quenLoad.addLoaderQuen("resource/StarWalk/Stars.csv.json");
            this.quenLoad.addLoaderQuen("resource/StarWalk/Constellation.csv.json");
            var labelBtn: gui.UILabelButton = new gui.UILabelButton();
            var upState: Texture = TextureResourceManager.getInstance().getTexture("normal.png");
            var downState: Texture = TextureResourceManager.getInstance().getTexture("pressed.png");
            labelBtn.setStyle("up", upState);
            labelBtn.setStyle("down", downState);
            labelBtn.label = "按钮";
            labelBtn.addEventListener(MouseEvent3D.MOUSE_UP, e => {
                this.panController.useCompass(true);
            }, this);
            this.view.addGUI(labelBtn);
        }

        private loadComplete() {

            var texture: ITexture = this.quenLoad.getTexture("resource/StarWalk/sky_nightime.png");
            var sky: Mesh = new Mesh(new SphereGeometry(5000, 20, 20), new TextureMaterial(texture));
            sky.material.cullMode = ContextConfig.FRONT;
            this.space.addChild(sky);
            //初始化星星粒子;
            var starsJson = JSON.parse(this.quenLoad.getString("resource/StarWalk/Stars.csv.json"));

            var starsData: { [hd: number]: any } = {};

            var item = null;

            for (var i: number = 0; i < starsJson.root.length; i++) {

                item = starsJson.root[i];

                starsData[item.hd] = item;

                item.x *= 10;
                item.y *= 10;
                item.z *= 10;
            }

            var posList: Vector3D[] = [];

            for (var hd in starsData) {

                item = starsData[hd];

                posList.push(new Vector3D(item.x, item.y, item.z));
            }

            //初始化星座数据;
            var constellationJson = JSON.parse(this.quenLoad.getString("resource/StarWalk/Constellation.csv.json"));

            var constellationData: { [id: number]: any[] } = {};

            for (var i: number = 0; i < constellationJson.root.length; i++) {

                item = constellationJson.root[i];

                if (!constellationData[item.id]) {
                    constellationData[item.id] = [];
                }

                constellationData[item.id].push(item);
            }

            var starsArray: any[];

            var constellation: Constellation;

            for (var id in constellationData) {

                starsArray = constellationData[id];

                constellation = new Constellation(id, starsArray, starsData, this.view,this.space);

                constellation.setVisible(false);

                this.constellationArray.push(constellation);

                this.space.addChild(constellation);

            }

            this.initStarsParticle(posList);
        }

        private initStarsParticle(posList: Vector3D[]): void {
            var count: number = posList.length;
            var mat: TextureMaterial = new TextureMaterial();
            mat.bothside = true;
            mat.ambientColor = 0xffffff;
            mat.blendMode = BlendMode.ADD;

            var data: ParticleData = new ParticleData();
            data.geometry.planeW = data.geometry.planeH = 12;

            var life: ParticleDataLife = data.life;
            life.type = ParticleValueType.RandomConst;
            life.max = 1;
            life.min = 1;
            life.duration = 1;
            life.delay = 0;
            life.loop = true;

            var emission: ParticleDataEmission = data.emission;
            emission.rate = 0;

            emission.bursts = [new Point(0, count)];

            var property: ParticleDataProperty = data.property;
            property.particleCount = count;
            property.bounds.setTo(MathUtil.MAX_VALUE, MathUtil.MAX_VALUE, MathUtil.MAX_VALUE);
            property.renderMode = ParticleRenderModeType.Billboard;
            property.stayAtEnd = true;

            property.colorConst1.setTo(255, 255, 255, 255);
            property.colorConst2.setTo(255, 255, 255, 255);

            var shape: ParticleDataShape = data.shape;
            shape.type = ParticleDataShapeType.External;
            shape.externalPositionList = posList;

            var sheetTexture: ParticleDataTextureSheet = data.textureSheet = new ParticleDataTextureSheet();
            sheetTexture.tileX = 8.0;
            sheetTexture.tileY = 1.0;
            sheetTexture.whole = true;
            sheetTexture.randomRow = false;
            sheetTexture.row = 0.0;
            sheetTexture.frameType = ParticleValueType.RandomConst;
            sheetTexture.min = 0.0;
            sheetTexture.max = 7.0;
            sheetTexture.circles = 1.0;

            data.validate();
            this.particle = new ParticleEmitter(data, mat);
            this.particle.play();

            var loadtex: URLLoader = new URLLoader("resource/StarWalk/effect_8.png");
            loadtex["mat"] = mat;
            loadtex.addEventListener(LoaderEvent3D.LOADER_COMPLETE, function onLoadTexture(e: LoaderEvent3D) {
                e.loader["mat"].diffuseTexture = e.loader.data;
            }, this);

            this.space.addChild(this.particle);

        }

        public update(e: Event3D) {

            this.panController.update();

            for (var i: number = 0; i < this.constellationArray.length; i++) {
                this.constellationArray[i].setVisible(false);
            }

            var item = null;

            var renderList: Array<IRender> = this.view.entityCollect.renderList;

            for (var i: number = 0; i < renderList.length; i++) {
                item = renderList[i];

                if (!item.constellationId) {
                    continue;
                }

                item.setVisible(true);
            }
        }
    }

    class Constellation extends Mesh {

        public constellationId: string;
        public connectLine: Wireframe;
        public constellationName: gui.UITextField;

        // （星座编号， 星座中的星星数据， 所有星星数据, 当前视图）;
        public constructor(constellationId: string, starsArray: any[], starsData: { [hd: number]: any }, view: View3D,space:Object3D) {

            //初始化星座包围盒;
            var max: Vector3D = new Vector3D(-10000000);
            var min: Vector3D = new Vector3D(100000000);
            var item = null;
            var stars = null;
            for (var i: number = 0; i < starsArray.length; i++) {
                item = starsArray[i];
                stars = starsData[item.starsHD];
                if (!stars) {
                    continue;
                }
                if (min.x > stars.x) min.x = stars.x;
                if (min.y > stars.y) min.y = stars.y;
                if (min.z > stars.z) min.z = stars.z;

                if (max.x < stars.x) max.x = stars.x;
                if (max.y < stars.y) max.y = stars.y;
                if (max.z < stars.z) max.z = stars.z;
            }
            super(new CubeGeometry(1, 1, 1));
            this.constellationId = constellationId;
            this.material.alpha = 0;
            this.x = min.x + Math.abs(max.x - min.x) * 0.5;
            this.y = min.y + Math.abs(max.y - min.y) * 0.5;
            this.z = min.z + Math.abs(max.z - min.z) * 0.5;

            //初始化星座星星连线;
            this.connectLine = new Wireframe();
            var pts: number[] = [];
            for (var i: number = 0; i < starsArray.length; i++) {
                item = starsArray[i];
                stars = starsData[item.starsHD];
                if (!stars) {
                    continue;
                }

                if (item.connectHD1 != 0 && starsData[item.connectHD1]) {
                    pts.push(starsData[item.starsHD].x);
                    pts.push(starsData[item.starsHD].y);
                    pts.push(starsData[item.starsHD].z);
                    pts.push(starsData[item.connectHD1].x);
                    pts.push(starsData[item.connectHD1].y);
                    pts.push(starsData[item.connectHD1].z);
                }

                if (item.connectHD2 != 0 && starsData[item.connectHD2]) {
                    pts.push(starsData[item.starsHD].x);
                    pts.push(starsData[item.starsHD].y);
                    pts.push(starsData[item.starsHD].z);
                    pts.push(starsData[item.connectHD2].x);
                    pts.push(starsData[item.connectHD2].y);
                    pts.push(starsData[item.connectHD2].z);
                }

                if (item.connectHD3 != 0 && starsData[item.connectHD3]) {
                    pts.push(starsData[item.starsHD].x);
                    pts.push(starsData[item.starsHD].y);
                    pts.push(starsData[item.starsHD].z);
                    pts.push(starsData[item.connectHD3].x);
                    pts.push(starsData[item.connectHD3].y);
                    pts.push(starsData[item.connectHD3].z);
                }
            }
            this.connectLine.fromVertexsEx(pts);
            this.connectLine.material.diffuseColor = 0xADD8E6;
            space.addChild(this.connectLine);

            //初始化星座名称;
            if (starsArray.length > 0) {
                this.constellationName = new gui.UITextField();
                this.constellationName.text = starsArray[0].name2;
                view.addGUI(this.constellationName);
                this.addFollowUI(this.constellationName);
            }
        }

        public setVisible(visible: boolean): void {
            this.connectLine.visible = visible;
            this.constellationName.visible = visible;
        }
    }
}
