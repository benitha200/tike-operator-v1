
"use client"
import { useState } from 'react';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import * as z from 'zod';
import { FiCheck } from "react-icons/fi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const formSchema = z.object({
  fullname: z.string().min(2, { message: 'Fullname must be at least 2 characters.' }),
  gender: z.string().min(2, { message: 'Gender must be at least 2 characters.' }),
  phone_number: z.string().min(10, { message: 'Phone number must be at least 10 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  nationality: z.string().min(2, { message: 'Nationality must be at least 2 characters.' }),
  address: z.string().min(2, { message: 'Address must be at least 2 characters.' }),
  emergency_contact_name: z.string().min(2, { message: 'Emergency contact name must be at least 2 characters.' }),
  emergency_contact_details: z.string().min(10, { message: 'Emergency contact details must be at least 10 characters.' }),
});

export default function NewCar() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const router = useRouter(); // Use useRouter inside the component

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      gender: 'Male',
      phone_number: '',
      email: '',
      nationality: 'Rwanda',
      address: '',
      emergency_contact_name: '',
      emergency_contact_details: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);

    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Cookies.get('token')}`);
      myHeaders.append('Content-Type', 'application/json');

      console.log(Cookies.get('token'));
      const idempotencyKey = uuidv4();
      console.log(idempotencyKey);

      const requestBody = {
        ...values,
        idempotency_key: idempotencyKey,
      };
      console.log(requestBody);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:JSON.stringify(requestBody),
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}drivers/`, requestOptions);

      if (!response.ok) {
        throw new Error(`Failed to submit the form: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
      toast.success("Driver added successfully!");

      // Optionally, you can reset the form after a successful submission
      // reset(); // Assuming you have the reset function from react-hook-form
    } catch (error) {
      console.error(error);
      setError('An error occurred while submitting the form.');
      toast.error("An error occurred while registering drivers");
    } finally {
      setLoading(false);
    }
  };

  return(
    <>
          <Form {...form}>
            
            <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-8 space-y-6">
            <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
              <h2 className="text-xl font-semibold">Create New Driver</h2>
              <button
                type="submit"
                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
              >
                <FiCheck className="-ml-1 mr-2 h-6 w-6" />
                Save
              </button>
            </div>
            <div className="flex flex-row w-full justify-between gap-3 p-2">
                <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Keza Majyambere"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <select
                        disabled={loading}
                        {...field}
                        className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>

          <div className="flex flex-row w-full justify-between gap-3 p-2">
             <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="+250 780 000 000"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="email@domain.com"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>

          <div className="flex flex-row w-full justify-between gap-3 p-2">
            <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <select
                        disabled={loading}
                        {...field}
                        className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="Rwanda">Rwanda</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Congo">Congo</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Residential Address</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="KG 608 St, Remera"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
              
             

              
              
          {/* <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="phone_number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                placeholder="+250 780 000 000"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@domain.com"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="mb-6 w-full pr-2">
              <label
                htmlFor="nationality"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nationality
              </label>
              <select
                id="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option>Rwanda</option>
                <option>Uganda</option>
                <option>Burundi</option>
                <option>Tanzania</option>
                <option>Kenya</option>
                <option>Congo</option>
              </select>
            </div>
            <div className="mb-6 w-full pl-2">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Residential Address
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="KG 608 St, Remera"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div> */}
          {/* <div className="flex justify-between items-center">
            <div className="mb-6 w-full pr-2">
              <label
                htmlFor="emergency_contact_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Emergency Contact Name
              </label>
              <input
                type="text"
                id="emergency_contact_name"
                value={formData.emergency_contact_name}
                onChange={handleInputChange}
                placeholder="Kaze Munyakazi"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6 w-full pl-2">
              <label
                htmlFor="emergency_contact_details"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Emergency Contact Details
              </label>
              <input
                type="text"
                id="emergency_contact_details"
                placeholder="+250 780 000 000"
                value={formData.emergency_contact_details}
                onChange={handleInputChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div> */}
          <div className="flex flex-row w-full justify-between gap-3 p-2">
            <FormField
            control={form.control}
            name="emergency_contact_name"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Emergency Contact Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    
                    placeholder="Kaze Munyakazi"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergency_contact_details"
            render={({ field }) => (
              <FormItem  className='w-full'>
                <FormLabel>Emergency Contact Details</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="+250 780 000 000"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          
          </form>
          </Form>
          <ToastContainer />
        {/* </div>
      </form> */}
    </>
  );
}


