import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className='px-4'>
      <div className='pt-8 max-w-[1000px] w-full m-auto'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
          <div className='flex justify-center lg:justify-end'>
            <img src={'/chessboard.jpg'} alt='' className='max-w-96' />
          </div>
          <div className='flex justify-center flex-col gap-6 md:-mt-8  max-w-max'>
            <h1 className='text-4xl lg:text-5xl font-bold text-zinc-100 text-center md:text-left'>
              Play Chess Online on the #1 Site!
            </h1>
            <div className='mt-4 flex justify-center items-center w-full lg:justify-center'>
              <Button
                onClick={() => {
                  navigate('/game');
                }}
              >
                Play Online
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
