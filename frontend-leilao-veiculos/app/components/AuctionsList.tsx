"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { BasicModal } from "./BasicModal";

export default function AuctionsList() {
    const [auctions, setAuctions] = useState([]);
    const [auctionId, setAuctionId] = useState("");
    const [userId, setUserId] = useState("a");
    const [newAmount, setNewAmount] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    const toggleModal = () => {
      setShowModal(!showModal);
    }

    useEffect(()=> {

      const getAuctions: any = async () => {
        try {
          const res = await fetch("http://localhost:9090/auctions", {
            cache: "no-store",
          });
      
          if (!res.ok) {
            throw new Error("Falha ao carregar veículos");
          }

          setAuctions(await res.json());
        } catch (error) {
          console.log("Erro ao carregar veículos: ", error);
        }
      };
      
      setAuctions(getAuctions());

    },[])

    const prepareBid = async (newBidAmount: any, auction: any) => {
      setNewAmount(newBidAmount);
      setAuctionId(auction.id);
      setUserId("65c4be355a38c87234663719"); //da sessao, o usuario logado (beltrano)
    }
    
    const handleClick = async (auction: any) => {
      console.log(auction);

      const isValidAmount = newAmount > auction.startingBid && newAmount > auction.actualBid;
      if (!isValidAmount) {
        console.log("Não é possivel!");
        toggleModal();
        return;
      }
  
      try {
        const res = await fetch(`http://localhost:9090/bids`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ amount: newAmount, userId: userId, auctionId: auctionId }),
        });
  
        if (!res.ok) {
          console.log(res);
          toggleModal();
          throw new Error("Erro ao dar o lance");
        }
  
        // router.refresh();
        // router.push("/");
      } catch (error) {
        console.log(error);
      }
    };
    
    return (
        <>
          {!showModal && auctions && auctions.length > 0 && auctions.map((auction: any) => (
            <div
              key={auction.id}
              className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
            >
              <div>
                <h2 className="font-bold text-2xl">{auction.brand}</h2>
                <div>{auction.model}</div>
                <div>{auction.year}</div>
              </div>

              <div>
                <div>mín. R$ {auction.actualBid}</div>
                <h2 className="font-bold text-2xl">atual: R$ {auction.startingBid}</h2>
              </div>
              
              
              <div className="flex gap-2">
             
                <input
                    onChange={(e) => prepareBid(Number(e.target.value), auction)}
                    value={newAmount}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Valor do lance"
                />
                <button onClick={() => handleClick(auction)} className="font-bold bg-slate-200	p-2">Dar lance!</button>
              </div>
            </div>
          ))}

          {showModal ? <BasicModal toggleModal={toggleModal} /> :<></> }
        </>
      );
}