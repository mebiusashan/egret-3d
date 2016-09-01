# Egret Engine 3D API(CodeName:HummingBird)

## 概述

Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的2D引擎及全新打造的3D引擎。
它解决了HTML5性能问题及碎片化问题，灵活地满足开发者开发2D或3D游戏的需求，并有着极强的跨平台运行能力。
当前版本为 Egret Engine 3.0 3D API 的Beta版本,欢迎开发者根据试用此版本并与我们的核心开发者进行反馈,交流与贡献。

其中一部分功能未开放，需要的用户请联系Egret3D团队
Egret Engine 3D 官方交流群: 180593985

## 教程文档传送门 ##
http://edn.egret.com/cn/docs/page/902

## Egret  新功能 
### 为了让egret3D更加强大，故收集大多数意见，在稳定版来临之时，我们将修改更高级层次的引擎，性能更高，api更简易，功能更强大
----


Egret3D 3.1.5
#### 更新内容
* 增加HDR图片格式的使用
* 增加骨骼动画流式解析

#### Bug列表
* 修复MapLoader资源重复加载问题
* 修复BoundBox检测相交bug
* 修复骨骼动画对重复new矩阵对象的bug

#### 优化列表
* 优化水渲染效果

Egret3D 3.1.8
#### 更新内容
* 增加粒子渲染特效
* 增加实时阴影渲染
* 增加GUI

#### Bug列表
* 修复aplha混乱
* 修复骨骼动画反播时事件响应bug
* 修复CylinderGeometry创建时索引错误，导致圆柱模型渲染异常
* 修复默认棋盘格渲染异常（出现3角）
* 修复UVSpriteSheetMethod 多个对象的start没有单独控制功能的bug

#### 修改列表
* 场景文件使用json进行加载
* 修改MapLoader加载接口
* 修改默认cutAlpha值为0

#### 工具内容
* 修改导出骨骼动画TPOSE 为动画第一帧
* 粒子特效导出