import React, { Component } from 'react'

import axios from 'axios'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { loadUserDataAction } from '../../store/actions/user.action'

class AuthComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userLineId:undefined
    }
  }

  componentDidMount() {
    const userLineId = localStorage.getItem('userLineId')
    
    if (!userLineId) {
      this.props.history.push('/login')
      return
    }

    axios.get(`/api/v1/users/${userLineId}`)
      .then(result => {
        const { user } = result.data
        console.log('auth component get user')
        console.log(user)
        this.props.loadUserDataAction(user)
  
        this.setState({
          userLineId: user.userLineId
        })
        
      }).catch(e => {
        console.log('result err')
        console.log(e.message)
        // localStorage.removeItem('userLineId')
        this.props.history.push('/login')
      })
  }

  render() {

    return null 
  }

  // render() {

  //   if (!this.state.userLineId) {
  //     return (
  //       <div><h1>Loading...</h1></div>
  //     )
  //   }

  //   return (
  //     <div>
        
  //     </div>
  //   )
  // }
}

const mapDispatchToProps = {
  loadUserDataAction
}

export default connect(null, mapDispatchToProps)(withRouter(AuthComponent))
