---
title: "Siri 快捷指令"
id: siri-shortcuts
---

![iOS](/assets/iOS.svg)<br />
通过 iOS 13 或更高版本以及 Home Assistant Companion App，您可以利用 Siri 快捷指令的强大功能，通过点击或语音命令来执行 Home Assistant 任务。

## 开始使用 - 示例快捷指令

作为示例，如果您想创建一个打开灯光的快捷指令（在此示例中为 `light.porch`）：

1. 打开快捷指令应用（默认包含在 iOS 中，如果您删除了，可以从 [App Store](https://apps.apple.com/us/app/shortcuts/id915249334) 重新安装）
2. 点击右上角的加号图标以创建一个新的快捷指令。
3. 点击添加操作并添加一个“字典”项。
4. 在字典项中，点击“添加新项”，点击“文本”，然后添加 `entity_id` 作为键，并将 `light.porch` 作为文本。
5. 点击大型加号以添加另一个操作，搜索“Home Assistant”并选择“调用服务”。
6. 点击“服务”，该选项在“调用服务时使用数据”中突出显示。
7. 在可用服务列表中滚动并找到 `light.turn_on`。
8. 点击“调用服务时使用数据”行末的箭头，在“服务器”字段中选择您希望执行此操作的 Home Assistant 服务器。
9. 只要字典操作位于 Home Assistant 操作的上方，就无需输入更多详细信息。如果您不希望使用字典操作，可以选择“显示更多”并在“服务数据”字段中按 JSON 格式输入操作数据。
10. 点击下一步并输入或录制一个名称/短语，以与“嘿 Siri”一起触发该快捷指令。

最终的快捷指令应该类似于这样：

<img className="center_image" alt="上述已完成的 Siri 快捷指令示例" src="/assets/siri-shortcut-example.jpg" />

## 快捷指令流程

在前面的示例中，我们使用字典操作来定义我们的操作数据，这是一个操作向快捷指令流程中的后续操作提供数据的示例。这些数据可以来自其他应用程序或 Home Assistant 提供的其他操作，例如渲染文本以获取 Home Assistant 中实体的状态。默认情况下，如果未提供其他流程或有效负载数据，则空字段将尝试使用您设备剪贴板上的数据。

## 操作

### 调用服务

您可以调用在 Home Assistant 中设置的任何操作（请参见 [开发工具中的操作页面](https://www.home-assistant.io/docs/tools/dev-tools/)）。如上 [示例所示](#getting-started---example-shortcut)。

### 触发事件

向 [Home Assistant 事件总线](https://www.home-assistant.io/docs/configuration/events/) 触发事件。

:::tip
必须是有效的 JSON。
:::

### 获取相机图像

从相机实体获取单个静帧并将其放置在剪贴板上或在后续操作中使用。

### 执行动作

执行一个 [动作](core/actions.md)。

### 渲染模板

渲染一个 [模板](https://www.home-assistant.io/docs/configuration/templating/)，然后可以在后续操作中使用。

### 发送位置

向 Home Assistant 发送位置。将尝试使用剪贴板内容作为位置，否则将使用当前位置。

### 更新传感器

更新所有传感器。

## 启动快捷指令

快捷指令深度集成到操作系统中。创建后，您有多种方式来启动它们。

* **Siri / 语音** - 您可以使用 Siri 从 iPhone、iPad、HomePod 或 Apple Watch 启动您创建的任何快捷指令。如果您的快捷指令命名为“就寝时间”，则命令为“嘿 Siri，就寝时间。”
* **小部件** - 快捷指令在今天视图中有一个小部件，可以通过从主屏幕或锁定屏幕向右滑动访问。在小部件屏幕的底部，按“编辑”，然后按绿色加号按钮将小部件添加到今天视图中。
* **快捷指令应用** - 在“My Shortcuts”标签中，只需点击您要启动的快捷指令。如果需要，顶部有一个搜索栏可以快速筛选您的快捷指令列表。
* **Apple Watch (watchOS 7)** - 在 iOS 14 和 watchOS7 中，您可以通过快捷指令 Apple Watch 应用或 Siri 表盘上的复杂功能启动快捷指令。
* **聚焦搜索** - 在您的 iOS 设备主屏幕上，向下滑动主屏幕中心以调出聚焦搜索。在这里，您可以输入快捷指令的名称并通过一次点击运行它。
* **添加到主屏幕** - 编辑任何快捷指令时，按右上角的（...）按钮以查看选项，然后按“添加到主屏幕”按钮。如果愿意，您可以自定义名称并提供自定义图标。
* **推送通知** - 快捷指令可以通过 [推送通知](#executing-a-shortcut-via-home-assistant-notifications) 启动。
* **双击返回 (iOS 14)** - 在 iOS 设置 > 辅助功能 > 触摸 > 双击返回中，您可以通过双击或三次点击 iPhone 的背面来启动任何快捷指令。

## 通过 Home Assistant 通知执行快捷指令

您可以通过通知从 Home Assistant 触发快捷指令，如下所示：

```yaml
- action: notify.mobile_app_<your_device_id_here>
  data:
    message: "触发一个快捷指令！"
    data:
      shortcut:
        name: "快捷指令名称"
        # 您可以提供任意数量的键和值
        # 所有值必须是字符串（例如，不是数字、数组、字典等）
        key_for_shortcut: "提供给快捷指令的值"
        another_key: "另一个值"
```

当您点击通知以启动 Home Assistant 时，它将重定向到快捷指令应用以执行给定的快捷指令。您可以通过 `shortcut` 中的以下键自定义此行为：

| 键 | 值 | 备注 |
| --- | ------ | ----- |
| `ignore_result` | 任何字符串，例如 `"ignore"` | 设置后，完成时不会重新打开 Home Assistant 应用程序，也阻止下面的事件触发。 |

:::note
如果快捷指令不需要任何输入，它可能看起来好像快捷指令应用根本没有启动。请检查执行的事件以查看结果。
:::

一旦您完成了快捷指令，它将返回 Home Assistant 并触发一个事件。触发的事件为 `ios.shortcut_run`，结果为快捷指令的结果，具有以下键：

| 键 | 值 | 描述 |
| -- | -- | -- |
| `status` | `成功`、`失败`、`取消` | 执行状态 |
| `result` | 变化 | 快捷指令本身提供的结果 |
| `error` | 字典，键 `error-Code` 和 `errorMessage` | 如果失败，则为快捷指令应用的错误描述 |
| `input` | 变化 | 操作中的 `shortcut` 值 |
| `name` | 变化 | 操作中的 `shortcut.name` 值 |

## 个人自动化

通过快捷指令个人自动化，您可以充分利用两全其美 - 使用 iOS 触发器来执行 Home Assistant 操作。一些有用的 iOS + Home Assistant 组合灵感的示例：

* 在您停止或打盹 iPhone 上的闹钟后触发您的 Home Assistant “晨间例程”自动化。
* 当您在 Apple Watch 上开始锻炼时，使用 Home Assistant 播放您的锻炼播放列表。当您在 Apple Watch 上完成锻炼时，使用 Home Assistant 打开风扇以降温。
* 通过在连接或断开 CarPlay 或连接到您的汽车蓝牙系统时切换 Home Assistant 中的 `input_boolean` 来确保 Home Assistant 中完美的汽车存在。
* 您可以确保任何使用 iOS 应用“电池状态”传感器的 Home Assistant 自动化立即运行，通过创建一个使用“充电器”触发器（iOS 17）的快捷指令个人自动化，并结合“发送位置” Home Assistant 应用操作。这个示例使用的是在夜间手机插入充电时立即触发就寝例程，而不是等待下一个传感器的后台更新。
* 在您的药瓶盖上放置一个 NFC 标签。每次您服药时，使用 iPhone 扫描 NFC 标签。 Home Assistant 可以保留您服药的精确时间记录，累加一个 [计数器](https://www.home-assistant.io/integrations/counter/)，这将帮助您知道何时补充处方等等。

要在快捷指令应用中创建个人自动化，转到“自动化”标签，按右上角的“+”按钮，然后点击“创建个人自动化”按钮。如果您在快捷指令应用中没有现有的自动化，只需点击“创建个人自动化”按钮。在 iOS 17 中有 21 个可用触发器。有关创建个人自动化的更多信息，请参见苹果 [快捷指令用户指南](https://support.apple.com/guide/shortcuts/create-a-new-personal-automation-apdfbdbd7123/3.5/ios/13.5)。

在 iOS 17 中，所有个人自动化触发类型可以自动运行，无需任何交互，除了“我通勤前”触发器以外。