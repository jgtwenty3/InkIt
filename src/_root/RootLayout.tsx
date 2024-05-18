import BottomBar from '@/components/shared/BottomBar';
import Leftsidebar from '@/components/shared/Leftsidebar';
import Topbar from '@/components/shared/Topbar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className = 'w-full md:flex'>
      <Topbar/>
      <Leftsidebar/>

      <section className = 'flex flex-1 h-full'>
        <Outlet/>
      </section>
      <BottomBar/>

    </div>
  )
}

export default RootLayout