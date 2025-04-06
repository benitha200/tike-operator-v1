"use client"
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trip } from "../alltrips/interfaces";
import { API_URL } from "@/constants/Constants";

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${API_URL}trips/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTrips(result.payload);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error fetching trips");
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (tripId: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    fetch(`${API_URL}trips/${tripId}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          setTrips(trips.filter(trip => trip.id !== tripId));
          toast.success("Trip deleted successfully");
        } else {
          throw new Error("Failed to delete trip");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error occurred while deleting trip");
      });
  };

  // Function to calculate the arrival time
  const calculateArrivalTime = (departureTime: string, totalDuration: number): string => {
    const departure = new Date(`1970-01-01T${departureTime}`);
    departure.setMinutes(departure.getMinutes() + totalDuration); // Add total_duration (in minutes)
    const arrivalTimeStr = `${String(departure.getHours()).padStart(2, '0')}:${String(departure.getMinutes()).padStart(2, '0')}`;
    return arrivalTimeStr; // Format the time as hh:mm
  };

  const filteredTrips = trips.filter(trip => 
    trip.route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${trip.route.departure_location.name} -> ${trip.route.arrival_location.name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.driver?.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold">All Trips</h2>
        <div className="sm:w-64 xl:w-96">
          <input
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleSearch}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for a trip"
          />
        </div>
        <Link
          href="/trips/new"
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
        >
          <FiPlus className="-ml-1 mr-2 h-6 w-6" />
          Add New Trip
        </Link>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full text-left overflow-y-auto divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                      No.
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                      Route
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                      Locations
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                      Car
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTrips.map((trip, index) => {
                    const arrivalTime = trip.departure_time && trip.route.total_duration
                      ? calculateArrivalTime(trip.departure_time, trip.route.total_duration)
                      : 'N/A';

                    return (
                      <tr className="hover:bg-gray-100" key={trip.id}>
                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                          #{index + 1}
                        </td>
                        <td className="p-4 whitespace-nowrap text-base font-normal text-gray-500">
                          <div className="text-base font-semibold text-gray-900">
                            {trip.route.name || 'N/A'}
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                          <div className="text-base font-semibold text-gray-900">
                            {`${trip.route.departure_location.name} -> ${trip.route.arrival_location.name}` || 'N/A'}
                          </div>
                          <div className="text-sm font-normal text-gray-500">
                            {trip.departure_time ? trip.departure_time.slice(0, 5) : 'N/A'}- {arrivalTime}
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                          <div className="text-base font-semibold text-gray-900">
                            {trip.car ? `${trip.car.brand} ${trip.car.model} (${trip.car.immatriculation_no})` : 'N/A'}
                          </div>
                          <div className="text-sm font-normal text-gray-500">
                            Driver: {trip.driver?.fullname || 'N/A'}
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                          <div className="text-base font-semibold text-gray-900">
                            {trip.route.total_price ? `${trip.route.total_price} Rwf` : 'N/A'}
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap space-x-2">
                          <Link
                            href={`/trips/${trip.id}`}
                            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                          >
                            <FiEdit className="mr-2" />
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(trip.id)}
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                          >
                            <FiTrash className="mr-2" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
