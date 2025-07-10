import { FC, ReactNode } from 'react';

interface Props {
    children: ReactNode | undefined,
    isShow: boolean
}

const ValidateText: FC<Props> = ({ children, isShow }) => {
  return (
    <>
       { isShow && <p className='validate-error'>{ children ? children : 'Произошла ошибка' }</p> }
    </>
  )
}

export default ValidateText;