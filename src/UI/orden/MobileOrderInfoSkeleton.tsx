import { Skeleton } from '@mui/material'



const MobileOrderInfoSkeleton = () => {

    return (
        <div className="mx-4 my-2 flex flex-row">
            <div className="h-20" >
                <Skeleton variant="rounded" height={'80px'} width='80px' />
            </div>
            <div className="flex flex-col text-sm justify-evenly ml-4 w-full">
                <div>
                    <Skeleton width={'100%'} />
                </div>
                <div>
                    <Skeleton width={'95%'} />
                </div>
                <div>
                    <Skeleton width={'80%'} />
                </div>
            </div>
        </div>
    )
}

export default MobileOrderInfoSkeleton
