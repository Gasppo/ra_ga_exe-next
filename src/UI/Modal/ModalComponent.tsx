import { Backdrop, Fade, Modal } from '@mui/material'
import React from 'react'

interface SignupModalProps {
    open: boolean
    onClose: () => void
    children: JSX.Element
    size?: 'small' | 'medium' | 'large' | 'fullscreen'
    ref?: React.MutableRefObject<any>
}

const ModalComponent = ({ open, onClose, children, size = 'medium', ref }: SignupModalProps) => {
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
                 ${size === 'small' ? 'w-full md:w-1/2 lg:w-1/3 xl:w-1/4 md:min-h-1/4' : 'w-1/2 min-h-1/2'} 
                  bg-white md:rounded-lg flex p-8`
                } ref={ref}>
                    {children}
                </div>
            </Fade>
        </Modal>
    )
}

export default ModalComponent
