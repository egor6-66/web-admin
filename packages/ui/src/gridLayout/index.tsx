import { ForwardRefExoticComponent } from 'react';

import GridLayoutBase from './gridLayout';
import * as IGridLayout from './interfaces';
import use from './use';

type CompoundedComponent = ForwardRefExoticComponent<IGridLayout.IProps> & {
    use: typeof use;
};

const GridLayout = GridLayoutBase as CompoundedComponent;
GridLayout.use = use;

export type { IGridLayout };
export default GridLayout;
