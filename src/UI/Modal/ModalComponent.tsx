import { Backdrop, Fade, Modal } from '@mui/material'
import React from 'react'

interface SignupModalProps {
    open: boolean
    onClose: () => void
    children: JSX.Element
    size?: 'small' | 'medium' | 'large' | 'fullscreen'
}

const ModalComponent = ({ open, onClose, children, size = 'medium' }: SignupModalProps) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                 ${size === 'small' ? 'w-1/4' : 'w-1/2'} 
                 h-2/3 bg-white rounded-2xl flex p-8`
                }>
                    {children}
                </div>
            </Fade>
        </Modal>
    )
}

export default ModalComponent