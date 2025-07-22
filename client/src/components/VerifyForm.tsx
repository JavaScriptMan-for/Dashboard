import { FC, useRef, useEffect, useState, RefObject, useLayoutEffect } from 'react';
import "@styles/verify_form.scss"
import Timer from './Timer';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { Actions } from '@types-my/form.types';

interface Props {
  method: (data: any) => any,
  onSuccess: () => void,
  // email: string,
  // title: string,
  // header: string,
  // action: Actions
}

const VerifyForm: FC<Props> = ({ method, onSuccess }) => {
  const inputRefs: RefObject<HTMLInputElement | null>[] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const mutation = useMutation({
    mutationKey: ['verify'],
    mutationFn: method,
    onSuccess: (data: string) => {
      Cookies.set('jwt', data)
      onSuccess();
    }
  })

  const [fieldValues, setFieldValues] = useState<string[]>([
    '', '', '', '', '', ''
  ]);

  const [code, setCode] = useState<null | number>(null);

    useLayoutEffect(() => {
        inputRefs[0].current?.focus();
    }, [])

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = inputRefs[index].current;
    if(!input) return;

    let value = event.target.value.replace(/[^0-9]/g, '');

    if(value.length > 1) {
      value = value.slice(0, 1);
    }
    input.value = value;

    setFieldValues(prevValues => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });


    if(value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    } else if(value.length === 0 && index > 0) {
        inputRefs[index - 1].current?.focus();
    }
  };

  useEffect(() => {
    if(fieldValues.every(val => val.length === 1)) {
      const result_code = parseInt(fieldValues.join(""));
      setCode(result_code);
    }
  }, [fieldValues]);

  useEffect(() => {
    mutation.mutate({ code })
  }, [code])

  return (
    <div id='container-form'>
    <form id='verify-form'>
      <input placeholder='X' type="number" id="figure_1" className="figures" ref={inputRefs[0]} onChange={handleChange(0)} />
      <input placeholder='X' type="number" id="figure_2" className="figures" ref={inputRefs[1]} onChange={handleChange(1)} />
      <input placeholder='X' type="number" id="figure_3" className="figures" ref={inputRefs[2]} onChange={handleChange(2)} />
      <input placeholder='X' type="number" id="figure_4" className="figures" ref={inputRefs[3]} onChange={handleChange(3)} />
      <input placeholder='X' type="number" id="figure_5" className="figures" ref={inputRefs[4]} onChange={handleChange(4)} />
      <input placeholder='X' type="number" id="figure_6" className="figures" ref={inputRefs[5]} onChange={handleChange(5)} />
    </form>
      <Timer email='' title='' header='' action='register'/>
    </div>
  )
}

export default VerifyForm;