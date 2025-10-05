import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, BookOpen, Settings, Target, CheckCircle, Network, Monitor, Cpu, Zap, Clock, Hash, Calculator, Power, Code, ArrowDown, RefreshCw, Shield, Menu } from '../../components/Icons';

const ProgramDevelopmentPage: React.FC = () => {
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
      icon: Network,
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
              backgroundImage: `url("/images/${encodeURIComponent('4.PLC程序开发与调试.jpg')}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top 35%',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-purple-900/60 rounded-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  animate={{ 
                    rotateY: [0, 360],
                    rotateX: [0, 15, 0]
                  }}
                  transition={{ 
                    rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                    rotateX: { duration: 4, repeat: Infinity, repeatDelay: 2 }
                  }}
                >
                  <BookOpen className="w-8 h-8 text-green-400 mr-3 drop-shadow-lg" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">PLC程序开发与调试</h1>
              </div>
              <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                深入了解PLC程序开发流程，掌握多种编程语言及其应用，学习TIA Portal操作与调试技巧
              </p>
            </div>
          </div>
        </motion.section>

        {/* 理论基础与概念解析 */}
        <motion.section id="theory-basics" className="mb-16" variants={itemVariants}>
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl mb-8 p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Target className="w-6 h-6 mr-3 text-still" />
              理论基础与概念解析
            </h2>
          </div>

          {/* PLC程序在工业自动化中的应用 */}
          <motion.div 
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Network className="w-5 h-5 mr-2 text-cyan-400" />
              PLC程序在工业自动化中的应用
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {[
                {
                  name: "逻辑控制",
                  description: "PLC通过逻辑控制实现设备的精准启停和顺序操作，确保工业生产过程的高效与精确。",
                  icon: <Settings className="w-6 h-6" />,
                  color: "bg-gradient-to-br from-still/10 to-dawn/10",
                  iconColor: "text-still",
                  borderColor: "border-still/20"
                },
                {
                  name: "运动控制",
                  description: "PLC的运动控制功能可精确调控机械部件的位置和速度，提升生产效率与产品质量。",
                  icon: <Zap className="w-6 h-6" />,
                  color: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
                  iconColor: "text-yellow-400",
                  borderColor: "border-yellow-500/20"
                },
                {
                  name: "过程控制",
                  description: "PLC的过程控制能对温度、压力、流量等参数精准调控，保障生产过程的稳定与高效。",
                  icon: <Monitor className="w-6 h-6" />,
                  color: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
                  iconColor: "text-green-400",
                  borderColor: "border-green-500/20"
                },
                {
                  name: "数据采集与监控",
                  description: "PLC可采集生产数据并实时监控设备状态，为生产管理提供支持并及时预警故障。",
                  icon: <Target className="w-6 h-6" />,
                  color: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
                  iconColor: "text-purple-400",
                  borderColor: "border-purple-500/20"
                },
                {
                  name: "通信与网络集成",
                  description: "PLC的通信与网络集成功能实现设备间高效通信及系统整合，提升工业生产的自动化与管理水平。",
                  icon: <Network className="w-6 h-6" />,
                  color: "bg-gradient-to-br from-mist/10 to-still/10",
                  iconColor: "text-indigo-400",
                  borderColor: "border-indigo-500/20"
                }
              ].map((application, idx) => (
                <motion.div
                  key={idx}
                  className={`${application.color} backdrop-blur-sm border ${application.borderColor} rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-white/10`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4 ${application.iconColor}`}>
                      {application.icon}
                    </div>
                    <h4 className="font-bold text-white text-lg">{application.name}</h4>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">{application.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* PLC程序开发流程本质 */}
          <motion.div 
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-green-400" />
              PLC程序开发流程本质
            </h3>
            
            <div className="text-white/90 space-y-6">
              <p>PLC程序开发是实现自动化控制的关键环节。首先是<span className="text-green-400">需求分析</span>，需明确被控对象的具体功能，例如要实现对多台电机的顺序启停控制，就要确定每台电机的启动、停止条件及先后顺序等。</p>
              <p>接着进行<span className="text-cyan-400">硬件组态</span>，根据需求选择合适的PLC型号，如西门子S7-1200系列，然后配置相应的输入输出模块，像数字量输入模块用于接收按钮等开关量信号，模拟量输出模块用于控制模拟量设备等，并设置各模块的地址等参数。</p>
              <p>之后进入编程阶段，利用特定的编程语言来编写实现控制功能的代码。编写完成后进行<span className="text-yellow-400">编译</span>，编译器会检查程序是否存在语法错误、逻辑错误等，若有错误需返回修改程序。编译无误后将程序下载到PLC中，最后进行<span className="text-purple-400">调试</span>，通过模拟运行或连接实际被控设备，观察PLC输出是否符合预期，若不符合则排查问题并修正程序。</p>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Target className="w-4 h-4 mr-2 text-still" />
                开发流程步骤
              </h4>
              
              <div className="grid lg:grid-cols-3 gap-6">
                {[
                  {
                    step: 1,
                    name: "需求分析",
                    description: "明确被控制对象功能",
                    icon: <Target className="w-6 h-6" />,
                    color: "bg-gradient-to-br from-still/10 to-dawn/10",
                    iconColor: "text-still",
                    borderColor: "border-still/20"
                  },
                  {
                    step: 2,
                    name: "硬件组态",
                    description: "选择PLC型号和模块",
                    icon: <Settings className="w-6 h-6" />,
                    color: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
                    iconColor: "text-green-400",
                    borderColor: "border-green-500/20"
                  },
                  {
                    step: 3,
                    name: "编程阶段",
                    description: "编写控制程序代码",
                    icon: <Code className="w-6 h-6" />,
                    color: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
                    iconColor: "text-yellow-400",
                    borderColor: "border-yellow-500/20"
                  },
                  {
                    step: 4,
                    name: "编译检查",
                    description: "检查语法和逻辑错误",
                    icon: <CheckCircle className="w-6 h-6" />,
                    color: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
                    iconColor: "text-purple-400",
                    borderColor: "border-purple-500/20"
                  },
                  {
                    step: 5,
                    name: "程序下载",
                    description: "将程序下载到PLC",
                    icon: <ArrowDown className="w-6 h-6" />,
                    color: "bg-gradient-to-br from-indigo-500/10 to-violet-500/10",
                    iconColor: "text-indigo-400",
                    borderColor: "border-indigo-500/20"
                  },
                  {
                    step: 6,
                    name: "调试优化",
                    description: "验证和修正程序",
                    icon: <RefreshCw className="w-6 h-6" />,
                    color: "bg-gradient-to-br from-red-500/10 to-orange-500/10",
                    iconColor: "text-red-400",
                    borderColor: "border-red-500/20"
                  }
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    className={`${step.color} backdrop-blur-sm border ${step.borderColor} rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-white/10`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4 ${step.iconColor}`}>
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-white/50 text-sm">步骤 {step.step}</div>
                        <h4 className="font-bold text-white text-lg">{step.name}</h4>
                      </div>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* PLC编程语言分类 */}
          <motion.div 
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
              PLC编程语言分类
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {[
                {
                  name: "梯形图（LD）",
                  description: "以类似继电器控制电路图的形式呈现，由常开触点、常闭触点、线圈等图形元素构成",
                  advantages: "直观易懂，非常适合初学者理解逻辑控制关系",
                  example: "在简单的交通信号灯控制中，用梯形图能清晰表示各信号灯的启停逻辑",
                  color: "bg-gradient-to-br from-still/10 to-dawn/10",
                  borderColor: "border-still/20",
                  titleColor: "text-still"
                },
                {
                  name: "功能块图（FBD）",
                  description: "采用类似数字逻辑电路的图形表示，由功能块和连线组成",
                  advantages: "功能块可实现加法、乘法等各种运算功能",
                  example: "适用于需要复杂运算的场景，比如对模拟量采集值进行复杂的数学运算处理",
                  color: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
                  borderColor: "border-green-500/20",
                  titleColor: "text-green-300"
                },
                {
                  name: "结构化文本（ST）",
                  description: "是类高级编程语言，语法类似C语言",
                  advantages: "适合实现复杂的算法",
                  example: "当需要根据多个参数进行复杂的逻辑判断和数据处理时，如根据温度、压力等多个参数来控制设备的运行状态",
                  color: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
                  borderColor: "border-purple-500/20",
                  titleColor: "text-purple-300"
                },
                {
                  name: "指令表（IL）",
                  description: "类似于汇编语言，由一系列指令组成，每个指令完成特定功能",
                  advantages: "对于熟悉汇编语言的工程师来说，编写程序简洁高效",
                  example: "如LDA（加载累加器）、STA（存储累加器）等指令，但对于新手来说理解难度较大",
                  color: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
                  borderColor: "border-orange-500/20",
                  titleColor: "text-orange-300"
                },
                {
                  name: "顺序功能图（SFC）",
                  description: "主要用于描述顺序控制流程，将复杂的顺序控制过程分解为多个步和转换条件",
                  advantages: "适用于顺序控制类项目",
                  example: "在生产线上的物料搬运过程，可通过顺序功能图清晰表示出物料从搬运起点到终点的各个步骤及转换条件",
                  color: "bg-gradient-to-br from-indigo-500/10 to-violet-500/10",
                  borderColor: "border-indigo-500/20",
                  titleColor: "text-indigo-300"
                }
              ].map((lang, idx) => (
                <motion.div
                  key={idx}
                  className={`${lang.color} backdrop-blur-sm border ${lang.borderColor} rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-white/5`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <h4 className={`font-bold ${lang.titleColor} text-lg mb-3`}>{lang.name}</h4>
                  <p className="text-white/85 text-sm mb-3 leading-relaxed">{lang.description}</p>
                  <div className="mb-3">
                    <span className="text-green-300 text-xs font-semibold">优点：</span>
                    <span className="text-white/75 text-xs ml-1">{lang.advantages}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <span className="text-cyan-300 text-xs font-semibold">应用示例：</span>
                    <p className="text-white/75 text-xs mt-1">{lang.example}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* 技术要点与操作方法 */}
        <motion.section id="technical-points" className="mb-16" variants={itemVariants}>
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl mb-8 p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Settings className="w-6 h-6 mr-3 text-green-400" />
              技术要点与操作方法
            </h2>
          </div>

          {/* PLC梯形图编程常见软件介绍 */}
          <motion.div 
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              backgroundImage: `url("/images/backgrounds/4.PLC程序开发与调试/${encodeURIComponent('2.PLC梯形图编程常见软件介绍1.jpg')}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-cyan-900/60 rounded-2xl" />
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center drop-shadow-lg">
                <Monitor className="w-5 h-5 mr-2 text-cyan-400" />
                PLC梯形图编程常见软件介绍
              </h3>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-still/10 to-dawn/10 backdrop-blur-sm border border-still/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Network className="w-5 h-5 mr-2 text-still" />
                  TIA Portal（西门子自动化软件的集成环境）
                </h4>
                <p className="text-white/90 text-sm mb-6">目前常用的PLC梯形图编程软件有西门子的TIA Portal和三菱的GX Works3等。以西门子TIA Portal为例，它是西门子自动化软件的集成环境。</p>
                
                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-green-400 font-semibold mb-3">主要功能特点</h5>
                    <ul className="space-y-2">
                      {[
                        "硬件组态功能强大，能方便地添加PLC模块、设置模块参数",
                        "可以快速添加CPU模块、I/O模块等，并准确设置各模块的输入输出地址",
                        "编程界面直观，支持梯形图、功能块图等多种编程语言的编写",
                        "具备高效的编译和调试功能，能快速检测程序中的错误并提示修改"
                      ].map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-white/90 text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <h5 className="text-cyan-400 font-semibold mb-2">操作优势</h5>
                      <div className="space-y-3">
                        <div>
                          <h6 className="text-white/90 text-sm font-medium mb-1">硬件组态</h6>
                          <p className="text-white/75 text-sm">快速添加和配置各种硬件模块</p>
                        </div>
                        <div>
                          <h6 className="text-white/90 text-sm font-medium mb-1">多语言支持</h6>
                          <p className="text-white/75 text-sm">用户可根据需求来选择合适的编程语言</p>
                        </div>
                        <div>
                          <h6 className="text-white/90 text-sm font-medium mb-1">调试功能</h6>
                          <p className="text-white/75 text-sm">高效的编辑和调试，快速定位错误</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </motion.div>

          {/* 基础指令 */}
          <motion.div 
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Cpu className="w-5 h-5 mr-2 text-green-400" />
              基础指令
            </h3>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {[
                {
                  name: "常开触点",
                  description: "当输入信号为1时导通，为0时断开",
                  icon: <Settings className="w-6 h-6" />,
                  color: "bg-gradient-to-br from-still/10 to-dawn/10",
                  iconColor: "text-still",
                  borderColor: "border-still/20"
                },
                {
                  name: "常闭触点",
                  description: "当输入信号为0时导通，为1时断开",
                  icon: <Zap className="w-6 h-6" />,
                  color: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
                  iconColor: "text-yellow-400",
                  borderColor: "border-yellow-500/20"
                },
                {
                  name: "线圈指令",
                  description: "根据逻辑条件控制输出状态",
                  icon: <Monitor className="w-6 h-6" />,
                  color: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
                  iconColor: "text-green-400",
                  borderColor: "border-green-500/20"
                },
                {
                  name: "定时器",
                  description: "实现延时控制功能",
                  icon: <Clock className="w-6 h-6" />,
                  color: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
                  iconColor: "text-purple-400",
                  borderColor: "border-purple-500/20"
                },
                {
                  name: "计数器",
                  description: "实现计数控制功能",
                  icon: <Hash className="w-6 h-6" />,
                  color: "bg-gradient-to-br from-indigo-500/10 to-violet-500/10",
                  iconColor: "text-indigo-400",
                  borderColor: "border-indigo-500/20"
                },
                {
                  name: "数据处理",
                  description: "实现数据运算和处理功能",
                  icon: <Calculator className="w-6 h-6" />,
                  color: "bg-gradient-to-br from-red-500/10 to-orange-500/10",
                  iconColor: "text-red-400",
                  borderColor: "border-red-500/20"
                }
              ].map((instruction, idx) => (
                <motion.div
                  key={idx}
                  className={`${instruction.color} backdrop-blur-sm border ${instruction.borderColor} rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-white/10`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4 ${instruction.iconColor}`}>
                      {instruction.icon}
                    </div>
                    <h4 className="font-bold text-white text-lg">{instruction.name}</h4>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">{instruction.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 编程范式 */}
          <motion.div 
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Code className="w-5 h-5 mr-2 text-yellow-400" />
              编程范式
            </h3>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {[
                {
                  name: "启保停电路",
                  description: "实现设备的启动、保持运行和停止控制",
                  example: "电机的启动和停止控制",
                  icon: <Power className="w-6 h-6" />,
                  color: "bg-gradient-to-br from-still/10 to-dawn/10",
                  iconColor: "text-still",
                  borderColor: "border-still/20"
                },
                {
                  name: "定时控制",
                  description: "实现基于时间的顺序控制",
                  example: "交通信号灯的定时切换",
                  icon: <Clock className="w-6 h-6" />,
                  color: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
                  iconColor: "text-green-400",
                  borderColor: "border-green-500/20"
                },
                {
                  name: "计数控制",
                  description: "实现基于计数的控制逻辑",
                  example: "产品计数和分类控制",
                  icon: <Hash className="w-6 h-6" />,
                  color: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
                  iconColor: "text-purple-400",
                  borderColor: "border-purple-500/20"
                }
              ].map((pattern, idx) => (
                <motion.div
                  key={idx}
                  className={`${pattern.color} backdrop-blur-sm border ${pattern.borderColor} rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-white/10`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4 ${pattern.iconColor}`}>
                      {pattern.icon}
                    </div>
                    <h4 className="font-bold text-white text-lg">{pattern.name}</h4>
                  </div>
                  <p className="text-white/90 text-sm mb-3 leading-relaxed">{pattern.description}</p>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <span className="text-cyan-300 text-xs font-semibold">应用示例：</span>
                    <p className="text-white/75 text-xs mt-1">{pattern.example}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* 实践应用与操作要点 */}
        <motion.section id="practical-applications" className="mb-16" variants={itemVariants}>
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl mb-8 p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-purple-400" />
              实践应用与操作要点
            </h2>
          </div>

          {/* TIA Portal基础操作流程 */}
          <motion.div 
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-still" />
              TIA Portal基础操作流程
            </h3>
            
            <div className="space-y-8">
              {[
                {
                  step: "步骤1",
                  title: "创建项目",
                  description: "打开TIA Portal软件，点击'新建项目'，输入项目名称，如'电机控制项目'，选择合适的PLC型号，如S7-1200系列，然后点击'创建'按钮，进入项目创建界面",
                  color: "bg-still"
                },
                {
                  step: "步骤2",
                  title: "硬件组态",
                  description: "在项目树中找到'硬件'选项，双击进入硬件组态界面。从硬件目录中选择CPU模块（如CPU 1214C）、数字量输入模块（如SM 1221）和数字量输出模块（如SM 1223），将其拖拽到硬件组态的机架上，并设置模块的参数，如输入输出地址，例如将输入模块的地址设置为I0.0-I0.7，输出模块的地址设置为Q0.0-Q0.7",
                  color: "bg-green-500"
                },
                {
                  step: "步骤3",
                  title: "编写程序",
                  description: "点击'添加新的块'，选择'梯形图'编程语言，进入编程界面。根据电机启停控制需求，编写梯形图程序：将启动按钮对应的输入点（如I0.0）的常开触点与电机线圈（如Q0.0）并联，将停止按钮对应的输入点（如I0.1）的常闭触点与电机线圈串联",
                  color: "bg-purple-500"
                },
                {
                  step: "步骤4",
                  title: "下载程序",
                  description: "将PLC与计算机通过编程电缆连接好，在TIA Portal中点击'下载'按钮，在弹出的下载对话框中选择下载到PLC的方式，如在线下载，等待程序下载完成，此时PLC将根据下载的程序进行运行准备",
                  color: "bg-orange-500"
                },
                {
                  step: "步骤5",
                  title: "调试程序",
                  description: "点击'在线'按钮，进入在线监控状态。通过状态表监控输入输出点的状态，例如查看I0.0是否为1（启动按钮按下时）、Q0.0是否为1（电机运转时）。如果电机不能正常启停，检查硬件连接是否正确，如编程电缆是否插紧，模块是否安装牢固；再检查程序逻辑，查看启动按钮、停止按钮对应的触点及线圈部分是否正确",
                  color: "bg-red-500"
                }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  className="flex gap-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 ${step.color} rounded-xl flex items-center justify-center text-white font-bold`}>
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <div className="flex items-center mb-3">
                        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
                          {step.step}
                        </span>
                        <h4 className="text-lg font-bold text-white">{step.title}</h4>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 调试方法与故障排除 */}
          <motion.div 
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <RefreshCw className="w-5 h-5 mr-2 text-purple-400" />
              调试方法与故障排除
            </h3>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* 调试方法 */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4">调试方法</h4>
                
                <div className="bg-gradient-to-br from-still/10 to-dawn/10 backdrop-blur-sm border border-still/20 rounded-xl p-6">
                  <h5 className="text-still font-semibold mb-3 flex items-center">
                    <Monitor className="w-5 h-5 mr-2" />
                    在线监控
                  </h5>
                  <p className="text-white/90 text-sm mb-3">通过TIA Portal的在线监控功能，实时查看PLC中各输入输出点的状态，以及程序中各触点、线圈的状态，从而直观判断程序的运行情况</p>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <span className="text-cyan-300 text-xs font-semibold">应用：</span>
                    <p className="text-white/75 text-xs mt-1">能看到某个输入点是否导通，某个线圈是否得电</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
                  <h5 className="text-green-400 font-semibold mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    状态表监控
                  </h5>
                  <p className="text-white/90 text-sm mb-3">创建状态表，将需要监控的输入输出点添加到状态表中，实时监控这些点的变化</p>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <span className="text-cyan-300 text-xs font-semibold">应用：</span>
                    <p className="text-white/75 text-xs mt-1">比如创建一个状态表，包括启动按钮输入点I0.0、停止按钮输入点I0.1和电机输出点Q0.0，通过观察状态表中这些点的当前值问题</p>
                  </div>
                </div>
              </div>

              {/* 故障排除 */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4">故障排除</h4>
                
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                  <h5 className="text-purple-400 font-semibold mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    故障排除步骤
                  </h5>
                  <p className="text-white/90 text-sm mb-3">若发现PLC输出不符合预期，首先检查硬件连接，确保编程电缆连接牢固，模块安装正确，然后检查程序逻辑，查看触点是否按预期闭合开断，线圈是否按预期得电断电。</p>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <span className="text-cyan-300 text-xs font-semibold">故障排除实例：</span>
                    <p className="text-white/75 text-xs mt-1">若电机不运转，首先检查电机的电源是否正常，然后查看PLC输出点Q0.0是否有输出，若没有输出，再检查程序中电机线圈对应的梯形图部分是否正确，是否存在触点未闭合等情况。</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-mist/10 to-still/10 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-4">
                    <h6 className="text-indigo-400 font-semibold mb-2">硬件检查</h6>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-indigo-400 mr-2" />
                        <span className="text-white/90 text-xs">电缆连接，模块安装</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-indigo-400 mr-2" />
                        <span className="text-white/90 text-xs">设备供电是否正常</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl p-4">
                    <h6 className="text-red-400 font-semibold mb-2">程序检查</h6>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-red-400 mr-2" />
                        <span className="text-white/90 text-xs">触点状态、线圈得电</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-red-400 mr-2" />
                        <span className="text-white/90 text-xs">PLC输出点状态确认</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* 导航按钮 */}
        <motion.div 
          className="flex justify-between items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6"
          variants={itemVariants}
        >
          <Link 
            to="/course/io-wiring" 
            className="flex items-center text-white/80 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            上一页：电气接线与信号认知
          </Link>
          
          <Link 
            to="/course/safety" 
            className="flex items-center text-white/80 hover:text-white transition-colors group"
          >
            下一页：PLC安全强化
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </motion.main>
  </div>
  </>
  );
};

export default ProgramDevelopmentPage; 