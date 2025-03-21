# PDF 需求分析器

这是一个基于 NestJS 后端和 React 前端的 PDF 需求分析工具，可以将 PDF 文件中的需求自动拆分为测试用例。

## 项目结构

- `pdf-analyzer-backend/`: NestJS 后端服务
- `pdf-analyzer/`: React 前端应用

## 安装步骤

### 后端安装

1. 进入后端目录：
```bash
cd pdf-analyzer-backend
```

2. 安装依赖：
```bash
npm install
```

3. 配置环境变量：
创建 `.env` 文件并添加以下配置：
```env
DEEPSEEK_API_KEY=your_api_key_here
```

### 前端安装

1. 进入前端目录：
```bash
cd pdf-analyzer
```

2. 安装依赖：
```bash
npm install
```

## 启动步骤

### 启动后端服务

1. 进入后端目录：
```bash
cd pdf-analyzer-backend
```

2. 启动开发服务器：
```bash
npm run start:dev
```

后端服务将在 http://localhost:3000 运行

### 启动前端应用

1. 进入前端目录：
```bash
cd pdf-analyzer
```

2. 启动开发服务器：
```bash
npm run dev
```

前端应用将在 http://localhost:5173 运行

## 使用方法

1. 打开浏览器访问 http://localhost:5173

2. 在界面上传 PDF 文件：
   - 点击"选择文件"按钮
   - 选择包含需求的 PDF 文件
   - 文件大小限制为 10MB

3. 等待分析完成：
   - 系统会自动上传并分析 PDF 文件
   - 分析过程可能需要几秒钟时间
   - 分析完成后会显示生成的测试用例

4. 查看结果：
   - 分析完成后，测试用例会以列表形式显示
   - 每个测试用例包含测试描述和预期结果
   - 可以复制或下载生成的测试用例

## 代码修改教程

### 后端代码修改

1. 修改 API 接口：
   - 打开 `pdf-analyzer-backend/src/pdf-analyzer/pdf-analyzer.controller.ts`
   - 可以修改路由路径、请求方法等
   - 可以添加新的接口端点

2. 修改服务逻辑：
   - 打开 `pdf-analyzer-backend/src/pdf-analyzer/pdf-analyzer.service.ts`
   - 可以修改 PDF 分析逻辑
   - 可以调整 DeepSeek API 的调用方式

3. 修改配置：
   - 打开 `pdf-analyzer-backend/src/config/configuration.ts`
   - 可以修改 API 密钥配置
   - 可以调整文件上传限制

### 前端代码修改

1. 修改 API 调用：
   - 打开 `pdf-analyzer/src/services/PdfAnalyzerService.ts`
   - 可以修改 API 端点
   - 可以调整请求参数

2. 修改组件：
   - 打开 `pdf-analyzer/src/components/PdfUploader.tsx`
   - 可以修改上传组件的样式
   - 可以添加新的交互功能

3. 修改样式：
   - 打开 `pdf-analyzer/src/styles/globals.css`
   - 可以修改全局样式
   - 可以添加新的动画效果

## 注意事项

- 确保后端服务在前端应用之前启动
- PDF 文件大小限制为 10MB
- 仅支持 PDF 格式文件
- 需要有效的 DeepSeek API 密钥
- 修改代码后需要重启相应的服务

## 技术栈

### 后端
- NestJS
- TypeScript
- DeepSeek API
- Multer (文件上传)

### 前端
- React
- TypeScript
- Axios
- TailwindCSS
- Vite

