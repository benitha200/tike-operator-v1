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
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";

const formSchema = z.object({
  token: z.string().min(6, {
    message: "Token must be at least 6 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function ResetPassword({ query }: any) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<string | any>(null);
  const { push } = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      let arrIdentifier = searchParams.get("identifier")?.split(" ") || [];
      let newIdentifier = arrIdentifier.join("+");
      setIdentifier(newIdentifier);
    }
  }, []);
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
      password: "",
    },
  });

  const handleResetPassword = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    await axios
      .post(`${API_URL}/reset-password`, {
        identifier,
        token: values.token,
        password: values.password,
      })
      .then((res: any) => {
        const { token, user } = res.data.payload;
        const currentUser = JSON.stringify(user);

        Cookies.set("token", token);
        Cookies.set("currentUser", currentUser);
        setLoading(false);
        push("/");
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
                Reset account password
              </h2>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleResetPassword)}
                className="mt-8 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="* * * * * *"
                          disabled={true}
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
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="* * * * * *"
                          disabled={true}
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
