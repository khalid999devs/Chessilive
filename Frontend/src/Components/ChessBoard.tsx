import { Color, PieceSymbol, Square } from 'chess.js';
import { useState } from 'react';
import { MOVE } from '../Pages/Game';

const ChessBoard = ({
  board,
  socket,
  setBoard,
  chess,
  playerRole,
}: {
  board: ({ square: Square; type: PieceSymbol; color: Color } | null)[][];
  socket: WebSocket;
  setBoard: any;
  chess: any;
  playerRole: 'white' | 'black';
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [to, setTo] = useState<null | Square>(null);
  const [possibleMoves, setPossibleMoves] = useState<Square[]>([]);

  return (
    <div className='text-white-200 mx-auto'>
      {board.map((row, i) => {
        return (
          <div key={i} className='flex'>
            {row.map((square, j) => {
              const squareRepresentation = (String.fromCharCode(97 + (j % 8)) +
                '' +
                (8 - i)) as Square;

              const isPossibleMove =
                possibleMoves.includes(squareRepresentation);

              return (
                <div
                  onClick={() => {
                    if (!from) {
                      if (square) {
                        setFrom(squareRepresentation);
                        const moves = chess.moves({
                          square: squareRepresentation,
                          verbose: true,
                        });
                        setPossibleMoves(moves.map((move: any) => move.to));
                      }
                    } else {
                      setTo(squareRepresentation);
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          move: {
                            from,
                            to: squareRepresentation,
                            role: playerRole,
                          },
                        })
                      );
                      setFrom(null);
                      setPossibleMoves([]);
                    }
                  }}
                  key={j}
                  className={`w-16 h-16 relative ${
                    (i + j) % 2 == 0 ? 'bg-green-500' : 'bg-zinc-100'
                  }`}
                >
                  <div className='w-full h-full justify-center items-center flex'>
                    {square ? (
                      <img
                        src={`/pieces/${
                          square?.color === 'b'
                            ? square?.type
                            : `${square?.type?.toUpperCase()} w`
                        }.png`}
                        alt={square?.type}
                        className='w-9'
                      />
                    ) : null}
                  </div>

                  {/* Highlight possible moves */}
                  {isPossibleMove && (
                    <div className='absolute w-5 h-5 bg-blue-500 opacity-50 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
