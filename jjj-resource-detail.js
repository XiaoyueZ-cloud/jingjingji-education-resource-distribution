/**
 * jjj-resource-detail.js
 * 京津冀三地资源分布概览 — 二级详情页主模块
 *
 * 公开 API:
 *   JjjResourceDetail.init(container, data, opts) → instance
 *   instance.update(data)
 *   instance.resize()
 *   instance.destroy()
 */

var JjjResourceDetail = (function () {
  "use strict";

  /* ============================================================
     常量
     ============================================================ */
  var COLORS = {
    beijing:  "#ff8a1f",
    tianjin:  "#15b9e8",
    hebei:    "#6fa94f",
    total:    "#095fd6",
    purple:   "#7b6de6",
    // 资源类型色（与五类协同不同语义，不复用）
    higherEd:  "#1368e8",
    basicEd:   "#16b8e8",
    vocational:"#68a84f",
    research:  "#ed8615",
    other:     "#7468df"
  };

  var PROVINCE_ORDER = ["北京", "天津", "河北"];
  // regionBreakdown 数据使用英文 key，需要映射
  var PROVINCE_KEY = { "北京": "beijing", "天津": "tianjin", "河北": "hebei" };
  var RESOURCE_KEYS  = ["higherEd", "basicEd", "vocational", "research", "other"];

  /* ============================================================
     Tooltip 配置（深蓝统一）
     ============================================================ */
  var TOOLTIP_STYLE = {
    backgroundColor: "rgba(3, 18, 36, 0.96)",
    borderColor: "rgba(0, 145, 255, 0.7)",
    borderWidth: 1,
    padding: [8, 12],
    textStyle: { color: "#f2f7ff", fontSize: 12 }
  };

  /* ============================================================
     辅助函数
     ============================================================ */
  function h(tag, cls, html) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html !== undefined) el.innerHTML = html;
    return el;
  }

  function formatNum(n) {
    if (n == null) return "--";
    return n.toLocaleString("zh-CN");
  }

  function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  }

  function getProvinceColor(province) {
    if (province.indexOf("北京") !== -1) return COLORS.beijing;
    if (province.indexOf("天津") !== -1) return COLORS.tianjin;
    return COLORS.hebei;
  }

  function getCategoryColor(key) {
    return COLORS[key] || "#0867e8";
  }

  function getCategoryName(key) {
    var map = {
      higherEd: "高校资源", basicEd: "基础教育",
      vocational: "职业教育", research: "科研资源", other: "其他资源"
    };
    return map[key] || key;
  }

  /* ============================================================
     DOM 构建
     ============================================================ */
  function buildDOM(root) {
    root.innerHTML = "";

    // ---- Header ----
    var header = h("header", "jjj-resource-detail__header");
    var title  = h("h2", "jjj-resource-detail__title", "京津冀三地资源分布概览");
    var toolbar = h("div", "jjj-resource-detail__toolbar");
    header.appendChild(title);
    header.appendChild(toolbar);

    // 年度下拉
    var yearSel = h("select", "jjj-resource-detail__select");
    yearSel.setAttribute("data-ctrl", "year");
    toolbar.appendChild(yearSel);

    // 资源类型下拉
    var typeSel = h("select", "jjj-resource-detail__select");
    typeSel.setAttribute("data-ctrl", "resourceType");
    var optAll = h("option", "", "全部资源");
    optAll.value = "all";
    typeSel.appendChild(optAll);
    toolbar.appendChild(typeSel);

    // 返回按钮
    var backBtn = h("button", "jjj-resource-detail__btn", "← 返回概览");
    backBtn.setAttribute("data-ctrl", "back");
    toolbar.appendChild(backBtn);

    // ---- Body ----
    var body = h("div", "jjj-resource-detail__body");

    // KPI 行
    var kpis = h("div", "jjj-resource-detail__kpis");
    var kpiDefs = [
      { key: "total",     label: "资源总量",        cls: "total" },
      { key: "beijing",   label: "北京",            cls: "beijing" },
      { key: "tianjin",   label: "天津",            cls: "tianjin" },
      { key: "hebei",     label: "河北",            cls: "hebei" },
      { key: "crossRegion", label: "跨区域协同资源", cls: "cross" }
    ];
    kpiDefs.forEach(function (d) {
      var card = h("div", "jjj-resource-detail__kpi-card jjj-resource-detail__kpi-card--" + d.cls);
      card.setAttribute("data-kpi", d.key);
      card.innerHTML =
        '<div><div class="jjj-resource-detail__kpi-value" data-kpi-val="' + d.key + '">--</div>' +
        '<div class="jjj-resource-detail__kpi-label">' + d.label + '</div></div>';
      kpis.appendChild(card);
    });

    // 主区域：地图 + 侧面板
    var main = h("div", "jjj-resource-detail__main");

    // 地图
    var mapWrap = h("div", "jjj-resource-detail__map");
    var mapChart = h("div", "jjj-resource-detail__map-chart");
    mapChart.setAttribute("data-chart", "map");
    mapWrap.appendChild(mapChart);
    // 图例 — 地域
    var legend = h("div", "jjj-resource-detail__map-legend");
    legend.innerHTML =
      '<div class="jjj-resource-detail__legend-item"><span class="jjj-resource-detail__legend-dot" style="background:' + COLORS.beijing + '"></span>北京</div>' +
      '<div class="jjj-resource-detail__legend-item"><span class="jjj-resource-detail__legend-dot" style="background:' + COLORS.tianjin + '"></span>天津</div>' +
      '<div class="jjj-resource-detail__legend-item"><span class="jjj-resource-detail__legend-dot" style="background:' + COLORS.hebei + '"></span>河北</div>';
    mapWrap.appendChild(legend);
    // 图例 — 密度
    var densLegend = h("div", "jjj-resource-detail__legend-bar");
    densLegend.innerHTML = '<span>低</span><span class="jjj-resource-detail__legend-gradient"></span><span>高</span>';
    mapWrap.appendChild(densLegend);

    // 右侧面板
    var side = h("aside", "jjj-resource-detail__side-panel");

    // 资源类型分布
    var typesSec = h("div", "jjj-resource-detail__panel-section");
    typesSec.appendChild(h("h3", "jjj-resource-detail__section-title", "资源类型分布"));
    var typeFilter = h("div", "jjj-resource-detail__type-filter");
    typeFilter.setAttribute("data-role", "type-filter");
    typesSec.appendChild(typeFilter);
    var typeChartArea = h("div", "jjj-resource-detail__chart-area");
    typeChartArea.setAttribute("data-chart", "resourceTypes");
    typesSec.appendChild(typeChartArea);
    side.appendChild(typesSec);

    // 当前区域详情
    var regionSec = h("div", "jjj-resource-detail__panel-section");
    regionSec.appendChild(h("h3", "jjj-resource-detail__section-title", "区域资源详情"));
    var regionDetail = h("div", "jjj-resource-detail__chart-area");
    regionDetail.setAttribute("data-role", "region-detail");
    regionDetail.style.fontSize = "11px";
    regionDetail.style.color = "#b8c7d9";
    regionDetail.style.overflowY = "auto";
    regionSec.appendChild(regionDetail);
    side.appendChild(regionSec);

    // 底部分析区
    var analysis = h("div", "jjj-resource-detail__analysis");

    // 三地资源结构
    var structCard = h("div", "jjj-resource-detail__analysis-card");
    structCard.appendChild(h("h3", "jjj-resource-detail__section-title", "京津冀三地资源结构"));
    var structChart = h("div", "jjj-resource-detail__analysis-chart");
    structChart.setAttribute("data-chart", "structure");
    structCard.appendChild(structChart);

    // 区域排名
    var rankCard = h("div", "jjj-resource-detail__analysis-card");
    rankCard.appendChild(h("h3", "jjj-resource-detail__section-title", "各区域资源排名 Top 10"));
    var rankList = h("div", "jjj-resource-detail__ranking-list");
    rankList.setAttribute("data-role", "ranking");
    rankCard.appendChild(rankList);

    // 洞察
    var insightCard = h("div", "jjj-resource-detail__analysis-card");
    insightCard.appendChild(h("h3", "jjj-resource-detail__section-title", "资源分布分析"));
    var insightList = h("div", "jjj-resource-detail__insight-list");
    insightList.setAttribute("data-role", "insights");
    insightCard.appendChild(insightList);

    analysis.appendChild(structCard);
    analysis.appendChild(rankCard);
    analysis.appendChild(insightCard);

    // 组装
    main.appendChild(mapWrap);
    main.appendChild(side);

    body.appendChild(kpis);
    body.appendChild(main);
    body.appendChild(analysis);

    root.appendChild(header);
    root.appendChild(body);

    return {
      header: header, toolbar: toolbar, body: body,
      yearSel: yearSel, typeSel: typeSel, backBtn: backBtn,
      kpis: kpis, mapChart: mapChart, mapWrap: mapWrap,
      typeFilter: typeFilter, typeChartArea: typeChartArea,
      regionDetail: regionDetail, structChart: structChart,
      rankList: rankList, insightList: insightList
    };
  }

  /* ============================================================
     状态
     ============================================================ */
  function createState(data) {
    return {
      year: data.currentYear || 2025,
      resourceType: "all",
      selectedRegion: null
    };
  }

  /* ============================================================
     KPI 渲染
     ============================================================ */
  function renderKPIs(dom, data, state) {
    var summary = data.summary[state.year] || {};
    var keys = ["total", "beijing", "tianjin", "hebei", "crossRegion"];
    keys.forEach(function (k) {
      var valEl = dom.kpis.querySelector('[data-kpi-val="' + k + '"]');
      if (valEl) valEl.textContent = formatNum(summary[k]);
    });
  }

  /* ============================================================
     ECharts 通用 Tooltip
     ============================================================ */
  function baseTooltip() {
    return {
      backgroundColor: TOOLTIP_STYLE.backgroundColor,
      borderColor: TOOLTIP_STYLE.borderColor,
      borderWidth: TOOLTIP_STYLE.borderWidth,
      padding: TOOLTIP_STYLE.padding,
      textStyle: TOOLTIP_STYLE.textStyle
    };
  }

  /* ============================================================
     地图初始化 + 渲染
     ============================================================ */
  var mapChartInstance = null;

  function initMap(dom) {
    if (mapChartInstance) {
      mapChartInstance.dispose();
      mapChartInstance = null;
    }
    mapChartInstance = echarts.init(dom.mapChart);
  }

  function renderMap(dom, data, state, geoJson) {
    if (!mapChartInstance || !geoJson) return;

    var yearData = data.regions[state.year] || [];
    var points   = (data.points[state.year] || []).slice();

    // 过滤资源类型
    if (state.resourceType !== "all") {
      points = points.filter(function (p) { return p.type === state.resourceType; });
    }

    // 构建区域名→数据映射
    var regionMap = {};
    yearData.forEach(function (r) { regionMap[r.name] = r; });

    // 注册地图
    echarts.registerMap("jjj", geoJson);

    // 热力数据 — 按区域总量
    var heatData = yearData.map(function (r) {
      var val = state.resourceType === "all" ? r.total : (r[state.resourceType] || 0);
      return { name: r.name, value: val, province: r.province, regionData: r };
    });

    // 散点数据
    var scatterData = points.map(function (p) {
      return {
        name: p.name,
        value: p.coord.concat(1),
        type: p.type,
        province: p.province,
        district: p.district,
        level: p.level,
        itemStyle: { color: getCategoryColor(p.type) }
      };
    });

    var maxVal = 1;
    heatData.forEach(function (d) { if (d.value > maxVal) maxVal = d.value; });

    // 选中区域样式
    var selectedRegionName = state.selectedRegion;
    var regionAreaStyle = function (feature) {
      var name = feature.properties.name || "";
      var prov = feature.properties.province || getProvince(name);
      var baseColor = getProvinceColor(prov);
      var isSelected = selectedRegionName && name.indexOf(selectedRegionName) !== -1;
      var isDimmed   = selectedRegionName && !isSelected;

      return {
        areaColor: isSelected ? baseColor : isDimmed ? "rgba(10,30,60,0.6)" : hexToRgba(baseColor, 0.35),
        opacity: isDimmed ? 0.4 : 1
      };
    };

    var option = {
      tooltip: Object.assign({}, baseTooltip(), {
        trigger: "item",
        formatter: function (params) {
          if (params.seriesType === "map") {
            var d = regionMap[params.name];
            if (!d) return params.name;
            var prov = d.province || "";
            return '<div style="font-weight:600;margin-bottom:4px;color:' + getProvinceColor(prov) + '">' + params.name + '</div>' +
              '<div>资源总量：<b>' + formatNum(d.total) + '</b></div>' +
              '<div>高校资源：' + formatNum(d.higherEd) + '</div>' +
              '<div>基础教育：' + formatNum(d.basicEd) + '</div>' +
              '<div>职业教育：' + formatNum(d.vocational) + '</div>' +
              '<div>科研资源：' + formatNum(d.research) + '</div>';
          }
          if (params.seriesType === "scatter" || params.seriesType === "effectScatter") {
            var raw = params.data || {};
            return '<div style="font-weight:600;margin-bottom:4px">' + raw.name + '</div>' +
              '<div>类型：' + getCategoryName(raw.type) + '</div>' +
              '<div>区域：' + raw.province + ' ' + (raw.district || "") + '</div>' +
              '<div>等级：' + (raw.level || "--") + '</div>';
          }
          return "";
        }
      }),
      geo: {
        map: "jjj",
        roam: true,
        zoom: 1.15,
        center: [116.0, 39.2],
        scaleLimit: { min: 0.8, max: 8 },
        silent: false,
        itemStyle: {
          areaColor: "rgba(8, 40, 80, 0.55)",
          borderColor: "rgba(0, 168, 255, 0.4)",
          borderWidth: 1
        },
        emphasis: {
          itemStyle: {
            areaColor: "rgba(0, 120, 255, 0.4)",
            borderColor: "rgba(0, 200, 255, 0.8)",
            borderWidth: 2,
            shadowColor: "rgba(0, 168, 255, 0.5)",
            shadowBlur: 12
          },
          label: {
            show: true,
            color: "#f2f7ff",
            fontSize: 11,
            fontWeight: 600,
            textShadowColor: "rgba(0,0,0,0.6)",
            textShadowBlur: 3
          }
        },
        select: {
          itemStyle: {
            areaColor: "rgba(0, 140, 255, 0.45)",
            borderColor: "rgba(0, 220, 255, 0.9)",
            borderWidth: 2,
            shadowColor: "rgba(0, 200, 255, 0.6)",
            shadowBlur: 15
          },
          label: {
            show: true,
            color: "#fff",
            fontSize: 11,
            fontWeight: 700
          }
        },
        selectedMode: "single",
        label: { show: false },
        regions: []
      },
      series: [
        // 地图热力
        {
          type: "map",
          map: "jjj",
          geoIndex: 0,
          data: heatData,
          emphasis: { disabled: false }
        },
        // 资源点 — 散点
        {
          type: "scatter",
          coordinateSystem: "geo",
          data: scatterData,
          symbolSize: function (val) { return val[2] ? 7 : 5; },
          symbol: "circle",
          label: { show: false },
          emphasis: {
            scale: 1.8,
            label: {
              show: true,
              formatter: "{b}",
              color: "#fff",
              fontSize: 10,
              textShadowColor: "rgba(0,0,0,0.5)",
              textShadowBlur: 2
            }
          },
          zlevel: 2
        },
        // 重点资源呼吸点（Level A）
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          data: scatterData.filter(function (d) { return d.level === "A"; }),
          symbolSize: 10,
          showEffectOn: "render",
          rippleEffect: { brushType: "stroke", scale: 2.5, period: 4 },
          label: { show: false },
          emphasis: {
            scale: 2,
            label: {
              show: true,
              formatter: "{b}",
              color: "#fff",
              fontSize: 10
            }
          },
          zlevel: 3
        }
      ]
    };

    // 高亮选中区域
    if (selectedRegionName) {
      option.geo.regions = [{
        name: selectedRegionName,
        itemStyle: {
          areaColor: getProvinceColor(getProvinceNameFromRegion(selectedRegionName, yearData)),
          borderColor: "rgba(0, 220, 255, 0.9)",
          borderWidth: 2,
          shadowColor: "rgba(0, 200, 255, 0.5)",
          shadowBlur: 12
        },
        label: { show: true, color: "#fff", fontWeight: 700, fontSize: 11 }
      }];
    }

    mapChartInstance.setOption(option, true);
  }

  function getProvinceNameFromRegion(name, regions) {
    for (var i = 0; i < regions.length; i++) {
      if (regions[i].name === name) return regions[i].province || "河北";
    }
    return "河北";
  }

  /* ============================================================
     资源类型筛选标签
     ============================================================ */
  function renderTypeFilter(dom, data, state) {
    dom.typeFilter.innerHTML = "";

    var allTag = h("span", "jjj-resource-detail__type-tag" + (state.resourceType === "all" ? " jjj-resource-detail__type-tag--active" : ""), "全部");
    allTag.setAttribute("data-type", "all");
    dom.typeFilter.appendChild(allTag);

    (data.resourceCategories || []).forEach(function (cat) {
      var active = state.resourceType === cat.key ? " jjj-resource-detail__type-tag--active" : "";
      var tag = h("span", "jjj-resource-detail__type-tag" + active, cat.name);
      tag.setAttribute("data-type", cat.key);
      tag.style.borderColor = active ? cat.color : "";
      dom.typeFilter.appendChild(tag);
    });
  }

  /* ============================================================
     资源类型横向条形图
     ============================================================ */
  var typeChartInstance = null;

  function initTypeChart(dom) {
    if (typeChartInstance) {
      typeChartInstance.dispose();
      typeChartInstance = null;
    }
    typeChartInstance = echarts.init(dom.typeChartArea);
  }

  function renderTypeChart(dom, data, state) {
    if (!typeChartInstance) return;

    var summary = data.regionBreakdown[state.year] || {};
    var categories = data.resourceCategories || [];

    // 按当前选中区域汇总
    var totals = {};
    RESOURCE_KEYS.forEach(function (k) { totals[k] = 0; });

    var provs = state.selectedRegion
      ? [function () {
          // 找到该区域所属省
          var regs = data.regions[state.year] || [];
          for (var i = 0; i < regs.length; i++) {
            if (regs[i].name === state.selectedRegion) return regs[i].province;
          }
          return "河北";
        }()]
      : PROVINCE_ORDER;

    provs.forEach(function (prov) {
      var bd = summary[PROVINCE_KEY[prov] || prov];
      if (!bd) return;
      RESOURCE_KEYS.forEach(function (k) { totals[k] += (bd[k] || 0); });
    });

    var items = RESOURCE_KEYS.map(function (k, i) {
      return { key: k, name: getCategoryName(k), value: totals[k], color: getCategoryColor(k) };
    });
    items.sort(function (a, b) { return b.value - a.value; });

    var maxVal = items.length ? items[0].value : 1;
    var names = items.map(function (it) { return it.name; });
    var values = items.map(function (it) { return it.value; });
    var colors = items.map(function (it) { return it.color; });

    var option = {
      tooltip: Object.assign({}, baseTooltip(), {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: function (params) {
          var p = params[0];
          if (!p) return "";
          var idx = p.dataIndex;
          var total = values.reduce(function (a, b) { return a + b; }, 0);
          var pct = total ? ((values[idx] / total) * 100).toFixed(1) : "0";
          return '<div style="font-weight:600;color:' + colors[idx] + '">' + names[idx] + '</div>' +
            '<div>数量：<b>' + formatNum(values[idx]) + '</b></div>' +
            '<div>占比：' + pct + '%</div>';
        }
      }),
      grid: { left: 68, right: 40, top: 6, bottom: 6, containLabel: false },
      xAxis: {
        type: "value",
        show: false,
        max: maxVal * 1.2
      },
      yAxis: {
        type: "category",
        data: names,
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: "#b8c7d9", fontSize: 11 }
      },
      series: [{
        type: "bar",
        data: values.map(function (v, i) {
          return {
            value: v,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: colors[i] },
                { offset: 1, color: hexToRgba(colors[i], 0.5) }
              ]),
              borderRadius: [0, 3, 3, 0]
            }
          };
        }),
        barWidth: 14,
        label: {
          show: true,
          position: "right",
          formatter: function (p) { return formatNum(p.value); },
          color: "#b8c7d9",
          fontSize: 10
        },
        emphasis: {
          itemStyle: { shadowColor: "rgba(0,168,255,0.3)", shadowBlur: 8 }
        }
      }]
    };

    typeChartInstance.setOption(option, true);
  }

  /* ============================================================
     三地资源结构 — 堆叠柱状图
     ============================================================ */
  var structChartInstance = null;

  function initStructChart(dom) {
    if (structChartInstance) {
      structChartInstance.dispose();
      structChartInstance = null;
    }
    structChartInstance = echarts.init(dom.structChart);
  }

  function renderStructChart(dom, data, state) {
    if (!structChartInstance) return;

    var summary = data.regionBreakdown[state.year] || {};
    var provinces = PROVINCE_ORDER;

    // DEBUG
    console.log("[struct] year=" + state.year + " keys=" + Object.keys(summary).join(","));
    provinces.forEach(function (p) { console.log("[struct] " + p + " → " + JSON.stringify(summary[PROVINCE_KEY[p] || p])); });

    var option = {
      tooltip: Object.assign({}, baseTooltip(), {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: function (params) {
          if (!params.length) return "";
          var title = params[0].axisValue;
          var lines = params.map(function (p) {
            return '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + p.color + ';margin-right:4px"></span>' +
              p.seriesName + '：<b>' + formatNum(p.value) + '</b>';
          });
          return '<div style="font-weight:600;margin-bottom:4px">' + title + '</div>' + lines.join("<br>");
        }
      }),
      legend: {
        data: RESOURCE_KEYS.map(getCategoryName),
        bottom: 0,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { color: "#d9e6f2", fontSize: 11 }
      },
      grid: { left: 50, right: 12, top: 6, bottom: 32, containLabel: false },
      xAxis: {
        type: "category",
        data: provinces,
        axisLine: { lineStyle: { color: "rgba(160,190,220,.28)" } },
        axisTick: { show: false },
        axisLabel: { color: "#b8c7d9", fontSize: 12 }
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: "rgba(80,130,170,.18)" } },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: "#7e94ab", fontSize: 10 }
      },
      series: RESOURCE_KEYS.map(function (key) {
        return {
          name: getCategoryName(key),
          type: "bar",
          stack: "total",
          data: provinces.map(function (prov) {
            var bd = summary[PROVINCE_KEY[prov] || prov] || {};
            return bd[key] || 0;
          }),
          itemStyle: { color: getCategoryColor(key), borderRadius: 0 },
          emphasis: {
            itemStyle: { shadowColor: "rgba(0,0,0,0.3)", shadowBlur: 4 }
          },
          barWidth: 30
        };
      })
    };

    // 最后一个 stack 的顶部圆角
    if (option.series.length) {
      option.series[option.series.length - 1].itemStyle.borderRadius = [3, 3, 0, 0];
    }

    structChartInstance.setOption(option, true);
  }

  /* ============================================================
     区域排名 — Top 10
     ============================================================ */
  function renderRanking(dom, data, state) {
    dom.rankList.innerHTML = "";

    var regs = (data.regions[state.year] || []).slice();
    var field = state.resourceType === "all" ? "total" : state.resourceType;

    // DEBUG
    console.log("[ranking] year=" + state.year + " field=" + field + " regions=" + regs.length);

    regs.sort(function (a, b) { return (b[field] || 0) - (a[field] || 0); });
    var top = regs.slice(0, 10);
    if (!top.length) {
      dom.rankList.innerHTML = '<div style="color:#7e94ab;text-align:center;padding:20px">暂无数据</div>';
      return;
    }

    var maxVal = top[0][field] || 1;

    top.forEach(function (r, i) {
      var item = h("div", "jjj-resource-detail__rank-item");
      var numCls = "jjj-resource-detail__rank-num";
      if (i === 0) numCls += " jjj-resource-detail__rank-num--1";
      else if (i === 1) numCls += " jjj-resource-detail__rank-num--2";
      else if (i === 2) numCls += " jjj-resource-detail__rank-num--3";

      var barColor = getProvinceColor(r.province);
      var pct = ((r[field] || 0) / maxVal * 100).toFixed(0);

      item.innerHTML =
        '<span class="' + numCls + '">' + (i + 1) + '</span>' +
        '<span class="jjj-resource-detail__rank-name" title="' + r.name + '">' + r.name + '</span>' +
        '<span class="jjj-resource-detail__rank-bar-wrap"><span class="jjj-resource-detail__rank-bar" style="width:' + pct + '%;background:' + barColor + '"></span></span>' +
        '<span class="jjj-resource-detail__rank-val">' + formatNum(r[field] || 0) + '</span>';

      dom.rankList.appendChild(item);
    });
  }

  /* ============================================================
     洞察分析
     ============================================================ */
  function renderInsights(dom, data) {
    dom.insightList.innerHTML = "";

    // TODO: 以下分析结论为 mock 展示文本，后续需要根据真实统计数据动态生成
    var insights = data.insights || [];
    insights.forEach(function (ins) {
      var item = h("div", "jjj-resource-detail__insight-item");
      item.innerHTML =
        '<span class="jjj-resource-detail__insight-icon">' + ins.icon + '</span>' +
        '<div class="jjj-resource-detail__insight-content">' +
          '<div class="jjj-resource-detail__insight-title">' + ins.title + '</div>' +
          '<div class="jjj-resource-detail__insight-text">' + ins.text + '</div>' +
        '</div>';
      dom.insightList.appendChild(item);
    });
  }

  /* ============================================================
     区域详情面板
     ============================================================ */
  function renderRegionDetail(dom, data, state) {
    if (!state.selectedRegion) {
      dom.regionDetail.innerHTML = '<div style="color:#7e94ab;text-align:center;padding:20px 0;font-size:12px">点击地图区域查看详情</div>';
      return;
    }

    var regs = data.regions[state.year] || [];
    var region = null;
    for (var i = 0; i < regs.length; i++) {
      if (regs[i].name === state.selectedRegion) { region = regs[i]; break; }
    }
    if (!region) {
      dom.regionDetail.innerHTML = '<div style="color:#7e94ab;text-align:center;padding:20px 0">未找到区域数据</div>';
      return;
    }

    var color = getProvinceColor(region.province);
    var html =
      '<div style="margin-bottom:8px"><span class="jjj-resource-detail__region-badge" style="border-color:' + color + ';color:' + color + '">' +
        region.name +
        '<span class="jjj-resource-detail__region-badge-close" data-action="clear-region">✕</span>' +
      '</span></div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 10px">' +
        '<div>资源总量</div><div style="text-align:right;font-weight:600;color:' + color + '">' + formatNum(region.total) + '</div>' +
        '<div>高校资源</div><div style="text-align:right">' + formatNum(region.higherEd) + '</div>' +
        '<div>基础教育</div><div style="text-align:right">' + formatNum(region.basicEd) + '</div>' +
        '<div>职业教育</div><div style="text-align:right">' + formatNum(region.vocational) + '</div>' +
        '<div>科研资源</div><div style="text-align:right">' + formatNum(region.research) + '</div>' +
        '<div>其他资源</div><div style="text-align:right">' + formatNum(region.other) + '</div>' +
      '</div>';

    dom.regionDetail.innerHTML = html;
  }

  /* ============================================================
     年度下拉填充
     ============================================================ */
  function populateYearSelect(dom, data) {
    dom.yearSel.innerHTML = "";
    (data.years || []).forEach(function (y) {
      var opt = h("option", "", y + " 年");
      opt.value = y;
      if (y === data.currentYear) opt.selected = true;
      dom.yearSel.appendChild(opt);
    });
  }

  function populateTypeSelect(dom, data) {
    // 清除除 "全部" 之外的选项
    while (dom.typeSel.options.length > 1) {
      dom.typeSel.remove(1);
    }
    (data.resourceCategories || []).forEach(function (cat) {
      var opt = h("option", "", cat.name);
      opt.value = cat.key;
      dom.typeSel.appendChild(opt);
    });
  }

  /* ============================================================
     全量渲染
     ============================================================ */
  function renderAll(dom, data, state, geoJson) {
    console.log("[renderAll] year=" + state.year + " type=" + state.resourceType + " region=" + state.selectedRegion);
    console.log("[renderAll] regions[data.year]=" + (data.regions[state.year] ? data.regions[state.year].length + " items" : "null"));
    console.log("[renderAll] regionBreakdown keys=" + Object.keys(data.regionBreakdown[state.year] || {}).join(","));
    renderKPIs(dom, data, state);
    renderMap(dom, data, state, geoJson);
    renderTypeFilter(dom, data, state);
    renderTypeChart(dom, data, state);
    renderStructChart(dom, data, state);
    renderRanking(dom, data, state);
    renderInsights(dom, data);
    renderRegionDetail(dom, data, state);
  }

  /* ============================================================
     事件绑定
     ============================================================ */
  function bindEvents(dom, getState, dataRef, geoJsonRef, callbacks) {
    var handlers = [];

    function on(el, evt, fn) {
      el.addEventListener(evt, fn);
      handlers.push({ el: el, evt: evt, fn: fn });
    }

    // 年度切换
    on(dom.yearSel, "change", function () {
      var state = getState();
      state.year = parseInt(this.value, 10);
      state.selectedRegion = null;
      renderAll(dom, dataRef(), state, geoJsonRef());
      if (callbacks.onFilterChange) callbacks.onFilterChange({ year: state.year, resourceType: state.resourceType });
    });

    // 资源类型下拉
    on(dom.typeSel, "change", function () {
      var state = getState();
      state.resourceType = this.value;
      renderAll(dom, dataRef(), state, geoJsonRef());
      if (callbacks.onFilterChange) callbacks.onFilterChange({ year: state.year, resourceType: state.resourceType });
    });

    // 资源类型标签点击
    on(dom.typeFilter, "click", function (e) {
      var tag = e.target.closest("[data-type]");
      if (!tag) return;
      var state = getState();
      state.resourceType = tag.getAttribute("data-type");
      dom.typeSel.value = state.resourceType;
      renderAll(dom, dataRef(), state, geoJsonRef());
      if (callbacks.onFilterChange) callbacks.onFilterChange({ year: state.year, resourceType: state.resourceType });
    });

    // 地图点击
    if (mapChartInstance) {
      mapChartInstance.on("click", function (params) {
        if (params.seriesType === "map") {
          var state = getState();
          var name = params.name || "";
          // 简化区域名 — "XXX市" → "XXX市"，"XXX区" → "XXX区"
          if (state.selectedRegion === name) {
            state.selectedRegion = null; // 取消选中
          } else {
            state.selectedRegion = name;
          }
          renderAll(dom, dataRef(), state, geoJsonRef());
        }
      });
    }

    // 区域详情面板 — 清除选中
    on(dom.regionDetail, "click", function (e) {
      var close = e.target.closest("[data-action='clear-region']");
      if (!close) return;
      var state = getState();
      state.selectedRegion = null;
      renderAll(dom, dataRef(), state, geoJsonRef());
    });

    // 返回按钮
    on(dom.backBtn, "click", function () {
      if (callbacks.onBack) callbacks.onBack();
    });

    return function unbindAll() {
      handlers.forEach(function (h) { h.el.removeEventListener(h.evt, h.fn); });
      handlers.length = 0;
    };
  }

  /* ============================================================
     ResizeObserver
     ============================================================ */
  function setupResize(dom) {
    var observer = new ResizeObserver(function () {
      if (mapChartInstance) mapChartInstance.resize();
      if (typeChartInstance) typeChartInstance.resize();
      if (structChartInstance) structChartInstance.resize();
    });
    observer.observe(dom.mapChart);
    observer.observe(dom.typeChartArea);
    observer.observe(dom.structChart);
    return observer;
  }

  /* ============================================================
     生命周期：init / update / resize / destroy
     ============================================================ */
  function init(container, data, opts) {
    opts = opts || {};
    var dom = buildDOM(container);
    var state = createState(data);
    var geoJsonData = null;
    var dataRef = data;
    var unbindEvents = null;
    var resizeObserver = null;

    // 初始化图表
    initMap(dom);
    initTypeChart(dom);
    initStructChart(dom);

    // 填充下拉
    populateYearSelect(dom, data);
    populateTypeSelect(dom, data);

    // 加载 GeoJSON，然后渲染
    if (typeof JjjGeoData !== "undefined" && JjjGeoData.fetchGeoJson) {
      JjjGeoData.fetchGeoJson().then(function (geo) {
        geoJsonData = geo;
        renderAll(dom, dataRef, state, geoJsonData);
        // 布局可能在数据渲染后才计算完成，强制 resize
        if (mapChartInstance) mapChartInstance.resize();
        if (typeChartInstance) typeChartInstance.resize();
        if (structChartInstance) structChartInstance.resize();
        // 绑定事件（地图已就绪）
        unbindEvents = bindEvents(dom, function () { return state; }, function () { return dataRef; }, function () { return geoJsonData; }, opts);
      }).catch(function (err) {
        console.error("[jjj-resource-detail] GeoJSON load failed:", err);
        // 使用 fallback
        if (typeof JjjGeoData.buildFallback === "function") {
          geoJsonData = JjjGeoData.buildFallback();
        }
        renderAll(dom, dataRef, state, geoJsonData);
        if (mapChartInstance) mapChartInstance.resize();
        if (typeChartInstance) typeChartInstance.resize();
        if (structChartInstance) structChartInstance.resize();
        unbindEvents = bindEvents(dom, function () { return state; }, function () { return dataRef; }, function () { return geoJsonData; }, opts);
      });
    } else {
      // 没有 GeoJSON 加载器 — 直接渲染
      renderAll(dom, dataRef, state, null);
      unbindEvents = bindEvents(dom, function () { return state; }, function () { return dataRef; }, function () { return geoJsonData; }, opts);
    }

    // ResizeObserver
    resizeObserver = setupResize(dom);

    return {
      update: function (newData) {
        dataRef = newData;
        populateYearSelect(dom, newData);
        populateTypeSelect(dom, newData);
        renderAll(dom, dataRef, state, geoJsonData);
      },

      resize: function () {
        if (mapChartInstance) mapChartInstance.resize();
        if (typeChartInstance) typeChartInstance.resize();
        if (structChartInstance) structChartInstance.resize();
      },

      destroy: function () {
        // 清理事件
        if (unbindEvents) unbindEvents();
        // 清理 ResizeObserver
        if (resizeObserver) resizeObserver.disconnect();
        // 清理 ECharts
        if (mapChartInstance) { mapChartInstance.dispose(); mapChartInstance = null; }
        if (typeChartInstance) { typeChartInstance.dispose(); typeChartInstance = null; }
        if (structChartInstance) { structChartInstance.dispose(); structChartInstance = null; }
        // 清理 DOM
        container.innerHTML = "";
      }
    };
  }

  return { init: init };

})();
