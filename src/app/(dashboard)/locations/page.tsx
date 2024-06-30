"use client"
import Cookies from "js-cookie";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { Location } from "../trips/interfaces";

export default function Locations() {
  const [data, setData] = useState<Location[]>([]);

  useEffect(() => {
    const get_all_locations = () => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch("http://127.0.0.1:3010/locations/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setData(result.payload);
        })
        .catch((error) => console.error(error));
    };

    get_all_locations();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold">All Locations</h2>
        <div className="sm:w-64 xl:w-96">
          <input
            type="text"
            name="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for a location"
          />
        </div>
        <Link
          href="/locations/new"
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
        >
          <FiPlus className="-ml-1 mr-2 h-6 w-6" />
          Add New Location
        </Link>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full text-center overflow-y-auto divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      Country
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      Address
                    </th>
                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data && data.map((location, index) => (
                    <tr className="hover:bg-gray-100" key={location.id}>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        #{index + 1}
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-normal text-gray-500">
                        <div className="text-base font-semibold text-gray-900">
                          {location.country}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        <div className="text-base font-semibold text-gray-900">
                          {location.city}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap space-x-2">
                        <Link
                          href={`/locations/${location.id}`}
                          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                        >
                          <FiEdit className="mr-2" />
                          Edit
                        </Link>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
// "use client"
// import Cookies from "js-cookie";
// import Link from "next/link";
// import { useState } from "react";
// import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";

// export default function Locations() {

//   useState(()=>{
//     const [data,setData]=useState()
//     function get_all_locations(){
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

//       const requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         // redirect: "follow"
//       };

//       fetch("http://127.0.0.1:3010/locations/", requestOptions)
//         .then((response) => response.json())
//         .then((result) => {
//           console.log(result)
//           setData(result)
        
//         })
//         .catch((error) => console.error(error));
//           }
        
//       get_all_locations();
//   })
//   const locations = [
//     "Nyabugogo",
//     "Nyanza",
//     "Musanze",
//     "Kirehe",
//     "Butare",
//     "Nyagatare",
//     "Rulindo",
//     "Karumuna",
//     "Shyorongi",
//     "Bweyeye",
//   ];
//   return (
//     <>
//       <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
//         <h2 className="text-xl font-semibold">All Locations</h2>
//         <div className="sm:w-64 xl:w-96">
//           <input
//             type="text"
//             name="text"
//             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
//             placeholder="Search for a location"
//           />
//         </div>
//         <Link
//           href="/locations/new"
//           className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
//         >
//           <FiPlus className="-ml-1 mr-2 h-6 w-6" />
//           Add New Location
//         </Link>
//       </div>

//       <div className="flex flex-col">
//         <div className="overflow-x-auto">
//           <div className="align-middle inline-block min-w-full">
//             <div className="shadow overflow-hidden">
//               <table className="table-fixed min-w-full text-center overflow-y-auto divide-y divide-gray-200">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="p-4 text-xs font-medium text-gray-500 uppercase"
//                     >
//                       No.
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-xs font-medium text-gray-500 uppercase"
//                     >
//                       Country
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-4 text-xs font-medium text-gray-500 uppercase"
//                     >
//                       Address
//                     </th>
//                     <th scope="col" className="p-4"></th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((location) => (
//                     <tr className="hover:bg-gray-100" key={location}>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         #{location}
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-normal text-gray-500">
//                         <div className="text-base font-semibold text-gray-900">
//                           Rwanda
//                         </div>
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         <div className="text-base font-semibold text-gray-900">
//                           {locations[location]}
//                         </div>
//                       </td>
//                       <td className="p-4 whitespace-nowrap space-x-2">
//                         <Link
//                           href={`/locations/${location}`}
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
