/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  docs: {
    '入门指南': [
      'getting_started/getting-started'],
    '核心功能': [
      'core/core',
      'core/actions',
      'core/android-flavors',
      'core/location',
      'core/sensors'],
    '通知': [
      'notifications/notifications-basic',
      'notifications/actionable-notifications',
      {
        'type': 'category',
        'label': '附件',
        'items': [
          'notifications/notification-attachments',
          'notifications/dynamic-content'
        ]
      },
      'notifications/critical-notifications',
      'notifications/notification-details',
      'notifications/notification-cleared',
      'notifications/notification-commands',
      'notifications/notification-sounds',
      'notifications/notification-local',
      'notifications/notification-received',
    ],
    '集成': [
      'integrations/integrations',
      'integrations/android-device-controls',
      'integrations/android-quick-settings',
      'integrations/android-shortcuts',
      'integrations/android-webview',
      'integrations/android-widgets',
      'integrations/app-events',
      'integrations/haptics',
      'integrations/sharing',
      'integrations/siri-shortcuts',
      'integrations/theming',
      'integrations/universal-links',
      'integrations/url-handler',
      'integrations/x-callback-url'],
    'Apple Watch': [
      'apple-watch/apple-watch',
      'apple-watch/watch-actions',
      'apple-watch/complications'
    ],
    'Wear OS': [
      'wear-os/wear-os',
      'wear-os/sensors'
    ],
    'Android Auto/Automotive': [
      'android-auto/android-auto'
    ],
    'CarPlay': [
      'carplay/carplay'
    ],
    'Meta Quest': [
      'meta-quest/meta-quest'
    ],
    '故障排除': [
      'troubleshooting/faqs',
      'troubleshooting/errors',
      'troubleshooting/networking',
      'troubleshooting/resetting',
      'troubleshooting/故障排除-集成',
      'troubleshooting/more-help'
    ]
  },
  gallery: {
    '画廊': [
      'gallery/android'
    ]
  },
};
