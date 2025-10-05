import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Eye,
  CheckCircle,
  ArrowRight,
  Settings,
  Monitor,
  Cpu,
  Shield,
  Layers,
  Menu
} from '../../components/Icons';

const SafetyPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('');

  // 页面目录数据
  const tableOfContents = [
    {
      id: 'theory-basics',
      title: '理论基础与概念解析',
      level: 1,
      icon: Target,
      gradient: 'from-still/20 to-dawn/20',
      iconColor: 'text-still',
      children: []
    },
    {
      id: 'technical-points',
      title: '技术要点与操作方法',
      level: 1,
      icon: Shield,
      gradient: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-400',
      children: []
    },
    {
      id: 'practical-applications',
      title: '实践应用与操作要点',
      level: 1,
      icon: Zap,
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
      children: []
    }
  ];

  // 滚动检测当前章节
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = tableOfContents;
      let currentSectionId = '';
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          
          if (scrollPosition >= elementTop - 100) {
            currentSectionId = section.id;
          }
        }
      }
      
      setCurrentSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 平滑滚动到指定章节
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // 页面动画配置
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    },
    hover: {
      y: -2,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      {/* 独立的目录侧边栏 */}
      <div className="fixed left-0 top-20 z-40 w-64 p-4 h-fit">
        {/* 页面目录 */}
        <div className="hidden lg:block">
          {/* 目录标题 */}
          <div className="mb-6">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-br from-still to-dawn rounded-md flex items-center justify-center mr-3">
                <Menu className="w-3 h-3 text-white" />
              </div>
              <h4 className="text-white/90 text-sm font-medium">课程导航</h4>
            </div>
          </div>
          
          {/* 目录内容 - 开放式设计 */}
          <div className="space-y-3">
            {tableOfContents.map((section, index) => (
              <div
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 group
                  ${currentSection === section.id
                    ? 'bg-white/15 backdrop-blur-sm shadow-lg'
                    : 'hover:bg-white/10 hover:backdrop-blur-sm'
                  }
                `}
              >
                {/* 左侧指示线 */}
                <div className={`
                  w-1 h-8 rounded-full mr-4 transition-all duration-200
                  ${currentSection === section.id 
                    ? 'bg-white/80 shadow-lg'
                    : 'bg-white/20 group-hover:bg-white/40'
                  }
                `} />
                
                {/* 图标 */}
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-200
                  ${currentSection === section.id 
                    ? 'bg-white/20' 
                    : 'bg-white/10 group-hover:bg-white/15'
                  }
                `}>
                  <section.icon 
                    size={16} 
                    className={`
                      transition-colors duration-200
                      ${currentSection === section.id 
                        ? section.iconColor
                        : 'text-white/60 group-hover:text-white/80'
                      }
                    `} 
                  />
                </div>
                
                {/* 标题 */}
                <span className={`
                  text-sm font-medium transition-colors duration-200
                  ${currentSection === section.id
                    ? 'text-white'
                    : 'text-white/70 group-hover:text-white/90'
                  }
                `}>
                  {section.title}
                </span>
              </div>
            ))}
          </div>
          
          {/* 简洁的底部提示 */}
          <div className="mt-6 flex items-center justify-center">
            
          </div>
        </div>
      </div>

      {/* 全宽布局容器 */}
      <div className="w-full min-h-screen ml-0 lg:ml-0">
    <motion.main 
      className="relative z-10 min-h-screen flex items-center justify-center py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-6xl mx-auto px-6">
      {/* 页面标题 */}
      <motion.section className="mb-12" variants={itemVariants}>
        <div 
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl text-center p-8 relative overflow-hidden"
          style={{
            backgroundImage: `url("/images/${encodeURIComponent('5.PLC安全强化.jpg')}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top 35%',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-red-900/60 rounded-2xl" />
          
          <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatDelay: 3 
                }}
              >
                <Shield className="w-8 h-8 text-red-400 mr-3 drop-shadow-lg" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">PLC安全强化</h1>
            </div>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              讲解PLC操作中的安全事项，如断电操作、防静电等规范，强化学员安全意识，保障操作时人身和设备安全，避免安全事故发生。
            </p>
          </div>
        </div>
      </motion.section>

      {/* 理论基础与概念解析 */}
      <motion.section id="theory-basics" className="mb-16" variants={itemVariants}>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl mb-8 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Target className="w-6 h-6 mr-3 text-still" />
            理论基础与概念解析
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-still/10 to-dawn/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">PLC安全概述</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                PLC（可编程逻辑控制器）安全强化是保障工业自动化系统稳定、可靠运行的关键环节。首先，PLC安全是指在PLC系统的设计、安装、运行及维护全过程中，采取一系列措施防止人员伤亡、设备损坏和生产中断的综合性保障体系。
              </p>
              <p className="text-white/80 leading-relaxed">
                其重要性源于工业生产中PLC广泛应用于控制机械设备、流水线等，一旦安全失控，将引发严重后果。
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* 电气安全 */}
              <motion.div 
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="w-16 h-16 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-yellow-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-4">电气安全</h4>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  聚焦PLC系统的电气部件及线路的安全。例如，电气线路的短路可能导致设备过热损坏，漏电会危及操作人员生命安全。
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  需确保电气连接可靠、绝缘良好、接地规范等。技术原理是通过规范接地、绝缘和过流保护等措施，阻断电气故障传播路径。
                </p>
              </motion.div>

              {/* 功能安全 */}
              <motion.div 
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Settings className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-4">功能安全</h4>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  强调PLC自身功能的可靠性与安全性。要求PLC在执行控制任务时，能准确、稳定地实现设计功能，当出现故障时能自动进入安全状态。
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  避免因功能异常引发事故。基于故障安全设计理念，让系统在故障时自动切换到安全模式。
                </p>
              </motion.div>

              {/* 数据安全 */}
              <motion.div 
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6"
                variants={cardVariants}
                whileHover="hover"
              >
                                 <div className="w-16 h-16 bg-still/20 rounded-xl flex items-center justify-center mb-6">
                   <Layers className="w-8 h-8 text-still" />
                 </div>
                <h4 className="text-lg font-bold text-white mb-4">数据安全</h4>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  随着工业信息化发展，PLC存储和处理大量生产数据，数据安全包括防止数据泄露、篡改、丢失等。
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  例如，生产工艺参数、设备运行日志等数据若遭破坏，会影响生产秩序与决策。依赖加密、访问控制等技术手段保障数据完整性与保密性。
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 技术要点与操作方法 */}
      <motion.section id="technical-points" className="mb-16" variants={itemVariants}>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl mb-8 p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Cpu className="w-6 h-6 mr-3 text-purple-400" />
            技术要点与操作方法
          </h2>
          <p className="text-white/80">
            掌握PLC电气安全、功能安全、数据安全的具体实施方法和技术要点。
          </p>
        </div>

        {/* 电气安全措施的具体实施 */}
        <div 
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8 relative overflow-hidden"
          style={{
            backgroundImage: `url("/images/backgrounds/5.PLC安全强化/${encodeURIComponent('1.PLC电气安全措施的具体实施.jpg')}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'local'
          }}
        >
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-yellow-900/60 rounded-2xl" />
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center drop-shadow-lg">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              PLC电气安全措施的具体实施
            </h3>
          
          <p className="text-white/80 mb-6">电气安全需从多方面落实：</p>
          
          <div className="space-y-6">
            {/* 接地处理 */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">接地处理</h4>
              <p className="text-white/80 mb-4">
                采用单点接地方式，将PLC设备的金属外壳与大地可靠连接。例如，选用截面积不小于2.5mm²的接地线，连接到专用接地极，接地电阻应≤4Ω，防止静电积累与漏电触电。
              </p>
            </div>

            {/* 绝缘保障 */}
            <div className="bg-gradient-to-r from-still/20 to-dawn/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">绝缘保障</h4>
              <p className="text-white/80 mb-4">
                定期用绝缘电阻测试仪检测电气线路绝缘性能，测试电压根据线路额定电压选择。若绝缘电阻低于1MΩ，需排查电缆破损、老化等问题并修复。例如，发现电缆外皮破损时，用绝缘胶带包裹或更换新电缆。
              </p>
                    </div>

            {/* 过流保护 */}
            <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">过流保护</h4>
              <p className="text-white/80 mb-4">
                在PLC电源回路安装合适的熔断器或断路器，如额定电流为PLC额定工作电流1.5-2倍的熔断器。当电路过流时，保护装置迅速切断电源，避免设备因过流损坏。
              </p>
              <p className="text-white/70 text-sm">
                相关标准如GB 50171-2012《电气装置安装工程 盘、柜及二次回路接线施工及验收规范》对电气安装有明确要求。
                      </p>
                    </div>
                  </div>
                </div>
                  </div>

        {/* 功能安全措施的设计原则 */}
        <div 
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8 relative overflow-hidden"
          style={{
            backgroundImage: `url("/images/backgrounds/5.PLC安全强化/${encodeURIComponent('2.PLC功能安全措施的设计原则.png')}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'local'
          }}
        >
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-green-900/60 rounded-2xl" />
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center drop-shadow-lg">
              <Settings className="w-5 h-5 mr-2 text-green-400" />
              PLC功能安全措施的设计原则
            </h3>
          
          <div className="space-y-6">
            {/* 故障安全设计 */}
            <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">故障安全设计</h4>
              <p className="text-white/80 mb-4">
                系统应具备故障检测与自动切换功能。例如，设计冗余PLC模块，主模块故障时备用模块立即投入运行。
              </p>
              <p className="text-white/70 text-sm">
                以某自动化生产线为例，当主PLC模块检测到输入信号异常时，备用模块迅速接管控制，确保生产线安全停止。
              </p>
                </div>

            {/* 程序可靠性设计 */}
            <div className="bg-gradient-to-r from-still/20 to-dawn/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">程序可靠性设计</h4>
              <p className="text-white/80 mb-4">
                采用结构化编程，避免程序漏洞。如使用模块化编程将不同功能封装成独立模块，便于调试与维护。
              </p>
              <p className="text-white/70 text-sm">
                同时，定期对程序进行静态审查和动态测试，模拟极端工况验证程序安全性。
              </p>
                      </div>

            {/* 安全认证遵循 */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">安全认证遵循</h4>
              <p className="text-white/80">
                遵循国际标准如IEC 61508《电气/电子/可编程电子安全相关系统的功能安全》，确保PLC功能安全设计符合行业规范。
              </p>
                  </div>
                </div>
              </div>
            </div>

        {/* 数据安全措施的保护方法 */}
        <div 
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 relative overflow-hidden"
          style={{
            backgroundImage: `url("/images/backgrounds/5.PLC安全强化/${encodeURIComponent('3.PLC数据安全措施的保护方法1.jpg')}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            aspectRatio: '16/9'
          }}
        >
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-rock/60 rounded-2xl" />
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center drop-shadow-lg">
              <Eye className="w-5 h-5 mr-2 text-still" />
              PLC数据安全措施的保护方法
            </h3>
          
          <div className="space-y-6">
            {/* 加密存储 */}
            <div className="bg-gradient-to-r from-still/20 to-mist/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">加密存储</h4>
              <p className="text-white/80">
                对关键生产数据采用对称加密或非对称加密技术。例如，用AES加密算法对PLC存储的工艺参数进行加密，只有授权用户通过密钥才能解密数据。
              </p>
            </div>

            {/* 访问控制 */}
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">访问控制</h4>
              <p className="text-white/80">
                设置用户权限分级，如分为管理员、操作员、观察者等不同角色，限制不同角色对数据的操作权限。通过用户名和密码验证，确保只有授权人员能访问关键数据。
              </p>
            </div>

            {/* 数据备份与恢复 */}
            <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">数据备份与恢复</h4>
              <p className="text-white/80">
                定期自动备份PLC数据到外部存储设备，如每周进行一次全量备份，每日进行增量备份。当数据出现异常时，可通过备份快速恢复，保障生产连续性。
              </p>
            </div>
          </div>
          </div>
        </div>
      </motion.section>

      {/* 实践应用与操作要点 */}
      <motion.section id="practical-applications" className="mb-16" variants={itemVariants}>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl mb-8 p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Target className="w-6 h-6 mr-3 text-purple-400" />
            实践应用与操作要点
          </h2>
          <p className="text-white/80">
            通过具体的实践操作步骤，掌握三大安全措施的详细实施方法和注意事项。
          </p>
        </div>

        {/* 电气安全实践操作步骤 */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
            电气安全实践操作步骤
          </h3>

        <div className="space-y-8">
            {/* 接地安装操作 */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">1. 接地安装操作</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="bg-yellow-500/30 rounded-lg p-3 mb-3">
                    <h5 className="font-semibold text-white text-sm">步骤一</h5>
                  </div>
                  <p className="text-white/80 text-sm">选择干燥、远离腐蚀性物质的接地位置，用冲击钻打孔深度≥0.8m。</p>
                </div>
                <div>
                  <div className="bg-yellow-500/30 rounded-lg p-3 mb-3">
                    <h5 className="font-semibold text-white text-sm">步骤二</h5>
                  </div>
                  <p className="text-white/80 text-sm">将接地线一端用螺栓紧固在PLC设备的接地端子上，另一端垂直埋入接地极。</p>
                </div>
                <div>
                  <div className="bg-yellow-500/30 rounded-lg p-3 mb-3">
                    <h5 className="font-semibold text-white text-sm">步骤三</h5>
                  </div>
                  <p className="text-white/80 text-sm">用混凝土回填固定。</p>
                </div>
                </div>
              </div>
              
            {/* 绝缘检查操作 */}
            <div className="bg-gradient-to-r from-still/20 to-dawn/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">2. 绝缘检查操作</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="bg-still/30 rounded-lg p-3 mb-3">
                    <h5 className="font-semibold text-white text-sm">步骤一</h5>
                  </div>
                  <p className="text-white/80 text-sm">关闭PLC电源，断开待检测线路的电源连接。</p>
                </div>
                <div>
                  <div className="bg-still/30 rounded-lg p-3 mb-3">
                    <h5 className="font-semibold text-white text-sm">步骤二</h5>
                  </div>
                  <p className="text-white/80 text-sm">将绝缘电阻测试仪的L端接火线，E端接地线，选择1000V测试电压档位。</p>
                </div>
                <div>
                  <div className="bg-still/30 rounded-lg p-3 mb-3">
                    <h5 className="font-semibold text-white text-sm">步骤三</h5>
                  </div>
                  <p className="text-white/80 text-sm">按下测试按钮，读取绝缘电阻值并记录。</p>
                </div>
              </div>
            </div>

            {/* 过流保护装置安装操作 */}
            <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">3. 过流保护装置安装操作</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="bg-red-500/30 rounded-lg p-3 mb-3">
                    <h5 className="font-semibold text-white text-sm">步骤一</h5>
        </div>
                  <p className="text-white/80 text-sm">关闭PLC总电源，将熔断器或断路器安装在电源进线端的配电箱内。</p>
              </div>
                <div>
                  <div className="bg-red-500/30 rounded-lg p-3 mb-3">
                    <h5 className="font-semibold text-white text-sm">步骤二</h5>
                  </div>
                  <p className="text-white/80 text-sm">确保装置安装牢固，接线正确。</p>
                </div>
                <div>
                  <div className="bg-red-500/30 rounded-lg p-3 mb-3">
                    <h5 className="font-semibold text-white text-sm">步骤三</h5>
                  </div>
                  <p className="text-white/80 text-sm">然后接通电源，测试过流保护功能是否正常。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 功能安全实践操作步骤 */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-green-400" />
            功能安全实践操作步骤
          </h3>
          
          <div className="space-y-8">
            {/* 冗余模块配置操作 */}
            <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">1. 冗余模块配置操作</h4>
              <div className="space-y-4">
                <p className="text-white/80 text-sm leading-relaxed">
                  • 在PLC控制柜内安装备用冗余模块，确保模块与主模块型号兼容。
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  • 通过PLC编程软件进入冗余配置界面，设置主备模块的切换条件（如主模块输入信号丢失时间超过2秒）。
                </p>
              </div>
            </div>
            
            {/* 故障检测程序编写操作 */}
            <div className="bg-gradient-to-r from-still/20 to-dawn/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">2. 故障检测程序编写操作</h4>
              <div className="space-y-4">
                <p className="text-white/80 text-sm leading-relaxed">
                  • 打开PLC编程软件，采用梯形图语言编写故障检测程序。例如，编写监测输入点X0-X10的程序，当输入点超过5秒无信号时，输出故障信号M0。
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  • 将编写好的程序下载到PLC中，进行模拟测试，验证故障检测功能是否正常。
                </p>
            </div>
          </div>
          
            {/* 程序审查与测试操作 */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">3. 程序审查与测试操作</h4>
              <div className="space-y-4">
                <p className="text-white/80 text-sm leading-relaxed">
                  • 由专业人员对PLC程序进行代码审查，检查逻辑分支是否完整、变量使用是否正确。
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  • 搭建模拟测试环境，输入各种故障模拟信号，测试PLC在不同故障下的响应是否符合安全设计要求。
                </p>
                </div>
            </div>
          </div>
        </div>

        {/* 安全注意事项与故障排除 */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8">
                     <h3 className="text-xl font-bold text-white mb-6 flex items-center">
             <Target className="w-5 h-5 mr-2 text-orange-400" />
             安全注意事项与故障排除
           </h3>
          
          <div className="space-y-6">
            {/* 操作注意事项 */}
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">操作注意事项</h4>
              <p className="text-white/80 mb-4">
                进行电气操作时必须穿戴绝缘手套、绝缘鞋，严格遵循断电操作原则，避免带电作业。功能测试时要逐步加载测试信号，防止系统突然动作。
          </p>
        </div>

            {/* 故障排除示例 */}
            <div className="bg-gradient-to-r from-still/20 to-dawn/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">故障排除示例</h4>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">电气接地不良</h5>
                  <p className="text-white/70 text-sm">若出现电气接地不良导致设备漏电报警，首先断开电源，检查接地线连接是否松动，重新紧固后再次测试接地电阻。</p>
                      </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">冗余模块无法切换</h5>
                  <p className="text-white/70 text-sm">若功能安全中冗余模块无法切换，检查冗余配置参数是否设置错误，重新调整参数并测试。</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">数据备份失败</h5>
                  <p className="text-white/70 text-sm">若数据安全中出现备份失败，检查备份存储设备是否正常、备份路径是否正确，修复后重新执行备份操作。</p>
                </div>
              </div>
            </div>

            {/* 总结 */}
            <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">课程总结</h4>
              <p className="text-white/80">
                通过以上理论结合实践的讲解，学员能系统掌握PLC安全强化的各项内容，具备在实际工业场景中实施PLC安全措施、排查安全故障的能力，为保障工业自动化系统的安全稳定运行奠定基础。
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 课程导航 */}
      <motion.section className="mt-12" variants={itemVariants}>
        <div className="flex justify-between items-center">
          <Link 
            to="/course/program-development" 
            className="flex items-center px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
            <span>PLC程序开发与调试</span>
          </Link>
          <Link 
            to="/course-summary" 
            className="flex items-center px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <span>课程总结</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </motion.section>
      </div>
    </motion.main>
  </div>
  </>
  );
};

export default SafetyPage;
