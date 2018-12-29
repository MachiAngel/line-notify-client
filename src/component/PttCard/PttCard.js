import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";

import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import Chip from '@material-ui/core/Chip';

import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
    display: 'flex',
    justifyContent: 'space-around',
  },
  cardActions: {
    flexDirection: 'column',
  },
  cardRightSection: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto'
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
      <Card >
        <div className={classes.cardUp}>
          <div className={classes.cardRightSection}>
            <div className={classes.light}>
            </div>
          </div>
          <CardContent>
            <Typography component="span" className={classes.inline} color="secondary" variant='h6'>
              訂閱版名:
              <Typography component="span" className={classes.inline} color="primary"  variant='h5'>
                {board}
              </Typography>
            </Typography>
            <Typography component="span" color="secondary" variant='h6'>
              標題關鍵字:
              <Typography component="span" className={classes.inline} color="primary" variant='h6'>
                {title || '無'}
              </Typography>
            </Typography>
          </CardContent>

          <CardActions className={classes.cardActions}>
            <Button 
              size="small"
              onClick={() => this.handleEdit(data)}
            ><EditIcon/>
            </Button>
            <Button size="small"><DeleteIcon/></Button>
          </CardActions>
        </div>
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