import { act } from "react-dom/test-utils";
import { ACTION_TYPES } from "../actions/people"
const initialState = {
    list:[]
}
export const PeopleReducer = (state= initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list:[...action.payload]
            }
        
        case ACTION_TYPES.CREATE:
            return{
                ...state,
                list: [...state.list, action.payload]
            }
        case ACTION_TYPES.UPDATE:
            return{
                ...state,
                list: state.list.map(element => element.id == action.payload.id ? action.payload:element)
            }
        case ACTION_TYPES.DELETE:
            return{
                ...state,
                list:state.list.filter(element => element.id != action.payload)
            }
        case ACTION_TYPES.SEARCH:
            return{
                ...state,
                list: [...action.payload],
            }
        case ACTION_TYPES.SORT_BY_NAME:
            return {
                ...state,
                list:[...action.payload]
            }
        case ACTION_TYPES.SORT_BY_NUMBER:
        return {
            ...state,
            list:[...action.payload]
        }
        case ACTION_TYPES.SORT_BY_EMAIL:
        return {
            ...state,
            list:[...action.payload]
        }
        default:
            return state;
    }
}
