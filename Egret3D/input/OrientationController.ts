module egret3d {
    
    /**
     * @private
     * @language zh_CN
     * @class egret3D.OrientationControler
     * @classdesc
     * 陀螺仪控制器
     */
    export class OrientationController {
        private acc: DeviceAcceleration;
        private accGravity: DeviceAcceleration;
        private rotationRate: DeviceRotationRate;
        private orientation: Vector3D = new Vector3D();
        private screenOrientation: number = 0;

        private openDebug: boolean = false;
        private accDiv: HTMLElement;
        private accGravityDiv: HTMLElement;
        private rotationRateDiv: HTMLElement;
        private orientationRateDiv: HTMLElement;
        private stateDiv: HTMLElement;

        /**
        * @language zh_CN
        * 偏移旋转
        */
        public offsetRotation: Vector3D = new Vector3D();
        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            if (this.openDebug) {
                this.accDiv = document.createElement("div");
                this.accGravityDiv = document.createElement("div");
                this.rotationRateDiv = document.createElement("div");
                this.orientationRateDiv = document.createElement("div");
                this.stateDiv = document.createElement("div");

                this.accDiv.style.color = "red";
                this.accGravityDiv.style.color = "red";
                this.rotationRateDiv.style.color = "red";
                this.orientationRateDiv.style.color = "red";
                this.stateDiv.style.color = "red";
                this.stateDiv.style.fontSize = "52";

                document.body.appendChild(this.accDiv);
                document.body.appendChild(this.accGravityDiv);
                document.body.appendChild(this.rotationRateDiv);
                document.body.appendChild(this.orientationRateDiv);
                document.body.appendChild(this.stateDiv);
            }
        }

        /**
        * @language zh_CN
        * 初始化
        */
        public start() {

            this.orientationchangeHandler();
            window.addEventListener("orientationchange", () => this.orientationchangeHandler());
            window.addEventListener("devicemotion", (e: DeviceMotionEvent) => this.motionHandler(e));
            window.addEventListener("deviceorientation", (e: DeviceOrientationEvent) => this.orientationHandler(e));
        }

        /**
        * @language zh_CN
        * 释放
        */
        public stop() {

            window.removeEventListener("orientationchange", () => this.orientationchangeHandler());
            window.removeEventListener("devicemotion", (e: DeviceMotionEvent) => this.motionHandler(e));
            window.removeEventListener("deviceorientation", (e: DeviceOrientationEvent) => this.orientationHandler(e));
        }

        /**
        * @language zh_CN
        */
        public orientationchangeHandler() {

            if (window.orientation != undefined)
                this.screenOrientation = <number>window.orientation;
            //.this.state = window.orientation;
        }

        /**
        * @language zh_CN
        * 
        * @param event 
        */
        public motionHandler(event: DeviceMotionEvent) {

            this.acc = event.acceleration;
            this.accGravity = event.accelerationIncludingGravity;
            this.rotationRate = event.rotationRate;
        }

        /**
        * @language zh_CN
        * 
        * @param event 
        * @returns 
        */
        public orientationHandler(event: DeviceOrientationEvent) {

            this.orientation.x = event.alpha;
            this.orientation.y = event.beta;
            this.orientation.z = event.gamma;


            if (this.openDebug)
                this.debug();
        }


        /**
        * @language zh_CN
        * 陀螺仪当前旋转角度
        */
        public fixOritation: Vector3D = new Vector3D();

        private state: number = -1;
        private debug() {
            //this.accDiv.innerHTML = "<br><br><br> acc-x:" + this.acc.x + "<br>acc-y:" + this.acc.y + "<br>acc-z:" + this.acc.z ;
            this.accGravityDiv.innerHTML = "<br><br> Gravity-x:" + this.orientation.x * MathUtil.RADIANS_TO_DEGREES + "<br>Gravity-y:" + this.orientation.y + "<br>Gravity-z:" + this.orientation.z;
            //this.rotationRateDiv.innerHTML = "<br> Rate-x:" + this.rotationRate.alpha + "<br>Rate-y:" + this.rotationRate.gamma + "<br>Rate-z:" + this.rotationRate.beta;
            this.orientationRateDiv.innerHTML = "<br> orientation-x:" + this.fixOritation.x + "<br>orientation-y:" + this.fixOritation.y + "<br>orientation-z:" + this.fixOritation.z;
            //this.orientationRateDiv.innerHTML = "<br> orientation-x:" + this.fixOritation.x * MathUtil.RADIANS_TO_DEGREES + "<br>orientation-y:" + this.fixOritation.y * MathUtil.RADIANS_TO_DEGREES + "<br>orientation-z:" + this.fixOritation.z * MathUtil.RADIANS_TO_DEGREES;
            this.stateDiv.innerHTML = "<br> state: " + this.state;
        } 

        /**
        * @language zh_CN
        * 
        * @returns number
        */
        public getOrientation(): number {

            switch (window.screen.msOrientation) {
                case 'landscape-primary':
                    return -90;
                case 'landscape-secondary':
                    return 90;
                case 'portrait-secondary':
                    return 180;
                case 'portrait-primary':
                    return 0;
            }
            // this returns 90 if width is greater then height 
            // and window orientation is undefined OR 0
            // if (!window.orientation && window.innerWidth > window.innerHeight)
            //   return 90;
            return <number>window.orientation || 0;
        }

        private degtorad = Math.PI / 180; // Degree-to-Radian conversion
        private q: Quaternion = new Quaternion();
        private q1: Quaternion = new Quaternion();
        private outQ: Quaternion = new Quaternion();

        /**
        * @language zh_CN
        * 由陀螺仪的角度值计算出旋转四元数
        * @param alpha 
        * @param beta 
        * @param gamma 
        * @returns 旋转四元数
        */
        public getQuaternion(alpha: number, beta: number, gamma: number): Quaternion {

            var _x = beta ? beta * this.degtorad : 0; // beta value
            var _y = gamma ? gamma * this.degtorad : 0; // gamma value
            var _z = alpha ? alpha * this.degtorad : 0; // alpha value

            _x = Math.floor(_x * 100) / 100;
            _y = Math.floor(_y * 100)/100 ;

            var orient = -this.getOrientation() * this.degtorad;// this.getOrientation()) * this.degtorad ; // O
            this.state = this.getOrientation();

            var cX = Math.cos(_x / 2);
            var cY = Math.cos(_y / 2);
            var cZ = Math.cos(_z / 2);
            var sX = Math.sin(_x / 2);
            var sY = Math.sin(_y / 2);
            var sZ = Math.sin(_z / 2);

            //this.q1.fromAxisAngle(Vector3D.Y_AXIS, alpha * this.degtorad);
            //
            // ZXY quaternion construction.
            //

            this.q.w = cX * cY * cZ - sX * sY * sZ;
            this.q.x = sX * cY * cZ - cX * sY * sZ;
            this.q.y = cX * sY * cZ + sX * cY * sZ;
            this.q.z = cX * cY * sZ + sX * sY * cZ;

            var zee: Vector3D = new Vector3D(0, 0, 1);
            var q0: Quaternion = new Quaternion();
            q0.fromAxisAngle(zee, orient);
            this.q.multiply(this.q, q0);                                      // camera looks out the back of the device, not the top

            zee.setTo(-1, 0, 0);
            q0.fromAxisAngle(zee, 90 * this.degtorad);
            this.q.multiply(this.q, q0);

            return this.q;
        }

        private fix: Vector3D = new Vector3D();
        private fixinterpolate: Vector3D = new Vector3D();
        private fixAxis: Vector3D = new Vector3D();
        private caheFixAxis: Vector3D = new Vector3D();
        private steps: number = 1 ;
        private interpolate: boolean = true;
        /**
        * @language zh_CN
        * 数据更新
        * @param camera3D 当前相机
        */
        public update(view3D: View3D) {

            this.getBaseQuaternion(this.orientation.x, this.orientation.y, this.orientation.z);
            this.q.toEulerAngles(this.fixOritation);

            if (this.interpolate) {
                this.fixinterpolate.x = (this.fixOritation.x - this.fix.x);
                this.fixinterpolate.y = (this.fixOritation.y - this.fix.y);
                this.fixinterpolate.z = (this.fixOritation.z - this.fix.z);

                this.caheFixAxis.x = this.fixOritation.x / Math.abs(this.fixOritation.x) ;
                this.caheFixAxis.y = this.fixOritation.y / Math.abs(this.fixOritation.y) ;
                this.caheFixAxis.z = this.fixOritation.z / Math.abs(this.fixOritation.z) ; 

                if (this.fixAxis.x == this.caheFixAxis.x && this.fixAxis.y == this.caheFixAxis.y && this.fixAxis.z == this.caheFixAxis.z ) {
                    this.fix.x += this.fixinterpolate.x / (this.steps + 0.01);
                    this.fix.y += this.fixinterpolate.y / (this.steps + 0.01);
                    this.fix.z += this.fixinterpolate.z / (this.steps + 0.01);
                } else {
                    this.fix.x = this.fixOritation.x;
                    this.fix.y = this.fixOritation.y;
                    this.fix.z = this.fixOritation.z;
                    this.fixAxis.x = this.caheFixAxis.x;
                    this.fixAxis.y = this.caheFixAxis.y;
                    this.fixAxis.z = this.caheFixAxis.z;
                }

                view3D.camera3D.rotationX = -this.fix.x ;
                view3D.camera3D.rotationY = -this.fix.y ;
                view3D.camera3D.rotationZ = this.fix.z ;
            } else {
                view3D.camera3D.rotationX = -this.fixOritation.x;
                view3D.camera3D.rotationY = -this.fixOritation.y;
                view3D.camera3D.rotationZ = this.fixOritation.z;
            }

            //view3D.scene.rotationX = -90;

        }

        private getBaseQuaternion(alpha: number, beta: number, gamma: number) {

            var _x = beta ? beta * this.degtorad : 0; // beta value
            var _y = gamma ? gamma * this.degtorad : 0; // gamma value
            var _z = alpha ? alpha * this.degtorad : 0; // alpha value

            var cX = Math.cos(_x / 2);
            var cY = Math.cos(_y / 2);
            var cZ = Math.cos(_z / 2);
            var sX = Math.sin(_x / 2);
            var sY = Math.sin(_y / 2);
            var sZ = Math.sin(_z / 2);

            //
            // ZXY quaternion construction.
            //
            var w = cX * cY * cZ - sX * sY * sZ;
            var x = sX * cY * cZ - cX * sY * sZ;
            var y = cX * sY * cZ + sX * cY * sZ;
            var z = cX * cY * sZ + sX * sY * cZ;

            this.q.w = w ;
            this.q.x = x ;
            this.q.y = y ;
            this.q.z = z;

        return this.q ;
    }
    }
} 