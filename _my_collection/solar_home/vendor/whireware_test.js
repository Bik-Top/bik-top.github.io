var s = Snap("#svg");

var wire1 = '<polygon id="w1" points="334.94 336.34 330.94 336.34 330.94 308.54 448.64 308.54 448.64 271.85 724.09 271.85 724.09 275.85 452.64 275.85 452.64 312.54 334.94 312.54 334.94 336.34"  stroke="blue"/>';
var wire2_rec = '<rec id="w2" x="333.07" y="443.68" width="4" height="24.33" />';

var r = s.rect(333.07, 443.68, 4, 24.33).attr({ fill: '#fff200'});
var rect = Snap().rect(0, 0, 10, 10);
Snap.animate(0, 10, function (val) {
    rect.attr({
        x: val
    });
}, 1000);
// in given context is equivalent to
rect.animate({x: 10}, 1000);

var svgString2 = '<path id="s3" d="M 60 0 L 120 0 L 180 60 L 180 120 L 120 180 L 60 180 L 0 120 L 0 60 Z"  stroke="red"/>';


function Drawing( svgString, transformString, timeBetweenDraws ) {
    this.fragment = Snap.parse( svgString );
    this.pathArray = this.fragment.selectAll('polygon');
    this.group = s.g().transform( transformString ).drag();
    this.timeBetweenDraws = timeBetweenDraws;
}

Drawing.prototype.init = function( svgString, transformString ) {
    this.group.clear();
    this.currentPathIndex = 0;

};

Drawing.prototype.endReached = function() {
    if( this.currentPathIndex >= this.pathArray.length ) {
        return true;
    }
};

Drawing.prototype.callOnFinished = function() {
};

Drawing.prototype.initDraw = function() {
    this.init();
    this.draw();
};

Drawing.prototype.quickDraw = function() {
    this.init();
    this.timeBetweenDraws = 0;
    this.draw();
};

Drawing.prototype.draw = function() {         // this is the main animation bit
    if( this.endReached() ) {
        if( this.callOnFinished ) {
            this.callOnFinished();
            return
        }
    }
    var myPath = this.pathArray[ this.currentPathIndex ] ;

    this.leng = myPath.getTotalLength();

    this.group.append( myPath );

    myPath.attr({
        fill: 'none',
        "stroke-dasharray": this.leng + " " + this.leng,
        "stroke-dashoffset": this.leng
    });

    this.currentPathIndex++;

    myPath.animate({"stroke-dashoffset": 0}, this.timeBetweenDraws, mina.easeout, this.draw.bind( this ) );

};



var myWire1 = new Drawing( wire1, 't0, 0, t0', 800 );

var myDrawing2 = new Drawing( svgString2, 't69,50 s1.8', 3000 );
var myDrawing3 = new Drawing( svgString2, 't150,150 s1.8', 5000 );

myWire1.initDraw();