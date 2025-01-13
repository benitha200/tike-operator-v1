"use client"

import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { Bus, CreditCard, MapPin, Users } from 'lucide-react';
import { API_URL } from '@/constants/Constants';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface Location {
  id: string;
  name: string;
}

interface Operator {
  id: string;
  name: string;
}

interface Car {
  id: string;
  number_of_seats: number;
}

interface Trip {
  id: string;
  departure_location: Location;
  arrival_location: Location;
  operator: Operator;
  departure_time: string;
  arrival_time: string;
  price: number;
  car: Car;
  total_seats?: number;
}

interface Traveler {
  id: string;
  fullname: string;
  phone_number: string;
}

interface Booking {
  id: string;
  traveler?: Traveler;
  trip?: Trip;
  seat_number: string;
  payment_status: 'PAID' | 'PENDING' | 'FAILED';
  price: number;
  createdAt: string;
}

interface Payment {
  id: string;
  bookingId: string;
  amount: string;
  status: 'PAID' | 'PENDING' | 'FAILED';
}

interface ChartDataPoint {
  date: string;
  bookings: number;
}

// Utility functions remain the same
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'RWF'
  }).format(value);
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatTime = (timeString: string | undefined): string => {
  if (!timeString) return '';
  if (timeString.includes(':')) {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  }
  return timeString;
};

const Dashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = Cookies.get("token");
        const currentUser = Cookies.get("currentUser");

        if (!token || !currentUser) {
          router.push('/login');
          return false;
        }

        setIsAuthenticated(true);
        return true;
      } catch (error) {
        router.push('/login');
        return false;
      }
    };

    const fetchDashboardData = async () => {
      try {
        const endpoints = [
          'bookings',
          'payments',
          'travelers',
          'trips',
          'drivers',
          'cars',
          'locations'
        ];

        const responses = await Promise.all(
          endpoints.map(endpoint =>
            fetch(`${API_URL}${endpoint}`, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            }).then(async res => {
              if (res.status === 401) {
                throw new Error('Unauthorized');
              }
              return res.json();
            })
          )
        );

        const [
          bookingsData,
          paymentsData,
          travelersData,
          tripsData,
          driversData,
          carsData,
          locationsData
        ] = responses;

        setBookings(bookingsData.payload || []);
        setPayments(paymentsData.payload || []);
        setTravelers(travelersData.payload || []);
        setTrips(tripsData.payload || []);
        setDrivers(driversData.payload || []);
        setCars(carsData.payload || []);
        setLocations(locationsData.payload || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        if (error instanceof Error && error.message === 'Unauthorized') {
          setIsAuthenticated(false);
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    const initializeDashboard = async () => {
      const authStatus = await checkAuth();
      if (authStatus) {
        await fetchDashboardData();
      }
    };

    initializeDashboard();
  }, [router]);

  // Don't render anything until authentication is confirmed
  if (!isAuthenticated || isLoading) {
    return null;
  }

  // Calculate metrics and prepare data (rest of the code remains the same)
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const totalRevenue = payments
    .filter(payment => payment.status === 'PAID')
    .reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

  const successRate = payments.length > 0
    ? (payments.filter(payment => payment.status === 'PAID').length / payments.length) * 100
    : 0;

  const chartData: ChartDataPoint[] = Object.entries(
    bookings.reduce<Record<string, number>>((acc, booking) => {
      const date = formatDate(booking.createdAt);
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {})
  ).map(([date, count]) => ({
    date,
    bookings: count
  }));

  // [StatsCard component definition remains the same...]
  interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ReactNode;
    iconBgColor: string;
    iconColor: string;
  }

  const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    subtitle,
    icon,
    iconBgColor,
    iconColor
  }) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className={`${iconBgColor} p-3 rounded-full`}>
          {React.cloneElement(icon as React.ReactElement, {
            className: `w-6 h-6 ${iconColor}`
          })}
        </div>
      </div>
    </div>
  );


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          subtitle={`${successRate.toFixed(1)}% success rate`}
          icon={<CreditCard />}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Active Trips"
          value={trips.length}
          subtitle={`${locations.length} locations`}
          icon={<MapPin />}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Available Buses"
          value={cars.length}
          subtitle={`${cars.reduce((sum, car) => sum + car.number_of_seats, 0)} total seats`}
          icon={<Bus />}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Total Travelers"
          value={travelers.length}
          subtitle={`${bookings.length} bookings`}
          icon={<Users />}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Booking Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bookings" stroke="#4F46E5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Active Routes</h3>
          <div className="space-y-4">
            {trips.map(trip => (
              <div key={trip.id} className="flex items-center justify-between p-4 bg-gray-50 rounded">
                <div>
                  <p className="font-semibold">
                    {trip.departure_location?.name} → {trip.arrival_location?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {trip.operator?.name} | {formatTime(trip.departure_time)} - {formatTime(trip.arrival_time)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(trip.price)}</p>
                  <p className="text-sm text-gray-500">{trip.total_seats || trip.car.number_of_seats} seats</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Traveler</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">

              {recentBookings.map(booking => {
                const trip = trips.find(t => t.id === booking.trip?.id);
                const routeDisplay = trip && trip.departure_location && trip.arrival_location
                  ? `${trip.departure_location.name} → ${trip.arrival_location.name}`
                  : 'N/A';

                return (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.traveler?.fullname || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.traveler?.phone_number || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {routeDisplay}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.seat_number || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.payment_status === 'PAID'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }`}>
                        {booking.payment_status || 'PENDING'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(booking.price)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;