import { beforeEach, describe, expect, it, vi } from 'vitest';
import matchMediaManager, {
    MatchMediaHandler,
    SubscribeResult,
} from './match-media-manager';

describe(`Usage`, () => {
    const obj = { callback1: () => {}, callback2: () => {} };
    const spy1 = vi.spyOn(obj, 'callback1');
    const spy2 = vi.spyOn(obj, 'callback2');
    let subscriber: SubscribeResult;
    let updatedSubscriber: SubscribeResult;
    let matchMediaHandler: MatchMediaHandler;

    it(`Step1. createMatchMedia`, () => {
        matchMediaManager.createMatchMedia(
            'mobile',
            '(max-width: 768px)',
            true,
        );

        expect(matchMediaManager.has('mobile')).toBeTruthy();
        expect(matchMediaManager.has('desktop')).toBeFalsy();
    });
    it(`Step2. subscribe callback using matchMediaHandler`, () => {
        matchMediaHandler = matchMediaManager.createHandler();

        subscriber = matchMediaHandler.subscribe('mobile', obj.callback1);

        subscriber.run();

        expect(spy1).toBeCalledTimes(1);
    });
    it(`Step3. update subscriber callback`, () => {
        updatedSubscriber = subscriber.update(obj.callback2);

        updatedSubscriber.run();

        expect(spy2).toBeCalledTimes(1);
        expect(spy1).toBeCalledTimes(1);
    });
    it(`Step4. unsubscribe callback to matchMediaHandler`, () => {
        subscriber.unsubscribe();
        subscriber.run();

        expect(spy1).toBeCalledTimes(1);
    });
    it(`Step5. locally clear matchMediaHandler`, () => {
        matchMediaHandler.clear();

        subscriber.run();
        updatedSubscriber.run();

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
        matchMediaManager.createMatchMedia(
            'mobile',
            '(max-width: 768px)',
            true,
        );
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
        matchMediaManager.createMatchMedia(
            'mobile',
            '(max-width: 768px)',
            true,
        );
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
