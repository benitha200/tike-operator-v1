"use client"

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FiCheck } from "react-icons/fi";
import { Trip } from "../interfaces";
import { Car } from "../interfaces";
import { Driver } from "../interfaces";
import { Location } from "../interfaces";
import { API_URL } from "@/constants/Constants";


export default function ViewTrip() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [departureLocation, setDepartureLocation] = useState<string>("");
  const [arrivalLocation, setArrivalLocation] = useState<string>("");
  const [departureTime, setDepartureTime] = useState<string>("");
  const [arrivalTime, setArrivalTime] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [recurringTime, setRecurringTime] = useState<string>("One Time");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");

        // Fetch trip details
        const tripResponse = await fetch(`${API_URL}/trips/` + window.location.pathname.split("/").pop(), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const tripData = await tripResponse.json();
        setTrip(tripData.payload);

        // Fetch locations
        const locationsResponse = await fetch(`${API_URL}/locations/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const locationsData = await locationsResponse.json();
        setLocations(locationsData.payload);

        // Fetch cars
        const carsResponse = await fetch(`${API_URL}/cars/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const carsData = await carsResponse.json();
        setCars(carsData.payload);

        // Fetch drivers
        const driversResponse = await fetch(`${API_URL}/drivers/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const driversData = await driversResponse.json();
        setDrivers(driversData.payload);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once

  // Setting trip details after fetching
  useEffect(() => {
    if (trip) {
      setDepartureLocation(trip.departure_location.id);
      setArrivalLocation(trip.arrival_location.id);
      setDepartureTime(trip.departure_time);
      setArrivalTime(trip.arrival_time);
      setPrice(trip.price);
      setSelectedCar(trip.car.id);
      setSelectedDriver(trip.driver.id);
    }
  }, [trip]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");
      const updatedTrip = {
        departure_location: departureLocation,
        arrival_location: arrivalLocation,
        departure_time: departureTime,
        arrival_time: arrivalTime,
        price: price,
        car_id: selectedCar,
        driver_id: selectedDriver,
        recurring_time: recurringTime,
      };

      const response = await fetch(`${API_URL}/trips/` + trip?.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTrip),
      });

      if (!response.ok) {
        throw new Error("Failed to update trip");
      }

      console.log("Trip updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold">
          Edit Trip: {trip ? `${trip.departure_location.name} > ${trip.arrival_location.name}` : ""}
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
            <label htmlFor="car" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Car
            </label>
            <select
              id="car"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={selectedCar || ''}
              onChange={(e) => setSelectedCar(e.target.value)}
              required
            >
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.car_no}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="driver" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Driver
            </label>
            <select
              id="driver"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={selectedDriver || ''}
              onChange={(e) => setSelectedDriver(e.target.value)}
              required
            >
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.fullname}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div className="mb-6 w-full">
            <label htmlFor="departureLocation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Departure Location
            </label>
            <select
              id="departureLocation"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={departureLocation}
              onChange={(e) => setDepartureLocation(e.target.value)}
              required
            >
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="arrivalLocation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Arrival Location
            </label>
            <select
              id="arrivalLocation"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={arrivalLocation}
              onChange={(e) => setArrivalLocation(e.target.value)}
              required
            >
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div className="mb-6 w-full">
            <label htmlFor="departureTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Departure Time
            </label>
            <input
              type="time"
              id="departureTime"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="arrivalTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Arrival Time
            </label>
            <input
              type="time"
              id="arrivalTime"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div className="mb-6 w-full">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Price (in RWF)
            </label>
            <input
              type="number"
              id="price"
              value={price ?? ""}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="recurringTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Recurring Time
            </label>
            <select
              id="recurringTime"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={recurringTime}
              onChange={(e) => setRecurringTime(e.target.value)}
              required
            >
              <option>Daily</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  );
}
