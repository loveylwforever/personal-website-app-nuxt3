// 为Element Plus组件库声明类型
declare module 'element-plus/es/components/message' {
  const ElMessage: {
    success(message: string): void;
    warning(message: string): void;
    info(message: string): void;
    error(message: string): void;
  };
  export { ElMessage };
}

// 为其他模块声明类型
declare module '@element-plus/icons-vue' {
  import { Component } from 'vue';
  const Search: Component;
  const Moon: Component;
  const Sunny: Component;
  const User: Component;
  const Menu: Component;
  const ArrowDown: Component;
  const ArrowRight: Component;
  const Close: Component;
  const Setting: Component;
  const Download: Component;
  const Monitor: Component;
  const Picture: Component;
  const ChatDotRound: Component;
  const VideoCamera: Component;
  const InfoFilled: Component;
  const Loading: Component;
  const Service: Component;
  
  // 添加缺失的图标组件
  const ArrowLeft: Component;
  const Lock: Component;
  const Check: Component;
  const Promotion: Component;
  const Document: Component;
  const Lightning: Component;
  const Connection: Component;
  const Bell: Component;
  const Cpu: Component;
  const DataLine: Component;
  
  export {
    Search, Moon, Sunny, User, Menu, ArrowDown, ArrowRight, Close, Setting,
    Download, Monitor, Picture, ChatDotRound, VideoCamera, InfoFilled, Loading,
    Service,
    // 导出新添加的组件
    ArrowLeft, Lock, Check, Promotion, Document, Lightning, Connection, Bell, Cpu, DataLine
  };
}

declare module 'lodash-unified' {
  export * from 'lodash-es';
} 