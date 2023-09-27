import { Link } from "react-router-dom"
import Button from "../uI/Button"
import { useTranslation } from "react-i18next"
export default function NotLogged(){
    const {t} = useTranslation()
    return(
        <>
            <div className="myTend py-20 relative flex w-full h-full overflow-hidden justify-evenly items-center">
                    <div className="myTextBox myBox myShadow bg-gradient-to-r from-[#14496c] from-40% via-[#14496cb3] via-90% to-[#14496cb3] pt-5 pb-12 m-3 relative flex flex-col justify-center items-center w-1/4">
                        <h2 className="mb-5 font-bold text-2xl bg-gradient-to-r from-[#00BECC] from-40% via-90%  via-[#b094d3] to-[#b499d4] text-transparent bg-clip-text">Registrati ora!</h2>
                        <Link to={'/sign-in'}><Button label={t("common.register")}/></Link>
                    </div>                
                    <div className="myTextBox myBox myShadow bg-gradient-to-r from-[#14496c] from-40% via-[#14496cb3] via-90% to-[#14496cb3] pt-5 pb-12 m-3 relative flex flex-col justify-center items-center w-1/4"> 
                        <h2 className="mb-5 font-bold text-2xl bg-gradient-to-r from-[#00BECC] from-40% via-90%  via-[#b094d3] to-[#b499d4] text-transparent bg-clip-text">Già registrato?</h2>
                        <Link to={'/login'}><Button label={t("common.login")}/></Link>
                    </div>     
                    <div className="myTend myTendL absolute w-1/2 left-0 h-full flex justify-center items-center bg-gradient-to-r from-[#14496c] from-80% via-[#14496cb3] via-98% to-[#14496cb3]">
                        <h3 className="text-center font-semibold font-title hidden md:block text-4xl px-5 bg-gradient-to-r from-[#00BECC] from-40% via-90%  via-[#b094d3] to-[#b499d4] text-transparent  bg-clip-text ">Non perdere l&apos;occasione di essere connesso ad altri utenti, unisciti ora alla community e resta aggiornato e scambia impressioni sui tuoi giochi preferiti e gli ultimi arrivi con gli altri utenti che condividono le tue passioni!</h3>
                    </div>
                    <div className="myTend myTendR absolute w-1/2 right-0 h-full  bg-gradient-to-r from-[#14496c] from-80% via-[#14496cb3] via-90% to-[#14496cb3]">
                    </div>
            </div>
            
        </>
    )
}