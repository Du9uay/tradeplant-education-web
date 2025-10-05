import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, BookOpen, RefreshCw, Target, CheckCircle, ArrowRight, Users, Move } from '../components/Icons';
import { Line, ActiveLine, Point } from '../types/matching';

const CourseTestPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('multiple');
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] | { [key: string]: string } }>({});
  const [timeRemaining, setTimeRemaining] = useState(20 * 60); // 20分钟
  
  // 拖拽排序状态
  const [sequenceItems, setSequenceItems] = useState(['签约缴费', '资质提交', '审核', '注册', '店铺搭建']);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // 配对题状态
  const [matchingAnswers, setMatchingAnswers] = useState<{ [key: string]: string }>({});
  const [wordMatchingAnswers, setWordMatchingAnswers] = useState<{ [key: string]: string }>({});
  
  // 连线功能状态
  // 连线功能状态 - 平台配对题
  const [platformLines, setPlatformLines] = useState<Line[]>([]);
  const [platformActiveLine, setPlatformActiveLine] = useState<ActiveLine | null>(null);
  const [platformDrawing, setPlatformDrawing] = useState(false);
  
  // 连线功能状态 - 词义配对题  
  const [wordLines, setWordLines] = useState<Line[]>([]);
  const [wordActiveLine, setWordActiveLine] = useState<ActiveLine | null>(null);
  const [wordDrawing, setWordDrawing] = useState(false);
  
  // DOM引用
  const platformItemRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const wordItemRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const platformSvgRef = useRef<SVGSVGElement>(null);
  const wordSvgRef = useRef<SVGSVGElement>(null);
  const platformContainerRef = useRef<HTMLDivElement>(null);
  const wordContainerRef = useRef<HTMLDivElement>(null);

  const sections = ['multiple', 'fillblank', 'matching', 'sequence'];
  const sectionNames = {
    multiple: '选择题',
    fillblank: '填空题', 
    matching: '配对题',
    sequence: '排序题'
  };

  useEffect(() => {
    if (timeRemaining > 0 && !showResults) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleSubmit();
    }
  }, [timeRemaining, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 选择题
  const multipleChoiceQuestions = [
    {
      id: 'q1',
      question: '国内主流电商平台中，以高客单价商品适配为主的是？',
      options: ['淘宝', '京东', '拼多多', '抖音'],
      correct: '京东'
    },
    {
      id: 'q2', 
      question: '个人店适用于哪种经营情况？',
      options: [
        '单一品牌全品类经营',
        '多品牌或单一品牌特定品类经营',
        '轻量级低资质品类经营',
        '高端品牌全品类经营'
      ],
      correct: '轻量级低资质品类经营'
    },
    {
      id: 'q3',
      question: '选平台时，不需要考虑以下哪个因素？',
      options: ['目标用户特征', '产品价格', '品牌调性', '天气情况'],
      correct: '天气情况'
    }
  ];

  // 填空题
  const fillInBlankQuestions = [
    {
      id: 'f1',
      question: '店铺类型中，专营店适配_____。',
      correct: '多品牌或单一品牌特定品类'
    },
    {
      id: 'f2',
      question: '平台入驻共通环节包括注册、资质提交、审核、签约缴费、_____。',
      correct: '店铺搭建'
    }
  ];

  // 连线题 - 平台特色匹配
  const matchingPairs = [
    { id: 'm1', left: '拼多多', right: '下沉市场价格敏感型消费者' },
    { id: 'm2', left: '京东', right: '中高端品质化用户' },
    { id: 'm3', left: '淘宝', right: '全消费层级覆盖' },
    { id: 'm4', left: '抖音', right: '年轻群体娱乐导向消费' }
  ];

  // 词义配对题
  const wordMatchingPairs = [
    { id: 'w1', left: '旗舰店', right: '品牌方提供商标证等资质经营全品类' },
    { id: 'w2', left: '专营店', right: '需多个品牌授权经营同类商品' },
    { id: 'w3', left: '专卖店', right: '需品牌独家授权经营单一品牌商品' },
    { id: 'w4', left: '个人店', right: '资质要求低经营轻量级品类' }
  ];

  // 排序题
  const sequenceQuestion = {
    id: 's1',
    question: '将平台入驻共通环节按顺序排列：',
    items: ['签约缴费', '资质提交', '审核', '注册', '店铺搭建'],
    correct: ['注册', '资质提交', '审核', '签约缴费', '店铺搭建']
  };

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  // 计算元素中心点坐标（相对于SVG容器）
  const getItemCenter = useCallback((element: HTMLElement, containerRef: React.RefObject<HTMLDivElement>): Point => {
    const rect = element.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
    return {
      x: rect.left + rect.width / 2 - containerRect.left,
      y: rect.top + rect.height / 2 - containerRect.top
    };
  }, []);

  // 平台配对题连线处理
  const handlePlatformLeftItemClick = useCallback((leftId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const element = platformItemRefs.current[leftId];
    if (element) {
      // 如果该项已经连线，先移除现有连线
      if (platformLines.some(line => line.leftId === leftId)) {
        setPlatformLines(prev => prev.filter(line => line.leftId !== leftId));
        setMatchingAnswers(prev => {
          const newAnswers = { ...prev };
          delete newAnswers[leftId];
          return newAnswers;
        });
      }
      
      // 创建新的活动连线
      const center = getItemCenter(element, platformContainerRef);
      setPlatformActiveLine({
        start: center,
        leftId
      });
      setPlatformDrawing(true);
    }
  }, [platformLines, getItemCenter]);

  const handlePlatformRightItemClick = useCallback((rightId: string, e: React.MouseEvent) => {
    if (!platformActiveLine) return;
    
    e.stopPropagation();
    const element = platformItemRefs.current[rightId];
    if (element) {
      // 防止重复连接到同一右侧项
      if (platformLines.some(line => line.rightId === rightId)) {
        return;
      }

      // 创建新连线
      const center = getItemCenter(element, platformContainerRef);
      const newLine: Line = {
        start: platformActiveLine.start,
        end: center,
        leftId: platformActiveLine.leftId,
        rightId
      };

      setPlatformLines(prev => [...prev, newLine]);
      setPlatformActiveLine(null);
      setPlatformDrawing(false);
      
      // 更新答案
      setMatchingAnswers(prev => ({
        ...prev,
        [platformActiveLine.leftId]: rightId
      }));
    }
  }, [platformActiveLine, platformLines, getItemCenter]);

  // 词义配对题连线处理  
  const handleWordLeftItemClick = useCallback((leftId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const element = wordItemRefs.current[leftId];
    if (element) {
      // 如果该项已经连线，先移除现有连线
      if (wordLines.some(line => line.leftId === leftId)) {
        setWordLines(prev => prev.filter(line => line.leftId !== leftId));
        setWordMatchingAnswers(prev => {
          const newAnswers = { ...prev };
          delete newAnswers[leftId];
          return newAnswers;
        });
      }
      
      // 创建新的活动连线
      const center = getItemCenter(element, wordContainerRef);
      setWordActiveLine({
        start: center,
        leftId
      });
      setWordDrawing(true);
    }
  }, [wordLines, getItemCenter]);

  const handleWordRightItemClick = useCallback((rightId: string, e: React.MouseEvent) => {
    if (!wordActiveLine) return;
    
    e.stopPropagation();
    const element = wordItemRefs.current[rightId];
    if (element) {
      // 防止重复连接到同一右侧项
      if (wordLines.some(line => line.rightId === rightId)) {
        return;
      }

      // 创建新连线
      const center = getItemCenter(element, wordContainerRef);
      const newLine: Line = {
        start: wordActiveLine.start,
        end: center,
        leftId: wordActiveLine.leftId,
        rightId
      };

      setWordLines(prev => [...prev, newLine]);
      setWordActiveLine(null);
      setWordDrawing(false);
      
      // 更新答案
      setWordMatchingAnswers(prev => ({
        ...prev,
        [wordActiveLine.leftId]: rightId
      }));
    }
  }, [wordActiveLine, wordLines, getItemCenter]);

  // 鼠标移动处理
  const handlePlatformMouseMove = useCallback((e: React.MouseEvent) => {
    if (platformActiveLine && platformDrawing && platformContainerRef.current) {
      const containerRect = platformContainerRef.current.getBoundingClientRect();
      setPlatformActiveLine({
        ...platformActiveLine,
        end: {
          x: e.clientX - containerRect.left,
          y: e.clientY - containerRect.top
        }
      });
    }
  }, [platformActiveLine, platformDrawing]);

  const handleWordMouseMove = useCallback((e: React.MouseEvent) => {
    if (wordActiveLine && wordDrawing && wordContainerRef.current) {
      const containerRect = wordContainerRef.current.getBoundingClientRect();
      setWordActiveLine({
        ...wordActiveLine,
        end: {
          x: e.clientX - containerRect.left,
          y: e.clientY - containerRect.top
        }
      });
    }
  }, [wordActiveLine, wordDrawing]);

  // 取消连线
  const handlePlatformCancelDrawing = useCallback(() => {
    setPlatformActiveLine(null);
    setPlatformDrawing(false);
  }, []);

  const handleWordCancelDrawing = useCallback(() => {
    setWordActiveLine(null);
    setWordDrawing(false);
  }, []);



  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: string) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const draggedIndex = sequenceItems.indexOf(draggedItem);
    if (draggedIndex === -1) return;

    const newItems = [...sequenceItems];
    newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);
    
    setSequenceItems(newItems);
    setDraggedItem(null);
    handleAnswer(sequenceQuestion.id, newItems);
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;

    // 选择题评分
    multipleChoiceQuestions.forEach(q => {
      total++;
      if (answers[q.id] === q.correct) correct++;
    });

    // 填空题评分
    fillInBlankQuestions.forEach(q => {
      total++;
      const userAnswer = (answers[q.id] as string)?.toLowerCase().trim();
      const correctAnswer = q.correct.toLowerCase().trim();
      if (userAnswer === correctAnswer) correct++;
    });

    // 平台配对题评分
    total += matchingPairs.length;
    matchingPairs.forEach(pair => {
      if (matchingAnswers[pair.left] === pair.right) correct++;
    });

    // 词义配对题评分
    total += wordMatchingPairs.length;
    wordMatchingPairs.forEach(pair => {
      if (wordMatchingAnswers[pair.left] === pair.right) correct++;
    });

    // 排序题评分
    total++;
    const userSequence = answers[sequenceQuestion.id] as string[] || sequenceItems;
    if (JSON.stringify(userSequence) === JSON.stringify(sequenceQuestion.correct)) {
      correct++;
    }

    return { correct, total, percentage: Math.round((correct / total) * 100) };
  };

  const handleSubmit = () => {
    // 保存配对题答案到answers中
    setAnswers(prev => ({
      ...prev,
      'matching_platform': matchingAnswers,
      'matching_word': wordMatchingAnswers,
      [sequenceQuestion.id]: sequenceItems
    }));
    setShowResults(true);
  };

  const resetTest = () => {
    setAnswers({});
    setMatchingAnswers({});
    setWordMatchingAnswers({});
    
    // 重置连线状态
    setPlatformLines([]);
    setPlatformActiveLine(null);
    setPlatformDrawing(false);
    setWordLines([]);
    setWordActiveLine(null);
    setWordDrawing(false);
    
    setSequenceItems(['签约缴费', '资质提交', '审核', '注册', '店铺搭建']);
    setShowResults(false);
    setCurrentSection('multiple');
    setTimeRemaining(20 * 60);
  };

  const getNextSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
  };

  const getPrevSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex > 0 ? sections[currentIndex - 1] : null;
  };

  const score = showResults ? calculateScore() : { correct: 0, total: 0, percentage: 0 };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto px-4 py-20">
        {/* 页面标题 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            课堂测试
          </h1>
          <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
            检验你对主流平台入驻策略与资质准备的掌握程度
          </p>
        </motion.div>

        {!showResults ? (
          <>
            {/* 计时器和导航 */}
            <div className="glass-card rounded-xl p-6 mb-8" style={{
              background: 'rgba(216, 207, 213, 0.16)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  剩余时间: <span style={{ color: 'var(--still)' }}>{formatTime(timeRemaining)}</span>
                </div>
                <div className="flex space-x-2">
                  {sections.map((section) => (
                    <button
                      key={section}
                      onClick={() => setCurrentSection(section)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                        currentSection === section 
                          ? 'text-white' 
                          : 'hover:bg-white/20'
                      }`}
                      style={{
                        backgroundColor: currentSection === section ? 'var(--still)' : 'rgba(255, 255, 255, 0.1)',
                        color: currentSection === section ? 'white' : 'var(--text-secondary)',
                        border: currentSection === section ? '1px solid var(--still)' : '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      {sectionNames[section as keyof typeof sectionNames]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* 选择题 */}
              {currentSection === 'multiple' && (
                <motion.div
                  key="multiple"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: 'var(--text-primary)' }}>
                    <BookOpen className="w-6 h-6 mr-2" />
                    选择题
                  </h2>
                  {multipleChoiceQuestions.map((question, index) => (
                    <div key={question.id} className="glass-card rounded-xl p-6" style={{
                      background: 'rgba(216, 207, 213, 0.16)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                        {index + 1}. {question.question}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {question.options.map((option, optIndex) => (
                          <motion.button
                            key={optIndex}
                            onClick={() => handleAnswer(question.id, option)}
                            className={`p-3 rounded-lg text-left transition-all ${
                              answers[question.id] === option
                                ? 'text-white'
                                : 'text-gray-300 hover:bg-white/10'
                            }`}
                            style={{
                              backgroundColor: answers[question.id] === option 
                                ? 'var(--still)' 
                                : 'rgba(255, 255, 255, 0.05)'
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {String.fromCharCode(65 + optIndex)}. {option}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* 填空题 */}
              {currentSection === 'fillblank' && (
                <motion.div
                  key="fillblank"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: 'var(--text-primary)' }}>
                    <Target className="w-6 h-6 mr-2" />
                    填空题
                  </h2>
                  {fillInBlankQuestions.map((question, index) => (
                    <div key={question.id} className="glass-card rounded-xl p-6" style={{
                      background: 'rgba(216, 207, 213, 0.16)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                        {index + 1}. {question.question}
                      </h3>
                      <input
                        type="text"
                        value={(answers[question.id] as string) || ''}
                        onChange={(e) => handleAnswer(question.id, e.target.value)}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-still"
                        style={{ 
                          borderColor: answers[question.id] ? 'var(--still)' : 'rgba(255, 255, 255, 0.2)'
                        }}
                        placeholder="请输入答案..."
                      />
                    </div>
                  ))}
                </motion.div>
              )}

              {/* 配对题 */}
              {currentSection === 'matching' && (
                <motion.div
                  key="matching"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: 'var(--text-primary)' }}>
                    <Users className="w-6 h-6 mr-2" />
                    配对题
                  </h2>
                  
                  {/* 平台特点配对题 */}
                  <div className="glass-card rounded-xl p-6" style={{
                    background: 'rgba(216, 207, 213, 0.16)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <h3 className="text-lg font-semibold mb-4">平台特点配对题</h3>
                    <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                      点击左侧平台，然后点击右侧对应特点进行连线配对：
                    </p>
                    
                    <div 
                      ref={platformContainerRef}
                      className="relative min-h-[300px]"
                      onMouseMove={handlePlatformMouseMove}
                      onMouseLeave={handlePlatformCancelDrawing}
                      onClick={handlePlatformCancelDrawing}
                    >
                      {/* SVG连线层 */}
                      <svg 
                        ref={platformSvgRef}
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{ width: '100%', height: '100%' }}
                      >
                        {/* 绘制已完成的连线 */}
                        <AnimatePresence>
                          {platformLines.map((line, i) => (
                            <motion.g 
                              key={`${line.leftId}-${line.rightId}`}
                              initial={{ opacity: 0, pathLength: 0 }}
                              animate={{ opacity: 1, pathLength: 1 }}
                              exit={{ opacity: 0, pathLength: 0 }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                              <motion.line
                                x1={line.start.x}
                                y1={line.start.y}
                                x2={line.end.x}
                                y2={line.end.y}
                                stroke="var(--still)"
                                strokeWidth="3"
                                className="transition-all duration-300"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                              />
                              <motion.circle 
                                cx={line.start.x} 
                                cy={line.start.y} 
                                r="5" 
                                fill="var(--still)"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 }}
                              />
                              <motion.circle 
                                cx={line.end.x} 
                                cy={line.end.y} 
                                r="5" 
                                fill="var(--still)"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4 }}
                              />
                            </motion.g>
                          ))}
                        </AnimatePresence>
                        
                        {/* 绘制当前正在绘制的连线 */}
                        {platformActiveLine && (
                          <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <line
                              x1={platformActiveLine.start.x}
                              y1={platformActiveLine.start.y}
                              x2={platformActiveLine.end?.x || platformActiveLine.start.x}
                              y2={platformActiveLine.end?.y || platformActiveLine.start.y}
                              stroke="var(--still)"
                              strokeWidth="3"
                              strokeDasharray="8,4"
                              className="animate-pulse"
                            />
                            <circle 
                              cx={platformActiveLine.start.x} 
                              cy={platformActiveLine.start.y} 
                              r="5" 
                              fill="var(--still)" 
                            />
                          </motion.g>
                        )}
                      </svg>
                      
                      <div className="grid grid-cols-2 gap-8 relative z-20">
                        {/* 左侧平台 */}
                        <div className="space-y-3">
                          {['拼多多', '京东', '淘宝', '抖音'].map((platform, index) => {
                            const isConnected = platformLines.some(line => line.leftId === platform);
                            return (
                              <motion.div
                                key={platform}
                                ref={el => el && (platformItemRefs.current[platform] = el)}
                                onClick={(e) => handlePlatformLeftItemClick(platform, e)}
                                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 min-h-[60px] flex items-center justify-center ${
                                  isConnected 
                                    ? 'bg-blue-500/30 border-blue-400'
                                    : 'bg-blue-900/20 border-blue-500/30 hover:bg-blue-900/40 hover:border-blue-400'
                                }`}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="text-center font-medium text-white text-base">
                                  {platform}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                        
                        {/* 右侧特点 */}
                        <div className="space-y-3">
                          {['下沉市场价格敏感型消费者', '中高端品质化用户', '全消费层级覆盖', '年轻群体娱乐导向消费'].map((feature, index) => {
                            const isConnected = platformLines.some(line => line.rightId === feature);
                            return (
                              <motion.div
                                key={feature}
                                ref={el => el && (platformItemRefs.current[feature] = el)}
                                onClick={(e) => handlePlatformRightItemClick(feature, e)}
                                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 min-h-[60px] flex items-center justify-center ${
                                  isConnected 
                                    ? 'bg-blue-500/30 border-blue-400'
                                    : 'bg-blue-900/20 border-blue-500/30 hover:bg-blue-900/40 hover:border-blue-400'
                                }`}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.02, x: -5 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="text-center font-medium text-white text-base">
                                  {feature}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 词义配对题 */}
                  <div className="glass-card rounded-xl p-6" style={{
                    background: 'rgba(216, 207, 213, 0.16)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <h3 className="text-lg font-semibold mb-4">词义配对题</h3>
                    <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                      点击左侧店铺类型，然后点击右侧对应特性进行连线配对：
                    </p>
                    
                    <div 
                      ref={wordContainerRef}
                      className="relative min-h-[300px]"
                      onMouseMove={handleWordMouseMove}
                      onMouseLeave={handleWordCancelDrawing}
                      onClick={handleWordCancelDrawing}
                    >
                      {/* SVG连线层 */}
                      <svg 
                        ref={wordSvgRef}
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{ width: '100%', height: '100%' }}
                      >
                        {/* 绘制已完成的连线 */}
                        <AnimatePresence>
                          {wordLines.map((line, i) => (
                            <motion.g 
                              key={`${line.leftId}-${line.rightId}`}
                              initial={{ opacity: 0, pathLength: 0 }}
                              animate={{ opacity: 1, pathLength: 1 }}
                              exit={{ opacity: 0, pathLength: 0 }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                              <motion.line
                                x1={line.start.x}
                                y1={line.start.y}
                                x2={line.end.x}
                                y2={line.end.y}
                                stroke="var(--dawn)"
                                strokeWidth="3"
                                className="transition-all duration-300"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                              />
                              <motion.circle 
                                cx={line.start.x} 
                                cy={line.start.y} 
                                r="5" 
                                fill="var(--dawn)"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 }}
                              />
                              <motion.circle 
                                cx={line.end.x} 
                                cy={line.end.y} 
                                r="5" 
                                fill="var(--dawn)"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4 }}
                              />
                            </motion.g>
                          ))}
                        </AnimatePresence>
                        
                        {/* 绘制当前正在绘制的连线 */}
                        {wordActiveLine && (
                          <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <line
                              x1={wordActiveLine.start.x}
                              y1={wordActiveLine.start.y}
                              x2={wordActiveLine.end?.x || wordActiveLine.start.x}
                              y2={wordActiveLine.end?.y || wordActiveLine.start.y}
                              stroke="var(--dawn)"
                              strokeWidth="3"
                              strokeDasharray="8,4"
                              className="animate-pulse"
                            />
                            <circle 
                              cx={wordActiveLine.start.x} 
                              cy={wordActiveLine.start.y} 
                              r="5" 
                              fill="var(--dawn)" 
                            />
                          </motion.g>
                        )}
                      </svg>
                      
                      <div className="grid grid-cols-2 gap-8 relative z-20">
                        {/* 左侧店铺类型 */}
                        <div className="space-y-3">
                          {['旗舰店', '专营店', '专卖店', '个人店'].map((shopType, index) => {
                            const isConnected = wordLines.some(line => line.leftId === shopType);
                            return (
                              <motion.div
                                key={shopType}
                                ref={el => el && (wordItemRefs.current[shopType] = el)}
                                onClick={(e) => handleWordLeftItemClick(shopType, e)}
                                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 min-h-[60px] flex items-center justify-center ${
                                  isConnected 
                                    ? 'bg-orange-500/30 border-orange-400'
                                    : 'bg-orange-900/20 border-orange-500/30 hover:bg-orange-900/40 hover:border-orange-400'
                                }`}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="text-center font-medium text-white text-base">
                                  {shopType}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                        
                        {/* 右侧特性 */}
                        <div className="space-y-3">
                          {['品牌方提供商标证等资质经营全品类', '需多个品牌授权经营同类商品', '需品牌独家授权经营单一品牌商品', '资质要求低经营轻量级品类'].map((characteristic, index) => {
                            const isConnected = wordLines.some(line => line.rightId === characteristic);
                            return (
                              <motion.div
                                key={characteristic}
                                ref={el => el && (wordItemRefs.current[characteristic] = el)}
                                onClick={(e) => handleWordRightItemClick(characteristic, e)}
                                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 min-h-[60px] flex items-center justify-center ${
                                  isConnected 
                                    ? 'bg-orange-500/30 border-orange-400'
                                    : 'bg-orange-900/20 border-orange-500/30 hover:bg-orange-900/40 hover:border-orange-400'
                                }`}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.02, x: -5 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="text-center font-medium text-white text-base">
                                  {characteristic}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 排序题 */}
              {currentSection === 'sequence' && (
                <motion.div
                  key="sequence"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: 'var(--text-primary)' }}>
                    <Move className="w-6 h-6 mr-2" />
                    排序题
                  </h2>
                  <div className="glass-card rounded-xl p-6" style={{
                    background: 'rgba(216, 207, 213, 0.16)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <h3 className="text-lg font-semibold mb-4">{sequenceQuestion.question}</h3>
                    <p className="mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      拖拽下方选项来调整顺序：
                    </p>
                    <div className="space-y-3">
                      {sequenceItems.map((item, index) => (
                        <div
                          key={item}
                          draggable
                          onDragStart={(e) => handleDragStart(e, item)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index)}
                          className={`p-4 rounded-lg cursor-move border-2 transition-all ${
                            draggedItem === item 
                              ? 'border-still bg-white/20' 
                              : 'border-white/20 bg-white/5 hover:bg-white/10 hover:scale-105'
                          }`}
                          style={{
                            transform: draggedItem === item ? 'scale(1.02)' : 'scale(1)',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                                   style={{ backgroundColor: 'var(--still)', color: 'white' }}>
                                {index + 1}
                              </div>
                              <span>{item}</span>
                            </div>
                            <Move className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      正确顺序：注册 → 资质提交 → 审核 → 签约缴费 → 店铺搭建
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 导航和提交按钮 */}
            <div className="flex justify-between items-center mt-12">
              <div>
                {getPrevSection() && (
                  <motion.button
                    onClick={() => setCurrentSection(getPrevSection()!)}
                    className="px-6 py-3 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    <span>上一题型</span>
                  </motion.button>
                )}
              </div>
              
              <div>
                {getNextSection() ? (
                  <motion.button
                    onClick={() => setCurrentSection(getNextSection()!)}
                    className="btn-primary rounded-xl shadow-lg flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>下一题型</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleSubmit}
                    className="btn-primary rounded-xl shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    提交测试
                  </motion.button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* 测试结果 */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="glass-card rounded-2xl p-12 max-w-2xl mx-auto" style={{
              background: 'rgba(216, 207, 213, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.25)'
            }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: 'linear-gradient(135deg, var(--still) 0%, var(--dawn) 100%)'
                }}
              >
                <Award className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>测试完成！</h2>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--still)' }}>{score.correct}</div>
                  <div className="text-sm text-gray-300">正确题数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--still)' }}>{score.total}</div>
                  <div className="text-sm text-gray-300">总题数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--dawn)' }}>{score.percentage}%</div>
                  <div className="text-sm text-gray-300">正确率</div>
                </div>
              </div>

              <div className="mb-8">
                {score.percentage >= 80 ? (
                  <div style={{ color: 'var(--still)' }}>
                    <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-lg font-semibold">优秀！</p>
                    <p>你已经很好地掌握了平台入驻策略的核心知识</p>
                  </div>
                ) : score.percentage >= 60 ? (
                  <div style={{ color: 'var(--dawn)' }}>
                    <Target className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-lg font-semibold">良好</p>
                    <p>继续加油，建议复习相关知识点</p>
                  </div>
                ) : (
                  <div style={{ color: 'var(--mist)' }}>
                    <RefreshCw className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-lg font-semibold">需要改进</p>
                    <p>建议重新学习课程内容后再次测试</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={resetTest}
                  className="px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, var(--still) 0%, var(--dawn) 100%)',
                    color: 'white'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  重新测试
                </motion.button>
                
                <Link
                  to="/course-summary"
                  className="px-6 py-3 bg-white/10 rounded-xl font-semibold transition-all duration-300 hover:bg-white/20 inline-flex items-center justify-center"
                >
                  查看课程总结
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CourseTestPage;