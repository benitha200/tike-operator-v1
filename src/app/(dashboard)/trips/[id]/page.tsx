"use client"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { Trip } from "../interfaces";
import { Driver } from "../interfaces";
import { Location } from "../interfaces";
import { Route } from "../interfaces";
import { API_URL } from "@/constants/Constants";

export default function ViewTrip() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [cars, setCars] = useState<any[]>([]);
  const [selectedCar, setSelectedCar] = useState<string>("");
  const [selectedDriver, setSelectedDriver] = useState<string>("");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [departureLocationName, setDepartureLocationName] = useState("");
  const [arrivalLocationName, setArrivalLocationName] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [price, setPrice] = useState("");
  const [recurringTime, setRecurringTime] = useState("Daily");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Helper function to make API requests with retry and backoff
  const fetchWithRetry = async (url: string, options: RequestInit, maxRetries = 3) => {
    let retries = 0;
    
    while (retries < maxRetries) {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        if (response.status === 429) {
          // If rate limited, wait longer with each retry
          const delay = 1000 * Math.pow(2, retries);
          console.log(`Rate limited. Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          retries++;
        } else if (!response.ok) {
          throw new Error(`API error: ${data.metaData?.message || response.statusText}`);
        } else {
          return data;
        }
      } catch (error) {
        if (retries === maxRetries - 1) {
          throw error;
        }
        retries++;
        // Wait before retrying
        const delay = 1000 * Math.pow(2, retries);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };

  // Get the trip ID from the URL
  const getTripId = () => {
    const currentUrl = window.location.href;
    // Remove trailing slash if present
    const cleanUrl = currentUrl.endsWith('/') ? currentUrl.slice(0, -1) : currentUrl;
    const urlParts = cleanUrl.split('/');
    return urlParts[urlParts.length - 1];
  };

  // Function to get trip data
  async function get_trip() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const tripId = getTripId();

    const requestOptions = {
      method: "GET",
      headers: myHeaders
    };

    try {
      const result = await fetchWithRetry(`${API_URL}trips/${tripId}`, requestOptions);
      console.log("Trip result:", result);
      
      if (result) {
        setTrip(result);
        console.log("Trip details data")
        console.log(result.payload);

        // Set initial values from trip data
        if (result.payload.driver?.id) {
          setSelectedDriver(result.payload.driver.id);
        }
        if (result.payload.car?.id) {
          setSelectedCar(result.payload.car.id);
        }
        if (result.payload.route?.id) {
          setSelectedRoute(result.payload.route.id);
          // Set route-related fields
          if (result.payload.route.departure_location) {
            setDepartureLocationName(result.payload.route.departure_location.name);
          }
          if (result.payload.route.arrival_location) {
            setArrivalLocationName(result.payload.route.arrival_location.name);
          }
          if (result.payload.route.total_price) {
            setPrice(result.payload.route.total_price.toString());
          }
        }
        if (result.payload.departure_time) {
          setDepartureTime(result.payload.departure_time);
          // Calculate arrival time if route and departure time are available
          if (result.payload.route?.total_duration && result.payload.departure_time) {
            const totalMinutes = result.payload.route.total_duration;
            const departure = new Date(`1970-01-01T${result.payload.departure_time}`);
            departure.setMinutes(departure.getMinutes() + totalMinutes);
            const arrivalTimeStr = `${String(departure.getHours()).padStart(2, '0')}:${String(departure.getMinutes()).padStart(2, '0')}`;
            setArrivalTime(arrivalTimeStr);
          }
        }
        if (result.payload.recurring_time) {
          setRecurringTime(result.payload.recurring_time);
        }
      }
      
      return result;
    } catch (error) {
      console.error("Failed to fetch trip:", error);
      setError("Failed to load trip details. Please try again later.");
      throw error;
    }
  }

  // Function to get cars
  async function get_cars() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders
    };

    try {
      const result = await fetchWithRetry(`${API_URL}cars/`, requestOptions);
      console.log("Cars result:", result);
      if (result.payload) {
        setCars(Array.isArray(result.payload) ? result.payload : []);
      }
      return result;
    } catch (error) {
      console.error("Failed to fetch cars:", error);
      return { payload: [] };
    }
  }

  // Function to get drivers
  async function get_drivers() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders
    };

    try {
      const result = await fetchWithRetry(`${API_URL}drivers/`, requestOptions);
      console.log("Drivers result:", result);
      if (result.payload) {
        setDrivers(Array.isArray(result.payload) ? result.payload : []);
      }
      return result;
    } catch (error) {
      console.error("Failed to fetch drivers:", error);
      return { payload: [] };
    }
  }

  // Function to get routes
  async function get_routes() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders
    };

    try {
      const result = await fetchWithRetry(`${API_URL}routes/`, requestOptions);
      console.log("Routes result:", result);
      if (result.payload) {
        setRoutes(Array.isArray(result.payload) ? result.payload : []);
      }
      return result;
    } catch (error) {
      console.error("Failed to fetch routes:", error);
      return { payload: [] };
    }
  }

  // Function to update trip
  async function update_trip() {
    setSaving(true);
    setSaveSuccess(false);
    
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);
    myHeaders.append("Content-Type", "application/json");

    const tripId = getTripId();
    
    const updateData = {
      car: selectedCar,
      driver: selectedDriver,
      route: selectedRoute,
      departure_time: departureTime,
      recurring_time: recurringTime
    };

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(updateData)
    };

    try {
      const result = await fetchWithRetry(`${API_URL}trips/${tripId}`, requestOptions);
      console.log("Update result:", result);
      setSaveSuccess(true);
      
      // Refresh trip data
      await get_trip();
      
      return result;
    } catch (error) {
      console.error("Failed to update trip:", error);
      setError("Failed to save changes. Please try again.");
      throw error;
    } finally {
      setSaving(false);
      
      // Clear success message after 3 seconds
      if (saveSuccess) {
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      }
    }
  }

  // Handle route selection change
  const handleRouteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const routeId = e.target.value;
    setSelectedRoute(routeId);
    
    // Find the selected route
    const selectedRoute = routes.find(route => route.id === routeId);
    if (selectedRoute) {
      // Set the departure and arrival locations from the route
      if (selectedRoute.departure_location) {
        setDepartureLocationName(selectedRoute.departure_location.name);
      }
      if (selectedRoute.arrival_location) {
        setArrivalLocationName(selectedRoute.arrival_location.name);
      }
      // Set the price from the route
      if (selectedRoute.total_price) {
        setPrice(selectedRoute.total_price.toString());
      }
      
      // Calculate arrival time if departure time is set
      if (departureTime && selectedRoute.total_duration) {
        const route =  selectedRoute;
        const totalMinutes = route.total_duration ;
        const departure = new Date(`1970-01-01T${departureTime}`);
        departure.setMinutes(departure.getMinutes() + totalMinutes);
        const arrivalTimeStr = `${String(departure.getHours()).padStart(2, '0')}:${String(departure.getMinutes()).padStart(2, '0')}`;
        setArrivalTime(arrivalTimeStr);
      }
    }
  };

  // Handle departure time change
  const handleDepartureTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setDepartureTime(time);
    
    // Calculate arrival time if route is selected and has duration
    if (selectedRoute) {
      const route = routes.find(r => r.id === selectedRoute);
      if (route && route.total_duration) {
        const totalMinutes =route.total_duration;
        const departure = new Date(`1970-01-01T${time}`);
        departure.setMinutes(departure.getMinutes() + totalMinutes);
        const arrivalTimeStr = `${String(departure.getHours()).padStart(2, '0')}:${String(departure.getMinutes()).padStart(2, '0')}`;
        setArrivalTime(arrivalTimeStr);
      }
    }
  };

  // Load data sequentially to avoid rate limiting
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Load data sequentially with delays to avoid rate limiting
        await get_trip();
        
        // Wait a bit before making the next request
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Load cars
        await get_cars();
        
        // Wait before next request
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Load drivers
        await get_drivers();
        
        // Wait before next request
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Load routes
        await get_routes();
        
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Something went wrong. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCar || !selectedDriver || !selectedRoute || !departureTime) {
      setError("Please fill in all required fields");
      return;
    }
    
    try {
      setError(null);
      await update_trip();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
        <p className="ml-3 text-lg">Loading trip details...</p>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
          <button 
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <span className="text-red-500">×</span>
          </button>
        </div>
      )}
      
      {saveSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success:</strong>
          <span className="block sm:inline"> Trip updated successfully!</span>
          <button 
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setSaveSuccess(false)}
          >
            <span className="text-green-500">×</span>
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            Edit Trip: {`${departureLocationName && departureLocationName} > ${arrivalLocationName && arrivalLocationName}`}
          </h2>
          <button
            type="submit"
            className={`text-white ${saving ? 'bg-gray-500' : 'bg-cyan-600 hover:bg-cyan-700'} focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center`}
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                Saving...
              </>
            ) : (
              <>
                <FiCheck className="-ml-1 mr-2 h-6 w-6" />
                Save Changes
              </>
            )}
          </button>
        </div>
        <div className="flex flex-col p-6">
          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="car"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Car
              </label>
              <select
                id="car"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
              >
                <option value="">Select a car</option>
                {cars && cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.car_no}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6 w-full">
              <label
                htmlFor="driver"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Driver
              </label>
              <select
                id="driver"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
              >
                <option value="">Select a driver</option>
                {drivers && drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.fullname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6 w-full">
            <label
              htmlFor="route"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Route
            </label>
            <select
              id="route"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={selectedRoute}
              onChange={handleRouteChange}
            >
              <option value="">Select a route</option>
              {routes && routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="departureLocation"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Departure Location
              </label>
              <input
                type="text"
                id="departureLocation"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                readOnly
                value={departureLocationName}
              />
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="arrivalLocation"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Arrival Location
              </label>
              <input
                type="text"
                id="arrivalLocation"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                readOnly
                value={arrivalLocationName}
              />
            </div>
          </div>

          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="departureTime"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Departure Time
              </label>
              <input
                type="time"
                id="departureTime"
                value={departureTime}
                onChange={handleDepartureTimeChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="arrivalTime"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Arrival Time
              </label>
              <input
                type="time"
                id="arrivalTime"
                value={arrivalTime}
                readOnly
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price (in RWF)
              </label>
              <input
                type="number"
                id="price"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                readOnly
                value={price}
              />
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="recurringTime"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Recurring Time
              </label>
              <select
                id="recurringTime"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
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
        </div>
      </form>
    </>
  );
}