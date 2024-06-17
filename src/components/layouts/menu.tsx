"use client";

import Link from "next/link";
import { BiTrip } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import {
  BsCardChecklist,
  BsFilePerson,
  BsPeopleFill,
  BsShieldCheck,
} from "react-icons/bs";
import { FaBusAlt, FaHome } from "react-icons/fa";
import { FiBarChart, FiHelpCircle, FiSettings, FiUser } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";
import Footer from "./footer";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

interface Props {}

function Menu(props: Props) {
  const {} = props;

  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const userRoleString = Cookies.get("currentUser");
    if (userRoleString) {
      try {
        const userRole = JSON.parse(userRoleString);
        console.log(userRole.role);
        setRole(userRole.role);
      } catch (error) {
        console.error('Error parsing currentUser cookie:', error);
      }
    }
  }, []);

  function handleLogout() {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    window.location.reload();
  }

  return (
    <>
      <aside
        id="sidebar"
        className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
        aria-label="Sidebar"
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 bg-white divide-y space-y-1">
              {role ? (
                role === "operator" ? (
                  <>
                 
                  <ul className="space-y-2 pb-2">
                    <li>
                      <Link
                        href="/"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      >
                        <FaHome />
                        <span className="ml-3">Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/cars"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      >
                        <FaBusAlt />
                        <span className="ml-3">Cars</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/drivers"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      >
                        <BsFilePerson />
                        <span className="ml-3">Drivers</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/locations"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      >
                        <GrLocation />
                        <span className="ml-3">Locations</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/trips"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      >
                        <BiTrip />
                        <span className="ml-3">Trips</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/travelers"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      >
                        <BsPeopleFill />
                        <span className="ml-3">Travelers</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/bookings"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      >
                        <BsCardChecklist />
                        <span className="ml-3">Bookings</span>
                      </Link>
                    </li>
                  </ul>

                  <div className="space-y-2 pt-2">
                    <Link
                      href="/reports"
                      className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                    >
                      <FiBarChart />
                      <span className="ml-3">Reports</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                    >
                      <FiSettings />
                      <span className="ml-3">Settings</span>
                    </Link>
                    <Link
                      href="/login"
                      className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      onClick={handleLogout}
                    >
                      <FiUser />
                      <span className="ml-3">Logout</span>
                    </Link>
                    <Link
                      href="/help"
                      className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                    >
                      <FiHelpCircle />
                      <span className="ml-3">Help</span>
                    </Link>
                  </div>
                  </>
                ) : (
                  <ul className="space-y-2 pb-2">
                    <li>
                      <Link
                        href="/"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      >
                        <FaHome />
                        <span className="ml-3">Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/operators"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      >
                        <FaBusAlt />
                        <span className="ml-3">Operator</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/allbookings"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      >
                        <BsFilePerson />
                        <span className="ml-3">Bookings</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/alltrips"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      >
                        <GrLocation />
                        <span className="ml-3">Trips</span>
                      </Link>
                    </li>

                    <Link
                      href="/login"
                      className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      onClick={handleLogout}
                    >
                      <FiUser />
                      <span className="ml-3">Logout</span>
                    </Link>
                    {/* <li>
                      <Link
                        href="/trips"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      >
                        <BiTrip />
                        <span className="ml-3">Trips</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/travelers"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      >
                        <BsPeopleFill />
                        <span className="ml-3">Travelers</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/bookings"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                      >
                        <BsCardChecklist />
                        <span className="ml-3">Bookings</span>
                      </Link>
                    </li> */}
                  </ul>
                )
              ) : null}
            </div>
          </div>
          <Footer />
        </div>
      </aside>
    </>
  );
}

export default Menu;
