"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route } from "./interfaces";
import { API_URL } from "@/constants/Constants";

export default function Routes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const currencySymbol = "RWF"; // Define the currency symbol as a variable
  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get("token")}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${API_URL}routes/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setRoutes(result.payload);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error fetching routes");
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (routeId: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get("token")}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    fetch(`${API_URL}routes/${routeId}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          setRoutes(routes.filter((route) => route.id !== routeId));
          toast.success("Route deleted successfully");
        } else {
          throw new Error("Failed to delete route");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error occurred while deleting route");
      });
  };

  const filteredRoutes = routes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.departure_location?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      route.arrival_location?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Calculate the total duration and total price for each route
  const calculateTotalPrice = (route: Route) => {
  return route.total_price.toFixed(0);
  };

  const calculateTotalDuration = (route: Route) => {
    const totalDuration = route.total_duration;
    return totalDuration >= 1440
      ? `${Math.floor(totalDuration / 1440)} days ${Math.floor((totalDuration % 1440) / 60)} hours ${totalDuration % 60} mins`
      : totalDuration >= 60
      ? `${Math.floor(totalDuration / 60)} hours ${totalDuration % 60} mins`
      : `${totalDuration} mins`;
  };

  return (
    <>
      <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold">All Routes</h2>
        <div className="sm:w-64 xl:w-96">
          <input
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleSearch}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for a route"
          />
        </div>
        <Link
          href="/routes/new"
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
        >
          <FiPlus className="-ml-1 mr-2 h-6 w-6" />
          Add New Route
        </Link>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full text-left overflow-y-auto divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      Departure Location
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      Arrival Location
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-gray-500 uppercase"
                    >
                     Duration 
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-gray-500 uppercase"
                    >
                      Cost ({currencySymbol})
                    </th>
                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRoutes.length > 0 ? (
                    filteredRoutes.map((route, index) => (
                      <tr className="hover:bg-gray-100" key={route.id}>
                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                          #{index + 1}
                        </td>
                        <td className="p-4 whitespace-nowrap text-base font-normal text-gray-500">
                          {route.name}
                        </td>
                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                          {route.departure_location?.name || "N/A"}
                        </td>
                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                          {route.arrival_location?.name || "N/A"}
                        </td>
                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                          {calculateTotalDuration(route)} 
                        </td>
                        <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                          {calculateTotalPrice(route)} {currencySymbol}
                        </td>
                        <td className="p-4 whitespace-nowrap space-x-2">
                          <Link
                            href={`/routes/${route.id}`}
                            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                          >
                            <FiEdit className="mr-2" />
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(route.id)}
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                          >
                            <FiTrash className="mr-2" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center p-4 text-base font-medium text-gray-500"
                      >
                        No routes found matching your search criteria.
                      </td>
                    </tr>
                  )}
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
