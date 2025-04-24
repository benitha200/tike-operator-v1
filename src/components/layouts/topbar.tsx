// // "use client";

// // import { Navbar, Dropdown, Avatar } from 'flowbite-react';
// // import Image from 'next/image';

// // interface Props {}

// // function Topbar(props: Props) {
// //   const {} = props;

// //   return (
// //     <>
  
// //       <Navbar
// //         fluid={true}
// //         rounded={true}
// //         className="bg-white border-b border-gray-200 fixed z-30 w-full px-3 py-3"
// //       >
// //         <Navbar.Brand href="/">
// //           <Image src="/img/logo.svg" width={100} height={100} alt="Tike Logo" />
// //         </Navbar.Brand>

// //       </Navbar>
// //     </>
// //   );
// // }

// // export default Topbar;


// "use client";

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import Cookies from 'js-cookie';
// import { FiMenu, FiUser, FiLogOut } from 'react-icons/fi';
// import Menu from './menu';

// function Topbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [userInfo, setUserInfo] = useState<{ name?: string, role?: string }>({});

//   useEffect(() => {
//     const userCookie = Cookies.get('currentUser');
//     if (userCookie) {
//       try {
//         const parsedUser = JSON.parse(userCookie);
//         setUserInfo({
//           name: parsedUser.name || 'User',
//           role: parsedUser.role || ''
//         });
//       } catch (error) {
//         console.error('Error parsing user cookie:', error);
//       }
//     }
//   }, []);

//   function handleLogout() {
//     // Clear all cookies
//     document.cookie.split(";").forEach((c) => {
//       document.cookie = c
//         .replace(/^ +/, "")
//         .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
//     });
//     window.location.href = '/login';
//   }

//   function toggleMobileMenu() {
//     setIsMenuOpen(!isMenuOpen);
//   }

//   return (
//     <>
//       <nav className="bg-white border-b border-gray-200 fixed z-30 w-full px-3 py-3 lg:px-5 lg:pl-3">
//         <div className="flex items-center justify-between">
//           {/* Logo and Mobile Menu Toggle */}
//           <div className="flex items-center">
//             <button 
//               onClick={toggleMobileMenu} 
//               className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
//             >
//               <FiMenu className="w-6 h-6" />
//             </button>

//             <Link href="/" className="flex items-center">
//               <Image 
//                 src="/img/logo.svg" 
//                 width={100} 
//                 height={40} 
//                 alt="Tike Logo" 
//                 className="h-8 mr-3"
//               />
//             </Link>
//           </div>

//           {/* User Profile and Dropdown */}
//           <div className="flex items-center">
//             {/* <div className="hidden lg:flex items-center mr-4">
//               <span className="text-sm font-medium text-gray-700 mr-2">
//                 {userInfo.name}
//               </span>
//               <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                 {userInfo.role}
//               </span>
//             </div> */}

//             <div className="relative">
//               <button 
//                 onClick={handleLogout}
//                 className="text-gray-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 focus:outline-none flex items-center"
//               >
//                 <FiLogOut className="mr-2" /> 
//                 <span className="hidden lg:inline">Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMobileMenu} />
//     </>
//   );
// }

// export default Topbar;

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { FiMenu, FiLogOut } from 'react-icons/fi';

interface TopbarProps {
  onMenuToggle: () => void;
}

function Topbar({ onMenuToggle }: TopbarProps) {
  const [userInfo, setUserInfo] = useState<{ name?: string; role?: string }>({});

  useEffect(() => {
    const userCookie = Cookies.get('currentUser');
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie);
        setUserInfo({
          name: parsedUser.name || 'User',
          role: parsedUser.role || ''
        });
      } catch (error) {
        console.error('Error parsing user cookie:', error);
      }
    }
  }, []);

  function handleLogout() {
    Object.keys(Cookies.get()).forEach(cookieName => {
      Cookies.remove(cookieName, { path: '/' });
    });
    window.location.href = '/login';
  }

  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full px-3 py-3 lg:px-5 lg:pl-3">
      <div className="flex items-center justify-between">
        {/* Logo and Mobile Menu Toggle */}
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
          >
            <FiMenu className="w-6 h-6" />
          </button>

          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              width={100}
              height={40}
              alt="Tike Logo"
              className="h-8 mr-3"
            />
          </Link>
        </div>

        {/* User Profile and Logout */}
        <div className="flex items-center">
          <div className="relative">
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 focus:outline-none flex items-center"
            >
              <FiLogOut className="mr-2" />
              <span className="hidden lg:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
