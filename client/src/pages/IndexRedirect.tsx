import { FC, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IndexRedirect:FC = () => {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        document.location.pathname = '/login'
        navigate('/login')
    }, [])
  return (
    <>
    <p>Redirected</p>
    </>
  )
}

export default IndexRedirect;