import React from 'react'
import { Avatar, Badge } from 'antd'

const ChatOnline = () => {
  return (
    <div className="chatOnlineFriend">
      <Badge color="green" size="large" dot>
        <Avatar
          size="large"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        />
      </Badge>
      <span className="chatOnlineName">Hoang Phiem</span>
    </div>
  )
}

export default ChatOnline
