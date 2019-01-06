import React,{Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'
import BlockUi from 'react-block-ui';
import { getPttHotBoards } from '../../store/reducers/ptt.reducer.js'
import _ from 'lodash'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '70vh',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

class PttHotBoardMenu extends Component {

  componentDidMount() {
    this.props.getPttHotBoards()
  }
  

  render() {

    const { classes, isFetching, hotBoards=[] } = this.props;
    
    return (
      <BlockUi blocking={isFetching}>
        <List className={classes.root} subheader={<li />}>
          <ul className={classes.ul}>
            
            {hotBoards.length ? (
              hotBoards.map(board => {
                const { board_en_name, current_user_count, board_category,board_desc } = board
                return (
                  <ListItem key={board_en_name}>
                    <ListItemText
                      primary={`${_.capitalize(board_en_name)} - 線上人氣:${current_user_count}`}
                      secondary={`${board_category} - ${board_desc}`}
                      onClick={() => {
                        this.props.handleClose(board_en_name)
                      }}
                    />
                  </ListItem>
                )
              })
            ) : (
                <div>~沒資料= =...</div>
            )}
            
          </ul>
        </List>
      </BlockUi>
    );
  }
}





const mapStateToProps = (state) => {
  return  {
    hotBoards: state.ptt.hotBoards,
    isFetching: state.ptt.isFetching
  }
}

const mapDispatchToProps = {
  getPttHotBoards
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PttHotBoardMenu))

