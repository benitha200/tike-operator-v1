"use client";
import ReactECharts from "echarts-for-react";
import { Avatar, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { BiTrip } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaBusAlt } from "react-icons/fa";

export default function Home() {
  const [chartOptions, setChartOptions] = useState<any>([]);

  useEffect(() => {
    setChartOptions({
      grid: { top: 8, right: 8, bottom: 24, left: 36 },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
        },
      ],
      tooltip: {
        trigger: "axis",
      },
    });
  }, []);

  return (
    <div className="my-auto p-5">
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  2,340
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  New trips this week
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                <BiTrip className="w-10 h-10" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  5,355
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  Travelers this week
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                <BsPeopleFill className="w-10 h-10" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                  385
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  Buses recorded
                </h3>
              </div>
              <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                <FaBusAlt className="w-10 h-10" />
              </div>
            </div>
          </Card>
        </div>
        <Card className="2xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">$45,385</h3>
              <span className="text-base font-normal text-gray-500">
                Sales this week
              </span>
            </div>
            <div className="flex-shrink-0">
              <span className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                12.5%
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <ReactECharts
              option={chartOptions}
              lazyUpdate={true}
              onChartReady={() => console.log("Chart Ready!")}
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
        <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900">
              Latest Travelers
            </h3>
            <a
              href="#"
              className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
            >
              View all
            </a>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Avatar
                      alt="User Image"
                      img="/img/placeholder.png"
                      rounded={true}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Neil Sims
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    $320
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Avatar
                      alt="User Image"
                      img="/img/placeholder.png"
                      rounded={true}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Bonnie Green
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    $3467
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Avatar
                      alt="User Image"
                      img="/img/placeholder.png"
                      rounded={true}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Michael Gough
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    $67
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Avatar
                      alt="User Image"
                      img="/img/placeholder.png"
                      rounded={true}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Thomes Lean
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    $2367
                  </div>
                </div>
              </li>
              <li className="pt-3 sm:pt-4 pb-0">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Avatar
                      alt="User Image"
                      img="/img/placeholder.png"
                      rounded={true}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Lana Byrd
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      email@windster.com
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    $367
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Latest Trips
              </h3>
              <span className="text-base font-normal text-gray-500">
                This is a list of latest trips
              </span>
            </div>
            <div className="flex-shrink-0">
              <a
                href="#"
                className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
              >
                View all
              </a>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="overflow-x-auto rounded-lg">
              <div className="align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Trip
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date & Time
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                          Payment from{" "}
                          <span className="font-semibold">Bonnie Green</span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          Apr 23 ,2021
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          $2300
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                          Payment refund to{" "}
                          <span className="font-semibold">#00910</span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          Apr 23 ,2021
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          -$670
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                          Payment failed from{" "}
                          <span className="font-semibold">#087651</span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          Apr 18 ,2021
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          $234
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                          Payment from{" "}
                          <span className="font-semibold">Lana Byrd</span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          Apr 15 ,2021
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          $5000
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                          Payment from{" "}
                          <span className="font-semibold">Jese Leos</span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          Apr 15 ,2021
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          $2300
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                          Payment from{" "}
                          <span className="font-semibold">THEMESBERG LLC</span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          Apr 11 ,2021
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          $560
                        </td>
                      </tr>

                      <tr>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                          Payment from{" "}
                          <span className="font-semibold">Lana Lysle</span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          Apr 6 ,2021
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          $1437
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
