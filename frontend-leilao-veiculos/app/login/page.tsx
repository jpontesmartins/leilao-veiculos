"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState(false);

    const router = useRouter();

    const handleLogin = async () => {

        try {
            const res = await fetch(`http://localhost:9090/auth/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
            });

            if (!res.ok) {
                setErro(true);
                throw new Error("Erro ao fazer login!");

            }

            const retorno = await res.json();
            const userSession = localStorage.setItem("leilao.token", retorno.accessToken);

            router.push("/leilao")

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div>
                <h2 className="font-bold">Fazer Login</h2>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Email"
                />

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="border border-slate-500 px-8 py-2 mx-2"
                    type="text"
                    placeholder="Senha"
                />

                <button onClick={handleLogin} className="bg-slate-700 p-2 mx-2"> Entrar </button>
            </div>
            {erro ? <div>Tente novamente!</div> : <></>}
        </>
    );
}

// const gdvUserSession = localStorage.getItem("gdv.user.session");
