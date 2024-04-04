import axios from "axios";

const BASE_URL ='http://localhost:8080/ticket'


class TicketService{

    getAllTicketInfo(){
        return axios.get(BASE_URL+"/getTicket")
    }

}

export default new TicketService();