package com.tools;

import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;
import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.*;

/**
 *
 * @author administrator
 */
public class CheckCode extends HttpServlet {
	public CheckCode() {
		super();
	}

	// 获取随机颜色
	public Color getRandColor(int s, int e) {
		Random random = new Random();
		if (s > 255) s = 255;
		if (e > 255) e = 255;
		int r = s + random.nextInt(e - s);		//随机生成RGB颜色中的r值
		int g = s + random.nextInt(e - s);		//随机生成RGB颜色中的g值
		int b = s + random.nextInt(e - s);		//随机生成RGB颜色中的b值
		return new Color(r, g, b);
	}

	public void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "No-cache");
		response.setDateHeader("Expires", 0);
		// 指定生成的响应是图片
		response.setContentType("image/jpeg");
		int width = 116;			//指定验证码的宽度
		int height = 33;			//指定验证码的高度
		BufferedImage image = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB);
		Graphics g = image.getGraphics();       //获取Graphics类的对象
		Random random = new Random();               //实例化一个Random对象
		Font mFont = new Font("宋体", Font.BOLD, 22);   //通过Font构造字体
		g.fillRect(0, 0, width, height);                //绘制验证码背景
		g.setFont(mFont);           //设置字体
		g.setColor(getRandColor(180, 200));     //设置颜色
		// 画随机的线条
		for (int i = 0; i < 100; i++) {
			int x = random.nextInt(width - 1);
			int y = random.nextInt(height - 1);
			int x1 = random.nextInt(3) + 1;
			int y1 = random.nextInt(6) + 1;
            g.drawLine(x, y, x + x1, y + y1);       //绘制直线
		}
        /**************************画一条折线********************************/		
		BasicStroke bs=new BasicStroke(2f,BasicStroke.CAP_BUTT,BasicStroke.JOIN_BEVEL);	//创建一个供画笔选择线条粗细的对象
		Graphics2D g2d = (Graphics2D) g;    //通过Graphics类的对象创建一个Graphics2D类的对象
		g2d.setStroke(bs);					//改变线条的粗细
		g.setColor(Color.GRAY);		//设置当前颜色为预定义颜色中的灰色
        int lineNumber=4;		//指定端点的个数
		int[] xPoints=new int[lineNumber];      //定义保存x轴坐标的数组
		int[] yPoints=new int[lineNumber];      //定义保存x轴坐标的数组
        //通过循环为x轴坐标和y轴坐标的数组赋值
		for(int j=0;j<lineNumber;j++){
			xPoints[j]=random.nextInt(width - 1);
			yPoints[j]=random.nextInt(height - 1);
		}
		g.drawPolyline(xPoints, yPoints,lineNumber);    //绘制折线
        /*******************************************************************/
		String sRand = "";
		// 输出随机的验证文字
         for (int i = 0; i < 4; i++) {
            char ctmp = (char)(random.nextInt(26) + 65);	//生成A~Z的字母
			sRand += ctmp;
			Color color = new Color(20 + random.nextInt(110), 20 + random
					.nextInt(110), 20 + random.nextInt(110));
			g.setColor(color);              //设置颜色
			/** **随机缩放文字并将文字旋转指定角度* */
			// 将文字旋转指定角度
			Graphics2D g2d_word = (Graphics2D) g;
			AffineTransform trans = new AffineTransform();
			trans.rotate(random.nextInt(45) * 3.14 / 180, 22 * i + 8, 7);
			// 缩放文字
			float scaleSize = random.nextFloat() +0.8f;
			if (scaleSize > 1f)	scaleSize = 1f;
			trans.scale(scaleSize, scaleSize);          //进行缩放
			g2d_word.setTransform(trans);
			/** ********************* */
			g.drawString(String.valueOf(ctmp), width/6 * i+23, height/2);

		}
		// 将生成的验证码保存到Session中
		HttpSession session = request.getSession(true);
		session.setAttribute("randCheckCode", sRand);
		g.dispose();
		ImageIO.write(image, "JPEG", response.getOutputStream());
	}
    	public void destroy() {
		super.destroy();
	}

	public void init() throws ServletException {
		super.init();
	}
}
