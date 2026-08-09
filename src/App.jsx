import { useState, useEffect, useRef } from 'react'

const MY_NUMBER = "212600000000" // << بدل هنا بنمرتك ديال الواتساب

// 200 هدية
const giftEmojis = ["❤️","🌹","💎","👑","🔥","🚀","🦁","🐯","💰","🏆","🎉","💋","🌟","⚡","🎁","🍾","💐","🦄","👏","🥰","😍","🎸","🎤","🏅","💸","🌈","🍓","🍑","💄","👜","👠","💍","🏎️","✈️","🏠","🚁"]
const GIFTS = Array.from({length: 220}, (_, i) => ({
  id: i+1,
  name: `هدية ${i+1}`,
  emoji: giftEmojis[i % giftEmojis.length],
  price: [1,5,10,25,50,100,250,500,1000,2000][i % 10],
}))

export default function App(){
  const [tab, setTab] = useState('live')
  const [coins, setCoins] = useState(5000)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [selectedLive, setSelectedLive] = useState(null)
  const [showGift, setShowGift] = useState(null) // 'live' or 'room'
  const [giftAnims, setGiftAnims] = useState([])
  const [myMic, setMyMic] = useState(null)

  const [rooms, setRooms] = useState([
    { id:1, name:'سهرة مغربية طنجة', host:'Aboubakr', viewers:342, mics: Array(15).fill(null).map((_,i)=> i<3? {id:i, name:`مستمع ${i+1}`, avatar:['👩','👨','🎧'][i]} : null) },
    { id:2, name:'غرفة الضحك والنشاط', host:'Simo', viewers:1250, mics: Array(15).fill(null).map((_,i)=> i<8? {id:i+10, name:`User ${i}`, avatar:'😎'} : null) },
    { id:3, name:'راب مغربي LIVE', host:'El Grande', viewers:5600, mics: Array(15).fill(null) },
  ])

  const [lives, setLives] = useState([
    { id:1, user:'Salma Queen', avatar:'👩‍🎤', viewers:12400, title:'جولة في طنجة 🔴' },
    { id:2, user:'Ayoub Live', avatar:'🧔', viewers:3200, title:'نقاش مفتوح' },
    { id:3, user:'Hala Show', avatar:'🎙️', viewers:8900, title:'تحدي الهدايا اليوم!' },
  ])

  const [posts, setPosts] = useState([
    { id:1, user:'Aboubakr', avatar:'👑', text:'أول بوست فهلا لايف! مرحبا بكم ❤️', image:null, likes:124, time:'منذ دقيقة' },
    { id:2, user:'Salma', avatar:'🌹', text:'شوفو اللوك الجديد', image:'https://picsum.photos/400/400', likes:89, time:'منذ ساعة' },
  ])
  const [newPostText, setNewPostText] = useState('')

  const sendGift = (gift) => {
    if(coins < gift.price){ alert('رصيدك غير كافي! شحن من المحفظة'); return }
    setCoins(c => c - gift.price)
    const anim = { id: Date.now(), emoji: gift.emoji, name: gift.name }
    setGiftAnims(a => [...a, anim])
    // صوت ميرسي
    try{
      const u = new SpeechSynthesisUtterance('Merci!')
      u.lang='fr-FR'; u.rate=1.2; window.speechSynthesis.speak(u)
    }catch{}
    setTimeout(()=> setGiftAnims(a=> a.filter(x=>x.id!==anim.id)), 3000)
    setShowGift(null)
  }

  const joinMic = (roomId, idx) => {
    if(myMic!==null){ alert('انت already فالمايك!') ; return }
    setRooms(rs=> rs.map(r=> r.id===roomId? {...r, mics: r.mics.map((m,i)=> i===idx? {id:999, name:'أنا', avatar:'👑'} : m)} : r))
    setMyMic({roomId, idx})
  }
  const leaveMic = () => {
    if(myMic===null) return
    setRooms(rs=> rs.map(r=> r.id===myMic.roomId? {...r, mics: r.mics.map((m,i)=> i===myMic.idx? null : m)} : r))
    setMyMic(null)
  }

  // واجهة غرفة
  if(selectedRoom){
    return (
      <div dir="rtl" className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
        <div className="p-3 bg-black flex justify-between items-center border-b border-white/10">
          <button onClick={()=>{setSelectedRoom(null); leaveMic()}} className="bg-white/10 px-4 py-1.5 rounded-full text-sm">خروج</button>
          <span className="font-bold">{selectedRoom.name}</span>
          <span className="bg-red-600 px-2 py-1 rounded-full text-xs">👁️ {selectedRoom.viewers}</span>
        </div>

        <div className="flex-1 p-3 grid grid-cols-3 gap-3 content-start overflow-auto">
          {selectedRoom.mics.map((m,i)=>(
            <div key={i} className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center ${m? 'bg-white/10 border-pink-500' : 'bg-white/[0.03] border-white/5 border-dashed'}`}>
              {m? (
                <>
                  <div className="text-3xl">{m.avatar}</div>
                  <div className="text-[10px] mt-1 font-bold truncate w-full text-center px-1">{m.name}</div>
                  <div className="text-[8px] bg-green-600 px-1.5 rounded-full mt-1">مايك {i+1}</div>
                  {myMic?.idx===i && <button onClick={leaveMic} className="text-[9px] mt-1 text-red-400">نزول</button>}
                </>
              ):(
                <button onClick={()=>joinMic(selectedRoom.id,i)} className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">+</div>
                  <div className="text-[9px] mt-1 text-white/30">فارغ {i+1}</div>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="p-3 bg-black/80 backdrop-blur flex gap-2">
          <button onClick={()=>setShowGift('room')} className="bg-gradient-to-r from-pink-600 to-yellow-500 w-12 h-10 rounded-full text-xl">🎁</button>
          <input placeholder="كتب رسالة..." className="flex-1 bg-white/10 rounded-full px-4 text-sm" />
        </div>

        {giftAnims.map(g=>(
          <div key={g.id} className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 animate-bounce">
            <div className="text-7xl animate-pulse">{g.emoji}</div>
          </div>
        ))}

        {showGift && (
          <div className="fixed inset-0 bg-black/80 z-50 flex flex-col justify-end">
            <div className="bg-zinc-900 rounded-t-[24px] p-4 max-h-[70vh] overflow-auto">
              <div className="flex justify-between mb-3"><span className="font-bold">اختر هدية ({GIFTS.length}) - رصيدك: {coins}💰</span><button onClick={()=>setShowGift(null)}>✕</button></div>
              <div className="grid grid-cols-4 gap-2">
                {GIFTS.map(g=>(
                  <button key={g.id} onClick={()=>sendGift(g)} className="bg-white/5 rounded-xl p-2 flex flex-col items-center">
                    <div className="text-2xl">{g.emoji}</div><div className="text-[9px] mt-1">{g.price}💎</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  if(selectedLive){
    return (
      <div dir="rtl" className="min-h-screen bg-black text-white flex flex-col">
        <div className="flex-1 relative bg-zinc-900 flex items-center justify-center text-6xl">
          {selectedLive.avatar}
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <button onClick={()=>setSelectedLive(null)} className="bg-black/50 px-3 py-1 rounded-full text-sm">✕</button>
            <div className="bg-red-600 px-3 py-1 rounded-full text-xs">🔴 {selectedLive.viewers} مشاهد</div>
          </div>
          <div className="absolute bottom-20 left-4 right-4">
            {giftAnims.map(g=> <div key={g.id} className="text-5xl animate-bounce mb-2">{g.emoji} <span className="text-sm">Merci!</span></div>)}
          </div>
        <div className="p-3 flex gap-2 bg-black">
          <button onClick={()=>setShowGift('live')} className="bg-pink-600 px-4 py-2 rounded-full">🎁 هدية</button>
          <input placeholder="تعليق..." className="flex-1 bg-white/10 rounded-full px-4 text-sm" />
        </div>
        {showGift && (
          <div className="fixed inset-0 bg-black/80 z-50 flex flex-col justify-end">
            <div className="bg-zinc-900 rounded-t-[24px] p-4 max-h-[70vh] overflow-auto">
              <div className="flex justify-between mb-3"><b>الهدايا {GIFTS.length}</b><button onClick={()=>setShowGift(null)}>✕</button></div>
              <div className="grid grid-cols-4 gap-2">
                {GIFTS.map(g=> <button key={g.id} onClick={()=>sendGift(g)} className="bg-white/5 rounded-xl p-2"><div className="text-2xl">{g.emoji}</div><div className="text-[9px]">{g.price}💎</div></button>)}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#08080a] text-white pb-20">
      <header className="sticky top-0 z-10 bg-black/90 backdrop-blur p-3 flex justify-between items-center border-b border-white/5">
        <h1 className="font-black text-xl">هلا <span className="text-pink-500">لايف ✨</span></h1>
        <div className="flex gap-2 items-center">
          <span className="bg-white/10 px-3 py-1 rounded-full text-xs">💰 {coins}</span>
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">👑</div>
        </div>
      </header>

      {tab==='live' && (
        <div className="p-3">
          <div className="flex gap-2 mb-4 overflow-auto">
            <button onClick={()=>{const t=prompt('عنوان البث؟'); if(t) setLives([{id:Date.now(), user:'أنا', avatar:'👑', viewers:1, title:t},...lives])}} className="bg-gradient-to-r from-pink-600 to-purple-600 px-5 py-2 rounded-full font-bold whitespace-nowrap">+ فتح لايف</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {lives.map(l=>(
              <div key={l.id} onClick={()=>setSelectedLive(l)} className="bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                <div className="aspect-[4/5] bg-zinc-900 flex items-center justify-center text-4xl relative">{l.avatar}
                  <div className="absolute top-2 right-2 bg-red-600 text-[10px] px-2 py-0.5 rounded-full">LIVE</div>
                  <div className="absolute bottom-2 left-2 bg-black/60 text-[10px] px-2 py-0.5 rounded-full">👁️ {l.viewers}</div>
                </div>
                <div className="p-2"><div className="text-sm font-bold truncate">{l.title}</div><div className="text-xs text-white/50">{l.user}</div></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='rooms' && (
        <div className="p-3">
          <button onClick={()=>{const n=prompt('اسم الغرفة؟'); if(n) setRooms([{id:Date.now(), name:n, host:'أنا', viewers:1, mics:Array(15).fill(null)},...rooms])}} className="w-full bg-white text-black py-3 rounded-full font-black mb-4">+ إنشاء غرفة 15 مايك</button>
          <div className="grid gap-3">
            {rooms.map(r=>(
              <div key={r.id} onClick={()=>setSelectedRoom(r)} className="bg-white/[0.05] border border-white/10 rounded-2xl p-3 flex justify-between items-center">
                <div className="flex items-center gap-3"><div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-xl flex items-center justify-center text-xl">🎙️</div><div><div className="font-bold">{r.name}</div><div className="text-xs text-white/40">{r.host} • {r.mics.filter(Boolean).length}/15 مايك</div></div></div>
                <div className="text-xs bg-black px-3 py-1 rounded-full">👁️ {r.viewers}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='feed' && (
        <div className="p-3">
          <div className="bg-white/5 rounded-2xl p-3 mb-4">
            <textarea value={newPostText} onChange={e=>setNewPostText(e.target.value)} placeholder="شنو كتفكر؟ نشر صورة أو فيديو..." className="w-full bg-black/50 rounded-xl p-3 text-sm min-h-[60px]" />
            <div className="flex justify-between mt-2"><button className="text-xs bg-white/10 px-3 py-1 rounded-full">📷 صورة</button><button onClick={()=>{if(!newPostText) return; setPosts([{id:Date.now(), user:'أنا', avatar:'👑', text:newPostText, image:null, likes:0, time:'الآن'},...posts]); setNewPostText('')}} className="bg-white text-black px-6 py-1.5 rounded-full font-bold text-sm">نشر</button></div>
          </div>
          {posts.map(p=>(
            <div key={p.id} className="bg-white/5 rounded-2xl p-3 mb-3 border border-white/5">
              <div className="flex gap-2 items-center"><div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">{p.avatar}</div><div><div className="text-sm font-bold">{p.user}</div><div className="text-[10px] text-white/40">{p.time}</div></div></div>
              <div className="mt-2 text-sm">{p.text}</div>
              {p.image && <img src={p.image} className="mt-2 rounded-xl w-full" />}
              <div className="flex gap-4 mt-3 text-xs text-white/50"><span>❤️ {p.likes}</span><span>💬 تعليق</span><span>🔗 مشاركة</span></div>
            </div>
          ))}
        </div>
      )}

      {tab==='wallet' && (
        <div className="p-4">
          <div className="bg-gradient-to-br from-pink-600 to-purple-700 rounded-[24px] p-6 text-center">
            <div className="text-sm opacity-80">رصيدك الحالي</div><div className="text-4xl font-black mt-1">💎 {coins}</div><div className="text-xs mt-2 opacity-60">1$ = 1000 عملة</div>
          </div>
          <div className="mt-4 bg-white/5 rounded-2xl p-4 border border-white/10">
            <h3 className="font-bold mb-2">💳 الشحن - تواصل معي مباشرة</h3>
            <p className="text-sm text-white/60 mb-3">أي واحد بغا يشحن، أنا نشحن ليه يدويا. حول المبلغ وصيفط ليا سكرين فالواتساب.</p>
            <div className="bg-black rounded-xl p-3 text-sm">رقمي: {MY_NUMBER}</div>
            <a href={`https://wa.me/${MY_NUMBER}?text=السلام بغيت نشحن في هلا لايف`} target="_blank" className="mt-3 block text-center bg-green-600 py-3 rounded-full font-bold">شحن عبر واتساب 📲</a>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[1000,5000,10000].map(v=> <div key={v} className="bg-white/5 rounded-xl p-2 text-center"><div className="font-bold">{v} 💎</div><div className="text-[10px] text-white/40">${v/1000}</div></div>)}
            </div>
          </div>
          <div className="mt-4 bg-white/5 rounded-2xl p-4">
            <h4 className="font-bold text-sm">💰 كيفاش تربح؟</h4><p className="text-xs text-white/60 mt-1">كل هدية كتوصلك كتتحول لفلوس. 70% ليك و 30% للتطبيق. السحب كل جمعة عبر واتساب.</p>
          </div>
        </div>
      )}

      {tab==='profile' && (
        <div className="p-4 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mx-auto flex items-center justify-center text-3xl">👑</div>
          <div className="font-black mt-3 text-xl">Aboubakr Aouiter</div><div className="text-xs text-white/40">ID: 10001 • طنجة 🇲🇦</div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white/5 rounded-2xl p-3"><div className="font-black text-xl">12</div><div className="text-[10px] text-white/40">لايفات</div></div>
            <div className="bg-white/5 rounded-2xl p-3"><div className="font-black text-xl">1.2K</div><div className="text-[10px] text-white/40">متابعين</div></div>
            <div className="bg-white/5 rounded-2xl p-3"><div className="font-black text-xl">450💎</div><div className="text-[10px] text-white/40">أرباحي</div></div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur border-t border-white/5 flex justify-around p-2">
        {[{k:'live',i:'🔴',t:'لايف'},{k:'rooms',i:'🎙️',t:'الغرف'},{k:'feed',i:'📱',t:'البوستات'},{k:'wallet',i:'💰',t:'المحفظة'},{k:'profile',i:'👤',t:'أنا'}].map(b=>(
          <button key={b.k} onClick={()=>setTab(b.k)} className={`flex flex-col items-center px-3 py-1 rounded-xl ${tab===b.k?'bg-white text-black':''}`}><span>{b.i}</span><span className="text-[10px] mt-0.5">{b.t}</span></button>
        ))}
      </div>
    </div>
  )
                    }
