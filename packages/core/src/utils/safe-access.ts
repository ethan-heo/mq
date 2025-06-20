const safeAccess = (obj: any): any => {
    if (obj === undefined) {
        return new Proxy(
            { [Symbol.toPrimitive]: () => undefined } as Record<
                string | symbol,
                any
            >,
            {
                get(_, prop) {
                    return safeAccess(_?.[prop]);
                },
            },
        );
    } else {
        return obj;
    }
};

export default safeAccess;
