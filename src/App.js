import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Register from './Component/Register';
import Tickets from './Component/Tickets';
import GetUser from './Component/GetUser';
import Header from './Component/Header';
import Footer from './Component/Footer';
import TicketConfirm from './Component/TicketConfirm';
import GetBooking from './Component/GetBooking';
import GetBookingDto from './Component/GetBookingDto';
//import Login from './Component/Login';

function App() {
  return (
    <div className="App">
      <Header/>
      {/* <h1 className="head">Ticket Booking System</h1> */}
      <Router>
                    <nav className="navbar navbar-expand-md navbar-dark bg-light">
                        
                            <Link to="/add" className="nav-item">Register</Link>
                       
                            <Link to="/tickets" className="nav-item" >Tickets</Link>

                            <Link to="/getUser" className="nav-item">User List</Link>   {/*ms-auto --for right align */}

                            {/* <Link to="/getBook" className="nav-item">Booking Info</Link>  */}

                            <Link to="/getBookDto" className="nav-item">Booking Info</Link>  
                        
                    </nav>
                    <Routes>
                        <Route
                            exact
                            path="/add"
                            element={<Register />}
                        ></Route>
                        <Route
                            exact
                            path="/getUser"
                            element={<GetUser />}
                        ></Route>
                        <Route
                            exact
                            path="/tickets"
                            element={<Tickets />}
                        ></Route>
                        <Route
                            exact
                            path="/getBook"
                            element={<GetBooking/>}
                        ></Route>
                        <Route
                            exact
                            path="/getBookDto"
                            element={<GetBookingDto/>}
                        ></Route>
                        <Route
                            exact
                            path="/confirm"
                            element={<TicketConfirm />}
                        ></Route>
                    </Routes>
            </Router>
            {/* <Login/> */}
            <Footer/>
    </div>
  );
}

export default App;
