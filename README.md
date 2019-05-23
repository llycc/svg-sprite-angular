# SvgSpriteAngular

## 执行命令
在angular.json 中配置"extraWebpackConfig": "extra-webpack.js"，可以直接使用以下命令：  
ng build  
ng serve

## 注意事项
安装ngx-build-plus时要使用ng add ngx-build-plus命令,这样做ng会帮你修改angular.json中编译选项，否则需要手动
修改angular.json中build和serve的builder，具体可参考本项目angular.json文件。去https://github.com/manfredsteyer/ngx-build-plus
了解更多信息
