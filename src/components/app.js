import React, {Component} from 'react';
import Measure from 'react-measure';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import UpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import DownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import LeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

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
        this.handleNewEdge = this.handleNewEdge.bind(this);
    }

    handleMeasure(dimensions) {
        const headerHeight = 64;
        this.setState({
            width: dimensions.width,
            height: dimensions.height - headerHeight
        });
    }

    handleNewEdge(direction) {
        this.refs.editor.newEdge(direction, 4);
    }

    render() {
        const iconStyle = { 
            width: 48,
            height: 48
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
                            <FloatingActionButton iconStyle={iconStyle} onTouchTap={() => this.handleNewEdge('up')}>
                                <UpIcon />
                            </FloatingActionButton>
                        </div>
                        <div className="btn down">
                            <FloatingActionButton iconStyle={iconStyle} onTouchTap={() => this.handleNewEdge('down')}>
                                <DownIcon />
                            </FloatingActionButton>
                        </div>
                        <div className="btn left">
                            <FloatingActionButton iconStyle={iconStyle} onTouchTap={() => this.handleNewEdge('left')}>
                                <LeftIcon />
                            </FloatingActionButton>
                        </div>
                        <div className="btn right">
                            <FloatingActionButton iconStyle={iconStyle} onTouchTap={() => this.handleNewEdge('right')}>
                                <RightIcon />
                            </FloatingActionButton>
                        </div>
                    </div>
                </div>                
            </MuiThemeProvider>
        );
    }
}

export default App;