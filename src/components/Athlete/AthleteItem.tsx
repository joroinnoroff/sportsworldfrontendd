import { useContext } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";
import { FinanceContext } from "../../contexts/FinanceContext";

const AthleteItem = ({ athlete }: { athlete: IAthlete }) => {
const { deleteAthelete, putPurchasedTrue } = useContext(AthleteContext) as IAthleteContext;

    const financeContext = useContext(FinanceContext);
    if (!financeContext) return null;

    const { finance, updateFinance } = financeContext;

    const handleDelete = async () => {
        if (athlete.id != null) await deleteAthelete(athlete.id);
    };

    const handlePurchase = async () => {
        if (!finance || athlete.id == null) return;

        if (athlete.price > finance.moneyLeft) {
            alert("You don't have enough money!");
            return;
        }

        const newFinance = {
            ...finance,
            moneyLeft: finance.moneyLeft - athlete.price,
            numberOfPurchases: finance.numberOfPurchases + 1,
            moneySpent: finance.moneySpent + athlete.price,
        };

        await updateFinance(newFinance);

        const updatedAthlete: IAthlete = {
            ...athlete,
            purchaseStatus: true,
        };

        await putPurchasedTrue(updatedAthlete);
    };

    return (
        <div className="p-4 max-w-sm ">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium">{athlete.name}</h2>

                {athlete.purchaseStatus && (
                    <span className="text-xs font-semibold">
                        Purchased
                    </span>
                )}
            </div>

            {/* DETAILS */}
            <div className="text-sm mb-3">
                <p>ID: {athlete.id}</p>
                <p>Gender: {athlete.gender}</p>
                <p>Price: {athlete.price} kr</p>
            </div>

            {/* IMAGE — SAME SIZE FOR ALL */}
            <img
                className="w-full h-[400px] lg:h-[500px] object-cover"
                src={`http://localhost:5279/images/athlete/${athlete.image}`}
                alt={athlete.name}
            />

            {/* ACTIONS */}
            <div className="mt-4 flex flex-col gap-2">

                <button
                    disabled={athlete.purchaseStatus}
                    onClick={handlePurchase}
                    className={`w-full py-2 border transition
                        ${athlete.purchaseStatus
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:opacity-70"
                        }`}
                >
                    {athlete.purchaseStatus ? "Already Purchased" : "Purchase Athlete"}
                </button>

                <button
                    className="w-full py-2 border hover:opacity-70 transition"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default AthleteItem;
