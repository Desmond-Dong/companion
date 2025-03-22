---
title: "Android 快捷设置"
id: 'android-quick-settings'
---

![Android](/assets/android.svg)<br />

Android 应用程序支持快捷设置 [瓷砖](https://developer.android.com/reference/android/service/quicksettings/TileService)，允许您快速执行脚本/场景、按（输入）按钮或在通知下拉菜单中切换支持的领域。您可以完全自定义这些瓷砖的外观，并根据需要重新组织它们。此功能可在运行 Android 7.0 及更高版本的设备上使用。要开始，请导航到 [设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用 > 管理瓷砖。

该应用程序当前最多提供 40 个瓷砖进行设置。每个瓷砖必须设置标签，在 Android 10 或更高版本中可以选择设置子标签。在选择标签和实体后，您将能够更新瓷砖数据。更新后，瓷砖准备好使用：编辑您设备的快捷设置面板，并将 Home Assistant 瓷砖从瓷砖列表拖到活动区域。

添加瓷砖后，状态、标签和图标将更新以反映实体的状态和瓷砖设置。当您选择一个瓷砖时，您会看到瓷砖瞬间亮起，因为应用程序正在调用服务器。如果成功，瓷砖将回到显示实体的状态，如果失败，瓷砖将变为禁用状态，并显示错误消息。

以下领域得到支持：

*  `automation` 切换
*  `button` 按压
*  `cover` 切换
*  `fan` 切换
*  `humidifier` 切换
*  `input_boolean` 切换
*  `input_button` 按压
*  `light` 切换
*  `lock` 锁定/解锁
*  `media_player` 切换
*  `remote` 切换
*  `siren` 切换
*  `scene` 开启场景
*  `script` 开启脚本
*  `switch` 切换

可选的附加设置：

* 瓷砖将默认使用实体图标。点击图标以使用不同的图标进行瓷砖设置。
* 点击时可启用震动，在点击瓷砖时震动一次，如果操作失败则震动两次。
* 需要解锁设备可以启用，仅在设备解锁时允许与瓷砖进行交互。