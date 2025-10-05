import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Shield, CheckCircle, AlertCircle, Calculator } from '../../components/Icons';

const QualificationsFeesPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const coreQualifications = [
    {
      title: '基础资质',
      items: [
        { name: '营业执照', description: '企业法人营业执照或个体工商户营业执照', required: true },
        { name: '税务登记证', description: '税务机关颁发的税务登记证明（三证合一后包含在营业执照中）', required: true },
        { name: '银行开户许可证', description: '企业基本存款账户开户许可证或基本账户信息', required: true },
        { name: '法人身份证', description: '法定代表人身份证正反面清晰照片', required: true }
      ],
      badgeColor: 'var(--still)'
    },
    {
      title: '品牌相关资质',
      items: [
        { name: '商标注册证', description: '国家商标局颁发的商标注册证书（自有品牌）', required: false },
        { name: '品牌授权书', description: '品牌方授权销售的正式授权文件（代理品牌）', required: false },
        { name: '授权链条证明', description: '多级代理情况下的完整授权链条文件', required: false },
        { name: '产品质检报告', description: '第三方检测机构出具的产品质量检测报告', required: false }
      ],
      badgeColor: 'var(--dawn)'
    },
    {
      title: '特殊行业资质',
      items: [
        { name: '食品经营许可证', description: '经营食品类商品必需的许可证件', required: true },
        { name: '化妆品生产许可', description: '生产或经营化妆品的专门许可证', required: true },
        { name: '医疗器械许可', description: '经营医疗器械产品的相关许可证件', required: true },
        { name: '3C认证证书', description: '强制性产品认证证书（电子电器产品）', required: true }
      ],
      badgeColor: 'var(--still)'
    }
  ];

  const platformFees = [
    {
      platform: '天猫',
      fees: [
        { type: '保证金', amount: '5万-15万', description: '根据经营品类不同，保证金额度有所差异' },
        { type: '技术服务费', amount: '3-6万/年', description: '平台技术服务年费，不同类目费用不同' },
        { type: '扣点', amount: '0.5%-8%', description: '按交易额扣取的平台佣金，品类不同比例不同' }
      ],
      total: '约8-21万/年',
      badgeColor: 'var(--still)'
    },
    {
      platform: '京东',
      fees: [
        { type: '保证金', amount: '3万-12万', description: '按照品类划分，服装类较低，3C类较高' },
        { type: '平台使用费', amount: '1000元/月', description: '固定的平台使用费用' },
        { type: '扣点', amount: '1%-8%', description: '交易扣点，根据品类和销售额阶梯计算' }
      ],
      total: '约4-13万/年',
      badgeColor: 'var(--dawn)'
    },
    {
      platform: '拼多多',
      fees: [
        { type: '保证金', amount: '1000-1万', description: '相对较低的保证金门槛，个人店铺1000元起' },
        { type: '技术服务费', amount: '0.6%', description: '按交易额收取的技术服务费' },
        { type: '推广费用', amount: '自定义', description: '可选的推广投入，根据运营策略决定' }
      ],
      total: '约1000-2万/年',
      badgeColor: 'var(--still)'
    }
  ];

  const preparationTips = [
    {
      category: '证件准备',
      tips: [
        '营业执照需在有效期内，经营范围要涵盖拟售商品',
        '所有证件照片清晰，四角完整，无遮挡无反光',
        '确保企业信息与法人信息完全一致',
        '特殊行业提前办理相关许可证，避免入驻时缺少资质'
      ],
      badgeColor: 'var(--still)'
    },
    {
      category: '费用规划',
      tips: [
        '根据平台费用结构制定资金预算，预留充足流动资金',
        '对比不同平台的费用构成，选择最适合的入驻平台',
        '考虑保证金的资金占用成本，合理安排资金使用',
        '预留推广营销费用，为后期运营做好资金准备'
      ],
      badgeColor: 'var(--dawn)'
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            核心资质与费用明细
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            学习识别不同平台所需的核心资质，如营业执照、相关行业许可证等的准备方法，还能清楚了解各平台的入驻费用构成。
          </p>
        </div>

        {/* 核心资质清单 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>核心资质清单</h2>
          <div className="space-y-8">
            {coreQualifications.map((category, index) => (
              <div
                key={category.title}
                className="glass-card rounded-2xl p-8"
                style={{
                  background: 'rgba(216, 207, 213, 0.16)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{
                      background: `linear-gradient(135deg, ${category.badgeColor} 0%, rgba(216, 207, 213, 0.8) 100%)`
                    }}
                  >
                    <FileText className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{category.title}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {category.items.map((item, idx) => (
                    <div 
                      key={item.name}
                      className="p-4 rounded-lg border"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderColor: item.required ? 'rgba(193, 208, 217, 0.3)' : 'rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <div className="flex items-center mb-2">
                        {item.required ? (
                          <CheckCircle className="w-4 h-4 mr-2" style={{ color: 'var(--still)' }} />
                        ) : (
                          <AlertCircle className="w-4 h-4 mr-2" style={{ color: 'var(--dawn)' }} />
                        )}
                        <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.name}</h4>
                        {item.required && (
                          <span className="ml-2 px-2 py-1 text-xs rounded-full" style={{ background: 'var(--still)', color: 'var(--text-primary)' }}>
                            必需
                          </span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 平台费用对比 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>主流平台费用对比</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {platformFees.map((platform, index) => (
              <div
                key={platform.platform}
                className="glass-card rounded-2xl p-8"
                style={{
                  background: 'rgba(216, 207, 213, 0.16)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{
                      background: `linear-gradient(135deg, ${platform.badgeColor} 0%, rgba(216, 207, 213, 0.8) 100%)`
                    }}
                  >
                    <Calculator className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{platform.platform}</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  {platform.fees.map((fee, idx) => (
                    <div key={fee.type} className="p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{fee.type}</h4>
                        <span className="font-bold" style={{ color: platform.badgeColor }}>{fee.amount}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{fee.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 rounded-lg" style={{ background: `linear-gradient(135deg, ${platform.badgeColor} 0.1, rgba(255, 255, 255, 0.05) 100%)` }}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>预计总成本：</span>
                    <span className="text-xl font-bold" style={{ color: platform.badgeColor }}>{platform.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 准备建议 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>资质与费用准备建议</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {preparationTips.map((category, index) => (
              <div
                key={category.category}
                className="glass-card rounded-2xl p-8"
                style={{
                  background: 'rgba(216, 207, 213, 0.16)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{
                      background: `linear-gradient(135deg, ${category.badgeColor} 0%, rgba(216, 207, 213, 0.8) 100%)`
                    }}
                  >
                    <Shield className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{category.category}</h3>
                </div>
                
                <div className="space-y-3">
                  {category.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ background: category.badgeColor }}></div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 总结要点 */}
        <div className="mb-16">
          <div
            className="glass-card rounded-2xl p-8"
            style={{
              background: 'rgba(216, 207, 213, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.25)'
            }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>关键要点总结</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'linear-gradient(135deg, var(--still) 0%, rgba(216, 207, 213, 0.8) 100%)'
                  }}
                >
                  <FileText className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>资质齐全</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  确保基础资质完备，特殊行业资质提前办理
                </p>
              </div>
              
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'linear-gradient(135deg, var(--dawn) 0%, rgba(216, 207, 213, 0.8) 100%)'
                  }}
                >
                  <Calculator className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>费用预算</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  合理规划资金预算，选择适合的平台
                </p>
              </div>
              
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'linear-gradient(135deg, var(--still) 0%, rgba(216, 207, 213, 0.8) 100%)'
                  }}
                >
                  <Shield className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>合规经营</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  严格遵守平台规则，避免违规风险
                </p>
              </div>
              
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'linear-gradient(135deg, var(--dawn) 0%, rgba(216, 207, 213, 0.8) 100%)'
                  }}
                >
                  <CheckCircle className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>持续更新</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  定期更新证件，保持资质有效性
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 课程完成导航 */}
        <div className="text-center">
          <Link to="/course-summary">
            <div className="inline-flex items-center px-8 py-4 rounded-full font-medium transition-all duration-300 btn-primary">
              完成学习，查看课程总结
              <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QualificationsFeesPage;