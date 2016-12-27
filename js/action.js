$(function(){
    $(window).resize(resizeCanvas);

    function resizeCanvas() {

        $("canvas").attr("width", $(window).get(0).innerWidth);

        $("canvas").attr("height", $(window).get(0).innerHeight);


    };

    resizeCanvas();

    $(".small>daiv").hover(function(){
       $(this).css({
           backgroundClour:"rgba(0,0,0,0.5)",border:"1px solid #fff",color:'#fff'
       })
   },function(){
       $(this).css({
           backgroundClour:"azure",border:"",color:"#000"
       })
   })
});