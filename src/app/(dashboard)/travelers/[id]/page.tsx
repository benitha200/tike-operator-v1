"use client"

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { API_URL } from "@/constants/Constants";

interface Traveler {
  id: string;
  fullname: string;
  nationality: string;
  dob: string;
  gender: 'male' | 'female';
  phone_number: string;
  email: string;
}

interface FormData {
  fullname: string;
  nationality: string;
  dob: string;
  gender: string;
  phone_number: string;
  email: string;
}

interface ApiResponse {
  payload: Traveler;
}

const NATIONALITIES = [
  ["RW", "Rwanda"],
  ["UG", "Uganda"],
  ["BI", "Burundi"],
  ["TZ", "Tanzania"],
  ["KE", "Kenya"],
  ["CD", "Congo"],
] as const;

const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="mb-6">
        <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

const EditTraveler: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [traveler, setTraveler] = useState<Traveler | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    nationality: "",
    dob: "",
    gender: "",
    phone_number: "",
    email: "",
  });

  useEffect(() => {
    const fetchTravelerData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const travelerId = window.location.pathname.split('/').pop();
        if (!travelerId) throw new Error('Traveler ID not found');

        const response = await fetch(`${API_URL}travelers/${travelerId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch traveler data');
        }

        const result = await response.json() as ApiResponse;
        setTraveler(result.payload);
        setFormData({
          fullname: result.payload.fullname || "",
          nationality: result.payload.nationality || "",
          dob: result.payload.dob || "",
          gender: result.payload.gender || "",
          phone_number: result.payload.phone_number || "",
          email: result.payload.email || "",
        });
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        toast.error("Failed to load traveler data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTravelerData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!traveler?.id) {
      toast.error("Traveler ID not found");
      return;
    }

    try {
      const response = await fetch(`${API_URL}travelers/${traveler.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update traveler');
      }

      await response.json();
      toast.success("Traveler data updated successfully!");
    } catch (err) {
      toast.error("Failed to update traveler. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ToastContainer />

      <div className="mb-6">
        <Link
          href="/travelers"
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
        >
          <FiArrowLeftCircle className="-ml-1 mr-2 h-6 w-6" />
          All Travelers
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            readOnly
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Nationality
          </label>
          <input
            type="text"
            value={NATIONALITIES.find(([value]) => value === formData.nationality)?.[1] || formData.nationality}
            className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            readOnly
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            readOnly
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Gender
          </label>
          <input
            type="text"
            value={formData.gender === 'male' ? 'Male' : 'Female'}
            className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            readOnly
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            readOnly
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            readOnly
          />
        </div>
      </div>
    </form>
      )}
    </div>
  );
};

export default EditTraveler;
