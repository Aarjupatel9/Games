import React, { useState } from 'react'
import GameBoard from './GameBoard'
import Player from './Player'


export default function Main() {


    const [players, setPlayers] = useState([{ name: "player 1", isActive: true, color: "bg-blue-500", placedPlayer: 0, retirePlayer: 0 }, { name: "player 2", isActive: false, color: "bg-yellow-300", placedPlayer: 0, retirePlayer: 0 }])


    return (
        <div className='w-full h-full '>
            <div className='flex flex-col justify-around content-around px-10'>
                <div>
                    <GameBoard players={players} setPlayers={setPlayers} />
                </div>
                <div className='flex justify-around content-around px-10'>
                    <Player user1={players[0]} user2={players[1]} possition={"left"} />
                    <Player user1={players[1]} user2={players[0]} possition={"right"} />
                </div>
            </div>
        </div>
    )
}