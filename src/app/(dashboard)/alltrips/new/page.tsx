"use client"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';

export default function NewTrip() {

  const [cars,setCars]=useState();
  const [drivers,setDrivers]=useState();
  const [locations,setLocations]=useState();

  // form data 
  const [selectedCar,setSelectedCar]=useState("");
  const [selectedDriver,setSelectedDriver]=useState();
  const [departureLocation, setDepartureLocation] = useState("");
  const [departureTime, setDepartureTime] = useState();
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [price, setPrice] = useState("");
  const [operator, setOperator] = useState("");


  const handleSubmit = async (e) => {
    console.log(Cookies.get('token'))
    e.preventDefault();
    const idempotencyKey = uuidv4();

    const tripData = {
      // car:selectedCar,
      
      driver:selectedDriver,
      departure_location: departureLocation,
      departure_time: new Date(`2024-03-19T${departureTime}`),
      arrival_location: arrivalLocation,
      arrival_time: new Date(`2024-03-19T${arrivalTime}`),
      price: price,
      operator: "da3cc03a-4c9b-427c-8ac9-5f7b9107aa97",
      idempotency_key:idempotencyKey,
      car:selectedCar,
    };
    

    try {
      const response = await fetch("http://127.0.0.1:3010/trips/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(tripData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // const departure = [
  //   "Bweyeye",
  //   "Shyorongi",
  //   "Karumuna",
  //   "Rulindo",
  //   "Nyagatare",
  //   "Butare",
  //   "Kirehe",
  //   "Musanze",
  //   "Nyanza",
  //   "Nyabugogo",
  // ];
  // const arrival = [
  //   "Nyabugogo",
  //   "Nyanza",
  //   "Musanze",
  //   "Kirehe",
  //   "Butare",
  //   "Nyagatare",
  //   "Rulindo",
  //   "Karumuna",
  //   "Shyorongi",
  //   "Bweyeye",
  // ];
  function get_cars(){
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      // redirect: "follow"
    };

    fetch("http://127.0.0.1:3010/cars/", requestOptions)
      .then((response) => response.json())
      .then((result) =>{ 
        console.log(result)
        setCars(result.payload)
      })
      .catch((error) => console.error(error));
  }

  function get_drivers(){
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      // redirect: "follow"
    };

    fetch("http://127.0.0.1:3010/drivers/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setDrivers(result.payload)
      
      })
      .catch((error) => console.error(error));
  }

  function get_locations(){
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      // redirect: "follow"
    };

    fetch("http://127.0.0.1:3010/locations/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setLocations(result.payload)
      })
      .catch((error) => console.error(error));
  }

  useEffect(()=>{
    get_cars();
    get_drivers();
    get_locations();
  },[])
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold">Create New Trip</h2>
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
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Car
              </label>

          <select
              id="country"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              defaultValue=""
              onChange={(e) => setSelectedCar(e.target.value)}
            >
              <option value="">Select Car</option>
              {cars &&
                cars.map((car, index) => (
                  <option key={car.id} value={car.id}>
                    {car.car_no}
                  </option>
                ))}
            </select>
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Driver
              </label>
              {/* <select
                id="country"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option>Keza Majyambere</option>
                <option>Kaze Munyakazi</option>
                <option>Majyambere Keza</option>
              </select> */}
              <select
                id="country"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
              >
                <option value="">Select Driver</option>
                {drivers &&
                  drivers.map((driver, index) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.fullname}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Departure Location
              </label>
              <select
                id="country"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={departureLocation}
                onChange={(e)=>setDepartureLocation(e.target.value)}
              >
                <option>Select Departure Location</option>
                {locations && locations.map((location, index) => (
                  <option key={location.id} value={location.id}  onClick={() => setDepartureLocation(location.id)}>{location.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Arrival Location
              </label>
              <select
                id="country"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={arrivalLocation}
                onChange={(e) => setArrivalLocation(e.target.value)}
              >
                <option>Select Arrival Location</option>
                {locations &&
                  locations.map((location, index) => (
                    <option key={location.id} value={location.id} onClick={() => setArrivalLocation(location.id)}>
                      {location.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Departure Time
              </label>
              <input
                type="time"
                id="address"
                placeholder="Nyabugogo"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={departureTime}
                onChange={(e)=>setDepartureTime(e.target.value)}
              />
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Arrival Time
              </label>
              <input
                type="time"
                id="address"
                placeholder="Nyabugogo"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={arrivalTime}
                onChange={(e)=>setArrivalTime(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price (in RWF)
              </label>
              <input
                type="number"
                id="address"
                placeholder="10,0000"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
              />
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Recurring Time
              </label>
              <select
                id="country"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                // required
                // value={}
                // onChange={(e)=>setSelectedCar(e.target.value)}
              >
                <option>One Time</option>
                <option>Once a week</option>
                <option>Twice a week</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
