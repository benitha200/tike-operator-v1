"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/constants/Constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";

const formSchema = z.object({
  identifier: z.string().min(6, {
    message: "Email must be at least 6 characters.",
  }),
});

export default function ForgotPassword() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
    },
  });

  const handleForgotPassword = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    await axios
      .post(`${API_URL}/forget-password`, {
        identifier: values.identifier,
      })
      .then((res: any) => {
        setLoading(false);
        push("/login");
      })
      .catch((error) => {
        const {
          data: { metaData },
        } = error.response;
        setLoading(false);
        setError(metaData.message);
        setTimeout(() => setError(null), 5000);
      });
  };

  return (
    <>
      <div className="mx-auto md:h-screen flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
        <div className="flex justify-center items-center mb-8 lg:mb-10">
          <Image
            src="/logo.svg"
            className="h-10 mr-4"
            width={100}
            height={100}
            alt="Tike Logo"
          />
        </div>

        <div className="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
          <div className="p-6 sm:p-8 lg:p-16 space-y-8">
            {error != null ? (
              <div className="w-full rounded-md bg-red-400 p-2 text-white">
                <p>{error}</p>
              </div>
            ) : (
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Forgot your password?
              </h2>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleForgotPassword)}
                className="mt-8 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@email.com"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">
                  {loading ? `Resetting Password...` : `Reset Password`}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
