import Image from "next/image";
import emptyImage from "../../public/empty.png";
import OImage from "../../public/O.png";
import XImage from "../../public/X.png";



export default function GameTile(props: any){


    const markTile = () => {
        if(props.playerTurn == "X"){
            props.setPlayerTurn("O");
            props.tileMarkList[props.tileIndex] = "X"
        } else {
            props.setPlayerTurn("X");
            props.tileMarkList[props.tileIndex] = "O"
        }
    }

    const tileClicked = (e: any) => {
        if(props.tileMarkList[props.tileIndex] == "none" && props.winner == "none"){
            markTile()
            props.setWinner(props.checkForWinState());
        }
    }

    return(
        <button onClick={tileClicked} className="bg-blue-200 dark:bg-slate-800 rounded p-4 cursor-pointer">
            <Image 
            src={
                props.tileMarkList[props.tileIndex] == "none" ?
                    emptyImage : 
                    (props.tileMarkList[props.tileIndex] == "X" ?
                        XImage : OImage)}
            width="50" height="50" alt="" />
        </button>
    )
}