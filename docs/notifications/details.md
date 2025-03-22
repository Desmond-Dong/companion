---
title: "隐私、速率限制与安全"
id: "notification-details"
---

## 隐私

通知内容不会存储在远程服务器上。仅保留所需的推送注册数据和按设备每日发送的推送通知总数的简单计数器（用于速率限制）。

## 架构
为了提供通知服务，该应用使用Google的Firebase云消息传递服务。如需了解有关Firebase的更多信息，请 [点击这里](https://firebase.google.com/docs/cloud-messaging)。

![iOS](/assets/iOS.svg)<br />
如果您希望不与Google的服务器交换数据，您可以在使用应用时，在[配置](https://my.home-assistant.io/redirect/config/)中的Companion App设置的隐私部分选择退出Firebase服务。这样做将导致通知无法正常功能。

## 速率限制

目前，您每天每个设备最多可以发送500条推送通知。速率限制每天午夜UTC重置。这是为了确保服务保持低成本维护。未来我们可能会增加支持以允许更多通知。

iOS应用内的通知设置屏幕显示您当天的当前速率限制，分为以下几个类别：尝试、已发送、错误、总计，以及距离下次每日重置的确切时间。对于Android，您可以在Companion App的[配置](https://my.home-assistant.io/redirect/config/)屏幕上找到这些详细信息。或者，您还可以通过为[`logger`](https://www.home-assistant.io/integrations/logger/)集成设置`homeassistant.components.mobile_app.notify: info`来查看它们。

如果在发送通知时发生错误，则不计入您的速率限制。[关键警报](critical.md)和[通知命令](commands.md)也不计入您的速率限制。

## 安全

Home Assistant实例、推送基础设施和Apple之间的所有流量均使用SSL加密。