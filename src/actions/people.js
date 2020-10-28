import api from "./api";

export const ACTION_TYPES = {
    CREATE : "CREATE",
    UPDATE : "UPDATE",
    DELETE : "DELETE",
    FETCH_ALL : "FETCH_ALL",
    SEARCH : "SEARCH",
    SORT_BY_NAME : "SORT_BY_NAME",
    SORT_BY_NUMBER : "SORT_BY_NUMBER",
    SORT_BY_EMAIL : "SORT_BY_EMAIL"
}



export const fetchAll = () => dispatch => {
    api.People().fetchAll()
        .then( response => {
            console.log(response)
            dispatch({
                type : ACTION_TYPES.FETCH_ALL,
                payload : response.data
            })
        })
        .catch(err => console.log(err))    
}

export const create = (data, onSuccess) => dispatch =>{
    api.People().create(data)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.CREATE,
            payload: res.data
        })
        onSuccess()
    })
    .catch(err => console.log(err)) 

}

export const update = (id, data, onSuccess) => dispatch =>{

    api.People().update(id, data)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.UPDATE,
            payload: {id,...data}
        })
        onSuccess()
    })
    .catch(err => console.log(err)) 

}

export const Delete = (id, onSuccess) => dispatch =>{

    api.People().delete(id)
    .then(res =>{
        dispatch({
            type: ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess()
    })
    .catch(err => console.log(err)) 

}

export const search = searchTerm => dispatch => {
    api.People().search(searchTerm)
        .then( response => {
            console.log(response)
            console.log(searchTerm)
            dispatch({
                type : ACTION_TYPES.SEARCH,
                payload : response.data
            })
        })
        .catch(err => console.log(err))    
}

export const sortByName = () => dispatch => {
    api.People().sortByName()
        .then( response => {
            console.log(response)
            dispatch({
                type : ACTION_TYPES.SORT_BY_NAME,
                payload : response.data
            })
        })
        .catch(err => console.log(err))    
}

export const sortByNumber = () => dispatch => {
    api.People().sortByNumber()
        .then( response => {
            console.log(response)
            dispatch({
                type : ACTION_TYPES.SORT_BY_NUMBER,
                payload : response.data
            })
        })
        .catch(err => console.log(err))    
}

export const sortByEmail = () => dispatch => {
    api.People().sortByEmail()
        .then( response => {
            console.log(response)
            dispatch({
                type : ACTION_TYPES.SORT_BY_EMAIL,
                payload : response.data
            })
        })
        .catch(err => console.log(err))    
}