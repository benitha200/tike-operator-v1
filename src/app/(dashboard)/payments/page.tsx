"use client"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface Payment {
  id: string;
  requestTransactionId: string;
  transactionId: string;
  amount: string;
  phoneNumber: string;
  status: string;
  responseCode: string;
  callbackPayload: {
    status: string;
    message: string;
    success: boolean;
    responsecode: string;
    transactionid: string;
    requesttransactionid: string;
  };
  bookingId: string;
  createdAt: string;
  updatedAt: string;
  booking: {
    id: string;
    price: number;
    is_one_way: boolean;
    notes: string | null;
    canceled: boolean;
    payment_status: string;
    payment_reference: string;
    createdAt: string;
    updatedAt: string;
  };
}

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"all" | "paid" | "unpaid">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(20);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Cookies.get("token")}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}payments/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPayments(result.payload);
        setFilteredPayments(result.payload);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const filteredPayments = payments.filter((payment) => {
      if (searchTerm.trim() !== "") {
        return (
          payment.phoneNumber.includes(searchTerm) ||
          payment.transactionId.includes(searchTerm)
        );
      }
      return true;
    });

    if (paymentStatus !== "all") {
      filteredPayments.filter(
        (payment) => payment.status.toLowerCase() === paymentStatus
      );
    }

    setFilteredPayments(filteredPayments);
  }, [payments, searchTerm, paymentStatus]);

  // Logic for pagination
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePaymentStatusChange = (status: "all" | "paid" | "unpaid") => {
    setPaymentStatus(status);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>All Payments</CardTitle>
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Search for Payment"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full sm:w-64 xl:w-96"
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="payment-status-all"
              checked={paymentStatus === "all"}
              onChange={() => handlePaymentStatusChange("all")}
            />
            <label htmlFor="payment-status-all">All</label>
            <Checkbox
              id="payment-status-paid"
              checked={paymentStatus === "paid"}
              onChange={() => handlePaymentStatusChange("paid")}
            />
            <label htmlFor="payment-status-paid">Paid</label>
            <Checkbox
              id="payment-status-unpaid"
              checked={paymentStatus === "unpaid"}
              onChange={() => handlePaymentStatusChange("unpaid")}
            />
            <label htmlFor="payment-status-unpaid">Unpaid</label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <table className="table-auto w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                Transaction ID
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                Phone Number
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                Booking
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                Created At
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-100">
                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                  {payment.transactionId}
                </td>
                <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                  {payment.phoneNumber}
                </td>
                <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                  {payment.amount}
                </td>
                <td
                  className={`p-4 whitespace-nowrap text-base font-medium ${
                    payment.status === "PAID"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {payment.status}
                </td>
                <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                  {payment.booking.id}
                </td>
                <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                  {new Date(payment.createdAt).toLocaleString()}
                </td>
                <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                  {new Date(payment.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm font-normal text-gray-500">
          Showing{" "}
          <span className="text-gray-900 font-semibold">
            {indexOfFirstPayment + 1}-
            {Math.min(indexOfLastPayment, filteredPayments.length)}
          </span>{" "}
          of{" "}
          <span className="text-gray-900 font-semibold">
            {filteredPayments.length}
          </span>{" "}
          payments
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastPayment >= filteredPayments.length}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Payments;