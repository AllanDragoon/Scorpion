import React, {Component} from 'react';
import Measure from 'react-measure';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Header from './header';
import Editor from './editor';

injectTapEventPlugin();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: undefined, 
            height: undefined
        };

        this.handleMeasure = this.handleMeasure.bind(this);
    }

    handleMeasure(dimensions) {
        this.setState({
            width: dimensions.width,
            height: dimensions.height
        });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div className="app">
                    <Header />
                    <Measure onMeasure={this.handleMeasure}>
                        <div className="page" id="svgcontainer">
                            <Editor ref="editor" width={this.state.width} height={this.state.height} />
                        </div>
                    </Measure>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;