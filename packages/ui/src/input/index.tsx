import { ForwardRefExoticComponent } from 'react';

import InputBase from './inputBase';
import * as IInput from './interfaces';
import use from './use';

type CompoundedComponent = ForwardRefExoticComponent<IInput.IProps> & {
    use: typeof use;
};

const Input = InputBase as CompoundedComponent;
Input.use = use;

export type { IInput };
export default Input;
