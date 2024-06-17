"use client"

import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { TbLiveView } from "react-icons/tb";

export default function Cars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      // redirect: "follow"
    };

    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3010/cars/", requestOptions);
        const data = await response.json();
        setCars(data.payload);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold">All Cars</h2>
        <div className="sm:w-64 xl:w-96">
          <input
            type="text"
            name="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for a car"
          />
        </div>
        <a
          href="/cars/new"
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
        >
          <FiPlus className="-ml-1 mr-2 h-6 w-6" />
          Add New Car
        </a>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full overflow-y-auto divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Car No.
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Model / Type
                    </th>
                    {/* Add other table headers as needed */}
                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cars && cars.map((car) => (
                    <tr className="hover:bg-gray-100" key={car.id}>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {car.car_no}
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-normal text-gray-500">
                        <div className="text-base font-semibold text-gray-900">
                          {car.brand}
                        </div>
                        <div className="text-sm font-normal text-gray-500">
                          {car.model} / {car.type}
                        </div>
                      </td>
                      {/* Add other table cells as needed */}
                      <td className="p-4 whitespace-nowrap space-x-2">
                        <a
                          href={`/cars/${car.id}`}
                          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                        >
                          <FiEdit className="mr-2" />
                          Edit
                        </a>
                        <button
                          type="button"
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                        >
                          <FiTrash className="mr-2" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {cars && cars.length > 0 ? (
                      // Render the list of cars here, for example:
                      cars.map(car => (
                        <tr>
                          <td></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3}><center>No Cars Recorded</center></td>
                      </tr>
                    )}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


// import { randomInt } from "crypto";
// import Link from "next/link";
// import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
// import { TbLiveView } from "react-icons/tb";

// export default function Cars() {
//   return (
//     <>
//       <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
//         <h2 className="text-xl font-semibold">All Cars</h2>
//         <div className="sm:w-64 xl:w-96">
//           <input
//             type="text"
//             name="text"
//             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
//             placeholder="Search for a car"
//           />
//         </div>
//         <Link
//           href="/cars/new"
//           className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
//         >
//           <FiPlus className="-ml-1 mr-2 h-6 w-6" />
//           Add New Car
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
//                       Car No.
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       Model / Type
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       Seats
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
//                     >
//                       Misc
//                     </th>
//                     <th scope="col" className="p-4"></th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((car) => (
//                     <tr className="hover:bg-gray-100" key={car}>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         RAE {randomInt(300)} A
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-normal text-gray-500">
//                         <div className="text-base font-semibold text-gray-900">
//                           Benz
//                         </div>
//                         <div className="text-sm font-normal text-gray-500">
//                           Cross Country / Touareg
//                         </div>
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         <div className="text-base font-semibold text-gray-900">
//                           31 Seats
//                         </div>
//                         <div className="text-sm font-normal text-gray-500">
//                           5 Window Seats
//                         </div>
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         <div className="text-base font-semibold text-gray-900">
//                           2 Luggages
//                         </div>
//                         <div className="text-sm font-normal text-gray-500">
//                           1 Carry-On Luggage
//                         </div>
//                       </td>
//                       <td className="grid grid-cols-3 gap-3 p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         {randomInt(10) % 2 == 0 ? (
//                           <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
//                             <TbLiveView className="mr-1" />
//                             Live Tracking
//                           </span>
//                         ) : null}
//                         {randomInt(10) % 2 == 0 ? (
//                           <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
//                             <TbLiveView className="mr-1" />
//                             Reclining Seat
//                           </span>
//                         ) : null}
//                         {randomInt(10) % 2 == 0 ? (
//                           <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
//                             <TbLiveView className="mr-1" />
//                             Power Outlets
//                           </span>
//                         ) : null}
//                         {randomInt(10) % 2 == 0 ? (
//                           <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
//                             <TbLiveView className="mr-1" />
//                             Air Conditioning
//                           </span>
//                         ) : null}
//                         {randomInt(10) % 2 == 0 ? (
//                           <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
//                             <TbLiveView className="mr-1" />
//                             Blanket
//                           </span>
//                         ) : null}
//                         {randomInt(10) % 2 == 0 ? (
//                           <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
//                             <TbLiveView className="mr-1" />
//                             Pillow
//                           </span>
//                         ) : null}
//                       </td>
//                       <td className="p-4 whitespace-nowrap space-x-2">
//                         <Link
//                           href={`/cars/${car}`}
//                           className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
//                         >
//                           <FiEdit className="mr-2" />
//                           Edit
//                         </Link>
//                         <button
//                           type="button"
//                           className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
//                         >
//                           <FiTrash className="mr-2" />
//                           Delete
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
//     </>
//   );
// }
