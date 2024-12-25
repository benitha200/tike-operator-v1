// "use client"

// import React, { useState, useEffect } from 'react';

// interface PaymentBooking {
//   id: string;
//   price: number;
//   is_one_way: boolean;
//   notes: string | null;
//   canceled: boolean;
//   payment_status: string;
//   payment_reference: string | null;
//   createdAt: string;
//   updatedAt: string;
//   seat_number: string;
// }

// interface Payment {
//   id: string;
//   requestTransactionId: string;
//   transactionId: string | null;
//   amount: string;
//   phoneNumber: string;
//   status: 'PAID' | 'FAILED';
//   responseCode: string;
//   callbackPayload: {
//     data?: {
//       amount: number;
//       transID: string;
//     };
//     stack?: string;
//     message?: string;
//     status?: number;
//   };
//   bookingId: string;
//   createdAt: string;
//   updatedAt: string;
//   booking: PaymentBooking;
// }

// interface ApiResponse {
//   payload: Payment[];
// }

// const PaymentDashboard = () => {
//   const [payments, setPayments] = useState<Payment[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [paymentsPerPage] = useState<number>(20);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:3010/payments');
//         if (!response.ok) {
//           throw new Error('Failed to fetch payments');
//         }
//         const data: ApiResponse = await response.json();
//         setPayments(data.payload); // Access the payments through the payload property
//         setError(null);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred while fetching payments');
//         setPayments(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   const formatDate = (dateString: string): string => {
//     return new Date(dateString).toLocaleString();
//   };

//   const formatAmount = (amount: string): string => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'RWF'
//     }).format(Number(amount));
//   };

//   const filteredPayments = payments?.filter((payment) =>
//     payment.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination logic
//   const indexOfLastPayment = currentPage * paymentsPerPage;
//   const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
//   const currentPayments = filteredPayments?.slice(
//     indexOfFirstPayment,
//     indexOfLastPayment
//   );

//   const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset to first page when searching
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-cyan-600">Loading payments...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-red-600">Error: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
//         <h2 className="text-xl font-semibold">Payment Transactions</h2>
//         <form>
//           <div className="sm:w-64 xl:w-96">
//             <input
//               type="text"
//               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
//               placeholder="Search by phone number"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//           </div>
//         </form>
//       </div>

//       <div className="flex flex-col">
//         <div className="overflow-x-auto">
//           <div className="align-middle inline-block min-w-full">
//             <div className="shadow overflow-hidden">
//               <table className="table-fixed min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th scope="col" className="p-4">
//                       <div className="flex items-center">
//                         <input
//                           type="checkbox"
//                           className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
//                         />
//                       </div>
//                     </th>
//                     <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
//                       Transaction ID
//                     </th>
//                     <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
//                       Amount
//                     </th>
//                     <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
//                       Status
//                     </th>
//                     <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
//                       Phone Number
//                     </th>
//                     <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
//                       Seat Number
//                     </th>
//                     <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
//                       Date
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {currentPayments?.map((payment) => (
//                     <tr key={payment.id} className="hover:bg-gray-100">
//                       <td className="p-4 w-4">
//                         <div className="flex items-center">
//                           <input
//                             type="checkbox"
//                             className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
//                           />
//                         </div>
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
//                         <div className="text-base font-semibold text-gray-900">
//                           {payment.transactionId || 'N/A'}
//                         </div>
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         {formatAmount(payment.amount)}
//                       </td>
//                       <td className="p-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                           ${payment.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                           {payment.status}
//                         </span>
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         {payment.phoneNumber}
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         {payment.booking?.seat_number || 'N/A'}
//                       </td>
//                       <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
//                         {formatDate(payment.createdAt)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
//         <div className="flex items-center mb-4 sm:mb-0">
//           <span className="text-sm font-normal text-gray-500">
//             Showing{" "}
//             <span className="text-gray-900 font-semibold">
//               {indexOfFirstPayment + 1}-
//               {Math.min(indexOfLastPayment, filteredPayments?.length || 0)}
//             </span>{" "}
//             of{" "}
//             <span className="text-gray-900 font-semibold">
//               {filteredPayments?.length}
//             </span>{" "}
//             payments
//           </span>
//         </div>
//         <div className="flex items-center space-x-3">
//           <button
//             onClick={() => paginate(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => paginate(currentPage + 1)}
//             disabled={indexOfLastPayment >= (filteredPayments?.length || 0)}
//             className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PaymentDashboard;

"use client"

import { API_URL } from '@/constants/Constants';
import React, { useState, useEffect } from 'react';

interface PaymentBooking {
  id: string;
  price: number;
  is_one_way: boolean;
  notes: string | null;
  canceled: boolean;
  payment_status: string;
  payment_reference: string | null;
  createdAt: string;
  updatedAt: string;
  seat_number: string;
}

interface Payment {
  id: string;
  requestTransactionId: string;
  transactionId: string | null;
  amount: string;
  phoneNumber: string;
  status: 'PAID' | 'FAILED';
  responseCode: string;
  callbackPayload: {
    data?: {
      amount: number;
      transID: string;
    };
    stack?: string;
    message?: string;
    status?: number;
  };
  bookingId: string;
  createdAt: string;
  updatedAt: string;
  booking: PaymentBooking;
}

interface ApiResponse {
  payload: Payment[];
}

const PaymentDashboard = () => {
  const [payments, setPayments] = useState<Payment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paymentsPerPage] = useState<number>(20);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/payments`);
        if (!response.ok) {
          throw new Error('Failed to fetch payments');
        }
        const data: ApiResponse = await response.json();
        setPayments(data.payload);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching payments');
        setPayments(null);
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      fetchPayments();
    }
  }, [mounted]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  const formatAmount = (amount: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'RWF'
    }).format(Number(amount));
  };

  const filteredPayments = payments?.filter((payment) => 
    payment.status === 'PAID' && 
    payment.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredPayments?.reduce((sum, payment) => 
    sum + Number(payment.amount), 0) || 0;
  const totalTransactions = filteredPayments?.length || 0;

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments?.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-cyan-600">Loading payments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">
            {formatAmount(totalAmount.toString())}
          </div>
          <div className="text-sm text-gray-500">Total Amount (Paid)</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">
            {totalTransactions}
          </div>
          <div className="text-sm text-gray-500">Total Transactions (Paid)</div>
        </div>
      </div>

      <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold">Paid Transactions</h2>
        <form>
          <div className="sm:w-64 xl:w-96">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              placeholder="Search by phone number"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </form>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden rounded-lg">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                        />
                      </div>
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Transaction ID
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Phone Number
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Seat Number
                    </th>
                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentPayments?.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-100">
                      <td className="p-4 w-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                          />
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        <div className="text-base font-semibold text-gray-900">
                          {payment.transactionId || 'N/A'}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {formatAmount(payment.amount)}
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {payment.phoneNumber}
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {payment.booking?.seat_number || 'N/A'}
                      </td>
                      <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                        {formatDate(payment.createdAt)}
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
      <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-sm font-normal text-gray-500">
            Showing{" "}
            <span className="text-gray-900 font-semibold">
              {indexOfFirstPayment + 1}-
              {Math.min(indexOfLastPayment, filteredPayments?.length || 0)}
            </span>{" "}
            of{" "}
            <span className="text-gray-900 font-semibold">
              {filteredPayments?.length}
            </span>{" "}
            payments
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastPayment >= (filteredPayments?.length || 0)}
            className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDashboard;