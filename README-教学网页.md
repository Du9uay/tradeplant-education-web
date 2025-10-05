# PLC控制器基础教学网页

## 项目简介

这是一个基于React和TypeScript开发的PLC控制器基础课程教学网页，采用现代化的玻璃风格UI设计，为大专院校工程技术专业学生提供优质的学习体验。

## 主要特色

### 🎨 现代化玻璃风格界面
- 使用自定义液态玻璃组件实现苹果风格的模糊玻璃效果
- 响应式布局，支持桌面端和移动端访问
- 流畅的鼠标交互动画和悬浮效果
- 渐变背景和动态光效装饰

### 📚 完整的课程内容体系
- **自动化行业基本构成**：传感层、控制层、执行层、管理层全景认知
- **PLC本质与特性**：工业控制器本质、扫描周期、实时性与硬件基础
- **I/O接线规范**：两线制、三线制传感器接线与安全规范
- **梯形图五大基础指令**：常开、常闭触点、输出线圈、定时器、计数器
- **TIA Portal基础操作**：工程创建、程序编写、下载监控
- **安全强化模块**：急停电路的梯形图禁忌

### 🎯 学习目标明确
- 掌握电气图识读技能与生产流程认知
- 熟练使用梯形图编程工具进行基础操作
- 具备PLC硬件I/O模块接线能力
- 理解PLC循环扫描工作原理
- 遵循安全设计优先原则

### 🚀 职业发展指导
- **PLC编程工程师**：需求量大，门槛中等
- **自动化技术员**：需求稳定，入门门槛较低
- **工控设备调试员**：专业性强，技术要求高

## 技术栈

- **前端框架**：React 18 + TypeScript
- **样式处理**：Tailwind CSS + 自定义CSS
- **UI组件**：自定义液态玻璃效果组件
- **图标系统**：自定义SVG图标组件
- **构建工具**：Create React App

## 项目结构

```
education_web/
├── public/
│   └── index.html              # HTML模板
├── src/
│   ├── components/
│   │   ├── LiquidGlass.tsx     # 液态玻璃效果组件
│   │   └── Icons.tsx           # 自定义图标组件
│   ├── App.tsx                 # 主应用组件
│   ├── index.tsx               # 应用入口
│   └── index.css               # 全局样式
├── package.json                # 依赖配置
├── tsconfig.json              # TypeScript配置
├── tailwind.config.js         # Tailwind配置
└── postcss.config.js          # PostCSS配置
```

## 安装和运行

### 环境要求
- Node.js 16.x 或更高版本
- npm 或 yarn 包管理器

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm start
```

访问 http://localhost:3000 查看网页效果

### 构建生产版本
```bash
npm run build
```

## 核心组件说明

### LiquidGlass 液态玻璃组件
这是一个自定义组件，模拟苹果设备上的液态玻璃效果：

```tsx
<LiquidGlass
  mouseContainer={containerRef}
  displacementScale={50}
  blurAmount={0.08}
  saturation={130}
  elasticity={0.2}
  cornerRadius={16}
>
  <div>你的内容</div>
</LiquidGlass>
```

#### 主要属性
- `displacementScale`: 控制位移效果强度
- `blurAmount`: 控制模糊程度
- `saturation`: 控制饱和度
- `elasticity`: 控制弹性动画效果
- `cornerRadius`: 控制圆角大小
- `mouseContainer`: 鼠标容器引用

### 响应式设计
- 桌面端：多列布局，完整展示所有内容
- 平板端：适应性布局调整
- 移动端：单列布局，优化触摸交互

## 课程内容亮点

### 实践案例丰富
- **汽车装配线**：焊接工序自动化控制
- **化工厂反应罐**：温度液位控制系统
- **智能楼宇**：电梯调度和照明控制

### 安全设计强调
- 急停电路独立硬接线设计
- 双线圈冲突避免方法
- 安全设计优先原则

### 操作指导详细
- TIA Portal软件操作步骤
- 梯形图编程实践
- 硬件接线规范
- 故障诊断方法

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

注意：部分高级视觉效果（如backdrop-filter）在较老的浏览器中可能不支持。

## 开发说明

本项目采用模块化开发方式，组件间职责清晰：

1. **App.tsx**：主应用入口，负责整体布局和状态管理
2. **LiquidGlass.tsx**：可复用的玻璃效果组件
3. **Icons.tsx**：统一的图标管理
4. **index.css**：全局样式和Tailwind配置

## 贡献指南

1. Fork 本项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License

## 联系方式

如有问题或建议，请通过以下方式联系：
- 项目地址：[GitHub Repository]
- 问题反馈：[Issues]

---

**致谢**：感谢所有为PLC教育事业贡献力量的教育工作者和技术专家！ 