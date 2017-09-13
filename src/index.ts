import { Component } from 'preact';

export function linkEvent<T extends Component<any, any>>(
    fn: linkEvent.Handler<T>,
    component: Readonly<T & { __lec?: any }>,
    key?: string
): (ev: Event) => void {
    key = key || fn.name;
    const cache = component.__lec || ((component as any).__lec = {});
    return cache[key] || (cache[key] = (ev: Event) => fn.call(component, ev, component));
}

export namespace linkEvent {
    export interface Handler<T extends Component<any, any>> {
        (this: T, ev: Event, component: T): any;
    }
}
