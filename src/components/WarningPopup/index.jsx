import React, {useState} from 'react';
import './style.scss'

const WarningPopup = ({header, warning, primButton, secButton}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return(
        <div className={modalIsOpen ? 'modal_container_info showing' : 'modal_container_info hiding'}>
            <div className='modal_background'>
                <div className='modal'>
                    <h2>{header}</h2>
                    <p>{warning}</p>
                    <div className='button_wrapper'>
                        <button onClick={() => setModalIsOpen(false)} className='secondaryButton'>{secButton}</button>
                    <button className='primaryButton'>{primButton}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WarningPopup