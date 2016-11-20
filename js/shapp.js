function shape(canvas,cobj,shades,eraser){
    this.canvas = canvas;
    this.cobj = cobj;
    this.shades = shades;
    this.eraser = eraser;
    this.width = canvas.width;
    this.height = canvas.height;
    this.color = "#000"; //默认填充颜色
    this.history = [];  //历史纪录
    this.type = "line"; //形状  rect line
    this.lineWidth = 1; //边框大小
    this.fill = "stroke";  //是否填充
    this.bianNum = 6;
    this.falg = true;
    this.eraserWidth = 100;
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
      this.shades.onmousedown = function(e){
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
              that.falg = true;
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
    //铅笔
    pencil:function(){
        this.init();
        var that = this;
        this.shades.onmousedown = function(e){
            var x1 = e.offsetX;
            var y1 = e.offsetY;
            that.cobj.beginPath();
            this.onmousemove = function(e){
                //that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                var x2 = e.offsetX;
                var y2 = e.offsetY;
                that.cobj.lineTo(x2,y2);
                that.cobj.stroke();
            };
            this.onmouseup = function(e){
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                this.onmousemove = null;
                this.onmouseup = null;
            }
        }

    },
    //撤销
    cx:function(){
        var history = this.history;
        var falg = this.falg;
        var cobj = this.cobj;
        if(history.length>1){
            if(falg){
                this.falg = false;
                history.pop();
                cobj.putImageData(history[history.length-1],0,0);
            }else{
                history.pop();
                cobj.putImageData(history[history.length-1],0,0);
            }
        }else if(history.length==1){
            cobj.putImageData(history[history.length-1],0,0);
            history.pop();
            cobj.clearRect(0,0,this.canvas.width,this.canvas.height);
        }else{}
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
        this.init();
        for(var i=0;i<this.bianNum;i++){
            var x3 = Math.cos(angle*i)*r;
            var y3 = Math.sin(angle*i)*r;
            this.cobj.lineTo(x1+x3,y1+y3);
        }
        this.cobj.closePath();
        this.cobj[this.fill]();
    },
    bc:function(){
        var history = this.history;
        if(history.length>0){
            var data = this.canvas.toDataURL();
            data = data.replace("image/png","stream/octet");
            window.location.href= data;
        }
    },
    xj:function(){
        var history = this.history;
        if(history.length>0){
            var yes = confirm("是否保存");
            if(yes){
                this.bc();
            }else{
                this.history = [];
                this.cobj.clearRect(0,0,this.canvas.width,this.canvas.height);
            }
        }
    },
    er:function(){
        this.init();
        this.eraser.style.width = this.eraserWidth+"px";
        this.eraser.style.height = this.eraserWidth+"px";
        var that = this;
        this.eraser.style.display = "block";
        var width = this.eraser.offsetWidth/2;
        var height = this.eraser.offsetHeight/2;
        this.shades.onmousedown = function(e){
            this.onmousemove = function(e){
                var mx = e.offsetX;
                var my = e.offsetY;
                //清除
                that.cobj.clearRect(mx-width,my-height,width*2,height*2);

                var top = my-height;
                var left = mx-width;
                if(left>that.canvas.width-width*2){
                    left = that.canvas.width-width*2;
                }
                if(left<0){
                    left = 0;
                }
                if(top>that.canvas.height-height*2){
                    top = that.canvas.height-height*2;
                }
                if(top<0){
                    top = 0;
                }
                that.eraser.style.top=top+"px";
                that.eraser.style.left=left+"px";
                that.shades.style.cursor = "none";


                this.onmouseup = function(e){
                    that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                    that.shades.onmousemove = null;
                    that.shades.onmouseup = null;
                    that.shades.style.cursor = "pointer";
                }
            }
        }
    }
};
