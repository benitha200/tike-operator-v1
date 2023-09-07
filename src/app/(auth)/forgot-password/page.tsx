import Image from "next/image";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <>
      <div className="mx-auto md:h-screen flex flex-col justify-center items-center px-6 pt-8 pt:mt-0">
        <div className="flex justify-center items-center mb-8 lg:mb-10">
          <Image
            src="/img/logo.svg"
            className="h-10 mr-4"
            width={100}
            height={100}
            alt="Tike Logo"
          />
        </div>

        <div className="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
          <div className="p-6 sm:p-8 lg:p-16 space-y-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Forgot Password
            </h2>
            <form className="mt-8 space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-mantis-600 focus:border-mantis-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <button
                type="button"
                className="text-white bg-mantis-600 hover:bg-mantis-700 focus:ring-4 focus:ring-mantis-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center"
              >
                Send reset link
              </button>
              <div className="text-sm font-medium text-gray-500">
                Go back to{" "}
                <Link href={"/login"} className="text-teal-500 hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
