function loadComponent(scope: any, module: any) {
    return async () => {
        //@ts-ignore
        await __webpack_init_sharing__('default');
        const container = window[scope];
        //@ts-ignore
        const shareScopes = __webpack_share_scopes__?.default;

        if (container && shareScopes) {
            //@ts-ignore
            await container.init(shareScopes);
            //@ts-ignore
            const factory = await window[scope]?.get(module);

            return factory();
        }
    };
}

export default loadComponent;
