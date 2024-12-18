// import { FiCheck } from "react-icons/fi";

// export default function NewLocation() {
//   return (
//     <>
//       <form method="get">
//         <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
//           <h2 className="text-xl font-semibold">Create New Location</h2>
//           <button
//             type="button"
//             className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
//           >
//             <FiCheck className="-ml-1 mr-2 h-6 w-6" />
//             Save
//           </button>
//         </div>
//         <div className="flex flex-col p-6">
//           <div className="flex justify-between items-center space-x-4">
//             <div className="mb-6 w-full">
//               <label
//                 htmlFor="country"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Country
//               </label>
//               <select
//                 id="country"
//                 className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//               >
//                 <option>Rwanda</option>
//                 <option>Uganda</option>
//                 <option>Burundi</option>
//                 <option>Tanzania</option>
//                 <option>Kenya</option>
//                 <option>Congo</option>
//               </select>
//             </div>
//             <div className="mb-6 w-full">
//               <label
//                 htmlFor="address"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Address
//               </label>
//               <input
//                 type="text"
//                 id="address"
//                 placeholder="Nyabugogo"
//                 className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//               />
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// }
"use client"
import { FiCheck } from "react-icons/fi";
import { useState } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "@/constants/Constants";

export default function NewLocation() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    country: "Rwanda",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Cookies.get("token")}`);

    const idempotencyKey = uuidv4();
    const raw = JSON.stringify({
      idempotency_key: idempotencyKey,
      ...formData,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      // redirect: "follow",
    };

    try {
      const response = await fetch(`${API_URL}/locations/`, requestOptions);
      const result = await response.json();
      console.log(result);
      toast.success("Location created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create location. Please try again later.");
    }
  };

  return (
    <>
    <ToastContainer/>
      <form onSubmit={handleSubmit} method="post">
        <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold">Create New Location</h2>
          <button
            type="submit"
            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
          >
            <FiCheck className="-ml-1 mr-2 h-6 w-6" />
            Save
          </button>
        </div>
        <div className="flex flex-col p-6">
          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="Rwanda">Rwanda</option>
                <option value="Uganda">Uganda</option>
                <option value="Burundi">Burundi</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Kenya">Kenya</option>
                <option value="Congo">Congo</option>
              </select>
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Nyabugogo"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nyabugogo Branch"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
