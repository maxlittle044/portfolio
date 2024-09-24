import React from 'react';

const CardIcon = (
    {
        className = '',
    }
) => {
    return (
        <div className={`card-icon overflow-hidden flex flex-col justify-center items-center relative rounded bg-gray-100 transition-all duration-300 shadow-[0px_14px_26px_rgba(0,0,0,.04) p-4 group group-hover:shadow-[0_24px_36px_rgba(0,0,0,.11), 0_24px_46px_rgba(255,215,97,.48)] ${className}`}>
            {/* <div className="card-icon__overlay absolute w-full h-full max-h-[132px] max-w-[132px] rounded-full bg-[#ffd861] z-[-2] transition-[transform_0.3s_ease-out] "></div> */}

            <div className="card-icon__media w-full h-full min-h-[132px] max-w-[132px] p-4 relative flex items-center justify-center z-[1] bg-white transition-all duration-300 border-[2px] border-[#ffd861] rounded-full mb-4 lg:mb-6 before:absolute before:h-full before:w-full before:bg-[#ffd861] before:rounded-full before:z-[-1] before:max-h-[112px] before:max-w-[112px] after:absolute after:h-full after:w-full after:bg-[#ffd861] after:rounded-full after:z-[-2] after:max-h-[112px] after:max-w-[112px] after:opacity-0 group-hover:bg-[#ffd861] group-hover:border-[#ffeeba] group-hover:before:bg-[#ffeeba] group-hover:after:opacity-100 group-hover:after:[transform:scale(1)_translateZ(0)] before:transition-all after:transition-all">
                <svg width="71px" height="76px" viewBox="29 14 71 76" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                    <defs></defs>
                    <g id="Group" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(30.000000, 14.000000)">
                        <g id="Group-8" fill="#D98A19">
                            <g id="Group-7">
                                <g id="Group-6">
                                    <path d="M0,0 L0,75.9204805 L69.1511499,75.9204805 L0,0 Z M14.0563973,32.2825679 L42.9457663,63.9991501 L14.2315268,63.9991501 L14.0563973,32.2825679 Z" id="Fill-1"></path>
                                </g>
                            </g>
                        </g>
                        <g id="Group-20" transform="translate(0.000000, 14.114286)" stroke="#FFFFFF" strokeLinecap="square">
                            <path d="M0.419998734,54.9642857 L4.70316223,54.9642857" id="Line"></path>
                            <path d="M0.419998734,50.4404762 L4.70316223,50.4404762" id="Line"></path>
                            <path d="M0.419998734,45.9166667 L4.70316223,45.9166667" id="Line"></path>
                            <path d="M0.419998734,41.3928571 L2.93999114,41.3928571" id="Line"></path>
                            <path d="M0.419998734,36.8690476 L4.70316223,36.8690476" id="Line"></path>
                            <path d="M0.419998734,32.3452381 L4.70316223,32.3452381" id="Line"></path>
                            <path d="M0.419998734,27.8214286 L4.70316223,27.8214286" id="Line"></path>
                            <path d="M0.419998734,23.297619 L2.93999114,23.297619" id="Line"></path>
                            <path d="M0.419998734,18.7738095 L4.70316223,18.7738095" id="Line"></path>
                            <path d="M0.419998734,14.25 L4.70316223,14.25" id="Line"></path>
                            <path d="M0.419998734,9.72619048 L4.70316223,9.72619048" id="Line"></path>
                            <path d="M0.419998734,5.20238095 L2.93999114,5.20238095" id="Line"></path>
                            <path d="M0.419998734,0.678571429 L4.70316223,0.678571429" id="Line"></path>
                        </g>
                    </g>
                </svg>
            </div>

            <div className="card-icon__content">
                <h3>Test</h3>
            </div>
        </div>
    )
}

export default CardIcon;