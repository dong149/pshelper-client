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

chrome.extension.onMessage.addListener(function (
    request,
    sender,
    sendResponse
) {
    if (request.content && request.content === 'addAlgorithmDOM') {
        if (document.getElementById('problem-body')) {
            if (document.getElementById('algorithm')) {
                console.log('Already updated');
            } else {
                console.log('addAlgorithmDOM');
                const result = Object.keys(request.result);
                console.log(result);
                let algorithm = '';
                result.forEach((algo, i) => {
                    if (i === result.length - 1) {
                        algorithm += `${algo} : ${request.result[algo]} <br>`;
                    } else {
                        algorithm += `${algo} : ${request.result[algo]}, `;
                    }
                });
                problem_body =
                    document.getElementById('problem-body').innerHTML;
                document.getElementById('problem-body').innerHTML =
                    `<div class="col-md-12" style="margin-bottom: 15px;">
        <section id="algorithm" class="problem-section">
        <div class="headline">
        <h2 style="border-bottom: 2px solid rgb(218,71,103) !important;">추천 알고리즘</h2>
        </div>
        <div id="problem_algorithm" class="problem-text">
        <p>` +
                    algorithm +
                    `</p>
        </div>
        </section>
        </div>` +
                    problem_body;
            }
        }

        sendResponse({ content: 'addAlgorithmDOM FINISHED!' });
        return true; // This is required by a Chrome Extension
    }
    if (request.content && request.content === 'addKeywordDOM') {
        if (document.getElementById('problem_description')) {
            origin_problem_body = document.getElementById(
                'problem_description'
            );
            const keyword_list = Object.keys(request.result.keyword_list);
            keyword_list.forEach((keyword) => {
                let keyword_obj = request.result.keyword_list[keyword];
                const algorithm_list = Object.keys(keyword_obj);
                let hover_content = '';
                algorithm_list.forEach((algo) => {
                    hover_content = `${algo}: ${keyword_obj[algo]}
          `;
                });

                request.result.highlighted_text =
                    request.result.highlighted_text.replace(
                        `${keyword}`,
                        `<abbr title="${hover_content}">${keyword}</abbr>`
                    );
            });
            document.getElementById(
                'problem_description'
            ).innerHTML = `<p>${request.result.highlighted_text}</p>`;
        }

        sendResponse({ content: 'addKeywordDOM FINISHED!' });
        return true; // This is required by a Chrome Extension
    }
    if (request.content && request.content === 'addHighlightdDOM') {
        if (document.getElementById('problem-body')) {
            if (document.getElementById('highlight')) {
                console.log('Already updated');
            } else {
                const result = request.result;
                console.log(request);
                let sentences = '';
                result.forEach((sen) => {
                    // sentences += sen + `<br>`;
                    sentences += `<p>` + sen + `</p>`;
                });
                if (document.getElementById('algorithm')) {
                    document.getElementById('algorithm').innerHTML =
                        document.getElementById('algorithm').innerHTML +
                        `<section id="highlight" class="problem-section">
          <div class="headline">
          <h2 style="border-bottom: 2px solid rgb(218,71,103) !important;">문제</h2>
          </div>
          <div id="problem_highlight" class="problem-text">
        ` +
                        sentences +
                        `
          </div>
          </section>`;
                } else {
                    problem_body =
                        document.getElementById('problem-body').innerHTML;
                    document.getElementById('problem-body').innerHTML =
                        `<div class="col-md-12">
        <section id="highlight" class="problem-section">
        <div class="headline">
        <h2 style="border-bottom: 2px solid rgb(218,71,103) !important;">문제</h2>
        </div>
        <div id="problem_highlight" class="problem-text">
        <p>` +
                        sentences +
                        `</p>
        </div>
        </section>
        </div>` +
                        problem_body;
                }
            }

            sendResponse({ content: 'addHighlightdDOM FINISHED!' });
            return true; // This is required by a Chrome Extension
        }
    }

    if (request.content && request.content === 'turnOffAnalyzeAlgorithm') {
        if (document.getElementById('problem-body')) {
            if (document.getElementById('algorithm')) {
                document.getElementById('problem-body').innerHTML = document
                    .getElementById('problem-body')
                    .innerHTML.replace(
                        document.getElementById('algorithm').innerHTML,
                        ''
                    );
                sendResponse({ content: 'turnOffAnalyzeAlgorithm FINISHED!' });
                return true; // This is required by a Chrome Extension
            }
        }
    }

    if (request.content && request.content === 'turnOffHighlight') {
        if (document.getElementById('problem-body')) {
            if (document.getElementById('highlight')) {
                document.getElementById('problem-body').innerHTML = document
                    .getElementById('problem-body')
                    .innerHTML.replace(
                        document.getElementById('highlight').innerHTML,
                        ''
                    );
                sendResponse({ content: 'turnOffHighlight FINISHED!' });
                return true; // This is required by a Chrome Extension
            }
        }
    }

    if (request.content && request.content === 'turnOffKeyword') {
        if (document.getElementById('problem-body')) {
            if (origin_problem_body) {
                document.getElementById('problem-body').innerHTML =
                    origin_problem_body;
                sendResponse({ content: 'turnOffKeyword FINISHED!' });
                return true; // This is required by a Chrome Extension
            }
        }
    }
});
