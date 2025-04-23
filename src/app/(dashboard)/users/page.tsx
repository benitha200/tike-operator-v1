
"use client"
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState,ChangeEvent } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { User } from "../users/interfaces";
import { API_URL } from "@/constants/Constants";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${API_URL}users/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUsers(result.payload);
      })
      .catch((error) => console.error(error));
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when search term changes
  };

  // Function to paginate
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Logic for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Function to filter users based on search term
  const filteredUsers = currentUsers.filter((user) =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold">All Users</h2>
        <div className="sm:w-64 xl:w-96">
          <input
            type="text"
            name="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for a user"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full overflow-y-auto divide-y divide-gray-200">
                {/* Table Header */}
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="p-4 text-left">No.</th>
                    <th scope="col" className="p-4 text-left">Fullname</th>
                    <th scope="col" className="p-4 text-left">Role</th>
                    <th scope="col" className="p-4 text-left">Contact</th>
                    <th scope="col" className="p-4 text-left">Operator</th>
                    <th scope="col" className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <tr className="hover:bg-gray-100" key={user.id}>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-normal text-gray-500">
                        <div className="text-base font-semibold text-gray-900">
                          {user.fullname}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-normal text-gray-500">
                        <div className="text-base font-semibold text-gray-900">
                          {user.role}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-normal text-gray-500">
                        <div className="text-base font-semibold text-gray-900">
                          {user.identifier}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-normal text-gray-500">
                        <div className="text-base font-semibold text-gray-900">
                          {user.operator?.name}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-normal text-gray-500">
                        <Link
                          href={`/users/${user.id}`}
                          className="text-cyan-600 hover:text-cyan-900"
                        >
                          <FiEdit />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center p-5 bg-white border-t border-gray-200">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center w-2/8"
        >
          Previous
        </button>
        <span className="text-sm font-normal text-gray-500">
          Showing <span className="text-gray-900 font-semibold">{indexOfFirstUser + 1}-{Math.min(indexOfLastUser, users.length)}</span> of{" "}
          <span className="text-gray-900 font-semibold">{users.length}</span>
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastUser >= users.length}
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center w-2/8"
        >
          Next
        </button>
      </div>
    </>
  );
}


