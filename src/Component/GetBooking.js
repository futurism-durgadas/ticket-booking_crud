// import React, { useEffect, useState } from 'react'
// import BookingService from '../Service/BookingService'
// import { Pagination ,PaginationItem, PaginationLink} from 'reactstrap'


// function GetBooking() {
//     const [bookInfo, setBookInfo] = useState([])

//     const[bookingContent,setBookingContent] = useState({
//         content :[],
//         totalPages:'',
//         totalElements:'',
//         pageSize:'',
//         lastPage:false,
//         pageNumber:''
//     })

//     useEffect(() => {
//         BookingService.getAllBookingInfo().then((response) => {
//             setBookInfo(response.data)
//             console.log(response.data);
//         }).catch(error => {
//             console.log(error);
//         })
//     }, [])
//     return (
//         <div className="Container">
//             <h2 className="text-center">Booking Info</h2>
//             <table className="table table-bordered table-striped">
//                 <thead>
//                     <th>Source City</th>
//                     <th>Destination</th>
//                     <th>No of Adult</th>
//                     <th>No of Child</th>
//                     <th>Total Bill</th>
//                     <th>Travel Date</th>
//                 </thead>
//                 <tbody>
//                     {
//                         bookInfo.map(
//                             book =>           //book is alias map function
//                                 <tr key={book.booking_id}>
//                                     {/* <td>{book.user_id}</td> */}
//                                     <td>{book.source}</td>
//                                     <td>{book.dest}</td>
//                                     <td>{book.adult}</td>
//                                     <td>{book.child}</td>
//                                     <td>{book.total_bill}</td>
//                                     <td>{book.travel_date.toString().split('T')[0]}</td>
//                                 </tr>
//                         )
//                     }
//                 </tbody>
//             </table>
//             <div className='Container mt-3'>
//             <Pagination>
//                 <PaginationItem>
//                     <PaginationLink previous disabled={bookingContent.pageNumber ==0}/>
//                 </PaginationItem>

//                 <PaginationItem>
//                     {
//                         [...Array(bookingContent.totalPages)].map((item,index) =>(
                            
//                         ))
//                     }
//                     <PaginationLink>
//                         1
//                     </PaginationLink>
//                 </PaginationItem>

//                 <PaginationItem>
//                     <PaginationLink
//                         href="#"
//                         next
//                     />
//                 </PaginationItem>

//             </Pagination>
//             </div>
//         </div>
//     )
// }

// export default GetBooking;
