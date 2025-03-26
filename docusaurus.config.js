module.exports = {
  title: 'Home Assistant Companion 文档',
  tagline: '使用 Home Assistant Companion 所需的一切',
  url: 'https://companion.home-assistant.io',
  baseUrl: '/',
  favicon: 'img/brand/favicon.png',
  organizationName: 'home-assistant', // 通常是你的 GitHub 组织/用户名。
  projectName: 'companion.home-assistant', // 通常是你的仓库名称。
  onBrokenLinks: 'ignore',
  i18n: {
    defaultLocale: 'cn',
    locales: ['cn'],
  },
  themeConfig: {
    navbar: {
      title: 'Companion 应用',
      logo: {
        alt: 'Home Assistant',
        src: 'img/brand/logo.svg',
        srcDark: 'img/brand/logo.svg',
      },
      items: [
        { to: '/docs/getting_started', label: '文档', position: 'left' },
        { to: '/download', label: '下载', position: 'left' },
        { to: '/docs/gallery/android', label: '画廊', position: 'left' },
        { to: '/docs/troubleshooting/more-help', label: '支持', position: 'left' },
        {
          href: 'https://www.github.com/home-assistant/iOS',
          label: 'GitHub (iOS)',
          position: 'right',
        },
        {
          href: 'https://www.github.com/home-assistant/android',
          label: 'GitHub (Android)',
          position: 'right',
        },
      ],
    },
    footer: {
      logo: {
        alt: "Home Assistant",
        src: "img/brand/logo-white.svg",
        height: "30px",
        href: "https://www.home-assistant.io",
      },
      style: 'dark',
      links: [
        {
          title: '社区',
          items: [
            {
              label: '论坛',
              href: 'https://community.home-assistant.io/c/mobile-apps/40'
            },
            {
              label: 'Discord',
              href: 'https://discord.com/channels/330944238910963714/1284965926336335993',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/home-assistant',
            },
          ],
        },
        {
          title: '社交',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/home_assistant',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/homeassistantio/',
            },
          ],
        },
      ],
      copyright: `版权所有 © ${new Date().getFullYear()} Home Assistant。由 Docusaurus 构建。`,
    scripts: [
      {
        src: 'https://hm.baidu.com/hm.js?861929bdb98476134bbae53567c75414',
        async: true,
      },
    ],
    },
    image: 'img/default-social.png'
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/home-assistant/companion.home-assistant/edit/master/',
          path: 'docs', // Ensure the path to the docs folder is correct
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],
};
