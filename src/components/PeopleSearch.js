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
  search: ""
}

const PeopleSearch = ({classes,...props}) => {
  
  const { addToast } = useToasts()

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('search' in fieldValues)
        temp.search = fieldValues.search ? "" : "This field is required."
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
    
    const { name,value } = e.target
    const fieldValue = { [name]: value }
    setValues({
        ...values,
        ...fieldValue
    })
    validate(fieldValue)
    console.log(values)
    if (validate()) {
        props.searchPeople(values)
    }
}


  return ( 
    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <TextField 
            name="search" 
            variant="outlined" 
            placeholder="Search" 
            value={values.searchTerm} 
            onChange={handleSubmit}
            {...(errors.search && {error: true, helperText: errors.search})}
          />
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
  searchPeople: actions.search
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(PeopleSearch));
