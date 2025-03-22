---
title: "可操作的通知"
id: "actionable-notifications"
---

可操作的通知是一种独特的通知类型，因为它允许用户在通知中添加按钮，点击后可以向 Home Assistant 发送一个 [事件](https://www.home-assistant.io/docs/configuration/events/)。该事件可以在自动化中使用，允许你执行多种操作。这些通知可以发送到 iOS 或 Android 设备。

一些可操作通知的有用示例：

-   当你不在家或正在睡觉时，每当家中检测到运动，就会发送通知。通知旁边会显示一个“发出警报”的操作按钮，点击后将响起你的防盗警报。
-   有人按响了你的门铃。你会收到一条包含外部访客的 [实时摄像头画面](dynamic-content.md) 的通知，同时还附带锁定或解锁前门的操作按钮。
-   每当车库门打开时接收通知，并附带打开或关闭车库的操作按钮。

![可操作的通知允许用户将命令发送回 Home Assistant。](/assets/ios/actions.png)

![iOS](/assets/iOS.svg) 如果你有多个服务器连接到 iOS 或 Mac 应用，通知操作将在发送通知的服务器上触发。

:::caution 版本兼容性
iOS 和 macOS 上的基于类别的通知已被弃用。有关转换现有通知的更多信息，请参阅 [迁移指南](#migrating-from-categories)。
:::

:::info Apple Watch
在 watchOS 上的操作需要安装 Watch 应用。你可以在系统的 Watch 应用中安装它。
:::

## 创建可操作通知

你可以在你的操作中包含一个 `actions` 数组。

![Android](/assets/android.svg) Android 允许 3 个通知操作。  
![iOS](/assets/iOS.svg) iOS 允许大约 10 个通知操作。如果超出，系统 UI 在通知操作中将开始出现滚动问题。

```yaml
action: notify.mobile_app_<你的设备 ID>
data:
  message: "家里发生了某件事！"
  data:
    actions:
      - action: "ALARM" # 你发送的事件键
        title: "发出警报" # 按钮标题
      - action: "URI" # 如果你计划使用 URI，必须设置为 URI
        title: "打开网址"
        uri: "https://google.com" # 选择操作时打开的 URL，也可以是一个 lovelace 视图/仪表板      
```

每个操作可能包含以下键：

| 键 | 含义 | 注释 |
| --- | --- | --- |
| `action` | **必填**。在事件中返回的标识符 | 当设置为 `REPLY` 时，你将被提示输入文本以随事件发送。 |
| `title` | **必填**。在通知中显示的按钮标题 | |
| `uri` | **可选**。点击时打开的 URL | ![Android](/assets/android.svg) Android 要求将 `action` 设置为 `URI` 以使用此键。请参阅 [下方的注释](#uri-values)。 |
| `behavior` | **可选**。设置为 `textInput` 以提示输入文本随事件返回。当将操作设置为 `REPLY` 时，也会发生这种情况。 | 使用此键允许你使用 `action` 键区分操作。 |

### ![Android](/assets/android.svg) Android 特定选项

以下所有键都是可选的。

| 键 | 含义 | 注释 |
| --- | --- | --- |
| _无_ | 目前没有 Android 特定键。 | |

### ![iOS](/assets/iOS.svg) 特定选项

以下所有键都是可选的。

| 键 | 含义 | 注释 |
| --- | --- | --- |
| `activationMode` | 设置为 `foreground` 以在点击时启动应用。默认为 `background`，仅触发事件。 | 提供 `uri` 时自动设置为 `foreground`。 |
| `authenticationRequired` | `true` 要求输入密码使用该操作。 | |
| `destructive` | `true` 将操作的标题颜色设置为红色，表示这是一个破坏性操作。 | |
| `textInputButtonTitle` | 用于提示的动作的文本输入标题。 | |
| `textInputPlaceholder` | 用于提示的动作的文本输入占位符。 | |
| `icon` | 用于通知的图标。 | 需要版本 2021.10。请参阅下方的注释。 |

#### 图标值

:::note 版本兼容性
这需要 iOS 应用版本 2021.10 或更高版本，适用于 iOS 15 或更高版本，或在 macOS 12 或更高版本上运行的 macOS 应用未来版本。
:::

通知操作的图标仅允许使用 [SF Symbols 库](https://developer.apple.com/sf-symbols/)，这与来自 [Material Design Icons 库](https://materialdesignicons.com/) 的其他图标不同。这是由于苹果对这些操作施加的限制。

你必须在图标名称前加上 `sfsymbols:` 前缀（与在其他地方加 `mdi:` 前缀类似），因为我们希望将其扩展以支持将来的 MDI。例如：

```yaml
action:
  - action: notify.mobile_app_<你的设备 ID>
    data:
      message: "家里发生了某件事！"
      data:
        actions:
          - action: "ALARM"
            title: "发出警报"
            icon: "sfsymbols:bell"
          - action: "SILENCE"
            title: "静音警报"
            icon: "sfsymbols:bell.slash"
```

### `uri` 值

要导航到前端页面，请使用格式 `/lovelace/test`，其中 `test` 替换为你在定义视图中定义的 [`path`](https://www.home-assistant.io/dashboards/views/#path)。如果你计划使用仪表板，格式将是 `/lovelace-dashboard/view`，其中 `/lovelace-dashboard/` 替换为你定义的 [`dashboard`](https://www.home-assistant.io/dashboards/dashboards) URL，`view` 替换为该仪表板内定义的 [`path`](https://www.home-assistant.io/dashboards/views/#path)。例如：

```yaml
- action: "URI"
  title: "打开摄像头"
  uri: "/lovelace/cameras"
```

#### ![Android](/assets/android.svg) Android 特定

如果你想打开一个应用，你需要将操作设置为 `URI`。格式将是 `app://<package>`，其中 `<package>` 替换为你希望打开的包（例如：`app://com.twitter.android`）。如果设备没有安装该应用，则 Home Assistant 应用将打开默认页面。

```yaml
- action: "URI"
  title: "打开 Twitter"
  # 要打开的应用程序的包名称
  uri: "app://com.twitter.android"
```

将操作设置为 `URI` 时，你还可以触发任何实体的更多信息面板。格式将是 `entityId:<entity_ID>`，其中 `<entity_id>` 替换为你希望查看的实体 ID。例如：`entityId:sun.sun`

```yaml
- action: "URI"
  title: "查看太阳"
  uri: "entityId:sun.sun"
```

你也可以在使用 `settings://notification_history` 格式时打开通知历史记录。

```yaml
- action: "URI"
  title: "通知历史"
  uri: "settings://notification_history"
```

![Android](/assets/android.svg)

你还可以使用 [意图方案 URI](https://developer.chrome.com/docs/multidevice/android/intents/#syntax) 来启动已安装应用中的操作。

```yaml
- action: "URI"
  title: "意图方案"
  uri: "intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end"
```

![Android](/assets/android.svg)

你可以通过使用 `deep-link://<deep_link>` 发送特定的 [深度链接](https://developer.android.com/training/app-links#deep-links) 给应用，其中 `<deep_link>` 是你希望发送的实际深度链接。

例如，要拨打电话：

```yaml
- action: "URI"
  title: "拨打必胜客"
  uri: "deep-link://tel:2125551212"
```

#### ![iOS](/assets/iOS.svg) 特定

你还可以使用应用启动 URL。例如，拨打电话：

```yaml
- action: "CALL"
  title: "拨打必胜客"
  uri: "tel:2125551212"
```

或者在默认浏览器中打开页面：

```yaml
- action: "OPEN"
  title: "打开 Safari"
  uri: "https://example.com"
```

## 创建通知操作脚本

在构建可操作通知时，有一些重要事项需要牢记：

1. 你的脚本或自动化可能会被多次运行
2. 你的通知的操作在所有通知之间是共享的

为避免问题，你可以为每次运行脚本创建唯一的操作。通过结合上下文和变量，这可以相当简单：

```yaml
# 在自动化操作或脚本序列内部
- alias: "为操作设置变量"
  variables:
    # 在操作中包含 ID 允许我们识别此脚本的运行
    # 并且不会意外触发其他通知操作
    action_open: "{{ 'OPEN_' ~ context.id }}"
    action_close: "{{ 'CLOSE_' ~ context.id }}"
- alias: "询问是否关闭或打开窗帘"
  action: notify.mobile_app_<你的设备>
  data:
    message: "窗帘半开。你想调整吗？"
    data:
      actions:
        - action: "{{ action_open }}"
          title: 打开
        - action: "{{ action_close }}"
          title: 关闭
- alias: "等待回应"
  wait_for_trigger:
    - platform: event
      event_type: mobile_app_notification_action
      event_data:
        # 等待特定操作避免意外继续
        # 其他脚本/自动化的通知操作
        action: "{{ action_open }}"
    - platform: event
      event_type: mobile_app_notification_action
      event_data:
        action: "{{ action_close }}"
- alias: "执行操作"
  choose:
    - conditions: "{{ wait.trigger.event.data.action == action_open }}"
      sequence:
        - action: cover.open_cover
          target:
            entity_id: cover.some_cover
    - conditions: "{{ wait.trigger.event.data.action == action_close }}"
      sequence:
        - action: cover.close_cover
          target:
            entity_id: cover.some_cover
```

上述脚本会发送通知，等待响应，然后执行请求的操作。

当执行通知操作时，`mobile_app_notification_action` 事件会触发并包含以下数据：

```javascript
{
    "event_type": "mobile_app_notification_action",
    "data": {
        "action": "OPEN_<context_id_here>",
        // 会出现：
        // - 当 `REPLY` 被用作操作标识符时
        // - 当 `behavior` 设置为 `textInput` 时
        "reply_text": "用户回复",
        // 仅限于 iOS，如果在通知中发送则会包括
        "action_data": {
          "entity_id": "light.test",
          "my_custom_data": "foo_bar"
        },
        // Android 用户也可以期望在此响应中看到与通知一起发送的所有数据字段，例如 “tag”
        "tag": "TEST"
    },
    "origin": "REMOTE",
    "time_fired": "2020-02-02T04:45:05.550251+00:00",
    "context": {
        "id": "abc123",
        "parent_id": null,
        "user_id": "123abc"
    }
}
```

## 进一步考虑

### 阻塞行为
上述示例将等待，直到执行通知操作。这可能导致意外的行为，具体取决于脚本的 [自动化模式](https://www.home-assistant.io/docs/automation/modes/)。对于 “single” 模式，如果先前的通知操作尚未执行，则脚本不会再次执行。对于 “queue” 和 “parallel”，如果某些通知尚未执行，也会发生此情况。对于 “restart” 模式，这意味着一旦脚本再次被触发，旧实例的通知操作将不会触发相应的操作。根据使用场景，有几种选项：

-   你可以使用 [超时](https://www.home-assistant.io/docs/scripts/#wait-timeout) 让脚本的新执行得以进行。但这会导致手机上出现悬而未决的通知。
-   可以 [清除通知](https://companion.home-assistant.io/docs/notifications/notifications-basic#clearing)，这可以与超时和并行执行模式结合使用以实现良好效果。
-   在 Android 上，你可以监听何时关闭通知的 [notification cleared event](https://companion.home-assistant.io/docs/notifications/notification-cleared)，并相应处理。可以通过添加以下行实现：
  ```
        - platform: event
          event_type: mobile_app_notification_cleared
          event_data:
            action_1_key: '{{ action_open }}'
  ```
  和
  ```
      - conditions: "{{ wait.trigger.event.event_type == 'mobile_app_notification_cleared' }}"
        sequence:
            - action: persistent_notification.create
              data:
                title: 应用通知结果
                message: 通知已关闭
  ```
  请记住，当 Home Assistant 应用崩溃或关闭时，此事件将不会被触发，因此仍应考虑超时。

### 捕获所有触发器
你还可以创建在任何通知操作上触发的自动化。例如，如果你想在各种通知上包括一个 `SILENCE` 操作，但仅在一个地方处理它：

```yaml
automation:
  - alias: "静音警报"
    trigger:
      - platform: event
        event_type: mobile_app_notification_action
        event_data:
          action: "SILENCE"
    action:
      ...
```

## 从类别迁移

从 iOS 版本 2021.5 开始，操作是在通知中内联指定的。要迁移，请执行以下操作：

1. 将 `actions` 数组添加到每个通知。例如：

```yaml
# 原始
action:
  - action: notify.mobile_app_<你的设备 ID>
    data:
      message: "家里发生了某件事！"
      data:
        push:
          category: "ALARM"
        url:
          _: "/lovelace/cameras" # 如果点击通知本身
          ALARM: "/lovelace/alarm" # 如果点击 'ALARM' 操作
# 替代
action:
  - action: notify.mobile_app_<你的设备 ID>
    data:
      message: "家里发生了某件事！"
      data:
        url: "/lovelace/cameras" # 如果没有选择操作则启动
        actions:
          # 为兼容性，可以使用动作的 YAML 定义
          # 例如，你可以使用 `identifier` 代替 `action`
          - action: "ALARM"
            title: "发出警报"
            destructive: true
            uri: "/lovelace/alarm"
          - action: "SILENCE"
            title: "静音警报"
```

2. 将你的事件触发器转换为新值

```yaml
# 原始
automation:
  - alias: "iOS 发出警报"
    trigger:
      - platform: event
        event_type: ios.notification_action_fired
        event_data:
          actionName: "ALARM"
    action:
      ...
# 替代
automation:
  - alias: "iOS 发出警报"
    trigger:
      - platform: event
        event_type: mobile_app_notification_action
        event_data:
          action: "ALARM"
    action:
      ...
```

上述内容是迁移所需的最低条件。你还可以像以前的示例一样重写自动化以使用 `wait_for_trigger`，尽管这工作量更大且不是严格必要的。

## 与不同设备的兼容性

![iOS](/assets/iOS.svg) 特定

### iOS 13 及更高版本

* 所有设备支持通过向右滑动并在锁屏上按 '查看' 来扩展通知，或按住，但在支持 3D Touch 的设备上你可能仍需施加一些力量才能做到。如果不在锁屏上，你也可以向下拉通知以扩展它。

### iOS 13 之前

*   对于支持 3D Touch 的设备 - 在通知上用力按下将扩展通知，显示下面的操作按钮。支持的设备包括 iPhone 6S、iPhone 6S Plus、iPhone 7、iPhone 7 Plus、iPhone 8、iPhone 8 Plus、iPhone X、iPhone XS 和 iPhone XS Max。如果不在锁屏上，你还可以向下拉通知以扩展它。

*   对于不支持 “3D Touch” 的设备（如 iPhone 6 及以下、iPhone SE、iPhone XR 和 iPads），你可以在通知上向左滑动，然后点击 '查看' 按钮。这将扩展通知并显示下面相关的操作按钮。如果不在锁屏上，你需要向下拉通知以扩展它。