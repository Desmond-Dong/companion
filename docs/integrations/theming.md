---
title: 主题
id: 'theming'
---

## 使用的颜色

![Android](/assets/android.svg) &nbsp; Android<br /><br />
颜色应以十六进制格式指定（例如 `#0099ff`），并不支持通过变量名称定义元素颜色。
- `primary-background-color` 用于导航栏背景颜色 ![Android](/assets/android.svg)
- `app-header-background-color` 用于状态栏背景颜色 ![Android](/assets/android.svg)

![iOS](/assets/iOS.svg)<br /><br />
从版本 2020.3 开始，iOS 应用将接受以十六进制、rgb、hsl、rgba、hsla 格式指定的颜色或使用有效的 [HTML 颜色名称](https://www.w3schools.com/colors/colors_names.asp)；虽然识别带有 alpha 值的格式，但当前使用少于 100%（或 1）的 alpha 值会导致颜色不匹配。2020.2 及更早版本的应用要求颜色以十六进制指定。
- `primary-background-color` 用于网页视图的背景颜色 ![iOS](/assets/iOS.svg)
- `app-header-background-color` 用于状态栏背景颜色 ![iOS](/assets/iOS.svg)
- `primary-color` 用于下拉刷新控件/旋转器 ![iOS](/assets/iOS.svg)

## 设置应用主题

使应用与 Home Assistant 主题匹配所需的过程因所使用的应用版本而异。

### 2020.2 之后的 iOS 应用

该应用将自动匹配 Home Assistant 中选择的主题，并在主题更改时实时更新。

### 2020.1 或更早版本的 iOS 应用和 Android 应用

要更改应用的主题，必须在 Home Assistant 中使用 [服务调用](https://www.home-assistant.io/docs/scripts/service-calls/) 调用 `frontend.set_theme` 来进行更改。这将触发一个应用可以检测到的事件。