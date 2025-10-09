import React, { useState } from "react";

export default function App() {
  const [leads, setLeads] = useState(0);
  const [salesCalls, setSalesCalls] = useState(0);
  const [clientsClosed, setClientsClosed] = useState(0);
  const [amount, setAmount] = useState(0);
  const [dealType, setDealType] = useState("Monthly");
  const [results, setResults] = useState({
    leadbefore: 0,
    leadsAfter: 0,
    callBookRateBefore: 0,
    callBookRateAfter: 0,
    closeRateBefore: 0,
    closeRateAfter: 0,
    avgRevenueBefore: 0,
    avgRevenueAfter: 0,
    estimatedAdditionalRevenue: 0,
  });

  const handleCalculate = () => {
    const leadbefore = leads;
    const callBookRateBefore = leadbefore > 0 ? (salesCalls / leads) * 100 : 0;
    const closeRateBefore =
      salesCalls > 0 ? (clientsClosed / salesCalls) * 100 : 0;
    const avgRevenueBefore = clientsClosed * amount;

    const leadsAfter = leadbefore * 1.2;
    const callBookRateAfter = Math.min(callBookRateBefore * 1.5);
    const closeRateAfter = Math.min(closeRateBefore * 1.25);
    const avgRevenueAfter =
      leadsAfter *
      (callBookRateAfter / 100) *
      (closeRateAfter / 100) *
      amount;

    const estimatedAdditionalRevenue = avgRevenueAfter - avgRevenueBefore;

    setResults({
      leadbefore,
      leadsAfter,
      callBookRateBefore,
      callBookRateAfter,
      closeRateBefore,
      closeRateAfter,
      avgRevenueBefore,
      avgRevenueAfter,
      estimatedAdditionalRevenue,
    });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-6">
      <div className="flex flex-col md:flex-row lg:flex-row gap-6 max-w-6xl w-full rounded-xl p-6 bg-black">
        {/* Left Form */}
        <div className="bg-[#202020] text-white rounded-xl shadow-lg p-6 md:w-1/2 w-full border border-white">
          <h2 className="text-3xl font-bold mb-4">Current Performance</h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1">Total Leads (per month) *</label>
              <input
                type="number"
                value={leads}
                onChange={(e) => setLeads(+e.target.value)}
                className="w-full p-2 rounded bg-white text-black"
              />
            </div>

            <div>
              <label className="block mb-1">Avg Deal Size*</label>
              <select
                value={dealType}
                onChange={(e) => setDealType(e.target.value)}
                className="w-full p-2 rounded bg-white text-black"
              >
                <option>Monthly</option>
                <option>One Off</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
                className="w-full p-2 rounded bg-white text-black"
              />
            </div>

            <div>
              <label className="block mb-1">Total Sales Calls (per month)</label>
              <input
                type="number"
                value={salesCalls}
                onChange={(e) => setSalesCalls(+e.target.value)}
                className="w-full p-2 rounded bg-white text-black"
              />
            </div>

            <div>
              <label className="block mb-1">Clients Closed (per)</label>
              <input
                type="number"
                value={clientsClosed}
                onChange={(e) => setClientsClosed(+e.target.value)}
                className="w-full p-2 rounded bg-white text-black"
              />
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-[#C6E957] text-black font-semibold py-4 mt-4 rounded-lg hover:bg-[#7D9827] transition"
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Right Results */}
        <div className="bg-[#C6E957] rounded-xl shadow-lg p-6 text-black md:w-1/2 w-full">
          <div className="grid grid-cols-2 text-center font-semibold mb-2">
            <h3 className="text-3xl font-bold my-2">Before</h3>
            <h3 className="text-3xl font-bold my-2">After</h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="mt-[20px]">
              <p>Total Leads</p>
              <p className="text-2xl font-bold">{results.leadbefore.toFixed(0)}</p>
            </div>
            <div className="mt-[20px]">
              <p>Total Leads</p>
              <p className="text-2xl font-bold">{results.leadsAfter.toFixed(0)}</p>
            </div>

            <div className="mt-[30px]">
              <p>Call Book Rate</p>
              <p className="text-2xl font-bold">{results.callBookRateBefore.toFixed(0)}%</p>
            </div>
            <div className="mt-[30px]">
              <p>Call Book Rate</p>
              <p className="text-2xl font-bold">{results.callBookRateAfter.toFixed(0)}%</p>
            </div>

            <div className="mt-[30px]">
              <p>Close Rate</p>
              <p className="text-2xl font-bold">{results.closeRateBefore.toFixed(0)}%</p>
            </div>
            <div className="mt-[30px]">
              <p>Close Rate</p>
              <p className="text-2xl font-bold">{results.closeRateAfter.toFixed(0)}%</p>
            </div>

            <div className="mt-[30px]">
              <p>Avg New Revenue</p>
              <p className="text-2xl font-bold">${results.avgRevenueBefore.toFixed(0)}</p>
            </div>
            <div className="mt-[30px]">
              <p>Avg New Revenue</p>
              <p className="text-2xl font-bold">${results.avgRevenueAfter.toFixed(0)}</p>
            </div>
          </div>

          <div className="text-center mt-10 font-bold text-lg">
            <p>Estimated Additional Revenue per month</p>
            <p className="text-4xl font-bold mt-2">
              ${results.estimatedAdditionalRevenue.toFixed(0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}