"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAuction() {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState(1900);
    const [startingBid, setStartingBid] = useState(0);
    const [initialDate, setInitialDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const router = useRouter();

    const handleClick = async () => {

        try {
            const res = await fetch(`http://localhost:9090/auctions`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ brand, model, year, startingBid, initialDate, endDate }),
            });

            if (!res.ok) {
                throw new Error("Erro ao cadastrar um veículo para leilão");
            }

            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col gap-3, my-2">
            <input
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Marca"
            />

            <input
                onChange={(e) => setModel(e.target.value)}
                value={model}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Modelo"
            />

            <input
                onChange={(e) => setYear(Number(e.target.value))}
                value={year}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Ano"
            />

            <input
                onChange={(e) => setStartingBid(Number(e.target.value))}
                value={startingBid === 0 ? undefined : startingBid}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Lance inicial"
            />

            <input
                onChange={(e) => setInitialDate(e.target.value)}
                value={initialDate}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Data inicio"
            />

            <input
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Data fim"
            />

            <button onClick={handleClick} className="bg-green-600 font-bold text-white py-3 px-6 w-fit my-2">
                Leiloar!
            </button>
        </div>
    );
}