import axios from "axios";

const baseUrl = "http://localhost:1949/api/"

export default {
    People(url = baseUrl + 'People/'){
        return {
            fetchAll : () => axios.get(url),
            fetchById : id => axios.get(url + id),
            create : newRecord => axios.post(url, newRecord),
            update : (id,updateRecord) => axios.put(url + id, updateRecord),
            delete : id => axios.delete(url + id),
            search : (searchTerm) => axios.get(url + "Search?searchTerm="+ searchTerm.search),
            sortByName : () => axios.get(url + "SortByName"),
            sortByNumber: () => axios.get(url + "SortByNumber"),
            sortByEmail : () => axios.get(url + "SortByEmail"),

        }
    }
}