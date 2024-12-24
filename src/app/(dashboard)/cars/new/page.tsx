"use client";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import * as z from 'zod';
import { FiCheck } from "react-icons/fi";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { API_URL } from '@/constants/Constants';

export default function NewCar() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // form data
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [carNo, setCarNo] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [pseats, setPseats] = useState<string>("");
  const [wseats, setWseats] = useState<string>("");

  const [operatorId, setOperatorId] = useState<string>("null");

  useEffect(() => {
    const userdata = Cookies.get('currentUser');
    if (userdata) {
      const currentUser = JSON.parse(userdata);
      setOperatorId(currentUser.operator?.id || "null");
    }
  }, []);

  console.log("operator Id");
  console.log(operatorId);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  
  //   const token = Cookies.get('token');
  //   if (token) {
  //     myHeaders.append("Authorization", `Bearer ${token}`);
  //   }
  
  //   const idempotencyKey = uuidv4();
  //   const raw = JSON.stringify({
  //     "idempotency_key": idempotencyKey,
  //     "car_no": carNo,
  //     "immatriculation_no": carNo,
  //     "brand": brand,
  //     "model": model,
  //     "type": type,
  //     "operator": operatorId,
  //     "number_of_seats":pseats
  //   });
  
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //   };
  
  //   try {
  //     const response = await fetch(`${API_URL}/cars/`, requestOptions);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const result = await response.json();
  //     console.log(result);
  //     toast.success("Car added successfully!");
      
  //     // Redirect to "/cars" after successful addition
  //     window.location.href = "/cars";
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to add car");
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const token = Cookies.get('token');
    if (token) {
      myHeaders.append("Authorization", `Bearer ${token}`);
    }
  
    const idempotencyKey = uuidv4();
    
    // Create the payload object first to verify all fields
    const payload = {
      idempotency_key: idempotencyKey,
      car_no: carNo,
      immatriculation_no: carNo,  // Explicitly ensure this is included
      brand: brand,
      model: model,
      type: type,
      operator: operatorId,
      number_of_seats: pseats
    };
  
    // Log the payload for verification
    console.log('Sending payload:', payload);
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload)  // Stringify the verified payload
    };
  
    try {
      const response = await fetch(`${API_URL}/cars/`, requestOptions);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.metaData?.message?.[0] || 'Network response was not ok');
      }
      const result = await response.json();
      console.log('Success:', result);
      toast.success("Car added successfully!");
      
      // Redirect to "/cars" after successful addition
      window.location.href = "/cars";
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to add car");
    }
  };
  
  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold">Create New Car</h2>
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
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
              </label>
              <input
                type="text"
                id="brand"
                placeholder="Mercedes Benz"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={brand}
                onChange={(e)=>setBrand(e.target.value)}
              />
            </div>
            <div className="mb-6 w-full pl-2">
              <label
                htmlFor="model"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Car Model
              </label>
              <input
                type="text"
                id="model"
                placeholder="Citaro 2 - O530"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={model}
                onChange={(e)=>setModel(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="mb-6 w-full pr-2">
              <label
                htmlFor="car_no"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Car No. (Immatriculation)
              </label>
              <input
                type="text"
                id="car_no"
                placeholder="RAF 300 A"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={carNo}
                onChange={(e)=>setCarNo(e.target.value)}
              />
            </div>
            <div className="mb-6 w-full pl-2">
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Type
              </label>
              <input
                type="text"
                id="type"
                placeholder="Turen Bus"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={type}
                onChange={(e)=>setType(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="mb-6 w-full pr-2">
              <label
                htmlFor="seat_count"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                How many Total seats?
              </label>
              <input
                type="number"
                id="seat_count"
                placeholder="40"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={pseats}
                onChange={(e)=>setPseats(e.target.value)}
              />
            </div>
          </div>
    
          
        </div> 
        </form>
        <ToastContainer />
    {/* </Form> */}

    </>
  );
}
