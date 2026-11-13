import React from "react";
import { AbsoluteFill, Audio, interpolate, useCurrentFrame, Easing } from "remotion";

const AUDIO_URL = "https://raw.githubusercontent.com/yrfwpowerytyy-art/Mn-pover-poorya-./main/public/audio/narration.mp3";
const DURATION = 68;
const snow = Array.from({ length: 54 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i * 17) % 110,
  size: 2 + (i % 5),
  speed: 0.7 + (i % 4) * 0.28,
}));

const Person: React.FC<{ x:number; y:number; scale?:number; coat?:string; skin?:string; pose?: "walk"|"stand"|"carry"; frame:number }> = ({x,y,scale=1,coat="#c6533d",skin="#d9a078",pose="stand",frame}) => {
  const swing = pose === "walk" ? Math.sin(frame/5)*13 : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="5" rx="32" ry="9" fill="#526d7d" opacity=".22"/>
      <path d={`M-18 -108 Q-27 -88 -24 -46 L-18 -18 L18 -18 L24 -47 Q26 -87 16 -108Z`} fill={coat} stroke="#344b5a" strokeWidth="3"/>
      <path d="M-17 -102 L0 -80 L16 -102" fill="none" stroke="#f4d6bb" strokeWidth="7"/>
      <circle cx="0" cy="-128" r="19" fill={skin} stroke="#684f43" strokeWidth="2"/>
      <path d="M-20 -136 Q-13 -158 8 -150 Q21 -145 19 -132 Q4 -142 -9 -134Z" fill="#493b34"/>
      <path d={`M-13 -18 L-18 0 L-20 36 L-5 36 L0 0 L7 36 L22 36 L17 -18Z`} fill="#293f50" stroke="#243847" strokeWidth="3"/>
      <path d={`M-22 -92 L-35 -56 L-31 -35 M22 -92 L35 -58 L${pose==="carry"?48:31} -43`} fill="none" stroke={coat} strokeWidth="12" strokeLinecap="round"/>
      <path d={`M-20 35 L-27 43 L-4 43 L-3 35 M15 35 L10 43 L34 43 L28 35`} fill="#302c2b"/>
      {pose==="carry" && <g transform="translate(49 -37)"><rect x="-13" y="-16" width="27" height="31" rx="3" fill="#bd8a4d" stroke="#72502e" strokeWidth="2"/><path d="M-10 -8 H11 M-10 0 H11" stroke="#f3d5a0" strokeWidth="3"/></g>}
      <g transform={`translate(0 0) rotate(${swing})`} />
    </g>
  );
};

const City: React.FC<{frame:number}> = ({frame}) => {
  const drift = interpolate(frame,[0,2040],[0,-52],{extrapolateRight:"clamp"});
  return <div style={{position:"absolute",inset:0,transform:`translateX(${drift}px)`}}>
    <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#8ec5e8"/><stop offset=".52" stopColor="#e5b6a0"/><stop offset="1" stopColor="#e8edf0"/></linearGradient>
        <linearGradient id="snowRoad" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#e9f1f3"/><stop offset="1" stopColor="#9fb6c2"/></linearGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#sky)"/>
      <circle cx="830" cy="340" r="110" fill="#ffe2b2" opacity=".75"/>
      <path d="M0 900 L1080 850 L1080 1920 L0 1920Z" fill="url(#snowRoad)"/>
      <g stroke="#56616a" strokeWidth="5">
        <path d="M-30 600 L220 520 L420 600 L420 1280 L-30 1280Z" fill="#c77f63"/>
        <path d="M390 510 L600 440 L820 510 L820 1260 L390 1260Z" fill="#d6c5a2"/>
        <path d="M790 650 L940 600 L1110 650 L1110 1290 L790 1290Z" fill="#6d9b9c"/>
        <path d="M-20 590 L220 510 L440 590" fill="none" stroke="#f5eee3" strokeWidth="26"/>
        <path d="M380 500 L600 430 L835 500" fill="none" stroke="#f4e9d5" strokeWidth="25"/>
        <path d="M780 640 L940 585 L1120 640" fill="none" stroke="#e5efeb" strokeWidth="25"/>
      </g>
      <g fill="#334f61">
        {Array.from({length:24},(_,i)=><rect key={i} x={18+(i%6)*62} y={690+Math.floor(i/6)*115} width="31" height="53" rx="4"/>)}
        {Array.from({length:24},(_,i)=><rect key={"b"+i} x={430+(i%6)*58} y={610+Math.floor(i/6)*115} width="29" height="52" rx="4"/>)}
        {Array.from({length:12},(_,i)=><rect key={"c"+i} x={830+(i%4)*58} y={740+Math.floor(i/4)*115} width="28" height="52" rx="4"/>)}
      </g>
      <path d="M0 1270 Q250 1200 520 1275 T1080 1245 L1080 1920 L0 1920Z" fill="#f6fbfc"/>
      <path d="M0 1480 Q260 1380 540 1470 T1080 1440" fill="none" stroke="#fff" strokeWidth="38" opacity=".85"/>
    </svg>
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 1080 1920">
      <Person x={260} y={1470} scale={1.18} coat="#b84e38" pose="walk" frame={frame}/>
      <Person x={470} y={1495} scale={.98} coat="#347b88" pose="stand" frame={frame}/>
      <Person x={790} y={1470} scale={1.1} coat="#d2a24e" pose="carry" frame={frame}/>
      <path d="M100 1520 H980" stroke="#8fa8b4" strokeWidth="8" opacity=".5"/>
    </svg>
  </div>;
};

const Shop: React.FC<{frame:number}> = ({frame}) => <div style={{position:"absolute",inset:0,opacity:interpolate(frame,[390,450,930,990],[0,1,1,0],{extrapolateRight:"clamp"})}}>
  <div style={{position:"absolute",inset:0,background:"linear-gradient(145deg,#f1dfc6,#c9d8d5 55%,#829da4)"}}/>
  <div style={{position:"absolute",top:300,left:55,right:55,height:900,background:"#f7f0df",border:"14px solid #7e6752",borderRadius:24,boxShadow:"0 30px 60px #425b6540"}}/>
  <div style={{position:"absolute",top:360,left:90,right:90,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
    {["#d45b42","#e4b64e","#6d9b73","#6e91b8"].map((c,i)=><div key={i} style={{height:180,background:c,borderRadius:14,border:"5px solid #fff",boxShadow:"0 7px 12px #314b5530"}}/>)}
  </div>
  {[0,1,2].map(row=><div key={row} style={{position:"absolute",top:590+row*205,left:90,right:90,height:18,background:"#876b50",borderRadius:9}}/>)}
  <div style={{position:"absolute",top:640,left:110,right:110,display:"flex",gap:18,justifyContent:"space-around"}}>
    {Array.from({length:15},(_,i)=><div key={i} style={{width:45,height:95,marginTop:(i%3)*13,background:["#d9a441","#b94f43","#739b78","#d5e0e3"][i%4],borderRadius:"9px 9px 5px 5px",border:"3px solid #f8f3e9"}}/>)}
  </div>
  <div style={{position:"absolute",bottom:240,left:0,right:0,display:"flex",justifyContent:"space-evenly",alignItems:"end"}}>
    <svg width="80%" height="360" viewBox="0 0 800 360"><Person x={210} y={320} scale={1.45} coat="#bd5543" pose="carry" frame={frame}/><Person x={520} y={320} scale={1.3} coat="#3c718a" pose="stand" frame={frame}/></svg>
  </div>
</div>;

const Snow: React.FC<{frame:number}> = ({frame}) => <>{snow.map((s,i)=>{
  const y=((frame*s.speed+s.delay*16)%2050)-50;
  return <div key={i} style={{position:"absolute",left:s.left+"%",top:y,width:s.size,height:s.size,borderRadius:99,background:"rgba(255,255,255,.92)",boxShadow:"0 0 10px #fff"}}/>;
})}</>;

const Caption: React.FC<{frame:number;start:number;end:number;title:string;sub?:string}> = ({frame,start,end,title,sub}) => {
  const opacity=interpolate(frame,[start,start+16,end-16,end],[0,1,1,0],{extrapolateRight:"clamp"});
  return <div style={{position:"absolute",top:260,left:55,right:55,textAlign:"center",direction:"rtl",opacity,transform:`translateY(${(1-opacity)*22}px)`}}>
    <div style={{display:"inline-block",padding:"22px 34px",borderRadius:28,background:"rgba(255,250,239,.92)",border:"2px solid rgba(255,255,255,.95)",boxShadow:"0 18px 50px #334c5a25"}}>
      <div style={{fontSize:49,fontWeight:950,color:"#263f4c",lineHeight:1.45}}>{title}</div>
      {sub&&<div style={{fontSize:28,fontWeight:750,color:"#6a6258",marginTop:10}}>{sub}</div>}
    </div>
  </div>;
};

export const ColdEarth: React.FC = () => {
  const frame=useCurrentFrame();
  const seconds=frame/30;
  const cold=interpolate(frame,[0,280,600,2040],[0,.35,.8,1],{extrapolateRight:"clamp"});
  const budget=interpolate(frame,[930,1020,1740],[0,1,1],{extrapolateRight:"clamp"});
  return <AbsoluteFill style={{background:"#dbe9ed",fontFamily:"Arial, sans-serif",overflow:"hidden"}}>
    <Audio src={AUDIO_URL} volume={1}/>
    <City frame={frame}/>
    <Shop frame={frame}/>
    <div style={{position:"absolute",inset:0,background:`rgba(145,190,215,${cold*.18})`,pointerEvents:"none"}}/>
    <Snow frame={frame}/>
    <div style={{position:"absolute",top:62,left:55,right:55,display:"flex",justifyContent:"space-between",fontSize:24,fontWeight:900,color:"#344e5c",textShadow:"0 1px 0 #fff"}}>
      <span>WHAT IF?</span><span>−۵۰°C</span>
    </div>
    <Caption frame={frame} start={0} end={270} title="تصور کن فردا صبح..." sub="دمای زمین به منفی ۵۰ درجه رسیده"/>
    <Caption frame={frame} start={285} end={600} title="شهر در چند ساعت یخ می‌زند" sub="مردم برای خرید آخرین وسایل ضروری عجله دارند"/>
    <Caption frame={frame} start={615} end={960} title="فروشگاه‌ها به‌سرعت خالی می‌شوند" sub="باید هوشمندانه انتخاب کنی"/>
    <div style={{position:"absolute",top:1060,left:70,right:70,opacity:budget,transform:`scale(${.96+budget*.04})`,textAlign:"center",direction:"rtl"}}>
      <div style={{display:"inline-block",padding:"24px 38px",borderRadius:26,background:"rgba(255,250,239,.94)",boxShadow:"0 18px 50px #263f4c30"}}>
        <div style={{fontSize:28,color:"#786d5d",fontWeight:800}}>بودجه‌ی تو</div>
        <div style={{fontSize:70,color:"#2e604f",fontWeight:950}}>۱۰ میلیون تومان</div>
      </div>
    </div>
    <Caption frame={frame} start={1050} end={1480} title="فقط چیزهای ضروری را بردار" sub="غذا، آب و وسایل موردنیاز"/>
    <Caption frame={frame} start={1490} end={1770} title="برق ممکن است هر لحظه قطع شود" sub="برای سرمای طولانی آماده شو"/>
    <Caption frame={frame} start={1780} end={2040} title="اولین تصمیم تو چیست؟" sub="آمادگی، از همین لحظه شروع می‌شود"/>
    <div style={{position:"absolute",inset:0,pointerEvents:"none",boxShadow:"inset 0 0 100px rgba(55,83,94,.12)"}}/>
  </AbsoluteFill>;
};
