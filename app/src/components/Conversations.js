import { useEffect, useState } from 'react'
import React from 'react'
import axios from '../api'

const Conversations = ({ active, conversation, currentUser }) => {
  const [user, setUser] = useState(null)
  // console.log(conversation)
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser)

    const getUser = async () => {
      try {
        const res = await axios.get('/getUser?userId=' + friendId)
        // console.log(res.data)
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [currentUser, conversation])

  return (
    <div className={`conversation ${active ? 'chat-item-active' : ''}`}>
      <img className="conversationImg" src={user?.avartar} alt="" />
      <span className="conversationName">{user?.username}</span>
    </div>
  )
}

export default Conversations
