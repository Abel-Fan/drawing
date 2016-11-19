# canvas
    处理位图，svg处理矢量图
## html5标签：<canvas></canvas>
1. 默认大小：300px*150px，不要在样式中修改大小（样式中是按照比例缩放）
    javascript是canvas的笔
2. canvas属性  width height
## javascript绘图
1.  获得canvas对象

    var canvas = document.querySelect("canvas");
2.  获得canvas的2D对象

    var cobj = canvas.getContext("2d");
3.  进行各种2d图形的操作

    cobj.fillRect(x,y,w,h)
## 对于canvas图像的修饰
1. 对于填充的样式的修饰
  1.1 fillStyle `可以用来设置canvas图像的样式填充，接收表示颜色的值，也可以接收渐变的对象和html对象`
  1.2 createLinearGradient(x1,y1,x2,y2) `用来创建线性渐变的对象，接收4个参数分别是:起始点的坐标x1,y1以及结束点的坐标x2,y2`
  1.3 addColorStop() `设置颜色以及颜色停靠的位置，需要用线性渐变来调用，如果有多个渐变，多次调用该方法`
  1.4 createRadialGradient(r1,) `用来设置径向渐变,参数分别为第一个圆与第二个圆的位置以及大小`
  1.5 createPattern() `将html中的图像设置为图形的背景，接收两个参数，第一个为对象，第二个为填充的方式`
2. 对于线条的修饰
  2.1 strokeStyle  `用来设置线条的颜色`
  2.2 lineWidth `用来设置线条的宽度` **默认单位是px**
3. 投影的设置
  3.1 分别用4个属性来设置投影的颜色，模糊级别，x/y/的偏移量
  **shadowColor** **shadowBlur** **shadowOffsetX** **shadowOffsetY**
4. 注意
  4.1 canvas里面的颜色设置 可以用四种方式，分别为：关键字/16进制/rgb/rgba
  4.2 canvas坐标系统 元素的左上角为原点，y轴越往下越大
  4.3 canvas线条的渲染方式，由中心点向两边延伸
##划线