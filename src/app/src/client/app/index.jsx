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
                icon: 'react.ico'
            }
        });

        ipcRenderer.on('trayReact Testclick', () => {
            ipcRenderer.send('messageDialog', {
                title: 'Context Click',
                message: 'Hello from React!'
            });
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