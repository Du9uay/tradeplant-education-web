/**
 * 匹配题连线功能的数据类型定义
 */

// 连线数据结构
export interface Line {
  start: { x: number; y: number };
  end: { x: number; y: number };
  leftId: string;
  rightId: string;
}

// 正在绘制的连线
export interface ActiveLine {
  start: { x: number; y: number };
  end?: { x: number; y: number };
  leftId: string;
}

// 匹配选项
export interface MatchingItem {
  id: string;
  text: string;
}

// 坐标点
export interface Point {
  x: number;
  y: number;
}