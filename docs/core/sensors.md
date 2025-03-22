---
title: "传感器"
id: 'sensors'
---

除了提供[定位服务](location.md)之外，伴侣应用还向Home Assistant添加了几种额外的传感器。如果您不希望使用`device_tracker`实体，但仍希望传感器更新，只需在[实体注册表](https://www.home-assistant.io/integrations/config/#entity-registry)中禁用实体，以停止位置更新并保持传感器更新。

伴侣应用提供的传感器取决于您正在使用的应用，请参见下面的列表。

## 多服务器支持

如果多个服务器连接到伴侣应用，您可以配置是否按服务器发送传感器。目前，传感器设置对所有连接的服务器都是通用的。

![iOS](/assets/iOS.svg)在[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用中，打开服务器设置并在隐私下更改传感器发送设置。可用选项：

- **所有**发送所有启用的传感器。
- **无**不发送任何传感器。

![Android](/assets/android.svg)在[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用中，转到管理传感器并选择要管理的传感器。点击屏幕顶部的展开/折叠图标以更改特定服务器的设置。

## iOS & macOS 传感器

### 传感器更新时机

在iOS上，传感器在有限的情况下进行更新：当您的位置变化时，应用在前台运行时定期更新，当您下拉刷新网页视图时，在后台以iOS确定的速率更新，以及在执行“更新传感器”或通过“发送位置”快捷方式或推送通知时。当在![iOS](/assets/iOS.svg) 2022.6或更高版本中启用且可用的<a href="/docs/notifications/notification-local">本地推送</a>时，还会进行定期更新。

在macOS上，传感器更新的时机与上述相同，以及当某些传感器立即改变时。

### 传感器列表

| 传感器 | 属性 | 描述 |
| --------- | --------- | ----------- |
| `sensor.battery_level` | 无 | 设备当前的电池电量。 |
| `sensor.battery_state` | `省电模式` | 设备当前的充电状态（`充电中`、`未充电`或`已充满`）。 |
| `sensor.bssid` | 无 | 您的手机连接的无线接入点的MAC地址。当未连接Wi-Fi时，此传感器将报告`未连接`。 |
| `sensor.connection_type` | iOS: `蜂窝技术`<br />macOS: `名称`、`硬件地址` | 设备当前正在使用的数据连接。在macOS上，这需要应用版本2021.2或更高。 |
| `binary_sensor.focus` | 无 | 当前焦点是否启用。需要iOS-2021.10或更高版本，macOS 12更新将在今年晚些时候提供。如果Home Assistant在“允许通知”列表中，将无法工作，详细信息见[中断级别](../notifications/basic.md#interruption-level)。 |
| `sensor.geocoded_location` | [见下文](#geocoded-location-sensor) | 基于GPS数据计算的地址。 |
| `sensor.last_update_trigger` | 无 | 导致最后一次从设备到Home Assistant的位置信息和传感器数据更新的原因 |
| `sensor.ssid` | 无 | 设备当前连接的Wi-Fi网络的人类可读名称。当未连接Wi-Fi时，此传感器将报告`未连接`。 |
| `sensor.storage` | [见下文](#storage-sensor) | 设备的总存储和可用存储量。 |

![iOS](/assets/iOS.svg)特定传感器

| 传感器 | 属性 | 描述 |
| --------- | --------- | ----------- |
| `sensor.activity` | `confidence`、`types` | iOS计算的当前活动类型。需要启用运动权限。 |
| `sensor.app_version` | 无 | 当前**Home Assistant伴侣应用 for iOS**版本。 |
| `sensor.average_active_pace` | 无 | 根据计步器数据由iOS计算的平均步速。单位：米每秒，m/s |
| `sensor.distance` | 无 | 用户自午夜以来走的估计距离。单位：米，m |
| `sensor.floors_ascended` | 无 | 自午夜以来步行上升的楼层数量的估计值。 |
| `sensor.floors_descended` | 无 | 自午夜以来步行下降的楼层数量的估计值。 |
| `sensor.location_permission` | 无 | 用户选择的当前位置信息权限。权限可以通过位置权限弹出窗口设置或在iOS设置中修改。 |
| `sensor.sim_1` | [见下文](#cellular-provider-sensor) | 您的蜂窝服务提供商名称。 |
| `sensor.sim_2` | [见下文](#cellular-provider-sensor) | 您的蜂窝服务提供商名称。 |
| `sensor.steps` | 无 | 用户步行的步数。 |
| `sensor.watch_battery_level` | 无 | 1个配对的Apple Watch的电池电量。需要在手表表盘上安装任何Home Assistant模块。 |
| `sensor.watch_battery_state` | 无 | 1个配对的Apple Watch的当前充电状态（`充电中`、`未充电`或`已满`）。需要在手表表盘上安装任何Home Assistant模块。 |

![macOS](/assets/macOS.svg)特定传感器

| 传感器 | 属性 | 描述 |
| --------- | --------- | ----------- |
| `binary_sensor.active` | [见下文](#active-sensor) | 设备是否正在被使用。 |
| `sensor.active_camera` | `所有`、`活动` | 当前活动摄像头的名称，或 `未使用` 如果没有使用。 |
| `sensor.active_audio_input` | `所有`、`活动` | 当前活动音频输入（麦克风）的名称，或`未使用` 如果没有使用。 |
| `sensor.active_audio_output` | `所有`、`活动` | 需要应用版本2021.12或更高。当前活动音频输出（扬声器）的名称，或`未使用` 如果没有使用。 |
| `sensor.frontmost_app` | [见下文](#frontmost-app-sensor) | 需要应用版本2021.2或更高。当前最上层应用的名称。 |
| `binary_sensor.camera_in_use` | 无 | 系统中的相机是否当前正在使用。 |
| `binary_sensor.audio_input_in_use` | 无 | 系统中的音频输入（麦克风）是否当前正在使用。 |
| `binary_sensor.audio_output_in_use` | 无 | 需要应用版本2021.12或更高。系统中的音频输出（扬声器）是否当前正在使用。 |
| `sensor.displays` | `显示器ID`、`显示器名称` | 需要应用版本2021.2或更高。连接到设备的显示器数量。 |
| `sensor.primary_display_id` | 无 | 需要应用版本2021.2或更高。当前主显示器的ID，即带有菜单栏的显示器。格式为UUID，例如 `BE82E2E6-EA40-4963-93AD-A0BDC9D2F18F`。 |
| `sensor.primary_display_name` | 无 | 需要应用版本2021.2或更高。当前主显示器的名称，即带有菜单栏的显示器。 |

像`蜂窝技术`这样的属性可以通过模板访问，例如：

```
{{ states.sensor.connection_type.attributes['Cellular Technology'] }}
```

## 安卓传感器

下面每个![Android](/assets/android.svg)传感器都可以通过导航到[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用 > 管理传感器来启用。默认情况下，除`battery_level`、`battery_state`、`charger_type`和在入门期间获得许可的传感器外，大多数传感器都是禁用的。一旦启用，传感器将开始向您的Home Assistant服务器发送数据，如果您选择稍后禁用它，传感器将停止更新。如果启用传感器，应用程序将请求所需的权限。如果您没有看到下面列出的传感器，则表示您的设备不支持它。以下某些传感器为各自的需求提供了自定义设置，请阅读有关每个传感器的信息以查看其提供的内容。这些设置可以在启用传感器的同一位置找到。

### 传感器更新方式

所有传感器在每15分钟的时间间隔更新，并且如果其他某些条件满足时也会更新。请阅读下面每个传感器以了解预计的更新频率。在15分钟的更新间隔期间，临时创建一个低优先级的前台通知，以防止Android系统停止工作。除非用户安装了一个拦截通知的第三方应用并决定发出声音，否则此通知不会发出声音。如果您使用Android 8.0以上的设备，可以最小化和/或关闭`SensorWorker`的通知频道。

您可以通过导航到[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用 > 传感器更新频率来更改传感器更新的频率。您可以选择正常、充电时快速或始终快速之间的选项。正常是前面段落中提到的默认设置。设置为“始终快速”时，更新将以每分钟更新一次的频率进行。如果设置为“充电时快速”，则仅在设备充电时以每分钟更新一次的频率进行更新，否则将使用默认间隔。更改此选项后，您需要重新启动应用程序。

### 传感器列表

| 传感器 | 属性 | 描述 |
| --------- | --------- | ----------- |
| `binary_sensor.doze` | [见下文](#doze-sensor) | 设备是否处于待机模式。 |
| `binary_sensor.interactive` | 无 | 设备是否处于互动状态。 |
| `binary_sensor.nfc_state` | 无 | 设备的NFC传感器是否已启用。 |
| `binary_sensor.power_save` | 无 | 设备是否处于省电模式。 |
| [活动传感器](#activity-sensors) | 见下文 | 当前活动类型、睡眠信心和根据Google计算的睡眠段。需要在支持的设备上启用活动识别权限。 |
| `binary_sensor.android_auto` | [见下文](#android-auto) | 一个二进制传感器，用于指示设备是否已连接到Android Auto。 |
| [Android操作系统传感器](#android-os-sensors) | 无 | 关于Android操作系统的几种不同传感器。 |
| [应用数据传感器](#app-data-sensors) | 无 | 显示应用发送或接收了多少数据的传感器。 |
| [应用重要性传感器](#app-importance-sensor) | 无 | 代表应用状态的当前重要性，以确定其在前台或缓存中。 |
| `sensor.app_memory` | [见下文](#app-memory-sensor) | 有关可用于应用的内存的信息。 |
| [应用使用传感器](#app-usage-sensors) | 无 | 根据使用情况表现出应用如何被处理的传感器。 |
| [音频传感器](#audio-sensors) | 无 | 设备中不同类型音频检测的几种不同传感器。 |
| [电池传感器](#battery-sensors) | 无 | 关于设备电池状态的几种不同传感器。 |
| [蓝牙传感器](#bluetooth-sensors) | [见下文](#bluetooth-sensors) | 关于设备蓝牙状态的几种不同传感器。传感器还可用于信标发送和监控。 |
| [汽车传感器](#car-sensors) | [见下文](#car-sensors) | 关于汽车状态的几种不同传感器。 |
| `sensor.current_time_zone` | [见下文](#current-time-zone-sensor) | 设备当前所在的时区。 |
| `sensor.current_version` | 无 | 当前安装的应用程序版本。 |
| [显示器传感器](#display-sensors)| [见下文](#display-sensors) | 关于设备显示器状态的几种传感器。 |
| [动态颜色](#dynamic-color-sensor) | RGB 颜色 | 当前设备主题中使用的高亮颜色的十六进制颜色值。 |
| `sensor.do_not_disturb` | 无 | 设备上的勿扰模式状态。 |
| `sensor.geocoded_location` | [见下文](#geocoded-location-sensor) | 基于GPS数据计算的地址。 |
| [健康连接传感器](#health-connect-sensors) | 变化 | 存储在您设备中其他应用程序的健康与健身数据。 |
| `binary_sensor.high_accuracy_mode` | 无 | 设备的高精度模式状态。 |
| `sensor.high_accuracy_update_interval` | 无 | 设备在高精度模式下的更新间隔。 |
| [锁屏传感器](#keyguard-sensors) | 无 | 代表设备锁定或安全状态的传感器。 |
| `sensor.last_reboot` | [见下文](#last-reboot-sensor) | 设备上次重启的时间戳。 |
| `sensor.last_update` | 无 | 状态将反映导致最后一次更新发送的意图。 |
| `sensor.last_used_app` | 无 | 设备上最后使用的应用程序。 |
| `sensor.light` | 无 | 设备检测的当前光照水平。 |
| [移动数据传感器](#mobile-data-sensors) | 无 | 关于移动数据状态的几种传感器。 |
| `sensor.next_alarm` | [见下文](#next-alarm-sensor) | 下一个计划警报的日期。 |
| [通知传感器](#notification-sensors) | 见下文 | 设备上通知的详细信息。 |
| [电话传感器](#phone-sensors) | 无 | 代表电话调制解调器不同状态的传感器。 |
| `sensor.pressure` | 无 | 设备的压力读数。 |
| `sensor.proximity` | 无 | 设备当前的接近读数，某些设备将只显示`近`或`远`的布尔值。 |
| `sensor.public_ip` | 无 | 由ipify API生成的设备公共IP地址。 |
| `sensor.sim_1` | [见下文](#cellular-provider-sensor) | 您的蜂窝服务提供商名称。 |
| `sensor.sim_2` | [见下文](#cellular-provider-sensor) | 您的蜂窝服务提供商名称。 |
| `sensor.steps` | 无 | 自上次设备重启以来用户走的步数。需要在支持的设备上启用活动识别权限。 |
| [存储传感器](#storage-sensor) | [见下文](#storage-sensor) | 您的Android设备的总内存和可用内部与外部存储量。 |
| [流量统计传感器](#traffic-stats-sensor) | 无 | 自上次重启以来从移动数据和设备总使用情况中传输和接收的数据量。 |
| [WiFi 传感器](#connection-type-sensor) | 无 | 关于WiFi状态的几种传感器。 |
| [工作资料](#work-profile-sensor) | 无 | 工作资料是否当前在设备上启用。 |

## 活动传感器
![macOS](/assets/macOS.svg) `sensor.active` 提供设备当前是否正在使用的状态，基于提供的一些不同输入作为属性。

| 属性 | 描述 |
| --------- | --------- |
| `空闲` | 当机器不处于以下任何属性时为`true`，但输入设备在若干分钟内没有被使用。 |
| `屏幕保护程序` | 当屏幕保护程序开始播放以变为非活动时为`true` |
| `锁定` | 当设备显示登录屏幕时为`true` |
| `屏幕关闭` | 当屏幕已关闭时为`true` |
| `快速用户切换` | 当切换到其他用户时为`true` |
| `睡眠` | 当设备处于睡眠状态时为`true` |
| `终止` | 当应用程序被推出时为`true`。需要应用版本2021.2或更高。 |

此传感器具有设置来决定被视为“空闲”的持续时间。

## 活动传感器
![iOS](/assets/iOS.svg) `sensor.activity` 提供iOS计算的当前运动活动以及计算的信心。iOS已知的活动，以及由`sensor.activity`提供的活动包括：
* `静止`
* `步行`
* `奔跑`
* `汽车`
* `骑自行车`

如果iOS无法从运动数据计算活动，将返回`未知`。

多个活动可能被返回，例如`骑自行车`和`静止`（如果您正在骑自行车但在红绿灯前停下），传感器的状态就是iOS返回的第一个活动（不一定是最可能的）。计算活动的完整列表由`types`属性提供。请参见[这个帖子](https://nshipster.com/cmmotionactivity/#traveling-without-moving)由[@Mattt](https://twitter.com/mattt)在[nshipster](https://nshipster.com/)上介绍不同场景如何产生多种活动。

`confidence`属性对应于iOS认为当前活动报告的准确性。可能值为：
* `低`
* `中`
* `高`

![Android](/assets/android.svg) 此传感器仅在Google Play商店的完整版本Android应用中可用，不适用于简化版本。对于Android，用户将有一组不同的状态可供选择：
* `in_vehicle`（在车辆中）
* `on_bicycle`（在自行车上）
* `on_foot`（步行）
* `running`（跑步）
* `still`（静止）
* `tilting`（倾斜）
* `walking`（行走）
* `unknown`（未知）

状态的属性将反映来自[活动识别API](https://developers.google.com/location-context/activity-recognition)的`confidence`评级。此传感器要求[活动识别权限](https://developer.android.com/reference/android/Manifest.permission#ACTIVITY_RECOGNITION)。

![Android](/assets/android.svg)
睡眠信心和睡眠段传感器利用Google服务的新[睡眠API](https://developers.google.com/location-context/sleep)。睡眠段每天更新一次，睡眠信心每10分钟更新一次。所有数据均由Google提供。

## Android Auto
![Android](/assets/android.svg)
此传感器用于确定设备是否已连接到Android Auto。属性将返回特定的连接类型。

## Android操作系统传感器
![Android](/assets/android.svg)
关于Android操作系统构建的几种不同传感器。这些传感器利用[android.os.Build](https://developer.android.com/reference/android/os/Build)。

| 传感器                      | 描述                                                                                |
|-----------------------------|--------------------------------------------------------------------------------------------|
| `android_os_version`        | Android操作系统版本（例如，13）。                                                              |
| `android_os_security_patch` | Android操作系统安全补丁（例如，2023-03-05）。仅在Android 6（Marshmallow）及以上版本中可用。 |

## 应用数据传感器
![Android](/assets/android.svg)
这些传感器将反映Home Assistant Android应用自上次设备重启以来传输和接收的数据量。这些传感器利用[流量统计API](https://developer.android.com/reference/kotlin/android/net/TrafficStats)。

## 应用重要性传感器
![Android](/assets/android.svg)
此传感器将反映应用的状态，以表明它是否处于前台、服务或其他任何可以的状态。此传感器将在任何其他传感器更新时更新。请参阅[活动管理器](https://developer.android.com/reference/android/app/ActivityManager.RunningAppProcessInfo)中的所有重要性变量以了解它们的含义。

可能的状态包括：

* `cached`（缓存）
* `cant_save_state`（无法保存状态）
* `foreground`（前台）
* `foreground_service`（前台服务）
* `gone`（消失）
* `not_running`（未运行）
* `perceptible`（可感知）
* `service`（服务）
* `top_sleeping`（顶部休眠）
* `visible`（可见）

## 应用内存传感器
![Android](/assets/android.svg)
此传感器将反映应用正在使用的内存量。属性将包括应用可用的内存量。此传感器利用[运行时API](https://developer.android.com/reference/java/lang/Runtime)。

## 应用使用传感器
![Android](/assets/android.svg)
这些传感器将代表Android系统根据使用情况对应用的处理。存在一个二进制传感器`app_inactive`，用于报告系统当前是否将该应用视为非活动状态。另一个传感器`app_standby_bucket`将反映Android系统认为的该应用当前待机桶。待机桶决定应用在后台任务（例如作业和警报）中被限制的程度。这两个传感器都利用[UsageStatsManager API](https://developer.android.com/reference/android/app/usage/UsageStatsManager)。

`app_standby_bucket`传感器的可能状态（请参阅上面链接的API以获取其定义）：

* `active`（活动）
* `frequent`（频繁）
* `rare`（稀有）
* `restricted`（受限）
* `working_set`（工作集）
* `never`（从不）

## 音频传感器
![Android](/assets/android.svg) <br />
这些传感器使用[AudioManager API](https://developer.android.com/reference/kotlin/android/media/AudioManager?hl=en)检索其状态。查看下面的表以获取有关每个传感器的更多信息，包括它们更新的频率。

| 传感器 | 描述 |
| --------- | --------- |
| `audio_mode` | 设备当前的音频模式可以是：`normal`（正常）、`ringing`（响铃，类似于[电话传感器](#phone-state-sensor)）、`call_redirect`（呼叫重定向）、`communication_redirect`（通话重定向）、`in_call`（通话中）、`in_communication`（通信中）或`unknown`（未知）。此传感器将在正常间隔期间更新。 |
| `is_headphones` | 如果插入了耳机或耳机的布尔值，设备检测到变化时将立即更新。 |
| `is_mic_muted` | 如果麦克风当前静音的布尔值，Android 10+将在此值更改时更新。 |
| `is_music_active` | 如果设备当前正在播放音乐的布尔值，此传感器将在正常间隔期间更新。 |
| `is_speakerphone_on` | 如果设备扬声器电话已启用的布尔值，Android 10+将在此值更改时更新。 |
| `ringer_mode` | 设备的铃声模式，可能值为`normal`（正常）、`vibriate`（震动）或`silent`（静音）。此传感器将在铃声模式更改时立即更新。 |
| `volume_level_*` | 给定音量属性的设备当前音量级别：`accessibility`、`alarm`、`call`、`dtmf`、`music`、`notification`、`ring`、`system`。这些传感器将在正常间隔期间更新，或在检测到变化时立即更新。 |

## 电池传感器
![iOS](/assets/iOS.svg) <br />
电池状态传感器（`sensor.battery_state`）提供有关设备电池当前状态的信息。三个可能的值为`充电中`、`未充电`或`已满`，当设备充满电时为100%。电池电量传感器（`sensor.battery_level`）报告设备的当前电池电量，范围为0-100%。充电水平在传感器图标中反映。此外，还有一个“省电模式”属性，当您的iOS设备处于[省电模式](https://support.apple.com/en-us/HT205234)时，将报告为`true`或`false`。

![Android](/assets/android.svg)<br />
下面列出的电池传感器描述了几个不同数据点的电池状态。传感器图标反映充电状态和使用的充电类型。在设备连接或断开充电器时，将更新`battery_state`、`charger_type`和`is_charging`传感器。当设备报告电量不足或从低电量警报中恢复时，`battery_health`、`battery_level`、`battery_power`和`battery_temperature`传感器将在其他传感器更新时进行更新。所有这些传感器都利用[BatteryManager](https://developer.android.com/reference/android/os/BatteryManager)。

| 传感器 | 描述 |
| --------- | --------- |
| `battery_cycle_count` <span class='beta'>测试版</span> | 电池完成的充电周期数。需要Android 14或更新版本。注意：并非所有设备都会报告或更新周期计数。 |
| `battery_health` | 电池健康状况 |
| `battery_level` | 剩余电池百分比 |
| `battery_power` | 设备的当前瓦特数 |
| `battery_state` | 设备的充电状态 |
| `battery_temperature` | 当前电池温度 |
| `charger_type` | 当前正在使用的充电器类型 |
| `is_charging` | 设备是否正在充电 |
| `remaining_charge_time` | 计算的剩余充电时间（以分钟为单位）。如果无法计算时间，则返回`unavailable`：可能是没有足够的当前数据来做出决定，或者电池当前正在放电。如果计算未完成但设备当前正在充电，则返回`0`。需要Android 9或更高版本。 |

:::info
`battery_power`传感器将设备返回的值转换为安培和伏特。然而，某些设备不遵循Android文档，可能返回不同单位的值，从而导致传感器不正确。对于这些设备，您可能需要调整传感器设置中的“电池电流除数”，以正确转换`current`为安培或“电池电压除数”，以正确转换`voltage`为伏特。

电池电流除数的常见值：1000000（默认，微安）、1000（毫安）、1000000000（纳安）

电池电压除数的常见值：1000（默认，毫伏）、1（无需转换，伏特）
:::

## 蓝牙传感器
![Android](/assets/android.svg)<br />
蓝牙连接状态将是连接的蓝牙设备的总数。传感器将在设备的蓝牙状态更改时立即更新。此传感器利用Android的[Bluetooth](https://developer.android.com/reference/android/bluetooth/package-summary?hl=en)包。

| 属性 | 描述 |
| --------- | --------- |
| `连接的配对设备` | 当前连接的配对设备列表。 |
| `连接的未配对设备` | 当前连接但未配对的设备列表。 |
| `配对设备` | 已配对的设备列表。 |

此外，将有一个用于`bluetooth_state`的二进制传感器，表示设备的蓝牙是否已启用。此传感器将在蓝牙状态更改时更新。

![Android](/assets/android.svg)
BLE发射器传感器允许您的设备发射BLE iBeacon。如果您的设备发送设备名称，则可以通过[iBeacon集成](https://www.home-assistant.io/integrations/ibeacon)检测到iBeacon（[见理由](https://github.com/home-assistant/android/pull/2941#issuecomment-1272379540)）。如果您的设备不发送其设备名称，则如果您通过iBeacon集成选项明确允许UUID，仍可以检测到。此传感器还可与[roomassistant](https://www.room-assistant.io/)和[esp32-mqtt-room ](https://jptrsn.github.io/ESP32-mqtt-room/)等项目结合使用，以允许房间级别的跟踪。当前发射的ID（UUID-主要-次要）作为属性报告，可用于与这些系统配合使用。

:::caution
此传感器可能影响电池寿命，特别是在发射功率设置为高的情况下。iBeacon每秒发射一次（低延迟以节省电池，但对房间存在来说足够）。
:::

设置可用于更改UUID、主要和次要掩码。这些可以用于更改整体标识符，也可以允许分组，例如，家庭电话设备可以具有特定的主要值，可以在roomassistant等应用中列入白名单。这些设置经过验证：UUID应为[标准格式](https://en.wikipedia.org/wiki/Universally_unique_identifier)，主要和次要需要在0到65535之间。

还有一些设置可更改：
*   传输功率（在超低功率、低功率、中等功率和高功率之间）
*   广播模式（在低功率（1Hz）、平衡（3Hz）和低延迟（10Hz）之间）
*   1米处的测量功率（必须为负数）
*   是否仅在家庭Wi-Fi网络SSID上启用传输 

传输设置切换将启动或停止BLE传输。此设置以及上述大多数设置可以通过[通知命令](../notifications/commands.md#ble-beacon-transmitter)更改。

![Android](/assets/android.svg) <br />
信标监控显示对BLE iBeacon的扫描。传感器的状态显示应用是否正在监控。所有范围内的信标及其距离都在属性中列出。当有新的距离测量可用时，此传感器将更新。

可用设置可以更改扫描周期和间隔，这可能有助于节省电池寿命。设置过滤迭代和过滤RSSI乘数可以调整以获得更稳定的测量。这些设置都会影响传感器的响应能力。还提供UUID筛选，限制报告的信标为匹配（或不匹配）UUID列表。

监视设置切换将开始或停止扫描 - 此设置也可以通过[通知命令](../notifications/commands.md#beacon-monitor)进行调整。

当应用正在积极扫描信标时，将显示通知，以使后台扫描更可靠。如果您使用Android 8.0以上的设备，可以最小化和/或关闭`信标监控扫描`的通知频道。

## 汽车传感器
![Android](/assets/android.svg)

下面列出的传感器描述汽车的状态，适用于几个不同的数据点。目前，这仅适用于Android Auto。这些传感器可能不会根据您的手机和/或汽车软件提供数据。如果您看到状态为`unknown`，请检查`status`属性以查看没有数据的原因。

:::caution
请注意，您需要每次连接手机到汽车时，在Android Auto屏幕上启动Home Assistant应用，以使这些传感器工作（启动后，您可以关闭应用）。如果应用未启动，则状态将为`unavailable`。

为了简化操作，您可能希望使用[`car_ui`参数](../android-auto/android-auto.md#notifications)在连接手机时在汽车上显示通知。
:::

| 传感器 | 描述 |
| --------- | --------- |
| `car_battery` | 剩余电池的百分比 |
| `car_charging_status` | 汽车的充电状态（仅针对电动车）。充电端口的状态在属性中 |
| `car_ev_connector` | 汽车可用的EV连接器列表 |
| `car_fuel` | 剩余燃料的百分比 |
| `car_fuel_type` | 汽车可用的燃料类型列表。 |
| `car_name` | 汽车名称。制造商名称和生产年份在属性中 |
| `car_odometer` | 以米为单位的汽车里程表值 |
| `car_range_remaining` | 汽车剩余行驶范围（米） |
| `car_speed` | 汽车速度（米每秒） |

## 蜂窝提供商传感器
蜂窝提供商传感器显示有关用户蜂窝服务提供商的信息，例如其唯一标识符以及是否允许在其网络上进行VoIP通话。`sensor.sim_1`对应于已安装的实模拟卡，`sensor.sim_2`对应于eSIM（仅在启用eSIM时显示）。

![Android](/assets/android.svg) Android用户会在网络变化时看到这些传感器更新，利用[SubscriptionManager](https://developer.android.com/reference/android/telephony/SubscriptionManager?hl=en)。这些传感器需要[读取电话状态权限](https://developer.android.com/reference/android/Manifest.permission#READ_PHONE_STATE)。

| 属性 | 描述 |
| --------- | --------- |
| `运营商名称` | 用户家庭蜂窝服务提供商的名称。 |
| `当前无线电技术` | ![iOS](/assets/iOS.svg)仅适用。 |
| `ISO国家代码` | 用户蜂窝服务提供商的ISO国家代码。 |
| `移动国家代码` | 用户蜂窝服务提供商的移动国家代码（MCC）。 |
| `移动网络代码` | 用户蜂窝服务提供商的移动网络代码。 |
| `运营商ID` |  |
| `允许VoIP` | 指出运营商是否允许在其网络上拨打VoIP电话。 ![iOS](/assets/iOS.svg) |
| `机会主义` | 机会主义订阅连接到功能和/或覆盖范围有限的网络。 ![Android](/assets/android.svg) |
| `数据漫游` | 设备是否启用了数据漫游。 ![Android](/assets/android.svg) |

## 连接类型传感器
![iOS](/assets/iOS.svg)<br />
伴侣应用知道以下连接类型：
*   `Wi-Fi`
*   `蜂窝`
*   `无连接`

更具体的关于数据连接的描述可以在传感器的`Cellular Technology`属性中找到（仅在蜂窝网络中出现）。此属性的可能值为：

*   `4G`
*   `3G`
*   `2G`
*   `蜂窝`
*   `无连接`

如果连接类型无法识别，则将返回`Unknown`或`Unknown Technology`。

![Android](/assets/android.svg)<br />
对于Android，有几种不同类型的连接传感器可用，在检测到网络状态更改时将更新：

| 传感器 | 描述 |
| --------- | --------- |
| `wifi_connection` | 当前连接网络的名称 |
| `bssid` | 当前连接网络的mac地址 |
| `frequency` | 连接网络的频率带 |
| `wifi_ip_address` | 设备在网络上的当前IP地址 |
| `link_speed` | 设备与连接网络的当前链接速度 |
| `signal_strength` | 设备与WiFi网络的信号强度 |
| `wifi_state` | 设备的WiFi是否已开启 |
| `transport_type` | 当前网络连接的传输类型。一个属性将反映当前网络是否计量。 |
| `hotspot_state` | 设备当前是否正在广播WiFi热点。（在Wear OS上不可用） |
| `ip6_addresses` | 当前活动网络绑定的ip6_addresses |

![Android](/assets/android.svg) `bssid`传感器提供设置，允许您将当前mac地址重命名，以帮助避免在自动化和前端中需要使用模板和秘钥。尤其是在有多个接入点且想要轻松地区分它们的情况下，这个设置非常有用。这些设置默认关闭。这些传感器需要[后台位置](https://developer.android.com/reference/android/Manifest.permission#ACCESS_BACKGROUND_LOCATION)或[精确位置](https://developer.android.com/reference/android/Manifest.permission#ACCESS_FINE_LOCATION)权限，具体取决于您运行的Android版本。

## 当前时区传感器
![Android](/assets/android.svg)
此传感器将表示设备当前处于哪个时区。还有几个属性来帮助描述此时区。数据由[时区API](https://developer.android.com/reference/java/util/TimeZone.html)提供。

| 属性 | 描述 |
| --------- | ----------- |
| `in_daylight_time` | 此时区是否当前处于夏令时。 |
| `time_zone_id` | 此时区的显示名称。 |
| `time_zone_short` | 此时区的短名称。 |
| `uses_daylight_time` | 当前时区是否观察夏令时。 |

## 当前版本传感器
![Android](/assets/android.svg)
此传感器将表示当前安装的Android应用版本。

## 显示器传感器

### 屏幕亮度传感器
![Android](/assets/android.svg)<br />
此传感器将报告屏幕亮度值作为其状态。如果屏幕当前使用自动亮度模式，则还存在一个属性。此传感器利用[Settings.System API](https://developer.android.com/reference/android/provider/Settings.System)。

### 屏幕关闭超时传感器
![Android](/assets/android.svg) <br />
此传感器将报告屏幕关闭超时值作为其状态，以毫秒为单位。此传感器利用[Settings.System API](https://developer.android.com/reference/android/provider/Settings.System)。

### 屏幕方向传感器
![Android](/assets/android.svg) <br />
此传感器报告屏幕的方向，当屏幕开启且方向改变时，此传感器会立即更新。此传感器使用[Orientation API](https://developer.android.com/reference/android/content/res/Configuration.html#orientation)。

### 屏幕旋转传感器
![Android](/assets/android.svg) <br />
此传感器报告相对于设备“自然”方向的旋转角度。此传感器仅在以下旋转角度更新：`0`、`90`、`180`和`270`。此传感器使用[Rotation API](https://developer.android.com/reference/android/view/Display.html#getRotation())。

## 动态颜色传感器
![Android](/assets/android.svg) 仅在支持Material 3动态颜色的设备上可用。

此传感器的状态将是当前设备主题中使用的高亮颜色的十六进制颜色值。[动态颜色](https://m3.material.io/styles/color/dynamic-color/overview)可以从壁纸中派生或由用户选择。如果您希望在自动化中使用此颜色，可以使用属性`rgb_color`。此传感器利用[动态颜色API](https://developer.android.com/reference/com/google/android/material/color/DynamicColors)。

## 请勿打扰传感器
![Android](/assets/android.svg) 仅适用于6及以上版本<br />
此传感器将反映设备上勿扰模式（DND）的状态。DND功能取决于Android的版本。可能的状态值包括`关`、`优先级仅`、`完全静音`、`仅闹钟`、`不可用`或`未知`。并非所有状态在所有Android版本中均会显示，比如Pixel 4 XL仅会显示`关`或`优先级仅`。如果您从未使用DND，您可能会看到`不可用`，直到您更改设备上的设置。此传感器将在DND状态更改时立即更新。此传感器利用[NotificationManager API](https://developer.android.com/reference/android/app/NotificationManager#getCurrentInterruptionFilter())，仅在Android 6及以上设备中可用。

## 待机传感器
![Android](/assets/android.svg)<br />
此传感器仅在运行Android 6.0以上的设备上可用。其状态反映设备是否处于待机模式。状态在状态更改时立即更新，数据由[PowerManager](https://developer.android.com/reference/android/os/PowerManager.html)提供。存在一个属性`ignoring_battery_optimizations`，如果伴侣应用忽略电池优化，则会显示为`true`或`false`。如果您想了解状态是如何实际变化的，您可以通过执行[列出的步骤](https://developer.android.com/training/monitoring-device-state/doze-standby#testing_doze)来测试。

## 前台应用传感器
![macOS](/assets/macOS.svg)<br />
当前台应用更改时，此传感器会立即更新。

| 属性 | 描述 |
| --------- | --------- |
| `Bundle Identifier` | 应用的包标识符。例如，`io.home-assistant.example`。 |
| `Is Hidden` | 应用程序是否隐藏。 |
| `Launch Date` | 应用启动的日期（ISO 8601、RFC 3339格式）。例如，`2021-01-06T22:17:30-08:00`。 |
| `Owns Menu Bar` | 应用程序是否“拥有”菜单栏。例如，仅菜单栏应用在最前面时不会更改菜单栏的内容。 |

## 地理编码位置传感器
[地理编码](https://en.wikipedia.org/wiki/Geocoding)位置传感器提供用户当前位置坐标的用户友好描述，通常包含地点名称、地址和其他相关信息。此传感器报告许多详细属性，允许您创建有用的[模板传感器](https://www.home-assistant.io/components/template/)。

地理编码由iOS的[MapKit](https://developer.apple.com/documentation/mapkit)和[Core Location](https://developer.apple.com/documentation/corelocation/converting_between_coordinates_and_user-friendly_place_names)服务直接处理。在Android上，地理编码由内部[Geocoder](https://developer.android.com/reference/android/location/Geocoder)处理。

| 属性 | 描述 |
| --------- | --------- |
| `Location` | 地点的纬度和经度坐标。 |
| `Name` | 地点的名称。 ![iOS](/assets/iOS.svg) 仅适用和![Android](/assets/android.svg) |
| `Country` | 与地点相关的国家名称。 |
| `ISOCountryCode` | 缩写的国家名称。 |
| `TimeZone` | 与地点相关的时区。 ![iOS](/assets/iOS.svg) 仅适用 |
| `AdministrativeArea` | 与地点相关的州或省。 |
| `SubAdministrativeArea` | 该地点的附加行政区域信息。 |
| `PostalCode` | 与地点相关的邮政编码。 |
| `Locality` | 与地点相关的城市。 |
| `SubLocality` | 该地点的附加城市级别信息。 |
| `Thoroughfare` | 与地点相关的街道地址。 |
| `SubThoroughfare` | 该地点的附加街道级别信息。 |
| `AreasOfInterest` | 与地点相关的相关兴趣区域。 ![iOS](/assets/iOS.svg) 仅适用 |
| `Ocean` | 与地点相关的海洋名称。 ![iOS](/assets/iOS.svg) 仅适用 |
| `InlandWater` | 与地点相关的内陆水体的名称。 ![iOS](/assets/iOS.svg) 仅适用 |
| `phone` | 如果可用，该地点的电话号码。 ![Android](/assets/android.svg) |
| `premises` | 如果可用，该地点的房产信息。 ![Android](/assets/android.svg) |
| `url` | 如果可用，该地点的网址。 ![Android](/assets/android.svg) |

![Android](/assets/android.svg) Android用户将有一个传感器设置，用于最小所需准确度，默认值为200m。如果用户发现报告不准确或报告不足，可以根据自己的需要进行调整。此传感器需要[后台位置](https://developer.android.com/reference/android/Manifest.permission#ACCESS_BACKGROUND_LOCATION)或[精确位置](https://developer.android.com/reference/android/Manifest.permission#ACCESS_FINE_LOCATION)权限，具体取决于您运行的Android版本。所有属性将为小写并用下划线替换所有空格。仅在准确且最新时，传感器才会发送更新。如果启用位置跟踪，传感器还将在位置更新时更新。还存在一个设置，通过默认关闭方式使传感器随位置更新保持最新。

![iOS](/assets/iOS.svg)和![macOS](/assets/macOS.svg)的用户将会有一个传感器设置，用于在存在活动区域名称时是否使用它而不是地理编码状态，默认设置为不使用。

## 健康连接传感器

![Android](/assets/android.svg) 9+ 仅当从Play商店安装

:::note
在Android 13或更早版本中，您需要安装和设置[健康连接应用](https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata)才能使用这些传感器。
:::

这些传感器将反映在您的设备中由其他应用存储的健康和健身数据, 在[健康连接](https://health.google/health-connect-android/)中。除非另有说明，否则仅使用过去30天的数据。

| 传感器 | 单位 | 描述 |
| --------- | ---- | --------- |
| `health_connect_active_calories_burned` | 千卡 | 最新估算的活动消耗卡路里数，不包括基础代谢率（BMR）。 |
| `health_connect_blood_glucose` | 毫克/分升 | 最后记录的血糖读数。 <span class='beta'>测试版</span> |
| `health_connect_diastolic_blood_pressure` | 毫米汞柱 | 最后记录的舒张压。 <span class='beta'>测试版</span> |
| `health_connect_distance` | 米 | 自午夜以来的总行驶距离。 |
| `health_connect_elevation_gained` | 米 | 自午夜以来的总升高。 |
| `health_connect_floors_climbed` | 楼层 | 自午夜以来的总楼层数。 |
| `health_connect_heart_rate` | 每分钟心跳次数 | 最后记录的心率。 <span class='beta'>测试版</span> |
| `health_connect_steps` | 步数 | 自午夜以来的总步数。 |
| `health_connect_systolic_blood_pressure` | 毫米汞柱 | 最后记录的收缩压。 <span class='beta'>测试版</span> |
| `health_connect_total_calories_burned` | 千卡 | 自午夜以来的总消耗卡路里，包括活动和基础能量开支（BMR）。 |
| `health_connect_vo2_max` | 每分钟每千克毫升 | 最后记录的VO2最大值。 |
| `health_connect_weight` | 克 | 最后记录的体重。 <span class='beta'>测试版</span> |

## 高精度模式
![Android](/assets/android.svg) 此传感器的状态将反映设备当前是否启用[高精度模式](location.md#high-accuracy-mode)。此传感器将在高精度模式状态变化时立即更新，第一次启用高精度模式时才会出现。

## 高精度更新间隔
![Android](/assets/android.svg) 此传感器的状态将反映设备在[高精度模式](location.md#high-accuracy-mode)下的更新间隔（以秒为单位）。此传感器将在值手动更改或通过[通知命令](../notifications/commands.md#high-accuracy-mode)更改时更新。

## 互动传感器
![Android](/assets/android.svg) 此传感器的状态将反映设备是否处于互动状态。这通常是在屏幕开启和关闭时，但可能因设备而异。此传感器将在检测到状态变化时更新，数据由[PowerManager](https://developer.android.com/reference/android/os/PowerManager.html)提供。

使用[历史统计集成](https://www.home-assistant.io/integrations/history_stats/)，可以监控每日屏幕时间`type: time`以及当天屏幕开启的次数`type: count`。

## 锁屏传感器
![Android](/assets/android.svg)

这些传感器将反映来自[锁屏管理器](https://developer.android.com/reference/android/app/KeyguardManager)的各种状态。您将能够确定设备是否正在被锁定，是否设置了密码，甚至如果设备在解锁时需要密码。这些传感器将在定期传感器间隔内更新。

## 上次重启传感器
![Android](/assets/android.svg)<br />
此传感器的状态将是设备上次重启的日期和时间（UTC格式）。传感器将在正常传感器更新间隔内更新。如果无法确定时间戳，状态将为`unavailable`。此传感器利用[SystemClock](https://developer.android.com/reference/android/os/SystemClock?hl=en)和当前[系统](https://developer.android.com/reference/java/lang/System?hl=en)时间来计算时间戳。此传感器提供一个死区设置，默认值为1分钟，以处理在某些运营商上观察到的时间计算问题。

| 属性 | 描述 |
| --------- | --------- |
| `本地时间` | 上次重启的日期和时间（本地时间）。 |
| `时间（毫秒）` | 上次重启的日期和时间（毫秒）。 |

## 上次更新触发器传感器
![Android](/assets/android.svg)

对于Android，此传感器的状态将反映最近发送的[意图](https://developer.android.com/reference/android/content/Intent)。此外，传感器提供设置，允许用户接收从其他广播意图的Android应用[应用事件](../integrations/app-events.md)。用户可以注册任意多个意图，一旦收到意图，将发送事件到Home Assistant。保存意图后，确保重新启动应用程序以注册意图。

如果您注意到您在设置中注册的意图不再由应用触发，则需要添加意图预期的类别。您可以在意图后添加类别，通过编辑设置意图，添加`,`后跟类别。如果需要超过1个类别，则需要添加每个类别，后跟`,`，直到没有更多类别可添加。例如，如果您的意图需要2个类别，格式将是：`intent,category1,category2`。保存意图和类别后，请确保重新启动应用程序。

![iOS](/assets/iOS.svg)<br />
此传感器准确显示了导致最后一次位置和传感器数据更新的原因。

| 状态 | 描述 |
| --------- | --------- |
| 手动 | 手动更新是在用户下拉以刷新时触发的。 |
| 启动 | 应用初始化时更新传感器。 |
| 定期 | 根据在[配置](https://my.home-assistant.io/redirect/config/) -> 伴侣应用 -> 传感器中设置的设置定期更新。 |
| 重要位置变化 | 当设备位置发生重大变化时触发，例如500米或更多。请参阅[位置](location.md)以获取更多详细信息。 |
| 进入地理区域 | 当进入任何用户指定的Home Assistant[区域](https://www.home-assistant.io/components/zone/)（也称为地理围栏）时触发。 |
| 离开地理区域 | 当离开任何用户指定的Home Assistant[区域](https://www.home-assistant.io/components/zone/)（也称为地理围栏）时触发。 |
| 推送通知 | 通过推送通知[请求位置更新](../notifications/notification-commands#request-location-updates)。  |
| 背景提取 | 当应用在后台刷新传感器信息时。 |
| Siri | 通过[Siri快捷方式](../integrations/siri-shortcuts.md)“发送位置”快捷方式触发的位置更新。 |
| iBeacon区域进入 | 当检测到与已知区域对应的iBeacon时触发。 |
| 注册 | 当应用首次连接到您的Home Assistant实例时触发。 |
| 有信号 | 当应用在运行时检测到变化，例如电池状态变化时触发。 |

## 上次使用的应用传感器
![Android](/assets/android.svg) 6+<br />

传感器的状态将始终是最后使用的应用程序的包名称，以确保它始终是唯一的值。应用程序的标签将是传感器的一个属性（如果已知）。此传感器在正常的传感器更新间隔内更新，并利用[UsageStatsManager API](https://developer.android.com/reference/android/app/usage/UsageStatsManager)。

## 光线传感器
![Android](/assets/android.svg)<br />
此传感器将反映设备检测到的当前光照水平。传感器在正常传感器更新间隔内更新，或与其他传感器更新一起更新，并利用[环境传感器](https://developer.android.com/guide/topics/sensors/sensors_environment)。

## 移动数据传感器
![Android](/assets/android.svg)<br />
关于移动数据状态的几种不同传感器。这些传感器利用[Settings.Global](https://developer.android.com/reference/kotlin/android/provider/Settings.Global?hl=en)和[TelephonyManager](https://developer.android.com/reference/android/telephony/TelephonyManager?hl=en)以获取移动数据状态。

| 传感器 | 描述 |
| ------ | ----------- |
| `mobile_data` | 设备的移动数据是否开启。 |
| `mobile_data_roaming` | 设备的移动数据漫游是否开启。 |

## 下一个警报传感器
![Android](/assets/android.svg)<br />
此传感器的状态将是下一个警报的日期和时间（UTC格式）。传感器将在下一个警报安排时立即更新。当没有下一个警报时，状态将为`unavailable`。此传感器利用[AlarmManager](https://developer.android.com/reference/android/app/AlarmManager?hl=en)获取下一个计划警报，该警报可以随时由任何应用设置。此传感器具有允许您创建白名单的设置，选择您希望从中获取警报事件的软件包，请记住，API仅能获取下一个计划警报。此设置默认关闭。

| 属性 | 描述 |
| --------- | --------- |
| `本地时间` | 下一个警报的日期和时间（本地时间）。 |
| `包` | 安排下一个警报的软件包。 |
| `时间（毫秒）` | 下一个警报的日期和时间（毫秒）。 |

## NFC状态传感器
![Android](/assets/android.svg)

此传感器的状态将反映设备的NFC传感器当前是否已启用。此传感器将在状态变化时立即更新。数据由[NfcAdapter](https://developer.android.com/reference/android/nfc/NfcAdapter)提供。

## 通知传感器
![Android](/assets/android.svg)<br />

注意：带有允许列表的传感器在所有已允许的应用接收到新的通知之前不会作为新实体出现在Home Assistant中。

### 上次通知

此传感器将反映设备上发布的最后一条通知。此传感器需要特殊权限，应用将引导用户授予对通知的访问权限。此传感器的状态将默认为通知的文本，如果没有则为发布包名称。此传感器提供了一个允许列表设置，允许用户选择希望从中获取通知数据的软件包，Home Assistant发送的通知始终会被忽略。您需要创建允许列表或启用“禁用允许列表要求”设置。请注意，未创建允许列表的情况下，此传感器有潜在耗电的风险。我们强烈建议创建允许列表，而不是禁用此要求。这对于集成任何发送通知但不提供直接集成的应用非常有用（例如：食品配送应用或二维验证码短信）。用户可以期待看到几个属性，尽管并非所有属性都将包含数据。此传感器利用[NotificationListenerService API](https://developer.android.com/reference/android/service/notification/NotificationListenerService#onNotificationRemoved(android.service.notification.StatusBarNotification))。有关每个属性的更多详细信息，请参阅[通知附加信息](https://developer.android.com/reference/android/app/Notification)。

### 上次移除的通知

此传感器类似于上次通知，但当设备上的通知被用户或应用移除时将更新。您可以期待看到此传感器的类似属性，其中一些如下。此传感器需要与上面提到的相同权限。此传感器也具有允许列表，功能与上次通知类似。

### 活动通知计数

此传感器将反映设备上总的活动通知数量。此计数将包括持久的和/或静音的通知。有时甚至可能包含Sensor Worker通知。当其他传感器更新时，此传感器将更新。此传感器需要与上次通知提到的相同权限。此传感器没有允许列表。<br /><br />

下面您可以找到一些与某些通知相关的详细信息。这些将作为属性提供，除非您禁用相应的传感器设置。

| 属性 | 描述 |
| --------- | --------- |
| `android.appInfo` | 包含包名称的应用信息。 |
| `android.infoText` | 与通知相关的信息文本。 |
| `android.largeIcon` | 通知的大图标。 |
| `android.progress` | 通知的进度，如果它有进度条。 |
| `android.progressIndeterminate` | 进度是否可以确定。 |
| `android.progressMax` | 进度的最大位置（例如：100表示100%）。 |
| `android.reduced.images` | 如果通知中的图像被缩小。 |
| `android.remoteInputHistory` | 通知的最新输入。 |
| `android.showChronometer` | 如果显示了计时器。 |
| `android.showWhen` | 通知是否应在特定时间显示。 |
| `android.subText` | 通知的副标题。 |
| `android.text` | 通知的文本。 |
| `android.title` | 通知的标题。 |
| `is_clearable` | 如果可以清除通知。 |
| `is_ongoing` | 如果通知在设备上是持久的。 |
| `package` | 发布通知的包。 |
| `post_time` | 通知发布到设备的时间。 |
| `channel_id` | 发布通知的频道ID。此属性仅在Android 8及以上版本中可用。 |
| `group_id` | 发布通知的组ID。 |
| `category` | 定义的通知类别。 |

### 媒体会话传感器
![Android](/assets/android.svg)<br />
此传感器需要通知权限以启用并发送数据。状态将是主要媒体会话的播放状态。如果没有活动的媒体会话，则状态为`unavailable`。属性将包括活动会话的总计数以及各个活动会话的媒体数据，按包名称分隔。此传感器将在正常传感器更新间隔内更新。为了充分利用该传感器，建议使用[上次通知](#last-notification)钩入媒体应用以发送更快的更新。此传感器利用[MediaController](https://developer.android.com/reference/android/media/session/MediaController)和[MediaSessionManager](https://developer.android.com/reference/android/media/session/MediaSessionManager) API获取数据。

## 计步器传感器
![iOS](/assets/iOS.svg)<br />
计步器传感器从设备的内置运动处理器提供步数数据。它们记录您每天步行活动，并在午夜重置。这些传感器需要启用运动权限。

| 传感器 | 描述 |
| --------- | --------- |
| `sensor.steps` | 用户步行的步数。 |
| `sensor.distance` | 用户行进的估计距离（以米为单位）。 |
| `sensor.average_active_pace` | 用户的平均步速，以每米秒为单位测量。 |
| `sensor.floors_ascended` | 步行上升的楼层的近似数量。 |
| `sensor.floors_descended` | 步行下降的楼层的近似数量。 |

![Android](/assets/android.svg) Android用户将只有一个`sensor.steps`实体，这将代表自上次设备重启以来的总步数。获取每日步数的推荐方法是使用[实用程序计量器集成](https://www.home-assistant.io/integrations/utility_meter)与`cycle: daily`配合。这些传感器将在正常传感器更新间隔内更新，利用[运动传感器](https://developer.android.com/guide/topics/sensors/sensors_motion?hl=en)。此传感器需要[活动识别权限](https://developer.android.com/reference/android/Manifest.permission#ACTIVITY_RECOGNITION)。

## 电话传感器

### 数据网络类型传感器
![Android](/assets/android.svg)<br />

SIM卡为数据传输提供的无线电技术（网络类型）。数据由[TelephonyManager](https://developer.android.com/reference/android/telephony/TelephonyManager?hl=en)提供。

:::info
并非所有的5G网络都是平等的，因此某些网络可能会识别为LTE。
:::

### 电话状态传感器
![Android](/assets/android.svg)<br />
仅当用户明确为应用授予`电话`权限时，此传感器才会出现。此传感器跟踪的唯一数据是以下状态：`空闲`、`响铃`、`通话中`。此传感器将在检测到电话状态变化时更新，并利用[TelephonyManager](https://developer.android.com/reference/android/telephony/TelephonyManager?hl=en)。此传感器需要[读取电话状态权限](https://developer.android.com/reference/android/Manifest.permission#READ_PHONE_STATE)。

### 信号强度传感器
![Android](/assets/android.svg)<br />
表示SIM卡提供的无线信号强度（以dBm为单位）的传感器。对于信号质量和任意强度单位将存在属性。由于省电原因，此数据可能不会始终是最新的。数据由[TelephonyManager](https://developer.android.com/reference/android/telephony/TelephonyManager?hl=en)提供。

## 节能模式传感器
![Android](/assets/android.svg)<br />
此传感器将显示设备上的节能模式状态。根据设备，这通常是用户可配置的选项，用来指示设备何时应进入特殊的省电模式。状态将在检测到状态变化时立即更新，传感器利用[PowerManager](https://developer.android.com/reference/android/os/PowerManager.html)。

## 压力传感器
![Android](/assets/android.svg)<br />
此传感器将显示设备的当前压力读数。此传感器将在正常传感器更新间隔内更新，并利用[环境传感器](https://developer.android.com/guide/topics/sensors/sensors_environment)。

## 接近传感器
![Android](/assets/android.svg)<br />
此传感器将显示设备的当前接近读数。此传感器将在正常传感器更新间隔内更新。并非所有设备都报告实际读数，因此这些设备将显示`近`或`远`，具体取决于传感器的最大范围是否为`5`。此传感器利用[位置传感器](https://developer.android.com/guide/topics/sensors/sensors_position?hl=en)。

## 公共IP传感器
![Android](/assets/android.svg)<br />
此传感器使用[ipify API](https://www.ipify.org/)以确定设备的公共IP地址。此传感器将在正常传感器更新间隔内更新。

## 存储传感器
![iOS](/assets/iOS.svg)<br />
此传感器显示设备存储的信息。报告的文件大小为十进制。

| 属性 | 描述 |
| --------- | --------- |
| `可用` | 您设备上剩余的可用存储量。 |
| `可用（重要）` | 存储重要资源的可用容量（以字节为单位）。 |
| `可用（机会主义）` | 存储非必需资源的可用容量（以字节为单位）。 |
| `总计` | 您设备的总存储容量。 |

![Android](/assets/android.svg)<br />
对Android来说，由于两个操作系统之间的差异，行为略有不同。状态将与iOS相同，显示可用空间的百分比，属性将不完全相同。这些传感器将在正常传感器更新间隔内更新，计算是通过[StatFs](https://developer.android.com/reference/android/os/StatFs?hl=en)进行的。

`sensor.internal_storage`

| 属性 | 描述 |
| --------- | --------- |
| `可用内部存储` | 您设备上剩余的可用内部存储空间。 |
| `总内部存储` | 您设备的总内部存储容量。 |

`sensor.external_storage`

| 属性 | 描述 |
| --------- | --------- |
| `可用外部存储` | 您的SD卡上剩余的可用外部存储空间，对于没有SD卡的设备，将显示`无SD卡`。 |
| `总外部存储` | 您的SD卡的总外部存储，对于没有SD卡的设备，将显示`无SD卡`。 |

## 流量统计传感器
![Android](/assets/android.svg)<br />
这些传感器将显示设备传输和接收的总数据量。既有总传感器也有移动传感器，统计数据在设备重启时重置。这些传感器使用[Traffic Stats API](https://developer.android.com/reference/android/net/TrafficStats)。

## 工作资料传感器
![Android](/assets/android.svg)<br />
如果设备的工作资料已启用，则此传感器将为`on`，否则为`off`。此传感器利用[Device Policy Manager API](https://developer.android.com/reference/android/app/admin/DevicePolicyManager)。