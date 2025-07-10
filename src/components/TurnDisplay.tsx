import Image from "next/image";
import OImage from "../../public/O.png";
import XImage from "../../public/X.png";


export default function TurnDisplay(props: any){

    return(
        <div  className="font-[family-name:var(--font-geist-mono)]">
            Player <Image className="inline pb-1" src={props.playerTurn == "X" ? XImage : OImage} width="15" height="15" alt="" />'s Turn.
        </div>
    )
}