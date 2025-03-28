// "use client"
// import { FiCheck } from "react-icons/fi";
// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { Location } from "../../trips/interfaces";
// import { ToastContainer,toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { API_URL } from "@/constants/Constants";



// export default function EditLocation() {
//   const [location, setLocation] = useState<Location>();
//   const [formData, setFormData] = useState({
//     name: "",
//     city: "",
//     country: "",
//   });

//   const currentUrl = window.location.href;
//   const urlParts = currentUrl.split('/');
//   const locationId = urlParts[urlParts.length - 1];
//   const defaultLocation = { id: 'default' }; 

//   useEffect(() => {
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       // redirect: "follow",
//     };

//     fetch(
//       `${API_URL}locations/${locationId}`,
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result.payload)
//         setLocation(result.payload);
//         setFormData(result.payload);
//       })
//       .catch((error) => console.error(error));
//   }, [locationId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

//     const raw = JSON.stringify(formData);

//     const requestOptions = {
//       method: "PATCH",
//       headers: myHeaders,
//       body: raw,
//       // redirect: "follow",
//     };

//     try {
//       const response = await fetch(
//         `${API_URL}locations/${(location || defaultLocation).id}`,
//         requestOptions
//       );
//       const result = await response.json();
//       console.log(result);
//       toast.success("Location updated successfully!");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update location. Please try again later.");
//     }
//   };

//   return (
//     <>
//     <ToastContainer />
//       {location && (
//         <form onSubmit={handleSubmit} method="post">
//           <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
//             <h2 className="text-xl font-semibold">
//               Edit Location: {location.name}
//             </h2>
//             <button
//               type="submit"
//               className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
//             >
//               <FiCheck className="-ml-1 mr-2 h-6 w-6" />
//               Save Changes
//             </button>
//           </div>
//           <div className="flex flex-col p-6">
//             <div className="flex justify-between items-center space-x-4">
//               <div className="mb-6 w-full">
//                 <label
//                   htmlFor="country"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Country
//                 </label>
//                 <select
//                   id="country"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required
//                 >
//                   <option value="Rwanda">Rwanda</option>
//                   <option value="Uganda">Uganda</option>
//                   <option value="Burundi">Burundi</option>
//                   <option value="Tanzania">Tanzania</option>
//                   <option value="Kenya">Kenya</option>
//                   <option value="Congo">Congo</option>
//                 </select>
//               </div>
//               <div className="mb-6 w-full">
//                 <label
//                   htmlFor="address"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="city"
//                   placeholder={location.city}
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div className="mb-6 w-full">
//                 <label
//                   htmlFor="name"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   placeholder={location.name}
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required
//                 />
//               </div>
//             </div>
//           </div>
//         </form>
//       )}
//     </>
//   );
// }


"use client"
import { FiCheck } from "react-icons/fi";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Location } from "../../trips/interfaces";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "@/constants/Constants";
import { useParams } from "next/navigation";

export default function EditLocation() {
  const params = useParams();
  const locationId = params?.id as string;
  
  const [location, setLocation] = useState<Location>();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    if (!locationId) return;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(
      `${API_URL}locations/${locationId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.payload)
        setLocation(result.payload);
        setFormData(result.payload);
      })
      .catch((error) => console.error(error));
  }, [locationId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!locationId) {
      toast.error("Location ID is missing");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const raw = JSON.stringify(formData);

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch(
        `${API_URL}locations/${locationId}`,
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      toast.success("Location updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update location. Please try again later.");
    }
  };

  if (!locationId) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      {location && (
        <form onSubmit={handleSubmit} method="post">
          <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
            <h2 className="text-xl font-semibold">
              Edit Location: {location.name}
            </h2>
            <button
              type="submit"
              className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
            >
              <FiCheck className="-ml-1 mr-2 h-6 w-6" />
              Save Changes
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
                  placeholder={location.city}
                  value={formData.city}
                  onChange={handleChange}
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
                  placeholder={location.name}
                  value={formData.name}
                  onChange={handleChange}
                  className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}