/*global chrome*/
import React from 'react';
function App() {
    const onTest = () => {
        console.log('test');
        chrome.extension
            .getBackgroundPage()
            .console.log('handleAlgorithmIsToggled');
    };

    return (
        <div className="App">
            <button onClick={() => onTest()}>test</button>
        </div>
    );
}

export default App;
