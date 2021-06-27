/*global chrome*/
(function () {
    function makeRoot() {
        let div = document.createElement('div');
        div.id = 'newDom';
        div.style.width = '100%';
        div.style.backgroundColor = 'red';
        return div;
    }
    function makeDiv(url) {
        let div = document.createElement('div');
        div.style.width = '7%';
        div.style.float = 'left';
        div.style.padding = '5px';
        let imgTag = document.createElement('img');
        imgTag.src = url;
        imgTag.style.width = '100%';
        imgTag.style.height = '100%';
        div.appendChild(imgTag);
        return div;
    }

    //웹페이지 내 모든 div 숨기기
    let divDoms = document.getElementsByTagName('div');
    for (let i = 0; i < divDoms.length; i++) {
        let dom = divDoms[i];
        dom.style.display = 'none';
    }
    let root = makeRoot(); //이미지를 담을 div 생성
    // let imgDoms = document.getElementsByTagName("img"); //모든 이미지 찾기
    // for(let i = 0; i < imgDoms.length; i++) {
    //   let dom = imgDoms[i];
    //   let url = dom.getAttribute("src");
    //   let divDom = makeDiv(url); //이미지가 담긴 div를 만든다
    //   root.appendChild(divDom);
    // }

    chrome.extension.getBackgroundPage().console.log('execute!');

    document.body.append(root); //body에 추가한다
})();
