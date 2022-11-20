import React from 'react'
import { Header, Conversations, Message, ChatOnline } from '../../components'
import { Form, Input, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const Messenger = () => {
  const [form] = Form.useForm()
  return (
    <>
      <Header />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <Form form={form} onFinish={''}>
              <Form.Item>
                <Input
                  placeholder="Type a message"
                  className="chatMenuInput"
                ></Input>
              </Form.Item>
            </Form>
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
            </div>
            <div className="chatBoxBottom">
              <Form
                name="wrap"
                className="chatBoxBottomForm"
                form={form}
                onFinish={''}
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
                  />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Send
                  </Button>
                </Form.Item>
              </Form>
            </div>
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
