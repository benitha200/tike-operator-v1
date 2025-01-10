"use client"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { Car } from "../../alltrips/interfaces";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from "@/constants/Constants";

export default function ViewCar() {

  const [car, setCar] = useState<Car | undefined>(undefined);

  useEffect(()=>{
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    const carId = urlParts[urlParts.length - 1];

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${API_URL}cars/${carId}/`, requestOptions)
      .then((response) => response.json())
      .then((result) =>{
        setCar(result.payload);
        toast.success("Car updated successfully!");
      })
      .catch((error) => {
        toast.error("Failed to add car!");
        console.error(error);
      });  
  },[]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setCar((prevCar) => {
      if (!prevCar) {
        return { id: '', car_no: '', immatriculation_no: '', brand: '', model: '', type: '', [name]: value };
      }
      return {
        ...prevCar,
        [name]: value,
      };
    });
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!car) {
      console.error("Car data is not available");
      return;
    }
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);
  
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(car)
    };
  
    fetch(`${API_URL}cars/${car.id}/`, requestOptions)
      .then((response) => response.json())
      .then((result) =>{ 
        console.log(result);
        toast.success("Car updated successfully!");
      })
      .catch((error) => {
        toast.error("Failed to update car!");
        console.error(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold">Edit Car: {car && car.car_no}</h2>
          <button
            type="submit"
            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
          >
            <FiCheck className="-ml-1 mr-2 h-6 w-6" />
            Save Changes
          </button>
        </div>
        <div className="flex flex-col p-6">
          <div className="flex justify-between items-center">
            <div className="mb-6 w-full pr-2">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Brand Name
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                placeholder="Mercedes Benz"
                value={car && car.brand}
                onChange={handleInputChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
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
                name="model"
                placeholder="Citaro 2 - O530"
                value={car && car.model}
                onChange={handleInputChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
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
                // value="RAF 300 A"
                value={car && car.immatriculation_no}
                onChange={handleInputChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
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
                // placeholder="Turen Bus"
                // value="Turen Bus"
                value={car && car.type}
                onChange={handleInputChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="mb-6 w-full pr-2">
              <label
                htmlFor="seat_count"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                How many passenger seats?
              </label>
              <input
                type="number"
                id="seat_count"
                placeholder="30"
                value="30"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            
          </div>
      
          <div>
            <ToastContainer/>
            
          </div>
        </div>
      </form>
    </>
  );
}

