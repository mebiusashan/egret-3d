module egret3d {

    /*
    * @private
    */
    export class Reference {
        protected count: number = 0;
        constructor() {
        }

        public incRef() {
            this.count++;
        }

        public decRef() {
            if (this.count - 1 >= 0) {
                this.count--;
            }
        }

        public get isDispose(): boolean {
            return this.count <= 0;
        }
    }
}