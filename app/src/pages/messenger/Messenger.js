import React, { useState, useEffect, useRef } from 'react'
import { Header, Conversations, Message, ChatOnline } from '../../components'
import { Form, Input, Button, Upload, Empty } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { UseAuth, useSocket } from '../../hooks'
import axios from '../../api'
import { io } from 'socket.io-client'

const Messenger = () => {
  const [form] = Form.useForm()
  const { auth } = UseAuth()
  const [conversations, setConversations] = useState([])
  // const [searchConversation, setSeatchConversation] = useState([])

  const [currentChat, setcurrentChat] = useState(null)
  const [messages, setMessages] = useState(null)
  const [newMessage, setNewMessage] = useState(null)
  const scrollRef = useRef()
  const [search, setSearch] = useState(null)

  const socket = useSocket()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const getConversations = async () => {
      await axios
        .get('/conversation/' + auth._id)
        .then((res) => {
          const conversations = res.data
          if (search) {
            setConversations(
              conversations.filter((co) =>
                co.members.find((m) => m.toLowerCase().includes(search)),
              ),
            )
          } else {
            setConversations(res.data)
          }
          // setSeatchConversation(res.data)
        })
        .catch((error) => console.log(error))
    }
    getConversations()
  }, [search, auth._id])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get('message/' + currentChat?._id)
        setMessages(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMessages()
  }, [currentChat])

  const onFinish = async (values) => {
    const message = {
      sender: auth.username,
      text: newMessage,
      conversationId: currentChat._id,
    }
    try {
      const res = await axios.post('/message/newMessage', message)
      setMessages([...messages, res.data])
      setNewMessage('')
      socket.emit('peer-msg', message)
    } catch (err) {
      console.log(err)
    }
  }
 

  useEffect(() => {
    socket.on('peer-msg', function (data) {
      console.log('on peer-msg', data);
    })

    return socket.off('peer-msg')
  }, [])

  // useEffect(() => {
  //   const getConversations = async () => {
  //     await axios
  //       .get('/conversation/' + auth._id)
  //       .then((res) => {
  //         setConversations(res.data)
  //       })
  //       .catch((error) => console.log(error))
  //   }
  //   if (search === null) {
  //     getConversations()
  //     return
  //   }
  //   setConversations(
  //     conversations.filter((co) =>
  //       co.members.find((m) => m.toLowerCase().includes(search)),
  //     ),
  //   )
  // }, [ search, auth._id])

  return (
    <>
      <Header />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <Input
              placeholder="Type a message"
              className="chatMenuInput"
              onChange={(e) => {
                setSearch(e.target.value)
                // console.log(search)
              }}
              value={search}
            />
            {conversations.map((c) => (
              <div
                key={c._id}
                onClick={() => {
                  setcurrentChat(c)
                  // console.log(searchConversation)
                }}
              >
                <Conversations conversation={c} currentUser={auth._id} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        key={m._id}
                        message={m}
                        own={m.sender === auth.username}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <Form
                    name="wrap"
                    className="chatBoxBottomForm"
                    form={form}
                    onFinish={onFinish}
                  >
                    <Form.Item>
                      <Upload>
                        <Button icon={<UploadOutlined />}> </Button>
                      </Upload>
                    </Form.Item>
                    <Form.Item>
                      <Input
                        className="chatMessageInput"
                        placeholder="write something..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button htmlType="submit" type="primary">
                        Send
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </>
            ) : (
              <Empty
                className="empty"
                description={<span>Open a conversation to start a chat</span>}
              />
            )}
          </div>
        </div>

        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger
