/**
 * jjj-resource-detail.mock.js
 * 京津冀资源分布 — 真实数据（来源：Excel）
 * TODO: 后续替换为 API 接口
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
        2025: { higherEd: 92, basicEd: 1351, researchPlatform: 340 },
        2024: { higherEd: 92, basicEd: 1351, researchPlatform: 320 },
        2023: { higherEd: 92, basicEd: 1115, researchPlatform: 300 }
      }
    },
    {
      name: "天津市", province: "天津", coord: [117.20, 39.13],
      values: {
        2025: { higherEd: 57, basicEd: 1316, researchPlatform: 220 },
        2024: { higherEd: 57, basicEd: 1316, researchPlatform: 200 },
        2023: { higherEd: 56, basicEd: 1316, researchPlatform: 180 }
      }
    },
    { name: "石家庄市", province: "河北", coord: [114.51, 38.04],
      values: { 2025: { higherEd: 46, basicEd: 2160, researchPlatform: 140 }, 2024: { higherEd: 46, basicEd: 2280, researchPlatform: 130 }, 2023: { higherEd: 44, basicEd: 2500, researchPlatform: 120 } } },
    { name: "唐山市", province: "河北", coord: [118.18, 39.63],
      values: { 2025: { higherEd: 18, basicEd: 3140, researchPlatform: 50 }, 2024: { higherEd: 18, basicEd: 3370, researchPlatform: 45 }, 2023: { higherEd: 17, basicEd: 3600, researchPlatform: 40 } } },
    { name: "保定市", province: "河北", coord: [115.46, 38.87],
      values: { 2025: { higherEd: 15, basicEd: 1270, researchPlatform: 14 }, 2024: { higherEd: 15, basicEd: 1380, researchPlatform: 12 }, 2023: { higherEd: 12, basicEd: 1500, researchPlatform: 10 } } },
    { name: "廊坊市", province: "河北", coord: [116.68, 39.52],
      values: { 2025: { higherEd: 12, basicEd: 1660, researchPlatform: 20 }, 2024: { higherEd: 12, basicEd: 1780, researchPlatform: 18 }, 2023: { higherEd: 11, basicEd: 1900, researchPlatform: 15 } } },
    { name: "邯郸市", province: "河北", coord: [114.49, 36.61],
      values: { 2025: { higherEd: 10, basicEd: 2540, researchPlatform: 10 }, 2024: { higherEd: 10, basicEd: 2770, researchPlatform: 8 }, 2023: { higherEd: 9, basicEd: 3000, researchPlatform: 6 } } },
    { name: "沧州市", province: "河北", coord: [116.86, 38.31],
      values: { 2025: { higherEd: 9, basicEd: 630, researchPlatform: 25 }, 2024: { higherEd: 8, basicEd: 690, researchPlatform: 22 }, 2023: { higherEd: 7, basicEd: 750, researchPlatform: 20 } } },
    { name: "邢台市", province: "河北", coord: [114.50, 37.07],
      values: { 2025: { higherEd: 8, basicEd: 2540, researchPlatform: 14 }, 2024: { higherEd: 8, basicEd: 2770, researchPlatform: 12 }, 2023: { higherEd: 7, basicEd: 3000, researchPlatform: 10 } } },
    { name: "衡水市", province: "河北", coord: [115.67, 37.74],
      values: { 2025: { higherEd: 7, basicEd: 920, researchPlatform: 6 }, 2024: { higherEd: 7, basicEd: 990, researchPlatform: 5 }, 2023: { higherEd: 6, basicEd: 1050, researchPlatform: 4 } } },
    { name: "张家口市", province: "河北", coord: [114.89, 40.77],
      values: { 2025: { higherEd: 6, basicEd: 1070, researchPlatform: 5 }, 2024: { higherEd: 6, basicEd: 1140, researchPlatform: 4 }, 2023: { higherEd: 5, basicEd: 1250, researchPlatform: 3 } } },
    { name: "承德市", province: "河北", coord: [117.96, 40.95],
      values: { 2025: { higherEd: 8, basicEd: 1660, researchPlatform: 5 }, 2024: { higherEd: 8, basicEd: 1770, researchPlatform: 4 }, 2023: { higherEd: 5, basicEd: 1700, researchPlatform: 3 } } },
    { name: "秦皇岛市", province: "河北", coord: [119.60, 39.94],
      values: { 2025: { higherEd: 2, basicEd: 1950, researchPlatform: 6 }, 2024: { higherEd: 2, basicEd: 2080, researchPlatform: 5 }, 2023: { higherEd: 2, basicEd: 2100, researchPlatform: 4 } } }
  ],

  insights: {
    higherEd: "<strong>高校资源：</strong>北京92所高校全国领先，天津57所质量较高，河北129所但无985院校，优质高教资源外流明显。石家庄46所居河北首位。",
    basicEd: "<strong>基础教育：</strong>河北因人口基数大，中小学总量远超京津。唐山、邯郸、邢台学校数量较多，但优质资源仍集中于京津两地。",
    researchPlatform: "<strong>科研平台：</strong>北京省级重点实验室约340个，天津约220个，河北约280个。河北石家庄140个居首，唐山、沧州次之，各地科研投入差距明显。"
  }
};
