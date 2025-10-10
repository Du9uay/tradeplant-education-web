import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { Zap, ArrowRight, BookOpen, Users, Award, Target, Settings, Network, Camera, Film, Video, Edit3, Clapperboard, TrendingUp, Lightbulb, ChevronRight, Building2, Briefcase, Rocket, Trophy, Sparkles, CheckCircle, GPT, N8N, Runway, LumaAI, Cpu } from '../components/Icons';
import DigitalAvatarPlayer from '../components/DigitalAvatarPlayer';

const HomePage: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const fullText = '主流平台入驻策略与资质准备';
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  // 打字机效果
  useEffect(() => {
    if (textIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [textIndex, fullText]);

  // 滚动动画控制
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const courseModules = [
    {
      title: '一. 国内主流平台概览与选择策略',
      description: '全面介绍国内如淘宝、抖音、拼多多等主流平台，让学生知晓各平台的定位、用户群体等情况，学会依据自身业务类型、产品属性等来挑选适配平台。',
      icon: BookOpen,
      path: '/course/platform-overview',
      badgeColor: 'var(--accent-primary)',
      delay: 0.1
    },
    {
      title: '二. 店铺类型与经营品类匹配规则',
      description: '学习如何依据自身经营方向选定合适店铺类型，清楚不同经营品类对应的资质要求，掌握精准匹配店铺类型与经营品类的方法。',
      icon: Target,
      path: '/course/shop-types',
      badgeColor: 'var(--accent-secondary)',
      delay: 0.2
    },
    {
      title: '三. 平台入驻流程讲解',
      description: '详细讲解主流平台入驻的全流程，从确定入驻平台开始，逐步引导学生了解如何准备营业执照、资质证明等各类必要材料。',
      icon: Network,
      path: '/course/entry-process',
      badgeColor: 'var(--accent-primary)',
      delay: 0.3
    },
    {
      title: '四. 核心资质与费用明细',
      description: '学习识别不同平台所需的核心资质，如营业执照、相关行业许可证等的准备方法，还能清楚了解各平台的入驻费用构成。',
      icon: Award,
      path: '/course/qualifications-fees',
      badgeColor: 'var(--accent-secondary)',
      delay: 0.4
    }
  ];

  const careerPaths = [
    {
      title: '电商运营专员',
      description: '负责平台基本入驻与规则掌握，熟悉主流电商平台的开店流程、规则红线，确保顺利上线运营',
      skills: [
        { name: '平台基本入驻与规则掌握', desc: '熟悉主流电商平台的开店流程、规则红线，确保顺利上线运营。', highlight: true },
        { name: '产品上架与精细运营', desc: '负责商品发布、文案撰写及页面优化，有效提升曝光与转化率。' },
        { name: '数据监控与竞品分析', desc: '通过PV、转化、竞品数据监控，及时调整运营策略。' },
        { name: '店铺装修与视觉布局', desc: '设计协调店铺首页、详情页视觉效果，增强用户体验。' },
        { name: '大促活动策划与执行', desc: '统筹大促节点促销方案，执行并实时监控效果数据。' },
        { name: '订单处理与物流管理', desc: '管理订单流程，对接多平台物流，确保发货及时无误。' }
      ],
      badgeColor: 'var(--accent-primary)',
      icon: Users
    },
    {
      title: '电商推广专员',
      description: '熟悉平台推广规则，规避违规风险，确保推广合规，专注流量获取和转化优化',
      skills: [
        { name: '平台入驻与规则理解', desc: '熟悉平台推广规则，规避违规风险，确保推广合规。', highlight: true },
        { name: '装修/视觉提升点击率', desc: '通过文案、页面及素材优化提高点击率。' },
        { name: '流量来源分析与优化', desc: '分析搜索、直通车、社交投放等渠道，优化投放策略。' },
        { name: 'AI标题关键词优化', desc: '利用AI工具提升关键词覆盖率和搜索曝光。' },
        { name: '大促推广执行与监控', desc: '负责直通车、钻展等推广工具，监测ROI和转化效果。' },
        { name: '竞品定位与差异化推广', desc: '分析竞品投放策略，制定差异化推广方案提升竞争力。' }
      ],
      badgeColor: 'var(--accent-secondary)',
      icon: Target
    },
    {
      title: '电商选品专员',
      description: '调研热门平台品类动态，为选品提供战略支持，通过数据和竞品对比找出市场切入点',
      skills: [
        { name: '平台调研与入驻资质', desc: '调研热门平台品类动态，为选品提供战略支持。', highlight: true },
        { name: '竞品分析与定位方法', desc: '通过数据和竞品对比找出市场切入点。' },
        { name: '商品上架与精细运营', desc: '负责商品信息编辑和详情页面构建。' },
        { name: '视觉与页面表现优化', desc: '通过视觉和页面布局提升商品吸引力。' },
        { name: '日常订单与物流对接理解', desc: '了解订单履约和物流体系，支持后续运营。' },
        { name: '大促商品策划能力', desc: '筛选潜力商品，参与大促节奏规划与准备。' }
      ],
      badgeColor: 'var(--accent-primary)',
      icon: BookOpen
    },
    {
      title: 'CRM运营专员',
      description: '掌握会员等级、权益规则，支持用户分层管理，通过数据挖掘提升用户留存与复购',
      skills: [
        { name: '平台规则与用户资质体系', desc: '掌握会员等级、权益规则，支持用户分层管理。', highlight: true },
        { name: '流量来源与用户行为分析', desc: '通过数据挖掘提升用户留存与复购。' },
        { name: '客服话术体系与纠纷处理', desc: '制定标准化话术，提升用户满意度并降低纠纷发生率。' },
        { name: '关键词/话术优化支持', desc: '借助AI优化话术素材和邮件/短信内容。' },
        { name: '活动执行与用户留存推动', desc: '设计会员活动提高复购和品牌忠诚。' },
        { name: '多店铺场景用户运营', desc: '统筹多个店铺用户体系，实现资源共享与转化提升。' }
      ],
      badgeColor: 'var(--accent-secondary)',
      icon: Settings
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  const cardHover = {
    scale: 1.05,
    rotateX: 5,
    rotateY: 5,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20
    }
  };

  return (
    <>
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto relative">
        {/* 主标题区域 - 带动画 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ y }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 40%, var(--accent-light) 100%)',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.35), inset 0 1px 3px rgba(255, 255, 255, 0.2)'
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2 
            }}
            whileHover={{ 
              scale: 1.1, 
              rotate: 360,
              transition: { duration: 0.3 }
            }}
          >
            <Cpu style={{ color: '#FFFFFF' }} className="w-10 h-10" />
          </motion.div>
          
          <motion.h1 className="text-5xl font-bold mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
            <span className="inline-block">
              <span className="text-gradient">{displayText}</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                style={{ color: 'var(--accent-primary)' }}
              >
                |
              </motion.span>
            </span>
            <motion.span
              className="block text-2xl font-normal mt-2"
              style={{ color: 'var(--accent-primary)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              电商运营核心技能教学
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl max-w-4xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            通过系统性学习主流电商平台入驻策略，掌握资质准备、费用管理的核心知识，
            培养具备电商平台入驻规划、资质申请、合规运营能力的专业人才。
          </motion.p>
        </motion.div>

        {/* 新增大标题：为什么要学习这节课 */}
        <motion.section
          className="mb-16 text-center relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-[color:var(--accent-primary)] via-[color:var(--accent-light)] to-[color:var(--text-primary)] bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            为什么要学习这节课
          </motion.h1>
          <motion.p
            className="text-lg text-[color:var(--text-secondary)] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            从更贴合市场的行业、企业、岗位角度为你一一分析
          </motion.p>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-[color:var(--accent-primary)] to-[color:var(--accent-light)] mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />

          {/* 数字人播放器1 - 为什么要学习这节课标题 */}
          <DigitalAvatarPlayer
            videoUrl="https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/video/web_teach/recuYIPvHlDP5b.mov"
            position={{ top: 0, right: '-16rem' }}
          />


        </motion.section>

        {/* 第一部分：为什么要关注行业 */}
        <motion.section
          className="mb-20 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* 章节标题 */}
          <motion.div
            className="flex items-center mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[color:var(--accent-primary)] to-[color:var(--accent-light)] rounded-2xl mr-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">为什么要关注行业</h2>
              <p className="text-[color:var(--accent-light)] mt-2">电商是时代趋势，也是接近成功的捷径</p>
            </div>
          </motion.div>



          {/* 数字人播放器2 - 为什么要关注行业 */}
          <DigitalAvatarPlayer
            videoUrl="https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/video/web_teach/recuYIQO9mlAWk.mov"
            position={{ top: 380, right: '-16rem' }}
          />
          {/* 主内容区 - 大卡片 */}
          <motion.div
            className="glass-deep p-12 relative overflow-hidden mb-8"
            style={{
              backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/一、为什么要关注行业-1. 原因与现状-主图.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* 装饰性背景元素 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[color:var(--accent-primary)]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[color:var(--accent-secondary)]/10 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              {/* 原因与现状 - 全宽展示 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-3xl font-bold text-white mb-6">
                  <span className="text-[color:var(--accent-light)]">行业现状与机遇</span>
                </h3>

                {/* 四个核心数据点 */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {/* 千亿级市场规模 */}
                  <motion.div
                    className="relative overflow-hidden rounded-2xl p-6 border border-[color:var(--border-light)]"
                    style={{
                      backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/一、为什么要关注行业-1. 原因与现状-市场爆发.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    whileHover={{ scale: 1.05, borderColor: "var(--accent-primary)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TrendingUp className="w-8 h-8 text-[color:var(--accent-primary)] mb-3" />
                    <h4 className="text-lg font-bold text-white mb-2">市场爆发</h4>
                    <p className="text-[color:var(--text-secondary)] text-sm">
                      全球电商规模连续多年保持高速增长，跨境电商年均增长率超过15%，成为外贸发展的核心引擎。<span className="font-bold text-[color:var(--accent-light)]">东南亚、中东、南美等新兴市场需求旺盛</span>，消费升级趋势明显，带来了前所未有的增长红利
                    </p>
                  </motion.div>

                  {/* 政策利好 */}
                  <motion.div
                    className="relative overflow-hidden rounded-2xl p-6 border border-[color:var(--border-light)]"
                    style={{
                      backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/一、为什么要关注行业-1. 原因与现状-政策利好.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    whileHover={{ scale: 1.05, borderColor: "var(--accent-primary)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Building2 className="w-8 h-8 text-[color:var(--accent-primary)] mb-3" />
                    <h4 className="text-lg font-bold text-white mb-2">政策利好</h4>
                    <p className="text-[color:var(--text-secondary)] text-sm">
                      国家不断出台支持电商和跨境贸易的政策，如跨境电商综合试验区建设、出口退税便利化等。<span className="font-bold text-[color:var(--accent-primary)]">RCEP、《一带一路》</span>倡议的落地，为中国品牌出海和海外市场拓展<span className="font-bold text-[color:var(--accent-primary)]">注入了强大动力</span>，行业进入政策红利期
                    </p>
                  </motion.div>

                  {/* 技术赋能 */}
                  <motion.div
                    className="relative overflow-hidden rounded-2xl p-6 border border-[color:var(--border-light)]"
                    style={{
                      backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/一、为什么要关注行业-1. 原因与现状-技术赋能.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    whileHover={{ scale: 1.05, borderColor: "var(--accent-primary)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Film className="w-8 h-8 text-[color:var(--accent-primary)] mb-3" />
                    <h4 className="text-lg font-bold text-white mb-2">技术赋能</h4>
                    <p className="text-[color:var(--text-secondary)] text-sm">
                      <span className="font-bold text-[color:var(--accent-primary)]">AI、大数据、云计算与自动化工具</span>广泛应用于选品、广告投放、仓储物流、用户分析等环节，大幅提升运营效率。企业通过智能算法预测消费趋势，<span className="font-bold text-[color:var(--accent-primary)]">实现精准营销和精细化管理</span>，降低了运营成本
                    </p>
                  </motion.div>

                  {/* 岗位涌现 */}
                  <motion.div
                    className="relative overflow-hidden rounded-2xl p-6 border border-[color:var(--border-light)]"
                    style={{
                      backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/一、为什么要关注行业-1. 原因与现状-岗位涌现.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    whileHover={{ scale: 1.05, borderColor: "var(--accent-primary)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Network className="w-8 h-8 text-[color:var(--accent-primary)] mb-3" />
                    <h4 className="text-lg font-bold text-white mb-2">岗位涌现</h4>
                    <p className="text-[color:var(--text-secondary)] text-sm">
                      行业高速发展催生了大量就业机会，从电商运营、推广、客服到数据分析、跨境物流、用户增长等岗位全面开放。<span className="text-[color:var(--accent-primary)] font-bold">高薪职位不断释放，岗位晋升路径清晰</span>，吸引大量年轻人加入并快速成长
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* 结果导向 - 分为两列 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-3xl font-bold text-white mb-6">
                  <span className="text-[color:var(--accent-light)]">发展机遇</span>
                </h3>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* 对企业来说 */}
                  <motion.div
                    className="relative overflow-hidden rounded-2xl p-8 border border-[color:var(--border-light)]"
                    style={{
                      backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/一、为什么要关注行业-2. 结果导向-对企业来说.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    whileHover={{ scale: 1.02, borderColor: "var(--accent-primary)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center mb-4">
                      <Target className="w-10 h-10 text-[color:var(--accent-primary)] mr-3" />
                      <h4 className="text-2xl font-bold text-[color:var(--accent-primary)]">对企业来说</h4>
                    </div>
                    <p className="text-[color:var(--text-primary)] text-lg leading-relaxed">
                      <span className="font-bold text-[color:var(--accent-primary)]">电商已经成为利润增长与市场突破的核心引擎</span>。企业通过搭建电商渠道，不仅能扩大品牌曝光、触达更多消费者，还能借助跨境电商打通全球市场，实现销售规模的倍增。同时，电商平台的数字化和智能化发展，使得企业运营效率提升、成本下降，竞争力显著增强。
                    </p>
                  </motion.div>

                  {/* 对学生来说 */}
                  <motion.div
                    className="relative overflow-hidden rounded-2xl p-8 border border-[color:var(--border-light)]"
                    style={{
                      backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/一、为什么要关注行业-2. 结果导向-对学生来说.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    whileHover={{ scale: 1.02, borderColor: "var(--accent-primary)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center mb-4">
                      <Users className="w-10 h-10 text-[color:var(--accent-primary)] mr-3" />
                      <h4 className="text-2xl font-bold text-[color:var(--accent-primary)]">对学生来说</h4>
                    </div>
                    <p className="text-[color:var(--text-primary)] text-lg leading-relaxed">
                      电商行业为年轻人提供了一个<span className="font-bold text-[color:var(--accent-primary)]">入行门槛低、成长路径清晰的黄金赛道</span>。相比传统行业，电商岗位更注重实际能力和执行力，<span className="font-bold text-[color:var(--accent-primary)]">不以学历作为唯一门槛</span>。只要掌握平台运营方法，就能快速上手并积累成绩，从而获得更高的职业竞争力。
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* 第二部分：为什么要分清企业类型 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20 relative"
        >
          {/* 章节标题 */}
          <motion.div
            className="flex items-center mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[color:var(--accent-primary)] to-[color:var(--accent-light)] rounded-2xl mr-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">为什么要分清企业类型？</h2>
              <p className="text-[color:var(--accent-light)] mt-2">认清企业类型与产业链位置，才能找到真正适合自己的赛道</p>
            </div>
          </motion.div>



          {/* 数字人播放器3 - 为什么要分清企业类型 */}
          <DigitalAvatarPlayer
            videoUrl="https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/video/web_teach/recuYIQO9mQ6bl.mov"
            position={{ top: 200, right: '-16rem' }}
          />
          {/* 主内容区 - 阶梯式企业类型布局 */}
          <div className="relative max-w-5xl mx-auto">
            <div className="space-y-8">
              {/* 上游企业 */}
              <motion.div
                className="relative max-w-3xl mr-auto ml-0"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <div className="flex items-center gap-6">
                  {/* 左侧大图标 */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className="w-24 h-24 bg-gradient-to-br from-[color:var(--accent-primary)] to-[color:var(--accent-light)] rounded-3xl flex items-center justify-center shadow-2xl"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Building2 className="w-12 h-12 text-white" />
                    </motion.div>
                  </div>

                  {/* 右侧内容卡片 */}
                  <motion.div
                    className="flex-1 relative overflow-hidden rounded-3xl p-8 border border-[color:var(--border-light)]"
                    style={{
                      backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/二、为什么要分清企业类型？-上游.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[color:var(--accent-primary)]/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-3xl font-bold text-[color:var(--accent-primary)]">上游：平台开发</h3>
                        <span className="text-[color:var(--accent-primary)]/60 text-sm font-semibold">技术基础</span>
                      </div>
                      <p className="text-[color:var(--text-secondary)] text-base mb-6">上游环节主要解决"卖什么"的问题，<span className="font-bold text-[color:var(--accent-primary)]">以生产制造、技术研发和供应链资源为核心</span>。上游的稳定性，直接决定了电商平台能否拥有持续的优质商品供给和快速响应市场的能力</p>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">IT服务企业</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">云计算企业</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">服装制造厂商</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">食品制造企业</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">电子产品制造商</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">批发贸易公司</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">日用品制造企业</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">家具制造企业</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* 向下的流动箭头 */}
                <div className="flex justify-center mt-6">
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ChevronRight className="w-10 h-10 text-[color:var(--accent-primary)]/50 rotate-90" />
                  </motion.div>
                </div>
              </motion.div>

              {/* 中游企业 */}
              <motion.div
                className="relative max-w-3xl mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="flex items-center gap-6">
                  {/* 左侧大图标 */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className="w-24 h-24 bg-gradient-to-br from-[color:var(--accent-primary)] to-[color:var(--accent-light)] rounded-3xl flex items-center justify-center shadow-2xl"
                      whileHover={{ rotate: -5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Camera className="w-12 h-12 text-white" />
                    </motion.div>
                  </div>

                  {/* 右侧内容卡片 */}
                  <motion.div
                    className="flex-1 relative overflow-hidden rounded-3xl p-8 border border-[color:var(--border-light)]"
                    style={{
                      backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/二、为什么要分清企业类型？-中游.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[color:var(--accent-primary)]/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-3xl font-bold text-[color:var(--accent-primary)]">中游：电商平台与渠道</h3>
                        <span className="text-[color:var(--accent-primary)]/60 text-sm font-semibold">交易核心</span>
                      </div>
                      <p className="text-[color:var(--text-secondary)] text-base mb-6">中游环节是电商交易的"舞台"，通过搭建线上平台、独立站和技术服务商，<span className="font-bold text-[color:var(--accent-primary)]">构建出消费者与商家之间的交易平台</span></p>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">B2C 平台</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">B2B 平台</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">搜索引擎优化企业</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">交易平台运维企业</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* 向下的流动箭头 */}
                <div className="flex justify-center mt-6">
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  >
                    <ChevronRight className="w-10 h-10 text-[color:var(--accent-primary)]/50 rotate-90" />
                  </motion.div>
                </div>
              </motion.div>

              {/* 下游企业 */}
              <motion.div
                className="relative max-w-3xl ml-auto mr-0"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="flex items-center gap-6">
                  {/* 左侧大图标 */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className="w-24 h-24 bg-gradient-to-br from-[color:var(--accent-primary)] to-[color:var(--accent-light)] rounded-3xl flex items-center justify-center shadow-2xl"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Users className="w-12 h-12 text-white" />
                    </motion.div>
                  </div>

                  {/* 右侧内容卡片 */}
                  <motion.div
                    className="flex-1 relative overflow-hidden rounded-3xl p-8 border border-[color:var(--border-light)]"
                    style={{
                      backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/二、为什么要分清企业类型？-下游.jpg')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    whileHover={{ scale: 1.02, x: -10 }}
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[color:var(--accent-primary)]/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-3xl font-bold text-[color:var(--accent-primary)]">下游：营销与服务</h3>
                        <span className="text-[color:var(--accent-primary)]/60 text-sm font-semibold">用户触达</span>
                      </div>
                      <p className="text-[color:var(--text-secondary)] text-base mb-6">下游环节直接面向用户，<span className="font-bold text-[color:var(--accent-primary)]">以触达消费者和优化消费体验为核心</span>。它不仅承担着品牌曝光与转化的重任，还通过物流配送、金融支持、售后服务等多种方式，<span className="font-bold text-[color:var(--accent-primary)]">推动复购和长期用户价值</span></p>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">广告与推广公司</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">第三方代运营机构</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">快递公司</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[color:var(--accent-primary)] rounded-full animate-pulse"></div>
                          <span className="text-[color:var(--text-secondary)] text-sm">信贷企业</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mt-8 p-6 bg-gradient-to-r from-[color:var(--accent-primary)]/10 to-[color:var(--accent-light)]/10 rounded-2xl border border-[color:var(--border-light)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-[color:var(--accent-primary)] text-lg font-semibold text-center">
              熟悉企业类型与产业链位置，才能找到真正适合自己的赛道
            </p>
          </motion.div>
        </motion.section>

        {/* 第三部分：关于岗位你该知道的是 */}
        <motion.section
          className="mb-20 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* 章节标题 */}
          <motion.div
            className="flex items-center mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[color:var(--accent-primary)] to-[color:var(--accent-light)] rounded-2xl mr-6">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">关于岗位你该知道的是</h2>
              <p className="text-[color:var(--accent-light)] mt-2">有哪些岗位？普遍要求与待遇如何？</p>
            </div>
          </motion.div>



          {/* 数字人播放器4 - 关于岗位你该知道的是 */}
          <DigitalAvatarPlayer
            videoUrl="https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/video/web_teach/recuYIQO9mwVzw.mov"
            position={{ top: 200, right: '-16rem' }}
          />
          {/* 岗位分类卡片 */}
          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            {/* 前期策划 */}
            <motion.div
              className="relative overflow-hidden rounded-3xl p-6 border border-[color:var(--border-light)]"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/三、关于岗位你该知道的是-（一）有哪些岗位？-1. 电商运营类岗.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[color:var(--accent-primary)]/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[color:var(--accent-primary)] rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[color:var(--accent-primary)] ml-3">电商运营类岗</h3>
                </div>
                <p className="text-[color:var(--text-primary)] text-sm mb-4">日常要管理店铺活动节奏、优化转化率、提升复购率，就像是"开店的指挥官"。在这条路上，越熟悉数据和策略，越能带出漂亮的增长曲线</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">电商运营专员</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">跨境电商运营专员</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">跨境电商运营助理</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">跨境电商个人运营</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">TikTok电商运营</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 流量与内容类岗 */}
            <motion.div
              className="relative overflow-hidden rounded-3xl p-6 border border-[color:var(--border-light)]"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/三、关于岗位你该知道的是-（一）有哪些岗位？-2. 流量与内容类类岗.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[color:var(--accent-primary)]/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[color:var(--accent-primary)] rounded-xl flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[color:var(--accent-primary)] ml-3">流量与内容类岗</h3>
                </div>
                <p className="text-[color:var(--text-primary)] text-sm mb-4">以"获客成本—转化—留存"的闭环为导向，负责站内外投放、达人共创、短视频/直播内容与社媒矩阵运营；<span className="font-bold text-[color:var(--accent-primary)]">核心在于内容与人群的精准匹配与ROI优化，强调素材迭代和渠道组合策略</span></p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">电商推广专员</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">海外社交媒体运营</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">SEO专员</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">SEM专员</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 供应链类岗 */}
            <motion.div
              className="relative overflow-hidden rounded-3xl p-6 border border-[color:var(--border-light)]"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/三、关于岗位你该知道的是-（一）有哪些岗位？-3. 供应链类岗.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[color:var(--accent-primary)]/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[color:var(--accent-primary)] rounded-xl flex items-center justify-center">
                    <Edit3 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[color:var(--accent-primary)] ml-3">供应链类岗</h3>
                </div>
                <p className="text-[color:var(--text-primary)] text-sm mb-4">管理"备—仓—配—售后"全链路，目标是时效、稳定与成本的最优解；跨境则要在FBA/海外仓/本地仓与头程渠道间做方案博弈，<span className="font-bold text-[color:var(--accent-primary)]">保障旺季产能与异常闭环，直接影响评分、权重与利润</span></p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">跨境电商供应链专员</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">国际物流专员</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">国际货运代理</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">物流跟单专员</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 跨境交易与合规类岗 */}
            <motion.div
              className="relative overflow-hidden rounded-3xl p-6 border border-[color:var(--border-light)]"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/三、关于岗位你该知道的是-（一）有哪些岗位？-4.跨境交易与合规类岗.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[color:var(--accent-primary)]/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[color:var(--accent-primary)] rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[color:var(--accent-primary)] ml-3">跨境交易与合规类岗</h3>
                </div>
                <p className="text-[color:var(--text-primary)] text-sm mb-4">建立贸易合规底座：归类申报、商检、原产地、许可证/资质与税务退税；管控单证准确性与时效，降低查验/滞箱/滞港等风险；与运营、物流、财务形成"三位一体"的跨部门协同</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">报关员</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">报关查验主管</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">报检员</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">进出口关务员</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">贸易单证员</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">单证文员</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-[color:var(--accent-primary)]" />
                    <span className="text-[color:var(--text-secondary)] text-sm">出口退税专员</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 普遍要求与待遇 */}
          <motion.div
            className="glass-deep p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[color:var(--accent-primary)]/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-[color:var(--accent-primary)] mb-6 text-center">行业要求与待遇</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[color:var(--accent-primary)]/20 to-[color:var(--accent-light)]/20 border border-[color:var(--border-light)]">
                  <div className="text-2xl font-bold text-[color:var(--accent-primary)] mb-2">要求</div>
                  <p className="text-[color:var(--text-primary)] text-sm">不仅要熟悉各大电商平台的规则与玩法，还需具备较强的<span className="font-bold text-[color:var(--accent-primary)]">数据分析</span>与<span className="font-bold text-[color:var(--accent-primary)]">逻辑思维</span>能力，能够通过数据发现问题、提出改进方案。同时，<span className="font-bold text-[color:var(--accent-primary)]">需要良好的沟通能力和跨部门协作能力</span>，能与供应链、物流、设计、客服等多团队配合，确保项目高效落地。<span className="font-bold text-[color:var(--accent-primary)]">对热点趋势保持敏锐度</span>，并具备一定的抗压能力与学习能力</p>
                </div>

                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[color:var(--accent-primary)]/20 to-[color:var(--accent-light)]/20 border border-[color:var(--border-light)]">
                  <div className="text-2xl font-bold text-[color:var(--accent-primary)] mb-2">待遇</div>
                  <p className="text-[color:var(--text-primary)] text-sm">行业整体薪资水平较有竞争力。专员级岗位起薪一般在 <span className="font-bold text-[color:var(--accent-primary)]">6K–10K</span> 左右，表现优异者晋升速度较快；主管/经理级别可达 <span className="font-bold text-[color:var(--accent-primary)]">15K–30K</span>，不仅有固定薪资，还会结合业绩目标设置绩效奖金；在更高阶的运营负责人、总监等岗位，还会配套 <span className="font-bold text-[color:var(--accent-primary)]">股权激励、年度分红、销售提成</span> 等激励机制，收入上限弹性大，<span className="font-bold text-[color:var(--accent-primary)]">与个人能力和业务业绩高度挂钩</span></p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* 第四部分：通过学习，你能学到什么 */}
        <motion.section
          className="mb-20 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* 章节标题 */}
          <motion.div
            className="flex items-center mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[color:var(--accent-primary)] to-[color:var(--accent-light)] rounded-2xl mr-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white">通过学习，你能学到什么？</h2>
              <p className="text-[color:var(--accent-light)] mt-2">不只是学了就能用的实战技巧</p>
            </div>
          </motion.div>



          {/* 数字人播放器5 - 通过学习，你能学到什么 */}
          <DigitalAvatarPlayer
            videoUrl="https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/video/web_teach/recuYIQO9mkxza.mov"
            position={{ top: 300, right: '-16rem' }}
          />
          {/* 主内容区 - 课程大纲和技能 */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* 课程核心内容卡片 */}
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[color:var(--accent-primary)]/10 to-[color:var(--accent-light)]/10 p-8 border border-[color:var(--border-light)]"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/四、通过学习，你能学到什么？-（一）单元课程目录.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[color:var(--accent-primary)]/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-12 bg-[color:var(--accent-primary)] rounded-full mr-4"></div>
                  <h3 className="text-2xl font-bold text-[color:var(--accent-primary)]">核心课程内容</h3>
                </div>

                <div className="space-y-4">
                  {/* 平台起步 */}
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <span className="text-[color:var(--accent-primary)] font-semibold text-base">平台起步</span>
                    <div className="text-white text-sm mt-2 space-y-1">
                      <p>• 快速搞定主流平台入驻与资质准备（1节）</p>
                      <p>• 踩平台规则红线与违规避坑指南（1节）</p>
                    </div>
                  </div>

                  {/* 店铺打造 */}
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <span className="text-[color:var(--accent-primary)] font-semibold text-base">店铺打造</span>
                    <div className="text-white text-sm mt-2 space-y-1">
                      <p>• 爆单装修秘籍——打造高转化店铺视觉效果（2节）</p>
                      <p>• 上架有套路！商品精细化运营全攻略（1节）</p>
                      <p>• 竞品拆解方式：找到差异化的方法（1节）</p>
                    </div>
                  </div>

                  {/* 营销破局 */}
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <span className="text-[color:var(--accent-primary)] font-semibold text-base">营销破局</span>
                    <div className="text-white text-sm mt-2 space-y-1">
                      <p>• 流量密码！全面掌握来源分析与优化路径（2节）</p>
                      <p>• 活动执行与监控全流程（1节）</p>
                      <p>• AI神器助攻！轻松写爆款标题和关键词（2节）</p>
                    </div>
                  </div>

                  {/* 运营进阶 */}
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <span className="text-[color:var(--accent-primary)] font-semibold text-base">运营进阶</span>
                    <div className="text-white text-sm mt-2 space-y-1">
                      <p>• 订单0失误！日常处理与多平台物流方案（1节）</p>
                      <p>• 客户应对与纠纷处理技巧（1节）</p>
                      <p>• 店铺升级打怪！层级爬升与资源调配策略（2节）</p>
                      <p>• 店铺矩阵化运营打法揭秘（1节）</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 实战技能卡片 */}
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[color:var(--accent-light)]/10 to-[color:var(--accent-light)]/10 p-8 border border-[color:var(--border-light)]"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/四、通过学习，你能学到什么？-（二）本节课课程内容.JPG')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[color:var(--accent-primary)]/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-12 bg-[color:var(--accent-primary)] rounded-full mr-4"></div>
                  <h3 className="text-2xl font-bold text-[color:var(--accent-primary)]">本单元课程重点</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-[color:var(--accent-primary)]" />
                      <span className="text-[color:var(--accent-primary)] font-semibold text-base">行业背景与市场规模分析</span>
                    </div>
                    <p className="text-white text-sm">深入了解电商行业发展趋势与市场机遇</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Building2 className="w-5 h-5 text-[color:var(--accent-primary)]" />
                      <span className="text-[color:var(--accent-primary)] font-semibold text-base">平台运营核心逻辑拆解</span>
                    </div>
                    <p className="text-white text-sm">掌握主流电商平台的运营规则与核心机制</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="w-5 h-5 text-[color:var(--accent-primary)]" />
                      <span className="text-[color:var(--accent-primary)] font-semibold text-base">商品上架与视觉优化实操</span>
                    </div>
                    <p className="text-white text-sm">学习商品精细化运营与高转化店铺视觉设计</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="w-5 h-5 text-[color:var(--accent-primary)]" />
                      <span className="text-[color:var(--accent-primary)] font-semibold text-base">广告投放与流量获取的策略</span>
                    </div>
                    <p className="text-white text-sm">掌握流量来源分析与精准广告投放技巧</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="w-5 h-5 text-[color:var(--accent-primary)]" />
                      <span className="text-[color:var(--accent-primary)] font-semibold text-base">如何通过数据复盘来推动业绩</span>
                    </div>
                    <p className="text-white text-sm">掌握数据分析方法与业务增长策略</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 案例分析和工具应用 */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 涉及到的大型案例 */}
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[color:var(--accent-primary)]/10 to-[color:var(--accent-light)]/10 p-8 border border-[color:var(--border-light)]"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/四、通过学习，你能学到什么？-（三）涉及到的大型案例.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[color:var(--accent-primary)]/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-12 bg-[color:var(--accent-primary)] rounded-full mr-4"></div>
                  <h3 className="text-2xl font-bold text-[color:var(--accent-primary)]">涉及到的大型案例</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Trophy className="w-5 h-5 text-[color:var(--accent-primary)]" />
                      <span className="text-[color:var(--accent-primary)] font-semibold text-base">京东自动化商品文案生成实战</span>
                    </div>
                    <p className="text-white text-sm">学习利用AI技术实现商品文案的批量生成与优化</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Trophy className="w-5 h-5 text-[color:var(--accent-primary)]" />
                      <span className="text-[color:var(--accent-primary)] font-semibold text-base">天虹数科线上线下一体化店铺改造</span>
                    </div>
                    <p className="text-white text-sm">分析全渠道零售模式下的线上线下融合策略</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Trophy className="w-5 h-5 text-[color:var(--accent-primary)]" />
                      <span className="text-[color:var(--accent-primary)] font-semibold text-base">三只松鼠天猫旗舰店直播+双11大作战策略解析</span>
                    </div>
                    <p className="text-white text-sm">复盘头部品牌直播营销与大促爆发式增长策略</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 涉及到 AI 工具教学 */}
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[color:var(--accent-primary)]/10 to-[color:var(--accent-light)]/10 p-8 border border-[color:var(--border-light)]"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8)), url('${process.env.PUBLIC_URL}/images/为什么要学习这门课/四、通过学习，你能学到什么？-（四）涉及到 AI 工具教学.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[color:var(--accent-primary)]/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-12 bg-[color:var(--accent-primary)] rounded-full mr-4"></div>
                  <h3 className="text-2xl font-bold text-[color:var(--accent-primary)]">涉及到 AI 工具教学</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <GPT className="w-5 h-5 text-[color:var(--accent-primary)]" />
                      <span className="text-[color:var(--accent-primary)] font-semibold text-base">ChatGPT</span>
                    </div>
                    <p className="text-white text-sm mt-1">批量生成爆款商品文案、7×24智能客服秒回、一键输出数据复盘报告</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Runway className="w-5 h-5 text-[color:var(--accent-primary)]" />
                      <span className="text-[color:var(--accent-primary)] font-semibold text-base">Midjourney</span>
                    </div>
                    <p className="text-white text-sm mt-1">AI秒出4K级场景图、模特图、节日海报，直接上架换图</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <N8N className="w-5 h-5 text-[color:var(--accent-primary)]" />
                      <span className="text-[color:var(--accent-primary)] font-semibold text-base">N8N</span>
                    </div>
                    <p className="text-white text-sm mt-1">零代码串淘宝/京东/抖店，库存、价格、发帖一键同步，运营早下班</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Edit3 className="w-5 h-5 text-[color:var(--accent-primary)]" />
                      <span className="text-[color:var(--accent-primary)] font-semibold text-base">Adobe Illustrator</span>
                    </div>
                    <p className="text-white text-sm mt-1">AI辅助矢量精修，店招、包装、大促海报视觉统一高颜值</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* 第五部分：岗位晋升路径 */}
        <motion.section className="mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <motion.div
            className="bg-gradient-to-r from-[color:var(--accent-primary)]/10 to-[color:var(--accent-light)]/10 rounded-3xl p-8 border border-[color:var(--border-light)]"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Trophy className="w-10 h-10 text-[color:var(--accent-primary)]" />
              <h2 className="text-3xl font-bold text-white">岗位晋升路径</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="bg-gradient-to-br from-[color:var(--accent-primary)]/10 to-[color:var(--accent-secondary)]/10 rounded-2xl p-6 border border-[color:var(--border-light)] text-center"
                whileHover={{ y: -5 }}
              >
                <div className="text-2xl font-bold text-[color:var(--accent-primary)] mb-2">初级职位</div>
                <div className="text-3xl font-bold text-white mb-4">6K-10K</div>
                <div className="text-[color:var(--accent-light)] text-sm">
                  <div>电商运营专员</div>
                  <div>推广专员</div>
                  <div>客服专员</div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-[color:var(--accent-light)]/10 to-[color:var(--accent-secondary)]/10 rounded-2xl p-6 border border-[color:var(--border-light)] text-center"
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="text-2xl font-bold text-[color:var(--accent-light)] mb-2">中级职位</div>
                <div className="text-3xl font-bold text-white mb-4">15K-30K</div>
                <div className="text-[color:var(--accent-light)] text-sm">
                  <div>电商运营经理</div>
                  <div>推广主管</div>
                  <div>运营主管</div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-[color:var(--accent-primary)]/10 to-[color:var(--accent-light)]/10 rounded-2xl p-6 border border-[color:var(--border-light)] text-center"
                whileHover={{ y: -5 }}
              >
                <div className="text-2xl font-bold text-[color:var(--accent-primary)] mb-2">高级职位</div>
                <div className="text-3xl font-bold text-white mb-4">30K+</div>
                <div className="text-[color:var(--accent-light)] text-sm">
                  <div>电商运营总监</div>
                  <div>平台运营负责人</div>
                  <div>电商事业部总经理</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* 职业发展前景 */}
        <motion.section
          className="mb-20 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* 章节标题 */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 text-gradient"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              职业发展前景
            </motion.h1>



            {/* 数字人播放器6 - 职业发展前景 */}
            <DigitalAvatarPlayer
              videoUrl="https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/video/web_teach/recuYIQO9m8Lt7.mov"
              position={{ top: 0, right: '-16rem' }}
            />
            <motion.p
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              掌握主流平台入驻策略与资质准备技能，开启电商运营领域的职业发展之路，
              成为企业数字化转型过程中不可或缺的专业人才。
            </motion.p>
          </motion.div>

          {/* 职业路径 */}
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text-primary)' }}>主要职业方向</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {careerPaths.map((career, index) => {
              const IconComponent = career.icon;
              return (
                <motion.div
                  key={index}
                  className="glass-card rounded-2xl p-8 border border-[color:var(--border-light)]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(15, 20, 25, 0.7), rgba(26, 37, 47, 0.8))'
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  }}
                >
                  <div className="flex items-start space-x-6">
                    <motion.div
                      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${career.badgeColor} 0%, var(--accent-light) 100%)`,
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.35), inset 0 1px 3px rgba(255, 255, 255, 0.2)'
                      }}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent style={{ color: '#FFFFFF' }} className="w-8 h-8" />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{career.title}</h3>
                      <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{career.description}</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        {career.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            className="p-4 rounded-lg border border-[color:var(--border-light)]"
                            style={{
                              background: skill.highlight
                                ? 'rgba(193, 208, 217, 0.15)'
                                : 'rgba(255, 255, 255, 0.05)'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: skillIndex * 0.05, duration: 0.4 }}
                            viewport={{ once: true }}
                            whileHover={{
                              scale: 1.03,
                              borderColor: "var(--accent-primary)"
                            }}
                          >
                            <div className="flex items-start space-x-3">
                              <CheckCircle
                                className="w-5 h-5 mt-0.5 flex-shrink-0"
                                style={{
                                  color: skill.highlight ? 'var(--accent-primary)' : 'var(--accent-light)'
                                }}
                              />
                              <div>
                                <h4
                                  className="font-semibold mb-1"
                                  style={{
                                    color: skill.highlight ? 'var(--accent-primary)' : 'var(--text-primary)'
                                  }}
                                >
                                  {skill.name}
                                </h4>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{skill.desc}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* 学习路径指引 - 弹簧动画 */}
        <motion.div
          className="glass-card rounded-2xl p-12 text-center max-w-4xl mx-auto relative overflow-hidden"
          style={{
            background: 'rgba(216, 207, 213, 0.18)',
            border: '1px solid rgba(255, 255, 255, 0.25)'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 15,
            delay: 0.2 
          }}
          viewport={{ once: true }}
          whileHover={{ 
            boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.4)"
          }}
        >
          {/* 背景动画粒子效果 */}
          <motion.div
            className="absolute inset-0 opacity-20 rounded-2xl"
            animate={{ 
              background: [
                `radial-gradient(circle at 20% 50%, rgba(193, 208, 217, 0.2) 0%, transparent 50%)`,
                `radial-gradient(circle at 80% 50%, rgba(230, 194, 198, 0.2) 0%, transparent 50%)`,
                `radial-gradient(circle at 50% 80%, rgba(193, 208, 217, 0.2) 0%, transparent 50%)`,
                `radial-gradient(circle at 20% 50%, rgba(193, 208, 217, 0.2) 0%, transparent 50%)`
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <motion.h2 
            className="text-3xl font-bold mb-6 relative z-10"
            style={{ color: 'var(--text-primary)' }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            开始你的电商入驻学习之旅
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto relative z-10"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            按照模块顺序学习，从平台选择到资质准备，循序渐进掌握电商平台入驻精髓。
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/course/platform-overview"
                className="btn-primary rounded-xl shadow-lg inline-block"
              >
                开始学习
              </Link>
            </motion.div>
            

          </motion.div>
        </motion.div>
      </div>
    </div>

    </>
  );
};
  
export default HomePage;
