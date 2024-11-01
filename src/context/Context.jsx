import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState(""); //entrada do usuario
  const [recentPrompt, setRecentPrompt] = useState(""); //ultima coisa que o usuario digitou
  const [previousPrompts, setPreviousPrompts] = useState([]); //lista de mensagens enviadas ao gemini
  const [showResult, setShowResult] = useState(false); //exibir a respota do algoritmo de IA e esconde a tela de boas vindas.
  const [loading, setLoading] = useState(false); //exibe a animacao de carregamento
  const [resultData, setResultData] = useState(""); //exibe a resposta do prompt

  //animacao para dar o efeito de digitacao, como se o algoritmo estivesse digitado
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
      //
      //   const response = await run(input);
    } else {
      setPreviousPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    let responseArray = response.split("**");
    let newResponse = "";
    for (let index = 0; index < responseArray.length; index++) {
      if (index === 0 || index % 2 !== 1) {
        newResponse = newResponse + responseArray[index];
      } else {
        newResponse = newResponse + "<b>" + responseArray[index] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let index = 0; index < newResponseArray.length; index++) {
      const nextWord = newResponseArray[index];
      delayPara(index, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  // onSent("Fale um pouco sobre as especificações no notebook Acer Nitro 5 An515-44-R11B, por favor.");

  const contextValue = {
    previousPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
