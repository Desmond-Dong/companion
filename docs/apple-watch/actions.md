---
title: "(Legacy) iOS 动作"
id: "watch-actions"
---

:::info 继续之前
您可以通过将脚本/场景添加到您的手表 [配置](/docs/apple-watch/#home) 来轻松运行脚本和活动场景。
iOS 动作将不再获得未来支持。请迁移到其他解决方案，例如 **Scripts** 小部件或 Apple Watch 配置。
:::

从 Apple Watch 触发的动作将以与在 iPhone 上触发的动作相同的方式传递到 Home Assistant 事件总线，使用 `ios.action_fired` 事件，但事件的有效载荷会有所不同，以明确事件的来源。由 Apple Watch 触发的动作将具有 `triggerSource` 键，值为 `watch`。

在 Apple Watch 上触发的事件的 `ios.action_fired` 有效载荷示例如下：

```json
{
    "event_type": "ios.action_fired",
    "data": {
        "sourceDeviceID": "my_iphone",
        "actionID": "09CEA437-4585-4A97-B946-79D2C8B3145A",
        "sourceDevicePermanentID": "BCEE1730-E6BE-453B-B9E5-9601FA182C64",
        "actionName": "MyActionName",
        "triggerSource": "watch",
        "sourceDeviceName": "My iPhone"
    },
    "origin": "REMOTE",
    "time_fired": "2020-06-13T14:40:43.009700+00:00",
    "context": {
        "id": "d2f58b921b2f41809af9fce444416aab",
        "parent_id": null,
        "user_id": "3831508509fe4124abaf1d144c2e8ca4"
    }
}