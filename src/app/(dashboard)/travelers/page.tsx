// "use client"
// import Cookies from "js-cookie";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { FiEye, FiPlus } from "react-icons/fi";

// export default function Travelers() {

//   const [travelers,setTravelers]=useState();
//   console.log(Cookies.get('token'))


//   useEffect(()=>{
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);
//     const raw = "";

//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       body: raw,
//     };

//     fetch("http://127.0.0.1:3000/travelers/", requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         setTravelers(result)
//         console.log(result)})
//       .catch((error) => console.error(error));
//   },[])
//   return (
//     <>
//       <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
//         <h2 className="text-xl font-semibold">All Travelers</h2>
//         <div className="sm:w-64 xl:w-96">
//           <input
//             type="text"
//             name="text"
//             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
//             placeholder="Search for a traveler"
//           />
//         </div>
//         <Link
//           href="/travelers/new"
//           className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
//         >
//           <FiPlus className="-ml-1 mr-2 h-6 w-6" />
//           Add New Traveler
//         </Link>
//       </div>

//       <div className="flex flex-col">
//         <div className="overflow-x-auto">
//           <div className="align-middle inline-block min-w-full">
//             <div className="shadow overflow-hidden">
//               <table className="table-fixed min-w-full overflow-y-auto divide-y divide-gray-200">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       No.
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       Fullname
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       Contacts
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       Trips
//                     </th>
//                     <th scope="col" className="p-4"></th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((traveler) => (
//                     <tr className="hover:bg-gray-100" key={traveler}>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         #{traveler}
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-normal text-gray-500">
//                         <div className="text-base font-semibold text-gray-900">
//                           Keza Majyambere
//                         </div>
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         <div className="text-base font-semibold text-gray-900">
//                           +250781547202
//                         </div>
//                         <div className="text-sm font-normal text-gray-500">
//                           email@domain.com
//                         </div>
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         <div className="text-base font-semibold text-gray-900">
//                           50,000 Rwf
//                         </div>
//                         <div className="text-sm font-normal text-gray-500">
//                           5 Trips
//                         </div>
//                       </td>
//                       <td className="p-4 whitespace-nowrap space-x-2">
//                         <Link
//                           href={`/travelers/${traveler}`}
//                           className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
//                         >
//                           <FiEye className="mr-2" />
//                           View
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
"use client"
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";

export default function Travelers() {
  const [travelers, setTravelers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch("http://127.0.0.1:3000/travelers/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTravelers(result.payload);
      })
      .catch((error) => console.error(error));
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when search term changes
  };

  // Function to paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Logic for pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentTravelers = travelers.slice(indexOfFirstBooking, indexOfLastBooking);

  // Function to filter travelers based on search term
  const filteredTravelers = currentTravelers.filter((traveler) =>
    traveler.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold">All Travelers</h2>
        <div className="sm:w-64 xl:w-96">
          <input
            type="text"
            name="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for a traveler"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full overflow-y-auto divide-y divide-gray-200">
                {/* Table Header */}
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="p-4">No.</th>
                    <th scope="col" className="p-4">Fullname</th>
                    <th scope="col" className="p-4">Contacts</th>
                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTravelers.map((traveler, index) => (
                    <tr className="hover:bg-gray-100" key={traveler.id}>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-normal text-gray-500">
                        <div className="text-base font-semibold text-gray-900">
                          {traveler.fullname}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        <div className="text-base font-semibold text-gray-900">
                          {traveler.phone_number}
                        </div>
                        <div className="text-sm font-normal text-gray-500">
                          {traveler.email}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap space-x-2">
                        <Link
                          href={`/travelers/${traveler.id}`}
                          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                        >
                          <FiEye className="mr-2" />
                          View
                        </Link>
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
      <div className="flex justify-between items-center p-5 bg-white border-t border-gray-200">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center w-2/8"
        >
          Previous
        </button>
        <span className="text-sm font-normal text-gray-500">
          Showing <span className="text-gray-900 font-semibold">{indexOfFirstBooking + 1}-{Math.min(indexOfLastBooking, travelers.length)}</span> of{" "}
          <span className="text-gray-900 font-semibold">{travelers.length}</span>
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastBooking >= travelers.length}
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center w-2/8"
        >
          Next
        </button>
      </div>
    </>
  );
}


