参考JavaWeb项目实战实现的一个51购物商城。
>web服务器：Tomcat
>数据库:sql server
>前端：jsp
### 总体结构
**src文件**
![这里写图片描述](http://img.blog.csdn.net/20171206131748918?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMzk0ODAxMA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
>model：定义的是商品类Goodselement和用户类Member
>tools：定义CheckCode验证码处理的servlet，Chstr字符转换处理，connDB连接数据库
>dao：实现数据库用户表的查询和插入操作

**数据库文件**
两个sql server的数据库文件，直接用sql server manager的导入可以添加数据库
![这里写图片描述](http://img.blog.csdn.net/20171206132140241?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMzk0ODAxMA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

**前端页面**
![这里写图片描述](http://img.blog.csdn.net/20171206132357716?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMzk0ODAxMA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
>login：登录界面
>register：注册界面
>cart：购物车界面
>common：网页上下栏目
>goodsDetail：商品详情
>leftHotGoods：左边栏显示热门商品
>relateGoods：下边栏显示相关商品
>agreement.html：网站注册协议

>index：主页面
### 主页面
![这里写图片描述](http://img.blog.csdn.net/20171206132740287?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMzk0ODAxMA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
**最新商品显示**
![这里写图片描述](http://img.blog.csdn.net/20171206132756239?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMzk0ODAxMA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
**打折商品显示**
![这里写图片描述](http://img.blog.csdn.net/20171206132811675?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMzk0ODAxMA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
**热门商品显示**
![这里写图片描述](http://img.blog.csdn.net/20171206132908325?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMzk0ODAxMA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
详细实现见：http://blog.csdn.net/u013948010/article/details/78675164

### 商品详情页面
![这里写图片描述](http://img.blog.csdn.net/20171206133027980?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMzk0ODAxMA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
详细实现见：http://blog.csdn.net/u013948010/article/details/78694181

### 购物车
![这里写图片描述](http://img.blog.csdn.net/20171206133111609?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMzk0ODAxMA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

### 登录和注册
![这里写图片描述](http://img.blog.csdn.net/20171206133845832?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMzk0ODAxMA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
注册：
![这里写图片描述](http://img.blog.csdn.net/20171206133859288?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMzk0ODAxMA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)