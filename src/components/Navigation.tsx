import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, X } from './Icons';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 课程模块列表
  const courseModules = [
    { name: '国内主流平台概览与选择策略', path: '/course/platform-overview' },
    { name: '店铺类型与经营品类匹配规则', path: '/course/shop-types' },
    { name: '平台入驻流程讲解', path: '/course/entry-process' },
    { name: '核心资质与费用明细', path: '/course/qualifications-fees' }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCoursesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md border-b z-50"
         style={{
           background: 'rgba(30, 41, 59, 0.7)',
           borderColor: 'rgba(148, 163, 184, 0.2)'
         }}>
    <button
        onClick={() => setIsTrialModalOpen(true)}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/30"
      >
        <PlayCircle className="w-4 h-4" />
        <span>直播回放</span>
      </button>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 直播回放按钮和Logo */}
          <div className="flex items-center space-x-4">
            {/* 直播回放按钮 */}
            

            {/* Logo */}
            <Link to="/" style={{ color: 'var(--text-primary)' }} className="text-xl font-bold transition-colors">
              电商入驻策略教学
            </Link>
          </div>

          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium transition-colors relative"
              style={{
                color: isActivePath('/') ? 'var(--accent-primary)' : 'var(--text-tertiary)'
              }}
              onMouseEnter={(e) => {
                if (!isActivePath('/')) {
                  e.currentTarget.style.color = 'var(--accent-secondary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActivePath('/')) {
                  e.currentTarget.style.color = 'var(--text-tertiary)';
                }
              }}
              onClick={() => setIsCoursesOpen(false)}
            >
              首页
              {isActivePath('/') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5" style={{ background: 'var(--accent-primary)' }} />
              )}
            </Link>

            {/* 课程章节下拉菜单 */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                className="text-sm font-medium transition-colors flex items-center space-x-1 relative"
                style={{ color: 'var(--text-tertiary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-tertiary)';
                }}
              >
                <span>课程章节</span>
                <svg className={`w-4 h-4 transition-transform ${isCoursesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {isCoursesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 w-80 backdrop-blur-lg rounded-lg border overflow-hidden"
                    style={{
                      background: 'rgba(30, 41, 59, 0.9)',
                      borderColor: 'rgba(148, 163, 184, 0.2)'
                    }}
                  >
                    {courseModules.map((module, index) => (
                      <Link
                        key={module.path}
                        to={module.path}
                        className={`block px-4 py-3 text-sm transition-colors ${index === 0 ? 'rounded-t-lg' : ''} ${index === courseModules.length - 1 ? 'rounded-b-lg' : ''}`}
                        style={{
                          color: isActivePath(module.path) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                          backgroundColor: isActivePath(module.path) ? 'rgba(14, 165, 233, 0.15)' : 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (!isActivePath(module.path)) {
                            e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
                            e.currentTarget.style.color = 'var(--accent-secondary)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActivePath(module.path)) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                          }
                        }}
                        onClick={() => setIsCoursesOpen(false)}
                      >
                        {module.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/course-test"
              className="text-sm font-medium transition-colors relative"
              style={{
                color: isActivePath('/course-test') ? 'var(--accent-primary)' : 'var(--text-tertiary)'
              }}
              onMouseEnter={(e) => {
                if (!isActivePath('/course-test')) {
                  e.currentTarget.style.color = 'var(--accent-secondary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActivePath('/course-test')) {
                  e.currentTarget.style.color = 'var(--text-tertiary)';
                }
              }}
              onClick={() => setIsCoursesOpen(false)}
            >
              课堂测试
              {isActivePath('/course-test') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5" style={{ background: 'var(--accent-primary)' }} />
              )}
            </Link>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden transition-colors"
            style={{ color: 'var(--text-primary)' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* 移动端菜单 */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden backdrop-blur-lg rounded-lg mt-2 overflow-hidden"
              style={{
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(148, 163, 184, 0.2)'
              }}
            >
              <div className="py-2 space-y-1">
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm transition-colors"
                  style={{
                    color: isActivePath('/') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    backgroundColor: isActivePath('/') ? 'rgba(14, 165, 233, 0.15)' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActivePath('/')) {
                      e.currentTarget.style.color = 'var(--accent-secondary)';
                      e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActivePath('/')) {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  首页
                </Link>

                {/* 移动端课程模块 */}
                <div className="mt-2 pt-2" style={{ borderTop: '1px solid rgba(148, 163, 184, 0.2)' }}>
                  <div className="px-4 py-2 text-xs font-medium uppercase tracking-wider"
                       style={{ color: 'var(--text-tertiary)' }}>
                    课程章节
                  </div>
                  {courseModules.map((module) => (
                    <Link
                      key={module.path}
                      to={module.path}
                      className="block px-6 py-2 text-sm transition-colors"
                      style={{
                        color: isActivePath(module.path) ? 'var(--accent-primary)' : 'var(--text-tertiary)'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActivePath(module.path)) {
                          e.currentTarget.style.color = 'var(--accent-secondary)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActivePath(module.path)) {
                          e.currentTarget.style.color = 'var(--text-tertiary)';
                        }
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {module.name}
                    </Link>
                  ))}
                </div>

                <Link
                  to="/course-test"
                  className="block px-4 py-2 text-sm transition-colors"
                  style={{
                    color: isActivePath('/course-test') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    backgroundColor: isActivePath('/course-test') ? 'rgba(14, 165, 233, 0.15)' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActivePath('/course-test')) {
                      e.currentTarget.style.color = 'var(--accent-secondary)';
                      e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActivePath('/course-test')) {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  课堂测试
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>

    {/* 直播回放弹窗 */}
    {isTrialModalOpen && (
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
        {/* 背景遮罩 */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsTrialModalOpen(false)}
        />

        {/* 弹窗内容 */}
        <div className="relative w-full max-w-5xl bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-purple-500/30 overflow-hidden">
          {/* 头部 */}
          <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">直播回放</h2>
            </div>
            <button
              onClick={() => setIsTrialModalOpen(false)}
              className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* 视频容器 */}
          <div className="relative bg-black" style={{ paddingBottom: '56.25%' }}>
            <video
              className="absolute inset-0 w-full h-full"
              controls
              autoPlay
              src="https://ddcz-1315997005.cos.ap-nanjing.myqcloud.com/static/video/web_teach/recuYIQO9mpkMD.mov"
            >
              您的浏览器不支持视频播放
            </video>
          </div>

          {/* 底部 */}
          <div className="p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-t border-purple-500/20">
            <div className="flex items-center justify-between">
              <p className="text-white/80">
                体验我们的专业课程内容，了解电商平台入驻的核心知识
              </p>
              <button
                onClick={() => setIsTrialModalOpen(false)}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all hover:scale-105"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Navigation; 