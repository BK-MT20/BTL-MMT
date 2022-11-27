import React from 'react'
import { Avatar, Badge } from 'antd'
import { UseAuth } from '../hooks'

const ChatOnline = () => {
  const { auth } = UseAuth()
  // console.log(auth)
  return (
    <div className="chatOnlineFriend">
      <Badge
        style={{ width: '20px', height: '20px' }}
        color="green"
        size="large"
        dot
      >
        <Avatar
          size="large"
          src="https://ss-images.saostar.vn/wp700/pc/1613810558698/Facebook-Avatar_3.png"
        />
      </Badge>
      <span className="chatOnlineName">{auth?.username}</span>
    </div>
  )
}

export default ChatOnline
