import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import '../style/MainStyle.css'
import Dice from './Dice'
import ReactConfetti from 'react-confetti'

export default function Main(){
    const [buttonObj,setButtonObj]=useState(generateValues());    
    const gameWon=buttonObj.every(butt => butt.isHeld) && buttonObj.every(butt => butt.value===buttonObj[0].value)

    function generateValues(){
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }
    
    function rollDice() {
        setButtonObj(prev=>
            prev.map(ob=>
                ob.isHeld ? ob : {...ob , value : Math.ceil(Math.random() * 6)} 
            )
        )   
    }

    function heldChange(id){
        setButtonObj(prevButtonObj=> 
            prevButtonObj.map(ob => 
                ob.id===id ? {...ob , isHeld : !ob.isHeld} :ob
            )
        )
    }

    const buttons = buttonObj.map((ob)=>(
        <Dice 
            value={ob.value} 
            key={ob.id} 
            isHeld={ob.isHeld} 
            heldChange={()=>heldChange(ob.id,ob.value)}
        />
    ))


    return(
        <main className="main">
            { gameWon && <ReactConfetti/> }
           <div className="container">
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className='button-container'>
                    {buttons}
                </div>
                <button onClick={rollDice}  className='roll-button'>{gameWon ? "New Game" : "Roll"}</button>
           </div>
        </main>
    )
}