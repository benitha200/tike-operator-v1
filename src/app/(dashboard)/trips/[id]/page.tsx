"use client"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { Trip } from "../interfaces";
import { Driver } from "../interfaces";
import { Location } from "../interfaces";
import { API_URL } from "@/constants/Constants";

export default function ViewTrip() {

  const [trip, setTrip] = useState<Trip | null>(null);
  const [cars,setCars]=useState();
  const [selectedCar,setSelectedCar]=useState<string>("");
  const [selectedDriver,setSelectedDriver]=useState<string>("");
  const [drivers,setDrivers]=useState<Driver[]>([])
  const [locations,setLocations]=useState<Location[]>([]);
  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");




  function get_locations(){
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      // redirect: "follow"
    };

    fetch(`${API_URL}/locations/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setLocations(result.payload)
      })
      .catch((error) => console.error(error));
  }


  function get_cars(){
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders
    };

    fetch(`${API_URL}/cars/`, requestOptions)
      .then((response) => response.json())
      .then((result) =>{ 
        console.log(result)
        setCars(result.payload)
      })
      .catch((error) => console.error(error));
  }



  function get_trip(){
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    const tripId = urlParts[urlParts.length - 1];
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders
    };
    
    fetch(`${API_URL}/trips/${tripId}`, requestOptions)
      .then((response) => response.json())
      .then((result) =>{ 
        setTrip(result.payload);
        console.log(result)})
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

    fetch(`${API_URL}/drivers/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setDrivers(result.payload)
      
      })
      .catch((error) => console.error(error));
  }

  useEffect(()=>{

      get_trip();
      get_cars();
      get_drivers();
      get_locations();
  },[])



  const departure = [
    "Bweyeye",
    "Shyorongi",
    "Karumuna",
    "Rulindo",
    "Nyagatare",
    "Butare",
    "Kirehe",
    "Musanze",
    "Nyanza",
    "Nyabugogo",
  ];
  const arrival = [
    "Nyabugogo",
    "Nyanza",
    "Musanze",
    "Kirehe",
    "Butare",
    "Nyagatare",
    "Rulindo",
    "Karumuna",
    "Shyorongi",
    "Bweyeye",
  ];

  return (
    <>
      <form method="get">
        <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            Edit Trip: {`${trip && trip.departure_location.name} > ${trip && trip.arrival_location.name}`}
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
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Car
            </label>

            <select
              id="country"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={selectedCar} // Assuming selectedCar is the state variable holding the selected car value
              onChange={(e) => setSelectedCar(e.target.value)}
            >
                {trip && (trip as { car: { id: string; car_no: string } }).car.car_no && (
                  <option value={(trip as { car: { id: string } }).car.id}>
                    {(trip as { car: { car_no: string } }).car.car_no}
                  </option>
                )}

            </select>
          </div>

            <div className="mb-6 w-full">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Driver
              </label>
          <select
            id="country"
            className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
          >
            {trip && trip.driver.fullname && (
              <option value={trip.driver.id}>{trip.driver.fullname}</option>
            )}
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
                <option>{trip && trip.departure_location.name}</option>
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
                <option>{trip && trip.arrival_location.name}</option>
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
                id="time"
                // placeholder="Nyabugogo"
                value={trip && trip.departure_time 
                  || ''
                }
                
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
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
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={trip && trip.price || ''}
                // onChange={}
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
                required
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
