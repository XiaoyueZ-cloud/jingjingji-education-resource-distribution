/**
 * jjj-resource-detail.mock.js
 * 京津冀资源分布 — Mock 数据
 * TODO: 后续替换为真实数据接口
 */

var mockJjjResourceData = {
  years: [2023, 2024, 2025],
  currentYear: 2025,

  categories: [
    { key: "higherEd", name: "高校资源", unit: "所" },
    { key: "basicEd", name: "基础教育", unit: "所" },
    { key: "researchPlatform", name: "科研平台", unit: "个" }
  ],

  regions: [
    {
      name: "北京市", province: "北京", coord: [116.40, 39.90],
      values: {
        2025: { higherEd: 312, basicEd: 1680, researchPlatform: 420 },
        2024: { higherEd: 305, basicEd: 1650, researchPlatform: 400 },
        2023: { higherEd: 298, basicEd: 1620, researchPlatform: 380 }
      }
    },
    {
      name: "天津市", province: "天津", coord: [117.20, 39.13],
      values: {
        2025: { higherEd: 56, basicEd: 860, researchPlatform: 115 },
        2024: { higherEd: 55, basicEd: 845, researchPlatform: 108 },
        2023: { higherEd: 54, basicEd: 830, researchPlatform: 100 }
      }
    },
    { name: "石家庄市", province: "河北", coord: [114.51, 38.04],
      values: { 2025: { higherEd: 44, basicEd: 520, researchPlatform: 35 }, 2024: { higherEd: 43, basicEd: 510, researchPlatform: 33 }, 2023: { higherEd: 42, basicEd: 500, researchPlatform: 30 } } },
    { name: "唐山市", province: "河北", coord: [118.18, 39.63],
      values: { 2025: { higherEd: 14, basicEd: 380, researchPlatform: 18 }, 2024: { higherEd: 14, basicEd: 372, researchPlatform: 17 }, 2023: { higherEd: 13, basicEd: 365, researchPlatform: 15 } } },
    { name: "保定市", province: "河北", coord: [115.46, 38.87],
      values: { 2025: { higherEd: 18, basicEd: 410, researchPlatform: 12 }, 2024: { higherEd: 18, basicEd: 402, researchPlatform: 11 }, 2023: { higherEd: 17, basicEd: 395, researchPlatform: 10 } } },
    { name: "廊坊市", province: "河北", coord: [116.68, 39.52],
      values: { 2025: { higherEd: 12, basicEd: 290, researchPlatform: 15 }, 2024: { higherEd: 12, basicEd: 282, researchPlatform: 14 }, 2023: { higherEd: 11, basicEd: 275, researchPlatform: 12 } } },
    { name: "邯郸市", province: "河北", coord: [114.49, 36.61],
      values: { 2025: { higherEd: 10, basicEd: 350, researchPlatform: 8 }, 2024: { higherEd: 10, basicEd: 342, researchPlatform: 7 }, 2023: { higherEd: 9, basicEd: 335, researchPlatform: 6 } } },
    { name: "沧州市", province: "河北", coord: [116.86, 38.31],
      values: { 2025: { higherEd: 8, basicEd: 310, researchPlatform: 6 }, 2024: { higherEd: 8, basicEd: 302, researchPlatform: 5 }, 2023: { higherEd: 7, basicEd: 295, researchPlatform: 5 } } },
    { name: "邢台市", province: "河北", coord: [114.50, 37.07],
      values: { 2025: { higherEd: 6, basicEd: 260, researchPlatform: 4 }, 2024: { higherEd: 6, basicEd: 252, researchPlatform: 4 }, 2023: { higherEd: 6, basicEd: 245, researchPlatform: 3 } } },
    { name: "衡水市", province: "河北", coord: [115.67, 37.74],
      values: { 2025: { higherEd: 4, basicEd: 220, researchPlatform: 3 }, 2024: { higherEd: 4, basicEd: 215, researchPlatform: 3 }, 2023: { higherEd: 4, basicEd: 210, researchPlatform: 2 } } },
    { name: "张家口市", province: "河北", coord: [114.89, 40.77],
      values: { 2025: { higherEd: 5, basicEd: 200, researchPlatform: 4 }, 2024: { higherEd: 5, basicEd: 195, researchPlatform: 4 }, 2023: { higherEd: 5, basicEd: 190, researchPlatform: 3 } } },
    { name: "承德市", province: "河北", coord: [117.96, 40.95],
      values: { 2025: { higherEd: 4, basicEd: 180, researchPlatform: 3 }, 2024: { higherEd: 4, basicEd: 175, researchPlatform: 3 }, 2023: { higherEd: 4, basicEd: 170, researchPlatform: 2 } } },
    { name: "秦皇岛市", province: "河北", coord: [119.60, 39.94],
      values: { 2025: { higherEd: 8, basicEd: 160, researchPlatform: 5 }, 2024: { higherEd: 8, basicEd: 155, researchPlatform: 5 }, 2023: { higherEd: 7, basicEd: 150, researchPlatform: 4 } } }
  ],

  insights: {
    higherEd: "<strong>高校资源：</strong>北京拥有全国最密集的高校群，985/211院校数量遥遥领先；天津高校数量适中但质量较高；河北高校资源相对匮乏，优质高教资源外流明显。",
    basicEd: "<strong>基础教育：</strong>京津冀基础教育总量庞大，河北因人口基数大学校数量最多，但优质中小学资源仍高度集中于京津两地。",
    researchPlatform: "<strong>科研平台：</strong>北京集中了全国最多的国家级科研院所和重点实验室，天津滨海新区科研平台增长较快，河北科研投入和产出仍有较大提升空间。"
  }
};
