import React, { useEffect, useMemo, useRef } from 'react';
import GL, { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import classNames from 'classnames';

import { IData, IProps } from './interfaces';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from './styles.module.scss';

const GridLayout = (props: IProps) => {
    const { children, items, className } = props;
    const ResponsiveLayout = useMemo(() => WidthProvider(Responsive), []);

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

    return (
        <ResponsiveLayout
            onLayoutChange={(l) => {
                console.log(l);
            }}
            autoSize
            maxRows={300}
            resizeHandles={['n', 'e', 's', 'w', 'ne', 'se', 'nw', 'sw']}
            useCSSTransforms
            rowHeight={25}
            cols={{ lg: 40 }}
            breakpoints={{ lg: 800 }}
            // compactType={'horizontal'}
            // resizeHandles={['sw', 'nw', 'se', 'ne']}
            layouts={{ lg: data.layout }}
            // layout={data.layout}
            className={classNames(className, styles.wrapper)}
            style={{ height: '100%' }}
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
