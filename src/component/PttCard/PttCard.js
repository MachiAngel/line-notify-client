import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import Chip from '@material-ui/core/Chip';

import Typography from '@material-ui/core/Typography';

import { pttTags } from '../helper/tags'
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    color: 'white',
    margin: theme.spacing.unit * 1.5 ,
  },
  inline:{
    display: 'inline',
    textTransform: 'capitalize',
  },
  cardDown: {
    display: 'flex'
  },
  cardUp: {
    overflowWrap:'break-word'
  },
  light:{
    backgroundColor: '#40ff00',
    borderRadius: '50%',
    width: 15,
    height: 15,
    marginLeft: 15
  }
});


class PttCard extends Component {

  constructor(props) {
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleEdit(data) {
    // console.log(data)
    this.props.history.push(`/subscription/ptt/${data.id}`)
  } 

  render() {

    const { classes, data } = this.props
    const { board,author,category,title,rate } = data 
    
    // const tagList = ['author', 'category','rate']

    return (
      <Card 
        onClick={() => this.handleEdit(data)}
      >
        <div className={classes.cardUp}>
          
          <CardContent>
            <Typography component="span" className={classes.inline} color="primary" variant='h6'>
              訂閱版名:
              <Typography component="span" className={classes.inline} color="secondary"  variant='h5'>
                {board}
              </Typography>
            </Typography>
            
            <Typography component="span" color="primary" variant='h6'>
              標題關鍵字:
            </Typography>
            <Typography component="p" color="secondary" variant='h6' >
              {title || '無設定'}
            </Typography>
          </CardContent>
        </div>
        <Divider />
        <div className={classes.cardDown}>
          {author ? 
            <Chip 
              label={author}
              className={classes.chip} 
              style={{ backgroundColor: pttTags['author'].color }}
            /> : null
          }
          {category ?
            <Chip
              label={category}
              className={classes.chip}
              style={{ backgroundColor: pttTags['category'].color }}
            /> : null
          }
          {rate ?
            <Chip
              label={rate}
              className={classes.chip}
              style={{ backgroundColor: pttTags['rate'].color }}
            /> : null
          }
          
          
        </div>
       
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ptt: state.ptt
  }
}

export default connect(mapStateToProps)(withStyles(styles)(withRouter(PttCard)))