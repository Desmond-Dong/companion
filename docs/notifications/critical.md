---
title: "重要通知"
id: "critical-notifications"
---
重要通知的配置和行为在 iOS 和 Android 之间有所不同。

## ![iOS](/assets/iOS.svg)
在 iOS 12 中引入了重要通知，旨在发送您不想错过的高优先级通知——例如安全系统、水漏传感器和烟雾/CO2 警报。

iOS 对这种类型的通知给予了特别的优先级。重要警报总是出现在锁定屏幕的顶部，超出所有其他通知，即使在启用“请勿打扰”模式或 iPhone 静音时也会播放声音。因为我们不希望您错过任何重要通知，它们也被允许绕过应用的 [通知速率限制](details.md)。

![iOS](/assets/iOS.svg)示例

```yaml
automations:
  - alias: "火灾检测 iOS"

    trigger:
      - platform: state
        entity_id: sensor.smoke_alarm
        to: "smoke"

    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "快醒醒！"
          message: "房子着火了，猫被困在烘干机里！"
          data:
            push:
              sound:
                name: "default"
                critical: 1
                volume: 1.0
```
如果您之前阅读过 [声音文档](sounds.md)，这个语法应该大致是熟悉的。请注意，示例扩展了 `sound` 属性以包括 `critical: 1` 标志，并将 `volume: 1.0` 设置为 100%。

或者，您可以使用 [`interruption-level` 语法](basic.md#interruption-level) 来使通知变为重要。
```yaml
automations:
  - alias: "狗叫得很大声"

    trigger:
      - platform: numeric_state
        entity_id: sensor.dog_bark_decibel_meter
        above: "90"

    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "史努比要吵醒邻居了"
          message: "狗在叫，可能会吵醒邻居！"
          data:
            push:
              interruption-level: critical
```

对于**CarPlay**用户，也值得一提的是，重要通知是唯一可以出现在汽车内置显示屏上的通知，如果您想知道在驾驶时发生了什么紧急情况，它们会非常有用。

## ![Android](/assets/android.svg)

:::info
以下选项仅在未使用 [本地推送通知](local.md) 的情况下产生影响。如果您使用的是最小版本，则无需担心此问题。
:::

对于 Android，通知通常会立即出现。但是，在某些情况下（例如手机静止不动或屏幕关闭很长时间），默认通知在屏幕开启之前不会响铃。

要覆盖此行为，请设置 `priority: high` 和 `ttl: 0`。

默认情况下，它们也不会覆盖“请勿打扰”设置，如果您希望覆盖此设置，则需要使用 [通知通道](basic.md#notification-channels)。

![Android](/assets/android.svg) &nbsp; Android 示例

```yaml
automations:
  - alias: "火灾检测 Android"

    trigger:
      - platform: state
        entity_id: sensor.smoke_alarm
        to: "smoke"

    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "快醒醒！"
          message: "房子着火了，猫被困在烘干机里！"
          data:
            ttl: 0
            priority: high
```

### ![Android](/assets/android.svg) 警报流
您还可以强制通知从警报流中播放，这样即使在震动/静音模式下，设备也会响铃。Android 7 及以下用户仍然可以使用下面的 `channel` 示例，因为我们仅使用它来覆盖默认通知的声音行为。为了使通知立即显示并发出声音，无论铃声模式如何，请遵循以下示例之一。

使用此方法可以发送普通通知：

```yaml
automations:
  - alias: "火灾检测 Android 警报流"
    trigger:
      - platform: state
        entity_id: sensor.smoke_alarm
        to: "smoke"

    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "快醒醒！"
          message: "房子着火了，猫被困在烘干机里！"
          data:
            ttl: 0
            priority: high
            channel: alarm_stream
```

### ![Android](/assets/android.svg) 语音合成警报流
或者，您可以使用语音合成来朗读通知：

```yaml
automations:
  - alias: "火灾检测 TTS 警报"

    trigger:
      - platform: state
        entity_id: sensor.smoke_alarm
        to: "smoke"
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: TTS
          data:
            ttl: 0
            priority: high
            media_stream: alarm_stream
            tts_text: "房子着火了，猫被困在烘干机里！"
```

### ![Android](/assets/android.svg) 语音合成警报流最大音量
另外，使用语音合成时，您还可以调整通知的音量到最大，然后再恢复到原始音量级别：

```yaml
automations:
  - alias: "火灾检测 TTS 大声"

    trigger:
      - platform: state
        entity_id: sensor.smoke_alarm
        to: "smoke"

    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: TTS
          data:
            ttl: 0
            priority: high
            media_stream: alarm_stream_max
            tts_text: "房子着火了，猫被困在烘干机里！"