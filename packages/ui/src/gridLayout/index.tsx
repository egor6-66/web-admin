import React, { useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useWindowSize } from '@packages/hooks';
import classNames from 'classnames';

import { IData, IProps } from './interfaces';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from './styles.module.scss';

const GridLayout = (props: IProps) => {
    const { children, items, className } = props;
    const ResponsiveLayout = useMemo(() => WidthProvider(Responsive), []);
    const windowsSize = useWindowSize();

    const data = useMemo((): IData => {
        const defaultData: IData = { layout: [], children: [] };

        return items.reduce((acc, item, index) => {
            acc.layout.push({ ...item.grid, i: item.name });
            acc.children.push(
                <div className={styles.item} key={item.name} data-grid={item.grid}>
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
            onLayoutChange={(l) => {
                console.log(l);
            }}
            onResize={() => {
                console.log('res');
            }}
            maxRows={rows}
            breakpoints={{ lg: 5000 }}
            rowHeight={rowHeight}
            resizeHandles={['n', 'e', 's', 'w', 'ne', 'se', 'nw', 'sw']}
            useCSSTransforms
            cols={{ lg: cols }}
            layouts={{ lg: data.layout }}
            className={classNames(className, styles.wrapper)}
            onDragStart={(s) => {
                console.log(s);
            }}
            // preventCollision
            onDragStop={(e) => {
                console.log('dw');
            }}
        >
            {data.children}
        </ResponsiveLayout>
    );
};

export default GridLayout;
