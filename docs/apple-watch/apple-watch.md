---
title: "概述"
id: "apple-watch"
---

Home Assistant 与 Apple Watch 具有深度集成。您可以直接在手表表盘上显示 Home Assistant 信息作为复杂项，并且从应用版本 2024.9 开始，可以运行脚本、激活场景和 iOS 动作。

## 首页

自 iOS 应用版本 2024.9 发布以来，您现在可以使用 `脚本`、`场景` 和 `iOS 动作` 自定义您的 Home Assistant 手表体验。
使用您的 iPhone，打开伴侣应用设置，在 **Apple Watch** 部分，查找 **配置**。如果您已经创建了 **iOS 动作**，它们将迁移到配置屏幕中。选择 **保存** 并在您的手表上重新加载。

<img src='/assets/ios/watch-config.png' alt="手表配置屏幕" />

:::info 要求
Apple Watch 集成需要 watchOS 8。要安装 watchOS 8，您必须拥有 Apple Watch Series 3 或更新的型号。您可以在 [这里](https://support.apple.com/HT204507) 确定您的 Apple Watch 型号。
:::

## 复杂项类型

Apple Watch 具有多种表盘和复杂项。咨询 [人机界面指南](https://developer.apple.com/design/human-interface-guidelines/components/system-experiences/complications/) 以获取不同类型的示例以及特定复杂项的显示方式是有用的。您可以将 4 种主要类型的信息放入复杂项中：

- 文本，这可以作为 [模板](https://www.home-assistant.io/docs/configuration/templating/) 渲染，显示的字体加粗和大小取决于模板类型。
- 环形和仪表，这呈现为圆形线条。开放变体呈现为完整的圆形，封闭变体则在图标中具有明确的开始和结束位置。环形和仪表需要介于 `0.0`（空）和 `1.0`（满）之间的数值，并且也支持 [模板](https://www.home-assistant.io/docs/configuration/templating/)。
- 图像可以从应用支持的 [Material Design Icons](http://materialdesignicons.com) 选择。

:::info 支持的复杂项类型
从 watchOS 9 开始，Apple 不再支持几种（旧版）复杂项类型。以下复杂项类型可用于 watchOS 9 及更高版本：图形圆形、图形角落、图形矩形和模块大。有关不同类型的更多详细信息，请参阅 [人机界面指南](https://developer.apple.com/design/human-interface-guidelines/components/system-experiences/complications/)。
:::

:::note 应用版本 
环形和仪表功能在 2020.7 之前的应用版本中无法使用。
:::