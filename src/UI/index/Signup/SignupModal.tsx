import { Backdrop, Fade, Modal } from '@mui/material'
import React from 'react'

interface SignupModalProps {
    open: boolean
    onClose: () => void
}

const SignupModal = ({ open, onClose }: SignupModalProps) => {
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
                <div>

                </div>
            </Fade>
        </Modal>
    )
}

export default SignupModal
