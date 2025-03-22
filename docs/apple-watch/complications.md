---
title: "并发症"
id: "complications"
---


并发症允许你在 Apple Watch 表盘上显示 Home Assistant 传感器的值。Home Assistant Apple Watch 应用包含大多数 Apple Watch 表盘的并发症。

## 先决条件

以下所描述的所有模板化都要求用户是 [管理员](https://www.home-assistant.io/integrations/person/#adding-a-person-to-home-assistant)。

## 创建并发症

并发症是在配对的 iPhone 的 Home Assistant Companion App 中通过 Companion App 部分的 [配置](https://my.home-assistant.io/redirect/config/) 中的 Apple Watch 页面创建的。

并发症按其位置列出，并按表盘类型分组。对于某些位置，有多个可用的模板，选择位置后你可以选择所需的模板。并发症值使用 [Jinja2 模板](https://www.home-assistant.io/docs/configuration/templating/) 设置。除了设置显示文本的模板外，还可以选择图标。每一行文本和图标的颜色都可以独立设置。有关不同并发症及其在不同表盘上外观的概述，请参见 [这些 Apple 开发者指南](https://developer.apple.com/design/human-interface-guidelines/components/system-experiences/complications/)。

## 为新的“Modular”表盘创建并发症

WatchOS 9 移除了旧的“Modular”表盘，并将“Infographic Modular”重命名为“Modular”。在为新的“Modular”表盘创建新并发症时，从“Graphic”部分选择“Circular”或“Rectangular”。“Modular”部分的并发症已不再有效。

![新并发症](https://github.com/user-attachments/assets/46541b65-48da-4228-8035-06b90da73689)

示例：

![图形圆形示例](https://github.com/user-attachments/assets/57a69fd3-38b7-4b48-b401-2941504515f1)

## 环形/仪表并发症

要设置开放或闭合环并发症的填充程度，将模板生成的值归一化为 `0.0` 到 `1.0` 之间的数字。值为 `0.0` 将给出一个空环，值为 `1.0` 将给出一个满环。你可以通过以下模板来实现：

```jinja2
{{ (value - minimum) / (maximum - minimum) }}
```

例如，显示一组值之间的温度传感器：

```jinja2
{% set original = states("sensor.living_room_temperature") | float %}
{% set minimum = 16.0 %}
{% set maximum = 24.0 %}
{% set adjusted = min(maximum, max(minimum, original)) %}
{{ (adjusted - minimum) / (maximum - minimum) }}
```

你也可以使最小值和最大值动态。例如，根据当前的天气预报：

```jinja2
{% set forecast = state_attr("weather.openweathermap", "forecast") | first %}
{% set original = state_attr("weather.openweathermap", "temperature") %}
{% set minimum = forecast["templow"] %}
{% set maximum = forecast["temperature"] %}
{% set adjusted = min(maximum, max(minimum, original)) %}
{{ (adjusted - minimum) / (maximum - minimum) }}
```

这些示例都注意避免返回值 \<0 或 >1.0，这就是“adjusted”变量的作用。

## 自动更新

并发症将在每小时的 :00、:15、:30 和 :45 大约更新时间；确切的时间由系统决定。编辑并发症将立即同步到手表，但你可能需要启动手表应用程序以更新并发症。

该应用程序保持非活动的并发症最新，以便更换表盘时更方便。如果 Home Assistant 应用不在你的活跃手表表盘上，它将很少更新，你可能会在更换表盘时发现其显示过时的信息。

## 手动更新

并发症也可以使用 [通知命令](/notifications/commands.md) 更新。系统将这些限制为每天 50 次，你可以在 [配置](https://my.home-assistant.io/redirect/config/) 的 Companion App 部分查看当前限制。

更新可能需要几秒钟或几分钟才能完全应用。

![iOS](/assets/iOS.svg) 2021.6 版本是手动更新的要求。

```yaml
- action: notify.mobile_app_<your_device_id_here>
  data:
    message: update_complications
```

:::info
通过命令手动更新在使用本地推送时尚未生效。
:::