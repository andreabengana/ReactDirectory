import React, { useState, useEffect } from 'react';
import { connect } from "react-redux"
import * as actions from "../actions/people";
import { ButtonGroup, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, withStyles } from '@material-ui/core';
import PeopleForm from './PeopleForm';
import PeopleSearch from './PeopleSearch';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

const styles = theme =>({
  paper : {
    margin : theme.spacing(2),
    padding : theme.spacing(2)
  }
})

const People = ({classes,...props}) => {
  const [currentId, setCurrentId] = useState(0)

  const { addToast } = useToasts()

  useEffect(() => {
    props.fetchAllPeople() 
  }, [])
  
  const onDelete = id => {
    if (window.confirm('Are you sure to delete this record?'))
      props.deletePeople(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
      props.fetchAllPeople()

  }
  const onClickName = () => { 
      props.sortUsingName()
  }
  const onClickNumber = () => { 
    props.sortUsingNumber()
  }
  const onClickEmail = () => { 
    props.sortUsingEmail()
 }
  return(
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={3}>
          <PeopleForm {...({ currentId, setCurrentId })} />
        </Grid>
        <Grid item xs={3}>
          <PeopleSearch {...({ currentId, setCurrentId })} />
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell onClick={onClickName}>Full Name</TableCell>
                  <TableCell onClick={onClickNumber}>Mobile Number</TableCell>
                  <TableCell onClick={onClickEmail}>Email Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  props.peopleList.map((record,index)=>{
                    return(<TableRow key={index} hover>
                      <TableCell>{record.fullName}</TableCell>
                      <TableCell>{record.mobileNumber}</TableCell>
                      <TableCell>{record.emailAddress}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button>
                            <EditIcon color="primary"
                            onClick={() => { setCurrentId(record.personId) }} />
                          </Button>
                          <Button>
                            <DeleteIcon color="secondary"
                            onClick={() => onDelete(record.personId)} />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>)
                  }) //end props.peopleList.map((record,index)=>{
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );


}
const mapStateToProps = state => ({
    peopleList:state.PeopleReducer.list
})

const mapActionToProps ={
  fetchAllPeople: actions.fetchAll,
  deletePeople: actions.Delete,
  sortUsingName: actions.sortByName,
  sortUsingNumber: actions.sortByNumber,
  sortUsingEmail: actions.sortByEmail
}
  
  export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(People));