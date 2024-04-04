import axios from "axios";

const BASE_URL ='http://localhost:8080'

class RegisterService{

    getAllUsers(){
        return axios.get(BASE_URL+"/getUser")
    }

    addUser(user){
        return axios.post(BASE_URL+"/registerUser",user)
    }
}

export default new RegisterService();