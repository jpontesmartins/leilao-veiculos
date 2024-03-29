"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuctionsContext } from "./Context";

export default function AddAuction() {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState(1900);
    const [startingBid, setStartingBid] = useState(0);
    const [initialDate, setInitialDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const { setAuctions, setSuccessMsg } = useAuctionsContext();


    const router = useRouter();

    const getAuctions: any = async () => {
        try {
            const res = await fetch("http://localhost:9090/auctions", {
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("Falha ao carregar veículos");
            }

            setAuctions(await res.json());
            setSuccessMsg("Registro adicionado!");

        } catch (error) {
            console.log("Erro ao carregar veículos: ", error);
        }
    };

    const handleClick = async () => {

        try {
            const res = await fetch(`http://localhost:9090/auctions`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("leilao.token")}`
                },
                body: JSON.stringify({ brand, model, year, startingBid, initialDate, endDate }),
            });
            await getAuctions();

            if (!res.ok) {
                throw new Error("Erro ao cadastrar um veículo para leilão");
            }

            router.push("/leilao")
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className="flex flex-col gap-3, my-2">
            <div className="flex justify-between items-center bg-slate-700 px-8 py-3 ">
                <span className="text-white font-bold">Cadastre um veículo!</span>
            </div>
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