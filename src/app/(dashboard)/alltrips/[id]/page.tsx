"use client"

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FiCheck } from "react-icons/fi";
import { Trip } from "../interfaces";
import { Car } from "../interfaces";
import { Driver } from "../interfaces";
import { API_URL } from "@/constants/Constants";

export default function ViewTrip() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);

  const [routeId, setRouteId] = useState<string | null>(null);
  const [departureTime, setDepartureTime] = useState<string>("");
  const [arrivalTime, setArrivalTime] = useState<string>("");
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [recurringTime, setRecurringTime] = useState<string>("One Time");
  const [routePrice, setRoutePrice] = useState<number | null>(null);

  // Helper to compute arrival time
  const computeArrivalTime = (departure: string, durationMinutes: number): string => {
    const [hours, minutes] = departure.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + durationMinutes);

    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  // Trigger arrival time calculation when route or departure time changes
  useEffect(() => {
    const selectedRoute = routes.find((r) => r.id === routeId);
    if (selectedRoute && departureTime) {
      const arrival = computeArrivalTime(departureTime, selectedRoute.total_duration);
      setArrivalTime(arrival);
      setRoutePrice(selectedRoute.total_price);
    }
  }, [routeId, departureTime]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");

        const tripResponse = await fetch(`${API_URL}trips/` + window.location.pathname.split("/").pop(), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const tripData = await tripResponse.json();
        setTrip(tripData.payload);

        const routesResponse = await fetch(`${API_URL}routes/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const routesData = await routesResponse.json();
        setRoutes(routesData.payload);

        const carsResponse = await fetch(`${API_URL}cars/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const carsData = await carsResponse.json();
        setCars(carsData.payload);

        const driversResponse = await fetch(`${API_URL}drivers/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const driversData = await driversResponse.json();
        setDrivers(driversData.payload);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (trip) {
      setRouteId(trip.route?.id || null);
      setDepartureTime(trip.departure_time);
      setArrivalTime(trip.arrival_time);
      setSelectedCar(trip.car.id);
      setSelectedDriver(trip.driver.id);
      setRecurringTime(trip.trip_frequency || "One Time");
      setRoutePrice(trip.route?.total_price || null);
    }
  }, [trip]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      const updatedTrip = {
        route_id: routeId,
        departure_time: departureTime,
        arrival_time: arrivalTime,
        car_id: selectedCar,
        driver_id: selectedDriver,
        recurring_time: recurringTime,
      };

      const response = await fetch(`${API_URL}trips/` + trip?.id, {
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
          Edit Trip: {trip ? `${trip.route?.departure_location?.name} > ${trip.route?.arrival_location?.name}` : ""}
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
        <div className="mb-6 w-full">
          <label htmlFor="route" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Route
          </label>
          <select
            id="route"
            className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900"
            value={routeId || ""}
            onChange={(e) => setRouteId(e.target.value)}
            required
          >
            <option value="">Select Route</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.departure_location?.name} ➝ {route.arrival_location?.name} ({route.total_price} RWF)
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 w-full">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Price
          </label>
          <input
            type="text"
            id="price"
            className="bg-gray-100 cursor-not-allowed text-sm rounded-lg block w-full p-2.5 border border-gray-300 text-gray-900"
            value={routePrice !== null ? `${routePrice} RWF` : ""}
            disabled
          />
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
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900"
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
              readOnly
              disabled
              className="bg-gray-100 cursor-not-allowed text-sm rounded-lg block w-full p-2.5 border border-gray-300 text-gray-900"
            />
          </div>
        </div>

        <div className="flex justify-between items-center space-x-4">
          <div className="mb-6 w-full">
            <label htmlFor="car" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Car
            </label>
            <select
              id="car"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900"
              value={selectedCar || ""}
              onChange={(e) => setSelectedCar(e.target.value)}
              required
            >
              <option value="">Select Car</option>
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
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900"
              value={selectedDriver || ""}
              onChange={(e) => setSelectedDriver(e.target.value)}
              required
            >
              <option value="">Select Driver</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.fullname}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6 w-full">
          <label htmlFor="recurringTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Recurring Time
          </label>
          <select
            id="recurringTime"
            className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900"
            value={recurringTime}
            onChange={(e) => setRecurringTime(e.target.value)}
            required
          >
            <option>One Time</option>
            <option>Daily</option>
          </select>
        </div>
      </div>
    </form>
  );
}
