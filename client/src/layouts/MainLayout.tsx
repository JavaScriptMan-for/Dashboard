import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import "@styles/main.scss"

const MainLayout:FC = () => {
  return (
    <>
       <Outlet />
    </>
  )
}

export default MainLayout;