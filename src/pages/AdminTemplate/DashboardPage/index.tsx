import { Card } from "flowbite-react";

import {
  HiUserGroup,
  HiHome,
  HiShoppingBag,
  HiCurrencyDollar,
} from "react-icons/hi";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-black text-center">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {/* Cards */}
        <Card className="shadow-lg bg-pink-500 text-white border-none hover:bg-pink-600 transition-all">
          <div className="flex items-center gap-4">
            <HiUserGroup className="text-white text-4xl" />
            <div>
              <p className="opacity-90">Total Users</p>
              <p className="text-2xl font-bold">1,245</p>
            </div>
          </div>
        </Card>

        <Card className="shadow-lg bg-pink-500 text-white border-none hover:bg-pink-600 transition-all">
          <div className="flex items-center gap-4">
            <HiHome className="text-white text-4xl" />
            <div>
              <p className="opacity-90">Total Rooms</p>
              <p className="text-2xl font-bold">320</p>
            </div>
          </div>
        </Card>

        <Card className="shadow-lg bg-pink-500 text-white border-none hover:bg-pink-600 transition-all">
          <div className="flex items-center gap-4">
            <HiShoppingBag className="text-white text-4xl" />
            <div>
              <p className="opacity-90">Bookings</p>
              <p className="text-2xl font-bold">8,923</p>
            </div>
          </div>
        </Card>

        <Card className="shadow-lg bg-pink-500 text-white border-none hover:bg-pink-600 transition-all">
          <div className="flex items-center gap-4">
            <HiCurrencyDollar className="text-white text-4xl" />
            <div>
              <p className="opacity-90">Revenue</p>
              <p className="text-2xl font-bold">$98,200</p>
            </div>
          </div>
        </Card>
      </div>

      {/* TABLE */}
      <Card className="shadow-lg border border-pink-400 bg-white p-0 rounded-xl max-w-4xl mx-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-pink-600 text-center mb-6">
            Recent Bookings
          </h2>

          <div className="w-full flex justify-center">
            <table className="w-full md:w-3/4 lg:w-2/3 text-sm rounded-lg overflow-hidden shadow-md">
              <thead className="bg-pink-100 text-pink-700">
                <tr>
                  <th className="px-4 py-3 font-semibold text-left">User</th>
                  <th className="px-4 py-3 font-semibold text-left">Room</th>
                  <th className="px-4 py-3 font-semibold text-left">Date</th>
                  <th className="px-4 py-3 font-semibold text-left">Price</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                <tr className="border-t bg-white hover:bg-pink-50 transition-all">
                  <td className="px-4 py-3">John Doe</td>
                  <td className="px-4 py-3">Sea View Villa</td>
                  <td className="px-4 py-3">2025-02-01</td>
                  <td className="px-4 py-3 font-semibold">$120</td>
                </tr>

                <tr className="border-t bg-gray-50 hover:bg-pink-50 transition-all">
                  <td className="px-4 py-3">Sara Smith</td>
                  <td className="px-4 py-3">Mountain House</td>
                  <td className="px-4 py-3">2025-02-03</td>
                  <td className="px-4 py-3 font-semibold">$80</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
