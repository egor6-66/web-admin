export type ICons = 'arrow' | 'close' | 'select' | 'required' | 'make_call' | 'copy' | 'layout' | 'resize';

export interface IProps {
    icon: ICons;
    rotate?: number;
    color?: string;
}
