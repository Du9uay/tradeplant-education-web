import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, AlertCircle, FileText, Users, Clock } from '../../components/Icons';

const EntryProcessPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const entryProcess = [
    {
      step: '1. 准备阶段',
      title: '资质文件准备',
      description: '收集营业执照、税务登记证、银行开户许可证等基础资质文件。',
      details: [
        '营业执照（三证合一）',
        '法人身份证正反面',
        '银行开户许可证或基本账户信息',
        '品牌授权书（如有）',
        '相关行业许可证（特殊品类）'
      ],
      time: '3-5个工作日',
      badgeColor: 'var(--still)'
    },
    {
      step: '2. 申请阶段',
      title: '平台申请提交',
      description: '在各平台商家后台填写店铺信息，上传资质文件，等待初审。',
      details: [
        '选择店铺类型（旗舰店/专营店等）',
        '填写企业基本信息',
        '上传资质文件照片',
        '设置店铺基本信息',
        '提交初步审核'
      ],
      time: '1-2个工作日',
      badgeColor: 'var(--dawn)'
    },
    {
      step: '3. 审核阶段',
      title: '平台资质审核',
      description: '平台对提交的资料进行审核，可能要求补充材料或修改信息。',
      details: [
        '资质真实性验证',
        '经营范围匹配性检查',
        '品牌授权有效性确认',
        '可能的电话回访',
        '补充材料提交（如需）'
      ],
      time: '3-7个工作日',
      badgeColor: 'var(--still)'
    },
    {
      step: '4. 签约阶段',
      title: '合同签署缴费',
      description: '审核通过后，签署平台合作协议，缴纳保证金和相关费用。',
      details: [
        '签署电子合作协议',
        '缴纳店铺保证金',
        '支付技术服务费（如有）',
        '开通店铺管理后台',
        '获取店铺操作权限'
      ],
      time: '1-3个工作日',
      badgeColor: 'var(--dawn)'
    }
  ];

  const commonIssues = [
    {
      issue: '资质文件不清晰',
      solution: '重新拍摄高清照片，确保文字清晰可读，四角完整',
      prevention: '使用扫描仪或专业拍照设备，避免反光和阴影',
      badgeColor: 'var(--still)'
    },
    {
      issue: '经营范围不匹配',
      solution: '修改营业执照经营范围，或选择匹配的经营品类',
      prevention: '入驻前核对营业执照经营范围与拟售商品是否一致',
      badgeColor: 'var(--dawn)'
    },
    {
      issue: '品牌授权过期',
      solution: '联系品牌方续签授权书，获取最新有效授权文件',
      prevention: '定期检查授权书有效期，提前3个月准备续签',
      badgeColor: 'var(--still)'
    },
    {
      issue: '联系方式无法验证',
      solution: '确保预留手机号码畅通，及时接听平台客服电话',
      prevention: '提供准确的联系方式，保持通信畅通',
      badgeColor: 'var(--dawn)'
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            平台入驻流程讲解
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            详细讲解主流平台入驻的全流程，从确定入驻平台开始，逐步引导学生了解如何准备营业执照、资质证明等各类必要材料。
          </p>
        </div>

        {/* 入驻流程步骤 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>标准入驻流程</h2>
          <div className="space-y-8">
            {entryProcess.map((process, index) => (
              <div
                key={process.step}
                className="glass-card rounded-2xl p-8"
                style={{
                  background: 'rgba(216, 207, 213, 0.16)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                  <div className="flex-shrink-0 mb-4 lg:mb-0">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${process.badgeColor} 0%, rgba(216, 207, 213, 0.8) 100%)`
                      }}
                    >
                      <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{index + 1}</span>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <h3 className="text-2xl font-bold mb-2 lg:mb-0" style={{ color: 'var(--text-primary)' }}>{process.title}</h3>
                      <div className="flex items-center text-sm" style={{ color: 'var(--still)' }}>
                        <Clock className="w-4 h-4 mr-2" />
                        预计时间：{process.time}
                      </div>
                    </div>
                    
                    <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{process.description}</p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {process.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center p-3 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                          <CheckCircle className="w-4 h-4 mr-3 flex-shrink-0" style={{ color: process.badgeColor }} />
                          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 常见审核问题 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>常见审核问题及解决方案</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {commonIssues.map((item, index) => (
              <div
                key={item.issue}
                className="glass-card rounded-xl p-6"
                style={{
                  background: 'rgba(216, 207, 213, 0.16)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-6 h-6 mr-3" style={{ color: item.badgeColor }} />
                  <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{item.issue}</h3>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--still)' }}>解决方案：</h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.solution}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--dawn)' }}>预防措施：</h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.prevention}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 入驻成功要点 */}
        <div className="mb-16">
          <div
            className="glass-card rounded-2xl p-8"
            style={{
              background: 'rgba(216, 207, 213, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.25)'
            }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>入驻成功关键要点</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'linear-gradient(135deg, var(--still) 0%, rgba(216, 207, 213, 0.8) 100%)'
                  }}
                >
                  <FileText className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>资料完整</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  确保所有必需资质文件齐全，信息真实有效，避免因材料不全导致审核失败。
                </p>
              </div>
              
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'linear-gradient(135deg, var(--dawn) 0%, rgba(216, 207, 213, 0.8) 100%)'
                  }}
                >
                  <Users className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>响应及时</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  保持联系方式畅通，及时回应平台客服要求，配合完成各项审核流程。
                </p>
              </div>
              
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'linear-gradient(135deg, var(--still) 0%, rgba(216, 207, 213, 0.8) 100%)'
                  }}
                >
                  <CheckCircle className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>规范操作</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  严格按照平台要求填写信息，遵守平台规则，避免违规操作影响入驻成功率。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 导航到下一课程 */}
        <div className="text-center">
          <Link to="/course/qualifications-fees">
            <div className="inline-flex items-center px-8 py-4 rounded-full font-medium transition-all duration-300 btn-primary">
              下一节课：核心资质与费用明细
              <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EntryProcessPage;