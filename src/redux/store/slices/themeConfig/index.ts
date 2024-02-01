import themeConfig from "@/theme.config";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkMode: false,
    sidebar: false,
    theme: themeConfig.theme,
    menu: themeConfig.menu,
    layout: themeConfig.layout,
    rtlClass: themeConfig.rtlClass,
    animation: themeConfig.animation,
    navbar: themeConfig.navbar,
    locale: themeConfig.locale,
    semidark: themeConfig.semidark,
    languageList: [
        { code: 'zh', name: 'Chinês' },
        { code: 'en', name: 'Inglês' },
        { code: 'fr', name: 'Francês' },
        { code: 'de', name: 'Alemão' },
        { code: 'el', name: 'Grego' },
        { code: 'it', name: 'Italiano' },
        { code: 'ja', name: 'Japonês' },
        { code: 'pl', name: 'Polonês' },
        { code: 'pt', name: 'Portugues' },
        { code: 'ru', name: 'Russo' },
        { code: 'es', name: 'Espanhol' },
        { code: 'sv', name: 'Suíço' },
    ],
}

const themeConfigSlice = createSlice({
    name: 'themeConfig',
    initialState,
    reducers: {
        toggleTheme: (state, { payload }) => {
            payload = payload || !state.theme;
            localStorage.setItem('theme', payload);
            state.theme = payload;
            if (payload === 'light') {
                state.isDarkMode = false;
            } else if (payload === 'dark') {
                state.isDarkMode = true;
            } else if (payload === 'system') {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    state.isDarkMode = true;
                } else {
                    state.isDarkMode = false;
                }
            }

            if (state.isDarkMode) {
                document.querySelector('body')?.classList.add('dark');
            } else {
                document.querySelector('body')?.classList.remove('dark');
            }
        },
        toggleMenu: (state, { payload }) => {
            payload = payload || !state.menu;
            state.sidebar = false;
            localStorage.setItem('menu', payload);
            state.menu = payload;
        },
        toggleLayout: (state, { payload }) => {
            payload = payload || !state.layout;
            localStorage.setItem('layout', payload);
            state.layout = payload;
        },
        toggleRtl: (state, { payload }) => {
            payload = payload || !state.rtlClass;
            localStorage.setItem('rtlClass', payload);
            state.rtlClass = payload;
            document.querySelector('html')?.setAttribute('dir', state.rtlClass || 'ltr');
        },
        toggleAnimation: (state, { payload }) => {
            payload = payload || !state.animation;
            payload = payload;
            localStorage.setItem('animation', payload);
            state.animation = payload;
        },
        toggleNavbar: (state, { payload }) => {
            payload = payload || !state.navbar;
            localStorage.setItem('navbar', payload);
            state.navbar = payload;
        },
        toggleSemidark: (state, { payload }) => {
            payload = payload === true || payload === 'true' ? true : false;
            localStorage.setItem('semidark', payload);
            state.semidark = payload;
        },
        toggleLocale: (state, { payload }) => {
            payload = payload || state.locale;
            localStorage.setItem('i18nextLng', payload);
            state.locale = payload;
        },
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar;
        },
        setPageTitle: (state, { payload }) => {
            document.title = `${payload} - Painel Fui Service`
        }
    },
});

export const {
    toggleTheme,
    toggleMenu,
    toggleLayout,
    toggleRtl,
    toggleAnimation,
    toggleNavbar,
    toggleSemidark,
    toggleLocale,
    toggleSidebar,
    setPageTitle
} = themeConfigSlice.actions;

export default themeConfigSlice.reducer;