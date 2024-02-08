
export function BasicModal({ toggleModal }: any) {
    return (
        <div>
            <h1 className="text-red-400 font-bold">Erro, tente novamente!</h1>
            <button className="font-bold bg-gray-200 p-2" onClick={() => toggleModal()}>Ok</button>
        </div>
    )
}