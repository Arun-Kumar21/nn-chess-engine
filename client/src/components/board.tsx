import { useState } from "react";
import { fenToBoard, boardToFen } from "../utils/parser";
import { pieceImageMap } from "../utils/piece-image-map";

interface BoardProps {
    darkSquaresColor?: string;
    whiteSquaresColor?: string;
}

const stateFen = "3q4/8/8/1p6/5K2/8/8/8";

export default function Board ({darkSquaresColor = 'bg-[#b58863]', whiteSquaresColor = 'bg-[#f0d9b5]'} : BoardProps) {

    const [boardState, setBoardState] = useState(fenToBoard(stateFen));

    function movePiece(from:any, to:any, piece:any) {
        setBoardState((prev:any) => {
            const newBoard = prev.map((row:any) => [...row]);
            newBoard[from[0]][from[1]] = ".";
            newBoard[to[0]][to[1]] = piece;
            return newBoard;
        });
    }

    const renderSquares = () => {
        const board = [];

        for (let r = 0; r < 8; r++) {
            const rowSquares = [];
            for (let c = 0; c < 8; c++) {
                const isBlack = (r + c) % 2 === 1;
                const piece = boardState[r][c];
                rowSquares.push(
                    <div
                        key={`row-${r}-col-${c}`}
                        onDragOver={(e) => e.preventDefault()} 
                        onDrop={(e) => {
                            const data = JSON.parse(e.dataTransfer.getData("piece"));
                            movePiece(data.from, [r, c], data.piece);
                        }}
                        className={`${isBlack ? darkSquaresColor : whiteSquaresColor} w-[70px] h-[70px] flex items-center justify-center`}
                    >
                        {piece !== "." && (
                            <img
                                src={pieceImageMap[piece]}
                                alt={piece}
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData("piece", JSON.stringify({ piece, from: [r, c] }));
                                    e.dataTransfer.effectAllowed = "move";
                                    // Create a drag image
                                    const img = new Image();
                                    img.src = pieceImageMap[piece];
                                    e.dataTransfer.setDragImage(img, 30, 30);
                                }}
                                className="w-[60px] h-[60px] select-none cursor-grab active:cursor-grabbing"
                            />
                        )}
                    </div>
                );
            }
            board.push(<div key={`row-${r}`} className="flex">{rowSquares}</div>);
        }

        return board;
    }
    
    return (
        <div className="flex flex-col">
            {renderSquares()}
        </div>
    )
}