"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams } from "next/navigation";
import { FiArrowLeftCircle } from "react-icons/fi";
import Cookies from "js-cookie";
import { API_URL } from "@/constants/Constants";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ROLES = ["Manager", "Operator", "Viewer"] as const;

export default function EditUserPage() {
  const params = useParams();
  const userId = params?.id && params.id !== "0" ? params.id : null;

  const [fullname, setFullname] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if (!userId) throw new Error("User ID not found");
        const response = await fetch(`${API_URL}users/${userId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const result = await response.json();
        const user = result.payload;

        setFullname(user.fullname || "");
        setIdentifier(user.identifier || "");
        setRole(user.role || "");
      } catch (err) {
        setError((err as Error).message);
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      const response = await fetch(`${API_URL}users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({ fullname, identifier, role }),
      });

      if (!response.ok) throw new Error("Failed to update user");
      toast.success("User updated successfully!");
      //setSaveSuccess(true);
    } catch (err) {
      setError((err as Error).message);
      toast.error("Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <ToastContainer />

      <div className="mb-6">
        <Link
          href="/users"
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
        >
          <FiArrowLeftCircle className="-ml-1 mr-2 h-6 w-6" /> All Users
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <span className="text-red-500">×</span>
          </button>
        </div>
      )}

      {saveSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Success:</strong>
          <span className="block sm:inline"> User updated successfully!</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setSaveSuccess(false)}
          >
            <span className="text-green-500">×</span>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900">Full Name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900">Email</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
            required
          >
            <option value="">Select Role</option>
            {ROLES.map((r) => (
              <option key={r} value={r.toLowerCase()}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            type="submit"
            disabled={saving}
            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
