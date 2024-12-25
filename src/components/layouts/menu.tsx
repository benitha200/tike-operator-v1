// "use client";

// import Link from "next/link";
// import { BiTrip } from "react-icons/bi";
// import { GrLocation } from "react-icons/gr";
// import {
//   BsCardChecklist,
//   BsCashStack,
//   BsFilePerson,
//   BsPeopleFill,
//   BsShieldCheck,
// } from "react-icons/bs";
// import { FaBusAlt, FaHome } from "react-icons/fa";
// import { FiBarChart, FiHelpCircle, FiSettings, FiUser } from "react-icons/fi";
// import { IoTicketOutline } from "react-icons/io5";
// import Footer from "./footer";
// import Cookies from "js-cookie";
// import { useState, useEffect } from "react";

// interface Props {}

// function Menu(props: Props) {
//   const {} = props;

//   const [role, setRole] = useState<string>("");

//   useEffect(() => {
//     const userRoleString = Cookies.get("currentUser");
//     if (userRoleString) {
//       try {
//         const userRole = JSON.parse(userRoleString);
//         console.log(userRole.role);
//         setRole(userRole.role);
//       } catch (error) {
//         console.error('Error parsing currentUser cookie:', error);
//       }
//     }
//   }, []);

//   function handleLogout() {
//     document.cookie.split(";").forEach((c) => {
//       document.cookie = c
//         .replace(/^ +/, "")
//         .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
//     });
//     window.location.reload();
//   }

//   return (
//     <>
//       <aside
//         id="sidebar"
//         className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
//         aria-label="Sidebar"
//       >
//         <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
//           <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
//             <div className="flex-1 px-3 bg-white divide-y space-y-1">
//               {renderMenuItems(role)}
//             </div>
//           </div>
//           <Footer />
//         </div>
//       </aside>
//     </>
//   );
// }

// export default Menu;

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BiTrip } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import {
  BsCardChecklist,
  BsCashStack,
  BsFilePerson,
  BsPeopleFill,
} from "react-icons/bs";
import { FaBusAlt, FaHome } from "react-icons/fa";
import { FiHelpCircle, FiUser, FiX } from "react-icons/fi";
import Footer from "./footer";
import Cookies from "js-cookie";

interface Props {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

function Menu({ isMenuOpen, toggleMenu }: Props) {
  const [role, setRole] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userRoleString = Cookies.get("currentUser");
    if (userRoleString) {
      try {
        const userRole = JSON.parse(userRoleString);
        setRole(userRole.role);
      } catch (error) {
        console.error('Error parsing currentUser cookie:', error);
      }
    }
  }, []);

  // Don't render anything until after mounting to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  function handleLogout() {
    Object.keys(Cookies.get()).forEach(cookieName => {
      Cookies.remove(cookieName, { path: '/' });
    });
    window.location.reload();
  }

  const renderMenuItems = (roleType: string) => {
    if (roleType === "operator") {
      return (
        <>
          <ul className="space-y-2 pb-2">
            {[
              { href: "/", icon: <FaHome />, label: "Home" },
              { href: "/cars", icon: <FaBusAlt />, label: "Cars" },
              { href: "/drivers", icon: <BsFilePerson />, label: "Drivers" },
              { href: "/locations", icon: <GrLocation />, label: "Locations" },
              { href: "/trips", icon: <BiTrip />, label: "Trips" },
              { href: "/travelers", icon: <BsPeopleFill />, label: "Travelers" },
              { href: "/bookings", icon: <BsCardChecklist />, label: "Bookings" },
              { href: "/payments", icon: <BsCashStack />, label: "Payments" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                  onClick={toggleMenu}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      );
    } else if (role) {
      return (
        <ul className="space-y-2 pb-2">
          {[
            { href: "/", icon: <FaHome />, label: "Home" },
            { href: "/operators", icon: <FaBusAlt />, label: "Operator" },
            { href: "/allbookings", icon: <BsFilePerson />, label: "Bookings" },
            { href: "/alltrips", icon: <GrLocation />, label: "Trips" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
                onClick={toggleMenu}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/operator/login"
              className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75"
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
            >
              <FiUser />
              <span className="ml-3">Logout</span>
            </Link>
          </li>
        </ul>
      );
    }
    return null;
  };

  return (
    <>
      {/* Mobile Menu */}
      {mounted && (
        <div 
          className={`fixed inset-0 z-40 lg:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <div 
            className="absolute inset-0 bg-black opacity-50"
            onClick={toggleMenu}
          />
          <aside 
            className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Menu</h2>
              <button 
                onClick={toggleMenu}
                className="text-gray-600 hover:text-gray-900"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex-1 px-3 bg-white divide-y space-y-1">
                {renderMenuItems(role)}
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      {mounted && (
        <aside
          className="fixed hidden z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
          aria-label="Sidebar"
        >
          <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex-1 px-3 bg-white divide-y space-y-1">
                {renderMenuItems(role)}
              </div>
            </div>
            <Footer />
          </div>
        </aside>
      )}
    </>
  );
}

export default Menu;
