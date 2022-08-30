import Skeleton from '@mui/material/Skeleton'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
    show: boolean
}

const LoadingSkeleton: FunctionComponent<Props & any> = (props) => {
    const { children, show, ...other } = props
    return (
        <>
            {show && <Skeleton className={clsx('axxd-loading axxd-loading-skeleton')} sx={{ borderRadius: 4 }} {...other} {...other.options} />}
            {!show && children}
        </>
    )
}

export default LoadingSkeleton
