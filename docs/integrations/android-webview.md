---
title: "Android WebView"
id: 'android-webview'
---


![Android](/assets/android.svg)

## 自动播放视频
![Android](/assets/android.svg) Android 应用程序在加载更多信息面板时具有自动播放视频的能力。有些设备可能已经默认这样做，但其他设备可能需要通过在 [设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用中启用此设置。启用此设置可能会意外增加数据使用，请谨慎操作。

## 在应用启动时始终显示第一个视图
![Android](/assets/android.svg) Android 应用程序在打开时具有始终打开用户所选默认仪表板的第一个视图的能力。第一个视图是 Home Assistant 标题栏上的第一个标签。

![第一个视图](/assets/ha_first_view.png)

如果您的第一个视图包含有关智能家居的所有重要信息，这非常有用。如果您在不同的*不那么重要的视图*上关闭应用程序，并在稍后重新打开应用程序，您将立即在第一个视图中再次看到重要的智能家居信息。

:::caution
如果您在 Home Assistant 配置或伴侣应用配置中，则在打开应用程序时不会显示仪表板的第一个视图！
:::

## 保持屏幕常亮
![Android](/assets/android.svg) Android 应用程序通过在 [设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用中启用相应设置，可以在 WebView 活动处于活动状态时保持屏幕常亮。这将使您的设备屏幕无限期保持开启，并忽略 Android 内置的睡眠设置。

此功能也可以通过通知命令进行控制， [查看详细信息](https://companion.home-assistant.io/docs/notifications/notification-commands#screen-on)。

## 链接

![Android](/assets/android.svg) Android 应用程序具有拦截某些类型链接的能力，以允许用户直接启动设备上找到的另一个应用程序（或者在未找到应用程序时引导用户安装应用）。用户还可以使用 [Intent Scheme](https://developer.chrome.com/docs/multidevice/android/intents/#syntax) 执行应用支持的任何操作。

使用 Lovelace 实体卡的示例 [weblink](https://www.home-assistant.io/dashboards/entities/#weblink):

此示例将在设备上启动 Twitter（如果已安装），否则将打开 Google Play 商店应用程序或网站。
```yaml
- type: weblink
  name: Twitter
  url: "app://com.twitter.android"
```

此示例将启动准备通过 Intent 方案进行扫描的条形码扫描应用程序，如果未安装应用程序，用户将被引导安装它。
```yaml
- type: weblink
  name: 扫描
  url: "intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end"
```

## 屏幕方向
![Android](/assets/android.svg) Android 应用程序通过在 [设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用中启用相应设置，可以固定 WebView 的横屏 / 竖屏 / 系统方向。

## 触控缩放
![Android](/assets/android.svg) Android 应用程序通过在 [设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用中启用相应设置，可以启用触控缩放以允许多点触控缩放。

## 远程调试
![Android](/assets/android.svg) Android 应用程序具有启用 [Chrome 远程调试](https://developer.chrome.com/docs/devtools/remote-debugging/) 的能力，以便更轻松地排查前端问题。您可以在 [设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用 > 故障排除中启用此设置。

## 滑动手势

![Android](/assets/android.svg) Android 应用程序支持各种三指手势：

 - 向左/右滑动：快速激活应用中的上一个/下一个服务器。
 - 向上滑动：快速激活应用中的其他服务器。系统将提示您从列表中选择一个服务器。
 - 向下滑动：打开 [快速栏](https://www.home-assistant.io/docs/tools/quick-bar/)。最初将显示实体过滤器，您可以通过在输入开头键入 `>` 切换到命令面板。只有在您登录后，才能在 WebView 内部启动快速栏。

:::caution
如果您的设备支持其他三指手势（例如用于截图），手势可能无法正常工作。

快速栏手势在 Home Assistant 核心版本 2022.7.0 - 2022.9.7 中不可用。请升级到 Home Assistant 核心版本 2022.10.0 或更高版本。
:::