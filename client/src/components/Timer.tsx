import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResetData } from '@types-my/form.types'

const Timer: FC<ResetData> = ({ title, header, email, action }) => {
  const [time, setTime] = useState<number>(60);

  useEffect(() => {
    let interval: number | null = null
    if (time > 0) { 
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [time]); 

  const onResetCode = () => {
    setTime(60);
  };

  return (
    <>
      <span>
        {time > 0 ? `Код можно отправить повторно через ${time}` : (
          <Link onClick={onResetCode} to="#">
            Отправить код снова
          </Link>
        )}
      </span>
    </>
  );
};

export default Timer;