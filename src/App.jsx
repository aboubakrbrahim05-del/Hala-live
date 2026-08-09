import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  const [coins, setCoins] = useState(1250);

  if (page === "live") {
    return (
      <div dir="rtl" style={{background:"#0f0f12", color:"white", minHeight:"100vh", padding:20}}>
        <button onClick={()=>setPage("home")} style={{background:"#333", color:"white", padding:8, borderRadius:8}}>رجوع</button>
        <h2 style={{textAlign:"center", marginTop:20}}>🔴 أميرة المشرع لايف</h2>
        <p style={{textAlign:"center"}}>البث المباشر خدام!</p>
        <div style={{background:"#1a1a22", padding:15, borderRadius:10, marginTop:20}}>
          <p>💰 كوينز: {coins}</p>
          <button onClick={()=>setCoins(c=>c+100)} style={{background:"#ff00aa", padding:10, width:"100%", borderRadius:8, color:"white", border:"none", marginTop:10}}>شحن 100 كوينز (تجريبي)</button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" style={{background:"#0f0f12", color:"white", minHeight:"100vh"}}>
      <div style={{background:"#1a1a22", padding:15, display:"flex", justifyContent:"space-between"}}>
        <b>مشرع لايف 🔴</b>
        <span>💰 {coins}</span>
      </div>
      <div style={{padding:15, display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
        <div onClick={()=>setPage("live")} style={{background:"#1e1e28", borderRadius:12, padding:10, textAlign:"center", cursor:"pointer"}}>
          <div style={{fontSize:50}}>👩‍🦰</div>
          <div>أميرة المشرع</div>
          <small style={{opacity:0.6}}>342 مشاهد</small>
        </div>
        <div onClick={()=>setPage("live")} style={{background:"#1e1e28", borderRadius:12, padding:10, textAlign:"center"}}>
          <div style={{fontSize:50}}>👩</div>
          <div>نور تطوان</div>
          <small style={{opacity:0.6}}>128 مشاهد</small>
        </div>
      </div>
      <p style={{textAlign:"center", opacity:0.5, marginTop:30}}>ورك على أي روم باش تدخل</p>
    </div>
  );
                                     }
