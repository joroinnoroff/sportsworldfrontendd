import { useContext } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";
import { FinanceContext } from "../../contexts/FinanceContext";

const AthleteItem = ({ athlete }: { athlete: IAthlete }) => {
    const { deleteAthelete, putPurchasedTrue, } = useContext(AthleteContext) as IAthleteContext;

    const financeContext = useContext(FinanceContext);
    if (!financeContext) return null;

    const { finance, updateFinance } = financeContext;
    // sletter athlete i db med bruk av id og context
    const handleDelete = async () => {
        if (athlete.id != null) await deleteAthelete(athlete.id);
    };
    //handle purchase 
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

    //extra funksjon - selge tilbake figther - setter boolean false og får penger tilbake
    const handleSellFighter = async () => {
        if (!finance || athlete.id == null) return; // om ingen finance eller athlete id vil den ikke kjøre
        const newFinance = {
            ...finance,
            moneyLeft: finance.moneyLeft + athlete.price,
            numberOfPurchases: finance.numberOfPurchases + 0, // gjør ingenting med antall kjøp
            moneySpent: finance.moneySpent - athlete.price //trekker tilbake penger brukt mot athlete price
        };

        await updateFinance(newFinance);

        const updatedAthlete: IAthlete = {
            ...athlete,
            purchaseStatus: false
        };
        //gjenbruker samme men sender med status false
        await putPurchasedTrue(updatedAthlete)
        //scroll til toppen så man vet det er utført 
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }




    return (
        <div className="p-4 my-12 max-w-sm ">
            {/* HEADER på card*/}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium">{athlete.name}</h2>

                {athlete.purchaseStatus && (
                    <span className="text-xs font-semibold bg-green-200 rounded-full px-4 py-2">
                        Purchased
                    </span>
                )}



            </div>

            {/* DETAILS */}
            <div className="text-sm mb-3">
                <p className="font-thin">ID: {athlete.id}</p>
                <p className="font-thin">Gender: {athlete.gender}</p>
                <p>Price: {athlete.price} kr</p>
            </div>


            <div className="relative h-[400px] lg:h-[500px]">
                <img
                    className="w-full h-full object-contain"
                    src={`http://localhost:5279/images/athlete/${athlete.image}`}
                    alt={athlete.name}
                />
            </div>

            {/* ACTIONS */}
            <div className="mt-4 flex flex-col gap-2">

                {/**Vises kun om kjøpstatus er false */}
                {athlete.purchaseStatus ? (
                    null
                ) : <>
                    <button
                        disabled={athlete.purchaseStatus}
                        onClick={handlePurchase}
                        className={`w-full py-2 border transition 
                        ${athlete.purchaseStatus
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:opacity-70 cursor-pointer"
                            }`}
                    >
                        {athlete.purchaseStatus ? "Already Purchased" : "Purchase Athlete"}
                    </button>

                </>}

                <button
                    className="w-full py-2 border hover:opacity-70 transition hover:bg-red-500 cursor-pointer"
                    onClick={handleDelete}
                >
                    Delete
                </button>

                {athlete.purchaseStatus && (
                    <button
                        className="w-full py-2 border hover:opacity-70 transition cursor-pointer hover:bg-green-200 hover:border-none"
                        onClick={handleSellFighter}
                    >
                        Sell Athlete
                    </button>
                )}
            </div>
        </div>
    );
};

export default AthleteItem;
