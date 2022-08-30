import LinearProgress from '@mui/material/LinearProgress'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
    show: boolean
}

const LoadingSlider: FunctionComponent<Props & any> = ({ children, show, options, ...props }) => {
    return (
        <>
            {show && <div style={{ height: 0, overflow: 'visible' }}><LinearProgress sx={{ zIndex: 100 }} className={clsx('axxd-loading axxd-loading-slider', options?.className || {})} /></div>}
            <div className={props.className}>
                {children}
            </div>
        </>
    )
}

export default LoadingSlider
