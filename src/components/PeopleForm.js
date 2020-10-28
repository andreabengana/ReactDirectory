import React, {useEffect, useState} from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/people"
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: 230,
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1)
  }
})

const initialFieldValues = {
  fullName : "",
  mobileNumber : "",
  emailAddress : "",
}

const PeopleForm = ({classes,...props}) => {
  
  const { addToast } = useToasts()

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('fullName' in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required."
    if ('mobileNumber' in fieldValues)
      temp.mobileNumber = fieldValues.mobileNumber ? "" : "This field is required."
    if ('emailAddress' in fieldValues)
      temp.emailAddress = (/^$|.+@.+..+/).test(fieldValues.emailAddress) ? "" : "Email is not valid."
    setErrors({
      ...temp
    })

    if (fieldValues == values)
        return Object.values(temp).every(x => x == "")
  }
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, validate, props.setCurrentId)

  useEffect(()=>{
    if (props.currentId != 0)
      setValues({
        ...props.peopleList.find(element => element.personId == props.currentId)
        
      })
  }, [props.currentId])

  const handleSubmit = e => {
    e.preventDefault()
    console.log(values)
    if (validate()) {
        const onSuccess = () => {
          resetForm()
          addToast("Submitted successfully", { appearance: 'success' })
          props.fetchAllPeople()
        }
        if (props.currentId == 0){
          props.createPeople(values, onSuccess)
        }  
        else 
          props.updatePeople(props.currentId, values, onSuccess)
    }
  }


  return ( 
    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <TextField 
            name="fullName" 
            variant="outlined" 
            label="Full Name" 
            value={values.fullName} 
            onChange={handleInputChange}
            {...(errors.fullName && {error: true, helperText: errors.fullName})}
          />
          <TextField 
            name="mobileNumber" 
            variant="outlined" 
            label="Mobile Number" 
            value={values.mobileNumber} 
            onChange={handleInputChange}
            {...(errors.mobileNumber && {error: true, helperText: errors.mobileNumber})}
          />
          <TextField 
            name="emailAddress" 
            variant="outlined" 
            label="Email Address" 
            value={values.emailAddress} 
            onChange={handleInputChange}
            {...(errors.emailAddress && {error: true, helperText: errors.emailAddress})}
          />
           
          <div>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.smMargin}
            >
            Submit
            </Button>
            <Button
                variant="contained"
                className={classes.smMargin}
                onClick={resetForm}
            >
            Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
     
  );
};

const mapStateToProps = state => ({
  peopleList : state.PeopleReducer.list
})

const mapActionToProps  = {
  createPeople : actions.create,
  updatePeople : actions.update,
  fetchAllPeople: actions.fetchAll, 
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(PeopleForm));
