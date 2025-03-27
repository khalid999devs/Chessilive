import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='min-h-screen bg-zinc-800'>
      <Outlet />
    </div>
  );
}

export default App;
