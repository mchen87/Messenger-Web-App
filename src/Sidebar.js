import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel.js';
import { Avatar } from '@material-ui/core'
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice.js';
import db, { auth } from './firebase.js';
import 'firebase/firestore';
import { onSnapshot, collection, addDoc  } from 'firebase/firestore';

function Sidebar() {
  const user = useSelector(selectUser);
  const [ channels, setChannels ] = useState([]);

  useEffect(() => {
      onSnapshot(collection(db, 'channels'), (snapshot) => 
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
      }))
    )
  );
  }, []);


  const handleAddChannel = () => {
    const channelName = prompt('Enter Channel Name');

    if(channelName) {
      addDoc(collection(db, 'channels'), {
        channelName: channelName,
      })
    }
  };

  return (
    <div className = 'sidebar'>
        <div className='sidebar__top'> 
          <h3>Messenger</h3>
        </div>

        <div className='sidebar__channels'>
          <div className = 'sidebar__channelsHeader'>
            <div className='sidebar__header'>
              <h4>Chats</h4>
            </div>
            <AddIcon onClick={handleAddChannel} className = 'sidebar__addChannel'/>
          </div>

          <div className='sidebar__channelsList'>
              {channels.map(({ id, channel}) => (
              <SidebarChannel 
              key = {id}
              id = {id}
              channelName = {channel.channelName}/>
              ))}
          </div>
        </div>
         
          <div className='sidebar__voice'>

          <div className='sidebar__voiceInfo'>
          </div>

          <div className='sidebar__voiceIcons'>
          </div>
          </div>

          <div className='sidebar__profile'>
            <Avatar onClick={() => auth.signOut()} src = {user.photo}/>
            <div className='sidebar__profileInfo'>
              <h3>{user.displayName}</h3>
              <p>#{user.uid.substring(0,10)}</p>
              <p>Click on PFP to Sign Out!</p>
            </div>

              <div className='sidebar__profileIcons'>
              </div>
          </div>
      </div>
  );
}

export default Sidebar;