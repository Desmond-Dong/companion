---
title: "分享"
id: 'sharing'
---

此功能将在以下应用版本中可用：

| ![iOS](/assets/iOS.svg) | ![Android](/assets/android.svg) Android |
| ----------------------------- | --------------------------------------- |
| 2020.7                        | 2.5.0                                   |


配套应用允许你从任何允许分享的应用程序中向你的 Home Assistant 服务器分享。应用程序会触发一个 `mobile_app.share` 事件，并附带一些事件数据供你自动化使用。

这两个应用都会提供关于 `url` 或 `text` 的事件数据，具体取决于分享来自哪个应用程序。iOS 用户将获取关于 `entered` 的事件数据，其中包含与分享一起发送的任何文本。Android 用户将获取关于 `caller` 的事件数据，其中包含分享事件来自的应用。

Android 应用的示例事件数据：

```json
{
    "event_type": "mobile_app.share",
    "data": {
        "caller": "android-app://com.android.chrome",
        "subject": "网页标题",
        "url": "https://www.example.xom",
        "text": "文本",
        "device_id": "设备_ID"
    },
    "origin": "REMOTE",
    "time_fired": "2020-09-25T01:06:48.512587+00:00",
    "context": {
        "id": "ID",
        "parent_id": null,
        "user_id": "用户_ID"
    }
}
```

iOS 应用的示例事件数据：

```json
{
    "event_type": "mobile_app.share",
    "data": {
        "entered": "我输入的文本",
        "sourceDeviceID": "iphone_11_pro_debug",
        "sourceDeviceName": "iPhone 11 Pro",
        "sourceDevicePermanentID": "设备_ID",
        "text": "Home Assistant 自动化系统进入 iOS 的多个区域",
        "url": "https://www.example.com"
    },
    "origin": "REMOTE",
    "time_fired": "2020-09-25T01:07:48.926946+00:00",
    "context": {
        "id": "ID",
        "parent_id": null,
        "user_id": "用户_ID"
    }
}