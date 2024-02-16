"use client"

import { useEffect } from "react";
import AddAuction from "../components/AddAuction";
import AuctionsList from "../components/AuctionsList";
import { useRouter } from "next/navigation";
import { AuctionsContext, AuctionsContextProvider } from "../components/Context";

export default function Leilao() {

    const router = useRouter();

    useEffect(() => {
        const userSession = localStorage.getItem("leilao.token");
        if (!userSession) {
            router.push("/");
        }

    }, []);

    return (
        <>
            <AuctionsContextProvider>
                <AuctionsList />
                <AddAuction />
            </AuctionsContextProvider>
        </>
    );
}
