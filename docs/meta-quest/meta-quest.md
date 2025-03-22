---
title: "概述"
id: "meta-quest"
---

![Android](/assets/android.svg)<br />

Home Assistant 开始为 Meta Quest 提供 [最小版本](/core/android-flavors.md) 的 Android 应用。该应用可以在 Meta Quest 的替代应用商店 [SideQuest](https://www.sidequestvr.com) 中找到。

<a href="https://sidequestvr.com/app/6427/home-assistant" style={{ display: 'inline-block', width: '200px' }}>
    <img class="download-badge" width="175" src="https://sidequestvr.com/assets/images/branding/Get-it-on-SIDEQUEST.png" alt="在 SideQuest 上下载" />
</a>
<br /><br />

| 型号 | 是否支持? |
| ----- | --------- |
| Meta Quest | 是 |
| Meta Quest 2 | 是 |
| Meta Quest Pro | 是 |
| Meta Quest 3/3S | 是 |

该应用具有许多主版本提供的传感器，因为 Quest 运行 Android。请在设置中查看管理传感器屏幕以查看当前支持哪些传感器。要了解每个 Android 传感器以及传感器的工作原理，请务必查看 [传感器](/core/sensors.md#android-sensors) 文档。

并非所有 Android 应用的功能都能在 Meta Quest 上正常工作，因为它运行的是经过重大修改的 Android 分支。没有谷歌服务，没有小部件，没有快捷方式，也没有标准通知。

在此页面上，我们将覆盖为 Meta Quest 准备的特定功能和传感器，敬请关注更多更新！

### 传感器列表

| 传感器 | 属性 | 描述 |
| --------- | --------- | ----------- |
|`binary_sensor.in_use` | 无 | 耳机是否在使用中（会立即更新） |
