// apis
const baseURL = 'http://localhost:8080';
let problem_id = null;
let content = null;
let input = null;

function postHighlight(prameter) {
    console.log('postHighlight');
    const req = new XMLHttpRequest();

    let url = baseURL + `/api/v1/passage/highlight`;
    const urlParams = JSON.stringify(prameter);

    req.open('POST', url, true);
    req.responseType = 'json';
    req.setRequestHeader('Content-type', 'application/json');

    req.onload = () => {
        var data = req.response.data;
        console.log(data);
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { content: 'addHighlightdDOM', result: data.content },
                    function (response) {
                        if (response) {
                            console.log(response);
                        }
                    }
                );
            }
        );
    };
    req.send(urlParams);
}

function turnOffHighlight() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            { content: 'turnOffHighlight' },
            function (response) {
                if (response) {
                    console.log(response);
                }
            }
        );
    });
}

/*global chrome*/
chrome.runtime.onInstalled.addListener(function (details) {
    // This gets once the extension is installed on browser
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // Get called when page URL is updated or refreshed
    chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse
    ) {
        if (request.object && request.object.action === 'getDOM') {
            console.log(sender.url.substr(32));
            problem_id = +sender.url.substr(32);
            content = request.object.description;
            input = request.object.input;
            sendResponse({ message: 'getDOM FINISHED' });
        }
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    if (request.action === 'postHighlight') {
        // sendResponse({ message: 'postHighlight STARTED' });
        if (problem_id && content && input) {
            postHighlight({ problem_id, content, input });
            sendResponse({ message: 'postHighlight STARTED' });
        }
    }
    if (request.action === 'turnOffHighlight') {
        turnOffHighlight();
        sendResponse({ message: 'turnOffHighlight STARTED' });
    }
});
