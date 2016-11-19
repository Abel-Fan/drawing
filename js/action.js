$(function(){
   $(".small>div").hover(function(){
       $(this).css({
           background:"rgba(0,0,0,0.5)",border:"1px solid #fff",color:'#fff'
       })
   },function(){
       $(this).css({
           background:"azure",border:"",color:"#000"
       })
   })
});