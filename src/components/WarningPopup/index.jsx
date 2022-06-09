import React, {useState} from 'react';
import './style.scss'

const WarningPopup = ({warningModal, setWarningModal, primeFuction, header, warning, primButton, secButton}) => {

    console.log('in warning', warningModal)

    const handlePrimeClick = () => {
        setWarningModal(false)
        primeFuction()
    }

    return(
        <div className={warningModal ? 'modal_container_info showing' : 'modal_container_info hiding'}>
            <div className='modal_background'>
                <div className='modal'>
                    <h2>{header}</h2>
                    <p>{warning}</p>
                    <div className='button_wrapper'>
                        <button onClick={() => setWarningModal(false)} className='secondaryButton'>{secButton}</button>
                    <button className='primaryButton' onClick={handlePrimeClick}>{primButton}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WarningPopup