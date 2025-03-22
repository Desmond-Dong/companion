---
title: "传感器"
id: 'sensors'
---

Wear OS 应用还提供了 [传感器](../core/sensors.md#android-sensors)，以便在 Home Assistant 中使用您的可穿戴数据，请参考链接了解有关传感器在 Android 上如何更新的更多信息。手机应用提供的并非所有传感器都会在 Wear OS 应用中提供。请查看下面的列表，了解 Wear OS 应用当前支持哪些传感器。如果某个传感器需要权限，您将被提示接受，否则该传感器将无法启用并发送数据。

需要注意的是，传感器更新需要应用向设备发送通知，以防止操作系统将其杀死。您可以进入 Wear 设备的设置并关闭 SensorWorker 通知通道，以停止这些通知在您的手腕上振动。

:::info
传感器更新依赖于手表具有数据连接，并且应用被允许发送更新。一些设备实施的电池节省技术比其他设备更严格，因此更新可能没有您预期的那么频繁。

目前没有传感器设置的支持。因此某些传感器可能无法完全操作。例如，BLE 发射器和信标监控传感器只能启用，当前没有设置可以更改。这些传感器在我们添加传感器设置时可能无法完全功能，默认设置将允许基本功能。
:::

## 传感器列表

| 传感器 | 属性 | 描述 |
| --------- | --------- | ----------- |
| [应用数据](../core/sensors.md#app-data-sensors) | 无 | 显示应用发送或接收了多少数据的传感器。 |
| [应用重要性](../core/sensors.md#app-importance-sensor) | 无 | 当前应用的重要性，以确定它是处于前台还是缓存。 |
| [应用内存](../core/sensors.md#app-memory-sensor) | 无 | 可用于应用程序的内存信息。 |
| [应用使用情况](../core/sensors.md#app-usage-sensors) | 无 | 代表应用根据其使用情况被对待的传感器。 |
| [音频](../core/sensors.md#audio-sensors) | 无 | 关于设备不同类型音频检测的多个传感器。 |
| [电池](../core/sensors.md#battery-sensors) (默认启用) | 无 | 关于设备电池状态的多个传感器。默认只启用 `battery_level`、`battery_state` 和 `charger_type`。 |
| `binary_sensor.bedtime_mode` | 无 | 一个传感器，用于反映设备的就寝模式状态。为了获得最佳效果，请启用请勿打扰或交互传感器。仅在 Wear OS 3 设备上可用 |
| [蓝牙传感器](../core/sensors.md#bluetooth-sensors) | [查看属性](../core/sensors.md#bluetooth-sensors) | 关于设备蓝牙状态的多个传感器。还有用于信标发送和监控的传感器。 |
| `sensor.current_time_zone` | [查看属性](../core/sensors.md#current-time-zone-sensor) | 设备当前所处的时区。 |
| [当前版本](../core/sensors.md#current-version-sensor) | 无 | 当前安装的应用程序版本。 |
| [请勿打扰](../core/sensors.md#do-not-disturb-sensor) | 无 | 设备的请勿打扰状态。 |
| [休眠](../core/sensors.md#doze-sensor) | 无 | 设备是否处于休眠模式。 |
| [健康服务](#health-services) | [见下文](#health-services) | 由健康服务 API 提供的一组传感器。 |
| `sensor.heart_rate` | 准确度 | 当前心率（以每分钟心跳计）。此传感器使用 [心率传感器](https://developer.android.com/reference/android/hardware/Sensor#TYPE_HEART_RATE)。 |
| [交互](../core/sensors.md#interactive-sensor) | 无 | 设备是否处于交互状态。 |
| [锁屏传感器](../core/sensors.md#keyguard-sensors) | 无 | 代表设备被锁定或安全的各种状态的传感器。 |
| `sensor.last_reboot` | [查看属性](../core/sensors.md#last-reboot-sensor) | 设备上次重启的时间戳。 |
| [最后更新](../core/sensors.md#last-update-trigger-sensor) | 无 | 状态将反映导致最后一次更新发送的意图。 |
| `sensor.light_sensor` | 无 | 设备检测到的当前照度水平。 |
| [移动数据传感器](../core/sensors.md#mobile-data-sensors) | 无 | 关于移动数据状态的多个传感器。 |
| `binary_sensor.nfc_state` | 无 | 设备的 NFC 传感器是否启用。 |
| `sensor.phone_state` | 无 | 唯一跟踪的状态是 `idle`、`ringing` 或 `offhook`，没有其他信息被访问。 |
| `sensor.pressure_sensor` | 无 | 来自设备的压力读取。 |
| `sensor.proximity_sensor` | 无 | 设备当前的接近读取，某些设备仅显示 `near` 或 `far` 的布尔值。 |
| [网络](../core/sensors.md#connection-type-sensor) | 无 | 关于 WiFi 状态的多个传感器。 |
| [下一次闹钟](../core/sensors.md#next-alarm-sensor) | [查看属性](../core/sensors.md#next-alarm-sensor) | 下一次定时闹钟的日期。 |
| `binary_sensor.on_body_sensor` | 无 | 一个传感器，指示可穿戴设备是否认为自己在身体上。此传感器使用 [低延迟离体检测](https://developer.android.com/reference/android/hardware/Sensor#TYPE_LOW_LATENCY_OFFBODY_DETECT) 传感器。 |
| [省电模式](../core/sensors.md#power-save-sensor) | 无 | 设备是否处于省电模式。 |
| `sensor.screen_brightness` | [查看属性](../core/sensors.md#screen-brightness-sensor) | 当前屏幕亮度的值。 |
| `sensor.screen_off_timeout` | 无 | 当前屏幕熄灭超时设置的值。 |
| `sensor.sim_1` | [查看属性](../core/sensors.md#cellular-provider-sensor) | 您的移动网络提供商的名称。 |
| `sensor.sim_2` | [查看属性](../core/sensors.md#cellular-provider-sensor) | 您的移动网络提供商的名称。 |
| [步数](../core//sensors.md#pedometer-sensors) | 无 | 自上次设备重启以来用户走的步数。需要支持的设备的活动识别权限。 |
| [存储传感器](../core/sensors.md#storage-sensor) | [查看属性](../core/sensors.md#storage-sensor) | 您的 Android 设备上可用内部和外部存储的总量和可用量。 |
| `binary_sensor.theater_mode` | 无 | 一个传感器，用于反映设备的电影院模式状态。为了获得最佳效果，请启用交互传感器。 |
| [流量统计传感器](../core/sensors.md#traffic-stats-sensor) | 无 | 自上次重启以来，从移动设备和总体设备使用中传输和接收的数据量。 |
| `binary_sensor.wet_mode` | 无 | 一个传感器，用于指示当前设备的湿模式状态。此传感器在某些设备上也称为触控锁或水锁。这是一个特殊模式，用户必须按住冠/电源按钮 2 秒钟才能重新启用触控。 |


### 健康服务

仅限 Wear OS 3+<br />

包含 Google 的 [健康服务 API](https://developer.android.com/training/wearables/health-services/passive#useractivityinfo) 提供的数据的传感器列表。

以下传感器可用（如果您的设备支持它们）：

| 传感器 | 属性 | 描述 |
| --------- | --------- | ----------- |
| `sensor.activity_state` | 运动类型，时间 | 反映当前用户活动状态的传感器，可以是：睡眠、运动、被动或未知。 |
| `sensor.daily_calories` | 无 | 一天内的总卡路里数（包括基础代谢率和活动卡路里），前一天结束时和新的一天开始时是在当地时间午夜 12:00。 |
| `sensor.daily_distance` | 无 | 一天内的总距离，前一天结束时和新的一天开始时是在当地时间午夜 12:00。 |
| `sensor.daily_floors` | 无 | 一天内总共攀爬的楼层数，前一天结束时和新的一天开始时是在当地时间午夜 12:00。 |
| `sensor.daily_steps` | 无 | 一天内的总步数，前一天结束时和新的一天开始时是在当地时间午夜 12:00。 |