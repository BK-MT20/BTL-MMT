import React from 'react'
import { Link } from 'react-router-dom'
import { MessageOutlined, LogoutOutlined } from '@ant-design/icons'
import { Avatar, Badge, Dropdown, Divider, Space, Menu } from 'antd'
import { UseLogout } from '../hooks'

const Header = () => {
  const logout = UseLogout()
  const items = [
    {
      key: '0',
      label: (
        <>
          <div>
            <p>
              <span style={{ fontWeight: 'bold', paddingRight: '5px' }}>
                Logged in as: Hoang Phiem
              </span>
            </p>
          </div>
          <Divider />
          <a onClick={() => logout} href="/login">
            <Space>
              <LogoutOutlined />
              Logout
            </Space>
          </a>
        </>
      ),
    },
  ]
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Messenger</span>
      </div>
      {/* <div className="topbarCenter">
        <div className="searchbar">
          <Input placeholder="Search for friends" className="searchInput" />
        </div>
      </div> */}
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to={'/'} className="topbarLink">
            Homepage
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Link to={'/messenger'} className="topbarLink">
              <Badge size="small" count={5}>
                <Avatar size="small" icon={<MessageOutlined />} />
              </Badge>
            </Link>
          </div>
        </div>
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Avatar
            src="https://joeschmoe.io/api/v1/random"
            alt=""
            className="topbarImg"
          />
        </Dropdown>
      </div>
    </div>
  )
}

export default Header
