import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

import BookmarkIcon from '@material-ui/icons/Bookmark'
import HistoryIcon from '@material-ui/icons/History'
import PersonIcon from '@material-ui/icons/Person'

const Item = TabBar.Item


const getIcon = (name) => {
  switch(name) {
    case 'subscription':
      return <BookmarkIcon />
    case 'history':
      return <HistoryIcon />
    case 'user': 
      return <PersonIcon />
    default:
      return null 
  }
}

class NavLinkBar extends Component {

  render() {

    const navList = this.props.data
    const { pathname } = this.props.location
    
    return (
      <TabBar 
        barTintColor="white"
        tintColor="#33A3F4"
      >
        {navList.map(item => {
          return (
            <Item 
              key={item.path}
              title={item.text}
              icon={getIcon(item.icon)}
              selectedIcon={getIcon(item.icon)}
              selected={pathname === item.path}
              onPress={() => {
                this.props.history.push(item.path)
              }}
            >
            </Item>
          )
        })}
      </TabBar>
    )
  }
}

export default withRouter(NavLinkBar)


// selectedIcon = {{ uri: require(`./img/${item.icon}-active.png`) }}