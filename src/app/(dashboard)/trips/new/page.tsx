"use client"
import Cookies from "js-cookie";
import { useEffect, useState, FormEvent } from "react";
import { FiCheck } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Car, Driver, Route } from "../interfaces";
import { API_URL } from "@/constants/Constants";

export default function NewTrip() {
  const [cars, setCars] = useState<Car[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);

  // Form data
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [departureLocationName, setDepartureLocationName] = useState("");
  const [arrivalLocationName, setArrivalLocationName] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [price, setPrice] = useState("");
  const [totalSeats, setTotalSeats] = useState<number>(40);
  const [recurringTime, setRecurringTime] = useState("Daily");
  const [operatorId, setOperatorId] = useState("");

  useEffect(() => {
    const userdata = Cookies.get('currentUser');
    if (userdata) {
      const currentUser = JSON.parse(userdata);
      setOperatorId(currentUser.operator?.id || "");
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([get_cars(), get_drivers(), get_routes()]);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleRouteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const routeId = e.target.value;
    setSelectedRoute(routeId);
    
    const selectedRoute = routes.find(route => route.id === routeId);
    if (selectedRoute) {
      setDepartureLocationName(selectedRoute.departure_location?.name || "");
      setArrivalLocationName(selectedRoute.arrival_location?.name || "");
      setPrice(selectedRoute.total_price?.toString() || "");
      
      // Calculate arrival time if departure time is set
      if (departureTime && selectedRoute.total_duration) {
        calculateArrivalTime(departureTime, selectedRoute.total_duration);
      }
    }
  };

  const handleDepartureTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setDepartureTime(time);
    
    if (selectedRoute) {
      const route = routes.find(r => r.id === selectedRoute);
      if (route?.total_duration) {
        calculateArrivalTime(time, route.total_duration);
      }
    }
  };

  const calculateArrivalTime = (departure: string, durationMinutes: number) => {
    const [hours, minutes] = departure.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + durationMinutes;
    const arrivalHours = Math.floor(totalMinutes / 60) % 24;
    const arrivalMinutes = totalMinutes % 60;
    const arrivalTimeStr = `${String(arrivalHours).padStart(2, '0')}:${String(arrivalMinutes).padStart(2, '0')}`;
    setArrivalTime(arrivalTimeStr);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedCar || !selectedDriver || !selectedRoute || !departureTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    const idempotencyKey = uuidv4();
    const tripData = {
      car: selectedCar,
      driver: selectedDriver,
      route: selectedRoute,
      departure_time: departureTime,
      total_seats: totalSeats,
      operator: operatorId,
      recurring_time: recurringTime,
      idempotency_key: idempotencyKey
    };

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}trips/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(tripData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      toast.success("Trip created successfully!");
      // Reset form
      setSelectedCar("");
      setSelectedDriver("");
      setSelectedRoute("");
      setDepartureTime("");
      setArrivalTime("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  async function get_cars() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const response = await fetch(`${API_URL}cars/`, {
      method: "GET",
      headers: myHeaders,
    });
    const result = await response.json();
    setCars(Array.isArray(result.payload) ? result.payload : []);
  }

  async function get_drivers() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const response = await fetch(`${API_URL}drivers/`, {
      method: "GET",
      headers: myHeaders,
    });
    const result = await response.json();
    setDrivers(Array.isArray(result.payload) ? result.payload : []);
  }

  async function get_routes() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const response = await fetch(`${API_URL}routes/`, {
      method: "GET",
      headers: myHeaders,
    });
    const result = await response.json();
    setRoutes(Array.isArray(result.payload) ? result.payload : []);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
        <p className="ml-3 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold">Create New Trip</h2>
          <button
            type="submit"
            className={`text-white ${loading ? 'bg-gray-500' : 'bg-cyan-600 hover:bg-cyan-700'} focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                Creating...
              </>
            ) : (
              <>
                <FiCheck className="-ml-1 mr-2 h-6 w-6" />
                Create Trip
              </>
            )}
          </button>
        </div>
        <div className="flex flex-col p-6">
          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label htmlFor="car" className="block mb-2 text-sm font-medium text-gray-900">
                Car
              </label>
              <select
                id="car"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                required
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
              >
                <option value="">Select a car</option>
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.car_no}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6 w-full">
              <label htmlFor="driver" className="block mb-2 text-sm font-medium text-gray-900">
                Driver
              </label>
              <select
                id="driver"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                required
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
              >
                <option value="">Select a driver</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.fullname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6 w-full">
            <label htmlFor="route" className="block mb-2 text-sm font-medium text-gray-900">
              Route
            </label>
            <select
              id="route"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              required
              value={selectedRoute}
              onChange={handleRouteChange}
            >
              <option value="">Select a route</option>
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.departure_location?.name} → {route.arrival_location?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label htmlFor="departureLocation" className="block mb-2 text-sm font-medium text-gray-900">
                Departure Location
              </label>
              <input
                type="text"
                id="departureLocation"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900"
                readOnly
                value={departureLocationName}
              />
            </div>
            <div className="mb-6 w-full">
              <label htmlFor="arrivalLocation" className="block mb-2 text-sm font-medium text-gray-900">
                Arrival Location
              </label>
              <input
                type="text"
                id="arrivalLocation"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900"
                readOnly
                value={arrivalLocationName}
              />
            </div>
          </div>

          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label htmlFor="departureTime" className="block mb-2 text-sm font-medium text-gray-900">
                Departure Time
              </label>
              <input
                type="time"
                id="departureTime"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                required
                value={departureTime}
                onChange={handleDepartureTimeChange}
              />
            </div>
            <div className="mb-6 w-full">
              <label htmlFor="arrivalTime" className="block mb-2 text-sm font-medium text-gray-900">
                Arrival Time
              </label>
              <input
                type="time"
                id="arrivalTime"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900"
                readOnly
                value={arrivalTime}
              />
            </div>
          </div>

          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                Price (in RWF)
              </label>
              <input
                type="number"
                id="price"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900"
                readOnly
                value={price}
              />
            </div>
            <div className="mb-6 w-full">
              <label htmlFor="totalSeats" className="block mb-2 text-sm font-medium text-gray-900">
                Total Seats
              </label>
              <input
                type="number"
                id="totalSeats"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                required
                value={totalSeats}
                onChange={(e) => setTotalSeats(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="mb-6 w-full">
            <label htmlFor="recurringTime" className="block mb-2 text-sm font-medium text-gray-900">
              Recurring Time
            </label>
            <select
              id="recurringTime"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              value={recurringTime}
              onChange={(e) => setRecurringTime(e.target.value)}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Biweekly">Biweekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}