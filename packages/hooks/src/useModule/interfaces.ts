export interface IStore {
    broadcasts: Record<string, BroadcastChannel>;
}

export interface IEvent<T> {
    modules: Array<T>;
    callback: (data: { module: T; payload: any }) => any;
}

export interface IProps<T> {
    events?: Record<string, IEvent<T>>;
}

export interface ISendProps<T> {
    target: T;
    eventName: string;
    data?: any;
    waitingTimer?: number;
}

export interface IOpenNewWindowProps {
    moduleUrl: string;
    delay?: number;
}
