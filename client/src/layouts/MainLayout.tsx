import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import "@styles/main.scss"


abstract class PagesTitles {
  private static original_title: string = 'Dashboard';

  public static index: string = this.original_title;
  public static register: string = `${this.original_title} | Регистрация`;
  public static login: string = `${this.original_title} | Авторизация`;
  public static verify: string = `${this.original_title} | Подтверждение`;
}

const MainLayout:FC = () => {
  const loc = useLocation();

  useEffect(() => {
    switch(loc.pathname) {
      case '/': document.title = PagesTitles.index; break;
      case '/register': document.title = PagesTitles.register; break;
      case '/login': document.title = PagesTitles.login; break;
      case '/verify': document.title = PagesTitles.verify; break;
    }
  }, [loc])

  return (
    <>
       <Outlet />
    </>
  )
}

export default MainLayout;