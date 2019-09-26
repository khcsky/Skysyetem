/**
 *
 * @param {type} radius 圆环半径
 * @param {type} lineWidth 圆环宽度
 * @param {type} strokeStyle 默认背景
 * @param {type} startAngle起始角度
 * @param {type} endAngle结束角度
 * @param {type} fillStyleArray 数组，圆环色块颜色
 * @param {type} capTypeArray 类型：round是圆角，square正方形顶帽，butt是正常
 * @param {type} fillGradientStyle 数组，圆环色块渐变色
 * @param {type} arcFillGradientStyle 数组，圆环弧度色块渐变色
 * @returns {Circle} criclex、cricley圆心坐标
 * author jiangmei
 *
 */
 function Circle(radius, lineWidth, strokeStyle, startAngle, endAngle, fillStyleArray, capTypeArray, fillGradientStyle, arcFillGradientStyle) {
    this.radius = radius;    // 圆环半径
    this.lineWidth = lineWidth;  // 圆环边的宽度
    this.strokeStyle = strokeStyle; //边的颜色
    this.startAngle = startAngle; // 起始角度
    this.endAngle = endAngle; // 结束角度
    this.fillStyle = fillStyleArray;  //填充色
    this.lineCap = capTypeArray;
    this.fillGradientStyle = fillGradientStyle; // 圆环渐变色
    this.arcFillGradientStyle = arcFillGradientStyle;// 圆环弧度渐变色
}

Circle.prototype.draw = function (ctx, criclex, cricley) {
    ctx.beginPath();
    // 坐标为90的圆，这里起始角度是0，结束角度是Math.PI*2
    ctx.arc(criclex, cricley, this.radius, this.startAngle, this.endAngle,false);
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.fillGradientStyle.length > 0 ?  this.strokeStyle : this.fillStyle[0];
    ctx.stroke();  // 这里用stroke画一个空心圆，想填充颜色的童鞋可以用fill方法
};
function Ring(radius, lineWidth, strokeStyle, startAngle, endAngle, fillStyleArray, capTypeArray, fillGradientStyle = [], arcFillGradientStyle = []) {
    Circle.call(this, radius, lineWidth, strokeStyle, startAngle, endAngle, fillStyleArray, capTypeArray, fillGradientStyle, arcFillGradientStyle);
}
Ring.prototype = Object.create(Circle.prototype);

Ring.prototype.drawRing = function (ctx, startAngle, percentArray ,criclex, cricley, text, left, type) {
    let _this = this;
    let temp = criclex;

    let gradient = ctx.createLinearGradient(0,0,170,0);
    let arcGradient = ctx.createLinearGradient(0,0,170,0);

    if (_this.fillGradientStyle.length > 0) {
        _this.fillGradientStyle.map(it => {
            gradient.addColorStop(it.offset, it.color);
        })
    }

    if (_this.arcFillGradientStyle.length > 0) {
        _this.arcFillGradientStyle.map(it => {
            arcGradient.addColorStop(it.offset, it.color);
        })
    }

    text.map(function (it, i) {
        // startAngle = startAngle || 3 * Math.PI / 2;
        percentArray[i] = percentArray[i] || [];
        _this.draw(ctx,criclex,cricley);  // 调用Circle的draw方法画圈圈

        percentArray[i].forEach(function (item, index) {
            ctx.beginPath();

           let anglePerSec = item === 0 ? 0 : _this.startAngle > _this.endAngle ?
               ( _this.endAngle + 2*Math.PI - _this.startAngle) / (100 / item) :
              (_this.endAngle - _this.startAngle)/ (100 / item); // 蓝色的弧度(比例部分)

            _this.arcFillGradientStyle.length > 0 ? ctx.arc(criclex, cricley, _this.radius, startAngle,
                startAngle + anglePerSec,false) : _this.startAngle < _this.endAngle ? // 1
             ctx.arc(criclex, cricley, _this.radius,  _this.startAngle , _this.startAngle + anglePerSec, false) : // 2
             ctx.arc(criclex, cricley, _this.radius, _this.endAngle - anglePerSec, _this.endAngle,false); // 3

            startAngle = startAngle + anglePerSec;

            ctx.strokeStyle = percentArray[i][0] === 100 && _this.fillGradientStyle.length === 0 ?  _this.fillStyle[0] :
                _this.fillGradientStyle.length > 0 ? gradient : _this.fillStyle[index];

            ctx.lineCap = _this.lineCap[index];
            ctx.stroke();
            ctx.closePath();
        })
        // 小圆圈覆盖
        ctx.beginPath();
        // 这里的圆心坐标要和cirle的保持一致

        _this.arcFillGradientStyle.length > 0 ? ctx.arc(criclex, cricley, _this.radius,1,
            _this.startAngle * (Math.PI / 180.0) + Math.PI * 0.75, false) :
            _this.startAngle < _this.endAngle ?
                ctx.arc(criclex, cricley, _this.radius, _this.endAngle, _this.endAngle, false) :
                ctx.arc(criclex, cricley, _this.radius, _this.startAngle, _this.startAngle, false);

        ctx.strokeStyle = percentArray[i][1] === 100 ?  _this.fillStyle[1] :  _this.fillGradientStyle.length > 0
            ? arcGradient : _this.fillStyle[0];
        ctx.lineCap = _this.lineCap[0];
        ctx.stroke();
        ctx.closePath();

        // ctx.font = "normal bold 11px serif";
        ctx.font = "normal 11px SourceHanSansCN-Bold";
        ctx.textAlign = "center";
        ctx.fillStyle = it.titleColor;

        if (_this.fillGradientStyle && _this.fillGradientStyle.length > 0) {
            ctx.fillText(it.title, criclex, temp, _this.radius);
            ctx.fillStyle = it.numColor || it.titleColor;
            ctx.fillText(it.num, criclex, temp + 10);
        }

        if (type === 2) {
            ctx.font = "normal 12px SourceHanSansCN-Bold";
            ctx.fillText(it.title, criclex , temp * 2 + 10 );
            ctx.font = "normal 10px SourceHanSansCN-Bold";
            ctx.fillStyle = it.numColor || it.titleColor;
            ctx.fillText(it.num, criclex, cricley + 5);

            criclex += left;
        }

        // 舆情声量
        if (type === 3) {
            let y = i > 1 ? cricley + temp : temp * 2;
            ctx.fillText(it.title, criclex , y + 10);
            ctx.font = "normal 9px SourceHanSansCN-Bold";
            ctx.fillStyle = it.numColor || it.titleColor;
            ctx.fillText(it.num, criclex, cricley + 5);

            if (i === 0) {
                criclex = criclex + left + 20;
            }
            if (i === 1) {
                criclex = temp ;
                cricley = cricley + left + 10;
            }
            if (i === 2) {
                criclex = temp + left + 20 ;
            }
        }
    })

}

export {
    Ring
}