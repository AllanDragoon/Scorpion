import React, {Component} from 'react';
import Measure from 'react-measure';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import IconButton from 'material-ui/IconButton';
import ArrowIcon from 'material-ui/svg-icons/maps/navigation';

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
        const iconStyle = { 
            width: 48,
            height: 48
        };
        const buttonStyle = {
            width: 48,
            height: 48,
            padding: 0
        };

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div className="app">
                    <Header />
                    <Measure onMeasure={this.handleMeasure}>
                        <div className="page" id="svgcontainer">
                            <Editor ref="editor" width={this.state.width} height={this.state.height} />
                        </div>
                    </Measure>
                    <div className="drawBtnContainer">
                        <div className="btn up">
                            <IconButton style={buttonStyle} iconStyle={iconStyle}>
                                <ArrowIcon />
                            </IconButton>
                        </div>
                        <div className="btn down">
                            <IconButton style={buttonStyle} iconStyle={iconStyle}>
                                <ArrowIcon />
                            </IconButton>
                        </div>
                        <div className="btn left">
                            <IconButton style={buttonStyle} iconStyle={iconStyle}>
                                <ArrowIcon />
                            </IconButton>
                        </div>
                        <div className="btn right">
                            <IconButton style={buttonStyle} iconStyle={iconStyle}>
                                <ArrowIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>                
            </MuiThemeProvider>
        );
    }
}

export default App;