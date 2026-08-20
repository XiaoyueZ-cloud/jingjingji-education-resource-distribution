/**
 * jjj-geo-data.js
 * 京津冀 GeoJSON — 运行时从 DataV CDN 获取真实行政区数据
 *
 * 如果 CDN 不可用，回退到简化版边界数据。
 *
 * TODO:
 * Replace this runtime fetch with local GeoJSON files when available.
 * Source: https://datav.aliyun.com/portal/school/atlas/area_selector
 */

(function (root) {
  "use strict";

  // DataV 阿里云 GeoJSON API
  var GEO_API_BASE = "https://geo.datav.aliyun.com/areas_v3/bound/";

  // 京津冀地级市 adcode（2023 行政区划）
  var JJJ_CITIES = {
    beijing:  { adcode: "110000", name: "北京市" },
    tianjin:  { adcode: "120000", name: "天津市" },
    shijiazhuang: { adcode: "130100", name: "石家庄市" },
    tangshan:     { adcode: "130200", name: "唐山市" },
    qinhuangdao:  { adcode: "130300", name: "秦皇岛市" },
    handan:       { adcode: "130400", name: "邯郸市" },
    xingtai:      { adcode: "130500", name: "邢台市" },
    baoding:      { adcode: "130600", name: "保定市" },
    zhangjiakou:  { adcode: "130700", name: "张家口市" },
    chengde:      { adcode: "130800", name: "承德市" },
    cangzhou:     { adcode: "130900", name: "沧州市" },
    langfang:     { adcode: "131000", name: "廊坊市" },
    hengshui:     { adcode: "131100", name: "衡水市" }
  };

  // 用于判断城市属于哪个省
  function getProvince(name) {
    if (name.indexOf("北京") !== -1) return "北京";
    if (name.indexOf("天津") !== -1) return "天津";
    return "河北";
  }

  /**
   * 获取京津冀 GeoJSON
   * @returns {Promise<Object>} ECharts 注册用的 GeoJSON
   */
  function fetchJjjGeoJson() {
    var entries = Object.keys(JJJ_CITIES);

    // 并行获取所有城市 GeoJSON
    var promises = entries.map(function (key) {
      var city = JJJ_CITIES[key];
      var url = GEO_API_BASE + city.adcode + ".json";
      return fetch(url)
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then(function (geojson) {
          // 给每个 feature 添加 province 字段
          if (geojson && geojson.features) {
            geojson.features.forEach(function (f) {
              f.properties = f.properties || {};
              f.properties.province = getProvince(city.name);
              if (!f.properties.name) {
                f.properties.name = city.name;
              }
            });
          }
          return geojson;
        })
        .catch(function () {
          return null;
        });
    });

    return Promise.all(promises).then(function (results) {
      // 合并所有 GeoJSON 为一个
      var merged = { type: "FeatureCollection", features: [] };

      results.forEach(function (geojson) {
        if (geojson && geojson.features) {
          merged.features = merged.features.concat(geojson.features);
        }
      });

      // 调试：打印加载到的 feature 名称
      console.log("[jjj-geo] Loaded " + merged.features.length + " features:",
        merged.features.map(function (f) { return f.properties && f.properties.name; }));

      if (merged.features.length === 0) {
        // CDN 全部失败 — 使用内置简化数据
        console.warn("[jjj-geo] CDN unavailable, using fallback geometry");
        merged = buildFallbackGeoJson();
      }

      return merged;
    });
  }

  /**
   * 内置简化 GeoJSON（兜底）
   * 坐标为近似行政边界，仅供开发 / 离线预览
   */
  function buildFallbackGeoJson() {
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "北京市", province: "北京" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [115.42, 40.55], [115.97, 40.55], [116.10, 40.70],
              [116.60, 40.85], [117.15, 40.65], [117.40, 40.30],
              [117.12, 40.14], [116.85, 39.95], [116.65, 39.90],
              [116.65, 39.65], [116.35, 39.55], [116.10, 39.55],
              [115.75, 39.70], [115.42, 39.85], [115.42, 40.55]
            ]]
          }
        },
        {
          type: "Feature",
          properties: { name: "天津市", province: "天津" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [116.70, 39.65], [116.85, 39.55], [117.05, 39.60],
              [117.25, 39.65], [117.50, 39.60], [117.80, 39.50],
              [117.95, 39.25], [117.85, 38.95], [117.45, 38.70],
              [117.20, 38.60], [116.90, 38.75], [116.75, 38.95],
              [116.70, 39.20], [116.70, 39.65]
            ]]
          }
        },
        {
          type: "Feature",
          properties: { name: "石家庄市", province: "河北" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [113.80, 38.45], [114.10, 38.55], [114.50, 38.55],
              [114.80, 38.40], [115.00, 38.15], [114.90, 37.85],
              [114.50, 37.60], [114.10, 37.60], [113.80, 37.75],
              [113.70, 38.05], [113.80, 38.45]
            ]]
          }
        },
        {
          type: "Feature",
          properties: { name: "唐山市", province: "河北" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [117.55, 40.15], [117.90, 40.20], [118.50, 40.00],
              [118.90, 39.75], [118.80, 39.45], [118.40, 39.20],
              [118.00, 39.15], [117.65, 39.30], [117.55, 39.60],
              [117.55, 40.15]
            ]]
          }
        },
        {
          type: "Feature",
          properties: { name: "秦皇岛市", province: "河北" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [118.90, 40.40], [119.30, 40.50], [119.80, 40.30],
              [119.85, 39.90], [119.50, 39.65], [119.10, 39.60],
              [118.90, 39.80], [118.90, 40.40]
            ]]
          }
        },
        {
          type: "Feature",
          properties: { name: "邯郸市", province: "河北" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [113.55, 36.85], [114.00, 37.00], [114.50, 36.95],
              [114.80, 36.70], [114.90, 36.35], [114.60, 36.15],
              [114.15, 36.20], [113.75, 36.35], [113.55, 36.60],
              [113.55, 36.85]
            ]]
          }
        },
        {
          type: "Feature",
          properties: { name: "邢台市", province: "河北" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [113.75, 37.55], [114.10, 37.55], [114.55, 37.50],
              [114.90, 37.30], [115.05, 37.00], [114.80, 36.80],
              [114.50, 36.95], [114.00, 37.00], [113.75, 37.20],
              [113.75, 37.55]
            ]]
          }
        },
        {
          type: "Feature",
          properties: { name: "保定市", province: "河北" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [114.50, 39.30], [114.90, 39.35], [115.40, 39.25],
              [115.80, 39.10], [116.05, 38.90], [115.95, 38.60],
              [115.60, 38.50], [115.10, 38.55], [114.80, 38.40],
              [114.50, 38.55], [114.30, 38.80], [114.20, 39.10],
              [114.50, 39.30]
            ]]
          }
        },
        {
          type: "Feature",
          properties: { name: "张家口市", province: "河北" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [113.80, 41.05], [114.30, 41.10], [114.90, 41.00],
              [115.50, 40.80], [115.95, 40.55], [115.97, 40.55],
              [115.42, 40.55], [114.80, 40.60], [114.30, 40.50],
              [113.90, 40.55], [113.50, 40.70], [113.50, 40.90],
              [113.80, 41.05]
            ]]
          }
        },
        {
          type: "Feature",
          properties: { name: "承德市", province: "河北" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [116.60, 41.60], [117.10, 41.80], [117.75, 41.60],
              [118.30, 41.40], [118.50, 41.10], [118.30, 40.80],
              [117.90, 40.55], [117.40, 40.30], [117.15, 40.65],
              [116.60, 40.85], [116.60, 41.60]
            ]]
          }
        },
        {
          type: "Feature",
          properties: { name: "沧州市", province: "河北" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [116.05, 38.60], [116.50, 38.55], [116.85, 38.50],
              [117.20, 38.30], [117.50, 38.10], [117.45, 37.75],
              [117.10, 37.60], [116.70, 37.70], [116.30, 37.85],
              [116.05, 38.10], [116.05, 38.60]
            ]]
          }
        },
        {
          type: "Feature",
          properties: { name: "廊坊市", province: "河北" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [116.35, 39.65], [116.65, 39.65], [116.85, 39.55],
              [117.05, 39.30], [116.85, 39.00], [116.65, 38.85],
              [116.30, 38.90], [116.10, 39.10], [116.05, 39.35],
              [116.20, 39.55], [116.35, 39.65]
            ]]
          }
        },
        {
          type: "Feature",
          properties: { name: "衡水市", province: "河北" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [115.30, 38.10], [115.70, 38.10], [116.05, 38.00],
              [116.30, 37.85], [116.20, 37.55], [115.80, 37.45],
              [115.40, 37.50], [115.10, 37.65], [115.05, 37.85],
              [115.30, 38.10]
            ]]
          }
        }
      ]
    };
  }

  root.JjjGeoData = {
    fetchGeoJson: fetchJjjGeoJson,
    buildFallback: buildFallbackGeoJson,
    JJJ_CITIES: JJJ_CITIES
  };

})(window);
