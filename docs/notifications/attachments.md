---
title: "标准附件"
id: notification-attachments
---

通知可以包含图像、视频或音频文件附件，这些附件将与通知一起显示。请参见[支持的媒体表](#supported-media-types)以获取各平台的支持情况。

## 下载

附件是图像、视频或音频文件，在接收通知时下载到设备，并与通知一起显示。当通知未展开时，会显示缩略图。当通知展开时，全尺寸附件将被显示。

您可以将其保存到多个位置，并可以使用[`camera.snapshot`](https://www.home-assistant.io/integrations/camera#action-snapshot)操作来保存快照。

:::note
附件必须能够从互联网上访问，但不一定需要无身份验证访问。请参见以下来源。
:::

### `media_source`（推荐）

[`media_source`集成](https://www.home-assistant.io/integrations/media_source)的优点是访问需要身份验证头（Home Assistant提供给伴随应用程序）。这意味着内容不对公众开放。

您可以使用格式为`/media/local/direct.jpg`的相对URL与此集成一起使用。

:::info
存储在磁盘`/media/file.jpg`中的文件在通知中表示为`/media/local/file.jpg`。请注意路径中`local`部分的添加。
:::

### `www` 文件夹

您会想将图像存储在位于您的Home Assistant [配置目录](https://www.home-assistant.io/docs/configuration/)中的`www`文件夹中。这将使图像暴露到互联网上，以便您可以在通知中使用它，并在任何地方接收这些通知。

您可以使用格式为`/local/file.jpg`的URL与此集成一起使用。

:::info
存储在磁盘`/www/file.jpg`中的文件在通知中表示为`/local/file.jpg`。请注意路径中`local`部分的变化。
:::

## 自动快照

![Android](/assets/android.svg) Android用户也可以使用`/api/camera_proxy/camera.name`，其中`camera.name`被替换为您希望使用的摄像头的实体ID。

![iOS](/assets/apple.svg) iOS用户可以使用[动态附件中的摄像头流](dynamic-content.md#camera-stream)。

:::tip
要在3D Touch设备上展开通知，只需强按任何通知。在非3D Touch设备上，向左滑动并点击“查看”按钮。
:::

## 图像实体

图像实体中的图像可以使用`/api/image_proxy/image.name`，其中`image.name`被替换为您希望使用的图像实体的实体ID。

## 支持的媒体类型

请确保您的附件符合以下标准，否则将不会显示。

| 附件类型  | 最大文件大小 | 允许的格式 | 支持的平台  |
| :-------: | --------------- | ------------------|------------------------- |
|    图像    | 10 MB    | JPEG, GIF, PNG          | ![Android](/assets/android.svg) Android & ![iOS](/assets/iOS.svg) |
|   视频   | 50 MB   | MPEG, MPEG2, MPEG4, AVI   | ![Android](/assets/android.svg) Android & ![iOS](/assets/iOS.svg) |
|   音频    | 5 MB  | AIFF, WAV, MP3, MPEG4 Audio          | ![iOS](/assets/iOS.svg) |

![iOS](/assets/iOS.svg) 版本2021.5或更高版本将在打开内容时尝试重新下载更大的文件，如果它们超出了大小限制。

## 参数

您可以使用以下键添加附件。请参见上述支持的媒体类型。所有提供的URL必须可以通过互联网访问。

| 键 | 示例值 |
| -- | -- |
| `video` | `/media/local/video.mp4`<br /><br />`https://example.com/video.mp4` |
| `image` | `/media/local/photo.jpg`<br /><br />`https://example.com/image.jpg` |
| `audio` | `/media/local/audio.mp3`<br /><br />`https://example.com/audio.mp3` |

如果存在，值将按照上述表格的顺序使用。例如，您可以指定`audio`和`image`，iOS将选择音频，而Android将选择图像。

:::info ![Android](/assets/android.svg) &nbsp; 注意：
*   如果您设置了[`icon_url`](basic.md#notification-icon)和`image`属性，则设备上只会显示图像。
*   如果您设置了`image`和`video`属性，则设备上只会显示视频。
*   视频将显示为从视频文件捕获的一系列帧。它将与小于10秒的视频效果不佳。
*   GIF将仅在Android 14+的通知阴影中动画播放。
:::

## 示例操作

```yaml
automation:
  - alias: 通知移动应用附件
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "家里发生了某事！"
          data:
            # 绝对URL示例
            image: "https://www.home-assistant.io/images/default-social.png"
            # 相对URL示例
            image: "/media/local/image.png"
            # 同样适用于视频
            video: "/media/local/video.mp4"
            # 也适用于音频
            audio: "/media/local/audio.mp3"
```

## 视觉示例

一个未展开的推送通知，其中包含图像附件：

![未展开的推送通知附带附件。](/assets/ios/attachment.png)

同一通知，但展开以显示全尺寸图像附件：

![同一通知，但展开以显示全尺寸附件](/assets/ios/expanded_attachment.png)

## 配置
![iOS](/assets/iOS.svg) 特定<br />

 [请参见支持的媒体表](#supported-media-types)

您可以使用以下格式自定义通知中的附件：

 ```yaml
- action: notify.mobile_app_<your_device_id_here>
  data:
    message: "家里发生了某事！"
    data:
      attachment:
        # 隐藏缩略图，仅在长按/3D触摸通知时显示
        hide-thumbnail: true
 ```

-   **url**（*可选*）：作为附件使用的内容的URL。此URL *必须* 能够从Internet访问，或者接收设备必须与托管内容在同一网络上。此参数会覆盖任何`image`、`video`或`audio`的值。
-   **content-type**（*可选*）：默认情况下，如果提供了`url`，将检查URL的扩展名以确定文件类型，或者从`image`、`video`和`audio`键推断。如果没有扩展名/无法确定，您可以手动提供文件扩展名。
-   **hide-thumbnail**（*可选*）：如果设置为`true`，则缩略图将不会在通知上显示。内容仅可通过展开查看。
-   **lazy**（*可选*）：需要![iOS](/assets/iOS.svg) v2021.5或更高版本。如果设置为`true`，则附件将不会立即下载，仅在查看通知时加载。使用此选项避免下载明显过大的附件，但如果它们只是偶尔太大，则不应提供此键，因为应用程序可以尝试两者。

![Android](/assets/android.svg) Android 特定

 [请参见支持的媒体表](#supported-media-types)

- `GIF`文件类型将仅在Android 14+的通知阴影中动画播放。