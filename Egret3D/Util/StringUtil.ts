module egret3d {

    /**
     * @private
     * @class egret3d.StringUtil
     * @classdesc
     * 字符串处理工具类
     */
    export class StringUtil {

        /**
         * @language zh_CN
         * @private
         */
        private static _filterChar: string[] = [" ", "  ", ";", "\n", "\r", "\t", "\n", "\r", "\t"];


        /**
         * @language zh_CN
         * @private
         * 解析文件内容(按行解析)
         * @param file
         * @returns 行列表
         */
        public static parseContent(file: string): Array<string> {

            var shaderList: Array<string> = new Array<string>();
            var node: string = "";
            var endChar: string = ";";
            var index: number = -1;

            for (var i: number = 0; i < file.length; ++i) {
                if (file.charAt(i) == "{") {
                    index = node.indexOf("=");
                    if (index < 0) {
                        endChar = "}";
                    }
                }

                if (node == "") {
                    if (file.charAt(i) == " " || file.charAt(i) == "    " || file.charAt(i) == "\t") {
                        continue;
                    }
                }

                node += file.charAt(i);
                if (endChar != "\n") {
                    if (node.indexOf("#extension") >= 0) {
                        endChar = "\n";
                    }
                }
               
                if (endChar == file.charAt(i)) {
                    if (endChar == "}") {
                        var s_num: number = 0;
                        var e_num: number = 0;
                        for (var j: number = 0; j < node.length; ++j) {
                            if (node.charAt(j) == "{") {
                                s_num++;
                            }
                            else if (node.charAt(j) == "}") {
                                e_num++;
                            }
                        }

                        if (s_num != e_num) {
                            continue;
                        }

                        if (node.indexOf("struct") >= 0) {
                            endChar = ";";
                            continue;
                        }
                    }

                    if (node.length > 0) {
                        shaderList.push(node);
                    }
                    node = "";
                    endChar = ";";
                }
            }

            return shaderList;
        }

        /**
         * @language zh_CN
         * 解析一行的内容 有多少个成员
         * @param line 源内容
         * @returns 成员列表
         */
        public static parseLines(line: string): Array<string> {

            var list: Array<string> = new Array<string>();
            var value: string = "";
            var isE: boolean = false;
            for (var i: number = 0; i < line.length; ++i) {
                if (isE) {
                    if (line.charAt(i) == ";") {
                        isE = false;
                        if (value.length > 0) {
                            list.push(value);
                            value = "";
                        }
                        break;
                    }
                    value += line.charAt(i);
                    continue;
                }
                if (line.charAt(i) != " " && line.charAt(i) != "\t" && line.charAt(i) != "," &&
                    line.charAt(i) != "\r" && line.charAt(i) != "\n" && line.charAt(i) != ":") {
                    if (line.charAt(i) == ";") {
                        if (value.length > 0) {
                            list.push(value);
                            value = "";
                        }
                        break;
                    }
                    else if (line.charAt(i) == "=") {
                        if (value.length > 0) {
                            list.push(value);
                            value = "";
                        }
                        list.push("=");
                        isE = true;
                        continue;
                    }

                    value += line.charAt(i);
                    if (i == line.length - 1 && line != "") {
                        list.push(value);
                        value = "";
                    }
                }
                else {
                    if (value != "") {
                        list.push(value);
                        value = "";
                    }
                }
            }
            return list;
        }

        /**
         * @language zh_CN
         * 是否存在此字符串
         * @param fields 被检测的列表
         * @param str 比较字符串
         * @returns 成功返回true
         */
        public static  hasString(fields: Array<string>, str: string): number {

            for (var i: number = 0; i < fields.length; ++i) {
                if (fields[i] == str) {
                    return i;
                }
            }

            return -1;
        }

        /**
         * @language zh_CN
         * 得到值的内容
         * @param fields 成员列表
         * @returns 值
         */
        public static  getVarName(fields: Array<string>): string {

            var index: number = this.hasString(fields, "=");
            if (index >= 0) {
                index -= 1;
                if (index >= 0 && index < fields.length) {
                    return fields[index];
                }
            }
            else {
                index = fields.length - 1;
                if (index >= 0 && index < fields.length) {
                    return fields[index];
                }
            }
            return "";
        }

        /**
         * @language zh_CN
         * 返回变量的值
         * @param fields 变量数据列表
         * @returns 变量的值
         */
        public static  getVarValue(fields: Array<string>): string {

            var index: number = this.hasString(fields, "=");
            if (index >= 0) {
                index += 1;
                if (index >= 0 && index < fields.length) {
                    return fields[index];
                }
            }
            return "";
        }

        /**
         * @language zh_CN
         * 返回变量类型
         * @param fields 变量数据列表
         * @returns 变量类型
         */
        public static getVarType(fields: Array<string>): string {

            var index: number = this.hasString(fields, "=");
            if (index >= 0) {
                index -= 2;
                if (index >= 0 && index < fields.length) {
                    return fields[index];
                }
            }
            else {
                index = fields.length - 2;
                if (index >= 0 && index < fields.length) {
                    return fields[index];
                }
            }
            return "";
        }

        /**
         * @language zh_CN
         * 返回变量属性
         * @param fields 变量数据列表
         * @returns 变量属性
         */
        public static getVarKey(fields: Array<string>): string {

            var index: number = this.hasString(fields, "=");
            if (index >= 0) {
                index -= 3;
                if (index >= 0 && index < fields.length) {
                    return fields[index];
                }
            }
            else {
                index = fields.length - 3;
                if (index >= 0 && index < fields.length) {
                    return fields[index];
                }
            }
            return "";
        }

        /**
         * @language zh_CN
         * @private
         * 筛选文件中的指定字符去掉
         * @param file xxx
         * @returns 筛选后的字符
         */
        public static  processShaderFile(file: string): string {

            var filterChar: string[] = ["\n", "\r"];
            filterChar = [];
            var src: string = file;
            var dest: string = src;

            while (true) {
                var pos: number = src.indexOf("//");
                if (pos < 0) {
                    break;
                }
                var end: number = src.indexOf("\r\n", pos);
                if (end == -1) {
                    end = src.indexOf("\n", pos);
                }
                var slice_s: string = src.slice(pos, end);
                src = src.replace(slice_s, "");
                if (src == dest) {
                    break;
                }
                dest = src;
            }

            for (var i: number = 0; i < filterChar.length; ++i) {
                while (true) {
                    dest = src.replace(filterChar[i], "");
                    if (src == dest) {
                        break;
                    }
                    src = dest;
                }
            }

            return src;
        }


        /**
         * @language zh_CN
         * 解析字符颜色值
         * @param color
         * @returns
         */
        public static colorRgb(color: string): string {

            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            var sColor = color.toLowerCase();
            if (sColor && reg.test(sColor)) {
                if (sColor.length === 4) {
                    var sColorNew = "#";
                    for (var i = 1; i < 4; i += 1) {
                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                    }
                    sColor = sColorNew;
                }
                //处理六位的颜色值  
                var sColorChange = [];
                for (var i = 1; i < 7; i += 2) {
                    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                }
                return "RGB(" + sColorChange.join(",") + ")";
            }
            else {
                return sColor;
            }
        }

        /**
         * @language zh_CN
         * @private
         * @returns
         */
        public static  getLineType(line: string): string {
            var index: number = line.indexOf("{");
            if (index > 0) {
                var firstStr: string = line.substr(0, index);
                if (firstStr.indexOf("struct") >= 0) {
                    var s_pos: number = firstStr.lastIndexOf(" ");
                    s_pos++;
                    var structName: string = firstStr.substr(s_pos, firstStr.length - s_pos);
                    return ("struct " + structName);
                }
                if (firstStr.indexOf("=") < 0) {

                    var pos: number = line.indexOf("(");
                    var s_pos: number = line.lastIndexOf(" ", pos);
                    s_pos++;
                    var func: string = line.substr(s_pos, pos - s_pos);

                    return ("function " + func);
                }
            }
            return "unknown";
        }
        
        /**
         * @language zh_CN
         * @private
         * @returns
         */
        public static processStruct(name: string, structStr: string, content: GLSL.ShaderContent) {
            var pos: number = structStr.lastIndexOf("}");
            pos++;
            var end: number = structStr.lastIndexOf(";");
            var varName = structStr.substr(pos, end - pos);
            var varList: Array<string> = StringUtil.parseLines(varName);
            for (var i: number = 0; i < varList.length; ++i) {
                var varTmp: GLSL.TmpVar = StringUtil.getTemper(name + " " + varList[i] + ";");
                if (varTmp)
                    content.addVar(varTmp);
            }
        }
                
        /**
         * @language zh_CN
         * @private
         * @returns
         */
        public static getAttribute(shaderLine: string): GLSL.Attribute {
            var tempStr: string = shaderLine;
            var tmpName: string;
            var valueType: string;
            var attribute: GLSL.TmpVar;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            tmpName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            attribute = new GLSL.Attribute(tmpName, valueType);
            attribute.value = StringUtil.getVarValue(tempArray);
            return attribute;
        }

        /**
        * @language zh_CN
        * @private
        * @returns
        */
        public static getTemper(shaderLine: string): GLSL.TmpVar {
            var tempStr: string = shaderLine;
            var tmpName: string;
            var valueType: string;
            var tmpVar: GLSL.TmpVar;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            tmpName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            tmpVar = new GLSL.TmpVar(tmpName, valueType);
            tmpVar.value = StringUtil.getVarValue(tempArray);
            return tmpVar;
        }
        
        /**
        * @language zh_CN
        * @private
        * @returns
        */
        public static getVarying(shaderLine: string): GLSL.Varying {
            var tempStr: string = shaderLine;
            var varyingName: string;
            var valueType: string;
            var varying: GLSL.Varying;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            varyingName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            varying = new GLSL.Varying(varyingName, valueType );
            return varying;
        }
        
        /**
        * @language zh_CN
        * @private
        * @returns
        */
        public static getUniform(shaderLine: string): GLSL.Uniform {
            var tempStr: string = shaderLine;
            var uniformName: string;
            var valueType: string;
            var uniform: GLSL.Uniform;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            uniformName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            uniform = new GLSL.Uniform(uniformName, valueType);
            return uniform;
        }
        
        /**
        * @language zh_CN
        * @private
        * @returns
        */
        public static getConst(shaderLine: string): GLSL.ConstVar {
            var tempStr: string = shaderLine;
            var constVarName: string;
            var valueType: string;
            var varValue: string;
            var constVar: GLSL.ConstVar;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            constVarName = StringUtil.getVarName(tempArray);
            valueType = StringUtil.getVarType(tempArray);
            varValue = StringUtil.getVarValue(tempArray);

            constVar = new GLSL.ConstVar(constVarName, valueType, varValue);

            return constVar;
        }

        public static getExtension(shaderLine: string): GLSL.Extension {
            var start: number = shaderLine.indexOf("#");
            var end: number = shaderLine.indexOf(" ");
            var type: string = shaderLine.substr(start, end);
            var namePosEnd: number = shaderLine.indexOf(":");
            var name: string = shaderLine.substr(end, namePosEnd - end);
            name = StringUtil.replaceCharacter(name, [" "], "");
            namePosEnd += 1;
            var value: string = shaderLine.substr(namePosEnd, shaderLine.length - namePosEnd);
            value = StringUtil.replaceCharacter(value, [" ", ":", "\n", "\r"], "");
            var extension: GLSL.Extension = new GLSL.Extension(name);
            extension.value = value;
            return extension;
        }
        
        /**
        * @language zh_CN
        * @private
        * @returns
        */
        public static getSampler2D(shaderLine: string): GLSL.Sampler2D {
            var tempStr: string = shaderLine;
            var sampler2DName: string;
            var valueType: string;
            var sampler2D: GLSL.Sampler2D;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            sampler2DName = StringUtil.getVarName(tempArray);
            sampler2D = new GLSL.Sampler2D(sampler2DName);
            return sampler2D;
        }
        
        /**
        * @language zh_CN
        * @private
        * @returns
        */
        public static getSampler3D(shaderLine: string): GLSL.Sampler3D {
            var tempStr: string = shaderLine;
            var sampler3DName: string;
            var valueType: string;
            var sampler3D: GLSL.Sampler3D;
            var tempArray: Array<string> = StringUtil.parseLines(tempStr);
            sampler3DName = StringUtil.getVarName(tempArray);

            sampler3D = new GLSL.Sampler3D(sampler3DName);
            return sampler3D;
        }
        
        /**
        * @language zh_CN
        * @private
        * @returns
        */
        public static filterCharacter(name: string): string {
            var src: string = name;
            var dest: string = src;
            for (var i: number = 0; i < StringUtil._filterChar.length; ++i) {
                while (true) {
                    dest = src.replace(StringUtil._filterChar[i], "");
                    if (src == dest) {
                        break;
                    }
                    src = dest;
                }
            }
            return dest;
        }

        public static replaceCharacter(src: string, searchValue: Array<string>, replaceValue: string) :string {
            var ret: string = src;
            var isBreak: boolean = false;
            while (!isBreak) {
                isBreak = true;
                for (var i: number = 0; i < searchValue.length; ++i) {
                    if (ret.indexOf(searchValue[i]) >= 0) {
                        isBreak = false;
                        break;
                    }
                }
                for (var i: number = 0; i < searchValue.length; ++i) {
                    ret = ret.replace(searchValue[i], replaceValue);
                }
            }

            return ret;
        }

        public static getURLName(url: string): string {
            var urlArray: string[] = url.split(".");
            urlArray = urlArray[0].split("/");
            return urlArray[urlArray.length-1] ;
        }
    }
}