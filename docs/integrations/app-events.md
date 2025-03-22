---
title: 应用事件
id: 'app-events'
---

## 概述


为了帮助运行自动化任务，例如清除应用图标徽章，或者根据应用使用情况触发的其他任务，Home Assistant Companion Apps 会在某些情况下向 Home Assistant 的 [事件总线](https://www.home-assistant.io/docs/configuration/events/) 发送不同的事件。

![iOS](/assets/iOS.svg)<br />

| 事件 | 原因 |
| ----- | ----- |
| `ios.finished_launching` | 当应用未在后台运行时打开应用。这也会导致 `ios.became_active` 被触发。 |
| `ios.entered_background` | 应用已关闭，但仍在后台运行（通过按下主屏按钮或在无主屏按钮的机型上向上滑动）。 |
| `ios.became_active` | 应用被打开，无论它是否已经在后台。 |
| `ios.zone_entered` | 进入了一个区域。如果该区域小于100米，将包括 `multi_region_zone_id` 键。 |
| `ios.zone_exited` | 离开了一个区域。如果该区域小于100米，将包括 `multi_region_zone_id` 键。 |

![Android](/assets/android.svg)

| 事件 | 原因 |
| ----- | ----- |
| `android.intent_received` | 当应用收到来自 [最后更新传感器](../core/sensors.md#last-update-trigger-sensor) 的注册意图的广播意图时。事件数据将包含意图动作字符串和任何意图附加数据（如果有）。 |
| `android.navigation_started` | 当从 Android Auto/Automotive 中选择一个 `Navigation` 类别下的实体时。事件数据将包含所选实体的 ID。 |
| `android.zone_entered` | 进入了一个区域。事件数据将包含所有位置数据，包括触发区域。仅适用于 [`full` 版本](/docs/core/android-flavors) 用户。 |
| `android.zone_exited` | 离开了一个区域。事件数据将包含所有位置数据，包括触发区域。仅适用于 [`full` 版本](/docs/core/android-flavors) 用户。 |
| `mobile_app.migration_failed` | 应用数据库已损坏，并在迁移过程中被重置以允许应用打开。传感器需要重新启用，部件需要重新创建。设备上还会发布通知，告知用户出现问题。 |

您可以使用 Home Assistant 的开发工具中的事件页面，通过订阅您感兴趣的事件并在设备上执行适当的操作，显示特定事件所包含的所有信息。