import axios from 'axios';
import React, { useEffect, useState } from 'react'

function GetBookingDto() {
    const[bookings,setBookings] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/booking/getBooking-Data").then(response =>{
            setBookings(response.data);
        })
        .catch(error =>{
            console.error('Error fetching bookings',error);
        });
    },[]);

  return (
    <div>
        <h2>Booking List</h2>
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Passenger Name</th>
                    <th>Contact No</th>
                    <th>Source City</th>
                    <th>Destination City</th>
                    <th>No Of Adult</th>
                    <th>No Of Child</th>
                    <th>Total Bill</th>
                    <th>Travel Date</th>
                </tr>
            </thead>
            <tbody>
                {
                bookings.map(booking =>(
                    <tr key={booking.booking_id}>
                        <td>{booking.passengerName}</td>
                        <td>{booking.mobileNo}</td>
                        <td>{booking.sourceCity}</td>
                        <td>{booking.destinationCity}</td>
                        <td>{booking.noOfAdult}</td>
                        <td>{booking.noOfChild}</td>
                        <td>{booking.total_bill}</td>
                        <td>{booking.travel_date.toString().split('T')[0]}</td>
                    </tr>
                ))
                }

               {/* {
                bookings.map(booking =>(
                    <tr key={booking.booking_id}>
                        <td>{booking.user.fname}</td>
                        <td>{booking.user.contact}</td>
                        <td>{booking.source}</td>
                        <td>{booking.dest}</td>
                        <td>{booking.adult}</td>
                        <td>{booking.child}</td>
                        <td>{booking.total_bill}</td>
                        <td>{booking.travel_date.toString().split('T')[0]}</td>
                    </tr>
                ))
                } */}
            </tbody>
        </table>
    </div>
  )
}

export default GetBookingDto;
