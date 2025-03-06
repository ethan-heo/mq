## Nextjs Example

### Usage

```typescript
useMediaQuery({
    //...
});
```

If you use the above definition in the hydration process of Nextjs, an error will occur. The reason is that the server and client rendering results are different depending on the returned value. Therefore, to avoid errors, you should use it as follows.

```typescript
useMediaQuery(
    {
        //...
    },
    DEFAULT_VALUE,
);
```

You can set the default values as shown above to make the server and client rendering results the same. However, in the above case, the screen of the requested agent is unknown, so you may need to preprocess to set a separate default value.
