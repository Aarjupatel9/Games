import React, { useEffect, useState } from "react";


const pattern = [
    [1 * 100, 0],
    [(4 / 6) * 100, 0],
    [(2 / 6) * 100, 0],
    [(2 / 6) * 100, 1],
    [(2 / 6) * 100, 0],
    [(4 / 6) * 100, 0],
    [1 * 100, 0]
];


const initialState = [
    [0, 0, 0, false, 0, false], [0, 3, 0, false, 1, false], [0, 6, 0, false, 2, false],
    [1, 1, 0, false, 3, false], [1, 3, 0, false, 4, false], [1, 5, 0, false, 5, false],
    [2, 2, 0, false, 6, false], [2, 3, 0, false, 7, false], [2, 4, 0, false, 8, false],
    [3, 0, 0, false, 9, false], [3, 1, 0, false, 10, false], [3, 2, 0, false, 11, false],
    [3, 4, 0, false, 12, false], [3, 5, 0, false, 13, false], [3, 6, 0, false, 14, false],
    [4, 2, 0, false, 15, false], [4, 3, 0, false, 16, false], [4, 4, 0, false, 17, false],
    [5, 1, 0, false, 18, false], [5, 3, 0, false, 19, false], [5, 5, 0, false, 20, false],
    [6, 0, 0, false, 21, false], [6, 3, 0, false, 22, false], [6, 6, 0, false, 23, false]
];
//0-row, 1-col, 2-player-decide, 3-track-for-player-to-move-when-select-points, 4-index, 5-highlite-for-player-remove


const edges = [[1, 9], [0, 2, 4], [1, 14], [4, 10], [1, 3, 5, 7], [4, 13], [7, 11], [4, 6, 8], [7, 12], [0, 10, 21], [3, 9, 11, 18], [6, 10, 15], [8, 13, 17], [5, 12, 14, 20], [2, 13, 23], [11, 16], [15, 17, 19], [12, 16], [10, 19], [16, 18, 20, 22], [13, 19], [9, 22], [19, 21, 23], [14, 22]]


const GameBoard = ({ players, setPlayers }) => {


    const [playerState, setPlayerState] = useState(initialState);
    const [gamePhase, setGamePhase] = useState("initialize");
    const [isAdvantage, setIsAdvantage] = useState(false);
    const [lastMove, setLastMove] = useState(-1);
    const [isPlayerTouchedForMove, setIsPlayerTouchedForMove] = useState(false);


    useEffect(() => {
        if (players[0].placedPlayer === 9 && players[1].placedPlayer === 9) {
            setGamePhase("start");
        }
        if (players[0].retirePlayer === 9 || players[1].retirePlayer === 9) {
            setGamePhase("end");
        }


    }, [players])


    useEffect(() => {
        if (isAdvantage) {
            if (gamePhase === "initialize") {
            }
            populatePosiblePlayerRemove(false)
            setSecondPlayerTurn();
        }
        console.log("in use Effect : ", isAdvantage)
    }, [isAdvantage])



    const getHorizontalRow = (configuration, rowIndex) => {
        var margin = '';
        if (rowIndex === 3) {
            margin = ((4 * 100) / 6) + "%";
            return <div
                key={`h1x-${rowIndex}`}
            >
                <div
                    key={`h1-${rowIndex}`}
                    className="absolute left-0 h-px bg-black"
                    style={{ top: `${(rowIndex * 100) / 6}%`, width: `${(configuration[0])}%`, marginLeft: "0px" }}
                />
                <div
                    key={`h2-${rowIndex}-1`}
                    className="absolute left-0 h-px bg-black"
                    style={{ top: `${(rowIndex * 100) / 6}%`, width: `${(configuration[0])}%`, marginLeft: margin }}
                />
            </div>
        }


        if (rowIndex < 3) {
            margin = ((rowIndex * 100) / 6) + "%";
        } else {
            margin = (((6 - rowIndex) * 100) / 6) + "%";
        }


        return <div
            key={`h-${rowIndex}`}
            className="absolute left-0 h-px bg-black"
            style={{ top: `${(rowIndex * 100) / 6}%`, width: `${(configuration[0])}%`, marginLeft: margin }}
        />
    };


    const getVerticalRow = (configuration, rowIndex) => {
        var margin = '';
        if (rowIndex === 3) {
            margin = ((4 * 100) / 6) + "%";
            return <div
                key={`v1x-${rowIndex}`}
            >
                <div
                    key={`v1-${rowIndex}`}
                    className="absolute top-0 w-px bg-black"
                    style={{ left: `${(rowIndex * 100) / 6}%`, height: `${(configuration[0])}%`, marginTop: "0px" }}
                />
                <div
                    key={`v2-${rowIndex}-1`}
                    className="absolute top-0 w-px bg-black"
                    style={{ left: `${(rowIndex * 100) / 6}%`, height: `${(configuration[0])}%`, marginTop: margin }}
                />
            </div>
        }


        if (rowIndex < 3) {
            margin = ((rowIndex * 100) / 6) + "%";
        } else {
            margin = (((6 - rowIndex) * 100) / 6) + "%";
        }


        return <div
            key={`v-${rowIndex}`}
            className="absolute top-0 w-px bg-black"
            style={{ left: `${(rowIndex * 100) / 6}%`, height: `${(configuration[0])}%`, marginTop: margin }}
        />
    };


    // New function to render circles at intersections
    const getCirclesAtIntersections = () => {
        return playerState.map((data, index) => {
            var color = '';
            switch (data[2]) {
                case 0: {
                    color = "bg-slate-300";
                    break;
                }
                case 1:
                case 2: {
                    color = players[data[2] - 1].color;
                    break;
                }
                case 3: {
                    color = "bg-green-800";
                    break;
                }
                case 4: {
                    color = "bg-red-600";
                    break;
                }
                default: {
                    color = "bg-black";
                }
            }

            if (data[5] && data[2] !== 0) {
                color = "bg-red-600";
            }

            return (
                <div
                    key={`circle-${data[0]}-${data[1]}-${index}`}
                    className={`absolute rounded-full cursor-pointer ${color} 
                                transition-all duration-500 ease-in-out`} // Transition on all properties
                    style={{
                        width: "20px",
                        height: "20px",
                        top: `${(data[0] * 100) / 6}%`,
                        left: `${(data[1] * 100) / 6}%`,
                        transform: "translate(-50%, -50%)"
                    }}
                    onClick={() => { handlePlayerClick(data, index) }}
                ></div>
            );
        });
    };




    const populatePosibleMoves = (data, index) => {
        //[0, 0, 0]
        if (data[2] === 0 || data[2] === 3) {
            return; //returning for empty
        }
        if (data[3]) {
            clearPosibleMoves();
            return;
        }
        // console.log("populatePosibleMoves called : " + data, index);
        var points_to_highlight = edges[index].filter((p) => {
            return playerState[p][2] === 0;
        })


        setPlayerState((old) => {
            old = structuredClone(old);
            for (var i = 0; i < points_to_highlight.length; i++) {
                old[points_to_highlight[i]][2] = 3;
            }
            old[index][3] = true;
            return old;
        })
    }
    const clearPosibleMoves = () => {
        setIsPlayerTouchedForMove(false);
        setPlayerState((old) => {
            old = old.map((p) => {
                if (p[2] === 3) {
                    p[2] = 0;
                }
                p[3] = false;
                return p;
            })
            return old;
        })
    }

    const populatePosiblePlayerRemove = (isRevert) => {
        var activePlayer = players[0].isActive ? 1 : 2; // 1 for player1, 2 for player2
        // console.log("populatePosiblePlayerRemove : ", isRevert, activePlayer);
        if (isRevert) {
            setPlayerState((old) => {
                return old.map((o) => {
                    o[5] = false;
                    return o;
                });
            })
            return;
        }
        // Function to find if a player is part of a triplet
        const findAllTriplets = (playerState) => {
            let triplets = [];


            // Find row triplets
            for (let row = 0; row <= 6; row++) {
                const rowElements = playerState.filter((c) => c[0] === row && c[2] === activePlayer); // Get all elements in the same row for active player
                for (let i = 0; i <= rowElements.length - 3; i += 3) {
                    if (rowElements[i][2] === rowElements[i + 1][2] && rowElements[i][2] === rowElements[i + 2][2]) {
                        triplets.push(rowElements[i], rowElements[i + 1], rowElements[i + 2]);
                    }
                }
            }


            // Find column triplets
            for (let col = 0; col <= 6; col++) {
                const colElements = playerState.filter((c) => c[1] === col && c[2] === activePlayer); // Get all elements in the same column for active player
                for (let i = 0; i <= colElements.length - 3; i += 3) {
                    if (colElements[i][2] === colElements[i + 1][2] && colElements[i][2] === colElements[i + 2][2]) {
                        triplets.push(colElements[i], colElements[i + 1], colElements[i + 2]);
                    }
                }
            }


            return triplets;
        };


        // Get all triplets for the active player
        const tripletPlayers = findAllTriplets(playerState);


        // Get players not part of any triplet
        const playersToRemove = playerState.filter((child) => {
            return child[2] === activePlayer && !tripletPlayers.includes(child);
        });


        // console.log("Players that can be removed: ", playersToRemove, tripletPlayers);


        setPlayerState((old) => {
            old = structuredClone(old);
            playersToRemove.forEach((p) => {
                old[p[4]][5] = true;
            })
            return old;
        })


    }

    const removeSpecificPlayer = (index) => {
        setPlayerState((old) => {
            old = structuredClone(old);
            old[index][2] = 0;
            return old;
        })


        setPlayers((old) => {
            old = structuredClone(old);
            for (var i = 0; i < old.length; i++) {
                if (!old[i].isActive) {
                    old[i].retirePlayer += 1;
                }
            };
            return old;
        })
        setIsAdvantage(false);
        populatePosiblePlayerRemove(true)
        setSecondPlayerTurn();
    }
    const handlePlayerChange = (data, index) => {
        var playerIndexToMove = playerState.findIndex((p) => p[3]); // Find the active player to move
        setPlayerState((prevState) => {
            const newState = [...prevState];
            newState[playerIndexToMove][2] = 0; // Clear old position
            if (players[0].isActive) {
                newState[index][2] = 1; // Set new position
            } else {
                newState[index][2] = 2; // Set new position
            }
            return newState;
        });
        clearPosibleMoves();
        setSecondPlayerTurn();
    };


    const setSecondPlayerTurn = () => {
        setPlayers((old) => {
            old = structuredClone(old);
            old[0].isActive = !old[0].isActive;
            old[1].isActive = !old[1].isActive;
            return old;
        })
    }


    const handlePlayerClick = (data, index) => {
        if (gamePhase == "end") {
            return;
        }

        if (isAdvantage) {
            // console.log("handlePlayerClick index : ", index, data, gamePhase)
            if (data[5] === true) {
                setLastMove(index);
                removeSpecificPlayer(index);
                return;
            }
            return;
        }

        if (isPlayerTouchedForMove && data[2] !== 3) {
            return;
        }


        if (gamePhase === "initialize") {
            if (data[2] > 0) return;


            setLastMove(index);


            setPlayerState((old) => {
                var activePlayer = players[0].isActive ? 1 : 2;
                old = structuredClone(old);
                old[index][2] = activePlayer;
                return old;
            })
            setPlayers((old) => {
                var activePlayer = players[0].isActive ? 0 : 1;
                old = structuredClone(old);
                old[activePlayer].placedPlayer += 1;
                return old;
            })
            setSecondPlayerTurn();
        } else if (gamePhase === "start") {

            if (data[2] === 3) {
                setLastMove(index);
                handlePlayerChange(data, index)
            } else if ((data[2] === 1 || data[2] === 2) && players[data[2] - 1].isActive) {
                populatePosibleMoves(data, index)
                setIsPlayerTouchedForMove(true);
            }
        }
    }


    useEffect(() => {
        var isAdvantage = checkPlayerAdvantage();
        setIsAdvantage(isAdvantage);
        console.log("isAdvantage : ", isAdvantage);
    }, [playerState]);


    useEffect(() => {
        // console.log("players : ", players);
    }, [players])


    const checkPlayerAdvantage = () => {
        for (let row = 0; row <= 6; row++) {
            const rowElements = playerState.filter((child) => child[0] === row); // Get all elements in the same row
            for (let i = 0; i <= rowElements.length - 3; i += 3) {
                // console.log("colElements : ",i,rowElements);
                if (rowElements[i][2] !== 0 && rowElements[i][2] === rowElements[i + 1][2] && rowElements[i][2] === rowElements[i + 2][2]) {
                    if ([rowElements[i][4], rowElements[i + 1][4], rowElements[i + 2][4]].includes(lastMove)) { return true; }
                }
            }
        }
        for (let col = 0; col <= 6; col++) {
            const colElements = playerState.filter((child) => child[1] === col); // Get all elements in the same column
            for (let i = 0; i <= colElements.length - 3; i += 3) {
                // console.log("colElements : ",i,colElements);
                if (colElements[i][2] !== 0 && colElements[i][2] === colElements[i + 1][2] && colElements[i][2] === colElements[i + 2][2]) {
                    if ([colElements[i][4], colElements[i + 1][4], colElements[i + 2][4]].includes(lastMove)) { return true; }


                }
            }
        }
        return false;
    }



    useEffect(() => {
        // console.log("playerState changed : ", playerState);
    }, [playerState]);


    return (
        <div className=" max-h-[600px] max-w-[600px] min-h-[500px] min-w-[500px] mx-auto py-10">
            {/* Grid container with relative positioning */}
            <div className="relative max-h-[500px] max-w-[500px] min-h-[500px] mx-auto ">
                {/* Horizontal lines */}
                {pattern.map((conf, rowIndex) => getHorizontalRow(conf, rowIndex))}


                {/* Vertical lines */}
                {pattern.map((conf, rowIndex) => getVerticalRow(conf, rowIndex))}


                {/* Circles at intersections */}
                {getCirclesAtIntersections()}
                {gamePhase == "end" && <div
                    key={`win-div-container`}
                    className={`absolute rounded cursor-pointer font-bold text-xl bg-green-300 flex flex-col justify-around items-center`}
                    style={{
                        width: "200px",
                        height: "200px",
                        top: `50%`,
                        left: `50%`,
                        transform: "translate(-50%, -50%)"
                    }}


                >
                    <div>{players[0].retirePlayer > players[1].retirePlayer ? "Player 2" : "Player 1"} Won </div><div>
                        <div className="px-2 py-1 bg-green-600 rounded" onClick={() => { }}>Restart the Game</div>
                    </div>
                </div>}
            </div>
        </div>
    );
};


export default GameBoard;