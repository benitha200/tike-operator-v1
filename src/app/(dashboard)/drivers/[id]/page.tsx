"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type DriverData = {
  id: string;
  fullname: string;
  gender: string;
  phone_number: string;
  nationality: string;
  dob: string | null;
  emergency_contact_name: string;
  emergency_contact_email: string | null;
  emergency_contact_phone_number: string | null;
};

export default function ViewDriver() {
  const [data, setData] = useState<DriverData | null>(null);
  const [formData, setFormData] = useState<DriverData>({
    id: "",
    fullname: "",
    gender: "",
    phone_number: "",
    nationality: "",
    dob: null,
    emergency_contact_name: "",
    emergency_contact_email: null,
    emergency_contact_phone_number: null
  });

  useEffect(() => {
    const getOneDriver = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

      const currentUrl = window.location.href;
      const urlParts = currentUrl.split('/');
      const driverId = urlParts[urlParts.length - 1];

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(`https://api.tike.rw/drivers/${driverId}`, requestOptions);

        if (!response.ok) {
          throw new Error(`Failed to fetch driver: ${response.statusText}`);
        }

        const result = await response.json();
        if (result.payload) {
          setData(result.payload);
          setFormData(result.payload);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getOneDriver();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!data) {
      console.error("Driver data is not available for submission");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(`https://api.tike.rw/drivers/${data.id}`, requestOptions);

      if (!response.ok) {
        throw new Error(`Failed to update driver: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Driver updated successfully:", result);
      toast.success("Driver updated successfully")
    } catch (error) {
      console.error("Failed to update driver:", error);
      toast.error("Failed to update driver")
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            Edit Driver: {formData.fullname || ""}
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
            <div className="mb-6 w-full pr-2">
              <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Fullname
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6 w-full pl-2">
              <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6 w-full">
              <label htmlFor="nationality" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nationality
              </label>
              <select
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
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
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob || ''}
              onChange={handleInputChange}
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full pr-2">
              <label htmlFor="emergency_contact_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Emergency Contact Name
              </label>
              <input
                type="text"
                id="emergency_contact_name"
                name="emergency_contact_name"
                value={formData.emergency_contact_name}
                onChange={handleInputChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6 w-full pl-2">
              <label htmlFor="emergency_contact_email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Emergency Contact Email
              </label>
              <input
                type="email"
                id="emergency_contact_email"
                name="emergency_contact_email"
                value={formData.emergency_contact_email || ''}
                onChange={handleInputChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="emergency_contact_phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Emergency Contact Phone Number
            </label>
            <input
              type="text"
              id="emergency_contact_phone_number"
              name="emergency_contact_phone_number"
              value={formData.emergency_contact_phone_number || ''}
              onChange={handleInputChange}
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </form>
      <ToastContainer/>
    </>
  );
}