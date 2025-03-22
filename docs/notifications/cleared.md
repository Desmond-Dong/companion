---
title: "通知已清除"
id: "notification-cleared"
---

![Android](/assets/android.svg)

当通知被清除时，Android会通知伴侣应用这个事件。同时，确保组被取消，应用会向您的Home Assistant实例发送一个`mobile_app_notification_cleared`事件。该事件将包含发送到设备的所有通知数据。每当通知被清除时，都会触发该事件。如果您手动从通知状态栏上滑动它，或者点击“清除全部”按钮，通知被视为已清除。如果点击通知打开应用，则不会发送事件。

示例事件数据：

```json
{
    "event_type": "mobile_app_notification_cleared",
    "data": {
        "message": "test",
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