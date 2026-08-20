/**
 * jjj-resource-detail.mock.js
 * 京津冀资源分布 — Mock 数据
 *
 * TODO: 后续替换为真实数据接口
 */

var mockJjjResourceData = {
  years: [2023, 2024, 2025],
  currentYear: 2025,

  // 指标分类
  categories: [
    { key: "education", name: "教育资源", unit: "所" },
    { key: "employment", name: "就业人口", unit: "万人" },
    { key: "gdp", name: "GDP", unit: "亿元" },
    { key: "population", name: "常住人口", unit: "万人" }
  ],

  // 区域数据（北京整体、天津整体、河北分市）
  regions: [
    {
      name: "北京市", province: "北京", coord: [116.40, 39.90],
      values: {
        2025: { education: 928, employment: 1120, gdp: 43760, population: 2188 },
        2024: { education: 905, employment: 1080, gdp: 41610, population: 2185 },
        2023: { education: 880, employment: 1040, gdp: 39580, population: 2180 }
      }
    },
    {
      name: "天津市", province: "天津", coord: [117.20, 39.13],
      values: {
        2025: { education: 562, employment: 680, gdp: 17210, population: 1364 },
        2024: { education: 548, employment: 660, gdp: 16390, population: 1360 },
        2023: { education: 530, employment: 640, gdp: 15690, population: 1355 }
      }
    },
    { name: "石家庄市", province: "河北", coord: [114.51, 38.04],
      values: { 2025: { education: 420, employment: 520, gdp: 7800, population: 1120 }, 2024: { education: 405, employment: 500, gdp: 7200, population: 1115 }, 2023: { education: 390, employment: 480, gdp: 6800, population: 1110 } } },
    { name: "唐山市", province: "河北", coord: [118.18, 39.63],
      values: { 2025: { education: 280, employment: 380, gdp: 8900, population: 770 }, 2024: { education: 270, employment: 365, gdp: 8400, population: 768 }, 2023: { education: 260, employment: 350, gdp: 7900, population: 765 } } },
    { name: "保定市", province: "河北", coord: [115.46, 38.87],
      values: { 2025: { education: 260, employment: 340, gdp: 4500, population: 920 }, 2024: { education: 250, employment: 325, gdp: 4200, population: 918 }, 2023: { education: 240, employment: 310, gdp: 3900, population: 915 } } },
    { name: "廊坊市", province: "河北", coord: [116.68, 39.52],
      values: { 2025: { education: 220, employment: 300, gdp: 3800, population: 550 }, 2024: { education: 210, employment: 285, gdp: 3500, population: 546 }, 2023: { education: 200, employment: 270, gdp: 3200, population: 542 } } },
    { name: "邯郸市", province: "河北", coord: [114.49, 36.61],
      values: { 2025: { education: 200, employment: 280, gdp: 4100, population: 940 }, 2024: { education: 192, employment: 268, gdp: 3800, population: 936 }, 2023: { education: 185, employment: 255, gdp: 3500, population: 932 } } },
    { name: "沧州市", province: "河北", coord: [116.86, 38.31],
      values: { 2025: { education: 180, employment: 250, gdp: 4200, population: 730 }, 2024: { education: 172, employment: 240, gdp: 3900, population: 728 }, 2023: { education: 165, employment: 230, gdp: 3600, population: 725 } } },
    { name: "邢台市", province: "河北", coord: [114.50, 37.07],
      values: { 2025: { education: 150, employment: 210, gdp: 2500, population: 710 }, 2024: { education: 144, employment: 200, gdp: 2300, population: 708 }, 2023: { education: 138, employment: 190, gdp: 2100, population: 705 } } },
    { name: "衡水市", province: "河北", coord: [115.67, 37.74],
      values: { 2025: { education: 120, employment: 170, gdp: 1800, population: 420 }, 2024: { education: 115, employment: 162, gdp: 1650, population: 418 }, 2023: { education: 110, employment: 155, gdp: 1500, population: 415 } } },
    { name: "张家口市", province: "河北", coord: [114.89, 40.77],
      values: { 2025: { education: 110, employment: 150, gdp: 1700, population: 410 }, 2024: { education: 105, employment: 143, gdp: 1550, population: 408 }, 2023: { education: 100, employment: 136, gdp: 1400, population: 405 } } },
    { name: "承德市", province: "河北", coord: [117.96, 40.95],
      values: { 2025: { education: 100, employment: 140, gdp: 1600, population: 335 }, 2024: { education: 95, employment: 133, gdp: 1480, population: 333 }, 2023: { education: 90, employment: 126, gdp: 1350, population: 330 } } },
    { name: "秦皇岛市", province: "河北", coord: [119.60, 39.94],
      values: { 2025: { education: 90, employment: 120, gdp: 2000, population: 315 }, 2024: { education: 86, employment: 114, gdp: 1850, population: 313 }, 2023: { education: 82, employment: 108, gdp: 1700, population: 310 } } }
  ],

  // 洞察文本（mock）
  // TODO: 后续根据真实统计数据动态生成
  insights: {
    education: "<strong>教育格局：</strong>北京高校与科研资源高度集中，天津职业教育特色突出，河北基础教育覆盖面广但优质资源相对不足。",
    employment: "<strong>就业特征：</strong>北京第三产业就业占比超80%，津冀制造业就业比重较高，廊坊受益于京津外溢效应就业增长较快。",
    gdp: "<strong>经济总量：</strong>北京GDP遥遥领先，唐山因工业基础雄厚居河北首位，石家庄紧随其后。",
    population: "<strong>人口分布：</strong>京津冀总人口约1.1亿，北京常住人口趋于稳定，河北各市人口外流压力仍存。"
  }
};
