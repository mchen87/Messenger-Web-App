import React, { useEffect, useState } from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { selectChannelId, selectChannelName } from './features/appSlice';
import db from './firebase';
//import { collection, onSnapshot, orderBy, doc, query } from 'firebase/firestore';
import { collection, onSnapshot, orderBy, doc, query, addDoc, serverTimestamp } from 'firebase/firestore';


function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  //const channelDocRef =  doc(db, 'channels', channelId);
  //const messagesCollectionRef = collection(channelDocRef, 'messages');
  //const q = query(messagesCollectionRef, orderBy('timestamp', 'desc'));

useEffect(() => {
  if(channelId){
    const messagesCollectionRef = collection(doc(db, 'channels', channelId), 'messages');
  //const messagesCollectionRef = collection(doc(db, 'channels', channelId), 'messages');
    const q = query(messagesCollectionRef, orderBy('timestamp', 'desc'));
    onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
  })
  }
  }, [channelId]);


const sendMessage = (e) => {
    e.preventDefault();

    const messagesCollectionRef = collection(doc(db, 'channels', channelId), 'messages');
    addDoc(messagesCollectionRef, {
      timestamp: serverTimestamp(),
      message: input,
      user: user,
    })

    setInput('');
};

  return (
    <div className='chat'>
      <ChatHeader channelName = {channelName}/>
        <div className="chat__messages">
          {messages.slice().reverse().map((message) => (
          <Message
          timestamp = {message.timestamp}
          message = {message.message}
          user = {message.user}
          />
          ))}
        </div>
        <div className="chat__input">
          <form>
            <input 
            disabled={!channelId}
            value = {input} 
            onChange = {e => setInput(e.target.value)} 
            placeholder = {`Chat in ${channelName}!`}
            />
            <button  
            disabled={!channelId}
            className = 'chat__inputButton' 
            type = 'submit' 
            onClick={sendMessage}
            >
              Send Message </button>
          </form>
          <div className="chat__inputIcons">
          </div>
        </div>
    </div>
  )
}

export default Chat