window.onload = function(){
    var color = document.getElementById("color");
    var canvas = document.querySelector("canvas");
    var cobj = canvas.getContext("2d");
    var arr = [];
    var colorVlue="red";
    var obj = new shape(canvas,cobj);
    //颜色 color
    color.onchange = function(){
        colorVlue = color.value;
        obj.color = colorVlue;
    };

    $(".small>div").mousedown(function(){
        var bb = $(this).attr("aa");
        if(bb){
            obj.type = bb;
        }
    });

    var size = document.querySelector(".size");
    size.onchange=function(){
        obj.lineWidth = size.value;
    };

    obj.fill ="fill";
    obj.draw();






};