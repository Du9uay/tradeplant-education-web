import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Zap, Settings, Target, CheckCircle, Network, Monitor, Cpu, Menu } from '../../components/Icons';

const IOWiringPage: React.FC = () => {
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

  const inputSignalTypes = [
    {
      type: '开关量输入信号',
      description: '具有明确的"开"和"关"两种状态的信号',
      characteristics: [
        '只有两种状态：开通和关断',
        '状态之间有明确的界限',
        '常见的开关量信号有按钮开关、行程开关、接近开关等'
      ],
      examples: [
        {
          device: '按钮开关',
          application: '当按钮被按下时，电路导通，信号为"1"；当按钮松开时，电路断开，信号为"0"',
          usage: '常用于手动控制启动和停止'
        },
        {
          device: '行程开关',
          application: '当机械装置运动到某个位置时，触发行程开关，信号变为"1"；离开该位置时，信号变为"0"',
          usage: '用于检测机械装置的位置状态'
        },
        {
          device: '接近开关',
          application: '当金属物体接近接近开关时，信号为"1"；远离时，信号为"0"',
          usage: '用于非接触式检测物体的存在'
        }
      ],
      icon: Settings,
      color: 'from-still to-dawn'
    },
    {
      type: '模拟量输入信号',
      description: '连续变化的信号，其数值大小可以在一定范围内连续改变',
      characteristics: [
        '信号值在一定范围内连续变化',
        '能够反映被测量的精确数值',
        '常见的模拟量信号有温度、压力、流量等传感器输出的信号'
      ],
      examples: [
        {
          device: '温度传感器',
          application: '输出4-20mA电流信号，4mA对应0℃，20mA对应100℃，中间值线性对应相应温度',
          usage: '用于温度监测和控制'
        },
        {
          device: '压力传感器',
          application: '输出0-10V电压信号，0V对应0MPa，10V对应1MPa，中间值线性对应相应压力',
          usage: '用于压力监测和控制'
        },
        {
          device: '流量计',
          application: '输出频率信号，频率的高低对应流量的大小',
          usage: '用于流量测量和控制'
        }
      ],
      icon: Monitor,
      color: 'from-green-500 to-teal-500'
    }
  ];

  const outputSignalTypes = [
    {
      type: '开关量输出信号',
      description: 'PLC输出的开关量信号用于控制外部的开关设备',
      characteristics: [
        '只有两种状态：输出和不输出',
        '用于控制继电器、接触器、电磁阀等开关设备',
        '输出信号通常为24V直流或220V交流'
      ],
      applications: [
        {
          device: '继电器控制',
          description: 'PLC输出开关量信号控制继电器的通断，继电器再控制更大功率的负载设备',
          example: '控制电机的启动和停止'
        },
        {
          device: '电磁阀控制',
          description: 'PLC输出开关量信号控制电磁阀的开关，从而控制流体的通断',
          example: '控制气缸的伸缩或液体的流向'
        },
        {
          device: '指示灯控制',
          description: 'PLC输出开关量信号控制指示灯的亮灭，用于显示设备的工作状态',
          example: '运行指示、故障报警等状态显示'
        }
      ],
      icon: Zap,
      color: 'from-orange-500 to-red-500'
    },
    {
      type: '模拟量输出信号',
      description: 'PLC输出的模拟量信号用于控制外部的模拟设备',
      characteristics: [
        '信号值在一定范围内连续变化',
        '用于精确控制设备的运行参数',
        '常见的输出信号有4-20mA电流信号、0-10V电压信号等'
      ],
      applications: [
        {
          device: '变频器控制',
          description: 'PLC输出模拟量信号控制变频器的频率，从而控制电机的转速',
          example: '根据工艺要求精确调节传送带速度'
        },
        {
          device: '调节阀控制',
          description: 'PLC输出模拟量信号控制调节阀的开度，从而控制流量或压力',
          example: '在化工过程中精确控制反应物的配比'
        },
        {
          device: '伺服驱动器控制',
          description: 'PLC输出模拟量信号控制伺服驱动器，实现精确的位置和速度控制',
          example: '在自动化生产线中实现高精度定位'
        }
      ],
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const wiringPrinciples = [
    {
      category: '开关量输入接线',
      principles: [
        {
          title: '电源供电',
          description: '开关量输入通常需要24V直流电源供电',
          details: '将24V电源的正极连接到PLC输入模块的公共端（COM），负极接地'
        },
        {
          title: '信号接线',
          description: '将开关设备的一端连接到24V电源的负极，另一端连接到PLC的输入端子',
          details: '当开关闭合时，24V电压加到PLC的输入端子上，PLC识别为"1"信号'
        },
        {
          title: '注意事项',
          description: '确保接线正确，避免短路和接地故障',
          details: '输入端子与公共端之间不能短接，否则会损坏PLC输入模块'
        }
      ],
      example: {
        scenario: '按钮开关接线',
        description: '以西门子S7-1200 PLC为例，将启动按钮接到I0.0输入端子',
        steps: [
          '将24V电源正极接到PLC输入模块的1L+端子（公共端）',
          '将24V电源负极接地',
          '将按钮开关的一端接到24V电源负极',
          '将按钮开关的另一端接到PLC的I0.0端子',
          '当按钮按下时，I0.0端子得到24V电压，PLC识别为"1"'
        ]
      },
      icon: Settings,
      color: 'from-still to-still/90'
    },
    {
      category: '模拟量输入接线',
      principles: [
        {
          title: '信号类型识别',
          description: '首先要确定传感器输出的信号类型（4-20mA、0-10V等）',
          details: '不同类型的信号需要不同的接线方式和模块配置'
        },
        {
          title: '屏蔽线使用',
          description: '模拟量信号容易受到干扰，必须使用屏蔽线',
          details: '屏蔽层要可靠接地，防止外界电磁干扰影响信号精度'
        },
        {
          title: '极性注意',
          description: '电流信号和电压信号都有正负极性，接线时不能接反',
          details: '接反会导致读数错误或损坏设备'
        }
      ],
      example: {
        scenario: '温度传感器接线',
        description: '4-20mA电流型温度传感器接线到S7-1200模拟量输入模块',
        steps: [
          '确认传感器输出为4-20mA电流信号',
          '将传感器的正极接到PLC模拟量输入模块的正极端子',
          '将传感器的负极接到PLC模拟量输入模块的负极端子',
          '屏蔽线的屏蔽层接到PLC的接地端子',
          '在PLC程序中配置模拟量输入通道为4-20mA电流输入'
        ]
      },
      icon: Monitor,
      color: 'from-green-500 to-green-600'
    },
    {
      category: '开关量输出接线',
      principles: [
        {
          title: '负载类型选择',
          description: '根据负载类型选择合适的输出模块（继电器输出、晶体管输出等）',
          details: '继电器输出适合交流负载，晶体管输出适合直流负载'
        },
        {
          title: '负载功率匹配',
          description: '确保PLC输出模块的驱动能力大于负载的功率需求',
          details: '如果负载功率过大，需要通过中间继电器进行功率放大'
        },
        {
          title: '保护措施',
          description: '在输出回路中加入适当的保护元件',
          details: '如熔断器、空气开关等，防止过载和短路'
        }
      ],
      example: {
        scenario: '电机控制接线',
        description: '通过PLC控制交流接触器，进而控制三相电机',
        steps: [
          '将PLC开关量输出端子（如Q0.0）的正极接到接触器线圈的一端',
          '将24V电源的负极接到接触器线圈的另一端',
          '将PLC输出模块的公共端接到24V电源的正极',
          '当PLC输出"1"信号时，接触器线圈得电，主触点闭合，电机启动',
          '当PLC输出"0"信号时，接触器线圈失电，主触点断开，电机停止'
        ]
      },
      icon: Zap,
      color: 'from-orange-500 to-orange-600'
    },
    {
      category: '模拟量输出接线',
      principles: [
        {
          title: '信号匹配',
          description: '确保PLC输出的信号类型与受控设备的输入信号类型匹配',
          details: '如PLC输出4-20mA，受控设备输入也必须是4-20mA'
        },
        {
          title: '负载阻抗',
          description: '电流输出时要注意负载阻抗，电压输出时要注意负载电阻',
          details: '负载阻抗过大或过小都会影响输出精度'
        },
        {
          title: '接地处理',
          description: '模拟量输出回路要正确接地，避免地电位差的影响',
          details: '使用单点接地方式，避免接地回路'
        }
      ],
      example: {
        scenario: '变频器控制接线',
        description: '通过PLC模拟量输出控制变频器频率',
        steps: [
          '确认变频器频率控制输入为0-10V电压信号',
          '将PLC模拟量输出模块的正极接到变频器的AI+端子',
          '将PLC模拟量输出模块的负极接到变频器的AI-端子',
          '确保两设备共地，防止地电位差',
          '在PLC程序中设置输出范围对应变频器的频率范围'
        ]
      },
      icon: Target,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const practicalCase = {
    title: '小型传送带控制系统接线实例',
    description: '该系统包含启动按钮、停止按钮、速度调节旋钮（模拟量输入）、运行指示灯、故障报警灯以及变频器控制',
    components: [
      {
        name: '启动按钮',
        type: '开关量输入',
        connection: '接到PLC的I0.0端子',
        function: '手动启动传送带'
      },
      {
        name: '停止按钮',
        type: '开关量输入',
        connection: '接到PLC的I0.1端子',
        function: '手动停止传送带'
      },
      {
        name: '速度调节旋钮',
        type: '模拟量输入',
        connection: '输出0-10V信号接到PLC的AI0通道',
        function: '调节传送带运行速度'
      },
      {
        name: '运行指示灯',
        type: '开关量输出',
        connection: '由PLC的Q0.0端子控制',
        function: '显示传送带运行状态'
      },
      {
        name: '故障报警灯',
        type: '开关量输出',
        connection: '由PLC的Q0.1端子控制',
        function: '显示系统故障状态'
      },
      {
        name: '变频器',
        type: '模拟量输出',
        connection: 'PLC的AO0通道输出0-10V控制变频器频率',
        function: '控制电机转速'
      }
    ],
    wiringSteps: [
      {
        step: '开关量输入接线',
        details: [
          '将24V电源正极接到PLC输入模块的1L+端子',
          '启动按钮一端接24V电源负极，另一端接I0.0端子',
          '停止按钮一端接24V电源负极，另一端接I0.1端子',
          '确保按钮为常开触点'
        ]
      },
      {
        step: '模拟量输入接线',
        details: [
          '速度调节旋钮（电位器）的滑动端接到PLC的AI0+端子',
          '电位器的一端接到+10V基准电源，另一端接地',
          '使用屏蔽线连接，屏蔽层接地',
          '在PLC中配置AI0通道为0-10V电压输入'
        ]
      },
      {
        step: '开关量输出接线',
        details: [
          '运行指示灯一端接24V电源正极，另一端接Q0.0端子',
          '故障报警灯一端接24V电源正极，另一端接Q0.1端子',
          'PLC输出模块的1L+端子接24V电源负极',
          '确保指示灯额定电压为24V'
        ]
      },
      {
        step: '模拟量输出接线',
        details: [
          'PLC的AO0+端子接变频器的AI+端子',
          'PLC的AO0-端子接变频器的AI-端子',
          '确保PLC和变频器共地连接',
          '在变频器中设置AI通道为0-10V电压输入，对应0-50Hz输出频率'
        ]
      }
    ],
    safetyPrecautions: [
      '接线前必须切断所有电源，确保安全',
      '使用合适规格的导线，确保载流能力满足要求',
      '模拟量信号必须使用屏蔽线，并正确接地',
      '接线完成后要仔细检查，避免短路和接错线',
      '通电前要再次确认接线正确性'
    ],
    testingProcedure: [
      '先进行断电状态下的通断测试，检查开关量输入输出',
      '使用万用表测试模拟量信号的电压或电流值',
      '逐个模块单独测试，确认每个I/O点工作正常',
      '系统集成测试，验证整体功能',
      '在实际负载条件下进行运行测试'
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
            backgroundImage: `url("/images/${encodeURIComponent('3.号认知.jpg')}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top 15%',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-rock/60 to-purple-900/70"></div>
          
          {/* 内容 */}
          <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-yellow-400 mr-3 drop-shadow-lg" />
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">电气接线与信号认知</h1>
            </div>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              理解输入输出信号类型的差异，掌握基本的电气接线原理和规范，为后续编程和调试奠定基础。
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

        {/* 电气信号本质剖析 */}
        <motion.div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Cpu className="w-5 h-5 mr-2 text-cyan-400" />
            电气信号本质剖析
          </h3>
          
          <div className="space-y-6">
            <div className="bg-cyan-500/10 border border-still/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-cyan-300 mb-4">电气信号的传输过程</h4>
              <p className="text-white/80 leading-relaxed mb-4">
                电气信号的传输是一个将物理量转化为可被PLC处理的电信号的过程。首先，物理量是实际需要监测或控制的对象，例如工业生产中的温度、压力、位移等。
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-white mb-3">以温度为例的转换过程：</h5>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="text-white/80 text-sm">
                        <span className="font-medium text-cyan-300">物理量：</span>
                        实际环境中的温度变化
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="text-white/80 text-sm">
                        <span className="font-medium text-cyan-300">传感器转换：</span>
                        温度传感器是实现物理量到电信号转换的关键部件。常见的热电偶传感器，利用热电效应，当两端温度不同时会产生热电势
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="text-white/80 text-sm">
                        <span className="font-medium text-cyan-300">电信号：</span>
                        热电势就是一种电压信号，从而将温度这一物理量转化为电压形式的电信号
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="text-white/80 text-sm">
                        <span className="font-medium text-cyan-300">PLC处理：</span>
                        传感器输出的电压或电流信号传输至PLC，PLC内部的电路对这些信号进行运算、逻辑判断等处理
                      </p>
                  </div>
                </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="text-white/80 text-sm">
                        <span className="font-medium text-cyan-300">控制输出：</span>
                        根据预先设定的控制指令来驱动外部设备执行相应操作，完成从物理量到控制指令的完整转化流程
                      </p>
                      </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-still/20 to-dawn/20 border border-still/30 rounded-lg p-4">
                <p className="text-white/80 text-sm">
                  <span className="font-medium text-cyan-300">核心要点：</span>
                  整个过程实现了从物理世界到数字世界的桥梁，使PLC能够感知和控制现实世界中的各种设备和过程。
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 电气信号类型区分 */}
        <motion.div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-still" />
            电气信号类型区分
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 模拟信号 */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-4">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-green-300">模拟信号</h4>
        </div>
              
              <p className="text-white/80 mb-4 leading-relaxed">
                是连续变化的信号，其电压或电流值在一定范围内连续变化。例如，模拟量温度传感器输出的0-10V电压信号，它能连续反映温度的变化情况，电压值的大小对应着特定的温度范围。
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-white mb-2">特点</h5>
                <p className="text-white/80 text-sm">
                  能更精确地反映物理量的变化，但抗干扰能力相对数字信号较弱，因为连续变化的信号对噪声更为敏感。
          </p>
        </div>

              <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-lg p-4">
                <h5 className="font-semibold text-white mb-2">应用场景</h5>
                <p className="text-white/80 text-sm">
                  广泛应用于需要精确控制物理量的场景，如温度的精确调节、压力的精细控制等。
                </p>
              </div>
            </div>

            {/* 数字信号 */}
            <div className="bg-still/10 border border-still/30 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-still to-dawn rounded-lg flex items-center justify-center mr-4">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-still">数字信号</h4>
              </div>
              
              <p className="text-white/80 mb-4 leading-relaxed">
                是离散的、不连续的信号，仅有两个状态，通常用0和1表示。比如开关的闭合（对应1状态）与断开（对应0状态）、继电器的吸合（1状态）与释放（0状态）等。
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-white mb-2">特点</h5>
                <p className="text-white/80 text-sm">
                  抗干扰能力强，因为数字信号的逻辑判断基于离散状态，即使传输过程中混入少量噪声，也能通过数字电路的阈值判断准确识别信号状态。
                </p>
              </div>

              <div className="bg-gradient-to-r from-still/20 to-dawn/20 border border-still/30 rounded-lg p-4">
                <h5 className="font-semibold text-white mb-2">实际应用</h5>
                <p className="text-white/80 text-sm">
                  常用于控制开关量设备，如电机的启停控制、电磁阀的通断控制等。
                </p>
              </div>
            </div>
                      </div>
          
          {/* 电气信号类型区分图 */}
          <div className="mt-8">
            <img 
              src={`/images/backgrounds/3.电气接线与信号认知/${encodeURIComponent('3.电气信号类型区分.jpeg')}`}
              alt="电气信号类型区分图"
              className="w-full h-auto rounded-lg shadow-lg"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
                  </div>
        </motion.div>

        {/* 模拟信号与数字信号的转换 */}
        <motion.div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-400" />
            模拟信号与数字信号的转换
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 模数转换 ADC */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-purple-300 mb-4">模数转换（ADC）</h4>
              <p className="text-white/80 mb-4 leading-relaxed">
                转换的核心过程包含三个关键步骤：
              </p>
              
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">1. 采样</h5>
                  <p className="text-white/80 text-sm">
                    按固定时间间隔，如每秒上万次，捕捉模拟信号的瞬时值
                  </p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">2. 量化</h5>
                  <p className="text-white/80 text-sm">
                    将每个采样点的幅度值近似归入有限的分级中，例如0到255级
                  </p>
                      </div>
                
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">3. 编码</h5>
                  <p className="text-white/80 text-sm">
                    将量化后的数值转换为对应的二进制代码，如128变成10000000
                  </p>
                </div>
              </div>
            </div>

            {/* 数模转换 DAC */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-orange-300 mb-4">数模转换（DAC）</h4>
              <p className="text-white/80 mb-4 leading-relaxed">
                将接收到的二进制代码解码回对应的电压等级，形成阶梯状的波形，再经过平滑处理恢复成连续的模拟信号。
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-white mb-2">关键理解</h5>
                <ul className="text-white/80 text-sm space-y-2">
                  <li>• 采样率决定了信号保真度（避免失真）</li>
                  <li>• 量化位数决定了信号精度（细节丰富度）</li>
                </ul>
        </div>
              
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-4">
                <h5 className="font-semibold text-white mb-2">生活应用</h5>
                <p className="text-white/80 text-sm">
                  手机录音（麦克风ADC）和播放音乐（扬声器DAC）就是典型应用。
                </p>
              </div>
            </div>
          </div>
          
          {/* 模拟信号与数字信号转换图 */}
          <div className="mt-8">
            <img 
              src={`/images/backgrounds/3.电气接线与信号认知/${encodeURIComponent('4.模拟信号与数字信号的转换.jpeg')}`}
              alt="模拟信号与数字信号的转换过程图"
              className="w-full h-auto rounded-lg shadow-lg"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </motion.div>
      </motion.section>

      <motion.section id="technical-points" className="mb-16" variants={itemVariants}>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl mb-8 p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Network className="w-6 h-6 mr-3 text-green-400" />
            技术要点与操作方法
          </h2>
        </div>

        {/* I/O接线是什么？ */}
        <motion.div 
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8 relative overflow-hidden" 
          variants={itemVariants}
          style={{
            backgroundImage: `url("/images/backgrounds/3.电气接线与信号认知/${encodeURIComponent('5.PLC接线的IO接线规范.jpg')}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-green-900/60 rounded-2xl" />
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center drop-shadow-lg">
              <Network className="w-5 h-5 mr-2 text-green-400" />
              1. I/O接线是什么？
            </h3>
            
            <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-white/90 text-lg leading-relaxed drop-shadow-md">
                I/O接线是连接传感器、执行器等外部设备与控制系统（PLC）的桥梁，实现设备与控制系统之间的数据交换和信号传递，是实现自动化控制的关键环节。
              </p>
            </div>
          </div>
        </motion.div>

        {/* I和O的接线基础原则 */}
        <motion.div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-still" />
            2. I和O的接线基础原则
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 输入接线原则 */}
            <div className="bg-still/10 border border-still/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-still mb-4">输入（I）接线原则</h4>
              
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">信号类型识别</h5>
                  <p className="text-white/80 text-sm">
                    首先要明确输入信号的类型是数字信号还是模拟信号。
                  </p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">数字量输入</h5>
                  <p className="text-white/80 text-sm">
                    需保证输入信号的电平与PLC输入模块的电平匹配。例如，若PLC输入模块为24V直流输入，外部的开关信号若为24V直流，可直接连接。
                  </p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">模拟量输入</h5>
                  <p className="text-white/80 text-sm">
                    要注意信号的正负接线，严格按照传感器和PLC模拟量模块的接线要求连接，确保信号准确传输。
                  </p>
                </div>
              </div>
            </div>

            {/* 输出接线原则 */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-orange-300 mb-4">输出（O）接线原则</h4>
              
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">输出模块类型</h5>
                  <p className="text-white/80 text-sm">
                    输出模块有继电器输出、晶体管输出等类型。继电器输出适用于交直流负载，晶体管输出适用于直流负载。
                  </p>
                  </div>
                
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">负载匹配</h5>
                  <p className="text-white/80 text-sm">
                    接线时要注意输出负载的电压和电流不能超过PLC输出模块的额定值。
                  </p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h5 className="font-semibold text-white mb-2">干扰防护</h5>
                  <p className="text-white/80 text-sm">
                    输入输出线要尽量分开走线，数字量输入线和模拟量输入线也要分开，避免数字信号对模拟信号产生干扰。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PLC接线的I/O接线规范 */}
        <motion.div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-400" />
            3. PLC接线的I/O接线规范
          </h3>
          
          <div className="space-y-6">
            {/* 接线前准备 */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-red-300 mb-4">接线前准备</h4>
              <p className="text-white/80 leading-relaxed">
                接线前必须切断PLC电源，确保操作安全。
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* 输入接线规范 */}
              <div className="bg-still/10 border border-still/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-still mb-4">输入接线规范</h4>
                
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">导线选择</h5>
                    <p className="text-white/80 text-sm">
                      选用合适截面积的导线，对于小电流数字量输入，可使用0.5-1.0mm²的导线。
                    </p>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">连接质量</h5>
                    <p className="text-white/80 text-sm">
                      接线时要保证端子连接牢固，无松动现象。
                    </p>
                      </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">实例说明</h5>
                    <p className="text-white/80 text-sm">
                      连接按钮开关作为数字量输入时，一端接PLC数字量输入端子，另一端接公共端（如24V直流电源负极），连接后需再次检查牢固性。
                    </p>
                  </div>
                </div>
              </div>

              {/* 输出接线规范 */}
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-orange-300 mb-4">输出接线规范</h4>
                
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">导线要求</h5>
                    <p className="text-white/80 text-sm">
                      同样选用符合要求的导线，注意输出端的极性。
                    </p>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">连接正确性</h5>
                    <p className="text-white/80 text-sm">
                      以继电器输出的PLC为例，公共端和输出端的连接要正确，避免接反损坏继电器。
                    </p>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h5 className="font-semibold text-white mb-2">标识管理</h5>
                    <p className="text-white/80 text-sm">
                      要做好导线标识，方便后续维护检修，如在输入线两端标注对应的设备名称和信号名称。
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </motion.div>
      </motion.section>

      {/* 实践应用与操作要点 */}
      <motion.section id="practical-applications" className="mb-16" variants={itemVariants}>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl mb-8 p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-purple-400" />
            实践应用与操作要点
          </h2>
        </div>

        {/* 数字量输入接线操作步骤 */}
        <motion.div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-still" />
            1. 数字量输入接线操作步骤
          </h3>

        <div className="space-y-6">
            <div className="grid gap-6">
              <div className="bg-still/10 border border-still/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-still mb-4">操作流程</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-still rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1 flex-shrink-0">1</div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">断电安全操作</h5>
                      <p className="text-white/80 text-sm">首先断开PLC的电源，防止接线过程中发生触电事故。</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-still rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1 flex-shrink-0">2</div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">准备输入设备</h5>
                      <p className="text-white/80 text-sm">准备好数字量输入设备，如按钮开关。</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-still rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1 flex-shrink-0">3</div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">连接导线</h5>
                      <p className="text-white/80 text-sm">选择合适的导线，将按钮开关的一端连接到PLC的数字量输入端子，另一端连接到公共端（如24V直流电源的负极）。</p>
                    </div>
                </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-still rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1 flex-shrink-0">4</div>
                <div>
                      <h5 className="font-semibold text-white mb-2">通电测试</h5>
                      <p className="text-white/80 text-sm">连接完成后，接通PLC电源，测试按钮开关的输入信号是否能被PLC正确识别。</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-300 mb-4">实践案例：楼梯灯控制项目</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  在一个简单的楼梯灯控制项目中，按钮开关作为输入连接到PLC的数字量输入点，按下按钮时，PLC应能接收到输入信号并控制输出端继电器动作，使楼梯灯点亮。
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 模拟量输入接线操作步骤 */}
        <motion.div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8" variants={itemVariants}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Monitor className="w-5 h-5 mr-2 text-green-400" />
            2. 模拟量输入接线操作步骤
          </h3>
          
          <div className="space-y-6">
            <div className="grid gap-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-300 mb-4">操作流程</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1 flex-shrink-0">1</div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">切断电源</h5>
                      <p className="text-white/80 text-sm">切断PLC电源，保障接线安全。</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1 flex-shrink-0">2</div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">选取传感器</h5>
                      <p className="text-white/80 text-sm">选取合适的模拟量传感器，如压力传感器。</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1 flex-shrink-0">3</div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">连接传感器</h5>
                      <p className="text-white/80 text-sm">将压力传感器的输出线连接到PLC的模拟量输入模块，严格按照传感器接线说明和PLC模拟量模块接线要求连接，注意正负接线。</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1 flex-shrink-0">4</div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">通电检查</h5>
                      <p className="text-white/80 text-sm">接通电源后，通过PLC的编程软件读取模拟量输入值，检查是否与实际压力值相符。若不符，需检查接线是否正确。</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-300 mb-4">具体接线示例</h4>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  例如，压力传感器输出0-10V电压信号，需将传感器正极连接到PLC模拟量输入正极端子，负极连接到负极端子。
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <p className="text-white/70 text-xs">
                    <strong>注意：</strong>接线完成后必须验证信号的准确性，确保读取值与实际物理量相对应。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 抗干扰措施实践案例 */}
        <motion.div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8" variants={itemVariants}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Target className="w-5 h-5 mr-2 text-orange-400" />
            3. 抗干扰措施实践案例
          </h3>
          
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-orange-300 mb-4">案例背景</h4>
            <p className="text-white/80 leading-relaxed">
              在某工业现场的PLC控制系统中，因现场存在强电磁干扰，导致PLC输入信号不稳定。采取的抗干扰措施如下：
            </p>
        </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* 屏蔽电缆使用 */}
            <div className="bg-still/10 border border-still/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-still mb-4">屏蔽电缆使用</h4>
              <p className="text-white/80 text-sm mb-4">
                将输入输出线采用屏蔽电缆，屏蔽层可靠接地。屏蔽电缆能有效阻挡外界电磁干扰侵入信号传输线。
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <p className="text-white/70 text-xs">
                  <strong>关键点：</strong>屏蔽层接地必须良好，不能悬空，否则无法起到抗干扰作用。
                </p>
              </div>
            </div>

            {/* 电源滤波器安装 */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-300 mb-4">电源滤波器安装</h4>
              <p className="text-white/80 text-sm mb-4">
                在PLC的电源输入端添加电源滤波器，过滤电源中的高频干扰，使输入PLC的电源更加纯净。
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <p className="text-white/70 text-xs">
                  <strong>注意事项：</strong>电源滤波器要根据现场电源情况选择合适型号，安装要正确。
                </p>
              </div>
            </div>

            {/* 模拟量线处理 */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-purple-300 mb-4">模拟量线处理</h4>
              <p className="text-white/80 text-sm mb-4">
                对于模拟量输入线，使用双绞线并做好屏蔽接地。双绞线能减少电磁感应干扰，屏蔽接地进一步增强抗干扰能力。
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <p className="text-white/70 text-xs">
                  <strong>效果：</strong>通过这些措施，有效减少了电磁干扰，使PLC输入信号稳定，系统恢复正常运行。
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section className="mb-8" variants={itemVariants}>
        <div className="flex justify-between items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
          <Link 
            to="/course/plc-basics" 
            className="flex items-center text-white/80 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            上一页：PLC核心定位与硬件基础
          </Link>
          <Link 
            to="/course/program-development" 
            className="flex items-center text-white/80 hover:text-white transition-colors group"
          >
            下一页：程序开发流程
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.section>
      </div>
    </motion.main>
  </div>
  </>
  );
};

export default IOWiringPage;