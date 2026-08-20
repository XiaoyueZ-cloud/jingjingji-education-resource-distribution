/**
 * jjj-resource-detail-mock.js
 * 京津冀三地资源分布概览 — Mock 数据
 *
 * TODO:
 * 此处后续替换为真实数据接口
 * 数据来源：Excel → Python → JSON → Web
 */

const mockJjjResourceData = {
  years: [2023, 2024, 2025],
  currentYear: 2025,

  summary: {
    2025: { total: 18762, beijing: 4830, tianjin: 2960, hebei: 7512, crossRegion: 3460 },
    2024: { total: 17540, beijing: 4620, tianjin: 2810, hebei: 7120, crossRegion: 2990 },
    2023: { total: 16200, beijing: 4350, tianjin: 2650, hebei: 6700, crossRegion: 2500 }
  },

  // 五大资源类型 — 仅在语义匹配时使用，不要与五类协同混淆
  resourceCategories: [
    { key: "higherEd", name: "高校资源", color: "#1368e8" },
    { key: "basicEd", name: "基础教育", color: "#16b8e8" },
    { key: "vocational", name: "职业教育", color: "#68a84f" },
    { key: "research", name: "科研资源", color: "#ed8615" },
    { key: "other", name: "其他资源", color: "#7468df" }
  ],

  regionBreakdown: {
    2025: {
      beijing: { higherEd: 1120, basicEd: 1380, vocational: 620, research: 1080, other: 630 },
      tianjin: { higherEd: 680, basicEd: 920, vocational: 480, research: 540, other: 340 },
      hebei:   { higherEd: 980, basicEd: 2650, vocational: 1420, research: 820, other: 1642 }
    },
    2024: {
      beijing: { higherEd: 1080, basicEd: 1320, vocational: 590, research: 1020, other: 610 },
      tianjin: { higherEd: 650, basicEd: 880, vocational: 460, research: 500, other: 320 },
      hebei:   { higherEd: 940, basicEd: 2520, vocational: 1360, research: 780, other: 1520 }
    },
    2023: {
      beijing: { higherEd: 1020, basicEd: 1250, vocational: 560, research: 960, other: 560 },
      tianjin: { higherEd: 620, basicEd: 840, vocational: 430, research: 460, other: 300 },
      hebei:   { higherEd: 900, basicEd: 2400, vocational: 1300, research: 720, other: 1380 }
    }
  },

  // 地级市 / 区域数据
  regions: {
    2025: [
      // 北京各区
      { name: "海淀区", province: "北京", coord: [116.310, 39.956], total: 680, higherEd: 280, basicEd: 120, vocational: 60, research: 180, other: 40 },
      { name: "朝阳区", province: "北京", coord: [116.443, 39.924], total: 520, higherEd: 140, basicEd: 160, vocational: 50, research: 120, other: 50 },
      { name: "西城区", province: "北京", coord: [116.366, 39.912], total: 380, higherEd: 80, basicEd: 140, vocational: 40, research: 90, other: 30 },
      { name: "东城区", province: "北京", coord: [116.418, 39.912], total: 350, higherEd: 60, basicEd: 130, vocational: 40, research: 80, other: 40 },
      { name: "丰台区", province: "北京", coord: [116.287, 39.863], total: 280, higherEd: 60, basicEd: 100, vocational: 40, research: 50, other: 30 },
      { name: "大兴区", province: "北京", coord: [116.338, 39.726], total: 240, higherEd: 50, basicEd: 90, vocational: 40, research: 30, other: 30 },
      { name: "通州区", province: "北京", coord: [116.658, 39.902], total: 260, higherEd: 50, basicEd: 100, vocational: 40, research: 40, other: 30 },
      { name: "昌平区", province: "北京", coord: [116.231, 40.221], total: 220, higherEd: 60, basicEd: 70, vocational: 30, research: 40, other: 20 },
      { name: "顺义区", province: "北京", coord: [116.655, 40.130], total: 180, higherEd: 30, basicEd: 70, vocational: 30, research: 30, other: 20 },
      { name: "房山区", province: "北京", coord: [116.143, 39.748], total: 160, higherEd: 30, basicEd: 60, vocational: 30, research: 20, other: 20 },
      { name: "石景山区", province: "北京", coord: [116.224, 39.906], total: 150, higherEd: 20, basicEd: 60, vocational: 20, research: 30, other: 20 },
      { name: "密云区", province: "北京", coord: [116.843, 40.377], total: 100, higherEd: 10, basicEd: 50, vocational: 20, research: 10, other: 10 },
      { name: "延庆区", province: "北京", coord: [115.973, 40.453], total: 80, higherEd: 10, basicEd: 40, vocational: 10, research: 10, other: 10 },
      { name: "怀柔区", province: "北京", coord: [116.632, 40.316], total: 110, higherEd: 10, basicEd: 50, vocational: 20, research: 20, other: 10 },
      { name: "平谷区", province: "北京", coord: [117.122, 40.144], total: 90, higherEd: 10, basicEd: 40, vocational: 20, research: 10, other: 10 },
      { name: "门头沟区", province: "北京", coord: [116.106, 39.937], total: 70, higherEd: 10, basicEd: 30, vocational: 10, research: 10, other: 10 },

      // 天津各区
      { name: "南开区", province: "天津", coord: [117.151, 39.138], total: 380, higherEd: 120, basicEd: 100, vocational: 50, research: 80, other: 30 },
      { name: "河西区", province: "天津", coord: [117.223, 39.102], total: 280, higherEd: 60, basicEd: 100, vocational: 40, research: 50, other: 30 },
      { name: "和平区", province: "天津", coord: [117.217, 39.118], total: 260, higherEd: 50, basicEd: 100, vocational: 30, research: 50, other: 30 },
      { name: "西青区", province: "天津", coord: [117.013, 39.142], total: 220, higherEd: 50, basicEd: 80, vocational: 40, research: 30, other: 20 },
      { name: "津南区", province: "天津", coord: [117.393, 38.988], total: 180, higherEd: 40, basicEd: 60, vocational: 30, research: 30, other: 20 },
      { name: "河北区", province: "天津", coord: [117.197, 39.148], total: 200, higherEd: 30, basicEd: 80, vocational: 30, research: 40, other: 20 },
      { name: "红桥区", province: "天津", coord: [117.152, 39.168], total: 160, higherEd: 30, basicEd: 60, vocational: 30, research: 20, other: 20 },
      { name: "滨海新区", province: "天津", coord: [117.697, 39.005], total: 340, higherEd: 60, basicEd: 120, vocational: 60, research: 60, other: 40 },
      { name: "东丽区", province: "天津", coord: [117.314, 39.087], total: 160, higherEd: 30, basicEd: 60, vocational: 30, research: 20, other: 20 },
      { name: "北辰区", province: "天津", coord: [117.135, 39.225], total: 150, higherEd: 20, basicEd: 60, vocational: 30, research: 20, other: 20 },
      { name: "宝坻区", province: "天津", coord: [117.310, 39.718], total: 120, higherEd: 10, basicEd: 60, vocational: 20, research: 10, other: 20 },
      { name: "武清区", province: "天津", coord: [117.058, 39.380], total: 150, higherEd: 20, basicEd: 60, vocational: 30, research: 20, other: 20 },
      { name: "蓟州区", province: "天津", coord: [117.408, 40.046], total: 100, higherEd: 10, basicEd: 50, vocational: 20, research: 10, other: 10 },
      { name: "宁河区", province: "天津", coord: [117.826, 39.331], total: 80, higherEd: 10, basicEd: 40, vocational: 10, research: 10, other: 10 },
      { name: "静海区", province: "天津", coord: [116.975, 38.947], total: 80, higherEd: 10, basicEd: 40, vocational: 10, research: 10, other: 10 },

      // 河北各地级市
      { name: "石家庄市", province: "河北", coord: [114.514, 38.042], total: 1020, higherEd: 180, basicEd: 350, vocational: 200, research: 140, other: 150 },
      { name: "唐山市", province: "河北", coord: [118.180, 39.630], total: 780, higherEd: 100, basicEd: 280, vocational: 160, research: 100, other: 140 },
      { name: "保定市", province: "河北", coord: [115.465, 38.874], total: 720, higherEd: 100, basicEd: 260, vocational: 140, research: 80, other: 140 },
      { name: "廊坊市", province: "河北", coord: [116.683, 39.516], total: 680, higherEd: 80, basicEd: 240, vocational: 140, research: 80, other: 140 },
      { name: "邯郸市", province: "河北", coord: [114.490, 36.612], total: 620, higherEd: 80, basicEd: 220, vocational: 120, research: 70, other: 130 },
      { name: "沧州市", province: "河北", coord: [116.857, 38.310], total: 580, higherEd: 60, basicEd: 200, vocational: 120, research: 70, other: 130 },
      { name: "邢台市", province: "河北", coord: [114.505, 37.068], total: 480, higherEd: 50, basicEd: 180, vocational: 100, research: 50, other: 100 },
      { name: "衡水市", province: "河北", coord: [115.671, 37.739], total: 420, higherEd: 40, basicEd: 160, vocational: 80, research: 50, other: 90 },
      { name: "张家口市", province: "河北", coord: [114.887, 40.768], total: 380, higherEd: 40, basicEd: 140, vocational: 80, research: 50, other: 70 },
      { name: "承德市", province: "河北", coord: [117.963, 40.951], total: 360, higherEd: 30, basicEd: 130, vocational: 70, research: 50, other: 80 },
      { name: "秦皇岛市", province: "河北", coord: [119.598, 39.935], total: 340, higherEd: 50, basicEd: 120, vocational: 60, research: 50, other: 60 }
    ],
    // TODO: 2024 and 2023 data would follow same structure; simplified for demo
    2024: null,
    2023: null
  },

  // 资源点位 — 地图上展示的聚合 / 散点
  points: {
    2025: [
      // 北京核心 — 高校密集区
      { name: "北京大学", type: "higherEd", province: "北京", district: "海淀区", coord: [116.307, 39.992], level: "A" },
      { name: "清华大学", type: "higherEd", province: "北京", district: "海淀区", coord: [116.326, 40.003], level: "A" },
      { name: "中国人民大学", type: "higherEd", province: "北京", district: "海淀区", coord: [116.319, 39.972], level: "A" },
      { name: "北京航空航天大学", type: "higherEd", province: "北京", district: "海淀区", coord: [116.348, 39.978], level: "A" },
      { name: "北京理工大学", type: "higherEd", province: "北京", district: "海淀区", coord: [116.314, 39.958], level: "A" },
      { name: "中国科学院", type: "research", province: "北京", district: "海淀区", coord: [116.334, 39.985], level: "A" },
      { name: "北京师范大学", type: "higherEd", province: "北京", district: "海淀区", coord: [116.358, 39.961], level: "A" },
      { name: "中国农业大学", type: "higherEd", province: "北京", district: "海淀区", coord: [116.356, 40.003], level: "A" },
      { name: "中央财经大学", type: "higherEd", province: "北京", district: "海淀区", coord: [116.344, 39.954], level: "B" },
      { name: "对外经济贸易大学", type: "higherEd", province: "北京", district: "朝阳区", coord: [116.427, 39.980], level: "B" },
      { name: "北京工业大学", type: "higherEd", province: "北京", district: "朝阳区", coord: [116.470, 39.875], level: "B" },
      { name: "中科院物理所", type: "research", province: "北京", district: "海淀区", coord: [116.338, 39.991], level: "A" },
      { name: "中科院化学所", type: "research", province: "北京", district: "海淀区", coord: [116.331, 39.989], level: "A" },
      { name: "北京教育科学研究院", type: "research", province: "北京", district: "西城区", coord: [116.360, 39.910], level: "B" },
      { name: "北京市第四中学", type: "basicEd", province: "北京", district: "西城区", coord: [116.382, 39.928], level: "A" },
      { name: "北京市中关村中学", type: "basicEd", province: "北京", district: "海淀区", coord: [116.325, 39.968], level: "B" },
      { name: "北京电子科技职业学院", type: "vocational", province: "北京", district: "大兴区", coord: [116.330, 39.740], level: "B" },

      // 天津
      { name: "南开大学", type: "higherEd", province: "天津", district: "南开区", coord: [117.148, 39.100], level: "A" },
      { name: "天津大学", type: "higherEd", province: "天津", district: "南开区", coord: [117.163, 39.109], level: "A" },
      { name: "天津医科大学", type: "higherEd", province: "天津", district: "和平区", coord: [117.191, 39.121], level: "B" },
      { name: "天津师范大学", type: "higherEd", province: "天津", district: "西青区", coord: [117.066, 39.075], level: "B" },
      { name: "天津工业大学", type: "higherEd", province: "天津", district: "西青区", coord: [117.072, 39.066], level: "B" },
      { name: "中科院天津工业生物技术研究所", type: "research", province: "天津", district: "滨海新区", coord: [117.725, 39.073], level: "A" },
      { name: "天津科技大学", type: "higherEd", province: "天津", district: "滨海新区", coord: [117.680, 39.050], level: "B" },
      { name: "天津市南开中学", type: "basicEd", province: "天津", district: "南开区", coord: [117.156, 39.136], level: "A" },
      { name: "天津市耀华中学", type: "basicEd", province: "天津", district: "和平区", coord: [117.199, 39.114], level: "A" },
      { name: "天津中德应用技术大学", type: "vocational", province: "天津", district: "津南区", coord: [117.385, 38.980], level: "B" },

      // 河北
      { name: "河北大学", type: "higherEd", province: "河北", district: "保定市", coord: [115.510, 38.880], level: "B" },
      { name: "河北工业大学", type: "higherEd", province: "河北", district: "廊坊市", coord: [116.690, 39.375], level: "B" },
      { name: "燕山大学", type: "higherEd", province: "河北", district: "秦皇岛市", coord: [119.530, 39.930], level: "B" },
      { name: "石家庄铁道大学", type: "higherEd", province: "河北", district: "石家庄市", coord: [114.520, 38.050], level: "C" },
      { name: "河北师范大学", type: "higherEd", province: "河北", district: "石家庄市", coord: [114.525, 38.028], level: "B" },
      { name: "华北理工大学", type: "higherEd", province: "河北", district: "唐山市", coord: [118.170, 39.625], level: "C" },
      { name: "河北农业大学", type: "higherEd", province: "河北", district: "保定市", coord: [115.480, 38.860], level: "C" },
      { name: "河北省教育科学研究院", type: "research", province: "河北", district: "石家庄市", coord: [114.505, 38.038], level: "B" },
      { name: "唐山市第一中学", type: "basicEd", province: "河北", district: "唐山市", coord: [118.185, 39.628], level: "B" },
      { name: "石家庄市第二中学", type: "basicEd", province: "河北", district: "石家庄市", coord: [114.508, 38.045], level: "B" },
      { name: "保定市职业技术学院", type: "vocational", province: "河北", district: "保定市", coord: [115.470, 38.870], level: "C" },
      { name: "邯郸职业技术学院", type: "vocational", province: "河北", district: "邯郸市", coord: [114.485, 36.608], level: "C" }
    ],
    2024: null,
    2023: null
  },

  // 分析结论 — TODO: 后续根据真实统计数据动态生成
  insights: [
    { icon: "📍", title: "资源集聚", text: "北京海淀区、朝阳区资源密度明显高于区域平均水平，形成核心集聚区" },
    { icon: "🔗", title: "区域协同", text: "京津走廊（武清—廊坊—通州）资源关联度较高，协同资源增长显著" },
    { icon: "📊", title: "结构差异", text: "北京以高校和科研资源为主导，河北基础教育和职业教育占比相对更高" },
    { icon: "🌐", title: "空间特征", text: "资源呈核心城市集聚 + 交通走廊扩散特征，石家庄、保定、唐山为河北三大教育节点" }
  ]
};

// 支持数据回退 — 2024 / 2023 使用同比例缩放
(function fillMissingYears() {
  var d2025 = mockJjjResourceData.regionBreakdown[2025];
  var r2025 = mockJjjResourceData.regions[2025];
  var p2025 = mockJjjResourceData.points[2025];

  [2024, 2023].forEach(function (y) {
    if (!mockJjjResourceData.regions[y]) {
      var s = y === 2024 ? 0.94 : 0.87;
      mockJjjResourceData.regions[y] = r2025.map(function (r) {
        var clone = {};
        for (var k in r) { clone[k] = r[k]; }
        clone.total = Math.round(r.total * s);
        clone.higherEd = Math.round(r.higherEd * s);
        clone.basicEd = Math.round(r.basicEd * s);
        clone.vocational = Math.round(r.vocational * s);
        clone.research = Math.round(r.research * s);
        clone.other = Math.round(r.other * s);
        return clone;
      });
    }
    if (!mockJjjResourceData.points[y]) {
      mockJjjResourceData.points[y] = p2025;
    }
  });
})();
