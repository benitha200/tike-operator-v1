import { FiCheck } from "react-icons/fi";

export default function ViewTrip() {
  const departure = [
    "Bweyeye",
    "Shyorongi",
    "Karumuna",
    "Rulindo",
    "Nyagatare",
    "Butare",
    "Kirehe",
    "Musanze",
    "Nyanza",
    "Nyabugogo",
  ];
  const arrival = [
    "Nyabugogo",
    "Nyanza",
    "Musanze",
    "Kirehe",
    "Butare",
    "Nyagatare",
    "Rulindo",
    "Karumuna",
    "Shyorongi",
    "Bweyeye",
  ];
  return (
    <>
      <form method="get">
        <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            Edit Trip: {`Bweyeye > Nyabugogo`}
          </h2>
          <button
            type="button"
            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center"
          >
            <FiCheck className="-ml-1 mr-2 h-6 w-6" />
            Save Changes
          </button>
        </div>
        <div className="flex flex-col p-6">
          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Car
              </label>
              <select
                id="country"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option>Mercedez Benz</option>
                <option>IHOWO</option>
                <option>Toyota</option>
              </select>
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Driver
              </label>
              <select
                id="country"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option>Keza Majyambere</option>
                <option>Kaze Munyakazi</option>
                <option>Majyambere Keza</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Departure Location
              </label>
              <select
                id="country"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                {departure.map((location) => (
                  <option>{location}</option>
                ))}
              </select>
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Arrival Location
              </label>
              <select
                id="country"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                {arrival.map((location) => (
                  <option>{location}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Departure Time
              </label>
              <input
                type="time"
                id="address"
                placeholder="Nyabugogo"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Arrival Time
              </label>
              <input
                type="time"
                id="address"
                placeholder="Nyabugogo"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <div className="mb-6 w-full">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price (in RWF)
              </label>
              <input
                type="number"
                id="address"
                placeholder="10,0000"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6 w-full">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Recurring Time
              </label>
              <select
                id="country"
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option>One Time</option>
                <option>Once a week</option>
                <option>Twice a week</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
