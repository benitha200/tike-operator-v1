// "use client"
// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";

// function Bookings() {
//     interface Bookings {
//       id:string
//       payment_status:boolean
//       departure_location: {
//           id: string;
//           name:string;
//           country:string;
//       };
//       arrival_location: {
//           id: string;
//           name:string;
//           country:string;
//       };
//       traveler:{
//         fullname:string;
//       }
//       trip:{
//         departure_location:{
//           name:string
//           city:string
//         }
//         arrival_location:{
//           name:string
//           city:string
//         }
//       }
//       departure_time:Date
//       arrival_time:Date
//       price:string
      
//       // Other properties
//   }
//   const [bookings, setBookings] = useState<Bookings[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [bookingsPerPage] = useState(20);

//   function get_bookings() {
//     console.log("function");
//   }

//   useEffect(() => {
//     get_bookings();
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//     };

//     fetch(`${process.env.NEXT_PUBLIC_API_URL}bookings/`, requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         setBookings(result.payload);
//         console.log(result);
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   const filteredBookings = bookings && bookings.filter((booking) =>
//     booking.traveler.fullname.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  

//   // Logic for pagination
//   const indexOfLastBooking = currentPage * bookingsPerPage;
//   const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
//   const currentBookings = filteredBookings && filteredBookings.slice(
//     indexOfFirstBooking,
//     indexOfLastBooking
//   );
  

//   // Change page
//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <>
//       <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
//         <h2 className="text-xl font-semibold">All Bookings</h2>
//         <form>
//           <div className="sm:w-64 xl:w-96">
//           <input
//           type="text"
//           name="text"
//           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
//           placeholder="Search for Booking"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//           </div>
//         </form>
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
//                       Traveler Name
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       Departure Location
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       Arrival Location
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       Price
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       Payment Status
//                     </th>
//                     <th scope="col" className="p-4"></th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {currentBookings && currentBookings.map((booking) => (
//                     <tr key={booking.id} className="hover:bg-gray-100">
//                       <td className="p-4 w-4">
//                         <div className="flex items-center">
//                           <input
//                             id={`checkbox-${booking.id}`}
//                             aria-describedby="checkbox-1"
//                             type="checkbox"
//                             className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
//                           />
//                           <label
//                             htmlFor={`checkbox-${booking.id}`}
//                             className="sr-only"
//                           >
//                             checkbox
//                           </label>
//                         </div>
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
//                         <div className="text-base font-semibold text-gray-900">
//                           {booking?.traveler?.fullname}
//                         </div>
//                         <div className="text-sm font-normal text-gray-500">
//                           {booking?.trip?.departure_location?.city} to {booking?.trip?.arrival_location?.city}
//                         </div>  
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         {booking?.trip?.departure_location?.name}
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         {booking?.trip?.arrival_location?.name}
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         {booking?.price}
//                       </td>
//                       <td
//                         className={`p-4 whitespace-nowrap text-base font-medium ${
//                           booking?.payment_status ? "text-gray-900" : "text-red-600"
//                         }`}
//                       >
//                         {booking?.payment_status}
//                       </td>

//                       <td className="p-4 whitespace-nowrap space-x-2">
//                         {/* <button
//                           type="button"
//                           data-modal-toggle="product-modal"
//                           className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
//                         >
//                           Edit
//                         </button> */}
//                         <button
//                           type="button"
//                           data-modal-toggle="delete-product-modal"
//                           className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
//                         >
//                          Cancel
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
//         <div className="flex items-center mb-4 sm:mb-0">
//           <span className="text-sm font-normal text-gray-500">
//             Showing{" "}
//             <span className="text-gray-900 font-semibold">
//               {indexOfFirstBooking + 1}-
//               {Math.min(indexOfLastBooking, filteredBookings?.length || 0)}
//             </span>{" "}
//             of{" "}
//             <span className="text-gray-900 font-semibold">
//               {filteredBookings && filteredBookings.length}
//             </span>{" "}
//             bookings
//           </span>
//         </div>
//         <div className="flex items-center space-x-3">
//           {/* Previous button */}
//           <button
//             onClick={() => paginate(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
//           >
//             Previous
//           </button>
//           {/* Next button */}
//           <button
//             onClick={() => paginate(currentPage + 1)}
//             disabled={indexOfLastBooking >= (filteredBookings && filteredBookings.length)}
//             className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
//           >

//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Bookings;

"use client"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface Booking {
  id: string;
  payment_status: boolean;
  departure_location: {
    id: string;
    name: string;
    country: string;
  };
  arrival_location: {
    id: string;
    name: string;
    country: string;
  };
  traveler: {
    fullname: string;
  };
  trip: {
    departure_location: {
      name: string;
      city: string;
    };
    arrival_location: {
      name: string;
      city: string;
    };
  };
  departure_time: Date;
  arrival_time: Date;
  price: string;
}

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"all" | "paid" | "unpaid">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(20);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get("token")}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}bookings/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setBookings(result.payload);
        setFilteredBookings(result.payload);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const filteredBookings = bookings.filter((booking) => {
      if (searchTerm.trim() !== "") {
        return booking.traveler.fullname
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
      return true;
    });

    if (paymentStatus !== "all") {
      filteredBookings.filter(
        (booking) => booking.payment_status === (paymentStatus === "paid")
      );
    }

    setFilteredBookings(filteredBookings);
  }, [bookings, searchTerm, paymentStatus]);

  // Logic for pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePaymentStatusChange = (status: "all" | "paid" | "unpaid") => {
    setPaymentStatus(status);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>All Bookings</CardTitle>
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Search for Booking"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full sm:w-64 xl:w-96"
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="payment-status-all"
              checked={paymentStatus === "all"}
              onChange={() => handlePaymentStatusChange("all")}
            />
            <label htmlFor="payment-status-all">All</label>
            <Checkbox
              id="payment-status-paid"
              checked={paymentStatus === "paid"}
              onChange={() => handlePaymentStatusChange("paid")}
            />
            <label htmlFor="payment-status-paid">Paid</label>
            <Checkbox
              id="payment-status-unpaid"
              checked={paymentStatus === "unpaid"}
              onChange={() => handlePaymentStatusChange("unpaid")}
            />
            <label htmlFor="payment-status-unpaid">Unpaid</label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <table className="table-auto w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                Traveler Name
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                Departure Location
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                Arrival Location
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                Payment Status
              </th>
              <th scope="col" className="p-4"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-100">
                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                  <div className="text-base font-semibold text-gray-900">
                    {booking.traveler.fullname}
                  </div>
                  <div className="text-sm font-normal text-gray-500">
                    {booking.trip.departure_location.city} to{" "}
                    {booking.trip.arrival_location.city}
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
                <td
                  className={`p-4 whitespace-nowrap text-base font-medium ${
                    booking.payment_status
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.payment_status ? "Paid" : "Unpaid"}
                </td>
                <td className="p-4 whitespace-nowrap space-x-2">
                  {booking.payment_status ? (
                    <Button
                      onClick={() => {
                        // Handle view action for paid bookings
                      }}
                    >
                      View
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        // Handle cancel action for unpaid bookings
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm font-normal text-gray-500">
          Showing{" "}
          <span className="text-gray-900 font-semibold">
            {indexOfFirstBooking + 1}-
            {Math.min(indexOfLastBooking, filteredBookings.length)}
          </span>{" "}
          of{" "}
          <span className="text-gray-900 font-semibold">
            {filteredBookings.length}
          </span>{" "}
          bookings
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastBooking >= filteredBookings.length}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Bookings;

