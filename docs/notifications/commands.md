---
title: "通知命令"
id: "notification-commands"
---

伴侣应用程序提供了许多不同的通知选项。您可以发送命令作为`message`以触发手机上的某些操作，而不是在设备上发布实际通知。请阅读以下内容以了解每个平台支持哪些命令。

![iOS](/assets/iOS.svg)

| 命令 | 描述 |
| ------- | ----------- |
| `request_location_update` | 请求设备的位置信息更新，[见下文](#request-location-updates) 以获取有关此命令的含义。 |
| `clear_badge` | 默默地从应用图标中移除徽章，而不显示通知。 |
| `clear_notification` | 删除通知，[更多详情](basic.md#clearing)。 |
| `update_complications` | 更新配对的 Apple Watch 上的合并信息。[更多详情](/apple-watch/complications.md)。 |
| `update_widgets`* | 更新在应用 v2024.7 中引入的“表”与“详情”小部件（iOS 会决定是否允许更新，因此如果它并不总是有效，也不用担心）。 |

\* 在 iOS 上，手动小部件重载限制在每 24 小时约 40-70 次，这取决于您查看小部件的频率。此限制不会在午夜时分总是重置。

![Android](/assets/android.svg)

| 命令 | 描述 |
| ------- | ----------- |
| `clear_notification`* | 从状态栏删除通知，[更多详情](basic.md#clearing)。 |
| `command_activity` | 启动具有指定 URI 的活动以供任何应用使用，[更多详情](#activity) 和用例见下文。 |
| `command_app_lock` | 更改伴侣应用的锁定设置，[更多详情](#app-lock) 和用例见下文。 |
| `command_auto_screen_brightness` | 控制自动屏幕亮度是否启用。 |
| `command_bluetooth` | 打开或关闭蓝牙。 |
| `command_ble_transmitter` | 打开或关闭 BLE 信标发射器。 |
| `command_beacon_monitor` | 打开或关闭信标监测。 |
| `command_broadcast_intent` | 向另一个应用发送广播意图，[见下文](#broadcast-intent) 以了解其工作原理及所需内容。 |
| `command_dnd` | 控制设备上的请勿打扰模式，[见下文](#do-not-disturb) 以了解其工作原理及所需内容。 |
| `command_flashlight` | 开启或关闭手电筒 LED。 |
| `command_high_accuracy_mode` | 控制后台位置传感器的高精度模式，[见下文](#high-accuracy-mode) 以了解其工作原理及所需内容。 |
| `command_launch_app` | 启动应用程序，[见下文](#launch-app) 以了解其工作原理及所需内容。 |
| `command_media` | 控制设备上正在播放的媒体，[见下文](#media) 以了解其工作原理及所需内容。 |
| `command_ringer_mode` | 控制设备上的铃声模式，[见下文](#ringer-mode) 以了解其工作原理及所需内容。 |
| `command_screen_brightness_level` | 控制设备上的屏幕亮度级别。 |
| `command_screen_off_timeout` | 控制设备上屏幕关闭超时。 |
| `command_screen_on` | 打开设备屏幕。 |
| `command_stop_tts`* | 如果当前正在使用，则停止文本转语音。 |
| `command_persistent_connection` | 切换持久连接模式，[见下文](#persistent) 以了解可用的模式。 |
| `command_update_sensors` | 更新所有启用的传感器，如果自上次更新以来状态有所更改。 |
| `command_volume_level` | 控制所有可用音频流的音量，[见下文](#volume-level) 以了解其工作原理及所需内容。 |
| `command_webview` | 打开应用程序到主页或任何仪表板或视图，[见下文](#webview) 了解如何操作。 |
| `remove_channel`* | 从设备设置中移除通知通道，[更多详情](basic.md#removing-a-channel)。 |
| `request_location_update` | 请求设备的位置信息更新，[见下文](#request-location-updates) 以获取有关此命令的含义。 |

\* 这些命令将始终有效，即使其他命令被禁用。

## 活动

![Android](/assets/android.svg)

在 Android 上，您可以发送 `message: command_activity` 来启动任何活动。此命令需要应用无法提示或自动接受的特定权限。因此，通过第一次发送命令，应用程序将启动一个活动，允许用户启用 Home Assistant 对设备显示的访问权限，该权限覆盖其他应用的策略。为了使应用能够控制此设置，这是必需的。

`intent_action` 参数需要设置为 Intent Action 字符串，否则通知将按照常规方式发布。如果活动需要 URI，则需要将其设置为 `intent_uri`，否则通知将按照常规方式发布。`intent_package_name` 可以设置为要启动活动的包，否则 Android 将尽力选择一个默认值。如果找不到包，则通知将正常发布。您必须知道打算使用的 URI（如果需要）、操作和包以启动活动。通常，如果该应用程序支持，这将是一个已记录的功能。

[Extras](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String)) 也支持在 `intent_extras` 参数下。由于可以向意图添加任意数量的附加内容，需要以逗号 `,` 分隔每个附加内容。然后每个附加项名称和值需要用冒号 `:` 分隔。请参阅 [广播意图](#broadcast-intent) 中的示例以查看正确的格式。

`intent_type` 也可以设置为 MIME 类型，如果您需要设置它。您需要知道 MIME 类型字符串，如果活动需要它。

某些应用程序还需要提供类或组件。对于这些应用，需要在 `intent_package_name` 下提供包名，并在 `intent_class_name` 参数下提供完整的类名。您需要知道要提供哪个类名，因为每个应用程序的要求都不同。

下面的示例遵循 [Google 的文档](https://developers.google.com/maps/documentation/urls/android-intents#launch-turn-by-turn-navigation)，向您展示通过启动 Google Maps 导航来使用此功能的方法。

示例：

```yaml
automation:
  - alias: 导航
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_activity"
          data:
            intent_package_name: "com.google.android.apps.maps"
            intent_action: "android.intent.action.VIEW"
            intent_uri: "google.navigation:q=arbys"
```

继续上述示例，您还可以使用以下方式启动 [搜索结果](https://developer.android.com/guide/components/intents-common#Maps)：

```yaml
automation:
  - alias: 在谷歌地图中搜索
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_activity"
          data:
            intent_package_name: "com.google.android.apps.maps"
            intent_action: "android.intent.action.VIEW"
            intent_uri: "geo:0,0?q=1600+Amphitheatre+Parkway%2C+CA"
```

为了使用意图操作 `android.intent.action.CALL`，您还需要授予应用程序电话权限。如果未授予，应用程序将引导您进入应用信息屏幕以授予权限，并附带一个吐司信息告知您缺少的权限。

## 应用锁

![Android](/assets/android.svg) 

要控制 Android 伴侣应用的安全性，用户可以使用 `message: command_app_lock` 更改应用锁定设置。所有与应用锁相关的设置可以通过一个命令进行配置。通过通知命令可以访问以下设置：

| 参数 | 类型 | 描述 |
|---------|---------|--------|
| `app_lock_enabled` | boolean | 是否启用生物识别/屏幕锁 |
| `app_lock_timeout` | integer | 会话超时时间（以秒为单位） |
| `home_bypass_enabled` | boolean | 连接到家庭 WiFi 时是否绕过锁定 |

示例：

```yaml
automation:
  - alias: 重置应用锁为默认值
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_app_lock"
          data:
            app_lock_enabled: true
            app_lock_timeout: 60
            home_bypass_enabled: false
```

## 自动屏幕亮度

![Android](/assets/android.svg)

您可以通过使用 `message: command_auto_screen_brightness` 控制设备是否启用自动亮度，`command` 可以是 `turn_off` 或 `turn_on`。如果 `command` 为空、未设置或不是上述期望的值之一，则通知将照常发布。

示例：

```yaml
automation:
  - alias: 关闭自动屏幕亮度
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_auto_screen_brightness"
          data:
            command: "turn_off"
```

## BLE 信标发射器

![Android](/assets/android.svg)

用户可以使用 `message: command_ble_transmitter` 打开或关闭 iBeacon 发射器，`command` 可以是 `turn_off` 或 `turn_on`。如果 `command` 为空、未设置或不是上述期望的值之一，则通知将照常发布。

示例：

```yaml
automation:
  - alias: 关闭 BLE 发射器
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ble_transmitter"
          data:
            command: "turn_off"
```

您还可以调整 BLE 发射器的广告模式和发射功率。要调整广告模式，您需要将 `command` 设置为 `ble_set_advertise_mode`，然后将 `ble_advertise` 参数设置为 `ble_advertise_low_latency`、`ble_advertise_balanced` 或 `ble_advertise_low_power`。

```yaml
automation:
  - alias: 更改广告模式 BLE 发射器
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ble_transmitter"
          data:
            command: "ble_set_advertise_mode"
            ble_advertise: "ble_advertise_balanced"
```

要调整发射功率，您需要将 `command` 设置为 `ble_set_transmit_power`，然后将 `ble_transmit` 参数设置为 `ble_transmit_high`、`ble_transmit_medium`、`ble_transmit_low` 或 `ble_transmit_ultra_low`。

```yaml
automation:
  - alias: 更改发射功率 BLE 发射器
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ble_transmitter"
          data:
            command: "ble_set_transmit_power"
            ble_transmit: "ble_transmit_high"
```

用户还可以通过以下命令及其相应的参数更改报告的 UUID、主要和次要参数。您可以为 UUID、主要和次要属性发送任何类型的字符串值。如果缺少任何数据，通知将在设备上正常发布。

| 命令 | 参数 |
|---------|---------|
| `ble_set_uuid` | `ble_uuid` |
| `ble_set_major` | `ble_major` |
| `ble_set_minor` | `ble_minor` |

示例以更改发射器的 UUID：

```yaml
automation:
  - alias: 更改 BLE 发射器 UUID
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ble_transmitter"
          data:
            command: "ble_set_uuid"
            ble_uuid: "b4306bba-0e3a-44df-9518-dc74284e8214"
```

用户还可以将 1 米处的测量功率更改为帮助提高其设备的检测能力。此数字必须为负值。在某些情况下，默认值 `-59` 将在一些情况下设置，如垃圾字符、缺少数据或数字为正值，通知将正常发布在设备上。

```yaml
automation:
  - alias: 更改 BLE 发射器测量功率
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: command_ble_transmitter
          data:
            command: ble_set_measured_power
            ble_measured_power: "-75"
```

## 信标监测

![Android](/assets/android.svg) <br />

您可以使用 `message: command_beacon_monitor` 打开或关闭信标监测，`command` 可以是 `turn_off` 或 `turn_on`。如果 `command` 为空、未设置或不是上述期望的值之一，则通知将照常发布。

示例：

```yaml
automation:
  - alias: 关闭信标监测
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_beacon_monitor"
          data:
            command: "turn_off"
```

## 蓝牙

![Android](/assets/android.svg) &nbsp;Android 12 或更早版本

用户可以使用 `message: command_bluetooth` 打开或关闭蓝牙，`command` 可以是 `turn_off` 或 `turn_on`。如果 `command` 为空、未设置或不是上述期望的值之一，则通知将照常发布。

示例：

```yaml
automation:
  - alias: 命令蓝牙
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_bluetooth"
          data:
            command: "turn_off"
```

## 广播意图

![Android](/assets/android.svg)

使用通知命令，您现在可以向另一个应用发送广播意图，以便根据意图控制该应用。并非所有应用支持意图，如果支持，它们可能会为用户提供文档以进行控制。您必须设置 `message: command_broadcast_intent`，并且 `intent_action` 必须包含意图操作，而 `intent_package_name` 必须包含意图的包名。包名和操作由您希望发送意图的应用程序提供。

某些应用程序还需要提供类或组件。对于这些应用程序，您需要在 `intent_package_name` 下提供包名，并在 `intent_class_name` 参数下提供完整的类名。您需要知道提供哪个类名，因为每个应用程序的要求各不相同。

如果发送了无效格式，您可能会看到通知或吐司消息。

示例：

```yaml
automation:
  - alias: 发送广播意图
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          data:
            intent_package_name: "package-name"
            intent_action: "action"
```

接受广播意图的应用程序示例是 [Sleep as Android](https://docs.sleep.urbandroid.org/devs/intent_api.html#action-intents-to-control-sleep)。要开始一个睡眠追踪事件，格式如下所示：

```yaml
automation:
  - alias: 发送广播意图以开始睡眠追踪
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          data:
            intent_package_name: "com.urbandroid.sleep"
            intent_action: "com.urbandroid.sleep.alarmclock.START_SLEEP_TRACK"
```

[Extras](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String)) 也在 `intent_extras` 参数下得到支持。由于可以向意图添加任意数量的附加内容，我们需要通过逗号 `,` 分隔每个附加项。然后，每个附加名称和值需要用冒号 `:` 分隔。下面的示例向您展示如何在 Sleep as Android 应用程序中打开标记为“工作”的闹钟，在此示例中，有两个附加项被添加到意图中。

```yaml
automation:
  - alias: 发送带有附加项的广播意图
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          data:
            intent_package_name: "com.urbandroid.sleep"
            intent_extras: "alarm_label:work,alarm_enabled:false"
            intent_action: "com.urbandroid.sleep.alarmclock.ALARM_STATE_CHANGE"
```

如果您未指定特定类型，则类型将根据您的输入进行猜测。数字将被转换为整数，`true` 或 `false` 将转换为布尔值。否则，意图附加项将被设置为字符串。

您发送的数据可能包含特殊字符或在解析 `intent_extra` 参数时用作分隔符的字符（`,`、`:` 或 `;`）。在这种情况下，建议您将数据类型指定为 `String.urlencoded`，在后面另一个冒号 `:` 之后附加。例如，要向 Gadgetbridge 发送 JSON 格式的附加项，您可以使用以下内容：

```yaml
automation:
  - alias: 发送带有 JSON 格式附加项的广播意图
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          data:
            intent_package_name: "nodomain.freeyourgadget.gadgetbridge"
            intent_extras: "EXTRA_CONFIG_JSON:%7B%22push%22%3A%7B%22set%22%3A%7B%22widgetCustom0._.config.upper_text%22%3A%22Hi%22%7D%7D%7D:String.urlencoded"
            intent_action: "nodomain.freeyourgadget.gadgetbridge.Q_PUSH_CONFIG"
```

可以通过在模板中应用 [filter](https://www.home-assistant.io/docs/configuration/templating/#string-filters) `urlencode` 对字符串进行 URL 编码。例如模板 `{{ ",:;" | urlencode }}` 的结果是 `%2C%3A%3B`。

如果您试图将数据作为数组或 ArrayList 发送，单个值由分号 `;` 分隔。发送值时，数组的类型，例如 `float[]`，必须指定。例如，您可以使用 [可穿戴集成 API](https://docs.sleep.urbandroid.org/devs/wearable_api.html#send-movement-data) 将多个传感器值作为移动数据发送到 Sleep as Android：

```yaml
automation:
  - alias: 发送带有浮点数组的运动数据到 Sleep as Android
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          data:
            intent_package_name: "com.urbandroid.sleep"
            intent_extras: "MAX_RAW_DATA:0.2;0.2;0.4;0.3;5.4;6.8;1.2:float[]"
            intent_action: "com.urbandroid.sleep.watch.DATA_UPDATE"
```

除了上述类型之外，您还可以向意图附加其他特定类型。然后，根据您指定的类型转换值。确保类型转换是可能的/有意义的。

当前支持的类型如下：

| 类型 | 示例 |
|----|-------|
| [Integer](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20int)) | `EXTRA:101:int` |
| [Integer Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20int[])) | `EXTRA:101;102;103:int[]` |
| [ArrayList\<Integer\>](https://developer.android.com/reference/android/content/Intent#putIntegerArrayListExtra(java.lang.String,%20java.util.ArrayList%3Cjava.lang.Integer%3E)) | `EXTRA:1;2;3:ArrayList<Integer>` |
| [Double](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20double)) | `EXTRA:10.1:double` |
| [Double Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20double[])) | `EXTRA:10.1;10.2;10.3:double[]` |
| [Float](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20float)) | `EXTRA:10.1:float` |
| [Float Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20float[])) | `EXTRA:10.1;10.2;10.3:float[]` |
| [Long](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20long)) | `EXTRA:101:long` |
| [Long Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20long[])) | `EXTRA:101;102;103:long[]` |
| [Short](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20short)) | `EXTRA:1:short` |
| [Short Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20short[])) | `EXTRA:1;2;3:short[]` |
| [Byte](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20byte)) | `EXTRA:127:byte` |
| [Byte Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20byte[])) | `EXTRA:127;64:byte[]` |
| [Boolean](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20boolean)) | `EXTRA:true:boolean` |
| [Boolean Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20boolean[])) | `EXTRA:true;true;false:boolean[]` |
| [Char](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20char)) | `EXTRA:a:char` |
| [Char Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20char[])) | `EXTRA:a;b;c:char[]` |
| [String](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String)) | `EXTRA:abc:String` |
| [String (urlencoded)](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String)) | `EXTRA:%2C%3A%3B:String.urlencoded` 或 `EXTRA:%2C%3A%3B:urlencoded` |
| [String Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String[])) | `EXTRA:a;b;c:String[]` |
| [String Array (urlencoded)](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String[])) | `EXTRA:colon%3A;semicolon%3B;comma%2C:String[].urlencoded` |
| [ArrayList\<String\>](https://developer.android.com/reference/android/content/Intent#putStringArrayListExtra(java.lang.String,%20java.util.ArrayList%3Cjava.lang.String%3E)) | `EXTRA:a;b;c:ArrayList<String>` |
| [ArrayList\<String\> (urlencoded)](https://developer.android.com/reference/android/content/Intent#putStringArrayListExtra(java.lang.String,%20java.util.ArrayList%3Cjava.lang.String%3E)) | `EXTRA:colon%3A;semicolon%3B;comma%2C:ArrayList<String>.urlencoded` |

## 请勿打扰

![Android](/assets/android.svg) &nbsp;仅限 Android 6+

在 Android 上，您可以发送 `message: command_dnd`，您可以用来控制设备上请勿打扰的状态。此命令需要特定权限，应用程序无法提示或自动接受。相反，通过第一次发送命令，应用程序将启动一个活动，允许用户启用 Home Assistant 对设备通知策略的访问权限。这是应用程序获得控制此设置所必需的。

除了发送 `message` 之外，您还必须提供希望设置为的请勿打扰状态作为 `command`，请参阅下表以了解所接受的内容。如果 `command` 不匹配列出的任何命令，则通知将正常发布，命令将不处理。此命令仅适用于 Android 6+ 用户，低版本用户将看到通知就像其他任何通知一样。
<br />

| `command` | 描述 |
| ------- | ----------- |
| `alarms_only` | 仅闹钟干扰过滤器 - 所有通知被抑制，除了闹钟类别中的那些。一些音频流被静音。 |
| `off` | 正常干扰过滤器 - 不抑制任何通知。 |
| `priority_only` | 优先级干扰过滤器 - 除了符合优先级标准的通知外，所有通知均被抑制。一些音频流被静音。 |
| `total_silence` | 无干扰过滤器 - 所有通知均被抑制，所有音频流（除了用于电话呼叫的）和振动均被静音。 |
| 其他任何内容 | 通知将作为正常通知发布，命令将不处理。 |
<br />

```yaml
automation:
  - alias: 命令请勿打扰
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_dnd"
          data:
            command: "priority_only"
```

## 手电筒

![Android](/assets/android.svg) &nbsp;仅限 Android 6+

此命令允许您直接从通知中切换手电筒的开关，使您无需打开应用程序即可控制设备的手电筒。要使用它，请发送 `message: command_flashlight`，并将 `command` 参数设置为 `turn_on` 或 `turn_off`，以控制手电筒状态。

此命令仅适用于 Android 6+ 用户，低版本用户将看到通知就像其他任何通知一样。

示例：

```yaml
automation:
  - alias: 打开手电筒
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_flashlight"
          data:
            command: "turn_on"
```

## 高精度模式

![Android](/assets/android.svg)

用户可以使用 `message: command_high_accuracy_mode` 打开或关闭后台位置传感器的高精度模式，`command` 可以是 `turn_off`、`turn_on`、`force_off` 或 `force_on`。如果 `command` 为空、未设置或不是上述期望的值之一，则通知将正常发布。`turn` 和 `force` 之间的区别只有在高精度模式设置中设置了区域和/或蓝牙约束时才相关。在这种情况下，`force_on` 将使高精度模式处于活动状态，直到发送 `force_off`，或约束从活动变为非活动。同样，`force_off` 将关闭高精度模式，直到发送 `force_on`，或约束从非活动变为活动。

示例：

```yaml
automation:
  - alias: 关闭高精度模式
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_high_accuracy_mode"
          data:
            command: "turn_off"
```

您还可以通过以下示例调整高精度模式的更新间隔。您必须发送一个有效值，该值不能小于 `5`。任何其他值都将导致通知正常发布到设备。在执行此命令后，高精度模式将重新启动，这可能需要几秒钟的时间来完成。

```yaml
automation:
  - alias: 设置高精度更新间隔
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_high_accuracy_mode"
          data:
            high_accuracy_update_interval: 60
            command: "high_accuracy_set_update_interval"
```

## 启动应用

![Android](/assets/android.svg)

如果您只想启动一个应用程序，可以使用 `message: command_launch_app` 启动您设备上安装的任何应用程序。您必须使用 `package_name` 参数发送要打开的包名。如果未设置，您将看到通知正常发布。如果设备上未安装该应用程序，用户将被引导至 Google Play 商店以安装该应用程序。此命令需要“覆盖其他应用”权限，第一次发送此命令时，您将被引导到授予 Home Assistant 应用程序的此特殊权限。

```yaml
automation:
  - alias: 启动应用
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_launch_app"
          data:
            package_name: "com.twitter.android"
```

## 媒体

![Android](/assets/android.svg)

用户可以控制设备上的任何活动媒体会话。您必须设置 `message: command_media`，`media_command` 必须是以下列表中的一个。`media_package_name` 必须设置为您希望控制的包名。如果留空、数据不正确或没有活动媒体会话，则通知将正常发布。

接受的 `media_command` 媒体命令列表：
*  `fast_forward`
*  `next`
*  `pause`
*  `play`
*  `play_pause`
*  `previous`
*  `rewind`
*  `stop`

示例：

```yaml
automation:
  - alias: 暂停 Spotify
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_media"
          data:
            media_command: "pause"
            media_package_name: "com.spotify.music"
```

## 请求位置更新

![Android](/assets/android.svg) ![iOS](/assets/iOS.svg)
:::caution
由于下面提到的时间限制，请勿依赖此功能。
:::

您可以通过发送特殊通知强制设备尝试报告其位置信息。该通知对设备所有者不可见，仅在应用程序正在运行或在后台时有效。

![iOS](/assets/iOS.svg)
成功时，传感器的 last_update_trigger 将更改为 "推送通知"。

```yaml
automation:
  - alias: 请求位置更新
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "request_location_update"
```

假设设备收到通知，它将在 5 秒内尝试获取位置更新并报告给 Home Assistant。由于 Apple 强加了应用程序处理通知和位置更新的最大允许时间，因此这有点碰运气，有时位置更新可能会比平常所需的时间更长，例如需要等待 GPS 定位。

:::danger
虽然可以在 Home Assistant 中创建自动化以定期调用此操作以更新传感器，但不推荐这样做，因为过于频繁地执行可能会对设备的电池寿命和健康产生负面影响。
:::

## 铃声模式

![Android](/assets/android.svg)

在 Android 上，您可以通过发送 `message: command_ringer_mode` 控制设备的铃声模式，并使用适当的 `command`，如下表所述。某些设备需要授予特殊权限，如果未授予，则将在接收到第一次命令时出现此权限。如果设备开启了请勿打扰模式，则将其设置为 `normal` 或 `vibrate` 将关闭该模式。如果设备未启用请勿打扰，则 `silent` 将启用此模式。<br />

| `command` | 描述 |
| ------- | ----------- |
| `normal` | 将设备设置为正常铃声模式，若启用且支持，则关闭请勿打扰。 |
| `silent` | 将设备设置为静音铃声模式，若禁用且支持，则启用请勿打扰。 |
| `vibrate` | 将设备设置为震动铃声模式，若启用且支持，则关闭请勿打扰。 |
| 其他任何内容 | 通知将作为正常通知发布，命令将不处理。 |
<br />

```yaml
automation:
  - alias: 命令铃声模式
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ringer_mode"
          data:
            command: "vibrate"
```

## 屏幕亮度级别

![Android](/assets/android.svg)

您可以通过发送 `message: command_screen_brightness_level` 控制设备的屏幕亮度级别，`command` 是屏幕应达到的亮度级别。有效值在 `0` 到 `255` 之间。如果您不发送数字或发送空值，则通知将正常发布。如果您发送的值低于 `0` 或高于 `255`，则应用程序将默认为 `0` 或 `255`。

```yaml
automation:
  - alias: 设置屏幕亮度级别
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_screen_brightness_level"
          data:
            command: 50
```

## 屏幕关闭超时

![Android](/assets/android.svg) 

您可以通过发送 `message: command_screen_off_timeout` 控制设备的屏幕关闭超时，`command` 是超时值（以毫秒为单位）。如果您不发送数字或发送空值，则通知将正常发布。值将遵循 Android 系统定义的最小和最大值，例如在 Pixel 设备上，低于 `10000` 的任何值都将被视为 10 秒超时。

```yaml
automation:
  - alias: 设置屏幕关闭超时
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_screen_off_timeout"
          data:
            command: 10000
```

## 屏幕开启

![Android](/assets/android.svg)

在 Android 上，您可以通过发送 `message: command_screen_on` 来打开屏幕。此操作不会删除或禁用您在设备上设置的任何锁屏。这是因为如果应用程序无法重新设置设备政策（应用程序崩溃）或设备要求在移除后重新设置政策，那么会存在风险。所有这些都超出了应用程序的控制。您可能希望调整设备上的屏幕超时设置，以控制屏幕何时关闭。

您还可以选择性地添加 `command: keep_screen_on` 以在 [配置](https://my.home-assistant.io/redirect/config/) 中的伴侣应用部分启用 [保持屏幕开启](https://companion.home-assistant.io/docs/integrations/android-webview#keep-screen-on) 功能。只有在 webview 活动当前处于活动状态时，屏幕才会保持开启，否则将会关闭。具有其他值的通知会将该设置重置为默认的禁用状态。

```yaml
automation:
  - alias: 屏幕开启
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_screen_on"
          data:
            command: "keep_screen_on"
```

## 停止文本转语音

![Android](/assets/android.svg)

如果您希望设备停止其文本转语音通知，可以通过发送命令 `message: command_stop_tts` 来停止它。

```yaml
automation:
  - alias: 停止文本转语音
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_stop_tts"
```

## 持久连接

![Android](/assets/android.svg)

在 Android 上，您可以通过发送 `message: command_persistent_connection` 来切换持久连接模式，并传递 `data -> persistent: (always, home_wifi, screen_on, never)`。

```yaml
automation:
  - alias: 启用持久连接
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_persistent_connection"
          data:
            persistent: always
```

## 更新传感器
![Android](/assets/android.svg)<br />

该应用程序将检查所有启用的传感器是否有更新，如果状态自上次更新以来发生变化，则会发送更新。有关传感器的更多详细信息，请查看 [传感器](/docs/core/sensors) 文档。

```yaml
automation:
  - alias: 更新传感器
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_update_sensors"
```

## 音量级别

![Android](/assets/android.svg)

在 Android 上，您可以通过发送 `message: command_volume_level` 控制设备的音量级别，并使用适当的 `command`，该命令必须为一个数字。如果 `command` 大于最大级别，则将使用最大级别，或者如果 `command` 小于 `0`，则默认设置为 `0`，其他任何内容将导致通知在设备上发布。`media_stream` 也是必需的，如下表所示。某些设备需要授予特殊权限，如果未授予，则在接收到第一次命令时出现该权限。这与上文的 [请勿打扰](#do-not-disturb) 权限相同。更改音量级别会直接影响请勿打扰和铃声模式，不同设备的行为可能会有所不同。<br />

| `media_stream` | 描述 |
| ------- | ----------- |
| `alarm_stream` | 设置闹钟流的音量级别。 |
| `call_stream` | 设置语音通话流的音量级别。 |
| `dtmf_stream` | 设置 DTMF 音调的音量级别。 |
| `music_stream` | 设置音乐流的音量级别。 |
| `notification_stream` | 设置通知流的音量级别。 |
| `ring_stream` | 设置铃声流的音量级别。 |
| `system_stream` | 设置系统流的音量级别。 |
| 其他任何内容 | 通知将作为正常通知发布，命令将不处理。 |
<br />

```yaml
automation:
  - alias: 命令音量级别
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_volume_level"
          data:
            media_stream: "music_stream"
            command: 20
```

## 网页视图

![Android](/assets/android.svg)

如果您希望打开伴侣应用程序到任何页面或主页，您需要发送 `message: command_webview`。如果希望导航到特定 [视图](https://www.home-assistant.io/lovelace/views/) 或 [仪表板](https://www.home-assistant.io/lovelace/dashboards/)，您需要使用 `command` 来指定 [`path`](https://www.home-assistant.io/lovelace/views/#path) （示例：`/lovelace/settings`）。您还可以通过以下格式打开任何实体的更多信息面板： `entityId:sun.sun`，只需将 `sun.sun` 替换为您希望打开的实体。如果未提供 `command`，用户将被引导至主页。第一次发送此命令时，您将被带到权限屏幕以授予应用程序权限，以覆盖其他应用的策略。此权限对于该功能在后台正常工作是必需的，我们无法提示用户授予它。

示例：

```yaml
automation:
  - alias: 打开 Android 网页视图
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_webview"
          data:
            command: "/lovelace/settings"