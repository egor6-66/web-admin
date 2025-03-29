import { ReactNode } from 'react';
import { Layout } from 'react-grid-layout';

export interface IItem {
    name: string;
    displayName?: string;
    grid: Omit<Layout, 'i'>;
}

export interface IProps {
    items: Items;
    children: (item: IItem, index: number) => ReactNode;
    className?: string;
}
export interface IData {
    layout: Array<Layout>;
    children: Array<ReactNode>;
}
export type Items = Array<IItem>;
