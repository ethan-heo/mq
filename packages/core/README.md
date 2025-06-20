다음은 원문의 형식을 그대로 유지한 영어 번역입니다:

---

## mq-core

**mq-core** is based on the [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API and serves the role of supporting registration, removal, and update of callbacks using the `change` event. It is designed with the intention of being adaptable across various frameworks.

### Usage

1. Use the `createMatchMedia` method to create a `window.matchMedia` instance. During this process, a `change` event is defined.
2. Use the `createHandler` method to create an object that can subscribe, remove, and execute callback functions for the `change` event.
3. Use the `subscribe` function of the object created via the `createHandler` method to register a callback function.
4. The object created via the `subscribe` method can unsubscribe, update, or execute the callback.

    1. `update`: Replaces the initially registered callback with the given callback. The originally registered callback will be removed.
    2. `run`: Executes the registered callback if the current viewport matches the registered media query size; otherwise, it does not run.
    3. `unsubscribe`: Removes the registered callback function.

5. Removes all callbacks registered to the handler.
6. Removes all callbacks associated with the created matchMedia.

```jsx
import matchMediaManager from './match-media-manager';

// 1. Create a window.matchMedia handler
matchMediaManager.createMatchMedia('mobile', '(max-width: 768px)');

// 2. Create a handler
const handler = matchMediaManager.createHandler();

// 3. Register the CALL_BACK function
let subscriber = handler.subscribe('mobile', CALL_BACK); // CALL_BACK is executed when the viewport changes to mobile size.

// 4-1. Update CALL_BACK
subscriber = handler.update(CALL_BACK_2); // The original CALL_BACK will be removed.

// 4-2. Execute CALL_BACK_2
subscriber.run(); // CALL_BACK_2 will be executed if the current viewport matches the mobile size.

// 4-3. Remove CALL_BACK_2
subscriber.unsubscribe();

// 5. Remove all CALL_BACK functions managed by the handler
handler.clear();

// 6. Remove all CALL_BACK functions associated with the created matchMedia
matchMediaManager.clear();
```
