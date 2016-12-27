window.onload = function(){
    var color = document.getElementById("color");
    var canvas = document.querySelector("canvas");
    var cobj = canvas.getContext("2d");
    var shades = document.querySelector(".shades");
    var eraser = document.querySelector(".eraser");
    var select = document.querySelector(".select");

    var arr = [];
    var colorVlue="red";
    var falg = true;
    var obj = new shape(canvas,cobj,shades,eraser,select);
    //颜色 color
    color.onchange = function(){
        colorVlue = color.value;
        obj.color = colorVlue;
        obj.draw();
    };

    $(".small>div").mousedown(function(){
        var bb = $(this).attr("aa");
        eraser.style.display="none";
        if(bb){
            if(bb=="pencil"){
                obj.pencil();
            }else if(bb=="cx"){
                obj.cx();
            }else if(bb=="bc"){
                obj.bc();
            }else if(bb=="xj"){
                obj.xj();
            }else if(bb=="er"){
                obj.er();
            }else if(bb=="se"){
                obj.se();
            }else{
                obj.type = bb;
                obj.draw();
            }

        }
    });

    //线条大小
    var size = document.querySelector(".size");
    size.onchange=function(){
        obj.lineWidth = size.value;
        obj.draw();
    };


    //填充
    $(".fill").change(function(){
        if(falg){
            obj.fill="fill";
            falg = false;
        }else{
            obj.fill="stroke";
        }
    });

    //边数
    var bianNum = document.querySelector(".bianNum");
    bianNum.onchange=function(){
        obj.bianNum = bianNum.value;
        obj.draw();
    };

    //图片
    var file = document.querySelector(".file");
    var img = document.querySelector(".img");
    file.onchange = function(){
        console.dir(this.files[0]);
        console.dir(this.value);
        if(this.value.indexOf("jpg")!=-1||this.value.indexOf("png")!=-1){
            img.src = this.value;
            //cobj.putImageData(value,200,200);
        }else{
            alert("请打开png,jpg格式文件");
        }
    }


};