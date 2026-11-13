import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

const snow = Array.from({ length: 42 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i * 13) % 90,
  size: 3 + (i % 5),
  speed: 1 + (i % 4) * 0.35,
}));

const SceneTitle: React.FC<{ children: React.ReactNode; subtitle?: string }> = ({ children, subtitle }) => (
  <div style={{ position: "absolute", top: 210, left: 70, right: 70, textAlign: "center", direction: "rtl" }}>
    <div style={{ color: "#102b46", fontSize: 72, fontWeight: 900, lineHeight: 1.35, textShadow: "0 5px 0 rgba(255,255,255,.7)" }}>{children}</div>
    {subtitle && <div style={{ marginTop: 22, color: "#426783", fontSize: 32, fontWeight: 700 }}>{subtitle}</div>}
  </div>
);

const Snow: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    {snow.map((s, i) => {
      const y = ((frame * s.speed + s.delay * 12) % 2200) - 100;
      return <div key={i} style={{ position: "absolute", left: s.left + "%", top: y, width: s.size, height: s.size, borderRadius: 99, background: "rgba(255,255,255,.9)", boxShadow: "0 0 12px rgba(255,255,255,.8)" }} />;
    })}
  </>
);

const City: React.FC<{ frame: number }> = ({ frame }) => {
  const drift = interpolate(frame, [0, 1050], [0, -34], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", bottom: 0, width: "100%", height: 820, transform: `translateX(${drift}px)` }}>
      <svg width="100%" height="100%" viewBox="0 0 1080 820" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="building" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#d8eaf5"/><stop offset="1" stopColor="#8db5d1"/></linearGradient>
          <linearGradient id="snowground" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#f7fcff"/><stop offset="1" stopColor="#b8d8eb"/></linearGradient>
        </defs>
        <path d="M0 480 L1080 430 L1080 820 L0 820Z" fill="url(#snowground)"/>
        <g fill="url(#building)" stroke="#739ab7" strokeWidth="5">
          <path d="M30 280 L210 230 L390 280 L390 620 L30 620Z"/>
          <path d="M420 210 L600 160 L780 210 L780 620 L420 620Z"/>
          <path d="M810 300 L930 260 L1050 300 L1050 620 L810 620Z"/>
        </g>
        <g fill="#f5fbff" opacity=".95">
          <path d="M20 280 L210 220 L400 280 L390 300 L210 255 L30 300Z"/>
          <path d="M410 210 L600 150 L790 210 L780 230 L600 185 L420 230Z"/>
          <path d="M800 300 L930 250 L1060 300 L1050 320 L930 285 L810 320Z"/>
        </g>
        <g fill="#4f7898">
          {Array.from({length: 18}, (_,i) => <rect key={i} x={62+(i%6)*52} y={330+Math.floor(i/6)*95} width="24" height="42" rx="5"/>)}
          {Array.from({length: 18}, (_,i) => <rect key={i} x={452+(i%6)*52} y={265+Math.floor(i/6)*100} width="24" height="44" rx="5"/>)}
          {Array.from({length: 8}, (_,i) => <rect key={i} x={845+(i%4)*48} y={355+Math.floor(i/4)*100} width="22" height="42" rx="5"/>)}
        </g>
        <path d="M0 620 Q270 560 540 620 T1080 610 L1080 820 L0 820Z" fill="#eaf6fc"/>
        <path d="M0 700 Q260 640 520 700 T1080 680" fill="none" stroke="#fff" strokeWidth="20" opacity=".8"/>
      </svg>
    </div>
  );
};

const Thermometer: React.FC<{ frame: number }> = ({ frame }) => {
  const scale = interpolate(frame, [0, 170, 300], [0, 1, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <div style={{ position: "absolute", top: 590, left: 110, right: 110, display: "flex", justifyContent: "center", alignItems: "center", gap: 24 }}>
      <div style={{ width: 24, height: 230, borderRadius: 30, border: "7px solid #fff", background: "rgba(90,155,195,.25)", overflow: "hidden", display: "flex", alignItems: "end" }}>
        <div style={{ width: "100%", height: 180*scale, background: "#3a9ee8", borderRadius: 20, boxShadow: "0 0 30px #65c8ff" }}/>
      </div>
      <div style={{ color: "#0c3658", fontSize: 116, fontWeight: 950, letterSpacing: -5, textShadow: "0 5px 0 #fff" }}>−۵۰°</div>
    </div>
  );
};

const MoneyCard: React.FC<{ frame: number }> = ({ frame }) => {
  const show = interpolate(frame, [520, 570, 1020, 1050], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 560, left: 90, right: 90, opacity: show, transform: `translateY(${(1-show)*35}px)`, background: "rgba(255,255,255,.88)", border: "3px solid rgba(255,255,255,.95)", borderRadius: 34, padding: "28px 34px", boxShadow: "0 24px 70px rgba(28,78,111,.15)", direction: "rtl", textAlign: "center" }}>
      <div style={{ color: "#5b7d96", fontSize: 30, fontWeight: 800 }}>بودجه‌ی تو</div>
      <div style={{ color: "#0c426d", fontSize: 76, fontWeight: 950, marginTop: 8 }}>۱۰ میلیون تومان</div>
      <div style={{ color: "#397da9", fontSize: 27, marginTop: 10 }}>برای آماده شدن در سرمای شدید</div>
    </div>
  );
};

export const ColdEarth: React.FC = () => {
  const frame = useCurrentFrame();
  const introOpacity = interpolate(frame, [0, 20, 145, 175], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const shopOpacity = interpolate(frame, [300, 340, 500, 535], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const endOpacity = interpolate(frame, [850, 900, 1050], [0, 1, 1], { extrapolateRight: "clamp" });
  const pulse = 1 + Math.sin(frame / 8) * 0.018;

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg,#d9f0ff 0%,#a8d3ec 52%,#f4fbff 100%)", fontFamily: "Arial, sans-serif", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 30%,rgba(255,255,255,.9),transparent 48%)" }}/>
      <City frame={frame}/>
      <Snow frame={frame}/>
      <div style={{ position: "absolute", top: 70, left: 70, right: 70, display: "flex", justifyContent: "space-between", color: "#47718f", fontSize: 25, fontWeight: 900, letterSpacing: 2 }}>
        <span>WHAT IF?</span><span>01 / 30</span>
      </div>
      <div style={{ opacity: introOpacity }}>
        <SceneTitle subtitle="فقط یک شب تا تغییر همه‌چیز">اگه فردا صبح...</SceneTitle>
        <Thermometer frame={frame}/>
      </div>
      <div style={{ position: "absolute", top: 900, left: 70, right: 70, textAlign: "center", direction: "rtl", opacity: shopOpacity, transform: `scale(${pulse})` }}>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,.9)", borderRadius: 28, padding: "24px 38px", color: "#123c5c", fontSize: 48, fontWeight: 950, boxShadow: "0 15px 50px rgba(25,80,120,.12)" }}>فروشگاه‌ها در آستانه‌ی خالی شدن‌اند!</div>
      </div>
      <MoneyCard frame={frame}/>
      <div style={{ position: "absolute", bottom: 190, left: 65, right: 65, textAlign: "center", direction: "rtl", opacity: endOpacity }}>
        <div style={{ color: "#103d61", fontSize: 54, lineHeight: 1.5, fontWeight: 950, textShadow: "0 3px 0 #fff" }}>اولین کاری که می‌کنی چیه؟</div>
        <div style={{ color: "#47718f", fontSize: 26, fontWeight: 800, marginTop: 14 }}>تصمیم تو می‌تونه همه‌چیز رو تغییر بده</div>
      </div>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", boxShadow: "inset 0 0 100px rgba(37,94,130,.12)" }}/>
    </AbsoluteFill>
  );
};
