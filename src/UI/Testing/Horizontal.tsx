import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import LayoutItem from './LayoutItem';
import { LayoutElement } from './types';

interface VerticalProps<Model> {
    layout: LayoutElement<Model>;
    hasParent?: boolean,
    parentScope?: string
}

function Horizontal<Model>(props: VerticalProps<Model>) {


    const wrap = props.layout.wrap !== false


    return (
        <>
            {props?.layout?.title ? <Typography className={`${props?.layout?.titleClassName || "text-gray-600 text-14 mb-20"}`}>{props?.layout?.title}</Typography> : null}
            <Grid wrap={wrap ? 'wrap' : 'nowrap'} justifyContent={props?.layout?.justifyContent} spacing={props.layout.spacing || 1} container direction="row" className={clsx(props.layout.className, { [`${props.layout.divider}:divide-x divide-gray-200`]: props.layout.divider })}>
                {props.layout.elements?.map((item, i) => <LayoutItem
                    parentScope={props.parentScope}
                    key={i} item={props.layout.scope ? {
                        ...item,
                        scope: `${props.layout.scope}${item.scope || ''}`,

                    } : item} />)}
            </Grid>
        </>
    )
}

export default Horizontal
