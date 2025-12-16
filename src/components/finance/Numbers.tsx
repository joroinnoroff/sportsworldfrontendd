import React, { useContext, useState, useRef } from "react";
import { FinanceContext } from "../../contexts/FinanceContext";
import type { IFinanceContext } from "../../interfaces/IFinanceContext";

const Numbers = () => {
  const [showInput, setShowInput] = useState(false);
  const amountRef = useRef<HTMLInputElement>(null);

  const financeContext = useContext(FinanceContext) as IFinanceContext;

  if (!financeContext) return <p>Loading finance...</p>;

  const { finance, updateFinance } = financeContext;

  const handleAddMoney = async () => {
    if (!amountRef.current) return;

    const amountToAdd = parseFloat(amountRef.current.value);
    if (isNaN(amountToAdd) || amountToAdd <= 0) {
      alert("Enter a valid positive number");
      return;
    }

    const updatedFinance = finance
      ? { ...finance, moneyLeft: finance.moneyLeft + amountToAdd }
      : { id: 0, moneyLeft: amountToAdd, numberOfPurchases: 0, moneySpent: 0 };

    await updateFinance(updatedFinance);
    setShowInput(false);
    amountRef.current.value = "";
  };

  return (
    <div>

      {finance ? (
        <table className="table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Money Left</th>
              <th className="border border-gray-300 px-4 py-2">Number of Purchases</th>
              <th className="border border-gray-300 px-4 py-2">Money Spent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">{finance.moneyLeft} kr</td>
              <td className="border border-gray-300 px-4 py-2">{finance.numberOfPurchases}</td>
              <td className="border border-gray-300 px-4 py-2">{finance.moneySpent} kr</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No finance data yet. Add money to start.</p>
      )}

      <div className="loan mt-4">
        {!showInput && (
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={() => setShowInput(true)}
          >
            Get Money
          </button>
        )}

        {showInput && (
          <div className="mt-2 flex items-center gap-2">
            <input
              ref={amountRef}
              type="number"
              placeholder="Enter amount"
              className="border px-2 py-1 rounded"
            />
            <button
              className="px-3 py-1 bg-green-600 text-white rounded"
              onClick={handleAddMoney}
            >
              Add
            </button>
            <button
              className="px-3 py-1 bg-gray-400 text-white rounded"
              onClick={() => setShowInput(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Numbers;
