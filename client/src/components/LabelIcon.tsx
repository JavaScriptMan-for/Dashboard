import { FC } from 'react';

interface Props {
    id: string,
    src_img: string,
    alt: string
}

const LabelIcon: FC<Props> = ({ id, src_img, alt }) => {
    return (
        <>
            <label className='icon_label' htmlFor={id}>
                <img className='input-icon' src={src_img} alt={alt} />
            </label>
        </>
    )
}

export default LabelIcon;