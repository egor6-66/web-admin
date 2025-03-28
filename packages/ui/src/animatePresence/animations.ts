const animations = {
    fadeInFadeOut: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
    fullHeight: {
        initial: { height: 0 },
        animate: { height: '100%' },
        exit: { height: 0 },
    },
    autoHeight: {
        initial: { height: 0 },
        animate: { height: 'auto' },
        exit: { height: 0 },
    },
};

export default animations;
