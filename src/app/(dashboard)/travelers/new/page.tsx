"use client"
import { API_URL } from "@/constants/Constants";
import { useState,FormEvent } from "react";
import { FiCheck } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';

export default function NewTraveler() {

  const [fullname,setFullname]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");


  function handleSubmit(e: FormEvent<HTMLFormElement>){
       e.preventDefault();
       const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const idempotencyKey = uuidv4();
      const raw = JSON.stringify({
        "idempotency_key": idempotencyKey,
        "fullname": fullname,
        "identifier": email,
        "password": password,
        "type": "traveler"
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        // redirect: "follow"
      };

      fetch(`${API_URL}/register/`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error(error)); 
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold">Create New Traveller</h2>
          <button
            type="submit"
            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
          >
            <FiCheck className="-ml-1 mr-2 h-6 w-6" />
            Save
          </button>
        </div>
        <div className="flex flex-col p-6">
          <div className="flex justify-between items-center">
            <div className="mb-6 w-full pr-2">
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fullname
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="Keza Majyambere"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={fullname}
                onChange={(e)=>setFullname(e.target.value)}
              />
            </div>
            {/* <div className="mb-6 w-full pl-2">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>
              <select
                id="gender"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option>Male</option>
                <option>Female</option>
              </select> */}
            </div>
          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="email@domain.com"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="phone_number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="email"
                placeholder="XXXXXXXX"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
          </div>
          
          {/* <div className="flex justify-between items-center">
            <div className="mb-6 w-full pr-2">
              <label
                htmlFor="nationality"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nationality
              </label>
              <select
                id="nationality"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option>Rwanda</option>
                <option>Uganda</option>
                <option>Burundi</option>
                <option>Tanzania</option>
                <option>Kenya</option>
                <option>Congo</option>
              </select>
            </div>
            <div className="mb-6 w-full pl-2">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Residential Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="KG 608 St, Remera"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="mb-6 w-full pr-2">
              <label
                htmlFor="emergency_contact_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Emergency Contact Name
              </label>
              <input
                type="text"
                id="emergency_contact_name"
                placeholder="Kaze Munyakazi"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6 w-full pl-2">
              <label
                htmlFor="emergency_contact_details"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Emergency Contact Details
              </label>
              <input
                type="text"
                id="emergency_contact_details"
                placeholder="+250 780 000 000"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div> */}
        </div>
      </form>
    </>
  );
}
