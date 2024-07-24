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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append(
          'Authorization',
          `Bearer ${Cookies.get('token')}`
        );

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
        };

        const response = await fetch('https://api.tike.rw/drivers/', requestOptions);

        if (!response.ok) {
          throw new Error(`Failed to fetch drivers: ${response.statusText}`);
        }

        const result = await response.json();
        setDrivers(result.payload);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold">All Drivers</h2>
        <div className="sm:w-64 xl:w-96">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for a driver"
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
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Fullname
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Contacts
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
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
                  ) : (
                    drivers.map((driver, index) => (
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
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                          >
                            <FiTrash className="mr-2" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
