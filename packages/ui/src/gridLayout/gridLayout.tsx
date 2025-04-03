import React, { useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useWindowSize } from '@packages/hooks';
import classNames from 'classnames';

import { IData, IProps } from './interfaces';

import './styles.css';
import styles from './styles.module.scss';

const GridLayout = (props: IProps) => {
    const { children, items, className, layoutProps } = props;
    const ResponsiveLayout = useMemo(() => WidthProvider(Responsive), []);
    const windowsSize = useWindowSize();

    const data = useMemo((): IData => {
        const defaultData: IData = { layout: [], children: [] };

        return items?.reduce((acc, item, index) => {
            acc.layout.push(item);
            acc.children.push(
                <div className={styles.item} key={item.i} data-grid={item}>
                    {children(item, index)}
                </div>
            );

            return acc;
        }, defaultData);
    }, [items]);

    const cols = 10;
    const rows = 10;
    const rowHeight = (windowsSize.height - 200) / rows;

    return (
        <ResponsiveLayout
            {...layoutProps}
            maxRows={rows}
            breakpoints={{ lg: 5000 }}
            rowHeight={rowHeight}
            resizeHandles={['n', 'e', 's', 'w', 'ne', 'se', 'nw', 'sw']}
            useCSSTransforms
            cols={{ lg: cols }}
            layouts={{ lg: data.layout }}
            className={classNames(className, styles.wrapper)}
        >
            {data.children}
        </ResponsiveLayout>
    );
};

export default GridLayout;
