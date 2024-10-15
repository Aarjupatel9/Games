import React, { useState } from 'react'
import GameBoard from './GameBoard'
import Player from './Player'

const initialState = [
    [0, 0, 0, false], [0, 3, 1, false], [0, 6, 1, false],
    [1, 1, 0, false], [1, 3, 1, false], [1, 5, 1, false],
    [2, 2, 0, false], [2, 3, 1, false], [2, 4, 1, false],
    [3, 0, 0, false], [3, 1, 1, false], [3, 2, 1, false],
    [3, 4, 0, false], [3, 5, 1, false], [3, 6, 1, false],
    [4, 2, 0, false], [4, 3, 1, false], [4, 4, 1, false],
    [5, 1, 0, false], [5, 3, 1, false], [5, 5, 1, false],
    [6, 0, 0, false], [6, 3, 1, false], [6, 6, 1, false]
];


export default function MainPage() {

    const [players, setPlayers] = useState([{ name: "player 1", isActive: true , color:"bg-blue-500", placedPlayer:0, retirePlayer:0}, { name: "player 2", isActive: false, color:"bg-yellow-300",placedPlayer:0, retirePlayer:0 }])

    return (
        <div className='MainPage w-full h-full '>
            <div className='flex flex-col justify-around content-around px-10'>
                <div>
                    <GameBoard players={players} setPlayers={setPlayers}/>
                </div>
                <div className='flex justify-around content-around px-10'>
                    <Player player={players[0]} />
                    <Player player={players[1]} />
                </div>
            </div>
        </div>
    )
}
