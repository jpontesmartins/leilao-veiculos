"use client";

import React, { useEffect, useState } from 'react';
import { BasicModal } from "./BasicModal";
import { useAuctionsContext } from "./Context";

export default function AuctionsList() {
  const { auctions, setAuctions, successMsg, setSuccessMsg } = useAuctionsContext();
  const [auctionId, setAuctionId] = useState("");
  const [newAmount, setNewAmount] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [leilaoToken, setLeilaoToken] = useState("");

  const toggleModal = () => {
    setShowModal(!showModal);
  }

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

  useEffect(() => {
    const leilaoToken = localStorage.getItem("leilao.token");
    setLeilaoToken(leilaoToken || "");
    setAuctions(getAuctions());
  }, [])

  const prepareBid = async (newBidAmount: any, auction: any) => {
    setNewAmount(newBidAmount);
    setAuctionId(auction.id);
  }

  const handleClick_newBid = async (auction: any) => {
    const isValidAmount = newAmount > auction.startingBid && newAmount > auction.actualBid;
    if (!isValidAmount) {
      setErrorMsg("O lance dado deve ser maior que o atual!");
      toggleModal();

      return;
    }

    try {

      const res = await fetch(`http://localhost:9090/bids`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${leilaoToken}`
        },
        body: JSON.stringify({ amount: newAmount, auctionId: auctionId }),
      });
      setAuctions(getAuctions());

      if (!res.ok) {
        console.log(res);
        toggleModal();
        throw new Error("Erro ao dar o lance");
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {successMsg ? <div className="p-4 border border-slate-300 mt-2 text-green-400 font-bold">{successMsg}</div> : <></>}
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
            <div>mín. R$ {auction.startingBid}</div>
            <h2 className="font-bold text-2xl">atual: R$ {auction.actualBid}</h2>
          </div>


          <div className="flex gap-2">

            <input
              onChange={(e) => prepareBid(Number(e.target.value), auction)}
              className="border border-slate-500 px-8 py-2"
              type="text"
              placeholder="Valor do lance"
            />
            <button onClick={() => handleClick_newBid(auction)} className="font-bold bg-slate-200	p-2">Dar lance!</button>
          </div>
        </div>
      ))}

      {showModal ? <BasicModal toggleModal={toggleModal} message={errorMsg} /> : <></>}
    </>
  );
}