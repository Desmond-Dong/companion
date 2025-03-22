import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

const features = [
  {
    title: <>文档结构</>,
    description: (
      <>
        <p>
          <b><a href='/docs/getting_started'>入门指南</a></b> 了解你的新朋友。
          <br />
          <b><a href='/docs/core'>核心功能</a></b> Companion App 的最佳功能。
          <br />
          <b><a href='/docs/notifications/notifications-basic'>通知</a></b>
          {' '}即使不在家也能保持随时了解。
          <br />
          <b><a href='docs/integrations'>集成</a></b>
          {' '}将 Home Assistant 集成到 Android 和 iOS 的所有方式。
          <br />
          <b><a href='/docs/apple-watch'>Apple Watch</a></b>
          {' '}通过你的手表应用进行操作和复杂功能。
          <br />
          <b><a href='/docs/wear-os'>Wear OS</a></b>
          {' '}通过你的 Wear OS 设备控制你的家。
          <br />
          <b><a href='/docs/android-auto'>Android Auto/Automotive</a></b>
          {' '}通过你的 Android Auto/Automotive 兼容车辆控制你的家。
          <br />
          <b><a href='/docs/carplay'>CarPlay</a></b>
          {' '}通过你的 CarPlay 兼容车辆控制你的家。
          <br />
          <b><a href='/docs/meta-quest'>Meta Quest</a></b>
          {' '}将你的 Quest 数据导入 Home Assistant。
          <br />
          <b><a href='/docs/troubleshooting/faqs'>故障排除</a></b>
          {' '}如果你需要帮助，这是一个很好的起点。
          <br />
          <b><a href='/docs/gallery/android'>画廊</a></b>
          {' '}应用程序的截图。
        </p>
      </>
    ),
  },
  {
    title: <>获取应用程序</>,
    description: (
      <>
        <a href='https://play.google.com/store/apps/details?id=io.homeassistant.companion.android&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' style={{ display: 'inline-block' }}>
          <img class="download-badge" width="200" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt='在 Google Play 上获取' />
        </a>
        <br />
        <a href="https://apps.apple.com/app/home-assistant/id1099568401?itsct=apps_box_badge&amp;itscg=30200" style={{ display: 'inline-block', width: '200px' }}>
          <img class="download-badge" width="175" src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1492214400&h=3ef4307fa479838e52fe9bd8bd17913b" alt="在 App Store 上下载" />
        </a>
        <br />
        <a href="https://f-droid.org/packages/io.homeassistant.companion.android.minimal" style={{ display: 'inline-block', width: '200px' }}>
          <img class="download-badge" width="200" src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png" alt="在 F-Droid 上获取" />
        </a>
        <br />
        <a href="https://sidequestvr.com/app/6427/home-assistant" style={{ display: 'inline-block', width: '200px' }}>
          <img class="download-badge" width="175" src="https://sidequestvr.com/assets/images/branding/Get-it-on-SIDEQUEST.png" alt="在 SideQuest 上下载" />
        </a>
        <h2>测试版发布</h2>
         <ul>
          <li><a href="https://testflight.apple.com/join/1AlPbnLZ">
             Home Assistant for iOS (Testflight)
          </a>
        </li>
          <li><a href="https://play.google.com/apps/testing/io.homeassistant.companion.android">
            Home Assistant for Android
          </a>
        </li>
        </ul>
        <h2>源代码</h2>
        <ul>
          <li><a href="https://github.com/home-assistant/iOS">
            Home Assistant for iOS
          </a>
          </li>
          <li><a href="https://github.com/home-assistant/android">
            Home Assistant for Android
          </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    title: <>热门部分</>,
    description: (
      <>
        <ul style={{ flex: "1" }}>
          <li><a href='/docs/getting_started'>
            入门指南
          </a></li>
          <li><a href='/docs/notifications/actionable-notifications'>
            可操作的通知
          </a></li>
          <li><a href='/docs/integrations/url-handler'>
            URL 处理程序
          </a></li>
        </ul>
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <h2>{title}</h2>
      {description}
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Welcome to the Home Assistant App docs">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className="row">
            <div className={clsx('col col--10')}>
              <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
              <p className={styles.heroTagline}>{siteConfig.tagline}</p>
              <div className={styles.buttons}>
                <Link
                  className={clsx(
                    'button button--outline button--secondary button--lg',
                    styles.getStarted,
                  )}
                  to={useBaseUrl('docs/getting_started')}>
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

    </Layout>
  );
}

export default Home;
