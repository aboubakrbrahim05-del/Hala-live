import { useState } from 'react'

export default function App() {
  const [isLive, setIsLive] = useState(false)
  return (
    <div style={{minHeight:'100vh', background:'black', color:'white', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
      <h1 style={{fontSize:'3rem', fontWeight:'bold'}}>🔥 هلا لايف</h1>
      <p style={{margin:'20px'}}>Hala Live V2 - شغال الآن ✅</p>
      <button 
        onClick={() => setIsLive(!isLive)}
        style={{background:'red', padding:'15px 30px', borderRadius:'30px', fontSize:'20px', border:'none', color:'white'}}
      >
        {isLive ? 'إيقاف' : 'ابدأ البث'}
      </button>
      {isLive && <div style={{marginTop:'20px', color:'#00ff00', fontSize:'24px'}}>🔴 LIVE</div>}
    </div>
  )
      }
