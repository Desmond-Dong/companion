---
title: "操作"
id: "actions"
---

![Apple](/assets/apple.svg) 具体

操作是一个通用系统，允许您轻松将Home Assistant自动化系统集成到iOS的多个领域、[Apple Watch](/apple-watch/apple-watch.md)和CarPlay中。

## 创建操作

您可以在应用程序内部或在Home Assistant的`configuration.yaml`中创建操作。

### 在应用程序中创建操作

操作从Companion App的操作部分创建，在iOS的[配置](https://my.home-assistant.io/redirect/config/)页面中。每个操作都有根据设备所需的字段：

- `名称`: 操作的名称，这将在应用触发的[Home Assistant事件](https://www.home-assistant.io/docs/configuration/events/)中返回。
- `服务器`: 如果您连接了多个Home Assistant服务器，请选择操作应发送到的服务器。
- `文本`: 在手机和手表上显示的描述性文本。最好保持相对简短，因为每个操作的按钮上空间有限。
- `文本颜色`*: 上述定义的文本颜色。
- `背景颜色`*: 为操作创建的按钮的颜色。 **(需要`use_custom_colors`)**
- `图标`: 显示在操作按钮文本左侧的图标。
- `图标颜色`: 操作按钮上图标的颜色。
- `在CarPlay中显示`: 布尔值，用于在CarPlay中显示或隐藏操作。
- `在手表中显示`: 布尔值，用于在Apple Watch中显示或隐藏操作。
- `使用自定义颜色`**: 布尔值，用于启用小部件和Apple手表中的自定义颜色，最初提供的是瓦片卡片UI，启用后可以更改背景和文本颜色。 （可从iOS App v2024.7.1开始提供）

\* 需要`use_custom_colors` **true**

** 从iOS App v2024.7.1可用  

对于这三个颜色字段，可通过点击每个字段中的颜色选择器圆圈选择颜色。

### 在Home Assistant中创建操作

您可以在Home Assistant的`configuration.yaml`中定义操作。这需要至少Home Assistant 0.115和2020.6版本。以下是一个示例条目。

```yaml
ios:
  actions:
    - name: Fred
      background_color: "#000000" # 需要 `use_custom_colors`
      label:
        text: "Hello, World"
        color: "#ff0000" # 需要 `use_custom_colors`
      icon:
        icon: earth
        color: "#ffffff"
      show_in_carplay: false
      show_in_watch: true
      use_custom_colors: true
```

颜色应为十六进制格式，图标应来自[mdi](https://materialdesignicons.com/)集合。

保存这些更改后，您需要重启Home Assistant，然后在Companion App中，前往[配置](https://my.home-assistant.io/redirect/config/)中Companion App的操作部分。它应该自动同步，但您也可以下拉刷新以同步。

当多个服务器连接到该应用程序时，无需在`configuration.yaml`中指定`server`值，应用程序将自动检测导入操作的来源。

## 使用操作

在填写完所有操作数据（文本、名称等）后，点击**创建自动化**按钮。

*或者：*

当按下操作按钮时，会在Home Assistant的事件总线上触发一个`ios.action_fired`事件。事件数据由一个JSON格式的包含与该操作相关的属性的字典组成。

| 属性        | 值                                                                                                                                                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `context`   | 与触发事件的用户及事件ID相关的子字典                                                                                                                                                                                                      |
| `data`      | 包含关于操作及其来源的关键信息的子字典                                                                                                                                                                                                 |
| `event_type`| 始终为`ios.action_fired`                                                                                                                                                                                                          |
| `origin`    | 始终为`REMOTE`                                                                                                                                                                                                                  |
| `time_fired`| 触发操作的日期和时间，格式为[ISO时间戳](https://en.wikipedia.org/wiki/ISO_8601)，例如，在拉普兰的圣诞节午夜（东欧时间，UTC+2）将为`2019-12-25T00:00.000000+02:00`。 |

`data`中包含的属性为：

| 属性              | 值                                                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `actionID`       | 操作的唯一标识符。                                                                                                                                           |
| `actionName`     | 在iOS中创建操作时在`名称`字段中给定的操作名称或在Android中使用的`操作`字段。                                                                                       |
| `sourceDeviceID` | 在您的设备的Companion App的[配置](https://my.home-assistant.io/redirect/config/)部分中设置的设备ID。                                                             |
| `sourceDeviceName`| 触发操作的设备名称。此设备名称在iOS的设置应用程序中设置，路径为设置>通用>关于；在Android设备中设置在设置>关于手机中。 |
| `sourceDevicePermanentID` | 通过该设备触发操作的唯一标识符。                                                                                                           |
| `triggerSource`  | 操作的触发来源。可以是：`widget`（来自今日视图）、`appShortcut`（通过3D触摸访问的快速操作）或`watch`（如果是来自Apple Watch触发）。触发自Apple的CarPlay时，来源将是`carPlay`。 |

`context`中包含的属性为：

| 属性          | 值                                                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | 事件的唯一一次性ID。                                                                                                                                 |
| `parent_id`   | 始终为`null`。                                                                                                                                      |
| `user_id`     | 用于授权Companion App与Home Assistant连接的Home Assistant [用户ID](https://www.home-assistant.io/docs/authentication/#user-accounts)。 |

操作可以用来触发Home Assistant中的自动化。一个示例的`configuration.yaml`条目可能是：

示例

```yaml
automation:
  - alias: "操作关闭灯光"
    initial_state: true
    trigger:
      - platform: event
        event_type: ios.action_fired
        event_data:
          actionName: "就寝时间"
    action:
      - action: light.turn_off
        entity_id: group.all_lights
```

请注意，位于`data`和`context`中的属性通过`event_data`和`event_context`分别访问。

您可以使用Home Assistant开发者工具中的事件页面通过订阅`ios.action_fired`并从您的设备触发操作，显示特定事件包含的所有信息。

## Apple Watch

[Apple Watch应用](/apple-watch/apple-watch.md)提供对您创建的操作的访问。一旦您在操作页面中创建了操作，打开Home Assistant手表，操作列表应该会同步。在Apple Watch上触发的操作携带[稍微不同的有效载荷](/apple-watch/actions.md)。

## 主屏幕快捷操作

[主屏幕快捷操作](https://support.apple.com/guide/iphone/keep-apps-handy-iph414564dba/ios#iph1ffcbd691)为您的操作提供了方便的快捷方式。要访问它，请长按主屏幕上的Home Assistant Companion App图标。

## 今日视图小部件

**（在iOS App v2024.8中停用，请改用iOS小部件）**

[今日视图小部件](https://support.apple.com/en-gb/HT207122)是触发操作的另一种途径。要将Home Assistant小部件添加到今日视图：

1. 在主屏幕或锁屏时向右滑动。
2. 滚动到最底部，点击编辑按钮。
3. 在“更多小部件”列表中找到“Home Assistant - 操作”小部件，然后点击绿色的+按钮添加。
4. 按照您的需要重新排列，然后点击完成。
