import { createContext, useContext, useState } from "react"


interface IAuctionsContextState {
    auctions: any[]
    setAuctions: (value: any[]) => void
    successMsg: string
    setSuccessMsg: (value: string) => void


}

export const AuctionsContext = createContext<IAuctionsContextState>({} as IAuctionsContextState)

export function useAuctionsContext(): IAuctionsContextState {
    const context = useContext(AuctionsContext)
    return context
}

export function AuctionsContextProvider({ children }: any) {
    const [auctions, setAuctions] = useState([] as any[]);
    const [successMsg, setSuccessMsg] = useState("");

    return (
        <AuctionsContext.Provider value={{
            auctions, setAuctions,
            successMsg, setSuccessMsg
        }}>
            {children}
        </AuctionsContext.Provider>
    )

}