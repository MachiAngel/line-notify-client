import React, { Component} from 'react'
import { Form, Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Modal from '@material-ui/core/Modal';

import PttHotBoardMenu from '../PttHotBoardMenu/PttHotBoardMenu'

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import { withRouter } from "react-router-dom";
import { withAlert } from 'react-alert'

import { 
  createPttSub, 
  loadEditInitData, 
  editPttSub, 
  resetInitData,
  deletePttSub
} from '../../store/reducers/ptt.reducer'

const styles = theme => ({
  root:{
    display: 'flex',
    flexGrow: 1
  },
  buttons:{
    display: 'flex',
    justifyContent: 'space-around',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  paper: {
    margin: 32,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 16,
    height: '50vh',
    justifyContent: 'space-between',
  },
  item:{
    display: 'flex',
    flexDirection: 'row',
  },
  checkbtn:{
    marginLeft: 30,
    
  },
  modelpaper: {
    position: 'absolute',
    width: '80%',
    height: '70%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  }

});


const fields = [
  {
    name: 'author',
    label: '作者(選填)',
    type: 'string'
  },
  {
    name: 'category',
    label: '分類(選填)',
    type: 'string'
  },
  {
    name: 'rate',
    label: '推文數(選填)',
    type: 'number'
  },
  {
    name: 'title',
    label: '標題關鍵字(選填)',
    type: 'string'
  },
]



const validate = values => {
  const errors = {}
  const requiredFields = [
    'board'
  ]
  requiredFields.forEach(field => {

    if (!values[field]) {
      errors[field] = 'Required'
    }
    
    const rateString = String(values.rate)

    if(
      rateString && !rateString.match(/^[0-9]$|^[1-9][0-9]$|^(100)$/)
    ) {
      errors.rate = '僅限於0~100'
    }

  })
  return errors
}





const asyncValidate = (values) => {
  
  return axios.post('/api/v1/subscriptions/ptt/checkboard', { board: values.board}).then(result => {
    const { success } = result.data 
    
    if (!success) {
      throw { board: '查無此版' }
    }
  }).catch(e => {
    throw { board: '查無此版' }
  })
}



const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
    <TextField
      label={label}
      value={'ccc'}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )




function getModalStyle() {
  const top = 50
  const left = 50 
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const initValue = {
  author: "",
  board: "",
  category: "",
  rate: 0,
  title: "",
  not_title: ""
}



class PttForm extends Component {


  constructor(props) {
    super(props)
    this.pttSubmit = this.pttSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      id:'0',
      isEdit:false,
      open: false,
      alert:false 
    }
  }

  

  componentDidMount() {
    const id = this.props.match.params.id
    if (id === '0') {
      this.setState({
        id: '0',
        isEdit: false 
      })

      this.props.resetInitData()
      return 
    }

    const { ptt } = this.props
    const { list } = ptt
    const pttsub = list.find(item => item.id == id)
    if (!pttsub) { return }
    this.setState({
      id:pttsub.id,
      isEdit: true 
    })
    
    //傳入該subscription
    this.props.loadEditInitData(pttsub)

  }

  handleAlertOpen = () => {
    this.setState({ alert: true });
  };

  handleAlertClose = (shouldDelete) => {
    this.setState({ alert: false });
    if (!shouldDelete) {return}
    if (isEdit) { return }

    const { isEdit, id } = this.state
    this.props.deletePttSub({ id, alert: this.props.alert})
    
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (board_en_name) => {

  
    this.setState({ open: false });
    if (typeof (board_en_name) !== 'string') {
      
      return
    }
    
    const currentValues = this.props.pttValues
  
    // const { author, board, category, rate, title, not_title } = action.payload
    
    this.props.loadEditInitData({
      ...currentValues,
      board: board_en_name,
      not_title:''
    })
  };

  reset() {
    
    const { isEdit  } = this.state
    const { reset } = this.props
    const currentValues = this.props.pttValues
    
    if (isEdit) {
      this.props.loadEditInitData({
        ...initValue,
        board: currentValues.board
      })
    }else {
      this.props.resetInitData()
      reset()
    }
  }

  pttSubmit(data) {

    const { isEdit,id } = this.state
    
    if (!isEdit) {
      
      this.props.createPttSub({ ...initValue, ...data }, this.props.alert)
      return
    }
    console.log(data)
    this.props.editPttSub(id, { ...initValue, ...data }, this.props.alert)
    
  }

  renderDeleteBtn() {
    const { classes } = this.props
    return (
      <div className={classes.paper}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth={true}
          onClick={this.handleAlertOpen}
        >
          刪除
                <DeleteIcon className={classes.rightIcon} />
        </Button>
        <Dialog
          open={this.state.alert}
          onClose={() => {
            this.handleAlertClose(0)
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            確定刪除此訂閱?
                </DialogTitle>

          <DialogActions>
            <Button onClick={() => {
              this.handleAlertClose(0)
            }} color="secondary">
              取消
                  </Button>
            <Button onClick={() => {
              this.handleAlertClose(1)
            }} color="primary" autoFocus>
              確定
                  </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  render() {

    const { handleSubmit, pristine , submitting, classes } = this.props
    const { isFetching } = this.props.ptt
    const { isEdit } = this.state
    return (
      <div>
        <BlockUi blocking={isFetching}>
          <div className={classes.root}>
            <AppBar position="static">

              <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                  <ArrowBackIcon
                    onClick={() => {
                      this.props.history.push('/subscription')
                    }}
                  />
                </IconButton>
                <Typography variant="h6" color="inherit" align="center">
                  PTT
              </Typography>

              </Toolbar>
            </AppBar>
          </div>

          <Form onSubmit={handleSubmit(this.pttSubmit)} >

            <Paper className={classes.paper}>

              <div className={classes.form}>
                <div className={classes.item}>
                  <Field
                    name="board"
                    component={renderTextField}
                    label="版名(必填)"
                    disabled={isEdit}
                  />
                  
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.checkbtn}
                    disabled={isEdit}
                    onClick={() => {
                      this.handleOpen()
                    }}
                  >
                    熱門列表
                  </Button>
                </div>
                {fields.map(item => {
                  const { name, type, label } = item
                  return (
                    <Field
                      key={name}
                      name={name}
                      component={renderTextField}
                      label={label}
                      type={type}
                    />
                  )
                })}
                

              </div>


            </Paper>

            <Paper className={classes.paper}>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.margin}
                  type="submit"
                  disabled={submitting}
                >
                  {isEdit ? '修改' : '新增'}
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.margin}
                  
                  onClick={() => this.reset()}
                  disabled={pristine || submitting}
                >
                  清除
                </Button>

              </div>
            </Paper>

            {isEdit ? this.renderDeleteBtn() : null}
            
          </Form>

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.modelpaper}>
              <PttHotBoardMenu handleClose={this.handleClose}/>
            </div>
          </Modal>
        </BlockUi>
      </div>
    )
  }  
  
}



// Form = connect(state => ({
//   numPizzas: selector(state, 'pizzas')
// }))(Form)



const withPttForm = withStyles(styles)(withRouter(PttForm))
const withAlertPtt = withAlert(withPttForm)

const reduxPttForm = reduxForm({
  // a unique name for the form
  form: 'ptt',
  validate,
  asyncValidate,
  asyncBlurFields: ['board'],
  enableReinitialize:true
})(withAlertPtt)


const selector = formValueSelector('ptt') 

const mapStateToProps = (state) => {
  return {
    ptt: state.ptt,
    initialValues: state.ptt.initialValues,
    pttValues: selector(state,'board','category','author','rate','title')
  }
}

export default connect(mapStateToProps, { createPttSub, loadEditInitData, editPttSub, resetInitData, deletePttSub })(reduxPttForm)


// initialValues: {

// }
