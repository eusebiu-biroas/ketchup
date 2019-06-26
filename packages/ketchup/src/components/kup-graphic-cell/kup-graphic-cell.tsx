import { Component, Prop, Watch } from '@stencil/core';
import { GraphicElement, Color } from './kup-graphic-cell-declarations';
import { getColorFromString } from './kup-graphic-cell-helper';

@Component({
    tag: 'kup-graphic-cell',
    shadow: true,
})
export class KupGraphicCell {
    @Prop()
    value: string;

    @Prop()
    height = 30;

    @Prop()
    width = 300;

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    graphic_element_marker_splitter = '\\\\';
    graphic_element_splitter = '\\\\AND\\\\';
    background_color = 'BCOLOR;R255G000B000';
    default_color = new Color(0, 0, 0);

    @Watch('value')
    onValueChange(): void {
        this.draw();
    }

    // lifecycle
    componentDidLoad(): void {
        this.draw();
    }

    // private methods
    private draw(): void {
        if (!this.value) {
            return;
        }

        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            this.drawGraphicCell();
        }
    }

    private drawGraphicCell(): void {
        const vGraphicElementDefinitionArr = this.value.split(
            this.graphic_element_splitter
        );

        vGraphicElementDefinitionArr.forEach((graphicElem, index) => {
            let vShapeMarker = 'SHAPE;BAR';
            let vBGColorMarker = this.background_color;
            let vHeightPctMarker = 'HEIGHT;100';

            const vMarkersArray = graphicElem.split(
                this.graphic_element_marker_splitter
            );

            const shapesArray = [];
            const vSeparatorsList = [];

            vMarkersArray.forEach((vString) => {
                if (this.isShapeMarker(vString)) {
                    vShapeMarker = vString;
                } else if (this.isBgColorMarker(vString)) {
                    vBGColorMarker = vString;
                } else if (this.isHeightMarker(vString)) {
                    vHeightPctMarker = vString;
                } else if (this.isDecoratorMarker(vString)) {
                    vSeparatorsList.push(vString);
                } else {
                    shapesArray.push(vString);
                }
            });

            const vGraphicElementArray = shapesArray.map((shape) => {
                const elem = new GraphicElement();

                elem.init([
                    vShapeMarker,
                    vBGColorMarker,
                    vHeightPctMarker,
                    shape,
                ]);

                return elem;
            });

            // first element -> setting background
            if (index === 0 && vBGColorMarker !== this.background_color) {
                const bgColor = getColorFromString(
                    vBGColorMarker.substring('BCOLOR;'.length)
                );

                this.drawRect(
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height,
                    bgColor
                );
            }

            let startX = 0;

            vGraphicElementArray.forEach((elem) => {
                switch (elem.getShape()) {
                    case 'circle':
                        startX = this.getNewStarXFromCircle(startX, elem);
                        break;

                    case 'tril':
                        startX = this.getNewStarXFromTril(startX, elem);
                        break;

                    case 'trir':
                        startX = this.getNewStarXFromTrir(startX, elem);
                        break;

                    default:
                        // bar
                        startX = this.getNewStarXFromBar(startX, elem);
                        break;
                }
            });

            vSeparatorsList.forEach((sep) => {
                if (sep.startsWith('SEP') || sep.startsWith('DIV')) {
                    this.drawSeparator(sep);
                } else if (sep.startsWith('ARW')) {
                    this.drawArrow(sep);
                } else if (sep.startsWith('GRID')) {
                    this.drawGrid(sep);
                }
            });
        });
    }

    isShapeMarker(value: string): boolean {
        return value && value.toUpperCase().startsWith('SHAPE;');
    }

    isBgColorMarker(value: string): boolean {
        return value && value.toUpperCase().startsWith('BCOLOR;');
    }

    isHeightMarker(value: string): boolean {
        return value && value.toUpperCase().startsWith('HEIGHT;');
    }

    isDecoratorMarker(value: string): boolean {
        return (
            value &&
            (value.toUpperCase().startsWith('SEP;') ||
                value.toUpperCase().startsWith('DIV;') ||
                value.toUpperCase().startsWith('ARW;') ||
                value.toUpperCase().startsWith('GRID;'))
        );
    }

    getDim(dimPixel: number, dimPerc: number): number {
        return Math.floor((dimPixel / 100) * dimPerc);
    }

    getNewStarXFromBar(startX: number, elem: GraphicElement): number {
        const elemWidth = this.getDim(this.canvas.width, elem.getWidth());
        const elemHeight = this.getDim(this.canvas.height, elem.getHeight());
        const y = this.canvas.height - elemHeight;

        if (!elem.isTrasparent()) {
            this.drawRect(startX, y, elemWidth, elemHeight, elem.getColor());
        }

        return elemWidth;
    }

    getNewStarXFromCircle(startX: number, circle: GraphicElement): number {
        const newStartX = this.getDim(this.canvas.width, circle.getWidth());

        const x = (startX + newStartX) / 2;

        if (!circle.isTrasparent()) {
            this.drawArc(x, this.canvas.height / 2, circle.getColor());
        }

        return newStartX;
    }

    getNewStarXFromTril(startX: number, triLeft: GraphicElement): number {
        const newStartX = this.getDim(this.canvas.width, triLeft.getWidth());

        if (!triLeft.isTrasparent()) {
            this.drawTri(
                newStartX,
                0,
                startX,
                this.canvas.height / 2,
                triLeft.getColor()
            );
        }

        return newStartX;
    }

    getNewStarXFromTrir(startX: number, triRight: GraphicElement): number {
        const newStartX = this.getDim(this.canvas.width, triRight.getWidth());

        if (!triRight.isTrasparent()) {
            this.drawTri(
                startX,
                0,
                newStartX,
                this.canvas.height / 2,
                triRight.getColor()
            );
        }

        return newStartX;
    }

    drawArc(x: number, radius: number, color: Color): void {
        this.ctx.fillStyle = color.toString();
        this.ctx.beginPath();
        this.ctx.arc(x, radius, radius, 0, 2 * Math.PI, true);
        this.ctx.fill();
    }

    drawRect(
        x: number,
        y: number,
        width: number,
        height: number,
        color: Color
    ): void {
        this.ctx.fillStyle = color.toString();
        this.ctx.fillRect(x, y, width, height);
    }

    drawTri(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        color: Color
    ): void {
        this.ctx.fillStyle = color.toString();
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x1, this.canvas.height);
        this.ctx.fill();
    }

    drawArrow(sep: string): void {
        let vPart = sep.substring('ARW;'.length);

        if (vPart.indexOf(',') > -1) {
            vPart = vPart.replace(',', '.');
        }

        this.ctx.fillStyle = this.default_color.toString();

        const startX = this.getDim(this.canvas.width, parseFloat(vPart));
        const height = this.canvas.height;
        const arrSpan = Math.floor(height / 3);
        const arrSpanHalf = arrSpan / 2;

        this.ctx.beginPath();
        this.ctx.moveTo(startX, 0);
        this.ctx.lineTo(startX - arrSpan, height / 2);
        this.ctx.lineTo(startX - arrSpanHalf, height / 2);
        this.ctx.lineTo(startX - arrSpanHalf, height);
        this.ctx.lineTo(startX + arrSpanHalf, height);
        this.ctx.lineTo(startX + arrSpanHalf, height / 2);
        this.ctx.lineTo(startX + arrSpan, height / 2);
        this.ctx.fill();
    }

    drawGrid(sep: string): void {
        let vPart = sep.substring('GRID;'.length);
        if (vPart.indexOf(',') > -1) {
            vPart = vPart.replace(',', '.');
        }
        const vTickNum = parseInt(vPart);
        const vTickDist = this.canvas.width / vTickNum;

        const tickH = this.canvas.height / 5;
        const y = this.canvas.height - tickH;

        const tickW = 1;
        for (let i = vTickDist; i < this.canvas.width; i = i + vTickDist) {
            this.drawRect(i, y, tickW, tickH, this.default_color);
        }
    }

    drawSeparator(sep: string): void {
        const vSeparatorPart = sep.substring('SEP;'.length).split(';');

        let vColor = 'R000G000B000';
        let vThickness = 2;
        let vPositionPart = vSeparatorPart[0];

        if (vSeparatorPart.length > 1) {
            vColor = vSeparatorPart[1];
        }
        if (vSeparatorPart.length > 2) {
            vThickness = parseInt(vSeparatorPart[2]);
        }

        if (vPositionPart.indexOf(',') > -1) {
            vPositionPart = vPositionPart.replace(',', '.');
        }

        const x = this.getDim(this.canvas.width, parseFloat(vPositionPart));

        this.drawRect(
            x,
            0,
            vThickness,
            this.canvas.height,
            getColorFromString(vColor)
        );
    }

    render() {
        return (
            <canvas
                ref={(el) => (this.canvas = el)}
                height={this.height}
                width={this.width}
            >
                {this.value}
            </canvas>
        );
    }
}
