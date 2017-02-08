import React from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Header from './header';
import Editor from './editor';

injectTapEventPlugin();

const App = () => (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div className="app">
            <Header />
            <div className="page" id="svgcontainer">
                <Editor />       
            </div>
        </div>
    </MuiThemeProvider>
);

export default App;