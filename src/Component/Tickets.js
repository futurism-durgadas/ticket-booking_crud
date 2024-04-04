import { useEffect, useState } from "react";
import TicketService from "../Service/TicketService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookingService from "../Service/BookingService";
import RegisterService from "../Service/RegisterService";


function Tickets() {
    const navigate = useNavigate();

    const [fname, setFname] = useState('');
    const [email_id, setEmail_id] = useState('');
    const [user_id, setUser_id] = useState('');
    const [enableField, setEnableField] = useState(false);
    const [source, setSource] = useState('')
    const [dest, setDest] = useState('')
    const [adult, setAdult] = useState('0')
    const [child, setChild] = useState('0')
    const [travel_date, setTravel_date] = useState('');   //new Date()
    const [total_bill, setTotal_bill] = useState('')
    const [errors, setErrors] = useState({});
   
    useEffect(() => {
        calculateTotalBill();
    }, [adult, child]);


    useEffect(() => {
        getUserName();
        handleSetUserId();
    }, [email_id]);

    const [tickets, setTickets] = useState([])
    useEffect(() => {
        TicketService.getAllTicketInfo().then((response) => {
            setTickets(response.data)
            console.log(response.data)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const [userDetails, setUserDetails] = useState([])
    useEffect(() => {
        RegisterService.getAllUsers().then((response) => {
            setUserDetails(response.data)
            console.log(response.data)
        }).catch(error => {
            console.log(error);
        })
    }, [])


    const calculateTotalBill = async () => {
        try {
            const response = await axios.post("http://localhost:8080/ticket/calculateTotalBill?destination=" + dest +
                "&adult=" + adult + "&child=" + child);
            setTotal_bill(response.data);

        } catch (error) {
            console.log(error);
        }
    }
    
    const handleSetUserId = async () => {
        try {
            const response = await axios.post("http://localhost:8080/getUserId?email_id="+email_id);
            setUser_id(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getUserName = async () => {
        try {
            const response = await axios.post("http://localhost:8080/getFirstName?email_id="+email_id);
            setFname(response.data)

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const book = {source, dest, adult, child, travel_date, total_bill,user_id}
        const validationErrors = validateForm(book);
        
        if (Object.keys(validationErrors).length === 0) {
            BookingService.bookTicket(book).then((response) => {
                console.log(response.data)
                //  alert("Form Submited")
                navigate("/confirm")
            }).catch(error => {
                console.log(error)
            })
          } else {
            // alert("Please fill all the fields")
            setErrors(validationErrors);
          }
       
    }
    const validateForm = (data) => {
        let errors = {};
        // if (!data.email_id) {
        //   errors.email_id = 'email_id is required';
        // }
        if (!data.source) {
            errors.source = 'Source city is required';
        }
        if (!data.dest) {
          errors.dest = 'Destination city is required';
        }
    
        if (!data.adult.trim()) {
          errors.adult = 'Number of adults is required';
        } else if (!/^\d+$/.test(data.adult)) {
          errors.adult = 'Please enter a valid number';
        }
    
        if (!data.child.trim()) {
          errors.child = 'Number of children is required';
        } else if (!/^\d+$/.test(data.child)) {
          errors.child = 'Please enter a valid number';
        }
    
        if (!data.travel_date) {
          errors.travel_date = 'Travel date is required';
        }
    
        return errors;
      };

      const handleKeyDown = (e) => {
        // const { name, value } = e.target;
        const {name} = e.target;
        switch (name) {
          case 'adult':
          case 'child':
            if (!/^[0-9]*$/.test(e.key) && e.key !== 'Backspace') { 
              e.preventDefault();
            }
            break;
         
          default:
            break;
        }
      };

      const handleEmail_id =(e) =>{
        setEmail_id(e.target.value)
        setEnableField(true)
      }

    return (
        <div>
            <div className="Container mt-5">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h2 className="text-center">Book Ticket</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <div className="row">
                                    <div class="col-sm">
                                    <label className="form-label">Email Id :</label>
                                        <select className="form-select" value={email_id} onChange={(e) => handleEmail_id(e)}>
                                            <option>Select Email Id</option>
                                            {
                                                userDetails.map(
                                                    userInfo =>
                                                        <option key={userInfo.id}>

                                                            <option value={userInfo.email_id}>{userInfo.email_id}</option>

                                                        </option>
                                                )
                                            }
                                        </select>
                                        {/* {errors.email_id && <span className="error" style={{ color: "red" }}>{errors.email_id}</span>} */}
                                    </div>
                                    { enableField ? (
                                    <div class="col-sm">
                                        <label className="form-label" value={fname} onChange={((e) => setFname(e.target.value))}>
                                               First Name : <br></br> 
                                               {fname}
                                         </label>
                                    </div>
                                    ) : (
                                        ""
                                    )
                                    }
                                </div>

                                <div className="row mt-2">
                                    <div class="col-sm">
                                        <label className="form-label">From :</label>
                                        <select className="form-select" value={source} onChange={(e) => setSource(e.target.value)}>
                                            <option>Select Source City</option>
                                            <option value="Pune">Pune</option>
                                        </select>
                                        {errors.source && <span className="error" style={{ color: "red" }}>{errors.source}</span>}
                                    </div>

                                    <div class="col-sm">
                                        <label className="form-label">To :</label>
                                        <select className="form-select" value={dest} onChange={(e) => setDest(e.target.value)}>
                                            <option>Select Destination City</option>
                                            {
                                                tickets.map(
                                                    ticket =>
                                                        <option key={ticket.ticket_id}>

                                                            <option value={ticket.dest}>{ticket.dest}</option>

                                                        </option>
                                                )
                                            }
                                        </select>
                                        {errors.dest && <span className="error" style={{ color: "red" }}>{errors.dest}</span>}
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div class="col-sm">
                                        <label className="form-label">Adult :</label>
                                        <input type="text" name="adult" className="form-control"
                                            value={adult} maxLength="2" onKeyDown={handleKeyDown}
                                            onChange={(e) => setAdult(e.target.value)} >
                                        </input>
                                        {errors.adult && <span className="error" style={{ color: "red" }}>{errors.adult}</span>}
                                    </div>
                                    <div class="col-sm">
                                        <label className="form-label">Child :</label>
                                        <input type="text" name="child" className="form-control"
                                            value={child} maxLength="2" onKeyDown={handleKeyDown}
                                            onChange={(e) => setChild(e.target.value)}>
                                        </input>
                                        {errors.child && <span className="error" style={{ color: "red" }}>{errors.child}</span>}
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div class="col-sm">
                                    <label className="form-label">Select Date :</label>
                                        <input type="date" className="form-control" value={travel_date} min={new Date().toISOString().split('T')[0]} onChange={((e) => setTravel_date(e.target.value))} />
                                        {errors.travel_date && <span className="error" style={{ color: "red" }}>{errors.travel_date}</span>}
                                    </div>
                                    <div class="col-sm">
                                        
                                    </div>
                                </div>
                        
                                <label value={total_bill} onChange={((e) => setTotal_bill(e.target.value))}>
                                    Total Bill : {total_bill}
                                </label>
                            </div>
                            <button className="btn btn-success mt-2" onClick={(e) => handleSubmit(e)}>Book</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tickets;