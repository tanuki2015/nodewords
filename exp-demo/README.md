上一个版本在`router = express.Router()`这里出错，TypeError: Cannot read property 'use' of undefined。

到google才找到问题，Generator版本是3.x.x, express版本4.x.x，明显不兼容，重新安装来过。

- sudo npm install -g express-generator
- express demo
- cd demo && npm install
- npm start

- 安装bower和bootstrap
- bower init
- touch .bowerrc
- 添加这一行，让bower的组件都安装到这个目录：
- {"directory": "./public/lib"}

删除public下的javascripts和stylesheets文件夹 。

在views中建立header和footer模板

## 调试的时候，有时候会出现模板修改后没有显示没有变化，需要重新启动服务器才行。
