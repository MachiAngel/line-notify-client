import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


import BookmarkIcon from '@material-ui/icons/Bookmark'
import HistoryIcon from '@material-ui/icons/History'
import PersonIcon from '@material-ui/icons/Person'


const styles = {
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
};

const getIcon = (path) => {
  switch (path) {
    case '/subscription':
      return <BookmarkIcon />
    case '/history':
      return <HistoryIcon />
    case '/me':
      return <PersonIcon />
    default:
      return null
  }
}

const list = [
  {
    path: '/subscription',
    icon: BookmarkIcon,
    title: '訂閱中心'
  },
  {
    path: '/history',
    icon: HistoryIcon,
    title: '歷史紀錄'
  },
  {
    path: '/me',
    icon: PersonIcon,
    title: '個人中心',
  }
]

class BottomBar extends Component {

  state = {
    list
  };

  handleChange = (event, value) => {
    const { pathname } = this.props.location
    if (value.path === pathname) return
    
    this.props.history.push(value.path)
  };


  render() {
    const { classes } = this.props
    const { list } = this.state
    const { pathname } = this.props.location
    
    return (
      <BottomNavigation
        value={list.find(item => item.path === pathname)}
        onChange={this.handleChange}
        showLabels
        className={classes.stickToBottom}
      >
        {list.map(item => {
          return (
            <BottomNavigationAction key={item.path} label={item.title} icon={getIcon(item.path)} value={item}/>
          )
        })}
        
      </BottomNavigation>
    );
  }

  

  
}

export default withRouter(withStyles(styles)(BottomBar))
