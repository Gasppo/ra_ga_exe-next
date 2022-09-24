import Grid from '@mui/material/Grid'
import React, { FunctionComponent } from 'react'
import FormItem from './FormItem';


interface LayoutItemProps {
    item: any;
    parentScope?: string
}

const LayoutItem: FunctionComponent<LayoutItemProps> = ({ item, parentScope }) => {


    if (item?.width && typeof (item.width) === "object") {
        return (
            <Grid className={item.className} item xl={item?.width?.xl} lg={item?.width?.lg} md={item?.width?.md} xs={item?.width?.xs} sm={item?.width?.sm}>
                <FormItem layout={item} hasParent={true} parentScope={parentScope} />
            </Grid>
        )
    } else {
        return (
            <Grid className={item.className} item xs={item?.width ? item.width : 12}>
                <FormItem layout={item} hasParent={true} parentScope={parentScope} />
            </Grid>
        )
    }
}

export default LayoutItem
