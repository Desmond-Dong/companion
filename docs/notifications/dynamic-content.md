---
title: "动态附件"
id: "dynamic-content"
---

![iOS](/assets/iOS.svg) 特定<br />
动态内容，如地图和摄像头流，可以作为通知的一部分显示，而无需打开应用程序。

## 地图
将显示一个中心地图，红色钉子位于给定的坐标上。

```yaml
action: notify.mobile_app_<你的设备ID在这里>
data:
  message: 家里发生了些事情！
  data:
    action_data:
      latitude: "40.785091"
      longitude: "-73.968285"
```

### iOS 2021.5之前

在![iOS](/assets/iOS.svg) 版本2021.5之前，您需要包含一个`category`，如：

```yaml
action: notify.mobile_app_<你的设备ID在这里>
data:
  message: 家里发生了些事情！
  data:
    action_data:
      latitude: "40.785091"
      longitude: "-73.968285"
    # 兼容iOS 2021.5之前的版本
    push:
      category: map
```

请注意，要发送地图，您必须发送一个推送`category`，该类别必须称为`map`，`map1`，`map2`，`map3`或`map4`，否则您将无法收到地图。

### 缩放级别

为了更改地图的默认缩放级别，可以使用`action_data`下的以下属性。如果未设置，将使用默认值`0.1`度。

| 名称 | 类型 | 描述 |
| ------------ | ------------- | ------------- |  
| `latitude_delta:` | string | 显示的南北距离（以度为单位）。 |
| `longitude_delta:` | string | 显示的东西距离（以度为单位）。 |

### 显示第二个钉子

您可以使用`action_data`下的以下属性来显示第二个钉子。如果使用，第一根钉子将是红色，第二根钉子将是绿色。

| 名称 | 类型 | 描述 |
| ------------ | ------------- | ------------- |  
| `second_latitude:` | string | 第二个钉子的纬度。 |
| `second_longitude:` | string | 第二个钉子的经度。 |
| `shows_line_between_points:` | boolean | 显示连接第一和第二个钉子的线。 |

### 额外配置

您还可以在`action_data`下传递以下选项属性，以多种方式修改地图。此处列出的所有选项都接受布尔值（`true` / `false`）。

| 名称 | 类型 | 描述 |
| ------------ | ------------- | ------------- |
| `shows_compass:` | boolean | 在地图上显示指南针控制。 |
| `shows_points_of_interest:` | boolean | 在地图上显示兴趣点(POI)信息。 |
| `shows_scale:` | boolean | 在地图上显示比例信息。 |
| `shows_traffic:` | boolean | 在地图上显示交通信息。 |
| `shows_user_location:` | boolean | 尝试在地图上显示用户的位置。 |

![地图动态内容的示例。](/assets/ios/map.png)

## 摄像头流

通知的预览缩略图将显示摄像头的静态图像。当展开时，通知内容会显示实时的MJPEG流，如果相机支持它。

您可以使用附件参数`content-type`和`hide-thumbnail`与摄像头一起控制缩略图。

```yaml
action: notify.mobile_app_<你的设备ID在这里>
data:
  message: 客厅检测到运动
  data:
    entity_id: camera.living_room_camera
```

### iOS 2021.5之前

在![iOS](/assets/iOS.svg) 版本2021.5之前，您需要包含一个`category`，如：

```yaml
action: notify.mobile_app_<你的设备ID在这里>
data:
  message: 客厅检测到运动
  data:
    entity_id: camera.living_room_camera
    # 兼容iOS 2021.5之前的版本
    push:
      category: camera
```

请注意，要发送摄像头图像，您必须发送一个推送类别，该类别必须称为`camera`，`camera1`，`camera2`，`camera3`或`camera4`，否则您将无法收到摄像头图像。

## 在iOS 2021.5之前与可操作通知结合

在2021.5之前的版本中，`category`键用于告诉设备使用哪种内容扩展。您可以在自己的自定义[操作](actionable.md)中使用相同的类别标识符，以向内容扩展添加操作。

例如，此配置为摄像头内容消息添加操作。

```yaml
ios:
  push:
    categories:
      - name: 带有操作的摄像头
        identifier: 'camera'
        actions:
          - identifier: 'OPEN_COVER'
            title: '打开覆盖'
            activationMode: 'background'
            authenticationRequired: true
            destructive: no
          - identifier: 'CLOSE_COVER'
            title: '关闭覆盖'
            activationMode: 'background'
            authenticationRequired: true
            destructive: true
```

## 故障排除

如果您在接收这些特殊通知时遇到问题，请首先尝试重新启动您的手机。扩展有时无法正确注册，直到重新启动。