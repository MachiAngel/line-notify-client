import React, { Component } from 'react'
import LoginImg from './btn_login_base.png'
import Logo from '../../component/logo/logo'




class LoginPage extends Component {

  componentDidMount() {


    // axios.get('api/qq').then(result => {
    //   console.log(result)
    // }).catch(e => {
    //   console.log(e.message)
    // })
  }

  render() {
    const isProd = process.env.NODE_ENV === 'production'
    const url = isProd ? '/auth' : 'http://localhost:3050/auth'
    return (
      <div>
        <Logo />
        <a href={url}>
          <img src={LoginImg} alt="" className="mx-auto" />  
        </a>
        <h>Env:{process.env.NODE_ENV}</h>
      </div>
    )
  }
}


export default LoginPage
