import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    justifyContent: 'center',
  }
};

// const styles = {
//   stickToTop: {
//     width: '100%',
//     position: 'fixed',
//     top: 0,
//   },
// };

function TopNavBar(props) {
  const { classes } = props;
  const { name } = props
  return (
    <div >
      <AppBar position="static" color="primary">
        <Toolbar className={classes.root}>
          <Typography variant="h6" color="inherit" align="center">
            {name}
          </Typography>
        </Toolbar>
        
      </AppBar>
    </div>
  );
}


export default withStyles(styles)(TopNavBar)