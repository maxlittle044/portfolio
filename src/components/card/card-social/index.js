import React from 'react'

const CardSocial = (
    {
        className = '',
        btnLink,
        btnText,
        socialIcon
    }
) => {
    return (
        <div className={`card-social flex justify-center ${className}}`}>
            <a href={btnLink} target='_blank' rel='noopener noreferrer'>
                <span className='text-[0px] leading-[0px]'>{btnText}</span>
                <span className='flex items-center justify-center h-10 w-10 rounded-lg bg-slate-200 social-btn leading-normal text-[#1773EA]'>
                    {socialIcon}
                </span>
            </a>
        </div>
    );
}

export default CardSocial;