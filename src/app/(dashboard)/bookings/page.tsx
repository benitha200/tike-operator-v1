// "use client"
// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";

// interface Booking {
//   id: string;
//   payment_status: string;
//   departure_location: {
//     id: string;
//     name: string;
//     country: string;
//   };
//   arrival_location: {
//     id: string;
//     name: string;
//     country: string;
//   };
//   traveler: {
//     fullname: string;
//   };
//   trip: {
//     departure_location: {
//       name: string;
//       city: string;
//     };
//     arrival_location: {
//       name: string;
//       city: string;
//     };
//   };
//   departure_time: Date;
//   arrival_time: Date;
//   price: string;
// }

// const Bookings = () => {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [paymentStatus, setPaymentStatus] = useState<"all" | "PAID" | "unpaid">(
//     "all"
//   );
//   const [currentPage, setCurrentPage] = useState(1);
//   const [bookingsPerPage] = useState(10);

//   useEffect(() => {
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${Cookies.get("token")}`);

//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//     };

//     fetch(`${process.env.NEXT_PUBLIC_API_URL}bookings/`, requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         setBookings(result.payload);
//         setFilteredBookings(result.payload);
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   useEffect(() => {
//     const filteredBookings = bookings.filter((booking) => {
//       if (searchTerm.trim() !== "") {
//         return booking.traveler.fullname
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase());
//       }
//       return true;
//     });

//     if (paymentStatus !== "all") {
//       filteredBookings.filter(
//         (booking) => booking.payment_status === "Paid"
//       );
//     }

//     setFilteredBookings(filteredBookings);
//   }, [bookings, searchTerm, paymentStatus]);

//   // Logic for pagination
//   const indexOfLastBooking = currentPage * bookingsPerPage;
//   const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
//   const currentBookings = filteredBookings.slice(
//     indexOfFirstBooking,
//     indexOfLastBooking
//   );

//   // Change page
//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const handlePaymentStatusChange = (status: "all" | "PAID" | "unpaid") => {
//     setPaymentStatus(status);
//   };

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>All Bookings</CardTitle>
//         <div className="flex space-x-4">
//           <Input
//             type="text"
//             placeholder="Search for Booking"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className="w-full sm:w-64 xl:w-96"
//           />
//           <div className="flex items-center space-x-2">
//             <Checkbox
//               id="payment-status-all"
//               checked={paymentStatus === "all"}
//               onChange={() => handlePaymentStatusChange("all")}
//             />
//             <label htmlFor="payment-status-all">All</label>
//             <Checkbox
//               id="payment-status-paid"
//               checked={paymentStatus === "PAID"}
//               onChange={() => handlePaymentStatusChange("PAID")}
//             />
//             <label htmlFor="payment-status-paid">Paid</label>
//             <Checkbox
//               id="payment-status-unpaid"
//               checked={paymentStatus === "unpaid"}
//               onChange={() => handlePaymentStatusChange("unpaid")}
//             />
//             <label htmlFor="payment-status-unpaid">Unpaid</label>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <table className="table-auto w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
//                 Booking Id
//               </th>
//               <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
//                 Traveler Name
//               </th>
//               <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
//                 Departure Location
//               </th>
//               <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
//                 Arrival Location
//               </th>
//               <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
//                 Price
//               </th>
//               <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
//                 Payment Status
//               </th>
//               <th scope="col" className="p-4"></th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentBookings.map((booking) => (
//               <tr key={booking.id} className="hover:bg-gray-100">
//                 <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                   {booking.id}
//                 </td>
//                 <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
//                   <div className="text-base font-semibold text-gray-900">
//                     {booking.traveler.fullname}
//                   </div>
//                   <div className="text-sm font-normal text-gray-500">
//                     {booking.trip.departure_location.city} to{" "}
//                     {booking.trip.arrival_location.city}
//                   </div>
//                 </td>
//                 <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                   {booking.trip.departure_location.name}
//                 </td>
//                 <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                   {booking.trip.arrival_location.name}
//                 </td>
//                 <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                   {booking.price}
//                 </td>
//                 <td
//                   className={`p-4 whitespace-nowrap text-base font-medium ${
//                     booking.payment_status==="PAID"
//                       ? "text-green-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {booking.payment_status === "PAID" ? "Paid" : "Unpaid"}
//                 </td>
//                 <td className="p-4 whitespace-nowrap space-x-2">
//                   {booking.payment_status ? (
//                     <Button
//                       onClick={() => {
//                         // Handle view action for paid bookings
//                       }}
//                     >
//                       View
//                     </Button>
//                   ) : (
//                     <Button
//                       onClick={() => {
//                         // Handle cancel action for unpaid bookings
//                       }}
//                     >
//                       Cancel
//                     </Button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </CardContent>
//       <CardFooter className="flex justify-between items-center">
//         <div className="text-sm font-normal text-gray-500">
//           Showing{" "}
//           <span className="text-gray-900 font-semibold">
//             {indexOfFirstBooking + 1}-
//             {Math.min(indexOfLastBooking, filteredBookings.length)}
//           </span>{" "}
//           of{" "}
//           <span className="text-gray-900 font-semibold">
//             {filteredBookings.length}
//           </span>{" "}
//           bookings
//         </div>
//         <div className="flex items-center space-x-3">
//           <Button
//             onClick={() => paginate(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </Button>
//           <Button
//             onClick={() => paginate(currentPage + 1)}
//             disabled={indexOfLastBooking >= filteredBookings.length}
//           >
//             Next
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

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
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { FiEye } from "react-icons/fi";

interface Booking {
  id: string;
  payment_status: string;
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

const TableSkeleton = () => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {[...Array(5)].map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="p-4 whitespace-nowrap">
            <Skeleton className="h-4 w-24" />
          </td>
          <td className="p-4 whitespace-nowrap">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-24" />
          </td>
          <td className="p-4 whitespace-nowrap">
            <Skeleton className="h-4 w-28" />
          </td>
          <td className="p-4 whitespace-nowrap">
            <Skeleton className="h-4 w-28" />
          </td>
          <td className="p-4 whitespace-nowrap">
            <Skeleton className="h-4 w-16" />
          </td>
          <td className="p-4 whitespace-nowrap">
            <Skeleton className="h-4 w-16" />
          </td>
          <td className="p-4 whitespace-nowrap">
            <Skeleton className="h-8 w-16" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"all" | "PAID" | "unpaid">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
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
        (booking) => booking.payment_status === "Paid"
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

  const handlePaymentStatusChange = (status: "all" | "PAID" | "unpaid") => {
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
              checked={paymentStatus === "PAID"}
              onChange={() => handlePaymentStatusChange("PAID")}
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
                Booking Id
              </th>
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
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <tbody className="bg-white divide-y divide-gray-200">
              {currentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-100">
                  <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                    {booking.id}
                  </td>
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
                      booking.payment_status==="PAID"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {booking.payment_status === "PAID" ? "Paid" : "Unpaid"}
                  </td>
                  <td className="p-4 whitespace-nowrap space-x-2">
                    {booking.payment_status==="PAID" ? (
                      <Link
                      href={`/`}
                      className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                    >
                      <FiEye className="mr-2" />
                      View
                    </Link>
                    ) : (
                      <Link
                      href={`/`}
                      className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                    >
                      <FiEye className="mr-2" />
                      Cancel
                    </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
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
