import { SET_TITLE, SET_HEADERMENU } from '../../actions/ui/header';
import { combineReducers } from 'redux';

const title = (state = 'Scorpion', action) => {
    switch (action.Type) {
        case SET_TITLE:
            if (state !== action.title) {
                return action.title;
            }
            return state;
        default:
            return state;
    }
};

const headerMenu = (state = ['menu1', 'menu2'], action) => {
    switch (action.Type) {
        case SET_HEADERMENU:
            return action.menu;
        default:
            return state;
    }
};

const header = combineReducers({
    title, 
    headerMenu
});

export default header;