// @ts-nocheck
'use client';

import * as React from "react";

const CD = {
  "004": ["AFG", "Afghanistan"], "008": ["ALB", "Albania"], "012": ["DZA", "Algeria"], "024": ["AGO", "Angola"],
  "032": ["ARG", "Argentina"], "036": ["AUS", "Australia"], "040": ["AUT", "Austria"], "031": ["AZE", "Azerbaijan"],
  "050": ["BGD", "Bangladesh"], "056": ["BEL", "Belgium"], "204": ["BEN", "Benin"], "064": ["BTN", "Bhutan"],
  "068": ["BOL", "Bolivia"], "070": ["BIH", "Bosnia and Herz."], "072": ["BWA", "Botswana"], "076": ["BRA", "Brazil"],
  "096": ["BRN", "Brunei"], "100": ["BGR", "Bulgaria"], "854": ["BFA", "Burkina Faso"], "108": ["BDI", "Burundi"],
  "116": ["KHM", "Cambodia"], "120": ["CMR", "Cameroon"], "124": ["CAN", "Canada"], "140": ["CAF", "Central African Rep."],
  "148": ["TCD", "Chad"], "152": ["CHL", "Chile"], "156": ["CHN", "China"], "170": ["COL", "Colombia"],
  "178": ["COG", "Congo"], "180": ["COD", "Dem. Rep. Congo"], "188": ["CRI", "Costa Rica"], "384": ["CIV", "Côte d'Ivoire"],
  "191": ["HRV", "Croatia"], "192": ["CUB", "Cuba"], "196": ["CYP", "Cyprus"], "203": ["CZE", "Czechia"],
  "208": ["DNK", "Denmark"], "262": ["DJI", "Djibouti"], "214": ["DOM", "Dominican Rep."], "218": ["ECU", "Ecuador"],
  "818": ["EGY", "Egypt"], "222": ["SLV", "El Salvador"], "226": ["GNQ", "Eq. Guinea"], "232": ["ERI", "Eritrea"],
  "233": ["EST", "Estonia"], "748": ["SWZ", "Eswatini"], "231": ["ETH", "Ethiopia"], "242": ["FJI", "Fiji"],
  "246": ["FIN", "Finland"], "250": ["FRA", "France"], "266": ["GAB", "Gabon"], "270": ["GMB", "Gambia"],
  "268": ["GEO", "Georgia"], "276": ["DEU", "Germany"], "288": ["GHA", "Ghana"], "300": ["GRC", "Greece"],
  "304": ["GRL", "Greenland"], "320": ["GTM", "Guatemala"], "324": ["GIN", "Guinea"], "624": ["GNB", "Guinea-Bissau"],
  "328": ["GUY", "Guyana"], "332": ["HTI", "Haiti"], "340": ["HND", "Honduras"], "348": ["HUN", "Hungary"],
  "352": ["ISL", "Iceland"], "356": ["IND", "India"], "360": ["IDN", "Indonesia"], "364": ["IRN", "Iran"],
  "368": ["IRQ", "Iraq"], "372": ["IRL", "Ireland"], "376": ["ISR", "Israel"], "380": ["ITA", "Italy"],
  "388": ["JAM", "Jamaica"], "392": ["JPN", "Japan"], "400": ["JOR", "Jordan"], "398": ["KAZ", "Kazakhstan"],
  "404": ["KEN", "Kenya"], "408": ["PRK", "North Korea"], "410": ["KOR", "South Korea"], "414": ["KWT", "Kuwait"],
  "417": ["KGZ", "Kyrgyzstan"], "418": ["LAO", "Laos"], "428": ["LVA", "Latvia"], "422": ["LBN", "Lebanon"],
  "426": ["LSO", "Lesotho"], "430": ["LBR", "Liberia"], "434": ["LBY", "Libya"], "440": ["LTU", "Lithuania"],
  "442": ["LUX", "Luxembourg"], "450": ["MDG", "Madagascar"], "454": ["MWI", "Malawi"], "458": ["MYS", "Malaysia"],
  "466": ["MLI", "Mali"], "478": ["MRT", "Mauritania"], "484": ["MEX", "Mexico"], "498": ["MDA", "Moldova"],
  "496": ["MNG", "Mongolia"], "499": ["MNE", "Montenegro"], "504": ["MAR", "Morocco"], "508": ["MOZ", "Mozambique"],
  "104": ["MMR", "Myanmar"], "516": ["NAM", "Namibia"], "524": ["NPL", "Nepal"], "528": ["NLD", "Netherlands"],
  "554": ["NZL", "New Zealand"], "558": ["NIC", "Nicaragua"], "562": ["NER", "Niger"], "566": ["NGA", "Nigeria"],
  "578": ["NOR", "Norway"], "512": ["OMN", "Oman"], "586": ["PAK", "Pakistan"], "591": ["PAN", "Panama"],
  "598": ["PNG", "Papua New Guinea"], "600": ["PRY", "Paraguay"], "604": ["PER", "Peru"], "608": ["PHL", "Philippines"],
  "616": ["POL", "Poland"], "620": ["PRT", "Portugal"], "634": ["QAT", "Qatar"], "642": ["ROU", "Romania"],
  "643": ["RUS", "Russia"], "646": ["RWA", "Rwanda"], "682": ["SAU", "Saudi Arabia"], "686": ["SEN", "Senegal"],
  "688": ["SRB", "Serbia"], "694": ["SLE", "Sierra Leone"], "702": ["SGP", "Singapore"], "703": ["SVK", "Slovakia"],
  "705": ["SVN", "Slovenia"], "706": ["SOM", "Somalia"], "710": ["ZAF", "South Africa"], "728": ["SSD", "South Sudan"],
  "724": ["ESP", "Spain"], "144": ["LKA", "Sri Lanka"], "729": ["SDN", "Sudan"], "740": ["SUR", "Suriname"],
  "752": ["SWE", "Sweden"], "756": ["CHE", "Switzerland"], "760": ["SYR", "Syria"], "158": ["TWN", "Taiwan"],
  "762": ["TJK", "Tajikistan"], "834": ["TZA", "Tanzania"], "764": ["THA", "Thailand"], "626": ["TLS", "Timor-Leste"],
  "768": ["TGO", "Togo"], "780": ["TTO", "Trinidad and Tobago"], "788": ["TUN", "Tunisia"], "792": ["TUR", "Turkey"],
  "795": ["TKM", "Turkmenistan"], "800": ["UGA", "Uganda"], "804": ["UKR", "Ukraine"], "784": ["ARE", "UAE"],
  "826": ["GBR", "United Kingdom"], "840": ["USA", "United States"], "858": ["URY", "Uruguay"], "860": ["UZB", "Uzbekistan"],
  "862": ["VEN", "Venezuela"], "704": ["VNM", "Vietnam"], "887": ["YEM", "Yemen"], "894": ["ZMB", "Zambia"],
  "716": ["ZWE", "Zimbabwe"], "275": ["PSE", "Palestine"], "807": ["MKD", "North Macedonia"], "051": ["ARM", "Armenia"],
  "112": ["BLR", "Belarus"], "174": ["COM", "Comoros"], "084": ["BLZ", "Belize"], "090": ["SLB", "Solomon Islands"],
  "540": ["NCL", "New Caledonia"], "548": ["VUT", "Vanuatu"], "010": ["ATA", "Antarctica"], "-99": ["XKX", "Kosovo"],
};

const D2R = Math.PI / 180, MLAT = 85.05113;
function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
function merc(lng, lat, s, ox, oy) {
  const p = clamp(lat, -MLAT, MLAT) * D2R;
  return [s * lng * D2R + ox, -s * Math.log(Math.tan(Math.PI / 4 + p / 2)) + oy];
}
function getProj(w, h) {
  const s = w / (2 * Math.PI), ox = w / 2;
  const yN = -s * Math.log(Math.tan(Math.PI / 4 + (72 * D2R) / 2));
  const yS = -s * Math.log(Math.tan(Math.PI / 4 + (-56 * D2R) / 2));
  return [s, ox, h / 2 - (yN + yS) / 2];
}

function decArcs(t) {
  const tf = t.transform;
  if (!tf) return t.arcs;
  const sx = tf.scale[0], sy = tf.scale[1], dx = tf.translate[0], dy = tf.translate[1];
  return t.arcs.map((a) => {
    let x = 0, y = 0;
    return a.map((p) => {
      x += p[0]; y += p[1];
      return [x * sx + dx, y * sy + dy];
    });
  });
}
function resolveRing(idx, arcs) {
  const out = [];
  for (const i of idx) {
    const a = i >= 0 ? arcs[i] : arcs[~i].slice().reverse();
    for (let j = out.length > 0 ? 1 : 0; j < a.length; j++) out.push(a[j]);
  }
  return out;
}
function extractFeatures(t) {
  const arcs = decArcs(t);
  const gs = t.objects.countries?.geometries;
  if (!gs) return [];
  return gs.map((g) => {
    let c = null;
    if (g.type === "Polygon") c = g.arcs.map((r) => resolveRing(r, arcs));
    else if (g.type === "MultiPolygon") c = g.arcs.map((p) => p.map((r) => resolveRing(r, arcs)));
    return { id: String(g.id ?? ""), type: g.type, coords: c };
  });
}

function ringToPath(ring, s, ox, oy, W) {
  if (ring.length < 3) return "";
  const pts = ring.map((c) => merc(c[0], c[1], s, ox, oy));
  const thr = W / 3;
  const segs = [];
  let cur = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    if (Math.abs(pts[i][0] - pts[i - 1][0]) > thr) {
      if (cur.length >= 2) segs.push(cur);
      cur = [pts[i]];
    } else cur.push(pts[i]);
  }
  if (cur.length >= 2) segs.push(cur);
  if (segs.length === 0) return "";
  if (segs.length === 1 && segs[0].length === pts.length)
    return segs[0].map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join("") + "Z";
  return segs.map((seg) => seg.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join("")).join("");
}
function buildPath(type, coords, s, ox, oy, W) {
  if (!coords) return "";
  if (type === "Polygon") return coords.map((r) => ringToPath(r, s, ox, oy, W)).join("");
  if (type === "MultiPolygon") return coords.map((p) => p.map((r) => ringToPath(r, s, ox, oy, W)).join("")).join("");
  return "";
}

function getCentroid(type, coords, s, ox, oy, W) {
  const thr = W / 3;
  let best = null, bestN = 0;
  const check = (ring) => {
    const pts = ring.map((c) => merc(c[0], c[1], s, ox, oy));
    for (let i = 1; i < pts.length; i++)
      if (Math.abs(pts[i][0] - pts[i - 1][0]) > thr) return;
    if (ring.length > bestN) { bestN = ring.length; best = ring; }
  };
  if (type === "Polygon" && coords) coords.forEach(check);
  else if (type === "MultiPolygon" && coords) coords.forEach((p) => p.forEach(check));
  if (!best || best.length === 0) return [-9999, -9999];
  let sx2 = 0, sy2 = 0;
  for (const pt of best) {
    const [px, py] = merc(pt[0], pt[1], s, ox, oy);
    sx2 += px; sy2 += py;
  }
  return [sx2 / best.length, sy2 / best.length];
}

function buildGraticule(s, ox, oy, w, h) {
  const parts = [];
  for (let lat = -60; lat <= 60; lat += 30) {
    const segs = [];
    for (let lng = -180; lng <= 180; lng += 3) {
      const [x, y] = merc(lng, lat, s, ox, oy);
      if (x >= 0 && x <= w && y >= 0 && y <= h)
        segs.push((segs.length === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1));
    }
    if (segs.length > 1) parts.push(segs.join(""));
  }
  for (let lng = -180; lng <= 180; lng += 30) {
    const segs = [];
    for (let lat = -80; lat <= 80; lat += 2) {
      const [x, y] = merc(lng, lat, s, ox, oy);
      if (x >= 0 && x <= w && y >= 0 && y <= h)
        segs.push((segs.length === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1));
    }
    if (segs.length > 1) parts.push(segs.join(""));
  }
  return parts.join(" ");
}

function rgba(c, a) {
  if (!c) return `rgba(0,0,0,${a})`;
  if (c.startsWith("rgba")) return c;
  if (c.startsWith("rgb(")) return c.replace("rgb(", "rgba(").replace(")", "," + a + ")");
  const h = c.replace("#", "");
  if (h.length !== 3 && h.length !== 6) return c;
  const f = h.length === 3 ? h.split("").map((x) => x + x).join("") : h;
  return "rgba(" + parseInt(f.slice(0, 2), 16) + "," + parseInt(f.slice(2, 4), 16) + "," + parseInt(f.slice(4, 6), 16) + "," + a + ")";
}

const DATA_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const defaultMarkers = [
  { label: "Sarajevo", description: "Relay node • Active", latitude: 43.8563, longitude: 18.4131, color: "#E53E3E" },
  { label: "Berlin", description: "Central hub • Online", latitude: 52.52, longitude: 13.405, color: "#E53E3E" },
  { label: "Tokyo", description: "Command post • Standby", latitude: 35.6762, longitude: 139.6503, color: "#E53E3E" },
];

const defaultCountries = [
  { code: "USA", name: "United States", enabled: true },
  { code: "CAN", name: "Canada", enabled: true },
  { code: "BRA", name: "Brazil", enabled: true },
  { code: "GBR", name: "United Kingdom", enabled: true },
  { code: "FRA", name: "France", enabled: true },
  { code: "DEU", name: "Germany", enabled: true },
  { code: "UKR", name: "Ukraine", enabled: true },
  { code: "RUS", name: "Russia", enabled: true },
  { code: "TUR", name: "Turkey", enabled: true },
  { code: "IND", name: "India", enabled: true },
  { code: "CHN", name: "China", enabled: true },
  { code: "JPN", name: "Japan", enabled: true },
  { code: "AUS", name: "Australia", enabled: true },
  { code: "ZAF", name: "South Africa", enabled: true },
];

export default function MilitaryMap(props) {
  const {
    markers = defaultMarkers,
    countries = defaultCountries,
    header = {
      show: true,
      title: "Global Regulatory Intelligence",
      subtitle: "Live Updates",
      titleColor: "#d8ddd9",
      subtitleColor: "#93a098",
    },
    mapStyle = {
      oceanColor: "#0D1B2E",
      landFill: "#0f172a",
      landStroke: "#334155",
      strokeWidth: 0.5,
      hoverColor: "#1e293b",
      disabledColor: "#0058be",
    },
    tooltip = {
      show: true,
      background: "rgba(15, 23, 42, 0.95)",
      textColor: "#FFFFFF",
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    grid = { show: true, color: "#334155", opacity: 0.5 },
    layout = {
      cornerRadius: 0,
      padding: 0,
      showBorder: false,
      borderColor: "transparent",
    },
  } = props;

  const containerRef = React.useRef(null);
  const [dims, setDims] = React.useState({ w: 900, h: 500 });
  const [feats, setFeats] = React.useState(null);
  const [err, setErr] = React.useState(false);
  const [hM, setHM] = React.useState(null);
  const [hC, setHC] = React.useState(null);

  const [transform, setTransform] = React.useState({ k: 1, x: 0, y: 0 });
  const [isPanning, setIsPanning] = React.useState(false);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      setTransform(prev => {
         const factor = Math.exp(-e.deltaY * 0.005);
         const targetK = prev.k * factor;
         const newK = Math.max(1, Math.min(targetK, 15));
         const realFactor = newK / prev.k;
         const r = el.getBoundingClientRect();
         const px = e.clientX - r.left;
         const py = e.clientY - r.top;
         let newX = px - (px - prev.x) * realFactor;
         let newY = py - (py - prev.y) * realFactor;
         if (newK === 1) { newX = 0; newY = 0; }
         return { k: newK, x: newX, y: newY };
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  React.useEffect(() => {
    const onPointerMove = (e) => {
      if (!isPanning) return;
      setTransform(prev => ({
        ...prev,
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    };
    const onPointerUp = () => setIsPanning(false);
    if (isPanning) {
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
    }
    return () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
    };
  }, [isPanning]);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((e) => {
      const r = e[0]?.contentRect;
      if (r && r.width > 0 && r.height > 0) setDims({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    let dead = false;
    fetch(DATA_URL)
      .then((r) => { if (!r.ok) throw 0; return r.json(); })
      .then((t) => { if (!dead) setFeats(extractFeatures(t)); })
      .catch(() => { if (!dead) setErr(true); });
    return () => { dead = true; };
  }, []);

  const { w: W, h: H } = dims;
  const [S, OX, OY] = React.useMemo(() => getProj(W, H), [W, H]);
  const cList = React.useMemo(() => {
    if (!feats) return [];
    const out = [];
    for (const f of feats) {
      const pad = String(f.id).padStart(3, "0");
      const e = CD[pad];
      const a3 = e ? e[0] : pad;
      const nm = e ? e[1] : a3;
      if (a3 === "ATA") continue;
      const d = buildPath(f.type, f.coords, S, OX, OY, W);
      if (!d) continue;
      const [ccx, ccy] = getCentroid(f.type, f.coords, S, OX, OY, W);
      out.push({ id: a3, name: nm, pathD: d, cx: ccx, cy: ccy });
    }
    return out;
  }, [feats, S, OX, OY, W]);

  const grat = React.useMemo(() => buildGraticule(S, OX, OY, W, H), [S, OX, OY, W, H]);
  const cfgMap = React.useMemo(() => {
    const m = new Map();
    countries.forEach((c) => m.set(c.code, c));
    return m;
  }, [countries]);

  const mp = React.useCallback((e) => {
    const r = containerRef.current?.getBoundingClientRect();
    return r ? { x: e.clientX - r.left, y: e.clientY - r.top } : { x: 0, y: 0 };
  }, []);

  const loading = !feats && !err;
  const uid = React.useId().replace(/:/g, "");
  const fG = "g" + uid, fL = "l" + uid, gO = "o" + uid;
  
  const { oceanColor, landFill, landStroke, strokeWidth, hoverColor, disabledColor } = mapStyle;
  const { show: showGrid, color: gridCol, opacity: gridOp } = grid;
  const { cornerRadius, padding: pad, showBorder, borderColor: bCol } = layout;
  const { show: showTooltip, background: ttBg, textColor: ttCol, borderColor: ttBord } = tooltip;
  const { show: showHeader, title: hTitle, subtitle: hSub, titleColor: hTCol, subtitleColor: hSCol } = header;

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => { if (e.button === 0) setIsPanning(true); }}
      style={{
        width: "100%", height: "100%", position: "relative", overflow: "hidden",
        boxSizing: "border-box", borderRadius: cornerRadius, padding: pad,
        background: oceanColor, border: showBorder ? "1px solid " + bCol : "none",
        fontFamily: 'var(--font-mono), monospace', color: hTCol,
        cursor: isPanning ? 'grabbing' : 'grab', touchAction: 'none'
      }}
    >
      <style>{`.mm-c{transition:fill 140ms ease,filter 140ms ease}.mm-c:hover{filter:brightness(1.15)}`}</style>
      
      {showHeader && (
        <div style={{ position: "absolute", top: pad + 20, left: pad + 20, zIndex: 5, pointerEvents: "none", display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: hTCol }}>{hTitle}</div>
          <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: hSCol, opacity: 0.85 }}>{hSub}</div>
        </div>
      )}
      
      {loading && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: rgba(hTCol, 0.4), fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}>Loading map data…</div>
      )}
      
      {err && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6, color: rgba("#ff6b6b", 0.7), fontSize: 12 }}>
          <span>Map data unavailable</span>
          <span style={{ fontSize: 10, opacity: 0.6 }}>Check network access to cdn.jsdelivr.net</span>
        </div>
      )}

      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", borderRadius: Math.max(6, cornerRadius - pad), width: "100%", height: "100%" }}>
        <defs>
          <filter id={fG} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id={fL} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.22 0" />
          </filter>
          <linearGradient id={gO} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={rgba("#000", 0.2)} />
            <stop offset="100%" stopColor={rgba("#000", 0.0)} />
          </linearGradient>
        </defs>

        <rect width={W} height={H} fill="transparent" />
        <rect width={W} height={H} fill={`url(#${gO})`} />
        
        <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
          {showGrid && grat && <path d={grat} fill="none" stroke={gridCol} strokeWidth={0.5} strokeOpacity={gridOp} vectorEffect="non-scaling-stroke" />}
          {cList.length > 0 && (
            <g opacity={0.3} filter={`url(#${fL})`}>
              {cList.map((c, i) => <path key={`sh-${c.id}-${i}`} d={c.pathD} fill={landFill} stroke="none" />)}
            </g>
          )}
          {cList.map((c, i) => {
            const cc = cfgMap.get(c.id);
            const en = cc ? cc.enabled : false;
            let fill = landFill;
            if (en && cc) fill = disabledColor;
            const isHov = hC?.name === c.name;
            return (
              <path
                key={`${c.id}-${i}`}
                d={c.pathD}
                className="mm-c"
                fill={isHov ? hoverColor : fill}
                stroke={landStroke}
                strokeWidth={strokeWidth}
                vectorEffect="non-scaling-stroke"
                style={{ cursor: "default" }}
                onMouseMove={(e) => { const p = mp(e); setHC({ screenX: p.x, screenY: p.y, name: c.name }); }}
                onMouseLeave={() => setHC(null)}
              />
            );
          })}
          {markers.map((m, i) => {
            const [mx, my] = merc(m.longitude, m.latitude, S, OX, OY);
            if (mx < -20 || mx > W + 20 || my < -20 || my > H + 20) return null;
            const sz = 4;
            const col = m.color || "#0058be";
            return (
              <g
                key={`${m.label}-${i}`}
                transform={`translate(${mx.toFixed(1)},${my.toFixed(1)})`}
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => { const p = mp(e); setHM({ screenX: p.x, screenY: p.y, label: m.label, description: m.description }); }}
                onMouseMove={(e) => { const p = mp(e); setHM({ screenX: p.x, screenY: p.y, label: m.label, description: m.description }); }}
                onMouseLeave={() => setHM(null)}
              >
                <circle r={sz * 3} fill={rgba(col, 0.3)} className="animate-pulse" />
                <circle r={sz} fill={col} />
              </g>
            );
          })}
        </g>
      </svg>
      
      {showTooltip && hM && (
        <div style={{ position: "absolute", left: hM.screenX + 14, top: hM.screenY - 14, transform: "translateY(-100%)", background: ttBg, color: ttCol, border: "1px solid " + ttBord, borderRadius: 0, padding: "12px", pointerEvents: "none", zIndex: 20, boxShadow: `0 6px 24px ${rgba("#000", 0.45)}`, backdropFilter: "blur(8px)", display: "flex", flexDirection: "column", gap: 4, maxWidth: 220 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap", fontFamily: "var(--font-mono)" }}>{hM.label}</div>
          {hM.description && <div style={{ fontSize: 11, fontWeight: 400, opacity: 0.8, letterSpacing: "0.02em", lineHeight: 1.35, color: "#94a3b8", fontFamily: "var(--font-mono)" }}>{hM.description}</div>}
        </div>
      )}
      
      {showTooltip && !hM && hC && (
        <div style={{ position: "absolute", left: hC.screenX + 14, top: hC.screenY - 10, transform: "translateY(-100%)", background: ttBg, color: ttCol, border: "1px solid " + ttBord, borderRadius: 0, padding: "8px 12px", fontSize: 12, fontWeight: 600, letterSpacing: "0.03em", whiteSpace: "nowrap", pointerEvents: "none", zIndex: 20, boxShadow: `0 6px 24px ${rgba("#000", 0.45)}`, backdropFilter: "blur(8px)", fontFamily: "var(--font-body)" }}>{hC.name}</div>
      )}
    </div>
  );
}
