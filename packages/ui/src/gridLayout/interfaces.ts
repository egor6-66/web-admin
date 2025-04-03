import { ReactNode } from 'react';
import { Layout, ReactGridLayoutProps } from 'react-grid-layout';

export type IItem = Layout;

export interface IStore {
    isDraggable: boolean;
    isResizable: boolean;
}

export interface IProps {
    layoutName?: string;
    items?: Items;
    layoutProps?: ReactGridLayoutProps;
    children?: (item: IItem, index: number) => ReactNode;
    className?: string;
}

export interface IData {
    layout: Array<Layout>;
    children: Array<ReactNode>;
}
export type Items = Array<Layout>;
