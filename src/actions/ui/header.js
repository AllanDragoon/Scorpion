export const SET_TITLE = 'SET_TITLE';
export const SET_HEADERMENU = 'SET_HEADERMENU';


export const setTitle = (title) => ({
    type: SET_TITLE,
    title
});

export const setHeaderMenu = (menu) => ({
    type: SET_HEADERMENU,
    menu
});