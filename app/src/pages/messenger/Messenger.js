import React, { useState, useEffect, useRef } from 'react'
import { Header, Conversations, Message, ChatOnline } from '../../components'
import { Form, Input, Button, Upload, Empty, message, Space, Tag, Typography } from 'antd'
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
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef()
  const [search, setSearch] = useState('')
  const [files, setFiles] = useState([])

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
          if(search) {
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
      } catch(err) {
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
      socket.emit('peer-msg', res.data)
      if(files.length > 0) {
        socket.emit('peer-files', { id: res.data._id, files })
      }
      console.log({ message: { ...res.data, files } })

      setMessages([...messages, { ...res.data, files }])
      setNewMessage('')
      setFiles([])
    } catch(err) {
      console.log(err)
    }
  }


  useEffect(() => {
    socket.on('peer-msg', (data) => {
      console.log('on peer-msg', data);
      setMessages([...messages, data])
    })

    socket.on('peer-files', function (data) {
      console.log('on peer-files', data);
      setMessages(messages.map(m => {
        if(m._id === data.id) {
          m.files = data.files
        }
        return m
      }))
    })

    return () => {
      socket.off('peer-msg')
      socket.off('peer-files')
    }
  }, [messages])

  const readFile = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
    }
    );

  const props = {
    name: 'file',
    customRequest({ file, onSuccess }) {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    },
    beforeUpload(file, fileList) {
      if (files.length > 2) {
        message.warning('Too much file!')
        return false
      }
    },
    showUploadList: false,
    onChange(info) {
      if(info.file.status === 'done') {
        const convertFile = async () => {
          const src = await readFile(info.file.originFileObj)
          if(src.byteLength > 1e7) {
            message.warning(`${info.file.name} file is grater than 10MB!`)
            return
          }
          const file = {
            uid: info.file.uid,
            name: info.file.name,
            type: info.file.type,
            src: src,
          }
          console.log(file);
          setFiles([...files, file])
          message.success(`${info.file.name} file uploaded successfully`);
        }

        convertFile()
      } else if(info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  const handleFileClose = (uid) => {
    setFiles(files.filter(f => f.uid !== uid))
  }

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
                    <div key={m._id} ref={scrollRef}>
                      <Message
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
                      <Upload {...props}>
                        <Button><UploadOutlined /></Button>
                      </Upload>
                    </Form.Item>
                    <Form.Item>
                      <div className='chat-input-container'>
                        <Space className='files-container' direction='horizontal'>
                          {files.map(file => (
                            <span key={file.uid}>
                              <Tag className='file-item' color='blue' closable onClose={() => handleFileClose(file.uid)}>
                                <Typography.Text style={{ maxWidth: '100px'}} ellipsis>{file.name}</Typography.Text>
                              </Tag>
                            </span>
                          ))}
                        </Space>
                        <Input
                          bordered={false}
                          className="chatMessageInput"
                          placeholder="write something..."
                          onChange={(e) => setNewMessage(e.target.value)}
                          value={newMessage}
                        />
                      </div>
                    </Form.Item>
                    <Form.Item>
                      <Button disabled={!newMessage && files.lenth === 0} htmlType="submit" type="primary">
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
