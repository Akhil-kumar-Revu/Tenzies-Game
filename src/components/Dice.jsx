import '../style/DiceStyle.css'

export default function Dice(props){

    const styles={
        backgroundColor : props.isHeld ? "#59E391" : "white"
    }

    return(
        <>
            <button 
                onClick={props.heldChange} 
                style={styles}
                aria-pressed={props.isHeld}
                aria-label={`Die with value ${props.value}, 
                            ${props.isHeld ? "held" : "not held"}`}
            >
                {props.value}
            </button>
        </>
    )
}