import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Target, Users, Award } from '../../components/Icons';

const PlatformOverviewPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const platforms = [
    {
      name: '淘宝/天猫',
      description: '国内最早的电商平台之一，截至2024年，月活跃用户数超过8亿，覆盖了从低端到中高端的广泛消费群体。',
      features: ['全消费层级覆盖', '中高端与大众品牌并存', '用户年龄跨度大'],
      userAge: '18-30岁占35%，31-40岁占25%，41岁以上占40%',
      suitable: '适配各类风格服饰与家居用品',
      badgeColor: 'var(--still)'
    },
    {
      name: '京东',
      description: '以自营业务起家，2024年自营商品市场占有率稳居前列，用户对其品质与物流服务信赖度高。',
      features: ['自营品质保证', '48小时物流服务', '中高端消费人群'],
      userAge: '25-35岁占40%，36-45岁占35%',
      suitable: '适配3C数码、家电、母婴等高品质品类',
      badgeColor: 'var(--dawn)'
    },
    {
      name: '拼多多',
      description: '凭借拼团模式崛起，2024年在下沉市场占据主导，核心用户为三四线城市及农村消费者。',
      features: ['拼团模式', '下沉市场主导', '价格敏感型消费者'],
      userAge: '18-30岁占45%，31-40岁占35%',
      suitable: '适配农产品、日用品、低价服饰等轻量级品类',
      badgeColor: 'var(--still)'
    },
    {
      name: '抖音',
      description: '内容电商典范，2024年电商GMV同比增长超50%，以18-35岁年轻群体为主。',
      features: ['内容电商', '短视频带货', '年轻用户群体'],
      userAge: '18-25岁占30%，26-35岁占40%',
      suitable: '适配服装、美妆、家居用品等时尚快消品类',
      badgeColor: 'var(--dawn)'
    },
    {
      name: '小红书',
      description: '以社区种草与内容营销为特色，用户以女性为主，消费层级较高。',
      features: ['社区种草', '内容营销', '女性用户为主'],
      userAge: '女性占80%，18-30岁占60%',
      suitable: '适配美妆、时尚、家居等品类',
      badgeColor: 'var(--still)'
    }
  ];

  const selectionStrategies = [
    {
      title: '目标用户',
      description: '依目标客户选平台。年轻时尚群体选抖音，中高端消费者选天猫或京东。',
      icon: Users
    },
    {
      title: '产品属性',
      description: '高客单价高附加值产品适配天猫或京东，快消低价产品适配拼多多或抖音。',
      icon: BookOpen
    },
    {
      title: '品牌调性',
      description: '高端奢华品牌适配天猫，亲民接地气品牌适配拼多多。',
      icon: Award
    },
    {
      title: '预算规划',
      description: '天猫入驻保证金高但营销资源丰；拼多多入驻门槛低，营销成本低。',
      icon: Target
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen py-20 px-4">
      <div className="container mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            国内主流平台概览与选择策略
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            全面介绍国内如淘宝、抖音、拼多多等主流平台，让学生知晓各平台的定位、用户群体等情况，学会依据自身业务类型、产品属性等来挑选适配平台。
          </p>
        </div>

        {/* 主流平台对比 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>国内主流电商平台对比</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={platform.name}
                className="glass-card rounded-2xl p-6 h-full"
                style={{
                  background: 'rgba(216, 207, 213, 0.16)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{platform.name}</h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{platform.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>核心特点：</h4>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
                    {platform.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ background: 'var(--still)' }}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>用户年龄分布：</h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{platform.userAge}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>适配品类：</h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{platform.suitable}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 用户群体与定位差异 */}
        <div className="mb-16">
          <div
            className="glass-card rounded-2xl p-8"
            style={{
              background: 'rgba(216, 207, 213, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.25)'
            }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>用户群体与定位差异</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--still)' }}>内容导向平台</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>抖音</h4>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>依赖优质内容吸流转化，达人发布"穿搭教程+商品链接"视频，2023年一穿搭达人视频带来5万+商品点击，销售额100万元。</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>小红书</h4>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>博主通过"产品测评+使用场景"笔记激发种草，某美妆博主粉底液测评笔记获10万+浏览，引导2万+商品购买。</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--dawn)' }}>流量导向平台</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>淘宝</h4>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>依赖搜索与推荐流量，用户搜索"连衣裙"，40%通过平台推荐款式进入商品页。</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>京东</h4>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>首页推荐算法根据用户习惯推荐商品，2023年首页推荐带来30%商品点击量。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 选平台策略 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>选平台策略</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {selectionStrategies.map((strategy, index) => {
              const IconComponent = strategy.icon;
              return (
                <div
                  key={strategy.title}
                  className="glass-card rounded-xl p-6 h-full text-center"
                  style={{
                    background: 'rgba(216, 207, 213, 0.16)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{
                      background: `linear-gradient(135deg, var(--still) 0%, var(--still) 45%, rgba(154, 139, 143, 0.95) 100%)`,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35), inset 0 1px 3px rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <IconComponent className="w-8 h-8" style={{ color: '#FFFFFF' }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{strategy.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{strategy.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 品类匹配与平台定位 */}
        <div className="mb-16">
          <div
            className="glass-card rounded-2xl p-8"
            style={{
              background: 'rgba(216, 207, 213, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.25)'
            }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>各平台擅长品类</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--still)' }}>淘宝/天猫</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>全品类覆盖，服饰、家居、美妆个护优势显著</p>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <p>2023年淘宝服饰类销售额占30%</p>
                  <p>家居类20%，美妆个护类25%</p>
                </div>
              </div>

              <div className="p-6 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--dawn)' }}>京东</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>3C数码、家电、母婴、生鲜主导</p>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <p>2023年京东3C数码类销售额40%</p>
                  <p>家电类30%，母婴类20%，生鲜类10%</p>
                </div>
              </div>

              <div className="p-6 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--still)' }}>拼多多</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>农产品、日用品、低价服饰、家居百货突出</p>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <p>2023年拼多多农产品销售额30%</p>
                  <p>日用品25%，低价服饰20%，家居百货15%</p>
                </div>
              </div>

              <div className="p-6 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--dawn)' }}>抖音</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>服装、美妆、家居用品、食品饮料时尚快消增长迅猛</p>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <p>2023年抖音服装类销售额30%</p>
                  <p>美妆类25%，家居用品类20%，食品饮料类15%</p>
                </div>
              </div>

              <div className="p-6 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--still)' }}>小红书</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>美妆、时尚、家居、母婴、健身种草重点</p>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <p>2023年小红书美妆类笔记30%</p>
                  <p>时尚类25%，家居类20%，母婴类15%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 导航到下一课程 */}
        <div className="text-center">
          <Link to="/course/shop-types">
            <div
              className="inline-flex items-center px-8 py-4 rounded-full font-medium transition-all duration-300 btn-primary"
            >
              下一节课：店铺类型与经营品类匹配规则
              <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlatformOverviewPage;