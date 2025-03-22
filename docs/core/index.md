---
title: 功能概述
id: 'core'
---

Home Assistant Companion App 提供了一种便捷的方式来查看和控制您的 Home Assistant 实例，同时还通过允许您的设备充当数据源来扩展您实例的功能。Home Assistant Companion App 添加了众多 [传感器](sensors.md)（例如电池和网络状态等），创建一个 `device_tracker` 实体以允许从设备发送 [位置](location.md) 更新，并且还提供 [动作快捷方式](actions.md) 来触发脚本或自动化。

目前并非所有功能都受 Android 支持，但最终大多数功能将受到支持。请查找 ![Android](/assets/android.svg) Android 标志以查看当前支持的功能。

## 功能比较：

<table className="core-table">
  <thead>
    <tr>
      <th><strong>集成</strong></th>
      <th><img alt="Android" src="/assets/android.svg" /> 完整</th>
      <th><img alt="Android" src="/assets/android.svg" /> 最小</th>
      <th><img alt="iOS" src="/assets/iOS.svg" /></th>
      <th><img alt="macOS" src="/assets/macOS.svg" /></th>
      </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/docs/core/actions">动作</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/android-device-controls">Android 设备控制</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/android-quick-settings">Android 快速设置</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/android-shortcuts">Android 快捷方式</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/android-webview">Android WebView</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/android-widgets">Android 小部件</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/app-events">应用事件</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/haptics">触觉反馈</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/siri-shortcuts">Siri 快捷方式</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/sharing">共享</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/theming">主题</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/url-handler">URL 处理</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/universal-links">通用链接</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/x-callback-url">X-Callback-URL</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th><strong>位置更新</strong></th>
      <th><img alt="Android" src="/assets/android.svg" /> 完整</th>
      <th><img alt="Android" src="/assets/android.svg" /> 最小</th>
      <th><img alt="iOS" src="/assets/iOS.svg" /></th>
      <th><img alt="macOS" src="/assets/macOS.svg" /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/docs/core/location#overview">应用打开</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#overview">应用刷新</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#overview">后台</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#location-tracking-in-home-assistant-zones">进入/退出区域</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#ibeacons">iBeacon</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#sending-an-intent">意图</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-commands#request-location-updates">通知</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#location-tracking-when-outside-a-home-assistant-zone">重要位置改变</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#overview">URL 处理</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#overview">X-Callback-URL</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th><strong>通知</strong></th>
      <th><img alt="Android" src="/assets/android.svg" /> 完整</th>
      <th><img alt="Android" src="/assets/android.svg" /> 最小</th>
      <th><img alt="iOS" src="/assets/iOS.svg" /></th>
      <th><img alt="macOS" src="/assets/macOS.svg" /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/docs/notifications/actionable-notifications">可操作的</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#alert-once">仅一次警报</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#badge">徽章</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-channels">频道</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-cleared">已清除</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-color">颜色</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-commands">命令</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/critical-notifications">重要警报</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/dynamic-content">动态附件</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#grouping">分组</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-message-html-formatting">HTML 格式化</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-icon">图标</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-attachments">图像</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-channel-importance">重要性</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-led-color">LED 颜色</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-local">本地推送</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic">消息</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#opening-a-url">打开 URL</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#persistent-notification">持久</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#presentation-options">演示选项</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#clearing">可替换通知</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-commands#request-location-updates">请求位置更新</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-sounds">声音</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-status-bar-icon">状态栏图标</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#sticky-notification">粘性</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#subtitle--subject">主题 / 副标题</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#text-to-speech-notifications">文本转语音</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-timeout">超时</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic">标题</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-vibration-pattern">振动模式</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-attachments">视频</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th><strong>传感器</strong></th>
      <th><img alt="Android" src="/assets/android.svg" /> 完整</th>
      <th><img alt="Android" src="/assets/android.svg" /> 最小</th>
      <th><img alt="iOS" src="/assets/iOS.svg" /></th>
      <th><img alt="macOS" src="/assets/macOS.svg" /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/docs/core/sensors#active-sensor">活动传感器</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors">活动相机</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors">活动麦克风</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#activity-sensors">活动传感器</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#android-auto-sensor">Android 自动传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#android-os-sensors">Android OS 传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#app-data-sensors">应用数据传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#app-importance-sensor">应用重要性传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#app-memory-sensor">应用内存传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#app-usage-sensors">应用使用传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#audio-sensors">音频传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#pedometer-sensors">平均活动步伐</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#battery-sensors">电池电量</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#battery-sensors">电池状态</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#bluetooth-sensors">蓝牙传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#connection-type-sensor">BSSID</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors">正在使用的相机</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#connection-type-sensor">连接类型</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#current-time-zone-sensor">当前时区</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#current-version-sensor">当前版本</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors">显示屏</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#pedometer-sensors">距离</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#do-not-disturb-sensor">请勿打扰</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#doze-sensor">休眠</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#dynamic-color-sensor">动态颜色</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#pedometer-sensors">上楼层数</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#pedometer-sensors">下楼层数</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#frontmost-app-sensor">最前端的应用</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#geocoded-location-sensor">地理位置</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#health-connect-sensors">健康连接</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#high-accuracy-mode">高精度模式</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#high-accuracy-update-interval">高精度更新间隔</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#interactive-sensor">交互式</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#keyguard-sensors">锁屏传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#last-reboot-sensor">最后重启</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#last-update-trigger-sensor">最后更新触发器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#last-used-app-sensor">最后使用的应用</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#light-sensor">光</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors">正在使用的麦克风</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#mobile-data-sensors">移动数据传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#notification-sensors">通知传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#phone-sensors">电话传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#power-save-sensor">省电模式</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#pressure-sensor">压力</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors">主要显示 ID & 名称</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#proximity-sensor">接近传感器</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#public-ip-sensor">公共 IP</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#next-alarm-sensor">下一个闹钟</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#cellular-provider-sensor">SIM 卡 1</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#cellular-provider-sensor">SIM 卡 2</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors">SSID</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#pedometer-sensors">步数</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#storage-sensor">存储</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#traffic-stats-sensor">流量统计</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#work-profile-sensor">工作配置文件</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>