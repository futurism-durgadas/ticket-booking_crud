import axios from "axios";

const BASE_BOOK ='http://localhost:8080/booking'

class BookingService{

    getAllBookingInfo(){
        return axios.get(BASE_BOOK+"/getBooking")
    }

    bookTicket(book){
        return axios.post(BASE_BOOK+"/addBooking-Data",book)
    }
}

export default new BookingService();