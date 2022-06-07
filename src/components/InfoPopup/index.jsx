import React, {useState} from 'react';
import '../WarningPopup/style.scss'

const InfoPopup = ({header, warning, buttonTxt}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return(
        <div className={modalIsOpen ? 'modal_container_info showing' : 'modal_container_info hiding'}>
            <div className='modal_background'>
                <div className='modal'>
                    <h2>{header}</h2>
                    <p>{warning}</p>
                    <div className='button_wrapper'>
                    <button onClick={() => setModalIsOpen(false)} className='primaryButton'>{buttonTxt}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoPopup