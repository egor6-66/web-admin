import { ReactNode } from 'react';

export interface IItem {
    name: string;
    displayName: ReactNode;
}

export interface IProps {
    items: Items;
    handleNavClick?: (item: IItem) => void;
}

export type Items = Array<IItem>;
