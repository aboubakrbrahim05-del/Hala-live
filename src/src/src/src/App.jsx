import React, { useState, useRef, useEffect } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

const APP_ID = 1518715896
const SERVER_SECRET = "0a3d5c8b7e9f2a1b4c6d8e0f1a2b3c4d"

function randomID(len=5){
  let s=''; const c='12345abcdef'; for(let i=0;i<len;i++) s+=c.charAt(Math.floor(Math.random()*c.length)); return s;
}

export default function App(){
  const [roomID, setRoomID] = useState('')
  const [inRoom, setInRoom] = useState(false)
  const ref = useRef(null)

  const join = (id) => {
    setRoomID(id)
    setInRoom(true)
  }

  useEffect(()=>{
    if(!inRoom || !ref.current) return
    const userID = randomID(6)
    const userName = "user_"+userID
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(APP_ID, SERVER_SECRET, roomID, userID, userName)
    const zp = ZegoUIKitPrebuilt.create(kitToken)
    zp.joinRoom({
      container: ref.current,
      showPreJoinView: false,
      showLeavingView: false,
      sharedLinks: [],
      scenario: { mode: ZegoUIKitPrebuilt.GroupCall },
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: false,
      showMyCameraToggleButton: true,
      showAudioVideoSettingsButton: false,
      showTextChat: true,
      showUserList: true,
    })
  },[inRoom, roomID])

  if(inRoom){
    return <div style={{width:'100vw',height:'100vh',background:'#000'}}><div ref={ref} style={{width:'100%',height:'100%'}}/></div>
  }

  return(
    <div style={{minHeight:'100vh',background:'#f2fbf5',fontFamily:'system-ui',padding:20,textAlign:'center'}}>
      <h1 style={{color:'#0a7a42',marginTop:30}}>هلا لايف</h1>
      <p style={{color:'#555'}}>مجالس محترمة - بدون إعلانات ولا بوب-اب</p>
      <div style={{maxWidth:380,margin:'30px auto',display:'grid',gap:14}}>
        <button onClick={()=>join('majlis-3am')} style={{padding:18,borderRadius:14,border:'none',background:'#0a7a42',color:'#fff',fontSize:18,fontWeight:'bold'}}>🏠 المجلس العام</button>
        <button onClick={()=>join('quran')} style={{padding:18,borderRadius:14,border:'1px solid #0a7a42',background:'#fff',fontSize:18}}>📖 مجلس القرآن</button>
        <button onClick={()=>join('shabab')} style={{padding:18,borderRadius:14,border:'none',background:'#111',color:'#fff',fontSize:18}}>☕ مجلس الشباب</button>
        <button onClick={()=>join(randomID(6))} style={{padding:14,borderRadius:14,border:'none',background:'#e8e8e8',marginTop:10}}>+ إنشاء غرفة خاصة</button>
      </div>
    </div>
  )
}
