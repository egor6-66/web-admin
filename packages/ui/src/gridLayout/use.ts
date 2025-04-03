import useZustand from 'react-use-zustand';
import { useStateCustom } from '@packages/hooks';

import { IGridLayout } from '../index';

import { IProps, IStore } from './interfaces';

const gridLayoutStore = useZustand<IStore>({
    keys: ['isDraggable', 'isResizable'],
});

function use(props?: IProps) {
    const { items, layoutName, layoutProps } = props || {};
    const draggable = gridLayoutStore.use.isDraggable();
    const resize = gridLayoutStore.use.isResizable();

    const itemsState = useStateCustom<IGridLayout.Items>(items, {
        storage: {
            key: layoutName,
        },
    });

    const changeLayout = (layout: any) => {
        itemsState.set(layout);
    };

    const changeDraggable = () => {
        draggable.set((prev) => !prev);
    };

    const changeResizable = () => {
        resize.set((prev) => !prev);
    };

    return {
        items: itemsState.value,
        changeDraggable,
        changeResizable,
        layoutProps: {
            ...layoutProps,
            isDraggable: draggable.value,
            isResizable: resize.value,
            onLayoutChange: changeLayout,
        },
    };
}

export default use;
