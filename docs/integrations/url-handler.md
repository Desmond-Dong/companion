---
title: "URL 处理程序"
id: 'url-handler'
---

Home Assistant 支持通过 URL 从其他应用程序打开。

## 平台兼容性

不同类型的深层链接的平台支持会有所不同，请查阅下表以查看您的平台可用的深层链接类型。

<table className="core-table">
  <thead>
    <tr>
      <th><strong>深层链接类型</strong></th>
      <th><img alt="Android" src="/assets/android.svg" /> Android</th>
      <th><img alt="iOS" src="/assets/iOS.svg" /> & <img alt="macOS" src="/assets/macOS.svg" /></th>
      </tr>
  </thead>
    <tbody>
      <tr>
        <td>导航</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>调用服务</td>
        <td></td>
        <td>✅</td>
      </tr>
        <tr>
        <td>触发事件</td>
        <td></td>
        <td>✅</td>
      </tr>
        <tr>
        <td>发送位置</td>
        <td></td>
        <td>✅</td>
      </tr>
    </tbody>
</table>

## 导航
这允许您通过深层链接更新前端页面的位置。要构建深层链接，请遵循以下步骤：

1. 转到您想要深层链接的网页链接，例如 `http://homeassistant.local:8123/dashboard-mobile/my-subview`
2. 复制 URL 的路径部分，在此示例中，即为 `/dashboard-mobile/my-subview`
3. 通过以 `homeassistant://navigate` 开头并添加路径来构建您的 URL，例如 `homeassistant://navigate/dashboard-mobile/my-subview`

:::info
![iOS](/assets/iOS.svg), ![Android](/assets/android.svg) <span class='beta'>BETA</span> **指定要导航到的服务器在 iOS 中被支持，并且在 Android 中处于测试阶段**<br />
默认情况下，如果您有多个服务器，应用将询问您希望导航到哪个服务器。
要定义您希望导航到的服务器，请使用查询参数 `?server=`，如以下示例所示：<br /><br />
`homeassistant://navigate/webcams?server=My%20home` 当您的服务器名称为 `My Home` 时，或者如果您希望导航到第一个可用的服务器，请使用 `?server=default`。
:::

## 调用服务
示例： `homeassistant://call_service/device_tracker.see?entity_id=device_tracker.entity`

查询参数作为字典在调用中传递。

:::info
如果多个服务器连接到应用，`call_service` 链接将使用列表中的第一个服务器进行处理。
:::

## 触发事件
您可以创建一个 [事件触发器](https://www.home-assistant.io/docs/automation/trigger/#event-trigger) 并触发事件。

示例： `homeassistant://fire_event/custom_event?entity_id=MY_CUSTOM_EVENT`

查询参数作为字典在调用中传递。

:::info
如果多个服务器连接到应用，`fire_event` 链接将使用列表中的第一个服务器进行处理。
:::

## 发送位置
示例： `homeassistant://send_location/`