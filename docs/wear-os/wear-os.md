---
title: "概述"
id: "wear-os"
---

![Android](/assets/android.svg) 仅限 8+

您可以直接从您的 Wear OS 手表访问 Home Assistant，即使在未连接到手机的情况下，也可以使用手表上的 WiFi 或蜂窝连接。

该应用程序并不支持所有 Home Assistant 功能。请关注此页面，因为该应用程序正在增强新功能！查看 [传感器！](sensors.md)

## 先决条件

要在手表上设置 Home Assistant，您需要一台配对的安卓手机，并安装 Home Assistant 应用以登录。登录后，手机应用不再使用。

## 主屏幕

以下列表的领域目前在您登录并选择后可以进行切换/执行：

* `button`
* `cover`
* `fan`
* `input_boolean`
* `input_button`
* `light`
* `lock`
* `scene`
* `script`
* `switch`

### 收藏夹

用户可以在 Wear OS 应用中进入设置，设置最爱的实体，这些实体将出现在列表的顶部。这些实体会在其他实体加载之前出现，以便在启动应用时可以立即执行。如果您从 Home Assistant 实例中删除实体，还有一个设置选项可以清除收藏夹，以移除过时的实体。

收藏夹也可以通过手机应用进行管理，路径为：应用配置 > Wear OS 应用 > 管理收藏夹。手机应用还允许您拖放实体以更改在主屏幕上的显示顺序。

如果您只希望在 Wear OS 应用中显示最爱的实体而不显示其他内容，您可以打开应用并导航到设置，然后选择“仅显示收藏夹”选项。这样将隐藏区域和领域，您只会看到收藏夹。

### 区域

如果在 Home Assistant 中有任何设备或实体被添加到区域，这些区域将显示在 Wear OS 应用的收藏夹下。点击某个区域将显示该区域中的所有主要实体。任何没有添加到某个区域的主要实体的领域将显示在列表的底部，标记为“更多实体”。配置和诊断实体以及隐藏实体仅在“所有实体”中显示，在列表底部。

### 更多详情

长按任何实体会打开更多详情屏幕。此屏幕包含有关状态以及实体上次更新时间的更多信息。详情屏幕上的选项根据实体的支持程度提供：

- `fan`: 速度控制
- `light`: 亮度控制和色温控制

### 设置

设置屏幕位于主屏幕的底部。在这里，您将能够在手表上添加收藏夹，并配置图块。您还会发现启用触觉反馈和/或确认提示的选项，以知道何时选择了实体。这些设置将反映在主屏幕和快捷方式图块中。

## 图块

* 快捷方式图块显示最多 7 个快捷方式，可以从 Wear OS 应用的设置部分进行选择。您将能够选择与从主屏幕访问的实体相同的实体集。从 Wear OS 3 开始，可以添加任意数量的可单独配置的图块，仅限于 Wear OS 对图块总数量的限制。
* 模板图块显示渲染的模板。模板只能从安卓伴侣应用中设置。注意：在图块中无法滚动，模板应适合在手表屏幕上显示。
* 摄像头图块显示所选摄像头的快照。
* 助力图块允许您快速 [在手表上打开助力](https://www.home-assistant.io/voice_control/android/#assist-on-wear-os)。
* <span class='beta'>测试版</span> 温控器图块允许您查看和控制气候实体的目标温度。

:::note 关于图块刷新
Wear OS 限制应用更新图块的频率以及它们可以具备的交互性。对于摄像头、模板和温控器图块，您可以选择刷新间隔，这向系统指示图块应多频繁刷新。

 - 手动（仅当您点击刷新按钮时更新）
 - 在视图中（仅在您将图块滚动到视图中时更新）
 - 每 x 分钟/小时（在后台更新图块，即使在未查看时）

对于“手动”以外的间隔，系统不保证更新：如果图块未放置在图块列表的开始或结束，它们很可能更新得不那么频繁。您可能会在 1-2 秒内看到图块的旧版本，同时它在更新。

每 x 分钟/小时更新的选项仍然会在查看时更新图块。例如：选择每小时的更新间隔将向系统指示该图块在查看时应更新，并在上次查看后每小时在后台更新。
:::

### 样式化模板图块

您可以使用 HTML 格式化显示的文本。当前支持以下标签：

* 添加新行：`<br>`
* 更改文本样式：`<b>粗体</b>`、`<i>斜体</i>` 或 `<u>下划线</u>`
* 更改文本大小：`<big>大</big>` 或 `<small>小</small>`
* 更改颜色：`<font color='#03a9f4'>彩色文本</font>`
* 使用标题：`<h1>标题</h1>`、`<h2>副标题</h2>` 等。

### 温控器图块
<span class='beta'>测试版</span> 温控器图块可用于按步幅上调或下调气候实体的目标温度。由于图块刷新受限，因此显示的目标温度可能不再准确。因此，如果用户通过图块改变温度，当前目标温度会首先刷新。如果用户快速多次改变温度，每次点击会相对于上一次点击的结果来改变温度，而不是从服务器获取目标温度。这是为了抵消某些温控器在更改目标温度时的延迟。

## 并发症

* 实体状态并发症可以显示在您的手表表盘上。并发症将显示所选实体的当前状态，并可选择显示测量的名称和单位。根据手表表盘的不同，并发症还可能显示实体名称和图标，并支持“短文本”和“长文本”并发症类型。

  当您将实体添加到手表表盘时，可以选择要显示的实体。这仅在手表上编辑表盘时有效，而在手机上的手表应用中无效。要更改所选实体，只需更改并发症并再次选择实体状态并发症。每当屏幕开启时，并发症将自动更新，约每 15 分钟更新一次。您可以通过在表盘上点击并发症来强制更新。

  提示：使用 [模板传感器](https://www.home-assistant.io/integrations/template/#state-based-template-binary-sensors-buttons-numbers-selects-and-sensors) 可实现完全灵活性。

* 助力并发症可用于快速通过手表表盘直接与助力功能交互。

## 通知

Wear OS 设备默认会转发来自连接设备的 [通知](../notifications/basic.md)，这意味着通知需要先发送到连接设备，然后再到达可穿戴设备。Wear OS 应用允许直接将通知发送到手表本身，跳过连接设备。由于平台限制，连接设备支持的并非所有通知功能在 Wear OS 应用中都受支持。

当前仅支持以下参数。

*  [`channel`](../notifications/basic.md#notification-channels)
*  `message`
*  [`notification_icon`](../notifications/basic.md#notification-status-bar-icon)（并不是所有设备都会显示图标）
*  [`tag`](../notifications/basic.md#replacing)（仅限于替换通知的支持）
*  `title`
*  [`vibrationPattern`](../notifications/basic.md#notification-vibration-pattern)（如果您的设备默认不震动，可能需要设置震动，具体模式可能不被设备遵守）

示例：

```yaml
automation:
  - alias: '发送可穿戴通知'
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "通知消息"
          title: "通知标题"
          data:
            notification_icon: "mdi:fire"
            tag: "通知"
```

:::info
要加快通知的发送，您可能需要使用 [文档](../notifications/critical.md#android) 中列出的首个关键通知格式。警报流通知目前在 Wear OS 中不受支持。
:::

### 通知命令

Wear OS 应用对 [通知命令](../notifications/commands.md) 提供基本支持。不幸的是，并非所有命令都能在应用中得到支持。以下命令列表当前被支持：

*  [BLE 发送器](../notifications/commands.md#ble-beacon-transmitter)
*  [信标监控](../notifications/commands.md#beacon-monitor)
*  [清除通知](../notifications/basic.md#clearing)
*  [停止语音合成](../notifications/commands.md#stop-tts)
*  [更新传感器](../notifications/commands.md#update-sensors)

### 通知已清除

Wear OS 应用还支持 [通知已清除](../notifications/notification-cleared/) 事件。当通知被清除时，将从伴侣应用发送一个事件。

### 语音合成通知

Wear OS 应用还支持 [语音合成通知](../notifications/basic.md#text-to-speech-notifications)。有关使用格式和注意事项，请参考上述链接。