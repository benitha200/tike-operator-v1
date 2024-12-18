"use client"
import { FiArrowLeftCircle, FiCheck } from "react-icons/fi";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { API_URL } from "@/constants/Constants";

interface Traveler {
  id: string;
  fullname: string;
  nationality: string;
  dob: string;
  gender: string;
  phone_number: string;
  email: string;
}

export default function EditLocation() {
  const [traveler, setTraveler] = useState<Traveler | null>(null);
  const [formData, setFormData] = useState({
    fullname: "",
    nationality: "",
    dob: "",
    gender: "",
    phone_number: "",
    email: "",
  });

  const currentUrl = window.location.href;
  const urlParts = currentUrl.split('/');
  const travelerId = urlParts[urlParts.length - 1];
  const defaultTraveler = { id: 'default' };

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${API_URL}/travelers/${travelerId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.payload);
        setTraveler(result.payload);
        setFormData({
          fullname: result.payload.fullname,
          nationality: result.payload.nationality,
          dob: result.payload.dob,
          gender: result.payload.gender,
          phone_number: result.payload.phone_number,
          email: result.payload.email,
        });
      })
      .catch((error) => console.error(error));
  }, [travelerId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        `${API_URL}/travelers/${(traveler || defaultTraveler).id}`,
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

  return (
    <>
      <ToastContainer />
      <Link
          href="/travelers"
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
        >
          <FiArrowLeftCircle className="-ml-1 mr-2 h-6 w-6" />
          All Travelers
        </Link>
      {traveler && (
        <form onSubmit={handleSubmit} method="post">
          {/* <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
            <h2 className="text-xl font-semibold">Traveler Info: {traveler.fullname}</h2>
            <button
              type="submit"
              className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
            >
              <FiCheck className="-ml-1 mr-2 h-6 w-6" />
              Save Changes
            </button>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div className="mb-6">
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="nationality"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nationality
              </label>
              <select
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="RW">Rwanda</option>
                <option value="UG">Uganda</option>
                <option value="BI">Burundi</option>
                <option value="TZ">Tanzania</option>
                <option value="KE">Kenya</option>
                <option value="CD">Congo</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="dob"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="phone_number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
        </form>
      )}
    </>

  );
}
