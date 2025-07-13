import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AcceptTermsTypePart } from '@types-my/form.types';
import { useAppDispatch } from '@slices-my/store';
import { setIsAccept } from '@slices-my/form';

import ValidateText from '@components/ValidateText';

const AcceptTermsPart:FC = () => {
    const dispatch = useAppDispatch();

    const { register, watch, formState: { errors } } = useFormContext<AcceptTermsTypePart>();
    const [isAcceptState, setIsAcceptState] = useState<boolean>(false);

    const watch_accept = watch('accept_terms');

    useEffect(() => {
        setIsAcceptState(!watch_accept);
        dispatch(setIsAccept(isAcceptState))
    }, [watch_accept])


  return (
    <>
    <label className="checkbox-div">
        <input {...register('accept_terms')} type="checkbox" className='checkbox' id='accept-checkbox' />
        <label className='checkbox-label' htmlFor="accept-checkbox">I agree to all terms</label>
    </label>
        <ValidateText isShow={!!errors.accept_terms}>{errors.accept_terms?.message}</ValidateText>
    </>
  )
}

export default AcceptTermsPart;