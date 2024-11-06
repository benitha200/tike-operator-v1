"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi';
import Cookies from 'js-cookie';

type DriversData = {
  id: string;
  idempotency_key: string;
  car_no: string;
  immatriculation_no: string;
  brand: string;
  model: string;
  type: string;
  fullname: string;
  phone_number: string;
  email: string;
  nationality: string;
  gender: string;
};

export default function Drivers() {
  const [drivers, setDrivers] = useState<DriversData[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<DriversData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    const results = drivers.filter(driver =>
      (driver.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (driver.phone_number?.includes(searchTerm) ?? false) ||
      (driver.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    );
    setFilteredDrivers(results);
  }, [searchTerm, drivers]);

  const fetchDrivers = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Cookies.get('token')}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}drivers/`, requestOptions);

      if (!response.ok) {
        throw new Error(`Failed to fetch drivers: ${response.statusText}`);
      }

      const result = await response.json();
      setDrivers(result.payload);
      setFilteredDrivers(result.payload);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteClick = (driverId: string) => {
    setDriverToDelete(driverId);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (driverToDelete) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);
        myHeaders.append("Cookie", "csrftoken=m4Li2tWC0w0QKzBHV7e8tal2rnYqh6nj");

        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow" as RequestRedirect,
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}drivers/${driverToDelete}`, requestOptions);

        if (!response.ok) {
          throw new Error(`Failed to delete driver: ${response.statusText}`);
        }

        console.log("Driver deleted successfully");
        // Refresh the drivers list
        fetchDrivers();
      } catch (error) {
        console.error("Error deleting driver:", error);
      }
    }
    setShowModal(false);
    setDriverToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
    setDriverToDelete(null);
  };

  return (
    <>
      <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold">All Drivers</h2>
        <div className="sm:w-64 xl:w-96">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for a driver"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Link
          href="/drivers/new"
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
        >
          <FiPlus className="-ml-1 mr-2 h-6 w-6" />
          Add New Driver
        </Link>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      No.
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Fullname
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Contacts
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Other Details
                    </th>
                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : filteredDrivers.length > 0 ? (
                    filteredDrivers.map((driver, index) => (
                      <tr key={driver.id} className="hover:bg-gray-100">
                        <td className="p-4 text-base font-medium text-gray-900">
                          #{index + 1}
                        </td>
                        <td className="p-4 text-base font-normal text-gray-500">
                          <div className="text-base font-semibold text-gray-900">
                            {driver.fullname}
                          </div>
                        </td>
                        <td className="p-4 text-base font-medium text-gray-900">
                          <div className="text-base font-semibold text-gray-900">
                            {driver.phone_number}
                          </div>
                          <div className="text-sm font-normal text-gray-500">
                            {driver.email}
                          </div>
                        </td>
                        <td className="p-4 text-base font-medium text-gray-900">
                          <div className="text-base font-semibold text-gray-900">
                            {driver.nationality}
                          </div>
                          <div className="text-sm font-normal text-gray-500">
                            {driver.gender}
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap space-x-2">
                          <Link
                            href={`/drivers/${driver.id}`}
                            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                          >
                            <FiEdit className="mr-2" />
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(driver.id)}
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                          >
                            <FiTrash className="mr-2" />
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-4 text-center">
                        No drivers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiTrash className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Driver
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this driver? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={handleDeleteCancel}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}