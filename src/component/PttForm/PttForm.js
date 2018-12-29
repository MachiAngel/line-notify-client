import React, { Component} from 'react'
import { Form ,Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import FormHelperText from '@material-ui/core/FormHelperText'
import Paper from '@material-ui/core/Paper';


import { withRouter } from "react-router-dom";
import { withAlert } from 'react-alert'

import { createPttSub, loadEditInitData, editPttSub } from '../../store/reducers/ptt.reducer'

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
    
  }

});



const validate = values => {
  const errors = {}
  const requiredFields = [
    'board'
  ]
  requiredFields.forEach(field => {

    if (!values[field]) {
      errors[field] = 'Required'
    }
    console.log(values.rate)
    const rateString = String(values.rate)

    if(
      rateString && !rateString.match(/^[0-9]$|^[1-9][0-9]$|^(100)$/)
    ) {
      errors.rate = '僅限於0~100'
    }

  })
  return errors
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



const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}






class PttForm extends Component {


  constructor(props) {
    super(props)
    this.pttSubmit = this.pttSubmit.bind(this)
    this.state = {
      id:'0',
      isEdit:false 
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    if (id === '0') {return }

    const { ptt } = this.props
    const { list } = ptt
    const pttsub = list.find(item => item.id == id)
    if (!pttsub) { return }
    this.setState({
      id:pttsub.id,
      isEdit: true 
    })
    console.log(pttsub)
    //傳入該subscription
    this.props.loadEditInitData(pttsub)

  }

  

  pttSubmit(data) {

    const { isEdit,id } = this.state
    
    const initValue = {
      author: "",
      board: "",
      category: "",
      rate: "",
      title: "",
      not_title: ""
    }
    if (!isEdit) {
      
      this.props.createPttSub({ ...initValue, ...data }, this.props.alert)
      return
    }

    this.props.editPttSub(id, { ...initValue, ...data }, this.props.alert)
    
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, classes } = this.props
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
                    onClick={() => {
                      console.log('click')
                    }}
                  >
                    檢查
                </Button>
                </div>

                <Field
                  name="author"
                  component={renderTextField}
                  label="作者(選填)"
                />

                <Field
                  name="category"
                  component={renderTextField}
                  label="分類(選填)"
                />
                <Field
                  name="rate"
                  type="number"
                  component={renderTextField}
                  label="推文數(選填)"
                />
                <Field
                  name="title"
                  component={renderTextField}
                  label="標題關鍵字(選填)"
                />

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
                  type="submit"
                  onClick={reset}
                  disabled={pristine || submitting}
                >
                  清除
              </Button>

              </div>
            </Paper>
          </Form>
        </BlockUi>
      </div>
    )
  }  
  
}

// const selector = formValueSelector('example')

// Form = connect(state => ({
//   numPizzas: selector(state, 'pizzas')
// }))(Form)



const withPttForm = withStyles(styles)(withRouter(PttForm))
const withAlertPtt = withAlert(withPttForm)

const reduxPttForm = reduxForm({
  // a unique name for the form
  form: 'ptt',
  validate,
  enableReinitialize:true
})(withAlertPtt)


const mapStateToProps = (state) => {
  return {
    ptt: state.ptt,
    initialValues: state.ptt.initialValues
  }
}

export default connect(mapStateToProps, { createPttSub, loadEditInitData, editPttSub })(reduxPttForm)


// initialValues: {

// }
