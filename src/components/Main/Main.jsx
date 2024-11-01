import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Olá!</span>
              </p>
              <p>Como posso lhe ajudar hoje?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>
                  Sugestões de lugares incríveis para visitar em uma futura
                  viagem.
                </p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Resumir brevemente planejamento urbano</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>
                  Brainstorming de atividades de integração da equipe para o
                  trabalho.
                </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Tornar o código a seguir mais legível</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box" aria-label="Insira um comando aqui">
            <input
              onChange={(event) => setInput(event.target.value)}
              value={input}
              type="text"
              placeholder="Pergunte ao Gemini"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
            </div>
          </div>
          <p className="bottom-info">
            O Gemini pode exibir informações incorretas, até mesmo sobre
            pessoas. Dessa forma, por favor, verifique a veracidade das
            informações. Privacidade e Apps do Gemini
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
