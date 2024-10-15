import React from 'react'
import { UserIcon } from './assets/svgs';

export default function Player(props) {
    const { name, isActive, color } = props.player;
    return (
        <div className='Player content-center justify-center flex flex-col'>
            <div className={`rounded shadow-cyan-500/50 ${isActive ? "shadow-xl animate-bounce" : "shadow-sm"}`}>
                <div className={color}>
                    <UserIcon color={color} />
                </div>
            </div>
            {name}
        </div>
    )
}
