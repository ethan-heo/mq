## mq-core

Provides an interface based on handlers created utilizing window.matchMedia.

### Usage

#### 1. resistMediaQuery

Utilize a Map<DefaultMediaQuery['device'], MediaQuery> Singleton object to register a MediaQuery per device.

For Example:

```typescript
resistMediaQuery('mobile', '(max-width: 768px)');
```

#### 2. createMatchMedia

Create an instance of the handler that utilizes window.matchMedia.

For Example:

```typescript
createMatchMedia('mobile');
```

#### 3. Registering callbacks

You can perform a registered callback using the MediaQueryList's change event as a notifier.
When you execute the subscribe method, the unsubscribe function is returned.
For example:

```typescript
const mobile = createMatchMedia('mobile');
const unsubscribe = mobile.subscribe((ev: MediaQueryListEvent) => {
    if (ev.matches) {
        // logic
    }
});
```

#### Option 1. Fire immediately

You can have the change event fire immediately, rather than being triggered by a change in the viewport.

For example:

```typescript
const mobile = createMatchMedia('mobile');
const unsubscribe = mobile.subscribe((ev: MediaQueryListEvent) => {
    if (ev.matches) {
        // logic
    }
});

mobile.run();
```

#### Option 2. Create a d.ts

You can override the DefaultMediaQuery interface to make it possible to infer the device property as you define it.

Override it based on the library you use.

For example:

```typescript
import 'mq-core';

declare module 'mq-core' {
    export interface DefaultMediaQuery {
        device: 'mobile' | 'tablet' | 'desktop';
    }
}
```
