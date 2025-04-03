import { ReactGridLayoutProps } from 'react-grid-layout';
import useZustand from 'react-use-zustand';
import { useStateCustom } from '@packages/hooks';

import { IGridLayout } from '../index';

import { IProps, IStore } from './interfaces';

const gridLayoutStore = useZustand<IStore>({
    keys: ['isDraggable', 'isResizable'],
});

function use(props: IProps): IProps {
    const { items, layoutName, layoutProps } = props;

    const isDraggable = gridLayoutStore.use.isDraggable();
    const isResize = gridLayoutStore.use.isResizable();

    const widgets = useStateCustom<IGridLayout.Items>(items, {
        storage: {
            key: layoutName,
        },
    });

    const changeLayout = (layout: any) => {
        widgets.set(layout);
    };

    return {
        items: widgets.value,
        layoutProps: {
            ...layoutProps,
            isDraggable: isDraggable.value,
            isResizable: isResize.value,
            onLayoutChange: changeLayout,
        },
    };
}

export default use;
