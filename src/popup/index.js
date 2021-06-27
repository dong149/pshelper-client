/*global chrome*/
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as S from './styled';
import styled from 'styled-components';

const PopUp = () => {
    const [highlightIsToggled, setHighlightIsToggled] = useState(false);

    // useEffect(() => {
    //     /*global chrome*/
    // }, []);
    const handleHighLightIsToggled = () => {
        chrome.extension
            .getBackgroundPage()
            .console.log('handleHighLightIsToggled');

        if (!highlightIsToggled) {
            chrome.runtime.sendMessage(
                { action: 'postHighlight' },
                function (response) {
                    console.log(response.message);
                    chrome.extension.getBackgroundPage().console.log(response);
                }
            );
        } else {
            chrome.runtime.sendMessage(
                { action: 'turnOffHighlight' },
                function (response) {
                    console.log(response.message);
                    chrome.extension.getBackgroundPage().console.log(response);
                }
            );
        }
        setHighlightIsToggled(!highlightIsToggled);
    };
    return (
        <div className="Popup">
            <div className="Popup-body">
                <div className="App-logo">
                    <div className="Logo">PSHELPER</div>
                    <div className="Logo-sub">2021</div>
                </div>
                <div className="Input">
                    {/* <div className="Swich-body">
                            알고리즘 분류 확인
                            <S.CheckBoxWrapper>
                                <S.CheckBox
                                    id="algorithm"
                                    type="checkbox"
                                    checked={this.state.algorithmIsToggled}
                                    onChange={this.handleAlgorithmIsToggled}
                                />
                                <S.CheckBoxLabel htmlFor="algorithm" />
                            </S.CheckBoxWrapper>
                        </div> */}
                    <div className="Swich-body">
                        문장 하이라이팅 기능
                        <S.CheckBoxWrapper>
                            <S.CheckBox
                                id="highlight"
                                type="checkbox"
                                checked={highlightIsToggled}
                                onChange={() => handleHighLightIsToggled()}
                            />
                            <S.CheckBoxLabel htmlFor="highlight" />
                        </S.CheckBoxWrapper>
                    </div>
                    {/* <div className="Swich-body">
                            핵심 단어 체크 기능
                            <S.CheckBoxWrapper>
                                <S.CheckBox
                                    id="keyword"
                                    type="checkbox"
                                    checked={this.state.keywordIsToggled}
                                    onChange={this.handleKeywordIsToggled}
                                />
                                <S.CheckBoxLabel htmlFor="keyword" />
                            </S.CheckBoxWrapper>
                        </div> */}
                </div>
                <S.Footer>
                    © 2021 Patrick Ryu, Inc. All right reserved.
                </S.Footer>
            </div>
        </div>
    );
};

export default PopUp;

// ReactDOM.render(<PopUp />, document.getElementById('root'));
