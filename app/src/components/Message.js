import { FileOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import Moment from 'moment'

const Message = ({ message, own }) => {
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const onFileClick = (file) => {
    console.log('click file', file)

    const fileBytes = new Uint8Array(file.src)
    const blob = new window.Blob([fileBytes], { type: file.type })
    const urlCreator = window.URL || window.webkitURL
    const fileUrl = urlCreator.createObjectURL(blob)
    const a = document.createElement('a')

    a.style.display = 'none'
    a.href = fileUrl
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(fileUrl)
  }
  return (
    <>
      {message.files.map((file, index) => (
        <div
          key={`message-file-${file.name + index}`}
          className={own ? 'message own' : 'message friend'}
        >
          <div className="messageTop">
            <img
              className={own ? 'messageImg-own' : 'messageImg '}
              src="https://ss-images.saostar.vn/wp700/pc/1613810558698/Facebook-Avatar_3.png"
              alt=""
            />
            <p onClick={() => onFileClick(file)} className="messageText hover">
              <FileOutlined /> {file.name}
            </p>
          </div>
          <div className="messageBottom">{Moment(message.createdAt).format('MMMM Do , h:mm')}</div>
        </div>
      ))}
      {message.text && (
        <div className={own ? 'message own' : 'message friend'}>
          <div className="messageTop">
            <img
              className={own ? 'messageImg-own' : 'messageImg '}
              src="https://ss-images.saostar.vn/wp700/pc/1613810558698/Facebook-Avatar_3.png"
              alt=""
            />
            <p className="messageText">{message.text}</p>
          </div>
          <div className="messageBottom">
            {Moment(message.createdAt).format('MMMM Do , h:mm')}
          </div>
        </div>
      )}
    </>
  )
}

export default Message
