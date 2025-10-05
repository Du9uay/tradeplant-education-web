import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Eye, 
  Settings, 
  Monitor, 
  Cpu, 
  Network, 
  Menu,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  PlayCircle,
  X
} from '../../components/Icons';

const AutomationIndustryPage: React.FC = () => {
  const [activeCase, setActiveCase] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [isTutorPlaying, setIsTutorPlaying] = useState(false);
  const [isTutorExpanded, setIsTutorExpanded] = useState(false);
  const [isModuleHovered, setIsModuleHovered] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const tutorVideoRef = useRef<HTMLVideoElement>(null);

  // 透明背景视频播放器状态
  const [isTransparentVideoPlaying, setIsTransparentVideoPlaying] = useState(false);
  const [isTransparentVideoExpanded, setIsTransparentVideoExpanded] = useState(false);
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
      const scrollPosition = window.scrollY + 200; // 偏移量，提前高亮
      
      // 获取所有主章节元素
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
    handleScroll(); // 初始检测
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // 平滑滚动到指定章节
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // 顶部偏移量
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // 时间线自动播放
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimeline((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 案例轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCase((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 导师视频播放控制
  const handleTutorTogglePlay = async () => {
    console.log('导师视频控制被触发', { isTutorExpanded, isTutorPlaying });
    
    if (!isTutorExpanded) {
      // 第一次点击：展开视频播放器
      setIsTutorExpanded(true);
      // 等待下一个渲染周期再播放视频
      setTimeout(async () => {
        if (tutorVideoRef.current) {
          try {
            console.log('尝试播放视频...');
            await tutorVideoRef.current.play();
            setIsTutorPlaying(true);
            console.log('视频播放成功');
          } catch (error) {
            console.error('视频播放失败:', error);
            setIsTutorPlaying(false);
          }
        } else {
          console.error('视频元素不存在');
        }
      }, 200);
    } else {
      // 已展开状态：切换播放/暂停
      if (tutorVideoRef.current) {
        try {
          if (isTutorPlaying) {
            tutorVideoRef.current.pause();
            setIsTutorPlaying(false);
            console.log('视频已暂停');
          } else {
            await tutorVideoRef.current.play();
            setIsTutorPlaying(true);
            console.log('视频已播放');
          }
        } catch (error) {
          console.error('视频播放/暂停操作失败:', error);
        }
      } else {
        console.error('视频元素不存在');
      }
    }
  };

  const handleTutorClose = () => {
    if (tutorVideoRef.current) {
      tutorVideoRef.current.pause();
      tutorVideoRef.current.currentTime = 0;
    }
    setIsTutorPlaying(false);
    setIsTutorExpanded(false);
  };

  const handleTutorVideoEnd = () => {
    setIsTutorPlaying(false);
    setIsTutorExpanded(false);
  };

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
        } else {
          console.error('透明视频元素不存在');
        }
      }, 200);
    } else {
      // 已展开状态：切换播放/暂停
      if (transparentVideoRef.current) {
        try {
          if (isTransparentVideoPlaying) {
            transparentVideoRef.current.pause();
            setIsTransparentVideoPlaying(false);
            console.log('透明视频已暂停');
          } else {
            await transparentVideoRef.current.play();
            setIsTransparentVideoPlaying(true);
            console.log('透明视频已播放');
          }
        } catch (error) {
          console.error('透明视频播放/暂停操作失败:', error);
        }
      } else {
        console.error('透明视频元素不存在');
      }
    }
  };

  const handleTransparentVideoClose = () => {
    if (transparentVideoRef.current) {
      transparentVideoRef.current.pause();
      transparentVideoRef.current.currentTime = 0;
    }
    setIsTransparentVideoPlaying(false);
    setIsTransparentVideoExpanded(false);
  };

  const handleTransparentVideoEnd = () => {
    setIsTransparentVideoPlaying(false);
    setIsTransparentVideoExpanded(false);
  };

  // 优化的平滑绿幕抠图单帧处理函数
  const processSingleFrameWithOptimizedSmoothing = (video: HTMLVideoElement, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      // 绘制当前帧到canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // 获取图像数据
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const width = canvas.width;
      const height = canvas.height;

      // 第一轮：高效绿幕抠图算法
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const alpha = data[i + 3];
        
        // 快速颜色指标计算
        const greenness = green - Math.max(red, blue);
        const brightness = (red + green + blue) / 3;
        
        // 高效的绿色检测
        const isStrongGreen = greenness > 25 && 
                             green > 55 && 
                             green > red * 1.15 && 
                             green > blue * 1.15 &&
                             brightness > 35;
        
        // 检测白边：简化计算
        const isWhiteEdge = brightness > 170 && 
                           green > red && 
                           green > blue && 
                           greenness > 8;
        
        // 检测灰绿色边缘
        const isGrayGreenEdge = brightness > 90 && 
                               brightness < 190 && 
                               green > Math.max(red, blue) && 
                               greenness > 15;
        
        if (isStrongGreen || isWhiteEdge || isGrayGreenEdge) {
          // 快速透明度计算
          let transparency = 0;
          
          if (isStrongGreen) {
            transparency = Math.min(greenness / 55, 1);
          } else if (isWhiteEdge) {
            transparency = Math.min(greenness / 35, 0.8);
          } else if (isGrayGreenEdge) {
            transparency = Math.min(greenness / 60, 0.7);
          }
          
          // 应用透明度
          data[i + 3] = Math.max(0, alpha * (1 - transparency));
          
          // 快速颜色校正
          if (data[i + 3] > 0 && data[i + 3] < 255) {
            const factor = data[i + 3] / 255;
            data[i] = Math.min(255, red * factor + red * 0.15);
            data[i + 1] = Math.max(0, green * factor - green * 0.3);
            data[i + 2] = Math.min(255, blue * factor + blue * 0.15);
          }
        }
      }

      // 第二轮：高效边缘平滑处理
      const originalData = new Uint8ClampedArray(data);
      
      // 使用更小的5x5邻域进行平滑，每隔一个像素处理以提升性能
      for (let y = 2; y < height - 2; y += 1) {
        for (let x = 2; x < width - 2; x += 1) {
          const idx = (y * width + x) * 4;
          const currentAlpha = originalData[idx + 3];
          
          // 只处理边缘像素
          if (currentAlpha > 10 && currentAlpha < 240) {
            let transparentNeighbors = 0;
            let semiTransparentNeighbors = 0;
            let totalNeighbors = 0;
            let sumAlpha = 0;
            let sumR = 0, sumG = 0, sumB = 0;
            
            // 5x5邻域检查，使用预计算的权重
            const weights = [0.1, 0.2, 0.4, 0.6, 0.8, 1.0, 0.8, 0.6, 0.4, 0.2]; // 预计算的距离权重
            let weightIdx = 0;
            
            for (let dy = -2; dy <= 2; dy++) {
              for (let dx = -2; dx <= 2; dx++) {
                if (dx === 0 && dy === 0) continue;
                
                const neighborY = y + dy;
                const neighborX = x + dx;
                
                if (neighborY >= 0 && neighborY < height && neighborX >= 0 && neighborX < width) {
                  const neighborIdx = (neighborY * width + neighborX) * 4;
                  const neighborAlpha = originalData[neighborIdx + 3];
                  
                  // 使用简化的距离权重
                  const distance = Math.abs(dx) + Math.abs(dy); // 曼哈顿距离，比欧几里得距离计算更快
                  const weight = distance <= 2 ? 1.0 : (distance <= 3 ? 0.5 : 0.2);
                  
                  sumAlpha += neighborAlpha * weight;
                  sumR += originalData[neighborIdx] * weight;
                  sumG += originalData[neighborIdx + 1] * weight;
                  sumB += originalData[neighborIdx + 2] * weight;
                  
                  if (neighborAlpha < 20) {
                    transparentNeighbors++;
                  } else if (neighborAlpha < 200) {
                    semiTransparentNeighbors++;
                  }
                  totalNeighbors++;
                }
              }
            }
            
            // 简化的边缘平滑算法
            const transparentRatio = transparentNeighbors / totalNeighbors;
            const semiTransparentRatio = semiTransparentNeighbors / totalNeighbors;
            
            if (transparentRatio > 0.2 || semiTransparentRatio > 0.4) {
              const avgAlpha = sumAlpha / totalNeighbors;
              const avgR = sumR / totalNeighbors;
              const avgG = sumG / totalNeighbors;
              const avgB = sumB / totalNeighbors;
              
              // 简化的平滑因子计算
              const smoothFactor = Math.min(transparentRatio + semiTransparentRatio * 0.4, 0.6);
              let newAlpha = currentAlpha * (1 - smoothFactor * 0.4) + avgAlpha * smoothFactor * 0.4;
              
              // 简化的边缘渐变
              const edgeSmooth = 1 - transparentRatio * 0.3;
              newAlpha = newAlpha * edgeSmooth + avgAlpha * (1 - edgeSmooth) * 0.2;
              
              data[idx + 3] = Math.max(0, Math.min(255, newAlpha));
              
              // 简化的颜色混合
              if (data[idx + 3] > 0 && data[idx + 3] < 200) {
                const colorSmoothFactor = (200 - data[idx + 3]) / 200 * 0.3;
                
                data[idx] = Math.min(255, originalData[idx] * (1 - colorSmoothFactor) + avgR * colorSmoothFactor);
                data[idx + 1] = Math.min(255, originalData[idx + 1] * (1 - colorSmoothFactor) + avgG * colorSmoothFactor);
                data[idx + 2] = Math.min(255, originalData[idx + 2] * (1 - colorSmoothFactor) + avgB * colorSmoothFactor);
              }
            }
          }
        }
      }

      // 将处理后的图像数据绘制回canvas
      ctx.putImageData(imageData, 0, 0);
  };

  // 高级边缘平滑绿幕抠图处理函数
  const startGreenScreenProcessing = () => {
    const video = transparentVideoRef.current;
    const canvas = document.getElementById('greenscreen-canvas') as HTMLCanvasElement;
    
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置canvas尺寸匹配视频
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const processFrame = () => {
      // 调用优化平滑处理函数
      processSingleFrameWithOptimizedSmoothing(video, canvas, ctx);
      
      // 只有在视频播放时才继续处理下一帧
      if (!video.paused && !video.ended) {
        requestAnimationFrame(processFrame);
      }
    };

    // 开始处理
    processFrame();
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
    }
  };

  // 工业控制器对比数据
  const controllerComparison = [
    {
      type: 'PLC',
      fullName: '可编程逻辑控制器',
      description: '专为工业环境设计，采用可编程存储器，能存储执行逻辑运算、顺序控制等指令，通过数字/模拟量的输入输出控制各类机械或生产过程',
      characteristics: [
        '专为工业环境设计',
        '采用可编程存储器',
        '执行逻辑运算、顺序控制指令',
        '通过数字/模拟量输入输出控制'
      ],
      applications: [
        '机床的顺序控制',
        '小型包装机械的计数、封装逻辑控制',
        '传送带启停、速度调节等简单运动控制',
        '离散型工业控制'
      ],
      advantages: '侧重逻辑控制，结构简单、编程便捷，适用于离散型工业控制',
      icon: Cpu,
      color: 'from-still to-dawn'
    },
    {
      type: 'DCS',
      fullName: '分布式控制系统',
      description: '分散控制系统，适用于大型复杂过程控制，具备分散控制、集中管理特性',
      characteristics: [
        '分散控制、集中管理',
        '处理大量模拟量信号',
        '适用于大型复杂过程控制',
        '具备强大的过程监控能力'
      ],
      applications: [
        '化工行业的连续生产过程控制',
        '大型炼油厂中对温度、压力等模拟量参数进行集中调控',
        '连续化学反应控制',
        '大规模过程工业控制'
      ],
      advantages: '侧重过程控制，能处理大量模拟量信号，适合连续生产过程控制',
      icon: Network,
      color: 'from-green-500 to-teal-500'
    },
    {
      type: '工控机',
      fullName: '工业控制计算机',
      description: '基于PC架构，性能较强但工业现场抗干扰能力稍弱',
      characteristics: [
        '基于PC架构',
        '运算能力强',
        '工业现场抗干扰能力不如PLC',
        '通常需专业编程知识'
      ],
      applications: [
        '工厂自动化生产线监控',
        '复杂数据处理和分析',
        '需要强大运算能力的控制场景',
        '人机界面和数据管理'
      ],
      advantages: '运算能力强，但工业现场抗干扰能力不如PLC，需专业编程知识',
      icon: Monitor,
      color: 'from-purple-500 to-pink-500'
    },
    {
      type: '单片机',
      fullName: '微控制器',
      description: '体积小、成本低，但功能相对单一',
      characteristics: [
        '体积小、成本低',
        '功能相对单一',
        '一个单片机常专注某方面控制',
        '编程需依具体硬件电路定制'
      ],
      applications: [
        '简单灯光控制系统基本开关控制',
        '家用电器控制',
        '简单的嵌入式系统',
        '成本敏感的小型控制应用'
      ],
      advantages: '成本低、体积小，但扩展性与通用性不如PLC',
      icon: Settings,
      color: 'from-orange-500 to-red-500'
    },
    {
      type: '运动控制器',
      fullName: '专用运动控制器',
      description: '专门用于精确控制运动轴的位置、速度等，在数控机床等高精度运动控制场景应用广泛',
      characteristics: [
        '专注于精确控制运动轴',
        '高精度位置、速度控制',
        '运动控制功能强大',
        '专业运动算法'
      ],
      applications: [
        '数控机床等高精度运动控制',
        '机器人精密定位',
        '自动化装配线精确控制',
        '高精度加工设备'
      ],
      advantages: '专门用于精确控制运动轴，运动控制功能比PLC强大',
      icon: Target,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  // PLC发展历史
  const plcDevelopmentHistory = [
    {
      period: '20世纪60年代',
      title: 'PLC诞生',
      description: '美国数字设备公司研制出首台PLC，最初用于替代继电器控制实现逻辑运算等功能',
      keyPoints: [
        '首台PLC诞生于美国',
        '主要目的是替代继电器控制',
        '实现基本的逻辑运算功能',
        '为工业自动化奠定基础'
      ],
      icon: Settings,
      color: 'from-still to-still/90'
    },
    {
      period: '发展过程',
      title: 'PLC不断更新换代',
      description: '随着技术发展，PLC经历了从简单逻辑控制到智能控制的演进过程',
      keyPoints: [
        '从简单逻辑控制发展到智能控制',
        '处理能力不断增强',
        '功能模块越来越丰富',
        '通信能力大幅提升'
      ],
      icon: Network,
      color: 'from-green-500 to-green-600'
    },
    {
      period: '现代PLC',
      title: '西门子S7系列PLC',
      description: '西门子作为全球知名PLC品牌，其S7系列PLC应用广泛，涵盖小型、中型、大型不同规模的应用',
      keyPoints: [
        'S7-200系列：小型PLC，适用于小型自动化设备，编程简单、可靠性高',
        'S7-300系列：中型PLC，满足中等规模自动化控制需求',
        'S7-400系列：大型PLC，适用于复杂大规模工业控制系统',
        '主要应用于小型自动化生产线，可通过编程实现对生产线物料输送、加工设备启停等顺序控制'
      ],
      icon: Cpu,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  // 实践应用案例
  const practicalApplications = [
    {
      category: '离散制造',
      title: '汽车装配线控制',
      description: '在汽车装配线上，PLC作为产线的主控制器，负责协调整个装配流程和工位设备',
      process: [
        '当PLC接收到相关传感器信号（如传送带到位、工件已定位、安全条件满足）时',
        '它会向工业机器人的专用控制器发送启动指令和必要的参数（如程序号、车型代码）',
        '机器人控制器则根据接收到的指令，执行其内部预编程的详细动作序列程序',
        '精确完成抓取、搬运、安装等复杂动作，确保零部件准确安装'
      ],
      technicalDetails: [
        'PLC通过编程实现对生产线物料输送、加工设备启停等顺序控制',
        '当机器人控制器完成移动到抓取点的动作（可能通过自身编码器确认位置）或当外部传感器确认工件到位后',
        'PLC发送开始抓取指令，机器人控制器随即执行其内部的抓取程序，确保零部件准确安装'
      ],
      icon: Target,
      color: 'from-still to-dawn'
    },
    {
      category: '过程控制',
      title: '化工厂反应罐控制',
      description: '在化工厂的反应罐中，PLC用于调节温度和液位',
      process: [
        '通过安装温度传感器和液位传感器来实时监测反应罐内的温度和液位变化',
        'PLC根据预设的温度和液位范围，控制加热设备和补液设备的工作',
        '使反应罐内的温度和液位保持在合适的范围内',
        '保证化学反应的正常进行'
      ],
      technicalDetails: [
        '实时监测物理参数变化',
        '根据预设范围进行自动调节',
        '确保工艺过程的稳定性',
        '提高产品质量和生产效率'
      ],
      icon: Network,
      color: 'from-green-600 to-teal-600'
    },
    {
      category: '基础设施',
      title: '智能楼宇管理',
      description: '在智能楼宇中，PLC用于管理电梯调度与照明系统',
      process: [
        '通过PLC可以实现对多台电梯的运行状态进行监控和调度',
        '根据乘客的呼叫信号合理分配电梯，提高电梯的运行效率',
        'PLC还可以控制楼宇内的照明系统',
        '根据光线强度和时间等因素自动调节照明亮度，实现节能降耗'
      ],
      technicalDetails: [
        '电梯调度算法优化',
        '照明系统智能控制',
        '节能降耗自动化',
        '提高楼宇管理效率'
      ],
      icon: Monitor,
      color: 'from-purple-600 to-pink-600'
    }
  ];

  return (
    <>


      {/* 独立的目录侧边栏 - 置于更高层级 */}
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
      <div className="w-full min-h-screen ml-0 lg:ml-44">
        {/* 主要内容区域 - 现在占用全宽 */}
        <div className="w-full">
    <motion.main 
              className="relative z-10 min-h-screen py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
              {/* 内部flex布局：左侧课程内容 + 右侧视频播放器区域 */}
              <div className="flex">
                {/* 课程内容区域 - 扩大宽度 */}
                <div className="flex-1 max-w-6xl px-6">
      {/* 页面标题 */}
      <motion.section id="page-title" className="mb-12" variants={itemVariants}>
        <div 
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl text-center p-8 relative overflow-hidden"
          style={{
            backgroundImage: `url("/images/${encodeURIComponent('1.1PLC行业认知与基础框架1(分辨率不够).jpg')}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-rock/60 to-purple-900/70"></div>
          

          
          {/* 内容 */}
          <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
              <Cpu className="w-8 h-8 text-still mr-3 drop-shadow-lg" />
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">PLC行业认知与基础框架</h1>
            </div>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              认识PLC在工业自动化领域的广泛应用场景，了解其发展历程与基础架构，重点掌握PLC在制造业等行业的定位及基本组成框架。
            </p>
          </div>
        </div>
      </motion.section>

      {/* 理论基础与概念解析 */}
      <motion.section id="theory-basics" className="mb-16" variants={itemVariants}>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl mb-8 p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-still" />
            理论基础与概念解析
          </h2>
        </div>

                {/* 工业控制器定义与核心作用 */}
        <div 
          id="industrial-controller-definition"
          className="relative"
          onMouseEnter={() => setIsModuleHovered(true)}
          onMouseLeave={() => setIsModuleHovered(false)}
        >
        <motion.div 
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8 relative overflow-hidden" 
          variants={cardVariants}
          style={{
            backgroundImage: `url("/images/backgrounds/1.PLC行业认知与基础框架/${encodeURIComponent('1.工业控制器定义与核心作用2.jpg')}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-rock/60 rounded-2xl" />
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-4 drop-shadow-lg">1. 工业控制器定义与核心作用</h3>
            <div className="space-y-4">
              <p className="text-white/90 leading-relaxed drop-shadow-md">
                工业控制器是工业自动化系统的核心组件，它是一种能接收输入信号，依据预先存储程序对信号进行处理，并输出控制信号以调节工业生产过程设备的电子系统。其核心作用在于实现工业生产的自动化，大幅提升生产效率、产品质量与生产过程的稳定性。
              </p>
              <div className="bg-still/20 border border-still/40 rounded-lg p-4 backdrop-blur-sm">
                <h4 className="font-semibold text-still mb-4 drop-shadow-md">实际应用示例</h4>
                
                {/* 移动端：垂直布局 */}
                <div className="block lg:hidden space-y-4">
                  {/* 文字内容 */}
                  <div>
                    <p className="text-white/90 text-sm drop-shadow-sm leading-relaxed">
                      在电子元件的自动化生产线上，工业控制器可精准控制贴片、焊接等工序的设备运行，保证每个工序按预定节奏高效进行，避免人工操作的误差与低效。
                    </p>
                  </div>
                  
                  {/* 案例图片 */}
                  <div className="flex justify-center">
                    <img 
                      src={`/images/backgrounds/1.PLC行业认知与基础框架/${encodeURIComponent('2.工业控制器定义与核心作用3（案例）.png')}`}
                      alt="工业控制器应用案例"
                      className="max-w-full h-auto rounded-lg shadow-lg border border-white/20"
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                  
                  {/* 移动端简化版导师提示 */}
                  <div className="flex justify-center lg:hidden">
                    <div className="bg-still/20 border border-still/40 rounded-lg p-3 text-center">
                      <p className="text-white/80 text-sm">
                        💡 在桌面端可观看导师专业讲解视频
                      </p>
                    </div>
                  </div>

                </div>
                
                {/* 桌面端：水平两列布局 */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-6 items-start">
                  {/* 左侧文字内容 */}
                  <div>
                    <p className="text-white/90 text-sm drop-shadow-sm leading-relaxed">
                      在电子元件的自动化生产线上，工业控制器可精准控制贴片、焊接等工序的设备运行，保证每个工序按预定节奏高效进行，避免人工操作的误差与低效。
                    </p>
              </div>
                  
                  {/* 右侧案例图片 */}
                  <div className="flex justify-center">
                    <img 
                      src={`/images/backgrounds/1.PLC行业认知与基础框架/${encodeURIComponent('2.工业控制器定义与核心作用3（案例）.png')}`}
                      alt="工业控制器应用案例"
                      className="max-w-full h-auto rounded-lg shadow-lg border border-white/20"
                      style={{ maxHeight: '200px' }}
                    />
                    </div>

                </div>
              </div>
            </div>
          </div>
        </motion.div>

        

        </div>

        {/* 工业控制器的分类与对比 */}
        <motion.div id="controller-comparison" className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8" variants={cardVariants}>
          <h3 className="text-xl font-bold text-white mb-6">2. 工业控制器的分类与对比</h3>
          <div className="space-y-6">
                        {/* 第一行：前2个控制器 */}
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {controllerComparison.slice(0, 2).map((controller, index) => (
                <motion.div
                  key={controller.type}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* PLC和DCS卡片特殊处理：左右分隔布局 */}
                  {controller.type === 'PLC' ? (
                    <div>
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${controller.color} rounded-lg flex items-center justify-center mr-4`}>
                          <controller.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">{controller.type}</h4>
                          <p className="text-sm text-white/60">{controller.fullName}</p>
                        </div>
        </div>

                      {/* 左右分隔布局 */}
                      <div className="grid md:grid-cols-2 gap-4 items-start mb-4">
                        {/* 左侧内容 */}
                        <div>
                          <p className="text-white/80 text-sm mb-4 leading-relaxed">{controller.description}</p>
                          <div className="space-y-3">
                            <div>
                              <h5 className="text-sm font-semibold text-white mb-2">特点</h5>
                              <ul className="text-xs text-white/70 space-y-1">
                                {controller.characteristics.map((char, idx) => (
                                  <li key={idx}>• {char}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-sm font-semibold text-white mb-2">应用场景</h5>
                              <ul className="text-xs text-white/70 space-y-1">
                                {controller.applications.map((app, idx) => (
                                  <li key={idx}>• {app}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
              </div>
              
                        {/* 右侧图片 */}
                        <div className="flex justify-center">
                          <img 
                            src={`/images/backgrounds/1.PLC行业认知与基础框架/${encodeURIComponent('3.工业控制器的分类与对比1（PLC）.png')}`}
                            alt="PLC控制器系列"
                            className="max-w-full h-auto rounded-lg shadow-lg border border-white/20"
                            style={{ maxHeight: '250px' }}
                          />
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-xs text-white/80 font-medium">{controller.advantages}</p>
                      </div>
                    </div>
                  ) : controller.type === 'DCS' ? (
                    <div>
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${controller.color} rounded-lg flex items-center justify-center mr-4`}>
                          <controller.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">{controller.type}</h4>
                          <p className="text-sm text-white/60">{controller.fullName}</p>
                </div>
              </div>

                      {/* 左右分隔布局 */}
                      <div className="grid md:grid-cols-2 gap-4 items-start mb-4">
                        {/* 左侧内容 */}
                        <div>
                          <p className="text-white/80 text-sm mb-4 leading-relaxed">{controller.description}</p>
                          <div className="space-y-3">
                            <div>
                              <h5 className="text-sm font-semibold text-white mb-2">特点</h5>
                              <ul className="text-xs text-white/70 space-y-1">
                                {controller.characteristics.map((char, idx) => (
                                  <li key={idx}>• {char}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-sm font-semibold text-white mb-2">应用场景</h5>
                              <ul className="text-xs text-white/70 space-y-1">
                                {controller.applications.map((app, idx) => (
                                  <li key={idx}>• {app}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        {/* 右侧图片 */}
                        <div className="flex justify-center">
                          <img 
                            src={`/images/backgrounds/1.PLC行业认知与基础框架/${encodeURIComponent('4.DCS系统.jpeg')}`}
                            alt="DCS分布式控制系统"
                            className="max-w-full h-auto rounded-lg shadow-lg border border-white/20"
                            style={{ maxHeight: '350px' }}
                          />
                </div>
              </div>

                      <div className="pt-2 border-t border-white/10">
                        <p className="text-xs text-white/80 font-medium">{controller.advantages}</p>
                      </div>
                    </div>
                  ) : (
                    /* 其他控制器保持原有布局 */
                    <div>
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${controller.color} rounded-lg flex items-center justify-center mr-4`}>
                          <controller.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">{controller.type}</h4>
                          <p className="text-sm text-white/60">{controller.fullName}</p>
                        </div>
                      </div>
                      <p className="text-white/80 text-sm mb-4 leading-relaxed">{controller.description}</p>
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-semibold text-white mb-2">特点</h5>
                          <ul className="text-xs text-white/70 space-y-1">
                            {controller.characteristics.map((char, idx) => (
                              <li key={idx}>• {char}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-white mb-2">应用场景</h5>
                          <ul className="text-xs text-white/70 space-y-1">
                            {controller.applications.map((app, idx) => (
                              <li key={idx}>• {app}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-2 border-t border-white/10">
                          <p className="text-xs text-white/80 font-medium">{controller.advantages}</p>
                        </div>
              </div>
            </div>
                  )}
                </motion.div>
          ))}
        </div>
            
            {/* 第二行：第3和第4个控制器 */}
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {controllerComparison.slice(2, 4).map((controller, index) => (
                <motion.div
                  key={controller.type}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 2) * 0.1 }}
                >
                  {/* 工控机和单片机卡片特殊处理：左右分隔布局 */}
                  {controller.type === '工控机' ? (
                    <div>
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${controller.color} rounded-lg flex items-center justify-center mr-4`}>
                          <controller.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">{controller.type}</h4>
                          <p className="text-sm text-white/60">{controller.fullName}</p>
                        </div>
                      </div>
                      
                      {/* 左右分隔布局 */}
                      <div className="grid md:grid-cols-2 gap-4 items-start mb-4">
                        {/* 左侧内容 */}
                        <div>
                          <p className="text-white/80 text-sm mb-4 leading-relaxed">{controller.description}</p>
                          <div className="space-y-3">
                            <div>
                              <h5 className="text-sm font-semibold text-white mb-2">特点</h5>
                              <ul className="text-xs text-white/70 space-y-1">
                                {controller.characteristics.map((char, idx) => (
                                  <li key={idx}>• {char}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-sm font-semibold text-white mb-2">应用场景</h5>
                              <ul className="text-xs text-white/70 space-y-1">
                                {controller.applications.map((app, idx) => (
                                  <li key={idx}>• {app}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        {/* 右侧图片 */}
                        <div className="flex justify-center">
                          <img 
                            src={`/images/backgrounds/1.PLC行业认知与基础框架/${encodeURIComponent('5.工业控制器的分类与对比3（工控机）.png')}`}
                            alt="工业控制计算机"
                            className="max-w-full h-auto rounded-lg shadow-lg border border-white/20"
                            style={{ maxHeight: '350px' }}
                          />
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-xs text-white/80 font-medium">{controller.advantages}</p>
                      </div>
                    </div>
                  ) : controller.type === '单片机' ? (
                    <div>
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${controller.color} rounded-lg flex items-center justify-center mr-4`}>
                          <controller.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">{controller.type}</h4>
                          <p className="text-sm text-white/60">{controller.fullName}</p>
                        </div>
                      </div>
                      
                      {/* 左右分隔布局 */}
                      <div className="grid md:grid-cols-2 gap-4 items-start mb-4">
                        {/* 左侧内容 */}
                        <div>
                          <p className="text-white/80 text-sm mb-4 leading-relaxed">{controller.description}</p>
                          <div className="space-y-3">
                            <div>
                              <h5 className="text-sm font-semibold text-white mb-2">特点</h5>
                              <ul className="text-xs text-white/70 space-y-1">
                                {controller.characteristics.map((char, idx) => (
                                  <li key={idx}>• {char}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-sm font-semibold text-white mb-2">应用场景</h5>
                              <ul className="text-xs text-white/70 space-y-1">
                                {controller.applications.map((app, idx) => (
                                  <li key={idx}>• {app}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        {/* 右侧图片 */}
                        <div className="flex justify-center">
                          <img 
                            src={`/images/backgrounds/1.PLC行业认知与基础框架/${encodeURIComponent('6.工业控制器的分类与对比4（单片机）.jpg')}`}
                            alt="单片机微控制器"
                            className="max-w-full h-auto rounded-lg shadow-lg border border-white/20"
                            style={{ maxHeight: '350px' }}
                          />
                        </div>
        </div>

                      <div className="pt-2 border-t border-white/10">
                        <p className="text-xs text-white/80 font-medium">{controller.advantages}</p>
                      </div>
                    </div>
                  ) : (
                    /* 其他控制器保持原有布局 */
                    <div>
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${controller.color} rounded-lg flex items-center justify-center mr-4`}>
                          <controller.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">{controller.type}</h4>
                          <p className="text-sm text-white/60">{controller.fullName}</p>
                        </div>
                      </div>
                      <p className="text-white/80 text-sm mb-4 leading-relaxed">{controller.description}</p>
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-semibold text-white mb-2">特点</h5>
                          <ul className="text-xs text-white/70 space-y-1">
                            {controller.characteristics.map((char, idx) => (
                              <li key={idx}>• {char}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-white mb-2">应用场景</h5>
                          <ul className="text-xs text-white/70 space-y-1">
                            {controller.applications.map((app, idx) => (
                              <li key={idx}>• {app}</li>
                            ))}
                          </ul>
                </div>
                        <div className="pt-2 border-t border-white/10">
                          <p className="text-xs text-white/80 font-medium">{controller.advantages}</p>
                  </div>
                      </div>
                    </div>
                  )}
                </motion.div>
                    ))}
                  </div>
            
                        {/* 第三行：第5个控制器，居中显示 */}
            <div className="flex justify-center">
              <div className="max-w-4xl">
                {controllerComparison.slice(4, 5).map((controller, index) => (
                  <motion.div
                    key={controller.type}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index + 4) * 0.1 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${controller.color} rounded-lg flex items-center justify-center mr-4`}>
                        <controller.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{controller.type}</h4>
                        <p className="text-sm text-white/60">{controller.fullName}</p>
                      </div>
                    </div>
                    
                    {/* 左右分隔布局 */}
                    <div className="grid md:grid-cols-2 gap-4 items-start mb-4">
                      {/* 左侧内容 */}
                      <div>
                        <p className="text-white/80 text-sm mb-4 leading-relaxed">{controller.description}</p>
                        <div className="space-y-3">
                          <div>
                            <h5 className="text-sm font-semibold text-white mb-2">特点</h5>
                            <ul className="text-xs text-white/70 space-y-1">
                              {controller.characteristics.map((char, idx) => (
                                <li key={idx}>• {char}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold text-white mb-2">应用场景</h5>
                            <ul className="text-xs text-white/70 space-y-1">
                              {controller.applications.map((app, idx) => (
                                <li key={idx}>• {app}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* 右侧图片 */}
                      <div className="flex justify-center">
                        <img 
                          src={`/images/backgrounds/1.PLC行业认知与基础框架/${encodeURIComponent('7.工业控制器的分类与对比5（运动控制器）.png')}`}
                          alt="运动控制器"
                          className="max-w-full h-auto rounded-lg shadow-lg border border-white/20"
                          style={{ maxHeight: '350px' }}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-xs text-white/80 font-medium">{controller.advantages}</p>
                </div>
                  </motion.div>
                ))}
              </div>
            </div>
        </div>
        </motion.div>
      </motion.section>

      {/* 技术要点与操作方法 */}
      <motion.section id="technical-points" className="mb-16" variants={itemVariants}>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl mb-8 p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Target className="w-6 h-6 mr-3 text-green-400" />
            技术要点与操作方法
          </h2>
        </div>

        {/* PLC与其他控制器的对比分析 */}
        <motion.div id="plc-comparison" className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8" variants={cardVariants}>
          <h3 className="text-xl font-bold text-white mb-6">1. PLC与其他控制器的对比分析</h3>
          
          <div className="space-y-6">
            {/* PLC与DCS对比 */}
            <div className="bg-still/10 border border-still/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-still mb-4">PLC与DCS对比</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-white mb-2">PLC特点</h5>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>• 侧重逻辑控制，结构简单、编程便捷</li>
                    <li>• 适用于离散型工业控制，像机床的顺序控制</li>
                    <li>• 以小型包装机械为例，PLC可用于控制包装的计数、封装等逻辑操作</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-2">DCS特点</h5>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>• 侧重过程控制，能处理大量模拟量信号</li>
                    <li>• 适合连续生产过程控制，例如化工行业的连续化学反应控制</li>
                    <li>• 而大型炼油厂中，DCS用于对温度、压力等模拟量参数进行集中调控</li>
                  </ul>
                </div>
                </div>
              </div>
              
            {/* PLC与工控机对比 */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-purple-300 mb-4">PLC与工控机对比</h4>
              <div className="space-y-3">
                <p className="text-white/80 text-sm">
                  工控机运算能力强，但工业现场抗干扰能力不如PLC，PLC有专门抗干扰设计，能在电磁干扰强的工业环境稳定运行。且PLC编程基于梯形图等易懂编程语言，利于工业现场操作人员掌握，工控机通常需专业编程知识。
                </p>
                <p className="text-white/80 text-sm">
                  在工厂自动化生产线监控中，PLC可直接连接传感器和执行器控制，工控机可能需额外接口转换。
                </p>
              </div>
            </div>

            {/* PLC与单片机对比 */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-orange-300 mb-4">PLC与单片机对比</h4>
              <div className="space-y-3">
                <p className="text-white/80 text-sm">
                  单片机功能单一，一个单片机常专注某方面控制，而PLC通过扩展模块可实现多种功能，如同时进行数字量和模拟量控制。PLC编程有标准规范和指令集，扩展性与通用性好，单片机编程需依具体硬件电路定制，虽灵活性高，但大规模工业控制应用中PLC更具优势。
                </p>
                <p className="text-white/80 text-sm">
                  比如简单灯光控制系统，单片机可实现基本开关控制，但若扩展到多灯光组复杂控制，PLC的模块化设计更易实现。
          </p>
              </div>
        </div>

            {/* PLC与运动控制器对比 */}
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-indigo-300 mb-4">PLC与运动控制器对比</h4>
              <div className="space-y-3">
                <p className="text-white/80 text-sm">
                  运动控制器专门用于精确控制运动轴的位置、速度等，在数控机床等高精度运动控制场景应用广泛；PLC虽能实现一定运动控制，但运动控制功能不如专业运动控制器强大。
                </p>
                <p className="text-white/80 text-sm">
                  不过在传送带启停、速度调节等简单运动控制场景，PLC仍可发挥作用。例如小型点胶机控制中，PLC结合简单运动控制指令可实现点胶头移动控制。
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PLC发展历史 */}
        <motion.div id="plc-history" className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8" variants={cardVariants}>
          <h3 className="text-xl font-bold text-white mb-6">2. PLC的发展历史与品牌简介（以西门子PLC为例）</h3>
          
          <div className="space-y-6">
            {plcDevelopmentHistory.map((period, index) => (
              <AnimatePresence key={index}>
                <motion.div
                  className={`border-l-4 pl-6 ${
                    activeTimeline === index 
                      ? 'border-still bg-still/10' 
                      : 'border-white/20 bg-white/5'
                  } rounded-r-lg p-4 transition-all duration-300`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex items-center mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${period.color} rounded-lg flex items-center justify-center mr-4`}>
                      <period.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{period.title}</h4>
                      <p className="text-sm text-white/60">{period.period}</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-3 leading-relaxed">{period.description}</p>
                  <ul className="text-white/70 text-sm space-y-1">
                    {period.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
          ))}
        </div>
        </motion.div>

        {/* 中国PLC竞争格局 */}
        <motion.div id="china-plc-market" className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8" variants={cardVariants}>
          <h3 className="text-xl font-bold text-white mb-4">3. 中国PLC的竞争格局分析</h3>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
            <p className="text-white/80 leading-relaxed">
              当前中国PLC市场竞争激烈，国外品牌如西门子、欧姆龙、三菱等占据较大市场份额，国内企业也在崛起。国内企业价格有优势，但高端市场仍被国外品牌主导。国内企业需加大研发投入，提升产品性能与可靠性以增强市场竞争力。
            </p>
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

        <div className="grid gap-8">
          {practicalApplications.map((application, index) => (
            <AnimatePresence key={index}>
              <motion.div
                id={
                  application.category === '离散制造' 
                    ? 'discrete-manufacturing'
                    : application.category === '过程控制'
                    ? 'process-control'
                    : application.category === '基础设施'
                    ? 'infrastructure'
                    : `application-${index}`
                }
                className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 ${
                  activeCase === index ? 'ring-2 ring-still/50' : ''
                }`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${application.color} rounded-lg flex items-center justify-center mr-4`}>
                    <application.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{application.title}</h3>
                    <p className="text-white/60">{application.category}</p>
                  </div>
                </div>

                {/* 特殊处理：为离散制造、过程控制、基础设施案例添加图片 */}
                {application.category === '离散制造' || application.category === '过程控制' || application.category === '基础设施' ? (
                  <div>
                    <p className="text-white/80 mb-6 leading-relaxed">{application.description}</p>

                    {/* 左右分隔布局：文字内容和图片 */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-6">
                      {/* 左侧：控制流程和技术要点 */}
                      <div className="grid md:grid-cols-1 gap-6">
                    <div>
                          <h4 className="text-lg font-semibold text-white mb-3">控制流程</h4>
                          <ol className="space-y-2">
                            {application.process.map((step, idx) => (
                              <li key={idx} className="flex items-start text-white/80 text-sm">
                                <span className="bg-still text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                                  {idx + 1}
                            </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                          </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">技术要点</h4>
                          <ul className="space-y-2">
                            {application.technicalDetails.map((detail, idx) => (
                              <li key={idx} className="flex items-start text-white/80 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* 右侧：图片 */}
                      <div className="flex justify-center items-start">
                        <div 
                          className="w-full max-w-md aspect-video rounded-lg shadow-lg border border-white/20 overflow-hidden bg-gray-800"
                          style={{
                            backgroundImage: `url("/images/backgrounds/1.PLC行业认知与基础框架/${encodeURIComponent(
                              application.category === '离散制造' 
                                ? '8.离散制造（以汽车装配线为例）.png'
                                : application.category === '过程控制'
                                ? '9.过程控制（以化工厂反应罐为例）3.jpg'
                                : '10.基础设施（以智能楼宇为例）.jpg'
                            )}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                          title={
                            application.category === '离散制造' 
                              ? '汽车装配线自动化控制' 
                              : application.category === '过程控制'
                              ? '化工厂反应罐过程控制'
                              : '智能楼宇管理系统'
                          }
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 其他应用案例保持原有布局 */
                  <div>
                    <p className="text-white/80 mb-6 leading-relaxed">{application.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">控制流程</h4>
                        <ol className="space-y-2">
                          {application.process.map((step, idx) => (
                            <li key={idx} className="flex items-start text-white/80 text-sm">
                              <span className="bg-still text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                                {idx + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                          </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">技术要点</h4>
                        <ul className="space-y-2">
                          {application.technicalDetails.map((detail, idx) => (
                            <li key={idx} className="flex items-start text-white/80 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                              {detail}
                            </li>
                        ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      </motion.section>

      {/* 页面导航 */}
      <motion.section className="mb-8" variants={itemVariants}>
        <div className="flex justify-between items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
          <Link 
            to="/objectives" 
            className="flex items-center text-white/80 hover:text-white transition-colors group"
            >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            上一页：学习目标
              </Link>
          <Link 
            to="/course/plc-basics" 
            className="flex items-center text-white/80 hover:text-white transition-colors group"
          >
            下一页：PLC核心定位与硬件基础
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
        </div>
      </motion.section>
                </div>

                {/* 右侧视频播放器区域 - 固定宽度 */}
                <div className="hidden lg:block w-40 px-2">
                </div>

                {/* 导师视频播放器 - 绝对定位 */}
                <div className="absolute top-[600px] right-[150px] z-10">
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <div className="flex justify-center">
                          <AnimatePresence>
                            {!isTutorExpanded ? (
                              // 导师头像按钮
                              <motion.div
                                className="relative"
                                onMouseEnter={() => setIsModuleHovered(true)}
                                onMouseLeave={() => setIsModuleHovered(false)}
                              >
                                <motion.div
                                  className="w-24 h-24 rounded-full cursor-pointer relative overflow-hidden shadow-xl group"
                                  onClick={handleTutorTogglePlay}
                                  whileHover={{ 
                                    scale: 1.1,
                                    rotate: [0, -5, 5, 0],
                                    transition: { 
                                      scale: { type: "spring", stiffness: 300, damping: 20 },
                                      rotate: { duration: 0.6, ease: "easeInOut" }
                                    }
                                  }}
                                  whileTap={{ 
                                    scale: 0.8,
                                    rotate: 0,
                                    transition: { 
                                      type: "spring", 
                                      stiffness: 600, 
                                      damping: 15,
                                      duration: 0.1
                                    }
                                  }}
                                  animate={{
                                    boxShadow: [
                                      "0 0 20px rgba(59, 130, 246, 0.5)",
                                      "0 0 30px rgba(139, 92, 246, 0.7)",
                                      "0 0 20px rgba(59, 130, 246, 0.5)"
                                    ]
                                  }}
                                  transition={{
                                    boxShadow: {
                                      duration: 2,
                                      repeat: Infinity,
                                      repeatType: "reverse"
                                    }
                                  }}
                                  style={{
                                    backgroundImage: 'url("/tutor-avatar.jpg")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundColor: '#1a1a2e',
                                    transformOrigin: 'center center'
                                  }}
                                >
                                  {/* 渐变背景层 */}
                                  <div className="absolute inset-0 bg-gradient-to-br from-still via-dawn to-mist opacity-80 rounded-full"></div>
                                  
                                  {/* 播放按钮覆盖层 */}
                                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300 rounded-full">
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      transition={{ type: "spring", stiffness: 300 }}
                                    >
                                      <PlayCircle className="w-8 h-8 text-white drop-shadow-lg" />
                                    </motion.div>
                                  </div>
                                  
                                  {/* 呼吸光环效果 */}
                                  <motion.div
                                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-still to-dawn opacity-30 pointer-events-none"
                                    animate={{
                                      scale: [1, 1.05, 1],
                                      opacity: [0.3, 0.5, 0.3]
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      repeatType: "reverse"
                                    }}
                                  />
                                </motion.div>
                              </motion.div>
                            ) : (
                              // 展开的视频播放器
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="relative"
                              >
                                {/* 占位元素 - 保持布局稳定 */}
                                <div className="w-24 h-24 opacity-0"></div>

                                {/* 长方形视频容器 - 绝对定位覆盖按钮位置 */}
                                <div 
                                  className="absolute w-64 h-36 rounded-xl overflow-hidden shadow-xl"
                                  style={{ 
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)'
                                  }}
                                >
                                  {/* 视频播放器 */}
                                  <video
                                    ref={tutorVideoRef}
                                    className="w-full h-full object-cover"
                                    onEnded={handleTutorVideoEnd}
                                    onPause={() => setIsTutorPlaying(false)}
                                    onPlay={() => setIsTutorPlaying(true)}
                                    muted={false}
                                    controls={false}
                                    playsInline
                                    preload="metadata"
                                    style={{ 
                                      background: 'transparent',
                                      transform: 'scale(0.9)',
                                      transformOrigin: 'center center'
                                    }}
                                  >
                                    <source src="/videos/1. 工业控制器定义与核心作用.mp4" type="video/mp4" />
                                    您的浏览器不支持视频播放。
                                  </video>


                                </div>

                                {/* 控制按钮 - 绝对定位在视频下方，播放时隐藏，悬停时显示 */}
                                <motion.div 
                                  className="absolute flex justify-center space-x-2 mt-12"
                                  style={{
                                    left: '50%',
                                    top: '100%',
                                    transform: 'translateX(-50%)'
                                  }}
                                  initial={{ opacity: 1 }}
                                  animate={{ 
                                    opacity: isTutorPlaying ? 0 : 1,
                                    y: isTutorPlaying ? 5 : 0
                                  }}
                                  transition={{ 
                                    duration: 0.2, 
                                    ease: "easeOut"
                                  }}
                                  whileHover={isTutorPlaying ? { 
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.2 }
                                  } : {}}
                                >
                                  <button
                                    onClick={handleTutorTogglePlay}
                                    className="w-8 h-8 bg-still/90 hover:bg-still rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95"
                                  >
                                    {isTutorPlaying ? (
                                      <div className="w-3 h-3 bg-white rounded-sm"></div>
                                    ) : (
                                      <PlayCircle className="w-4 h-4" />
                                    )}
                                  </button>
                                  <button
                                    onClick={handleTutorClose}
                                    className="w-8 h-8 bg-red-600/90 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                  </AnimatePresence>
                </div>

                {/* 独立的透明背景导师视频播放器 */}
                <div className="absolute top-[1400px] right-[150px] z-10">
                    <AnimatePresence>
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
                                    className="w-24 h-24 rounded-full cursor-pointer relative overflow-hidden group"
                                    onClick={handleTransparentVideoTogglePlay}
                                    whileHover={{ 
                                      scale: 1.1,
                                      rotate: [0, -5, 5, 0],
                                      transition: { 
                                        scale: { type: "spring", stiffness: 300, damping: 20 },
                                        rotate: { duration: 0.6, ease: "easeInOut" }
                                      }
                                    }}
                                    whileTap={{ 
                                      scale: 0.8,
                                      rotate: 0,
                                      transition: { 
                                        type: "spring", 
                                        stiffness: 600, 
                                        damping: 15,
                                        duration: 0.1
                                      }
                                    }}
                                    animate={{
                                      boxShadow: [
                                        "0 0 20px rgba(59, 130, 246, 0.5)",
                                        "0 0 30px rgba(139, 92, 246, 0.7)",
                                        "0 0 20px rgba(59, 130, 246, 0.5)"
                                      ]
                                    }}
                                    transition={{
                                      boxShadow: {
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                      }
                                    }}
                                    style={{
                                      backgroundImage: 'url("/tutor-avatar.jpg")',
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      backgroundColor: '#1a1a2e',
                                      transformOrigin: 'center center'
                                    }}
                                  >
                                    {/* 渐变背景层 */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-still via-dawn to-mist opacity-80 rounded-full"></div>
                                    
                                    {/* 播放按钮覆盖层 */}
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300 rounded-full">
                                      <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                      >
                                        <PlayCircle className="w-8 h-8 text-white drop-shadow-lg" />
                                      </motion.div>
                                    </div>
                                    
                                    {/* 呼吸光环效果 */}
                                    <motion.div
                                      className="absolute -inset-1 rounded-full bg-gradient-to-r from-still to-dawn opacity-30 pointer-events-none"
                                      animate={{
                                        scale: [1, 1.05, 1],
                                        opacity: [0.3, 0.5, 0.3]
                                      }}
                                      transition={{
                                        duration: 2,
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
                                  {/* 占位元素保持布局稳定 */}
                                  <div className="w-24 h-24 opacity-0"></div>

                                  {/* 透明背景视频容器 - 绝对定位覆盖按钮位置 */}
                                  <div 
                                    className="absolute w-80 h-48 overflow-hidden"
                                    style={{
                                      background: 'transparent',
                                      left: '50%',
                                      top: '50%',
                                      transform: 'translate(-50%, -50%)'
                                    }}
                                  >
                                    {/* 绿幕抠图Canvas层 */}
                                    <canvas
                                      id="greenscreen-canvas"
                                      className="absolute inset-0 w-full h-full object-contain"
                                      style={{ display: 'block' }}
                                    />

                                    {/* 透明背景视频播放器 (隐藏原始视频) */}
                                    <video
                                      ref={transparentVideoRef}
                                      className="w-full h-full object-contain"
                                      onEnded={handleTransparentVideoEnd}
                                      onPause={() => {
                                        setIsTransparentVideoPlaying(false);
                                        // 暂停时也进行一次超级平滑绿幕处理，确保显示透明背景
                                        if (transparentVideoRef.current) {
                                          const canvas = document.getElementById('greenscreen-canvas') as HTMLCanvasElement;
                                          if (canvas) {
                                            const ctx = canvas.getContext('2d');
                                            if (ctx) {
                                              const video = transparentVideoRef.current;
                                              // 调用优化平滑处理函数
                                              processSingleFrameWithOptimizedSmoothing(video, canvas, ctx);
                                            }
                                          }
                                        }
                                      }}
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
                                        mixBlendMode: 'normal',
                                        transform: 'scale(0.8)',
                                        transformOrigin: 'center center'
                                      }}
                                    >
                                      <source src="/工业控制器的分类与对比新.mp4" type="video/mp4" />
                                      您的浏览器不支持视频播放。
                                    </video>
                                  </div>

                                  {/* 控制按钮 - 绝对定位在视频下方，播放时隐藏，悬停时显示 */}
                                  <motion.div 
                                    className="absolute flex justify-center space-x-2 mt-12"
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
                                      className="w-8 h-8 bg-still/90 hover:bg-still rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95"
                                    >
                                      {isTransparentVideoPlaying ? (
                                        <div className="w-3 h-3 bg-white rounded-sm"></div>
                                      ) : (
                                        <PlayCircle className="w-4 h-4" />
                                      )}
                                    </button>
                                    <button
                                      onClick={handleTransparentVideoClose}
                                      className="w-8 h-8 bg-red-600/90 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </motion.div>

                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                    </AnimatePresence>
                  </div>
              </div>
            </motion.main>
          </div>
        </div>
    </>
  );
};

export default AutomationIndustryPage;
