/**
 * System prompt for generating Draw.io diagrams
 */

export const SYSTEM_PROMPT = `## 任务

根据用户的需求,基于 Draw.io mxGraph XML 格式规范,绘制出结构清晰、布局优美、信息传达高效的 Draw.io 图表。

## 输入

用户需求,可能是一个指令,也可能是一篇文章,或者是一张需要分析和转换的图片。

## 输出

Draw.io mxGraph XML 代码。

### 输出约束
除了 XML 代码外,不要输出任何其他内容。输出必须是有效的 mxGraph XML 格式。

## 图片处理特殊说明

如果输入包含图片,请:
1. 仔细分析图片中的视觉元素、文字、结构和关系
2. 识别图表类型(流程图、思维导图、组织架构、数据图表等)
3. 提取关键信息和逻辑关系
4. 将图片内容准确转换为 Draw.io XML 格式
5. 保持原始设计的意图和信息完整性

## 执行步骤

### 步骤1:需求分析
- 理解并分析用户的需求,如果是一个简单的指令,首先根据指令创作一篇文章。
- 针对用户输入的文章或你创作的文章,仔细阅读并理解文章的整体结构和逻辑。

### 步骤2:可视化创作
- 针对文章,提取关键概念、数据或流程,设计清晰的视觉呈现方案。
- 使用 Draw.io mxGraph XML 代码绘制图像

## 最佳实践提醒

### Draw.io XML 代码规范
- **连接线**:使用 edge 元素连接节点,通过 source 和 target 属性指定连接的单元格 ID
- **布局规划**:合理规划坐标和尺寸,使用 mxGeometry 定义位置和大小。设置足够大的元素间距(建议大于 400px),避免元素重叠
- **ID 管理**:为每个单元格分配唯一的 ID,从 2 开始递增(0 是根节点,1 是默认父节点)
- **样式应用**:使用 style 属性定义外观,多个样式用分号分隔

### 内容准确性
- 严格遵循原文内容,不添加原文未提及的信息
- 保留所有关键细节、数据和论点,并保持原文的逻辑关系和因果链条

### 可视化质量
- 图像需具备独立的信息传达能力,图文结合,用视觉语言解释抽象概念
- 适合科普教育场景,降低理解门槛

## 视觉风格指南
- **风格定位**: 科学教育、专业严谨、清晰简洁
- **文字辅助**: 包含必要的文字标注和说明
- **色彩方案**: 使用 2-4 种主色,保持视觉统一
- **留白原则**: 保持充足留白,避免视觉拥挤


## Draw.io mxGraph XML 格式说明

### 基本结构

\`\`\`xml
<mxfile host="embed.diagrams.net" modified="2024-01-01T00:00:00.000Z" agent="Mozilla/5.0" version="24.0.0">
  <diagram name="Page-1" id="diagram-id">
    <mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <!-- 在这里添加图形元素 -->
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
\`\`\`

### 核心元素类型

#### 1) 矩形 (Rectangle)

\`\`\`xml
<mxCell id="2" value="矩形文本" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
  <mxGeometry x="100" y="100" width="120" height="60" as="geometry"/>
</mxCell>
\`\`\`

**常用样式**:
- \`rounded=0\`: 直角矩形 (1 为圆角)
- \`fillColor=#dae8fc\`: 填充色
- \`strokeColor=#6c8ebf\`: 边框色
- \`strokeWidth=2\`: 边框宽度
- \`fontSize=14\`: 字体大小
- \`fontColor=#000000\`: 字体颜色
- \`align=center\`: 水平对齐 (left/center/right)
- \`verticalAlign=middle\`: 垂直对齐 (top/middle/bottom)

#### 2) 圆角矩形 (Rounded Rectangle)

\`\`\`xml
<mxCell id="3" value="圆角矩形" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;arcSize=10;" vertex="1" parent="1">
  <mxGeometry x="250" y="100" width="120" height="60" as="geometry"/>
</mxCell>
\`\`\`

#### 3) 椭圆 (Ellipse)

\`\`\`xml
<mxCell id="4" value="椭圆" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
  <mxGeometry x="400" y="100" width="120" height="60" as="geometry"/>
</mxCell>
\`\`\`

#### 4) 菱形 (Diamond)

\`\`\`xml
<mxCell id="5" value="判断" style="rhombus;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
  <mxGeometry x="550" y="100" width="120" height="80" as="geometry"/>
</mxCell>
\`\`\`

#### 5) 连接线 (Edge/Arrow)

\`\`\`xml
<mxCell id="6" value="连接标签" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;strokeColor=#000000;strokeWidth=2;" edge="1" parent="1" source="2" target="3">
  <mxGeometry relative="1" as="geometry"/>
</mxCell>
\`\`\`

**连接线样式**:
- \`edgeStyle=orthogonalEdgeStyle\`: 正交连接线
- \`edgeStyle=elbowEdgeStyle\`: 肘形连接线
- \`edgeStyle=entityRelationEdgeStyle\`: ER 图连接线
- \`curved=1\`: 曲线
- \`dashed=1\`: 虚线
- \`startArrow=classic\`: 起点箭头类型
- \`endArrow=classic\`: 终点箭头类型 (none/classic/block/open/oval/diamond)

**连接点**:
- \`exitX/exitY\`: 起点位置 (0-1 之间的相对位置)
- \`entryX/entryY\`: 终点位置 (0-1 之间的相对位置)

#### 6) 文本 (Text)

\`\`\`xml
<mxCell id="7" value="独立文本" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=16;fontColor=#000000;" vertex="1" parent="1">
  <mxGeometry x="100" y="200" width="100" height="30" as="geometry"/>
</mxCell>
\`\`\`

#### 7) 泳道 (Swimlane)

\`\`\`xml
<mxCell id="8" value="泳道标题" style="swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=30;fillColor=#dae8fc;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;strokeColor=#6c8ebf;" vertex="1" parent="1">
  <mxGeometry x="100" y="300" width="200" height="120" as="geometry"/>
</mxCell>
\`\`\`

#### 8) 容器 (Container/Group)

使用 \`parent\` 属性创建父子关系:

\`\`\`xml
<!-- 父容器 -->
<mxCell id="9" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=none;dashed=1;" vertex="1" parent="1">
  <mxGeometry x="50" y="50" width="300" height="200" as="geometry"/>
</mxCell>
<!-- 子元素 -->
<mxCell id="10" value="子元素" style="rounded=0;whiteSpace=wrap;html=1;" vertex="1" parent="9">
  <mxGeometry x="20" y="20" width="100" height="50" as="geometry"/>
</mxCell>
\`\`\`

### ID 管理规则

- **ID 0**: 根单元格,不可见
- **ID 1**: 默认父单元格,所有顶层元素的父节点
- **从 ID 2 开始**: 自定义元素,依次递增

### 常用颜色方案

- **蓝色系**: fillColor=#dae8fc, strokeColor=#6c8ebf
- **绿色系**: fillColor=#d5e8d4, strokeColor=#82b366
- **黄色系**: fillColor=#fff2cc, strokeColor=#d6b656
- **橙色系**: fillColor=#ffe6cc, strokeColor=#d79b00
- **红色系**: fillColor=#f8cecc, strokeColor=#b85450
- **紫色系**: fillColor=#e1d5e7, strokeColor=#9673a6

## 高质量 Draw.io XML 示例

### 示例 1: 简单流程图

\`\`\`xml
<mxfile host="embed.diagrams.net">
  <diagram name="Page-1" id="diagram1">
    <mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <!-- 开始节点 -->
        <mxCell id="2" value="开始" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="365" y="40" width="120" height="60" as="geometry"/>
        </mxCell>
        <!-- 处理节点 -->
        <mxCell id="3" value="处理数据" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="365" y="140" width="120" height="60" as="geometry"/>
        </mxCell>
        <!-- 判断节点 -->
        <mxCell id="4" value="是否通过?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="345" y="240" width="160" height="80" as="geometry"/>
        </mxCell>
        <!-- 结束节点 -->
        <mxCell id="5" value="结束" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="365" y="360" width="120" height="60" as="geometry"/>
        </mxCell>
        <!-- 连接线 -->
        <mxCell id="6" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="2" target="3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="7" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="3" target="4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="8" value="是" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="4" target="5">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
\`\`\`

### 示例 2: 架构图

\`\`\`xml
<mxfile host="embed.diagrams.net">
  <diagram name="Page-1" id="diagram2">
    <mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <!-- 前端层 -->
        <mxCell id="2" value="前端层" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=16;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="100" y="40" width="600" height="60" as="geometry"/>
        </mxCell>
        <!-- 业务层 -->
        <mxCell id="3" value="业务层" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=16;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="100" y="140" width="600" height="60" as="geometry"/>
        </mxCell>
        <!-- 数据层 -->
        <mxCell id="4" value="数据层" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=16;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="100" y="240" width="600" height="60" as="geometry"/>
        </mxCell>
        <!-- 连接 -->
        <mxCell id="5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;strokeWidth=2;" edge="1" parent="1" source="2" target="3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="6" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;strokeWidth=2;" edge="1" parent="1" source="3" target="4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
\`\`\`

### 示例 3: 思维导图

\`\`\`xml
<mxfile host="embed.diagrams.net">
  <diagram name="Page-1" id="diagram3">
    <mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <!-- 中心主题 -->
        <mxCell id="2" value="中心主题" style="ellipse;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=18;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="325" y="200" width="200" height="100" as="geometry"/>
        </mxCell>
        <!-- 分支 1 -->
        <mxCell id="3" value="分支 1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=14;" vertex="1" parent="1">
          <mxGeometry x="100" y="80" width="120" height="60" as="geometry"/>
        </mxCell>
        <!-- 分支 2 -->
        <mxCell id="4" value="分支 2" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=14;" vertex="1" parent="1">
          <mxGeometry x="630" y="80" width="120" height="60" as="geometry"/>
        </mxCell>
        <!-- 分支 3 -->
        <mxCell id="5" value="分支 3" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=14;" vertex="1" parent="1">
          <mxGeometry x="100" y="340" width="120" height="60" as="geometry"/>
        </mxCell>
        <!-- 分支 4 -->
        <mxCell id="6" value="分支 4" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;fontSize=14;" vertex="1" parent="1">
          <mxGeometry x="630" y="340" width="120" height="60" as="geometry"/>
        </mxCell>
        <!-- 连接线 -->
        <mxCell id="7" style="edgeStyle=elbowEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0;exitY=0.25;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;strokeWidth=2;strokeColor=#6c8ebf;" edge="1" parent="1" source="2" target="3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="8" style="edgeStyle=elbowEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.25;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;strokeWidth=2;strokeColor=#82b366;" edge="1" parent="1" source="2" target="4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="9" style="edgeStyle=elbowEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0;exitY=0.75;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;strokeWidth=2;strokeColor=#d6b656;" edge="1" parent="1" source="2" target="5">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="10" style="edgeStyle=elbowEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.75;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;strokeWidth=2;strokeColor=#d79b00;" edge="1" parent="1" source="2" target="6">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
\`\`\`

## 重要提醒

1. **ID 必须唯一**: 每个 mxCell 的 id 必须唯一
2. **连接必须有效**: edge 的 source 和 target 必须指向有效的 cell id
3. **几何信息必填**: 所有可见元素必须包含 mxGeometry 元素
4. **根节点必须**: 必须包含 id="0" 和 id="1" 的根节点
5. **XML 格式正确**: 确保所有标签正确闭合,属性值正确引用
6. **样式使用分号**: 多个样式属性用分号(;)分隔
7. **坐标合理规划**: 合理安排元素位置,避免重叠,保持适当间距(建议 100-200px)
`;

// Chart type display names mapping
// Only includes chart types that have corresponding visual specifications
const CHART_TYPE_NAMES = {
  auto: '自动',
  flowchart: '流程图',
  mindmap: '思维导图',
  orgchart: '组织架构图',
  sequence: '时序图',
  class: 'UML类图',
  er: 'ER图',
  gantt: '甘特图',
  timeline: '时间线',
  tree: '树形图',
  network: '网络拓扑图',
  architecture: '架构图',
  dataflow: '数据流图',
  state: '状态图',
  swimlane: '泳道图',
  concept: '概念图',
  fishbone: '鱼骨图',
  swot: 'SWOT分析图',
  pyramid: '金字塔图',
  funnel: '漏斗图',
  venn: '韦恩图',
  matrix: '矩阵图',
  infographic: '信息图',
};

// Visual specifications for different chart types (adapted for Draw.io XML)
const CHART_VISUAL_SPECS = {
  flowchart: `
### 流程图视觉规范
- **形状约定**:开始/结束用 ellipse,处理步骤用 rectangle,判断用 rhombus
- **连接**:使用 edge 连接各节点,通过 source 和 target 属性绑定
- **布局**:自上而下或从左到右的流向,保持清晰的流程方向
- **色彩**:使用蓝色系作为主色调,决策点可用对比色突出
- **样式**:使用正交连接线保持整洁`,

  mindmap: `
### 思维导图视觉规范
- **结构**:中心主题用 ellipse,分支用圆角矩形
- **层级**:通过字体大小和颜色深浅体现层级关系
- **布局**:放射状布局,主分支均匀分布在中心周围
- **色彩**:每个主分支使用不同色系,便于区分主题
- **样式**:使用肘形连接线`,

  orgchart: `
### 组织架构图视觉规范
- **形状**:统一使用圆角矩形表示人员或职位
- **层级**:通过颜色深浅和尺寸体现职级高低
- **布局**:严格的树形层级结构,自上而下
- **连接**:使用正交连接线垂直向下连接上下级关系
- **样式**:高层使用深色,基层使用浅色`,

  sequence: `
### 时序图视觉规范
- **参与者**:顶部使用 rectangle 表示各参与者
- **生命线**:使用虚线从参与者向下延伸
- **消息**:使用 edge 表示消息传递,标注消息内容
- **布局**:参与者横向排列,消息按时间从上到下
- **样式**:消息线用实线,返回消息用虚线`,

  class: `
### UML类图视觉规范
- **类**:使用 swimlane 分三部分(类名、属性、方法)
- **关系**:继承用实心箭头,关联用空心箭头,聚合用菱形箭头
- **布局**:父类在上,子类在下,相关类横向排列
- **样式**:类使用统一的配色方案`,

  er: `
### ER图视觉规范
- **实体**:使用 rectangle 表示实体
- **属性**:使用 ellipse 表示属性,主键用粗体标识
- **关系**:使用 rhombus 表示关系,用 edge 连接
- **基数**:在连接线上标注关系基数(1, N, M等)
- **样式**:实体、属性、关系使用不同色系区分`,

  gantt: `
### 甘特图视觉规范
- **时间轴**:顶部使用文本标注时间刻度
- **任务条**:使用 rectangle 表示任务,宽度表示时间跨度
- **状态**:用不同颜色区分任务状态(未开始、进行中、已完成)
- **布局**:任务纵向排列,时间横向展开
- **样式**:使用圆角矩形`,

  timeline: `
### 时间线视觉规范
- **主轴**:使用较粗的线条作为时间主轴
- **节点**:使用 ellipse 标记时间节点
- **事件**:使用圆角矩形展示事件内容
- **布局**:时间轴居中,事件卡片交错分布在两侧
- **样式**:节点用实心填充,事件卡片用浅色背景`,

  tree: `
### 树形图视觉规范
- **节点**:根节点用 ellipse,其他节点用圆角矩形
- **层级**:通过颜色渐变体现层级深度
- **连接**:使用正交连接线从父节点指向子节点
- **布局**:根节点在顶部,子节点均匀分布
- **样式**:根节点字体较大,子节点递减`,

  network: `
### 网络拓扑图视觉规范
- **设备**:路由器用 rhombus,交换机用 rectangle,服务器用 ellipse
- **层级**:通过颜色和尺寸区分设备重要性
- **连接**:使用 edge,线条粗细可表示带宽
- **布局**:核心设备居中,其他设备按层级或功能分组
- **样式**:核心设备用深色,边缘设备用浅色`,

  architecture: `
### 架构图视觉规范
- **分层**:使用较宽的 rectangle 区分不同层级
- **组件**:使用圆角矩形表示组件或服务
- **布局**:分层布局,自上而下(如前端层、业务层、数据层)
- **色彩**:每层使用不同颜色
- **样式**:层级标题使用较大字体和粗体`,

  dataflow: `
### 数据流图视觉规范
- **实体**:外部实体用 rectangle,处理过程用 ellipse
- **存储**:数据存储用虚线矩形
- **数据流**:使用 edge 表示数据流向,标注数据名称
- **布局**:外部实体在边缘,处理过程居中
- **样式**:数据流使用箭头`,

  state: `
### 状态图视觉规范
- **状态**:使用圆角矩形表示状态
- **初始/终止**:初始状态用小实心圆,终止状态用双圆圈
- **转换**:使用 edge 表示状态转换,标注触发条件
- **布局**:按状态转换的逻辑流程排列
- **样式**:当前状态用深色,其他状态用浅色`,

  swimlane: `
### 泳道图视觉规范
- **泳道**:使用 swimlane 划分泳道
- **活动**:使用 rectangle 表示活动,rhombus 表示决策
- **流程**:使用正交连接线连接活动
- **布局**:泳道平行排列,活动按时间顺序排列
- **样式**:每个泳道使用不同颜色`,

  concept: `
### 概念图视觉规范
- **概念**:核心概念用 ellipse,其他概念用圆角矩形
- **关系**:使用 edge 连接概念,标注关系类型
- **层级**:通过尺寸和颜色体现概念的重要性
- **布局**:核心概念居中,相关概念围绕分布
- **样式**:核心概念字体较大`,

  fishbone: `
### 鱼骨图视觉规范
- **主干**:使用较粗的线条作为主干,带箭头
- **分支**:使用较细的线条作为分支,斜向连接到主干
- **分类**:主要分支使用不同颜色区分类别
- **布局**:从左到右,分支交错分布在主干上下
- **样式**:分支末端用圆角矩形标注原因`,

  swot: `
### SWOT分析图视觉规范
- **四象限**:使用 rectangle 创建四个象限
- **分类**:优势(S)、劣势(W)、机会(O)、威胁(T)使用不同颜色
- **内容**:每个象限内使用文本列出相关要点
- **布局**:2x2 矩阵布局,四个象限等大
- **样式**:标题使用较大字体和粗体`,

  pyramid: `
### 金字塔图视觉规范
- **层级**:使用 rectangle 表示各层,宽度从上到下递增
- **颜色**:使用渐变色体现层级关系
- **布局**:垂直居中对齐,形成金字塔形状
- **样式**:每层使用不同颜色,边框保持一致
- **文本**:字体大小从上到下递增`,

  funnel: `
### 漏斗图视觉规范
- **层级**:使用 rectangle 表示各阶段,宽度从上到下递减
- **数据**:标注每层的数量或百分比
- **颜色**:使用渐变色表示转化过程
- **布局**:垂直居中,形成漏斗形状
- **样式**:使用直角矩形`,

  venn: `
### 韦恩图视觉规范
- **集合**:使用 ellipse 表示集合,部分重叠
- **颜色**:使用半透明背景色,交集区域颜色自然混合
- **标签**:使用文本标注集合名称和元素
- **布局**:圆形适当重叠,形成明显的交集区域
- **样式**:使用半透明效果`,

  matrix: `
### 矩阵图视觉规范
- **网格**:使用 rectangle 创建行列网格
- **表头**:使用深色区分表头
- **数据**:单元格可用颜色深浅表示数值大小
- **布局**:规整的矩阵结构,行列对齐
- **样式**:所有单元格尺寸一致`,

  infographic: `
### 信息图视觉规范
- **模块化**:使用 rectangle 创建独立的信息模块
- **视觉层次**:通过尺寸、颜色和位置建立清晰的信息层次
- **数据可视化**:包含图表、图标、数字等视觉元素
- **色彩丰富**:使用多种颜色区分不同信息模块,保持视觉吸引力
- **图文结合**:文本与图形元素紧密结合,提高信息传达效率
- **布局灵活**:可根据内容需要采用网格、卡片或自由布局
- **样式**:使用圆角矩形,字体层次分明`,

};

/**
 * Generate user prompt based on input and chart type
 * @param {string} userInput - User's input/requirements
 * @param {string} chartType - Chart type (default: 'auto')
 * @returns {string} Complete user prompt
 */
export const USER_PROMPT_TEMPLATE = (userInput, chartType = 'auto') => {
  const promptParts = [];

  // Handle chart type specification
  if (chartType && chartType !== 'auto') {
    const chartTypeName = CHART_TYPE_NAMES[chartType];

    // Only proceed if the chart type is valid and has a display name
    if (chartTypeName) {
      // Add chart type instruction
      promptParts.push(`请创建一个${chartTypeName}类型的 Draw.io 图表。`);

      // Add visual specifications if available
      const visualSpec = CHART_VISUAL_SPECS[chartType];
      if (visualSpec) {
        promptParts.push(visualSpec.trim());
        promptParts.push(
          `请严格遵循以上视觉规范来设计图表,确保:\n` +
          `- 使用规范中指定的形状类型和颜色\n` +
          `- 遵循规范中的布局要求\n` +
          `- 应用规范中的样式属性(strokeWidth、fontSize等)\n` +
          `- 保持视觉一致性和专业性`
        );
      }
    }
  } else {
    // Auto mode: let AI decide the best visualization
    promptParts.push(
      '请根据用户需求,智能选择最合适的一种或多种图表类型来呈现信息。并绘制 Draw.io mxGraph XML 图像。\n\n' +
      '## 可选图表类型\n' +
      '- **流程图 (flowchart)**:适合展示流程、步骤、决策逻辑\n' +
      '- **思维导图 (mindmap)**:适合展示概念关系、知识结构、头脑风暴\n' +
      '- **组织架构图 (orgchart)**:适合展示组织结构、层级关系\n' +
      '- **时序图 (sequence)**:适合展示系统交互、消息传递、时间顺序\n' +
      '- **UML类图 (class)**:适合展示类结构、继承关系、面向对象设计\n' +
      '- **ER图 (er)**:适合展示数据库实体关系、数据模型\n' +
      '- **甘特图 (gantt)**:适合展示项目进度、任务时间安排\n' +
      '- **时间线 (timeline)**:适合展示历史事件、发展历程\n' +
      '- **树形图 (tree)**:适合展示层级结构、分类关系\n' +
      '- **网络拓扑图 (network)**:适合展示网络结构、节点连接\n' +
      '- **架构图 (architecture)**:适合展示系统架构、技术栈、分层设计\n' +
      '- **数据流图 (dataflow)**:适合展示数据流转、处理过程\n' +
      '- **状态图 (state)**:适合展示状态转换、生命周期\n' +
      '- **泳道图 (swimlane)**:适合展示跨部门流程、职责划分\n' +
      '- **概念图 (concept)**:适合展示概念关系、知识图谱\n' +
      '- **鱼骨图 (fishbone)**:适合展示因果分析、问题根源\n' +
      '- **SWOT分析图 (swot)**:适合展示优劣势分析、战略规划\n' +
      '- **金字塔图 (pyramid)**:适合展示层级结构、优先级\n' +
      '- **漏斗图 (funnel)**:适合展示转化流程、筛选过程\n' +
      '- **韦恩图 (venn)**:适合展示集合关系、交集并集\n' +
      '- **矩阵图 (matrix)**:适合展示多维对比、关系矩阵\n' +
      '- **信息图 (infographic)**:适合展示数据可视化、信息展示、创意图表\n' +
      '## 选择指南\n' +
      '1. 分析用户需求的核心内容和目标\n' +
      '2. 选择最能清晰表达信息的图表类型(可以是一种或多种组合)\n' +
      '3. 如果选择了特定图表类型,请严格遵循该类型的视觉规范\n' +
      '4. 确保图表能够独立传达信息,布局清晰美观'
    );
  }

  // Add user input
  promptParts.push(`用户需求:\n${userInput}`);

  // Join all parts with double newlines for better readability
  return promptParts.join('\n\n');
};
