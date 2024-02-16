
export function BasicModal({ toggleModal, message }: any) {
    return (
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <h1 className="text-red-400 font-bold">Erro!</h1>
            {message ? <h1 className="text-red-400 font-bold">{message}</h1> : <> </>  }
            <button className="font-bold bg-gray-200 p-2" onClick={() => toggleModal()}>Ok</button>
        </div>
    )
}