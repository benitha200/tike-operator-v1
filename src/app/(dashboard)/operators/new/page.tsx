// "use client";
// import { useState } from "react";
// import Cookies from "js-cookie";
// import { v4 as uuidv4 } from "uuid";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import * as z from "zod";
// import { FiCheck } from "react-icons/fi";
// import { Toast } from "flowbite-react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// const formSchema = z.object({
//   name: z.string().min(2, { message: "Name must be at least 2 characters." }),
//   representative_name: z
//     .string()
//     .min(2, { message: "Representative name must be at least 2 characters." }),
//   representative_phone: z
//     .string()
//     .min(10, { message: "Phone number must be at least 10 characters." }),
//   support_phone: z
//     .string()
//     .min(10, { message: "Support phone must be at least 10 characters." }),
//   login_email: z
//     .string()
//     .min(10, { message: "Login email must be at least 10 characters." }),
//   password: z
//     .string()
//     .min(10, { message: "Password must be at least 6 characters." }),
// });

// export default function NewOperator() {
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
//   const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       representative_name: "",
//       representative_phone: "",
//       support_phone: "",
//       login_email: "",
//       password: "",
//     },
//   });

//   const handleSubmit = async (values: z.infer<typeof formSchema>) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${Cookies.get("token")}`);
//       myHeaders.append("Content-Type", "application/json");

//       const idempotencyKey = uuidv4();

//       const requestBody = {
//         ...values,
//         idempotency_key: idempotencyKey,
//       };

//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: JSON.stringify(requestBody),
//       };

//       const response = await fetch(
//         "https://api.tike.rw/operators/",
//         requestOptions
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to submit the form: ${response.statusText}`);
//       }

//       const result = await response.json();
//       console.log(result);

//       // Show success toast
//       setShowSuccessToast(true);

//       // Optionally, you can reset the form after a successful submission
//       // form.reset(); // Uncomment this line if you want to reset the form after submission
//     } catch (error) {
//       console.error(error);
//       setError("An error occurred while submitting the form.");
//       setShowErrorToast(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {showSuccessToast && (
//         <Toast onClose={() => setShowSuccessToast(false)}>
//           <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
//             <FiCheck className="h-5 w-5" />
//           </div>
//           <div className="ml-3 text-sm font-normal">
//             Form submitted successfully!
//           </div>
//           <Toast.Toggle />
//         </Toast>
//       )}
//       {showErrorToast && (
//         <Toast onClose={() => setShowErrorToast(false)}>
//           <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
//             <FiCheck className="h-5 w-5" />
//           </div>
//           <div className="ml-3 text-sm font-normal">
//             An error occurred while submitting the form.
//           </div>
//           <Toast.Toggle />
//         </Toast>
//       )}
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(handleSubmit)}
//           className="mt-8 space-y-6"
//         >
//           <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
//             <h2 className="text-xl font-semibold">Create New Operator</h2>
//             <button
//               type="submit"
//               className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
//             >
//               <FiCheck className="-ml-1 mr-2 h-6 w-6" />
//               Save
//             </button>
//           </div>
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     placeholder="Operator Name"
//                     disabled={loading}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="representative_name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Representative Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     placeholder="Representative Name"
//                     disabled={loading}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="representative_phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Representative Phone</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     placeholder="Representative Phone"
//                     disabled={loading}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="support_phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Support Phone</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     placeholder="Support Phone"
//                     disabled={loading}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="login_email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Login Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     placeholder="Login Email"
//                     disabled={loading}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="password"
//                     placeholder="Password"
//                     disabled={loading}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {error && <p className="text-red-500">{error}</p>}
//         </form>
//       </Form>
//     </>
//   );
// }


"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FiCheck } from "react-icons/fi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomToast } from "@/components/layouts/CustomToast"; // Adjust the import path as needed

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  representative_name: z
    .string()
    .min(2, { message: "Representative name must be at least 2 characters." }),
  representative_phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters." }),
  support_phone: z
    .string()
    .min(10, { message: "Support phone must be at least 10 characters." }),
  login_email: z
    .string()
    .min(10, { message: "Login email must be at least 10 characters." })
    .email({ message: "Invalid email format." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters." }),
});

const MAX_RETRIES = 5; // Set a reasonable retry limit
const RETRY_INTERVAL_MS = 5000; // Set the interval between retries (5 seconds)

async function submitToOperators(values: z.infer<typeof formSchema>) {
  const idempotencyKey = uuidv4();
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${Cookies.get("token")}`);
  myHeaders.append("Content-Type", "application/json");

  const requestBody = {
    ...values,
    idempotency_key: idempotencyKey,
  };

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
  };

  const response = await fetch("https://api.tike.rw/operators/", requestOptions);

  if (!response.ok) {
    throw new Error(`Failed to submit to operators API: ${response.statusText}`);
  }

  return await response.json();
}

// Function to handle API submission to register with retry mechanism
async function submitToRegister(values: z.infer<typeof formSchema>, retries = 0): Promise<any> {
  const idempotencyKey = uuidv4();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Cookie",
    "csrftoken=m4Li2tWC0w0QKzBHV7e8tal2rnYqh6nj; sessionid=aj0roiep3kgvgqq504r3sv6qqhzsrum1"
  );

  const requestBody = {
    idempotency_key: idempotencyKey,
    fullname: values.name,
    identifier: values.login_email,
    password: values.password,
    role: "operator",
  };

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch("https://api.tike.rw/register/", requestOptions);
    if (!response.ok) {
      const result = await response.json();
      if (
        result.metaData.statusCode === 500 &&
        result.metaData.message.some((msg: string) => msg.includes("Duplicate entry"))
      ) {
        if (retries < MAX_RETRIES) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL_MS));
          return await submitToRegister(values, retries + 1);
        } else {
          throw new Error("Max retries reached for submitToRegister.");
        }
      } else {
        throw new Error(`Failed to submit to register API: ${result.metaData.message.join(", ")}`);
      }
    }
    return await response.text();
  } catch (error) {
    throw error;
  }
}

export default function NewOperator() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      representative_name: "",
      representative_phone: "",
      support_phone: "",
      login_email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);

    try {
      // Submit data to operators API
      await submitToOperators(values);
      // Submit data to register API
      await submitToRegister(values);

      setShowSuccessToast(true);
      form.reset(); // Reset form after submission
    } catch (error) {
      console.error(error);
      setError("An error occurred while submitting the form. ");
      setShowErrorToast(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {showSuccessToast && (
        <CustomToast
          message="Operator registered successfully!"
          type="success"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
      {showErrorToast && (
        <CustomToast
          message={error || "An error occurred while submitting the form."}
          type="error"
          onClose={() => setShowErrorToast(false)}
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-8 space-y-6 p-5"
        >
          <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
            <h2 className="text-xl font-semibold">Create New Operator</h2>
            <button
              type="submit"
              className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
            >
              <FiCheck className="-ml-1 mr-2 h-6 w-6" />
              Save
            </button>
          </div>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Operator Name"
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
            name="representative_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Representative Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Representative Name"
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
            name="representative_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Representative Phone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Representative Phone"
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
            name="support_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Support Phone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Support Phone"
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
            name="login_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Login Email"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </Form>
    </>
  );
}

