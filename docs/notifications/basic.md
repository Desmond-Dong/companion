---
title: "介绍"
id: "notifications-basic"
---

`mobile_app` 通知平台接受通知平台使用的标准 `title`、`message` 和 `target` 参数。移动应用通知平台支持将目标设置为服务。只要您在设置期间授予通知权限，您就会发现所有设备都列为通知操作的目标，其名称以 `notify.mobile_app_` 开头，后跟设备 ID。您可以在 [Home Assistant 配置菜单](https://my.home-assistant.io/redirect/config/) 的 Companion App 菜单中检查这个，默认名称为 iOS/macOS 设置应用程序中常规 > 关于中指定的名称，或在 Android 设置的关于 > 手机下（空格和非字母数字字符替换为下划线）。通知平台的一个要求是您必须在有效负载中指定至少 `message:`。下面是一个通知的最低工作示例：

```yaml
automation:
  - alias: '发送通知'
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "通知文本"
```

移动应用平台提供了许多增强功能，以改善上面生成的简单通知。例如，下面的图像展示了一个 [iOS 可操作通知](actionable.md)，允许您通过每个按钮触发不同的自动化。
![一个推送通知，展示了所有基本选项 `title` 和 `message` 以及 `subtitle` 和操作。](/assets/ios/example.png)

:::info
Wear OS 应用支持某些通知功能。请查看 [文档](../wear-os/wear-os.md#notifications) 以了解当前支持的内容。
:::

## 向多个设备发送通知

要向多个设备发送通知，请创建一个 [通知组](https://www.home-assistant.io/integrations/group#notify-groups)：
```yaml
notify:
  - name: ALL_DEVICES
    platform: group
    services:
      - action: mobile_app_iphone_one
      - action: mobile_app_iphone_two
      - action: mobile_app_ipad_one
      - action: mobile_app_pixel_4_xl
```
现在，您可以使用以下代码向组中的每个人发送通知：
```yaml
  automation:
    - alias: "通知移动应用组"
      trigger:
        ...
      action:
        - action: notify.ALL_DEVICES
          data:
            message: "家里发生了事情！"
```

## 一般选项

### 附件

您可以向通知附加媒体和其他内容。请参见 [附件](/docs/notifications/notification-attachments)。

### 打开 URL

在点击通知时，您可以选择打开一个 URL，这可能属于以下几种情况：

- 相对于您的 Home Assistant 实例的相对 URL，例如 `/lovelace/test`。
    - ![iOS](/assets/iOS.svg) 如果您有多个服务器连接到 iOS 或 mac 应用， 相对 URL 将相对于发送通知的服务器进行处理。
- 一个完整的 URL，例如 `https://example.com`
- 关于可操作通知中的特定操作，请参见 [其文档](/docs/notifications/actionable-notifications)。
- ![Android](/assets/android.svg) 使用 `app://<package name>` 的应用程序，其中 `<package name>` 替换为您希望打开的实际包。
- ![Android](/assets/android.svg) 使用 `entityId:<entity_ID>` 的实体的更多信息面板，其中 `<entity_id>` 替换为您希望查看的实体 ID。例如：`entityId:sun.sun`。
- ![Android](/assets/android.svg) 您还可以通过使用 `settings://notification_history` 打开通知历史记录。
- ![Android](/assets/android.svg) 您还可以使用 [intent scheme URI](https://developer.chrome.com/docs/multidevice/android/intents/#syntax) 在安装的应用程序中启动一个操作。
- ![Android](/assets/android.svg) 您可以通过使用 `deep-link://<deep_link>` 向应用发送特定的 [深度链接](https://developer.android.com/training/app-links#deep-links)，其中 `<deep_link>` 是您希望发送的实际深度链接。
- ![Android](/assets/android.svg) 如果您希望默认情况下不打开应用程序而是保持无行动，您可以使用 `noAction`。

对于相对 URL，您可以使用格式 `/lovelace/test` 打开 lovelace 视图，其中 `test` 被您定义的 [`path`](https://www.home-assistant.io/dashboards/views#path) 替换，或使用格式 `/lovelace-dashboard/view` 打开 lovelace 仪表板，其中 `/lovelace-dashboard/` 被您定义的 [`dashboard`](https://www.home-assistant.io/dashboards/dashboards/) URL 替换，`view` 被该仪表板内定义的 [`path`](https://www.home-assistant.io/dashboards/views#path) 替换。



```yaml
automation:
  - alias: "通知运动点击操作"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "后院检测到运动"
          message: "后院可能有人。"
          data:
            # iOS URL
            url: "https://google.com"
            # Android URL
            clickAction: "https://google.com"
```

```yaml
automation:
  - alias: "发送带链接的通知"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "后院检测到运动"
          message: "后院可能有人。"
          data:
            # iOS URL
            url: "/lovelace/cameras"
            # Android URL
            clickAction: "/lovelace/cameras"
```

:::info
以下 [分组](#grouping)、[替换](#replacing) 和 [清除](#clearing) 的部分不考虑多个服务器。如果您对 `group` 或 `tag` 使用相同的文本，则无论哪个服务器发送通知，您都应期望看到相同的行为。您可以考虑向当前文本添加服务器名称，以使行为特定于服务器。
:::

### 分组

将通知视觉上组合在一起。

![iOS](/assets/iOS.svg) 不支持分组 [关键通知](critical.md)。

```yaml
automation:
  - alias: "通知移动应用分组"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "智能家居警报"
          message: "家里发生了事情！"
          data:
            group: "示例通知组"
```

### 替换
通过使用通知的标签替换现有通知。所有后续通知将取代具有相同标签的通知。

![iOS](/assets/iOS.svg) 不支持替换 [关键通知](critical.md)。

```yaml
automation:
  - alias: "通知运动 iOS 替换"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "后院检测到运动"
          message: "后院可能有人。"
          data:
            tag: "backyard-motion-detected"
```

:::info
![Android](/assets/android.svg) 不要在不同的 `group` 中使用相同的 `tag` 以避免意外行为。
:::

### 清除

:::note ![iOS](/assets/iOS.svg) 版本要求
在 iOS 上清除通知需要应用版本 2021.5 或更高版本。
:::

您可以通过发送 `clear_notification` 清除带标签的现有通知。

平台限制可能要求最近使用 companion 应用以清除通知：这适用于所有 iOS 通知，以及任何未标记为关键的 Android 通知。

![iOS](/assets/iOS.svg) 将仅清除给定标签的最新 [关键通知](critical.md)。

```yaml
automation:
  - alias: "通知运动清除通知"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "clear_notification"
          data:
            tag: "backyard-motion-detected"
```

### 副标题 / 主题

副标题和主题是您可以在通知中使用的次级标题，超出标题属性。

![iOS](/assets/iOS.svg) ![macOS](/assets/macOS.svg)<br />
`subtitle` 将与标题和消息一起显示。

![Android](/assets/android.svg)<br />
`subject` 可能会取代较长内容（超过 6 行），具体取决于您的设备。

```yaml
automation:
  - alias: "通知移动应用副标题"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "智能家居警报"
          message: "家里发生了事情！"
          data:
            # iOS 示例
            subtitle: "副标题在这里"
            # Android 示例
            subject: "长文本的主题"
```

## Android 特定

### 通知颜色

在 Android 中，您可以设置通知的 `color`，可以使用颜色名称或十六进制代码。

```yaml
automation:
  - alias: "通知运动颜色"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "后院检测到运动"
          message: "后院可能有人。"
          data:
            color: "#2DF56D" # 或 "red"
```

### 持续通知

您可以设置在选择通知时是否解除通知。将 `sticky` 设置为 `'true'` 将在用户选择时防止通知被解除。如果将其设置为 `'false'`（默认），则在选择通知时会解除通知。

```yaml
automation:
  - alias: "通知运动粘贴"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "后院检测到运动"
          message: "后院可能有人。"
          data:
            sticky: "true" # 或 "false"
```

### 通知渠道

通知渠道（在某些设备上：_通知类别_）允许您轻松区分通知（例如，闹钟与洗衣）并自定义通知声音及许多其他设备特定功能。在 Android 8.0+ 的设备上，能够使用自动化动态创建和管理通知渠道。创建渠道后，您可以导航到通知设置，您将找到新创建的渠道，从那里您可以根据设备的允许自定义行为。

#### 创建渠道

为了创建通知，您需要指定想要使用的 `channel`。如果未定义 `channel`，则所有通知默认使用 `General`。

在下面的示例中，将创建一个名称为 `Motion` 的新渠道：

```yaml
automation:
  - alias: "通知运动渠道"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "后院检测到运动"
          message: "后院可能有人。"
          data:
            channel: "Motion" # 您希望创建或使用的渠道名称
```

如果未提供渠道的默认值如下：
- 重要性：默认意味着默认通知重要性：无处不在，会发出声音，但不会在视觉上干扰。
- 振动模式：振动禁用
- LED 颜色：LED 禁用

#### 删除渠道

如果您希望删除一个渠道，您需要发送 `message: remove_channel`，并附上您希望删除的 `channel`。 
删除渠道并不会将设置重置为默认值，它只是将其从通知渠道列表中移除。如果您向已删除的渠道发送通知，则将会恢复该渠道。真正删除渠道的唯一方法是清除应用数据，这将删除所有内容。

根据您安装应用的时间，您可能希望向 `channel: default` 发送 `remove_channel` 以清除旧的默认渠道：

```yaml
automation:
  - alias: 删除运动渠道
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "remove_channel"
          data:
            channel: "Motion" # 您希望删除的渠道名称
```

#### 特定渠道属性

:::info
如果您的设备在 Android 8.0 及以上版本，以下属性将成为首次设置时 `channel` 的默认值： 
- [`vibrationPattern`](#notification-vibration-pattern)
- [`ledColor`](#notification-led-color)
- [`importance`](#notification-channel-importance)

一旦为特定渠道设置这些选项，它们将被忽略，只能降低其 `importance`（如果用户尚未修改此项）。

运行 Android 5.0-7.1.2 的设备没有渠道，不需要担心此说明。
:::

### 通知渠道重要性

在设置通知的 `channel` 时，您还可以选择为每个通知设置 `importance`。该属性的可能值为 `high`、`low`、`max`、`min` 和 `default`。要了解每个值的具体作用，请参阅 [FCM 文档](https://developer.android.com/training/notify-user/channels#importance)。对于 Android 8.0 之前的设备，此属性可以如同 `priority` 一样使用，具有上述相同的选项。

有关此属性的重要行为，请参见 [特定渠道属性](#specific-channel-properties)。

```yaml
automation:
  - alias: "通知运动渠道重要性"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "检测到运动"
          data:
            channel: "Motion" # 仅适用于 Android 8.0+ 的设备
            importance: high
```

### 通知振动模式 

您可以通过设置 `vibrationPattern` 属性来设置 `channel` 的振动模式。可能值是数字列表。例如："100, 1000, 100, 1000, 100" 等等。模式规范格式为 "关机时间，开机时间，关机时间，开机时间，关机时间" 等等。

有关此属性的重要行为，请参见 [特定渠道属性](#specific-channel-properties)。

```yaml
automation:
  - alias: "通知运动振动"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "检测到运动"
          data:
            vibrationPattern: "100, 1000, 100, 1000, 100" # 您希望设置的振动模式
            channel: "Motion" # 仅适用于 Android 8.0+ 的设备
```

### 通知 LED 颜色

某些 Android 设备具有多种颜色的通知 LED。 通过设置 `ledColor` 属性，您可以控制 LED 闪烁的颜色。可能值与属性 [color](#notification-color) 相同，例如 '#2DF56D' # 或 'red'。

有关此属性的重要行为，请参见 [特定渠道属性](#specific-channel-properties)。

```yaml
automation:
  - alias: "通知运动 LED 颜色"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: 检测到运动
          data:
            ledColor: "red" # 将 LED 设置为红色
            channel: "Motion" # 仅适用于 Android 8.0+ 的设备
```

### 持久通知

持久通知是无法通过滑动来解除的通知。如果您有重要的事情，比如闹钟提示，这样的通知非常有用。为了使用此属性，您还必须设置 `tag` 属性。 `persistent` 属性只接受布尔值（`true/false`），默认值为 `false`。持久通知在被选择后仍然会解除，要避免这种情况，可以使用 `sticky: true` 使通知保持。

在下面的示例中，我们将创建一个通知，然后稍后删除它。

```yaml
automation:
  - alias: "通知运动持久化"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "检测到运动"
          data:
            persistent: true # 设置为 true 以创建持久通知
            tag: "motion" # 持久通知需要一个标签，可以是任何值
```

:::info
从 [Android 14](https://developer.android.com/about/versions/14/behavior-changes-all#non-dismissable-notifications) 开始，持久通知将可解除，但在设备锁定或选择 "清除所有" 按钮时除外。
:::

要删除持久通知，我们将 `clear_notification` 发送到我们定义的 `tag`。

```yaml
automation:
  - alias: "通知运动持久化删除"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "clear_notification"
          data:
            tag: "motion" # 您希望清除的持久通知的标签
```

### 通知超时

您可以设置通知在用户设备上显示多长时间，然后自动删除/解除。您可以使用 `timeout` 属性以及对应的秒数值来实现这一点。

```yaml
automation:
  - alias: "通知运动超时"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "检测到运动"
          data:
            timeout: 600 # 通知应由设备接收的秒数
```

### 通知消息 HTML 格式化

您可以向通知的 `message` 添加一些自定义 HTML 标签。

```yaml
automation:
  - alias: "通知运动 HTML"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: >
            这是一个 <b><span style="color: red">HTML</span></b> <i>文本</i><br><br>这是换行后的文本
          title: "很酷的 HTML 格式化"
```

:::note 设备兼容性
并非所有设备都支持 HTML 格式化通知，某些格式可能在深色模式下无法显示。如果不支持，通知将显示未格式化的文本。无效的 HTML 可能会导致文本缺失或不当显示。
:::

### 通知图标

您可以通过提供 `icon_url` 设置通知的图标。提供的 URL 必须是公开可访问的或相对路径（即 `/local/icon/icon.png`），有关更多详细信息，请参见 [附件](attachments.md)。重要的是，如果您设置了 `image`，则 Android 将不会显示通知的图标，而会显示 `image`。因此，`message` 将显示 `image`，并且图标为该图像。

```yaml
automation:
  - alias: "通知运动图标"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "检测到运动"
          data:
            icon_url: "https://github.com/home-assistant/assets/blob/master/logo/logo-small.png?raw=true"
```

### 通知敏感度 / 锁屏可见性

您可以通过使用 `visibility` 选项更改通知在锁屏上可见的程度。该属性的可能值为：

 - `public`: 始终显示所有通知内容
 - `private`（默认）：可见性取决于您在系统设置应用程序 > 通知中的设置；如果启用锁定时显示敏感通知的选项，则将显示所有通知内容，否则仅显示基本信息，例如图标和应用名称
 - `secret`: 始终从锁屏上隐藏通知

:::info
当您在系统设置中专门为 Home Assistant 通知更改锁屏可见性以隐藏在锁定时的敏感通知内容时，这也会将任何 `public` 通知视为 `private`，并且您将无法在锁定设备上查看内容。
:::

```yaml
automation:
  - alias: "通知丢失设备"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "这部手机丢失，请归还给 ..."
          data:
            visibility: public
```

### 文字转语音通知

您可以让设备通过语音播报通知，而不是将通知发布到设备上。此通知的工作与其他通知不同。您将设置 `message: TTS`，实际要朗读的文本将放在 `tts_text` 中。目前支持的文本转语音语言与设备上当前设定的语言相同。如果处理消息时出现错误，您会在设备上看到一条吐司消息。请确保 [语音识别与合成](https://play.google.com/store/apps/details?id=com.google.android.tts) 引擎为最新并设置为默认，以防您遇到任何问题。

```yaml
automation:
  - alias: 通知运动 TTS
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "TTS"
          data:
            tts_text: "已检测到运动"
```

默认情况下，文字转语音通知使用音乐流，因此它们将绕过设备的铃声模式，只要设备的音量未设置为 0。您可以选择使用 `media_stream: alarm_stream` 使您的通知无论音乐音量如何都能朗读。

```yaml
automation:
  - alias: "通知运动 TTS 警报"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: TTS
          data:
            tts_text: "已检测到运动"
            media_stream: "alarm_stream"
```

如果您发现警报流音量太低，可以使用 `media_stream: alarm_stream_max`，这将暂时将警报流音量设置为最大级别，播放通知后再恢复到原始音量级别。

```yaml
automation:
  - alias: "通知警报触发"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "TTS"
          data:
            tts_text: "警报已触发"
            media_stream: "alarm_stream_max"
```

您可能不希望在某些情况下朗读 TTS 通知（例如，如果铃声模式不是 `normal` 或启用了 DND）。这可以通过在您的自动化中添加条件来检查 [其他传感器](https://companion.home-assistant.io/docs/core/sensors) 的状态来实现。以下是几个示例：

```yaml
automation:
  - alias: "带条件通知运动"
    trigger:
      ...
    condition:
      - condition: state
        entity_id: sensor.<your_device_id_here>_ringer_mode # 仅在铃声为正常（而不是振动或静音）时发声
        state: normal
      - condition: state
        entity_id: sensor.<your_device_id_here>_do_not_disturb_sensor # 仅在 DND 未启用时发声
        state: 'off'
      - condition: state
        entity_id: sensor.<your_device_id_here>_audio_mode # 仅在手机闲置时（不在通话或响铃）发声
        state: normal
      - condition: state
        entity_id: binary_sensor.<your_device_id_here>_music_active # 仅在手机未播放音乐时发声
        state: 'off'
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: TTS
          data:
            tts_text: "已检测到运动"
```

### 秒表通知

您可以通过传递 `chronometer` 和 `when` 选项创建带有计时器（秒表）的通知。此功能需要至少 Android 7.0。

请注意，计时器达到 0 时通知不会消失。相反，它将继续递减到负值。
您可能希望在计时器达到零时使用 [通知超时](#notification-timeout) 或 [替换通知](#replacing)。

- chronometer - true 启用秒表模式
- when - 要计时向上或向下的时间戳（自 1970 年 1 月 1 日以来的秒数）
- when_relative - true 使 "when" 的值相对，以秒表示，类似于 "timeout"

```yaml
automation:
  - alias: 通知下一个闹钟时间
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "下一个闹钟"
          message: >-
            下一个闹钟在 {{ states('sensor.<your_device_id_here>_next_alarm') }}
          data:
            timeout: 120
            chronometer: true
            when: 120
            when_relative: true
```

### 进度通知

您可以通过传递 `progress` 选项创建带有进度条的通知。

该通知需要不断更新以跟踪进度。确保使用 `tag` 来 [替换](#replacing) 现有通知。一旦过程完成，您可以通过发送进度值为 `-1` 来移除进度条。

- progress - 当前进度值
- progress_max - 进度的最大值（默认为 `1`）
- progress_indeterminate - `true` 使进度条不显示具体进度，而是显示持续动画（默认为 `false`）

```yaml
automation:
  - alias: 通知文件传输进度
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "文件传输"
          message: "文件传输进行中：6 / 32 MB"
          data:
            tag: file-transfer
            progress: 6
            progress_max: 32
```

### 仅警报一次

在 Android 上，您可以选择使通知在设备上仅警报一次。这意味着它将只发出声音、震动和/或闪烁 LED 一次。尽管这不是 Android 的要求，但如果您没有设置 [`tag`](#replacing)，此功能将似乎无法正常工作。此设置默认设置为 `false`，因为每一个通知都会提醒用户。此功能利用 [仅一次警报 API](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder#setOnlyAlertOnce(boolean))

```yaml
  - alias: 仅一次通知
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "一次性"
          message: "这只会在第一次提醒我"
          data:
            tag: "Alarm"
            alert_once: true
```

### 通知状态栏图标
![Android](/assets/android.svg)<br />

在 Android 上，您还可以选择将通知状态栏图标更改为任何 [Material Design](https://materialdesignicons.com/) 上的图标。默认情况下，Home Assistant 图标将显示。预期格式与 Home Assistant `mdi:cellphone` 相同。如果提供了无效的图标名称，则不会显示任何图标。需要 Android 6+。

```yaml
  - alias: 检查您的手机
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "手机图标"
          message: "这将在状态栏中显示手机图标"
          data:
            notification_icon: "mdi:cellphone"
```

### Android Auto 可见性

默认情况下，Home Assistant 通知不会显示在 Android Auto 界面中。通过添加 `car_ui: true`，通知将变得可见，并且从 Android Auto 打开它会启动驾驶界面。有关 Android Auto 中通知工作方式的更多详细信息，请 [查看 Android Auto 文档](../android-auto/android-auto.md#notifications)。

```yaml
  - alias: 发送门未锁定警报
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "门未锁定"
          message: "每个人都离开家，但门仍然没有锁"
          data:
            car_ui: true
```

## iOS/macOS 特定

### 声音
默认情况下，在接收到通知时将播放默认通知声音（在 iOS 上为三音）。有关可用声音和添加自定义声音的详细信息，请查看 [声音文档](sounds.md)。通过将数据有效负载中的 `sound` 设置为 `none`，可以禁用默认通知声音（三音）：

```yaml
automation:
  - alias: 发出声音
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "叮咚"
          data:
            push:
              sound: none
```

### 徽章
您可以在有效负载中设置应用图标徽章。以下示例将使应用图标徽章显示为 5：

```yaml
automation:
  - alias: "通知移动应用更新徽章"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "智能家居警报"
          message: "家里发生了事情！"
          data:
            push:
              badge: 5
```

通过将消息设置为 `delete_alert`，您可以在后台静默更新应用徽章图标，而不向您的手机发送通知。

![iOS](/assets/iOS.svg) 2021.7 将在启动应用时自动将徽章重置为 0。您可以在 [配置](https://my.home-assistant.io/redirect/config/) > Companion App > 通知中控制此行为。

### 中断级别

在 iOS 15 中，您可以设置通知的中断级别，类型如下：

| 值 | 描述 | 覆盖焦点 |
| -- | -- | -- |
| `passive` | 安静通知，不唤醒屏幕 | 否 |
| `active` | 默认行为 | 否 |
| `time-sensitive` | 重要通知 | 是 |
| `critical` | [关键通知](critical.md) | 是，甚至是静音时 |

:::note ![iOS](/assets/iOS.svg) 要求
`time-sensitive` 需要 iOS/macOS-2021.12 或更高版本。
:::

您可以在 [Apple 文档](https://developer.apple.com/design/human-interface-guidelines/ios/system-capabilities/notifications/) 中了解有关这些级别的更多信息。

默认情况下，`time-sensitive` 通知将作为公告被读出。您可以在系统设置应用程序 > 通知 > 宣布通知 > Home Assistant 中控制哪些通知被宣布。

此级别在有效负载中设置。以下示例发送 `passive` 通知：

```yaml
automation:
  - alias: "通知移动应用香蕉状态"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "香蕉状态更新"
          message: "香蕉已成熟。"
          data:
            push:
              interruption-level: passive
```

### 显示选项

默认情况下，如果应用在前台时到达通知，它将显示与应用后台时相同的内容，内容包括视觉警报、徽章更新（如果在通知中发送）和您选择的声音。您可以通过设置 `presentation_options` 字符串数组来控制通知在应用前台时的显示方式。允许的值有 `alert`、`badge` 和 `sound`。

```yaml
automation:
  - alias: "通知移动应用展示"
    trigger:
      ...
    action:
      - action: notify.ALL_DEVICES
        data:
          message: "家里发生了事情！"
          data:
            presentation_options:
              - alert
              - badge
```

### 执行快捷方式

当打开通知时，您可以执行一个快捷方式，并从结果触发事件。请参见 [Siri 快捷方式文档](/integrations/siri-shortcuts.md#executing-a-shortcut-via-home-assistant-notifications)。