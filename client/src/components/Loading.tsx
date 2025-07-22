import { FC } from 'react';
import "@styles/loading.scss"

interface Props {
    isShow: boolean
}

const Loading: FC<Props> = ({ isShow }) => {
  return (
    <>
    {
    isShow &&
    <div className='loading'>
        <span>Загрузка...</span><div className='loading-bar'></div>
    </div>
    }
    </>
  )
}

export default Loading;