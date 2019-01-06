import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';




import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
// import EditIcon from '@material-ui/icons/Edit';
// import IconButton from '@material-ui/core/IconButton';
import PttCard from '../PttCard/PttCard'

import { pttTags } from '../helper/tags'

import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';


const styles = theme => ({
  root: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  paper: {
    marginBottom: 10,
    marginTop: 10,
    display: 'flex',
  },
  inline: {
    display: 'inline',
  },
  chip:{
    color: 'white',
    margin: theme.spacing.unit,
  },
  chipHidden: {
    display: 'none',
  },
  add:{
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    width: 40,
    height: 40,
    
  }
});

class PttPage extends Component {

  render() {
    
    const pttList = this.props.ptt
    const { classes } = this.props

    const tagList = ['author', 'category', 'rate']
    
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          {tagList.map(key => {
            const {name,color} = pttTags[key]
            return (
              <Chip key={key} label={name} className={classes.chip} style={{ backgroundColor: color }} />
            )
          })}

          <Fab size="small" color="secondary" aria-label="Add" className={classes.add}>
            <AddIcon
              onClick={() => { 
                this.props.history.push("/subscription/ptt/0")
              }}
            />
          </Fab>
          
          
        </Paper>
        
        <Grid
          container
          direction="column"
          spacing={16}
        >
          {pttList.map(item => {
            
            return (
              <Grid item xs={12} key={item.id} >
                <PttCard data={item} />
              </Grid>
            )
          })}
          
        </Grid>

        <div style={{height:60}}>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    ptt:state.ptt.list
  }
}

export default connect(mapStateToProps)(withStyles(styles)(withRouter(PttPage)))



  // < List className = { classes.root } >
  //   <ListItem alignItems="flex-start" button>
  //     <Typography align="center">
  //       1
  //         </Typography>
  //     <ListItemText
  //       primary="訂閱版名:Gossiping"
  //       secondary={
  //         <React.Fragment>
  //           <Typography component="span" className={classes.inline} color="primary">
  //             作者:Connors
  //               </Typography>
  //           <Typography component="span" className={classes.inline} color="secondary">
  //             分類:新聞
  //               </Typography>
  //           <Typography component="span" color="default">
  //             關鍵字:柯文哲柯文哲柯文哲柯文哲柯文哲柯文哲柯文哲柯文哲柯文哲柯文哲柯文哲柯文哲
  //               </Typography>
  //         </React.Fragment>
  //       }
  //     />
  //     <ListItemSecondaryAction>
  //       <IconButton >
  //         <MoreVertIcon />
  //       </IconButton>

  //     </ListItemSecondaryAction>
  //   </ListItem>
        
        
  //     </List >