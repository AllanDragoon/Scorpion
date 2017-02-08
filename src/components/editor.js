import React, {Component} from 'react';
import Grid from './grid';

class Editor extends Component {
    render() {
        return (
            <svg width='100%' height='100%'>
                <Grid />
            </svg>
        );
    }
}

export default Editor;