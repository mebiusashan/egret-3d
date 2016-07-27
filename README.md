# Egret Engine 3D API(CodeName:HummingBird)

## 概述

Egret Engine 3.0 包含了白鹭时代研发的遵循HTML5标准的2D引擎及全新打造的3D引擎。
它解决了HTML5性能问题及碎片化问题，灵活地满足开发者开发2D或3D游戏的需求，并有着极强的跨平台运行能力。

当前版本为 Egret Engine 3.0 3D API 的Beta版本,欢迎开发者根据试用此版本并与我们的核心开发者进行反馈,交流与贡献。

## 教程文档传送门 ##
http://edn.egret.com/cn/docs/page/902

## Egret  新功能 
### 为了让egret3D更加强大，故收集大多数意见，在稳定版来临之时，我们将修改更高级层次的引擎，性能更高，api更简易，功能更强大
----

#### 优化渲染框架，提升至少30%性能。
#### 优化shader使用方式。
#### 增加Egret3DCanvas 支持多View3D显示方式，意味着你可以多窗口显示模型。
#### geometry 支持多子模型，多材质ID。
#### material 支持多维材质，并支持多pass渲染（比如 normal，depth 渲染）。
#### skeleton animation 支持46+骨骼动画。
#### shader 内加载方式，减少HTTP请求数量。
#### 增加 billboard 公告板 , 永远面对摄像机的显示面片。
#### 增加优化 材质特效使用方式。
#### 增加 材质 Blender。
#### 增加 材质 透明剔除阈值。
#### 与egret2D较好支持混合。



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