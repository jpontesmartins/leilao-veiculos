"use client"

import { useEffect } from "react";
import AddAuction from "../components/AddAuction";
import AuctionsList from "../components/AuctionsList";
import { useRouter } from "next/navigation";

export default function Leilao() {
    
    const router = useRouter();

    useEffect(() => {
        const userSession = localStorage.getItem("leilao.token");
        if (!userSession) {
            router.push("/");
            console.log(`userSession: ${userSession}`);
        }

    }, []);

    return (
        <>
            <AuctionsList />
            <div className="flex justify-between items-center bg-slate-700 px-8 py-3 ">
                <span className="text-white font-bold">Cadastre um veículo!</span>
            </div>
            <AddAuction />
        </>
    );
}
