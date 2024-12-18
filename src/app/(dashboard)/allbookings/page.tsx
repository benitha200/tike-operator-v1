// import Link from "next/link";
// import { FiPlus } from "react-icons/fi";

// interface Props {}

// function Cars(props: Props) {
//   const {} = props;

//   return (
//     <>
//       <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
//         <h2 className="text-xl font-semibold">All Bookings</h2>
//         <form>
//           <div className="sm:w-64 xl:w-96">
//             <input
//               type="text"
//               name="text"
//               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
//               placeholder="Search for Booking"
//             />
//           </div>
//         </form>
//         <Link
//           href="/cars/new"
//           className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
//         >
//           <FiPlus className="-ml-1 mr-2 h-6 w-6" />
//           Add Booking
//         </Link>
//       </div>
//       <div className="flex flex-col">
//         <div className="overflow-x-auto">
//           <div className="align-middle inline-block min-w-full">
//             <div className="shadow overflow-hidden">
//               <table className="table-fixed min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th scope="col" className="p-4">
//                       <div className="flex items-center">
//                         <input
//                           id="checkbox-all"
//                           aria-describedby="checkbox-1"
//                           type="checkbox"
//                           className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
//                         />
//                         <label htmlFor="checkbox-all" className="sr-only">
//                           checkbox
//                         </label>
//                       </div>
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       Product Name
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       Technology
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       ID
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       Price
//                     </th>
//                     <th scope="col" className="p-4"></th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   <tr className="hover:bg-gray-100">
//                     <td className="p-4 w-4">
//                       <div className="flex items-center">
//                         <input
//                           id="checkbox-id"
//                           aria-describedby="checkbox-1"
//                           type="checkbox"
//                           className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
//                         />
//                         <label htmlFor="checkbox-id" className="sr-only">
//                           checkbox
//                         </label>
//                       </div>
//                     </td>
//                     <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
//                       <div className="text-base font-semibold text-gray-900">
//                         name
//                       </div>
//                       <div className="text-sm font-normal text-gray-500">
//                         category
//                       </div>
//                     </td>
//                     <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                       technology
//                     </td>
//                     <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                       #id
//                     </td>
//                     <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                       price
//                     </td>
//                     <td className="p-4 whitespace-nowrap space-x-2">
//                       <button
//                         type="button"
//                         data-modal-toggle="product-modal"
//                         className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
//                       >
//                         <svg
//                           className="mr-2 h-5 w-5"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
//                           <path
//                             fill-rule="evenodd"
//                             d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
//                             clip-rule="evenodd"
//                           ></path>
//                         </svg>
//                         Edit item
//                       </button>
//                       <button
//                         type="button"
//                         data-modal-toggle="delete-product-modal"
//                         className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
//                       >
//                         <svg
//                           className="mr-2 h-5 w-5"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             fill-rule="evenodd"
//                             d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
//                             clip-rule="evenodd"
//                           ></path>
//                         </svg>
//                         Delete item
//                       </button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
//         <div className="flex items-center mb-4 sm:mb-0">
//           <a
//             href="#"
//             className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
//           >
//             -
//           </a>
//           <a
//             href="#"
//             className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2"
//           >
//             -
//           </a>
//           <span className="text-sm font-normal text-gray-500">
//             Showing <span className="text-gray-900 font-semibold">1-20</span> of{" "}
//             <span className="text-gray-900 font-semibold">2290</span>
//           </span>
//         </div>
//         <div className="flex items-center space-x-3">
//           <a
//             href="#"
//             className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
//           >
//             Previous
//           </a>
//           <a
//             href="#"
//             className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
//           >
//             Next
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Cars;

"use client"
import { API_URL } from "@/constants/Constants";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function Cars() {
    interface Bookings {
      id:string
      departure_location: {
          id: string;
          name:string;
          country:string;
      };
      arrival_location: {
          id: string;
          name:string;
          country:string;
      };
      traveler:{
        fullname:string;
      }
      trip:{
        departure_location:{
          name:string
          city:string
        }
        arrival_location:{
          name:string
          city:string
        }
      }
      departure_time:Date
      arrival_time:Date
      price:string
      
      // Other properties
  }
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(20);

  function get_bookings() {
    console.log("function");
  }

  useEffect(() => {
    get_bookings();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${API_URL}/bookings/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setBookings(result.payload);
        console.log(result);
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredBookings = bookings && bookings.filter((booking) =>
    booking.traveler.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  // Logic for pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings && filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = (event: React.FormEvent<HTMLFormElement>) => {
    // setSearchTerm(event.target.value);
    // setSearchTerm(inputElement.value);
    setCurrentPage(1); // Reset to first page when searching
  }
  

  return (
    <>
      <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold">All Bookings</h2>
        <form>
          <div className="sm:w-64 xl:w-96">
          <input
            type="text"
            name="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for Booking"
            value={searchTerm}
            onChange={(e)=>handleSearchChange} // Use the corrected event handler
          />
          </div>
        </form>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                        />
                        <label htmlFor="checkbox-all" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Traveler Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Departure Location
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Arrival Location
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Price
                    </th>
                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentBookings && currentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-100">
                      <td className="p-4 w-4">
                        <div className="flex items-center">
                          <input
                            id={`checkbox-${booking.id}`}
                            aria-describedby="checkbox-1"
                            type="checkbox"
                            className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                          />
                          <label
                            htmlFor={`checkbox-${booking.id}`}
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        <div className="text-base font-semibold text-gray-900">
                          {booking.traveler.fullname}
                        </div>
                        <div className="text-sm font-normal text-gray-500">
                          {booking.trip.departure_location.city} to {booking.trip.arrival_location.city}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {booking.trip.departure_location.name}
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {booking.trip.arrival_location.name}
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {booking.price}
                      </td>
                      <td className="p-4 whitespace-nowrap space-x-2">
                        {/* <button
                          type="button"
                          data-modal-toggle="product-modal"
                          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                        >
                          Edit
                        </button> */}
                        <button
                          type="button"
                          data-modal-toggle="delete-product-modal"
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                        >
                         Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-sm font-normal text-gray-500">
            Showing{" "}
            <span className="text-gray-900 font-semibold">
              {indexOfFirstBooking + 1}-
              {Math.min(indexOfLastBooking, filteredBookings?.length || 0)}
            </span>{" "}
            of{" "}
            <span className="text-gray-900 font-semibold">
              {filteredBookings && filteredBookings.length}
            </span>{" "}
            bookings
          </span>
        </div>
        <div className="flex items-center space-x-3">
          {/* Previous button */}
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
          >
            Previous
          </button>
          {/* Next button */}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastBooking >= (filteredBookings && filteredBookings.length)}
            className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
          >

            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Cars;


