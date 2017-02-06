[Allan:] 2017/01/19
技术路线：
1. 商务逻辑采用Redux。
2. UI使用React和React-Bootstrap，React-Bootstrap包装了非常多的控件，参见：
   https://react-bootstrap.github.io/components.html
3. 图形使用three.js。three.js源代码里面有一个editor的sample，可以将
   里面的command/signal/undo等逻辑直接拿来用。参见：
   https://threejs.org/editor/
4. 图形和商务数据之间要建立对应关系。这一点目前还没有想清楚。初步的想法是：
   a. UI调用command->修改图形->修改逻辑数据。
   b. 修改逻辑数据->subscribe->修改图形
   需要注意的是防止出现循环调用。

[Allan:] 2017/01/20
1. 在node_modules添加了react_bootstrap, 用yarn add
2. react_bootstrap里面没有bootstrap里面的style，因此还需要添加
   bootstrap在node_modules里面，并引用它的less文件。并且在webpack config
   中修改那些loaders。
3. 实现里一个初步的header

[Allan:] 2017/01/25
1. react_bootstrap里面提供的控件功能是在有限，连手机界面顶部的toolbar也
   实现不好，所以放弃之。
2. 找到两个比较好的适合web app界面的UI框架库：
   Onsen: https://onsen.io/blog/cordova-hybrid-app-with-react-redux-webpack/
   Material-UI: http://www.material-ui.com/#/components/app-bar
   
[Allan:] 2017/02/06
1. 用Cordova包装了一个three.js的网页，发现android 4不支持webgj，因此用threejs来
   画图是不合适的。
2. 测试了以下d3.js - 用cordova包装了一个d3.js的网页，可以进行zoom，pan以及画svg等
   功能。因此准备用d3.js。



