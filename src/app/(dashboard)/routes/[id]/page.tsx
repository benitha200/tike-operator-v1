"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FiCheck } from "react-icons/fi";
import { API_URL } from "@/constants/Constants";
import Cookies from "js-cookie";
import { v4 as uuidV4 } from "uuid";

export default function ManageRoute() {
  const params = useParams();
  const routeId = params?.id && params.id !== "0" ? params.id : null; // Ensure that 'id' is correctly retrieved from the URL and set to null if it's "0"


  const [routeName, setRouteName] = useState("");
  const [departureLocation, setDepartureLocation] = useState("");  // Changed variable name to handle departure location
  const [arrivalLocation, setArrivalLocation] = useState("");      // Changed variable name to handle arrival location
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedStops, setSelectedStops] = useState<any[]>([]);
  const [stopName, setStopName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);  // Track total price
  const [totalDuration, setTotalDuration] = useState(0);  // Track total duration
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currencySymbol = "RWF"; // Define the currency symbol as a variable

  const fetchLocations = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get("token")}`);

    try {
      const res = await fetch(`${API_URL}locations/`, {
        method: "GET",
        headers: myHeaders,
      });
      const result = await res.json();
      setLocations(result.payload);
    } catch (err) {
      console.error("Failed to fetch stops", err);
      setError("Failed to load stops.");
    }
  };

  const fetchRouteData = async (id: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get("token")}`);

    try {
      const res = await fetch(`${API_URL}routes/${id}`, {
        method: "GET",
        headers: myHeaders,
      });
      const result = await res.json();
      const data = result.payload;

      setRouteName(data.name);
      setDepartureLocation(data.departure_location.id); // Set departure location name
      setArrivalLocation(data.arrival_location.id); // Set arrival location name
      setSelectedStops(data.routeStops || []);
    } catch (err) {
      console.error("Failed to fetch route", err);
      setError("Failed to load route details.");
    }
  };

  useEffect(() => {
    if (routeId) {
      const loadData = async () => {
        await fetchLocations();
        if (typeof routeId === "string") {
          await fetchRouteData(routeId); // Fetch data for the route if routeId is present
        } else {
          console.error("Invalid routeId format:", routeId);
        }
        setLoading(false);
      };
      loadData();
    } else {
      const loadLocations = async () => {
        await fetchLocations();
        setLoading(false); // Handle case where routeId is not available yet
      };
      loadLocations();
    }
  }, [routeId]); // Only re-fetch if routeId changes

  // Update total price and total duration whenever stops are added or removed
  useEffect(() => {
    const newTotalPrice = selectedStops.reduce((max, stop) => Math.max(max, parseFloat(stop.price)), 0);
    const newTotalDuration = selectedStops.reduce((sum, stop) => sum + parseInt(stop.duration), 0);
    setTotalPrice(newTotalPrice);
    setTotalDuration(newTotalDuration);
  }, [selectedStops]);

  const addStopToRoute = () => {
    if (!stopName || !duration || !price) {
      setError("Please fill out the stop name, duration, and price.");
      return;
    }
    setSelectedStops((prev) => [
      ...prev,
      { stopName, duration, price },
    ]);
    setStopName("");
    setDuration("");
    setPrice("");
  };

  const removeStopFromRoute = (i: number) => {
    setSelectedStops((prev) => prev.filter((_, index) => index !== i));
  };

  const updateStopSequence = (source: number, target: number) => {
    if (target < 0 || target >= selectedStops.length) return; // Prevent out-of-bound indices
    const reordered = [...selectedStops];
    const [moved] = reordered.splice(source, 1);
    reordered.splice(target, 0, moved);
    setSelectedStops(reordered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!routeName || !departureLocation || !arrivalLocation || selectedStops.length < 1) {
      setError("Please fill in all required fields and add at least one stop.");
      return;
    }
  
    setSaving(true);
    setSaveSuccess(false);
  
    const idempotencyKey = uuidV4();  // Generate idempotency key once for the request
  
    const data = {
      idempotency_key: idempotencyKey,  // Add idempotency_key to the route
      name: routeName,
      departure_location: departureLocation,
      arrival_location: arrivalLocation,
      routeStops: selectedStops.map((stop, index) => ({
        ...stop,
        idempotency_key: uuidV4(),  // Add idempotency_key to each stop
        stopOrder: index + 1,
        duration: parseInt(stop.duration),
        price: parseFloat(stop.price),
      })),
      total_price: totalPrice,  // Add total price to the route
      total_duration: totalDuration,  // Add total duration to the route
    };
  
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get("token")}`);
    myHeaders.append("Content-Type", "application/json");
  
    try {
      const res = await fetch(
        `${API_URL}routes${routeId ? `/${routeId}` : ""}`,
        {
          method: routeId ? "PUT" : "POST",
          headers: myHeaders,
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
  
      if (res.ok) {
        setSaveSuccess(true);
        if (!routeId) {
          setRouteName("");
          setDepartureLocation("");
          setArrivalLocation("");
          setSelectedStops([]);
        }
      } else {
        setError(result.message || "Failed to save route.");
      }
    } catch (err) {
      console.error("Error saving route:", err);
      setError("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };
  

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
          <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <span className="text-red-500">×</span>
          </button>
        </div>
      )}
  
      {saveSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Success:</strong>
          <span className="block sm:inline"> Route saved successfully!</span>
          <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setSaveSuccess(false)}>
            <span className="text-green-500">×</span>
          </button>
        </div>
      )}
  
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col p-6 space-y-6 bg-white shadow-lg rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-900">Route Name</label>
            <input
              type="text"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>
  
          {/* Departure and Arrival Location on the same row on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Departure Location</label>
              <select
                value={departureLocation}
                onChange={(e) => setDepartureLocation(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
                required
              >
                <option value="">Select location</option>
                {locations.map((stop) => (
                  <option key={stop.id} value={stop.id}>
                    {stop.name}
                  </option>
                ))}
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-900">Arrival Location</label>
              <select
                value={arrivalLocation}
                onChange={(e) => setArrivalLocation(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
                required
              >
                <option value="">Select terminal stop</option>
                {locations.map((stop) => (
                  <option key={stop.id} value={stop.id}>
                    {stop.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
  
          <div>
            <h3 className="text-lg font-medium text-gray-900">Route's Stops</h3>
            <ul className="space-y-4">
              {selectedStops.map((stop, index) => (
                <li key={index} className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-gray-50">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">{stop.stopName}</span>
                    <span className="text-sm text-gray-600">Duration: {stop.duration} min</span>
                    <span className="text-sm text-gray-600">Price: {currencySymbol}{stop.price}</span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => updateStopSequence(index, index - 1)}
                      disabled={index === 0}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => updateStopSequence(index, index + 1)}
                      disabled={index === selectedStops.length - 1}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeStopFromRoute(index)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-900">Add Stops to Route</label>
            <div className="flex space-x-4 mt-2">
              <input
                type="text"
                placeholder="Stop Name"
                value={stopName}
                onChange={(e) => setStopName(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
              <input
                type="text"
                placeholder="Duration (min)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
              <button
                type="button"
                onClick={addStopToRoute}
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <div className="text-lg font-medium text-gray-900">
                <p className="text-black">Total Price: <span className="text-green-600">{currencySymbol}{totalPrice.toFixed(0)}</span></p>
                <p className="text-black">
                Total Duration: <span className="text-green-600">
                {totalDuration >= 1440
                  ? `${Math.floor(totalDuration / 1440)} days ${Math.floor((totalDuration % 1440) / 60)} hours ${totalDuration % 60} min`
                  : totalDuration >= 60
                  ? `${Math.floor(totalDuration / 60)} hours ${totalDuration % 60} min`
                  : `${totalDuration} min`}
                </span>
                </p>
            </div>
            <button
              type="submit"
              className={`px-6 py-3 rounded-lg shadow-lg ${
                saving ? "bg-gray-400" : "bg-blue-500"
              } text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={saving}
            >
              {saving ? "Saving..." : routeId ? "Update Route" : "Create Route"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
