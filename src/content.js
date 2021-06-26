/*global chrome*/
console.log('PSHELPER CONTENT.JS');
let description = null;
let input = null;
let output = null;
let problem_body = null;
let origin_problem_body = null;

if (document.getElementById('problem_description'))
    description = document.getElementById('problem_description').innerText;
if (document.getElementById('problem_input'))
    input = document.getElementById('problem_input').innerText;
if (document.getElementById('problem_output'))
    output = document.getElementById('problem_output').innerText;

if (description && input && output) {
    chrome.runtime.sendMessage(
        { object: { action: 'getDOM', description, input, output } },
        function (response) {
            console.log(response.message);
        }
    );
}

// function getDataFromDOM(selector) {
//     var domNode = document.querySelector(selector);
//     if (domNode) {
//         var content = document.querySelector(selector).textContent;
//         if (content) {
//             return content.trim();
//         }
//     }
//     return undefined;
// }
