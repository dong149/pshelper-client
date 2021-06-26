// apis
let problem_id = null;
let content = null;
let input = null;

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
    // if (request.action === 'postAnalyzeAlgorithm') {
    //     if (problem_id && content && input) {
    //         // postAnalyzeAlgorithm({problem_id, content, input});
    //         // sendResponse({message: "postAnalyzeAlgorithm STARTED"});
    //     }
    // }
});
