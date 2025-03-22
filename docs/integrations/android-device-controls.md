---
title: "Android 设备控制"
id: 'android-device-controls'
---

该 ![Android](/assets/android.svg) Android 应用程序将自动与运行 Android 11 或更高版本且支持的 [智能家居设备控制](https://developer.android.com/guide/topics/ui/device-control) 功能集成。所需的唯一条件是您能够登录应用程序并远程使用它。

要开始，请在您的设备上打开设备控制。具体位置取决于设备制造商和 Android 版本，常见位置包括：快速设置面板、通知抽屉或电源菜单。点击“添加控制”并选择 Home Assistant 应用程序。下面列出的所有域都可添加到设备控制面板中。

点击一个图块将切换其开关。某些域还允许您通过在图块上来回滑动手指来增加或减少范围。

支持以下域：

*  `automation` 开/关
*  `button` 按压
*  `camera` 快照图像（仅支持 Android 12 或更高版本）
*  `climate` 温度滑块，循环切换模式
*  `cover` 开/关
*  `fan` 开/关，速度滑块
*  `humidifier` 开/关
*  `input_boolean` 开/关
*  `input_button` 按压
*  `input_number` 数字控制滑块
*  `light` 开/关，亮度控制滑块
*  `lock` 锁定/解锁
*  `media_player` 播放/暂停，音量控制滑块
*  `number` 数字控制滑块
*  `remote` 开/关
*  `scene` 打开场景
*  `script` 打开脚本
*  `siren` 开/关
*  `switch` 开/关
*  `vacuum` 启动/停靠或根据吸尘器类型开/关

## 锁定时使用

在 Android 11 上，您可以在设备锁定时使用添加的控制。

在 Android 12 上，您无法在设备锁定时使用添加的控制。

在 Android 13 及更高版本上，您可以控制设备锁定时添加控制的使用。首先，请确保您已在系统设置中启用锁定时使用设备控制的选项（设置应用 > 显示 > 锁屏）。现在您可以在设备锁定时使用添加的控制！如果您想更改特定控制或实体的设置，打开 Home Assistant 并转到 [设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用 > 管理设备控制。

## 使用仪表板而不是内置控制

从 Android 14 开始，在受支持的设备上，您还可以在使用设备控制功能时显示 Home Assistant 仪表板，而不是内置控制。这两种模式各有其优点：内置控制简单易用，允许您管理每个实体的锁定设置，并并排控制多个服务器，而仪表板支持所有 Home Assistant 功能，并允许根据您的需求完全自定义控制。上述文档描述了内置控制。

要在模式之间切换，请打开应用并转到 [设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用 > 管理设备控制，然后选择“内置”或“仪表板”。选择仪表板后，您还可以输入要使用的仪表板路径（例如：`/lovelace/default_view` 或 `/lovelace-dashboardname/viewname`）以使用不同于默认的仪表板。

:::info
从内置设备控制切换到仪表板时：如果您之前使用了内置设备控制，您可能需要在显示仪表板之前删除所有控制。
:::