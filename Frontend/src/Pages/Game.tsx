import { useEffect, useState } from 'react';
import Button from '../Components/Button';
import ChessBoard from '../Components/ChessBoard';
import { useSocket } from '../hooks/useSocket';
import { Chess } from 'chess.js';
import { rightArrowIcon } from '../assets';

export const INIT_GAME = 'init_game';
export const MOVE = 'move';
export const GAME_OVER = 'game_over';

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  const [playClicked, setPlayClicked] = useState(false);
  const [moveEl, setMoveEl] = useState<
    { from: string; to: string; role: 'white' | 'black' }[]
  >([]);
  const [playerRole, setPlayerRole] = useState<'white' | 'black'>('white');

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case INIT_GAME:
          // setChess(new Chess());
          setBoard(chess.board());
          setStarted(true);
          // console.log(message);
          setPlayerRole(message.payload.color);
          break;
        case MOVE:
          const move = message.payload;
          // console.log(move);
          setMoveEl((prev) => [move, ...prev]);

          chess.move(move);
          setBoard(chess.board());
          break;
        case GAME_OVER:
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <div className='justify-center flex m-auto'>
      <div className='pt-8 max-w-[800px] w-full'>
        <div className='grid md:grid-cols-5 gap-4 w-full '>
          <div className='col-span-5 md:col-span-3 w-full flex justify-center md:justify-end'>
            <ChessBoard
              chess={chess}
              setBoard={setBoard}
              socket={socket}
              board={board}
              playerRole={playerRole}
            />
          </div>
          <div className='col-span-5 md:col-span-2 md:bg-zinc-700 rounded-2xl flex justify-center pl-0 pt-8 w-full'>
            {!started ? (
              <Button
                classes={`!inline-block h-min min-w-[200px] text-xl ${
                  playClicked && '!text-lg'
                }`}
                onClick={() => {
                  socket.send(
                    JSON.stringify({
                      type: INIT_GAME,
                    })
                  );
                  setPlayClicked(true);
                }}
              >
                {playClicked ? 'Waiting for other player...' : 'Play'}
              </Button>
            ) : (
              <div className='w-full px-4'>
                <h1 className='text-xl text-green-500 font-medium mb-8 text-center'>
                  Live Game (
                  <span
                    className={`uppercase font-bold text-lg px-0.5 ${
                      playerRole === 'white' ? 'text-zinc-50' : 'text-zinc-400'
                    }`}
                  >
                    {playerRole}
                  </span>
                  )
                </h1>

                <div className='flex flex-col overflow-auto max-h-[400px]'>
                  {moveEl.length ? (
                    moveEl.map(
                      (
                        item: {
                          from: string;
                          to: string;
                          role: 'white' | 'black';
                        },
                        key: number
                      ) => (
                        <div
                          className={`px-4 flex items-center my-2 text-sm font-semibold gap-4 ${
                            item.role === 'white'
                              ? 'text-zinc-50'
                              : 'text-zinc-400'
                          }`}
                          key={key}
                        >
                          {item.from}
                          <img src={rightArrowIcon} className='w-5' alt='—>' />
                          {item.to}
                        </div>
                      )
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
