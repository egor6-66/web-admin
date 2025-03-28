import useStateCustom from '../useStateCustom';

enum Themes {
    light = 'light',
    dark = 'dark',
}

const defaultTheme = Themes.light;

function useThemes() {
    const theme = useStateCustom<Themes>(defaultTheme, {
        storage: {
            key: 'theme',
        },
    });

    const setTheme = (value: Themes) => {
        document.documentElement.dataset.theme = value;
        theme.set(value);
    };

    const toggleBlackAndWhite = () => {
        if (theme.value === Themes.light) {
            setTheme(Themes.dark);
        } else {
            setTheme(Themes.light);
        }
    };

    const init = () => {
        document.documentElement.dataset.theme = theme.value;
    };

    return { value: theme.value, set: setTheme, toggleBlackAndWhite, init };
}

export default useThemes;
