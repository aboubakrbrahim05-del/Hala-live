import { useState } from 'react'

export default function App() {
  const [msg,setMsg]=useState('')
  const [chat,setChat]=useState(['أهلا في هلا لايف 🔥'])
  return (
    <div dir="rtl" style={{background:'#0f0f0f',color:'white',minHeight:'100vh',padding:'20px'}}>
      <h1 style={{textAlign:'center'}}>🎥 هلا لايف</h1>
      <div style={{maxWidth:'500px',margin:'auto',background:'#1e1e1e',padding:'15px',borderRadius:'15px'}}>
        {chat.map((c,i)=><div key={i} style={{background:'#2a2a2a',margin:'5px',padding:'8px',borderRadius:'8px'}}>{c}</div>)}
        <div style={{display:'flex',gap:'8px',marginTop:'10px'}}>
          <input value={msg} onChange={e=>setMsg(e.target.value)} style={{flex:1,padding:'8px',borderRadius:'8px'}} placeholder="كتب رسالة..." />
          <button onClick={()=>{if(msg){setChat([...chat,msg]);setMsg('')}}} style={{background:'#ff0050',color:'white',border:'none',padding:'8px 15px',borderRadius:'8px'}}>إرسال</button>
        </div>
      </div>
    </div>
  )
      }
