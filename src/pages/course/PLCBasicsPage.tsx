import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Cpu, Settings, Target, CheckCircle, Network, Monitor, Zap, Menu } from '../../components/Icons';

const PLCBasicsPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('');
  
  // 透明背景视频状态
  const [isTransparentVideoExpanded, setIsTransparentVideoExpanded] = useState(false);
  const [isTransparentVideoPlaying, setIsTransparentVideoPlaying] = useState(false);
  const [isTargetModuleVisible, setIsTargetModuleVisible] = useState(false);
  const transparentVideoRef = useRef<HTMLVideoElement>(null);

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

  // 目标模块可见性检测
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTargetModuleVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 透明背景视频播放控制
  const handleTransparentVideoTogglePlay = async () => {
    console.log('透明视频控制被触发', { isTransparentVideoExpanded, isTransparentVideoPlaying });
    
    if (!isTransparentVideoExpanded) {
      // 第一次点击：展开视频播放器
      setIsTransparentVideoExpanded(true);
      // 等待下一个渲染周期再播放视频
      setTimeout(async () => {
        if (transparentVideoRef.current) {
          try {
            console.log('尝试播放透明视频...');
            await transparentVideoRef.current.play();
            setIsTransparentVideoPlaying(true);
            console.log('透明视频播放成功');
          } catch (error) {
            console.error('透明视频播放失败:', error);
            setIsTransparentVideoPlaying(false);
          }
        }
      }, 100);
    } else {
      // 已展开时：播放/暂停切换
      if (transparentVideoRef.current) {
        if (isTransparentVideoPlaying) {
          console.log('暂停透明视频');
          transparentVideoRef.current.pause();
          setIsTransparentVideoPlaying(false);
        } else {
          try {
            console.log('继续播放透明视频');
            await transparentVideoRef.current.play();
            setIsTransparentVideoPlaying(true);
          } catch (error) {
            console.error('透明视频播放失败:', error);
            setIsTransparentVideoPlaying(false);
          }
        }
      }
    }
  };

  const handleTransparentVideoClose = () => {
    setIsTransparentVideoExpanded(false);
    setIsTransparentVideoPlaying(false);
    if (transparentVideoRef.current) {
      transparentVideoRef.current.pause();
      transparentVideoRef.current.currentTime = 0;
    }
  };

  const handleTransparentVideoEnd = () => {
    setIsTransparentVideoPlaying(false);
    setIsTransparentVideoExpanded(false);
  };

  // 绿幕抠图处理函数
  const startGreenScreenProcessing = () => {
    const video = transparentVideoRef.current;
    const canvas = document.getElementById('greenscreen-canvas-plc') as HTMLCanvasElement;
    
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置canvas尺寸匹配视频
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const processFrame = () => {
      if (video.paused || video.ended) {
        // 视频暂停或结束时，绘制最后一帧但不处理
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return;
      }

      // 绘制当前帧到canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // 获取图像数据
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // 优化的绿幕抠图算法
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const alpha = data[i + 3];
        
        // 更精确的绿色检测算法
        const greenness = green - Math.max(red, blue);
        const brightness = (red + green + blue) / 3;
        
        // 检测绿色像素 - 使用更精确的阈值
        const isGreen = greenness > 50 && 
                       green > 80 && 
                       green > red * 1.2 && 
                       green > blue * 1.2 &&
                       brightness > 60;
        
        if (isGreen) {
          // 计算透明度，创建平滑边缘
          const transparency = Math.min(greenness / 80, 1);
          data[i + 3] = Math.max(0, alpha * (1 - transparency));
          
          // 对边缘像素进行颜色调整，减少绿色残留
          if (data[i + 3] > 0 && data[i + 3] < 255) {
            const factor = data[i + 3] / 255;
            data[i] = Math.min(255, red * factor + red * 0.1); // 轻微增强红色
            data[i + 1] = Math.max(0, green * factor - green * 0.2); // 减少绿色
            data[i + 2] = Math.min(255, blue * factor + blue * 0.1); // 轻微增强蓝色
          }
        }
      }

      // 将处理后的图像数据绘制回canvas
      ctx.putImageData(imageData, 0, 0);
      
      // 继续处理下一帧
      requestAnimationFrame(processFrame);
    };

    // 开始处理
    processFrame();
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    },
    hover: {
      y: -2,
      scale: 1.01,
      transition: { duration: 0.2 }
    }
  };

  const plcCharacteristics = [
    {
      title: '可靠性高',
      description: '采用多重抗干扰技术，能在电磁干扰、温度变化等恶劣工业环境中稳定运行',
      details: [
        '电源部分的多级滤波，有效滤除电网中的杂波',
        'CPU内部采用隔离技术，防止内部电路受外部干扰',
        '输入输出端口的光电隔离，将外部信号与内部电路隔开，避免外部强电信号对内部电路的冲击'
      ],
      icon: Settings,
      badgeColor: 'var(--still)'
    },
    {
      title: '编程便捷',
      description: '通常提供梯形图、语句表等编程语言，其中梯形图类似继电器电路图，工程人员可直观编程，降低了编程门槛',
      details: [
        '图形化编程界面，以梯形图为例，工程师可像绘制继电器电路图一样进行编程',
        '无需复杂的代码编写，大大提高了编程效率'
      ],
      icon: Monitor,
      badgeColor: 'var(--still)'
    },
    {
      title: '功能丰富',
      description: '除基本的逻辑运算（如与、或、非）外，还具备定时、计数、模拟量处理等功能，可满足多样化工业控制需求',
      details: [
        '基本逻辑运算：与、或、非等逻辑功能',
        '定时功能：实现延时控制',
        '计数功能：对脉冲信号进行计数',
        '模拟量处理：处理连续变化的信号'
      ],
      icon: Network,
      badgeColor: 'var(--still)'
    },
    {
      title: '模块化设计',
      description: '使得PLC可根据实际项目需求灵活配置，方便系统的扩展与维护',
      details: [
        '根据项目的输入输出点数选择合适的CPU模块、I/O模块等',
        '需要增加输入点数时，可直接添加相应的数字量输入模块',
        '方便系统扩展与维护'
      ],
      icon: Target,
      badgeColor: 'var(--still)'
    }
  ];

  const workingPrinciple = [
    {
      phase: '输入采样阶段',
      description: 'PLC以周期性扫描的方式，依次读取所有输入端子的状态，并将这些状态存入输入映像寄存器中',
      details: [
        'PLC以周期性扫描的方式，依次读取所有输入端子的状态',
        '将这些状态存入输入映像寄存器中',
        '例如，当外部的按钮开关闭合时，在输入采样阶段，PLC会将该开关的闭合状态记录到输入映像寄存器'
      ],
      icon: Target,
      badgeColor: 'var(--still)',
      step: 1
    },
    {
      phase: '程序执行阶段',
      description: 'PLC按照用户编写的程序顺序依次扫描执行，根据输入映像寄存器中的状态和程序逻辑进行运算，运算结果会存入输出映像寄存器',
      details: [
        'PLC按照用户编写的程序顺序依次扫描执行',
        '根据输入映像寄存器中的状态和程序逻辑进行运算',
        '运算结果会存入输出映像寄存器'
      ],
      icon: Cpu,
      badgeColor: 'var(--still)',
      step: 2
    },
    {
      phase: '输出刷新阶段',
      description: 'PLC将输出映像寄存器中的状态集中输出到输出端子，从而驱动外部的继电器、接触器等负载设备',
      details: [
        'PLC将输出映像寄存器中的状态集中输出到输出端子',
        '从而驱动外部的继电器、接触器等负载设备'
      ],
      icon: Settings,
      badgeColor: 'var(--still)',
      step: 3
    }
  ];

  const hardwareComponents = [
    {
      component: '电源模块（PS）',
      mainFunction: '将工业用电（通常为AC 220V或AC 110V）转换为PLC内部各模块所需的直流电源（如DC 24V等）',
      description: '以西门子S7-1200系列为例，其电源模块能够为CPU、信号模块等提供稳定的直流电压',
      selectionCriteria: [
        '需根据PLC系统的功耗来选择合适功率的电源模块',
        '例如计算所有模块的功耗总和，确保电源模块的输出功率大于等于总功耗',
        '同时要保证电源模块的输出电压和电流能够满足所有模块的需求，避免出现供电不足的情况'
      ],
      icon: Zap,
      badgeColor: 'var(--still)'
    },
    {
      component: '中央处理器（CPU）',
      mainFunction: '负责执行用户程序、处理数据以及协调各模块的工作',
      description: 'CPU是PLC的核心部件，以西门子S7-300系列的CPU为例，不同型号的CPU具有不同的处理能力和功能',
      examples: [
        {
          model: 'CPU 315-2 DP',
          features: '具备较高的运算速度和较大的内存容量，适合复杂的控制任务'
        },
        {
          model: 'CPU 312',
          features: '集成了更多的通信接口，便于与其他设备进行通信'
        }
      ],
      selectionCriteria: [
        '要根据控制任务的复杂程度和I/O点数等来选择合适的CPU型号',
        '若控制任务简单且I/O点数较少，可选择低型号CPU',
        '若控制任务复杂且I/O点数较多，则需选择高型号CPU'
      ],
      icon: Cpu,
      badgeColor: 'var(--still)'
    },
    {
      component: '信号模块（SM）',
      mainFunction: '用于连接PLC的输入输出设备',
      description: '输入信号模块将外部的开关量、模拟量等信号转换为PLC能够识别的数字信号，输出信号模块则将PLC的数字信号转换为外部设备能够接受的信号',
      examples: [
        {
          type: '输入信号模块',
          model: 'SM 1231',
          function: '可以连接模拟量传感器，将模拟量信号转换为数字量信号传入PLC'
        },
        {
          type: '输出信号模块',
          model: 'SM 1222',
          function: '可以连接继电器，将PLC的数字信号转换为继电器的控制信号，进而控制外部设备'
        }
      ],
      selectionCriteria: [
        '要根据输入输出信号的类型（开关量或模拟量）、点数等来选择相应的信号模块',
        '要保证信号模块的电气参数与外部设备匹配，如输入信号模块的输入电压范围要与外部传感器的输出电压范围一致'
      ],
      icon: Network,
      badgeColor: 'var(--still)'
    },
    {
      component: '功能模块（FM）',
      mainFunction: '用于扩展PLC的特殊功能',
      description: '如高速计数、位置控制、PID控制等',
      examples: [
        {
          model: 'FM 350-1',
          function: '西门子的高速计数功能模块，可以实现对高速脉冲信号的计数，适用于需要精确计数的场合，如生产线上产品的计数'
        }
      ],
      selectionCriteria: [
        '要根据具体的功能需求来选择合适的功能模块',
        '并正确进行参数设置，例如设置高速计数模块的计数频率、计数模式等参数，以满足实际的计数要求'
      ],
      icon: Settings,
      badgeColor: 'var(--still)'
    },
    {
      component: '接口模块（IM）',
      mainFunction: '用于连接不同机架的PLC模块，实现模块之间的信号传输',
      description: '在大型PLC系统中，可能会使用多个机架，此时就需要接口模块来连接各机架，确保各模块之间能够正常通信和数据传输',
      examples: [
    {
          model: 'IM 460-1',
          function: '西门子S7-400系列的接口模块，可以连接不同的机架，实现机架之间的信号传递'
        }
      ],
      selectionCriteria: [
        '选型接口模块时要考虑机架的数量和模块之间的信号传输距离等因素',
        '保证信号传输的稳定性和可靠性'
      ],
      icon: Monitor,
      badgeColor: 'var(--still)'
    },
    {
      component: '通信处理器（CP）',
      mainFunction: '用于实现PLC与外部设备的通信',
      description: '如与计算机、其他PLC、变频器等设备进行通信',
      examples: [
        {
          model: 'CP 343-1',
          function: '西门子S7系列PLC的通信处理器，支持以太网通信，能够使PLC接入工业以太网，实现与上位机、其他PLC等设备的网络通信'
        }
      ],
      selectionCriteria: [
        '要根据通信需求选择合适的通信处理器',
        '并进行通信参数的设置，如设置以太网通信的IP地址、波特率等',
        '确保PLC能够与外部设备正常通信'
      ],
      icon: Target,
      badgeColor: 'var(--still)'
    }
  ];

  const practicalApplication = {
    title: '西门子S7-1200 PLC硬件配置案例',
    scenario: '简单的传送带启停控制项目',
    steps: [
      {
        step: '确定I/O点数',
        description: '该项目需要2个输入点（用于控制传送带启动和停止的按钮信号）和2个输出点（用于控制传送带电机正反转的继电器信号）'
      },
      {
        step: '选择CPU',
        description: '选择西门子S7-1200系列的CPU 1214C，该CPU具备24个数字量输入/16个数字量输出的I/O点数，能够满足此项目的需求'
      },
      {
        step: '选择信号模块',
        description: '选择2个数字量输入模块SM 1221（型号6ES7 221-1BH32-0XB0）和2个数字量输出模块SM 1222（型号6ES7 222-1BH32-0XB0）'
    },
    {
        step: '安装模块',
        description: '将CPU模块、输入模块和输出模块安装到PLC机架上，按照机架的安装说明正确插入模块，保证连接牢固'
      },
      {
        step: '连接外部设备',
        description: '将启动按钮连接到输入模块的输入端子上，停止按钮连接到另一个输入端子上；将控制传送带电机正转的继电器连接到输出模块的一个输出端子上，控制电机反转的继电器连接到另一个输出端子上'
      }
    ],
    operationPoints: [
      {
        category: '硬件安装',
        points: [
          '安装PLC模块时必须先切断电源，避免触电事故',
          '按照模块的安装说明正确插入机架，确保模块与机架的连接紧密，防止接触不良'
        ]
      },
      {
        category: '接线',
        points: [
          '接线时要严格按照端子标识进行，输入线和输出线不能接错',
          '对于模拟量信号的接线，要使用屏蔽线，并且要正确接地，防止外界干扰信号影响PLC的正常工作',
          '例如，模拟量输入信号的屏蔽线要连接到PLC的接地端子上'
        ]
      },
      {
        category: '参数设置',
        points: [
          '通过西门子的编程软件TIA Portal对CPU和各模块进行参数设置',
          '打开软件后，创建新项目，添加相应的CPU和信号模块',
          '然后设置输入输出模块的地址、功能模块的参数等',
          '例如，设置输入模块的输入地址为I0.0、I0.1，输出模块的输出地址为Q0.0、Q0.1'
        ]
      },
      {
        category: '故障排除',
        points: [
          '如果出现PLC无法正常工作的情况，首先检查电源是否正常，查看电源模块的指示灯是否亮起',
          '如果电源正常，检查模块是否安装牢固，接线是否正确',
          '若指示灯异常或接线有误，进行相应的调整',
          '如果是程序问题，打开编程软件检查用户程序是否有错误，例如逻辑错误、语法错误等',
          '例如，如果传送带无法启动，首先查看输入模块的指示灯是否正常，若输入指示灯未亮起，检查按钮接线是否正确；若输入指示灯正常，检查程序中启动逻辑部分是否有误'
        ]
      }
    ]
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
      <motion.section className="mb-12" variants={itemVariants}>
        <div 
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl text-center p-8 relative overflow-hidden"
          style={{
            backgroundImage: `url("/images/${encodeURIComponent('2.PLC核心定位与硬件基础.jpg')}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top 35%',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-rock/60 to-purple-900/70"></div>
          
          {/* 内容 */}
          <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, repeatDelay: 3 }
                }}
              >
                <Cpu className="w-8 h-8 text-still mr-3 drop-shadow-lg" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">PLC核心定位与硬件基础</h1>
            </div>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              明确PLC在自动化控制系统中作为核心控制器的功能，讲解其硬件构成，让学员理解PLC硬件基础对其控制功能实现的重要性。
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section id="theory-basics" className="mb-16" variants={itemVariants}>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl mb-8 p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-still" />
            理论基础与概念解析
          </h2>
        </div>

        <motion.div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8" variants={cardVariants}>
          <h3 className="text-xl font-bold text-white mb-4">1. PLC特性与工作原理概述</h3>
          <div className="space-y-6">
                    <div>
              <h4 className="text-lg font-semibold text-white mb-3">PLC核心特性</h4>
              <p className="text-white/80 leading-relaxed mb-4">
                可编程逻辑控制器（PLC）是专为工业环境设计的数字运算控制装置。其核心特性显著：
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {plcCharacteristics.map((characteristic, index) => (
                  <motion.div
                    key={characteristic.title}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${characteristic.badgeColor} rounded-lg flex items-center justify-center mr-4`}>
                        <characteristic.icon className="w-6 h-6 text-white" />
                      </div>
                      <h5 className="text-lg font-bold text-white">{characteristic.title}</h5>
                  </div>
                    <p className="text-white/80 text-sm mb-3 leading-relaxed">{characteristic.description}</p>
                    <ul className="text-white/70 text-xs space-y-1">
                      {characteristic.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
        </div>
        </motion.div>

        <motion.div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8" variants={cardVariants}>
          <h3 className="text-xl font-bold text-white mb-6">2. PLC工作原理基于扫描循环机制</h3>
          <p className="text-white/80 mb-6 leading-relaxed">
            PLC的工作原理基于扫描循环机制，具体分为三个阶段：
          </p>
          <div className="grid gap-6">
            {workingPrinciple.map((phase, index) => (
              <motion.div
                key={phase.phase}
                className="border-l-4 border-still bg-still/10 rounded-r-lg p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${phase.badgeColor} rounded-lg flex items-center justify-center mr-4`}>
                    <phase.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="bg-still text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
                      阶段 {phase.step}
                    </span>
                    <h4 className="text-lg font-bold text-white inline">{phase.phase}</h4>
              </div>
            </div>
                <p className="text-white/80 mb-4 leading-relaxed">{phase.description}</p>
                <ul className="text-white/70 text-sm space-y-2">
                  {phase.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
          ))}
          
          {/* PLC扫描循环工作原理图 */}
          <div className="mt-8">
            <img 
              src={`/images/backgrounds/2.PLC核心定位与硬件基础/${encodeURIComponent('20250630-001847.png')}`}
              alt="PLC扫描循环工作原理图"
              className="w-full h-auto rounded-lg shadow-lg"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
        </motion.div>
      </motion.section>

      <motion.section id="technical-points" className="mb-16" variants={itemVariants}>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl mb-8 p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Target className="w-6 h-6 mr-3 text-green-400" />
            技术要点与操作方法
          </h2>
          
          {/* PLC基本结构图 */}
          <div className="mt-6">
            <img 
              src={`/images/backgrounds/2.PLC核心定位与硬件基础/${encodeURIComponent('2.PLC的基本结构2.png')}`}
              alt="PLC的基本结构图"
              className="w-full h-auto rounded-lg shadow-lg"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>

        <div className="grid gap-8">
          {hardwareComponents.map((component, index) => (
            <motion.div
              key={component.component}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${component.badgeColor} rounded-lg flex items-center justify-center mr-4`}>
                  <component.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{component.component}</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">主要作用</h4>
                  <p className="text-white/80 leading-relaxed">{component.mainFunction}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">详细说明</h4>
                  <p className="text-white/80 leading-relaxed">{component.description}</p>
                </div>

                                 {component.examples && (
                   <div>
                     <h4 className="text-lg font-semibold text-white mb-3">具体示例</h4>
                     <div className="grid gap-3">
                       {component.examples.map((example, idx) => (
                         <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-4">
                           <div className="flex items-start justify-between">
                             <div>
                               <h5 className="font-semibold text-white">
                                 {(example as any).model || (example as any).type}
                               </h5>
                               <p className="text-white/80 text-sm mt-1">
                                 {(example as any).features || (example as any).function}
                               </p>
                             </div>
                           </div>
                      </div>
                    ))}
                  </div>
                </div>
                 )}
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">选型标准</h4>
                  <ul className="text-white/80 text-sm space-y-2">
                    {component.selectionCriteria.map((criteria, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        {criteria}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section id="practical-applications" className="mb-16" variants={itemVariants}>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl mb-8 p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-purple-400" />
            实践应用与操作要点
          </h2>
        </div>

        <motion.div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8" variants={cardVariants}>
          <h3 className="text-xl font-bold text-white mb-6">{practicalApplication.title}</h3>
          <p className="text-white/80 mb-6">以{practicalApplication.scenario}为例，说明PLC硬件配置步骤：</p>

          <div className="space-y-6">
            <div>
              {/* 西门子S7-1200 PLC硬件配置案例图片 */}
              <div className="mb-6">
                <div 
                  className="w-full aspect-video rounded-lg shadow-lg border border-white/20 overflow-hidden bg-gray-800"
                  style={{
                    backgroundImage: `url("/images/backgrounds/2.PLC核心定位与硬件基础/${encodeURIComponent('3.西门子S7 - 1200 PLC硬件配置案例.jpg')}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                  title="西门子S7-1200 PLC硬件配置案例"
                />
              </div>
              
              <h4 className="text-lg font-semibold text-white mb-4">配置步骤</h4>
              <div className="grid gap-4">
                {practicalApplication.steps.map((step, index) => (
                  <div key={index} className="flex items-start bg-white/5 border border-white/10 rounded-lg p-4">
                    <span className="bg-still text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <h5 className="font-semibold text-white mb-1">{step.step}</h5>
                      <p className="text-white/80 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              </div>
              
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">操作步骤与注意事项</h4>
              <div className="grid md:grid-cols-2 gap-6">
                {practicalApplication.operationPoints.map((category, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-6">
                    <h5 className="text-lg font-semibold text-white mb-3">{category.category}</h5>
                    <ul className="text-white/80 text-sm space-y-2">
                      {category.points.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
            </div>
          ))}
        </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-300 mb-3">学习总结</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                通过以上实践应用，学生能够掌握PLC硬件配置的基本步骤和方法，了解在实际项目中如何根据需求进行硬件选型和配置，同时熟悉硬件安装、接线、参数设置以及故障排除的相关知识，提高实际操作能力，为后续的PLC编程和应用打下坚实基础。
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section className="mb-8" variants={itemVariants}>
        <div className="flex justify-between items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
          <Link 
            to="/course/automation-industry" 
            className="flex items-center text-white/80 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            上一页：PLC行业认知与基础框架
          </Link>
          <Link 
            to="/course/io-wiring" 
            className="flex items-center text-white/80 hover:text-white transition-colors group"
          >
            下一页：电气接线与信号认知
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.section>
      </div>
      
      {/* 透明背景导师视频播放器 */}
      <div className="fixed bottom-6 right-[-44px] z-50">
        <AnimatePresence>
          {isTargetModuleVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="flex justify-center">
                <AnimatePresence>
                  {!isTransparentVideoExpanded ? (
                    // 透明视频头像按钮
                    <motion.div
                      className="relative"
                    >
                      <motion.div
                        className="w-32 h-32 rounded-full cursor-pointer relative overflow-hidden shadow-xl group"
                        onClick={handleTransparentVideoTogglePlay}
                        whileHover={{ 
                          scale: 1.05,
                          rotate: [0, -2, 2, 0],
                          transition: { 
                            scale: { type: "spring", stiffness: 300, damping: 20 },
                            rotate: { duration: 0.8, ease: "easeInOut" }
                          }
                        }}
                        whileTap={{ 
                          scale: 0.95,
                          transition: { 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 20,
                            duration: 0.1
                          }
                        }}
                        style={{
                          background: 'transparent',
                          backdropFilter: 'blur(10px)',
                          transformOrigin: 'center center'
                        }}
                      >
                        {/* 渐变背景层 */}
                        <div className="absolute inset-0 bg-gradient-to-br from-still/20 via-mist/20 to-dawn/20 rounded-full"></div>
                        
                        {/* 播放按钮覆盖层 */}
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-all duration-300 rounded-full">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-10 h-10 text-white drop-shadow-lg mb-2 flex items-center justify-center">
                              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-white text-xs font-medium drop-shadow">透明导师</span>
                          </motion.div>
                        </div>
                        
                        {/* 绿色光环效果 */}
                        <motion.div
                          className="absolute -inset-1 rounded-full bg-gradient-to-r from-still to-dawn opacity-20 pointer-events-none"
                          animate={{
                            scale: [1, 1.02, 1],
                            opacity: [0.2, 0.4, 0.2]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  ) : (
                    // 展开的透明背景视频播放器
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="relative"
                    >
                      {/* 占位元素 - 保持布局稳定 */}
                      <div className="w-32 h-32 opacity-0"></div>

                      {/* 透明背景视频容器 - 绝对定位覆盖按钮位置 */}
                      <div 
                        className="absolute w-96 h-56 overflow-hidden"
                        style={{
                          background: 'transparent',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                                      {/* 绿幕抠图Canvas层 */}
                                      <canvas
                                        id="greenscreen-canvas-plc"
                                        className="absolute inset-0 w-full h-full object-contain"
                                        style={{ display: 'block' }}
                                      />

                                      {/* 透明背景视频播放器 (隐藏原始视频) */}
                                      <video
                                        ref={transparentVideoRef}
                                        className="w-full h-full object-contain"
                                        onEnded={handleTransparentVideoEnd}
                                        onPause={() => setIsTransparentVideoPlaying(false)}
                                        onPlay={() => {
                                          setIsTransparentVideoPlaying(true);
                                          // 启动绿幕抠图处理
                                          if (transparentVideoRef.current) {
                                            startGreenScreenProcessing();
                                          }
                                        }}
                                        muted={false}
                                        controls={false}
                                        playsInline
                                        preload="metadata"
                                        style={{ 
                                          background: 'transparent',
                                          display: 'none', // 隐藏原始视频，只显示处理后的canvas
                                          mixBlendMode: 'normal'
                                        }}
                                      >
                                        <source src="/tutor-transparent.mp4" type="video/mp4" />
                                        您的浏览器不支持视频播放。
                                      </video>
                                    </div>

                      {/* 控制按钮 - 绝对定位在视频下方，播放时隐藏，悬停时显示 */}
                      <motion.div 
                        className="absolute flex justify-center space-x-3 mt-12"
                        style={{
                          left: '50%',
                          top: '100%',
                          transform: 'translateX(-50%)'
                        }}
                        initial={{ opacity: 1 }}
                        animate={{ 
                          opacity: isTransparentVideoPlaying ? 0 : 1,
                          y: isTransparentVideoPlaying ? 5 : 0
                        }}
                        transition={{ 
                          duration: 0.2, 
                          ease: "easeOut"
                        }}
                        whileHover={isTransparentVideoPlaying ? { 
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.2 }
                        } : {}}
                      >
                        <button
                          onClick={handleTransparentVideoTogglePlay}
                          className="w-10 h-10 bg-green-600/90 hover:bg-green-700 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95"
                        >
                          {isTransparentVideoPlaying ? (
                            <div className="w-4 h-4 bg-white rounded-sm"></div>
                          ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={handleTransparentVideoClose}
                          className="w-10 h-10 bg-red-600/90 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  </div>
  </>
  );
};

export default PLCBasicsPage;
