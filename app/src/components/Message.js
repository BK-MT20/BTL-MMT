import React from 'react'
import { format } from 'timeago.js'
const Message = ({ message, own }) => {
  return (
    <div className={own ? 'message own' : 'message friend'}>
      <div className="messageTop">
        <img
          className={own ? 'messageImg-own' : 'messageImg '}
          src="https://ss-images.saostar.vn/wp700/pc/1613810558698/Facebook-Avatar_3.png"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message
