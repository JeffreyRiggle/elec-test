import React from 'react';
import {render} from 'react-dom';
import {ipcRenderer, remote} from 'electron';

class App extends React.Component {
    constructor(props) {
        super(props);

        ipcRenderer.send('tray', {
            id: 'React Test',
            item: {
                label: 'React Test',
                click: () => {
                    console.log('Hello from react');
                }
            }
        });
    }

    render () {
        return (
            <div>
                <h1>Hello Electron</h1>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));