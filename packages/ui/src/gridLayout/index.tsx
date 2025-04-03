import { ForwardRefExoticComponent } from 'react';

import GridLayoutBase from './gridLayout';
import * as IGridLayout from './interfaces';
import LayoutControls from './layoutControls';
import use from './use';

type CompoundedComponent = ForwardRefExoticComponent<IGridLayout.IProps> & {
    use: typeof use;
    controller: typeof LayoutControls;
};

const GridLayout = GridLayoutBase as CompoundedComponent;
GridLayout.use = use;
GridLayout.controller = LayoutControls;

export type { IGridLayout };
export default GridLayout;
