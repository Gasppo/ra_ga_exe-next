import { CircularProgress } from '@mui/material'
import { FunctionComponent } from 'react'


interface Props {
    show: boolean
}

const LoadingOverlay: FunctionComponent<Props & any> = ({ children, show }) => {
    return children ? (
        <div style={{ position: 'relative' }}>
            {children}
            {show && <div style={{
                position: "absolute",
                zIndex: 9999,
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                pointerEvents: "unset",
                backgroundColor: "white",
                opacity: 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <CircularProgress size="5rem" />
            </div>}
        </div>) :
        (<div style={{
            position: "absolute",
            zIndex: 9999,
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            pointerEvents: "unset",
            backgroundColor: "white",
            opacity: 0.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <CircularProgress size="5rem" />
        </div>)
}

export default LoadingOverlay