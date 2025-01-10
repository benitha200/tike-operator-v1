"use client"
import Cookies from "js-cookie";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { Location } from "../trips/interfaces";
import { API_URL } from "@/constants/Constants";

export default function Locations() {
  const [data, setData] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<Location[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    const filtered = data.filter(
      (location) =>
        location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const fetchLocations = () => {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${API_URL}locations/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.payload);
        setFilteredData(result.payload);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteClick = (locationId: string) => {
    setLocationToDelete(locationId);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    if (locationToDelete) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);
      myHeaders.append("Cookie", "csrftoken=m4Li2tWC0w0QKzBHV7e8tal2rnYqh6nj");

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect,
      };

      fetch(`${API_URL}locations/${locationToDelete}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          fetchLocations(); // Refresh the locations list
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setShowModal(false);
          setLocationToDelete(null);
        });
    }
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
    setLocationToDelete(null);
  };

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
            value={searchTerm}
            onChange={handleSearch}
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

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden">
                <table className="table-fixed min-w-full text-center overflow-y-auto divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                        No.
                      </th>
                      <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                        Country
                      </th>
                      <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                        Address
                      </th>
                      <th scope="col" className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((location, index) => (
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
                            onClick={() => handleDeleteClick(location.id)}
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
      )}

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiTrash className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Location
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this location? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={handleDeleteCancel}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
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

//       fetch("http://localhost:3010/locations/", requestOptions)
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
