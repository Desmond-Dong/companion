---
title: "概述"
id: "carplay"
---

![iOS](/assets/iOS.svg)

Home Assistant 提供了一种 CarPlay 体验。这将允许您在驾驶车辆时安全地与各种实体进行交互。

### 设置

要使用此集成，您需要一部 iPhone 以及一辆支持 CarPlay 的车辆。一旦您在 iPhone 上登录，您应该可以使用 CarPlay 主屏幕上的 Home Assistant 图标。

默认情况下，您在 CarPlay 中不会看到任何相关信息，您需要打开 ***Companion App Settings → CarPlay*** 并创建您的配置。您可以选择显示哪些选项卡。

### 选项卡

CarPlay 有 4 个选项卡：

- **快速访问：** 在您的 CarPlay 配置中，您可以决定在 **快速访问** 选项卡上显示哪些实体。

- **区域：** 轻松访问您家中区域的实体。
- **控制：** 让您按域访问分组的实体。
- **服务器：** 允许您在服务器之间切换。

![CarPlay](/assets/ios/CarPlay.png)

### 支持的可操作域

- `button`
- `cover`
- `input_boolean`
- `input_button`
- `light`
- `lock`
- `scene`
- `script`
- `switch`