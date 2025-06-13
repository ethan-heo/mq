import { beforeEach, describe, expect, it, vi } from 'vitest';
import matchMediaManager, {
    MatchMediaHandler,
    SubscribeResult,
} from './match-media-manager';

describe(`Usage`, () => {
    const obj = { callback1: () => {}, callback2: () => {} };
    const spy1 = vi.spyOn(obj, 'callback1');
    const spy2 = vi.spyOn(obj, 'callback2');
    let subscribed: SubscribeResult;
    let updatedSubscribed: SubscribeResult;
    let matchMediaHandler: MatchMediaHandler;

    it(`Step1. Initialize`, () => {
        matchMediaManager.setMediaQuery('mobile', '(max-width: 768px)');
        matchMediaManager.init(true);

        expect(matchMediaManager.has('mobile')).toBeTruthy();
        expect(matchMediaManager.has('desktop')).toBeFalsy();
    });
    it(`Step2. subscribe callback using matchMediaHandler`, () => {
        matchMediaHandler = matchMediaManager.createHandler();

        subscribed = matchMediaHandler.subscribe('mobile', obj.callback1);

        subscribed.run();

        expect(spy1).toBeCalledTimes(1);
    });
    it(`Step3. update subscribed callback`, () => {
        updatedSubscribed = subscribed.update(obj.callback2);

        updatedSubscribed.run();

        expect(spy2).toBeCalledTimes(1);
        expect(spy1).toBeCalledTimes(1);
    });
    it(`Step4. unsubscribe callback to matchMediaHandler`, () => {
        subscribed.unsubscribe();
        subscribed.run();

        expect(spy1).toBeCalledTimes(1);
    });
    it(`Step5. locally clear matchMediaHandler`, () => {
        matchMediaHandler.clear();

        subscribed.run();
        updatedSubscribed.run();

        expect(spy2).toBeCalledTimes(1);
        expect(spy1).toBeCalledTimes(1);
    });
    it(`Step6. clear matchMediaManager`, () => {
        matchMediaManager.clear();

        expect(matchMediaManager.has('mobile')).toBeFalsy();
    });
});

describe(`Function Test`, () => {
    beforeEach(() => {
        matchMediaManager.clear();
    });

    it(`Specific callback run`, () => {
        matchMediaManager.setMediaQuery('mobile', '(max-width: 768px)');
        matchMediaManager.init(true);
        const obj = { callback1: () => {}, callback2: () => {} };
        const spy1 = vi.spyOn(obj, 'callback1');
        const spy2 = vi.spyOn(obj, 'callback2');
        const matchMediaHandler = matchMediaManager.createHandler();

        matchMediaHandler.subscribe('mobile', obj.callback1);
        const { run } = matchMediaHandler.subscribe('mobile', obj.callback2);

        matchMediaHandler.run();

        expect(spy1).toBeCalledTimes(1);
        expect(spy2).toBeCalledTimes(1);

        run();

        expect(spy1).toBeCalledTimes(1);
        expect(spy2).toBeCalledTimes(2);
    });

    it(`Locally callback run`, () => {
        matchMediaManager.setMediaQuery('mobile', '(max-width: 768px)');
        matchMediaManager.init(true);
        const obj = { callback1: () => {}, callback2: () => {} };
        const spy1 = vi.spyOn(obj, 'callback1');
        const spy2 = vi.spyOn(obj, 'callback2');
        const matchMediaHandler1 = matchMediaManager.createHandler();
        const matchMediaHandler2 = matchMediaManager.createHandler();

        matchMediaHandler1.subscribe('mobile', obj.callback1);
        matchMediaHandler2.subscribe('mobile', obj.callback2);

        matchMediaHandler1.run();

        expect(spy1).toBeCalledTimes(1);
        expect(spy2).toBeCalledTimes(0);
    });
});
