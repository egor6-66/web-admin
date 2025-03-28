import { ReactNode } from 'react';

type TabWithOutCallback = Omit<IItem, 'onClick'>;

export interface IItem {
    name: string;
    displayName: ReactNode;
    onClick?: (item: TabWithOutCallback) => void;
}

export interface IProps {
    items: Items;
    activeItem: string;
    handleTabClick?: (item: TabWithOutCallback) => void;
    onMount?: () => void;
    className: string;
}

export type Items = Array<IItem>;
