module egret3d.gui {
         /**
    * @private
    * @class egret3d.gui.UITextFieldAutoSize
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum UITextFieldAutoSize {
        //指定不调整大小。
        NONE,
        //指定将文本视为左对齐文本，即文本字段的左侧固定不变，只在右侧调整单行的大小。
        LEFT,
        //指定将文本视为右对齐文本，即文本字段的右侧固定不变，只在左侧调整单行的大小。
        RIGHT,
        //指定将文本视为居中对齐文本。 
        CENTER,
    }
         /**
    * @private
    * @class egret3d.gui.UITextFieldType
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum UITextFieldType {
        //用户无法编辑的动态文本字段
        DYNAMIC,
        //用户可以编辑的输入文本字段
        INPUT
    }

    class TextLineInfo {
        public lineWidth: number;
        public lineHeight: number;
        public lineText: string;
        public lineQuads: Quad[];
    }

         /**
    * @private
    * @class egret3d.gui.UITextFormatAlign
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum UITextFormatAlign {
        //在文本字段内将文本居中对齐。
        CENTER,
        //在文本字段内将文本两端对齐。
        JUSTIFY,
        //在文本字段内将文本左对齐。
        LEFT,
        //在文本字段内将文本右对齐。
        RIGHT
    }

         /**
    * @private
    * @class egret3d.gui.UITextFormat
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UITextFormat {

    }

         /**
    * @private
    * @class egret3d.gui.UITextField
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class UITextField extends DisplayObject {

        private static sharedHTMLInputElement: HTMLInputElement;
        private static sharedHTMLTextAreaElement: HTMLTextAreaElement;

        private _displayAsPassword: boolean;
        private _maxChars: number;
        private _multiline: boolean;
        private _restrict: string;
        private _selectable: boolean;
        private _selectionBeginIndex: number;
        private _selectionEndIndex: number;
        private _type: UITextFieldType;
        private _textColor: number;
        private _textWidth: number;
        private _textHeight: number;
        private _text: string;
        private _textLine: Array<string>;
        private _fontQuadLine: Array<Quad>[];
        private _quadPool: Quad[];
        private _blankQuad: Quad;
        private _autoSize: UITextFieldAutoSize;
        private _textLineInfo: TextLineInfo[] = [];
        private _bgQuad: Quad;
        private _fontQuadPanel: DisplayObject;

        public constructor(textFieldType: UITextFieldType = UITextFieldType.DYNAMIC) {
            super();
            this._text = "";
            this._maxChars = 0;
            this._restrict = "";
            this._textWidth = 0;
            this._textLine = [];
            this._quadPool = [];
            this._textHeight = 0;
            this._fontQuadLine = [];
            this._multiline = false;
            this._selectable = false;
            this._type = textFieldType;
            this._textColor = 0x00cc00;
            this._selectionEndIndex = -1;
            this._selectionBeginIndex = -1;
            this._displayAsPassword = false;
            this._autoSize = UITextFieldAutoSize.LEFT;
            this._fontQuadPanel = new DisplayObject();
            this._blankQuad = this.createFontQuad("b".charCodeAt(0), false);

            if (!UITextField.sharedHTMLInputElement) {
                UITextField.sharedHTMLInputElement = document.createElement("input");
                UITextField.sharedHTMLInputElement.style.width = this.width + "px";
                UITextField.sharedHTMLInputElement.style.height = this.height + "px";
                UITextField.sharedHTMLInputElement.hidden = true;
                UITextField.sharedHTMLInputElement.style.color = "#00ff00";
                UITextField.sharedHTMLInputElement.style.border = "0px";
                UITextField.sharedHTMLInputElement.style.backgroundColor = "transparent";
                document.getElementById("egret3D").parentElement.appendChild(UITextField.sharedHTMLInputElement);
            }

            if (!UITextField.sharedHTMLTextAreaElement) {
                UITextField.sharedHTMLTextAreaElement = document.createElement("textarea");
                UITextField.sharedHTMLTextAreaElement.style.width = this.width + "px";
                UITextField.sharedHTMLTextAreaElement.style.height = this.height + "px";
                UITextField.sharedHTMLTextAreaElement.hidden = true;
                UITextField.sharedHTMLTextAreaElement.style.color = "#00ff00";
                UITextField.sharedHTMLTextAreaElement.style.paddingLeft = "0px";
                UITextField.sharedHTMLTextAreaElement.style.paddingTop = "0px";
                UITextField.sharedHTMLTextAreaElement.style.margin = "0px";
                UITextField.sharedHTMLTextAreaElement.style.backgroundColor = "transparent";
                document.getElementById("egret3D").parentElement.appendChild(UITextField.sharedHTMLTextAreaElement);
            }

            this._bgQuad = new Quad();
            if (UITextFieldType.INPUT == this._type) {
                this._bgQuad.mouseEnable = true;
                this._bgQuad.width = this.width;
                this._bgQuad.height = this.height;
                this.addChild(this._bgQuad);
                this._bgQuad.addEventListener(TouchEvent3D.TOUCH_START, this.onShowInputAgent, this);
                this._bgQuad.addEventListener(MouseEvent3D.MOUSE_CLICK, this.onShowInputAgent, this);
            }

            this.width = 100;
            this.height = 20;
            this.addChild(this._fontQuadPanel);
        }

        protected onShowInputAgent(e: Event3D): void {
            if (this._multiline) {
                UITextField.sharedHTMLTextAreaElement.hidden = false;
                UITextField.sharedHTMLTextAreaElement.style.position = "absolute";
                UITextField.sharedHTMLTextAreaElement.style.left = this.x + "px";
                UITextField.sharedHTMLTextAreaElement.style.top = this.y + "px";
                UITextField.sharedHTMLTextAreaElement.style.width = this.width + "px";
                UITextField.sharedHTMLTextAreaElement.style.height = this.height + "px";
                UITextField.sharedHTMLTextAreaElement.value = this._text;
                UITextField.sharedHTMLTextAreaElement.focus();
                UITextField.sharedHTMLTextAreaElement.onblur = (e) => this.onSharedHTMLTextLoseFocus(e);
            }
            else {
                UITextField.sharedHTMLInputElement.hidden = false;
                UITextField.sharedHTMLInputElement.style.position = "absolute";
                UITextField.sharedHTMLInputElement.style.left = this.x + "px";
                UITextField.sharedHTMLInputElement.style.top = this.y + "px";
                UITextField.sharedHTMLInputElement.style.width = this.width + "px";
                UITextField.sharedHTMLInputElement.style.height = this.height + "px";
                UITextField.sharedHTMLInputElement.value = this._text;
                UITextField.sharedHTMLInputElement.focus();
                UITextField.sharedHTMLInputElement.onblur = (e) => this.onSharedHTMLTextLoseFocus(e);
            }

            //this.showAllFontQuad(false);
            this._fontQuadPanel.visible = false;
        }

        //private showAllFontQuad(visible:boolean): void {
        //    for (var i: number = 0; i < this._textLineInfo.length; ++i) {
        //        var textLineInfo: TextLineInfo = this._textLineInfo[i];
        //        for (var j: number = 0; j < textLineInfo.lineQuads.length; ++j) {
        //            textLineInfo.lineQuads[j].visible = visible;
        //        }
        //    }
        //}

        private onSharedHTMLTextLoseFocus(ev: FocusEvent): void {
            this.text = this._multiline ? UITextField.sharedHTMLTextAreaElement.value : UITextField.sharedHTMLInputElement.value;
            UITextField.sharedHTMLInputElement.onblur = UITextField.sharedHTMLTextAreaElement.onblur = null;
            UITextField.sharedHTMLInputElement.hidden = UITextField.sharedHTMLTextAreaElement.hidden = true;
            //this.showAllFontQuad(true);
            this._fontQuadPanel.visible = true;
        }

        public set width(value: number) {
            if (value != this._sca.z) {
                this._fontQuadPanel.width = value;
                this._sca.z = value;
                this._transformChange = true;
                this._bgQuad.width = value;
                this.refreshAlign();
            }
        }

        public set height(value: number) {
            if (value != this._sca.w) {
                this._fontQuadPanel.height = value;
                this._sca.w = value;
                this._transformChange = true;
                this._bgQuad.height = value;
                this.refreshAlign();
            }
        }

        public get width(): number {
            return this._sca.z;
        }

        public get height(): number {
            return this._sca.w;
        }

        /**
        * @language zh_CN
        * 指定文本字段是否是密码文本字段。
        * @param displayAsPassword  是否为密码文本字段
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set displayAsPassword(displayAsPassword: boolean) {
            this._displayAsPassword = displayAsPassword;
        }

        public get displayAsPassword(): boolean {
            return this._displayAsPassword;
        }

        /**
        * @language zh_CN
        * (只读)文本字段中的字符数。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get length(): number {
            return this._text.length;
        }

        /**
        * @language zh_CN
        * 文本字段中最多可包含的字符数（即用户输入的字符数）。
        * @param maxChars  最大字符数
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set maxChars(maxChars: number) {
            this._maxChars = maxChars;
        }

        public get maxChars(): number {
            return this._maxChars;
        }

        /**
        * @language zh_CN
        * 指示字段是否为多行文本字段。
        * @param multiline  是否多行
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set multiline(multiline: boolean) {
            this._multiline = multiline;
        }

        public get multiline(): boolean {
            return this._multiline;
        }

        /**
        * @language zh_CN
        * 指示用户可输入到文本字段中的字符集。
        * @param restrict  字符集
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set restrict(restrict: string) {
            this._restrict = restrict;
        }

        public get restrict(): string {
            return this._restrict;
        }

        /**
        * @language zh_CN
        * 一个布尔值，指示文本字段是否可选。
        * @param selectable  是否可选
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set selectable(selectable: boolean) {
            this._selectable = selectable;
        }

        public get selectable(): boolean {
            return this._selectable;
        }

        /**
        * @language zh_CN
        * (只读)当前所选内容中第一个字符从零开始的字符索引值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get selectionBeginIndex(): number {
            return this._selectionBeginIndex;
        }

        /**
        * @language zh_CN
        * (只读)当前所选内容中最后一个字符从零开始的字符索引值。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get selectionEndIndex(): number {
            return this._selectionEndIndex;
        }

        /**
        * @language zh_CN
        * 该文本字段的类型。
        * @param type  文本字段的类型
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set type(type: UITextFieldType) {
            this._type = type;
        }

        public get type(): UITextFieldType {
            return this._type;
        }

        /**
        * @language zh_CN
        * 文本字段中文本的颜色（采用十六进制格式）。
        * @param textColor  文本颜色
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set textColor(textColor: number) {
            this._textColor = textColor;


        }

        public get textColor(): number {
            return this._textColor;
        }

        /**
        * @language zh_CN
        * （只读）文本的宽度，以像素为单位。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get textWidth(): number {
            return this._textWidth;
        }

        /**
        * @language zh_CN
        * （只读）文本的高度，以像素为单位。
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get textHeight(): number {
            return this._textHeight;
        }

        /**
        * @language zh_CN
        * 当前文本字段中当前文本的字符串。
        * @param text  文本字符串
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set text(text: string) {

            this.clearText();

            this._text = text;

            this._textLine = text.split("\n");

            if (!this._multiline) {
                this._textLine[0] = this._textLine.join("");
                this._textLine.length = 1;
            }

            var textLineInfo: TextLineInfo = null;

            for (var i: number = 0; i < this._textLine.length; ++i) {

                var lineStr: string = this._textLine[i];

                textLineInfo = this.buildTextLineInfo(lineStr);

                this._textLineInfo.push(textLineInfo);
            }

            this.refreshAlign();
        }

        private clearText(): void {

            var textLineInfo: TextLineInfo = null;

            for (var i: number = 0; i < this._textLineInfo.length; ++i) {

                textLineInfo = this._textLineInfo[i];

                for (var j: number = 0; j < textLineInfo.lineQuads.length; ++j) {
                    this.deleteFontQuad(textLineInfo.lineQuads[j]);
                }

                textLineInfo.lineQuads = null;
            }

            this._textLineInfo = [];
        }

        public get text(): string {
            return this._text;
        }

        public set autoSize(autoSize: UITextFieldAutoSize) {
            this._autoSize = autoSize;
        }

        public get autoSize(): UITextFieldAutoSize {
            return this._autoSize;
        }

        private refreshAlign(): void {

            var fontQuad: Quad = null;

            var textLineInfo: TextLineInfo = null;

            var offsetX: number, offsetY: number;

            if (this._autoSize == UITextFieldAutoSize.LEFT) {

                offsetY = 0;

                if (!this.multiline && this._textLineInfo.length >= 1) {
                    offsetY = this.height / 2 - this._textLineInfo[0].lineHeight / 2;
                }
                for (var i: number = 0; i < this._textLineInfo.length; ++i) {

                    textLineInfo = this._textLineInfo[i];

                    offsetX = 0;

                    for (var j: number = 0; j < textLineInfo.lineQuads.length; ++j) {

                        fontQuad = textLineInfo.lineQuads[j];
                        fontQuad.x = offsetX;
                        fontQuad.y = offsetY;
                        offsetX += fontQuad.width;
                        fontQuad.visible = (fontQuad.x + fontQuad.width) <= this.width;
                    }

                    offsetY += textLineInfo.lineHeight;
                }
            }
            else if (this._autoSize == UITextFieldAutoSize.RIGHT) {

                offsetY = 0;

                if (!this.multiline && this._textLineInfo.length >= 1) {
                    offsetY = this.height / 2 - this._textLineInfo[0].lineHeight / 2;
                }
                for (var i: number = 0; i < this._textLineInfo.length; ++i) {

                    textLineInfo = this._textLineInfo[i];

                    offsetX = this.width;

                    for (var j: number = textLineInfo.lineQuads.length - 1; j >= 0; --j) {

                        fontQuad = textLineInfo.lineQuads[j];
                        fontQuad.x = offsetX -= fontQuad.width;
                        fontQuad.y = offsetY;
                        fontQuad.visible = (fontQuad.x + fontQuad.width) > 0;
                    }

                    offsetY += textLineInfo.lineHeight;
                }
            }
            else if (this._autoSize == UITextFieldAutoSize.CENTER) {

                offsetY = 0;

                if (!this.multiline && this._textLineInfo.length >= 1) {
                    offsetY = this.height / 2 - this._textLineInfo[0].lineHeight / 2;
                }
                for (var i: number = 0; i < this._textLineInfo.length; ++i) {

                    textLineInfo = this._textLineInfo[i];

                    offsetX = this.width * 0.5 - textLineInfo.lineWidth * 0.5;

                    for (var j: number = 0; j < textLineInfo.lineQuads.length; ++j) {

                        fontQuad = textLineInfo.lineQuads[j];
                        fontQuad.x = offsetX;
                        fontQuad.y = offsetY;
                        offsetX += fontQuad.width;
                        fontQuad.visible = (fontQuad.x + fontQuad.width) <= this.width && (fontQuad.x + fontQuad.width) > 0;
                    }

                    offsetY += textLineInfo.lineHeight;
                }
            }
        }

        private buildTextLineInfo(text: string): TextLineInfo {

            var textLineInfo: TextLineInfo = new TextLineInfo();
            textLineInfo.lineText = text;
            textLineInfo.lineWidth = 0;
            textLineInfo.lineHeight = 0;
            textLineInfo.lineQuads = [];

            for (var i: number = 0; i < text.length; ++i) {

                var fontQuad: Quad = null;

                var charCode: number = text.charCodeAt(i);

                fontQuad = (charCode != 32) ? this.createFontQuad(charCode) : this._blankQuad;

                textLineInfo.lineQuads.push(fontQuad);

                textLineInfo.lineWidth += fontQuad.width;

                if (textLineInfo.lineHeight < fontQuad.height) {
                    textLineInfo.lineHeight = fontQuad.height;
                }
            }

            return textLineInfo;
        }

        /**
        * @language zh_CN
        * 将 newText 参数指定的字符串追加到文本字段的文本的末尾。
        * @param newText 新字符串
        * @version Egret 3.0
        * @platform Web,Native
        */
        public appendText(newText: string): void {
        }

        /**
        * @language zh_CN
        * 返回一个矩形，该矩形是字符的边框。
        * @param charIndex 字符索引值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getCharBoundaries(charIndex: number): Rectangle {
            return null;
        }

        /**
        * @language zh_CN
        * 在 x 和 y 参数指定的位置返回从零开始的字符索引值。
        * @param x x坐标位置
        * @param y y坐标位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getCharIndexAtPoint(x: number, y: number): number {
            return 0;
        }

        /**
        * @language zh_CN
        * 使用 value 参数的内容替换当前所选内容。
        * @param value 新字符串
        * @version Egret 3.0
        * @platform Web,Native
        */
        public replaceSelectedText(value:string): void {
        }

        /**
        * @language zh_CN
        * 使用 newText 参数的内容替换 beginIndex 和 endIndex 参数指定的字符范围。
        * @param beginIndex 起始位置索引
        * @param endIndex 结束位置索引
        * @param newText 新字符串
        * @version Egret 3.0
        * @platform Web,Native
        */
        public replaceText(beginIndex: number, endIndex: number, newText:string): void {
        }

        /**
        * @language zh_CN
        * 将第一个字符和最后一个字符的索引值（使用 beginIndex 和 endIndex 参数指定）指定的文本设置为所选内容。
        * @param beginIndex 起始位置索引
        * @param endIndex 结束位置索引
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setSelection(beginIndex: number, endIndex: number): void {
        }

        private createFontQuad(unicode: number, isAddChild:boolean = true): Quad {

            var fontQuad: Quad;

            if (this._quadPool.length > 0) {

                fontQuad = this._quadPool[this._quadPool.length - 1];

                this._quadPool.splice(this._quadPool.length - 1, 1);
            }
            else {
                fontQuad = new Quad();
                fontQuad.renderText = true;
            }

            var fontTexture: Texture = BitmapFont.getTexture(unicode);

            if (!fontTexture) {
                fontTexture = BitmapFont.getTexture(("?").charCodeAt(0));
            }

            fontQuad.width = fontTexture.width;
            fontQuad.height = fontTexture.height;
            fontQuad.texture = fontTexture;
            fontQuad.color = this._textColor;
            if (isAddChild) {
                this._fontQuadPanel.addChild(fontQuad);
            }
            return fontQuad;
        }

        private deleteFontQuad(fontQuad: Quad): void {

            if (this._blankQuad == fontQuad) 
                return;

            this._fontQuadPanel.removeChild(fontQuad);
            this._quadPool.push(fontQuad);
        }
    }
}