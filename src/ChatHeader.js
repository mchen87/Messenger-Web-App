import React from 'react';
import './ChatHeader.css';


function ChatHeader({channelName}) {
  console.log('Rendering ChatHeader with channelName:', channelName);
  return (
    <div className = 'chatHeader'>
     <div className="chatHeader__left">
      <h3>
        <span className='chatHeader__hash'></span>
        { channelName }
      </h3>
    </div>
      <div className="chatHeader__right">
          <div className="chatHeader__search">
          </div>  
      </div>
    </div>
  )
}

export default ChatHeader