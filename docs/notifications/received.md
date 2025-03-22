---
title: "通知已接收"
id: "notification-received"
---

![Android](/assets/android.svg)

当设备收到通知时，您可以接收一个事件。为了接收此事件，您需要在通知操作中将 `confirmation: true` 设置为参数。所有通知数据都将包含在事件类型 `mobile_app_notification_received` 的事件数据中。如果您不设置此参数，则在收到通知时不会从设备发送任何事件。

示例：

```yaml
automation:
  - alias: 通知接收确认
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "此通知已被接收"
          data:
            confirmation: true
```

示例事件数据：

```json
{
    "event_type": "mobile_app_notification_received",
    "data": {
        "message": "测试",
        "device_id": "DEVICE_ID"
    },
    "origin": "REMOTE",
    "time_fired": "2020-10-06T05:36:12.864583+00:00",
    "context": {
        "id": "ID",
        "parent_id": null,
        "user_id": "USER_ID"
    }
}