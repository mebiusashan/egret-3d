module egret3d {
       /**
    * @private
    */
    export class SortUtil {

        public static sortZindex(a: Quad, b: Quad): number {
            return b.z - a.z;
        }

        public static sortAB(quads: Quad[]):Quad[] {
            return quads.sort((a, b) => SortUtil.sortZindex(a,b) );
        }

        public static sortBA(quads: Quad[]): Quad[] {
            return quads.sort((a, b) => SortUtil.sortZindex(b, a));
        }
    }
}