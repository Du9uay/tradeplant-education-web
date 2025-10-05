import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Target, Users, Award, Settings, Cpu, Network } from '../../components/Icons';

const ShopTypesPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const shopTypes = [
    {
      title: '旗舰店',
      description: '品牌方直接运营，仅售该品牌商品，强调唯一性专业性。',
      features: [
        '品牌专营，全品类产品展示',
        '需拥有商标证等相关资质',
        '强化品牌形象和消费者信任度',
        '采用OCR技术自动识别商标信息'
      ],
      example: '苹果官方旗舰店2023年京东销售额10亿元，装修按苹果品牌风格设计',
      badgeColor: 'var(--still)',
      icon: Award
    },
    {
      title: '专营店',
      description: '可售多品牌同类商品，专注某一品牌系列。',
      features: [
        '多品牌同类商品经营',
        '需要各品牌授权文件',
        '提供更多品牌选择',
        '采用智能库存管理技术'
      ],
      example: '某相机专营店2023年销售额5000万元，按品牌款式分类展示',
      badgeColor: 'var(--dawn)',
      icon: Network
    },
    {
      title: '专卖店',
      description: '仅售单一品牌商品，需品牌方授权。',
      features: [
        '单一品牌专属店铺',
        '需品牌方独家授权证明',
        '深入展示品牌特色产品',
        '运用AR技术提供虚拟试穿体验'
      ],
      example: '耐克专卖店2023年淘宝销售额2亿元，突出耐克品牌元素',
      badgeColor: 'var(--still)',
      icon: Target
    },
    {
      title: '个人店',
      description: '个人运营，资质要求低，适配轻量级低资质品类。',
      features: [
        '个人身份证即可开店',
        '适合初创或小规模经营',
        '灵活运营，成本较低',
        '运用AI客服技术提升效率'
      ],
      example: '某个人店2023年拼多多销售额100万元，主营农副产品',
      badgeColor: 'var(--dawn)',
      icon: Users
    }
  ];

  const matchingRules = [
    {
      category: '服装品牌',
      rule: '自有品牌选旗舰店，代理多品牌选专营店',
      requirements: '商标注册证、品牌授权书等',
      badgeColor: 'var(--still)'
    },
    {
      category: '食品饮料',
      rule: '有品牌资质选专营/旗舰，无品牌资质选个人店',
      requirements: '食品生产许可证、商标证等',
      badgeColor: 'var(--dawn)'
    },
    {
      category: '数码产品',
      rule: '官方直营选旗舰店，授权代理选专营/专卖店',
      requirements: '品牌授权文件、3C认证等',
      badgeColor: 'var(--still)'
    },
    {
      category: '农副产品',
      rule: '小农户个人店，合作社或品牌选专营店',
      requirements: '生产者身份证明或合作社证明',
      badgeColor: 'var(--dawn)'
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            店铺类型与经营品类匹配规则
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            学习如何依据自身经营方向选定合适店铺类型，清楚不同经营品类对应的资质要求，掌握精准匹配店铺类型与经营品类的方法。
          </p>
        </div>

        {/* 店铺类型详解 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>主要店铺类型</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {shopTypes.map((shop, index) => {
              const IconComponent = shop.icon;
              return (
                <div
                  key={shop.title}
                  className="glass-card rounded-2xl p-8"
                  style={{
                    background: 'rgba(216, 207, 213, 0.16)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                      style={{
                        background: `linear-gradient(135deg, ${shop.badgeColor} 0%, ${shop.badgeColor} 45%, rgba(154, 139, 143, 0.95) 100%)`,
                        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                    </div>
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{shop.title}</h3>
                  </div>
                  
                  <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{shop.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>特点与优势：</h4>
                    <ul className="space-y-2">
                      {shop.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <span className="w-1.5 h-1.5 rounded-full mr-3 mt-2" style={{ background: shop.badgeColor }}></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>实际案例：</h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{shop.example}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 品类匹配规则 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>品类匹配规则</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {matchingRules.map((rule, index) => (
              <div
                key={rule.category}
                className="glass-card rounded-xl p-6"
                style={{
                  background: 'rgba(216, 207, 213, 0.16)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="w-3 h-8 rounded-full mr-4"
                    style={{ background: rule.badgeColor }}
                  ></div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{rule.category}</h3>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--still)' }}>匹配规则：</h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{rule.rule}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--dawn)' }}>资质要求：</h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{rule.requirements}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 选择策略总结 */}
        <div className="mb-16">
          <div
            className="glass-card rounded-2xl p-8"
            style={{
              background: 'rgba(216, 207, 213, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.25)'
            }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>选择策略总结</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'linear-gradient(135deg, var(--still) 0%, rgba(216, 207, 213, 0.8) 100%)'
                  }}
                >
                  <Target className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>资质优先</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  根据现有商标、授权等资质状况，选择对应的店铺类型，避免不符合平台要求。
                </p>
              </div>
              
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'linear-gradient(135deg, var(--dawn) 0%, rgba(216, 207, 213, 0.8) 100%)'
                  }}
                >
                  <BookOpen className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>品类匹配</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  依据经营品类特性，选择最适配的店铺形式，提升用户信任度和转化率。
                </p>
              </div>
              
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'linear-gradient(135deg, var(--still) 0%, rgba(216, 207, 213, 0.8) 100%)'
                  }}
                >
                  <Settings className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>运营考量</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  综合考虑运营成本、管理复杂度等因素，选择最符合当前能力的店铺类型。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 导航到下一课程 */}
        <div className="text-center">
          <Link to="/course/entry-process">
            <div className="inline-flex items-center px-8 py-4 rounded-full font-medium transition-all duration-300 btn-primary">
              下一节课：平台入驻流程讲解
              <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopTypesPage;