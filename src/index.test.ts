import { linkEvent } from './index';
import { Component, h } from 'preact';

class TestComponent extends Component<any, any> {
    render() {
        return h('div', {});
    }
}

test('linkEvent', () => {
    const mock = jest.fn();
    const instance = new TestComponent();

    /* cache props */
    const handler1 = linkEvent(mock, instance, 'mock');
    expect(instance).toHaveProperty('__lec');
    expect((instance as any).__lec).toHaveProperty('mock');

    /* expect return cached event hander */
    expect(handler1).toBe(linkEvent(mock, instance, 'mock'));

    /* params that a handler is called */
    const event = new Event('');
    handler1(event);
    expect(mock).toBeCalledWith(event, instance);
});
