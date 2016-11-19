function shape(canvas,cobj){
    this.canvas = canvas;
    this.cobj = cobj;
    this.width = canvas.width;
    this.height = canvas.height;
    this.color = "#000"; //默认填充颜色
    this.history = [];  //历史纪录
    this.type = "rect"; //形状  rect line
    this.lineWidth = 1; //边框大小
    this.fill = "fill";  //是否填充
    this.bianNum = 5;
}

shape.prototype = {
    init:function(){
        this.cobj.beginPath();
        this.cobj.strokeStyle=this.color;
        this.cobj.fillStyle = this.color;
        this.cobj.lineWidth=this.lineWidth;
    },
  draw:function(){
      var that = this;
      this.canvas.onmousedown = function(e){
          var x1 = e.offsetX;
          var y1 = e.offsetY;
          this.onmousemove = function(e){
              that.cobj.clearRect(0,0,that.width,that.height);
              if(that.history.length){
                  that.cobj.putImageData(that.history[that.history.length-1],0,0);
              }
              var x2 = e.offsetX;
              var y2 = e.offsetY;
              that[that.type](x1,y1,x2,y2);
          };
          this.onmouseup = function(e){
              that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
              this.onmousemove = null;
              this.onmouseup = null;
          }
      }
  },
    //线
  line:function(x1,y1,x2,y2){
      this.init();
      this.cobj.moveTo(x1,y1);
      this.cobj.lineTo(x2,y2);
      this.cobj.stroke();
  },
    //矩形
    rect:function(x1,y1,x2,y2){
        this.init();
        this.cobj.lineWidth=this.lineWidth;
        this.cobj.rect(x1,y1,x2-x1,y2-y1);
        this.cobj[this.fill]();
    },
    //曲线
    qx:function(){

    },
    //撤销
    cx:function(){

    },
    arc:function(x1,y1,x2,y2){
        var x = x2-x1;
        var y = y2-y1;
        var r = Math.sqrt(x*x+y*y);
        this.init();
        this.cobj.arc(x1,y1,r,0,Math.PI*2);
        this.cobj[this.fill]();
    },
    bian:function(x1,y1,x2,y2){
        var x = x2-x1;
        var y = y2-y1;
        var r = Math.sqrt(x*x+y*y);
        var angle = 360/this.bianNum*Math.PI/180;
        //x3 = Math.cos(angle)*

    }
};
