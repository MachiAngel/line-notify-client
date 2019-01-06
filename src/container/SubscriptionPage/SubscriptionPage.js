

import React, { Component } from 'react'
import axios from 'axios'

import './SubscriptionPage.css'
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import PttPage from '../../component/PttPage/PttPage'

import { loadPttSub, loadPttHotbaords } from '../../store/reducers/ptt.reducer'
import { connect } from 'react-redux'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
});



const subTypeList = [
  {
    subTypeKey:'pttSubs',
    displayName:'Ptt'
  },
  {
    subTypeKey:'eynyMovieSubs',
    displayName:'伊莉電影區'
  },
  {
    subTypeKey: 'eynyBTMovieSubs',
    displayName: '伊莉電影區(BT)'
  },
  {
    subTypeKey:'eynyVideoSubs',
    displayName:'伊莉影片區'
  }

]

class SubscriptionPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      subTypeList,
      value: subTypeList[0],
      subs:undefined
    }

    this.handleChange = this.handleChange.bind(this)
    
  }
  


  handleChange = (event, value) => {
    // console.log(value)

    this.setState({ value });
  };

  componentDidMount() {

    //TODO: 從redux拿 or localStorage
    const userLineId = localStorage.getItem('userLineId')

    if (!userLineId) {return}


    
    axios.post('api/v1/subscriptions', { user_line_id: userLineId})
      .then(result => {

        
        // console.log(result.data)
        this.setState({
          subs: result.data
        })

        //TODO LOAD other data
        this.props.loadPttSub(result.data.subs.pttSubs)
        this.props.loadPttHotbaords(result.data.hotBoards)
      }).catch(e => {
        console.log(e.message)
      })
  }

  renderContent(value) {
    switch(value.subTypeKey) {
      case 'pttSubs':
        return <PttPage />
      default:
        return <div>{value.displayName}</div> 
    }
  }

  render() {
    const { classes } = this.props;
    
    //寫死固定 配合api object key
    const { subTypeList, value } = this.state;

    return (
      <div styles={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          scrollable
          scrollButtons="auto"
        >
          {subTypeList.map(item => {
            return (
              <Tab 
                label={item.displayName} 
                value={item} 
                key={item.subTypeKey} 
              />
            )
          })}
          
        </Tabs>

        {this.renderContent(value)}
      </div>
    )
  }
}

const mapDispatchToProps = {
  loadPttSub,
  loadPttHotbaords
}

const withStyleSubscriptionPage = withStyles(styles, { withTheme: true })(SubscriptionPage)

export default connect(null, mapDispatchToProps)(withStyleSubscriptionPage)

