import { ReactNode } from 'react';
import { ItemCallback, Layout, ReactGridLayoutProps } from 'react-grid-layout';

export type IItem = Layout;

// @ts-ignore
export interface IProps extends ReactGridLayoutProps {
    items: Items;
    children: (item: IItem, index: number) => ReactNode;
}

export interface IData {
    layout: Array<Layout>;
    children: Array<ReactNode>;
}
export type Items = Array<Layout>;
