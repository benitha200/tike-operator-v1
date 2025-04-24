// "use client"

// import Cookies from "js-cookie";
// import React, { useState, useEffect } from "react";
// import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
// import { TbLiveView } from "react-icons/tb";
// import { Car } from "../trips/interfaces";

// export default function Cars() {
//   const [cars, setCars] = useState<Car[]>([]);

//   useEffect(() => {
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       // redirect: "follow"
//     };

//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:3010/cars/", requestOptions);
//         const data = await response.json();
//         setCars(data.payload);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

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
//         <a
//           href="/cars/new"
//           className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
//         >
//           <FiPlus className="-ml-1 mr-2 h-6 w-6" />
//           Add New Car
//         </a>
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
//                     <th scope="col" className="p-4"></th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {cars && cars.map((car) => (
//                     <tr className="hover:bg-gray-100" key={car.id}>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         {car.car_no}
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-normal text-gray-500">
//                         <div className="text-base font-semibold text-gray-900">
//                           {car.brand}
//                         </div>
//                         <div className="text-sm font-normal text-gray-500">
//                           {car.model} / {car.type}
//                         </div>
//                       </td>
//                       {/* Add other table cells as needed */}
//                       <td className="p-4 whitespace-nowrap space-x-2">
//                         <a
//                           href={`/cars/${car.id}`}
//                           className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
//                         >
//                           <FiEdit className="mr-2" />
//                           Edit
//                         </a>
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
//                   {cars && cars.length > 0 ? (
//                       // Render the list of cars here, for example:
//                       cars.map(car => (
//                         <tr>
//                           <td></td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan={3}><center>No Cars Recorded</center></td>
//                       </tr>
//                     )}

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

import { API_URL } from "@/constants/Constants";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Car {
  id: string;
  car_no: string;
  brand: string;
  model: string;
  type: string;
}

export default function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, message: '', onConfirm: () => {} });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(`${API_URL}cars/`, requestOptions);
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data = await response.json();
      setCars(data.payload);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch cars");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (carId: string) => {
    setConfirmDialog({
      isOpen: true,
      message: 'Are you sure you want to delete this car?',
      onConfirm: async () => {
        setIsLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);
        myHeaders.append("Cookie", `csrftoken=${Cookies.get('csrftoken')}`);

        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow" as RequestRedirect
        };

        try {
          const response = await fetch(`${API_URL}cars/${carId}`, requestOptions);
          if (!response.ok) {
            throw new Error('Failed to delete car');
          }
          toast.success("Car deleted successfully");
          fetchCars(); // Refresh the car list
        } catch (error) {
          console.error("Error deleting car:", error);
          toast.error("Failed to delete car");
        } finally {
          setIsLoading(false);
          setConfirmDialog({ isOpen: false, message: '', onConfirm: () => {} });
        }
      }
    });
  };

  const ConfirmDialog = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl">
        <h2 className="text-xl mb-4">{confirmDialog.message}</h2>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => confirmDialog.onConfirm()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </button>
          <button
            onClick={() => setConfirmDialog({ isOpen: false, message: '', onConfirm: () => {} })}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ToastContainer />
      {confirmDialog.isOpen && <ConfirmDialog />}
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
        <a href="/cars/new"
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
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Car No.
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Model / Type
                    </th>
                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                      </td>
                    </tr>
                  ) : cars && cars.length > 0 ? (
                    cars.map((car) => (
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
                        <td className="p-4 whitespace-nowrap space-x-2">
                          <a href={`/cars/${car.id}`}
                            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                          >
                            <FiEdit className="mr-2" />
                            Edit
                          </a>
                          <button
                            type="button"
                            onClick={() => handleDelete(car.id)}
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                          >
                            <FiTrash className="mr-2" />
                            Delete
                          </button>
                        </td>
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

