import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import LayoutItem from '../LayoutItem';
import { LayoutElement } from '../types';


interface VerticalProps<Model> {
    layout: LayoutElement<Model>;
    hasParent?: boolean,
    parentScope?: string
}

function Vertical<Model>(props: VerticalProps<Model>) {
    const { layout, parentScope } = props
    const wrap = layout.wrap !== false



    return (
        <>
            {layout?.title ? <Typography className={`${layout?.titleClassName || "text-gray-600 text-14 mb-20"}`}>{layout?.title}</Typography> : null}
            <Grid wrap={wrap ? 'wrap' : 'nowrap'} spacing={layout.spacing || 1} container direction="column" alignItems={layout?.alignItems} className={clsx({ [`${layout.divider}:divide-y divide-gray-200`]: layout.divider })}>
                {layout.elements?.map((item, i) => <LayoutItem
                    parentScope={parentScope}
                    key={i} item={layout.scope ? {
                        ...item,
                        scope: `${layout.scope}${item.scope || ''}`,
                    } : item} />)}
            </Grid>
        </>
    )
}

export default Vertical
