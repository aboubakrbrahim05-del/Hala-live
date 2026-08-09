import { useState } from "react";

const roomsMock = [
  { id: 1, name: "أميرة المشرع", city: "المشرع - طنجة", viewers: 342, img: "https://i.pravatar.cc/300?img=5", pk: true },
  { id: 2, name: "نور تطوان", city: "تطوان", viewers: 128, img: "https://i.pravatar.cc/300?img=32", pk: false },
  { id: 3, name: "صالون سارة", city: "طنجة", viewers: 89, img: "https://i.pravatar.cc/300?img=23", pk: true },
  { id: 4, name: "حنان لايف", city: "المشرع", viewers: 210, img: "https://i.pravatar.cc/300?img=16", pk: false },
];

const gifts = [
  { name: "وردة", emoji: "🌹", coins: 10 },
  { name: "قهوة", emoji: "☕", coins: 50 },
  { name: "سيارة", emoji: "🏎️", coins: 500 },
  { name: "أسد", emoji: "🦁", coins: 5000 },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [coins, setCoins] = useState(1250);
  const [earnings, setEarnings] = useState(0);
  const [chat, setChat] = useState([{ user: "النظام", text: "مرحبا بكم في مشرع لايف!" }]);
  const [msg, setMsg] = useState("");
  const [pk, setPk] = useState(false);

  const sendGift = (g) => {
    if (coins < g.coins) return alert("رصيد غير كافي! شحن كوينز");
    setCoins(c => c - g.coins);
    setEarnings(e => e + g.coins * 0.7); // انت كمذيع تربح 70%
    setChat(c => [...c, { user: "أنت", text: `صيفط ${g.emoji} ${g.name}` }]);
  };

  const sendMsg = () => {
    if (!msg) return;
    setChat(c => [...c, { user: "أنت", text: msg }]);
    setMsg("");
  };

  return (
    <div style={{ background: "#0f0f12", color: "white", minHeight: "100vh", fontFamily: "sans-serif" }} dir="rtl">
      <header style={{ padding: 15, display: "flex", justifyContent: "space-between", background: "#1a1a22" }}>
        <b>مشرع لايف 🔴</b>
        <div>💰 {coins} كوينز | 💵 {earnings.toFixed(0)} درهم ربح</div>
      </header>

      {!selected ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: 10 }}>
          {roomsMock.map(r => (
            <div key={r.id} onClick={() => setSelected(r)} style={{ background: "#1e1e28", borderRadius: 12, overflow: "hidden", cursor: "pointer" }}>
              <img src={r.img} style={{ width: "100%", height: 140, objectFit: "cover" }} />
              <div style={{ padding: 8 }}>
                <div>{r.name} {r.pk && <span style={{ background: "#ff0055", padding: "2px 6px", borderRadius: 4, fontSize: 10 }}>PK</span>}</div>
                <small style={{ opacity: 0.6 }}>{r.city} • 👁️ {r.viewers}</small>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div style={{ padding: 10, background: "#000", position: "relative", height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={selected.img} style={{ width: 100, height: 100, borderRadius: "50%", border: "3px solid #ff00aa" }} />
            <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 10, left: 10 }}>✕ رجوع</button>
            {pk && <div style={{ position: "absolute", bottom: 10, width: "90%", background: "#333", borderRadius: 10, display: "flex" }}><div style={{ width: "60%", background: "#ff00aa", padding: 5, borderRadius: 10 }}>أميرة 60%</div><div style={{ width: "40%", padding: 5 }}>نور 40%</div></div>}
          </div>
          <div style={{ padding: 10 }}>
            <button onClick={() => setPk(!pk)} style={{ background: pk ? "#ff0055" : "#333", padding: "5px 10px", borderRadius: 6, marginBottom: 10 }}>{pk ? "إنهاء PK" : "بدء تحدي PK"}</button>
            <div style={{ height: 150, overflowY: "auto", background: "#15151d", padding: 10, borderRadius: 8 }}>
              {chat.map((m, i) => <div key={i}><b>{m.user}: </b>{m.text}</div>)}
            </div>
            <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
              <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="كتب رسالة..." style={{ flex: 1, padding: 8, borderRadius: 8, border: "none" }} />
              <button onClick={sendMsg} style={{ background: "#ff00aa", padding: "8px 12px", borderRadius: 8 }}>إرسال</button>
            </div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", marginTop: 12, paddingBottom: 10 }}>
              {gifts.map(g => (
                <button key={g.name} onClick={() => sendGift(g)} style={{ minWidth: 70, background: "#222", border: "1px solid #333", borderRadius: 10, padding: 8 }}>
                  <div style={{ fontSize: 20 }}>{g.emoji}</div><div>{g.name}</div><small>{g.coins}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
   }
