import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from "react-router-dom";

import NavLinkBar from '../../component/NavLinkBar/NavLinkBar'

import TopNavBar from '../../component/TopNavBar/TopNavBar'
import BottomBar from '../../component/BottomBar/BottomBar'


import SubscriptionPage from '../SubscriptionPage/SubscriptionPage'

const History = () => {
  return (
    <div>
      歷史首頁
    </div>
  )
}
const User = () => {
  return (
    <div>
      用戶首頁
    </div>
  )
}





class DashBoard extends Component {

  
  render() {
    
    const {pathname} = this.props.location

    const navList = [
      {
        path: '/subscription',
        title: '訂閱中心',
        component: SubscriptionPage
      },
      {
        path: '/history',
        title: '歷史紀錄',
        component: History
      },
      {
        path: '/me',
        title: '個人中心',
        component: User
      }
    ]
    const shouldRenderDashboardList = ['/subscription', '/history','/me']
    if (!shouldRenderDashboardList.includes(pathname)) {
      return null 
    }


    return (
      <div>
        <TopNavBar name={navList.find(item => item.path === pathname).title}/>
        
        <div >
          <Switch>
            {navList.map(item => {
              return <Route key={item.path} path={item.path} component={item.component}/>
            })}
          </Switch>
        </div>
        
        <BottomBar data={navList}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(DashBoard)