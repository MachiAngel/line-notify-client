import React, { Component } from 'react'

import axios from 'axios'

import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { loadUserDataAction } from '../../store/actions/user.action'

class AuthPage extends Component {

  
  componentDidMount() {

    // const history = this.props.match

    const search = this.props.location.search

    axios.get(`/api/v1/auth${search}`)
      .then(result => {
        // TODO: if no user back~

        const { user } = result.data
        this.props.loadUserDataAction(user)

        localStorage.setItem('userLineId', user.userLineId)

        console.log('result')
        console.log(result.data)

        this.props.history.push("/subscription")

      }).catch(e => {
        console.log('result err')
        console.log(e.message)
        this.props.history.push("/login")
      })
  }

  render() {
    return (
      <div>
        <h2>授权中..</h2>
      </div>
    )
  }
}
const mapDispatchToProps = {
  loadUserDataAction
}

export default connect(null, mapDispatchToProps)(withRouter(AuthPage))