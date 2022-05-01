import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./common/DataProvider";
import useLocalStorage from "./common/localStorageHook";
import Header from "./home/Header";
import Banner from "./home/Banner";
import Footer from "./home/Footer";
import Table from "./common/Table";
import "../../static/frontend/css/main.css";

const Instructions = () => {
  const [token, setToken] = useLocalStorage("token", null);

  return (
    <div>
      <Header token={token} setToken={setToken} />
      <div class="instructions-wrapper">
        <h2 className="instruction-subtitle">Olá, seja bem-vindo(a)</h2>
        <p className="instruction-p">
          Meu nome é Ian Pierre e eu sou aluno do curso de
          <a
            href="https://computacao.ufba.br/pt-br/bacharelado-em-sistemas-de-informacao"
            target="_blank"
          >
            {" "}
            Sistemas de Informação{" "}
          </a>
          da
          <a href="https://www.ufba.br/" target="_blank">
            {" "}
            Universidade Federal da Bahia-UFBA.{" "}
          </a>
          Obrigado por fazer parte deste experimento como participante
          voluntário, a sua avaliação é de suma importância para o sucesso
          trabalho proposto e desenvolvido.
        </p>
        <h2 className="instruction-subtitle">O que é o sistema</h2>
        <p className="instruction-p">
          O protótipo de aplicação desenvolvido é um sistema de recomendação
          baseado em conteúdo que visa ranquear as residências em que o usuário
          buscador (aquele que busca uma residência, nesse caso você, voluntário
          do experimento) que tenha maior possibilidade de afinidade com os
          moradores atuais daquela residência compartilhada.
        </p>
        <p className="instruction-p">
          A recomendação se baseia nas respostas dadas no formulário de gostos e
          interesses respondida por cada morador atual da residência
          compartilhada e pelo usuário buscador.
        </p>
        <h2 className="instruction-subtitle">Instruções</h2>
        <ol className="instruction-list">
          <li>
            Acesse a página da{" "}
            <a href="/" target="_blank">
              aplicação
            </a>{" "}
            e clique no botão “Cadastrar”, no canto superior direito. Ao ser
            clicado, este botão leva o usuário para um formulário de cadastro
            simples, basta preencher que além de fazer o cadastro, você será
            automaticamente conectado à aplicação.
          </li>
          <li>
            Clique no botão “Responder perguntas”, no canto superior direito e
            os grupos de interesses serão apresentados com suas respectivas
            opções de interesses para seleção, de forma aleatória e sucessiva,
            até que as perguntas acabem. É possível selecionar mais de um
            interesse para cada grupo de interesses. É importante que todas
            perguntas sejam respondidas.
            <br />
            Além da seleção dos interesses, o usuário deve definir o nível de
            importância daquele grupo de interesses para ele. Esse nível de
            importância irá fazer com que as respostas daquele grupo de
            interesse tenham maior relevância no cálculo de score de afinidade.
          </li>
          <li>
            Após selecionar os seus interesses, o usuário buscador receberá um
            ranking das residências em ordem decrescente do score de afinidade
            do usuário buscador para aquela moradia. Todas as casas do ranking
            têm os mesmos atributos gerais (preço, tamanho, imagem e etc) para
            que o foco da avaliação seja única e exclusivamente à semelhança de
            perfil entre os moradores atuais e usuário buscador.
          </li>
          <li>
            Para avaliar a recomendação de uma residência, clique no botão
            “Avaliar” do lado esquerdo da residência. Na página que será aberta,
            é possível ver os principais interesses em comum com os moradores
            daquela residência. Além disso, é possível atribuir uma nota de 1 a
            5 àquela avaliação (onde 1 indica que não gostou daquele residência
            e 5 indica que você gostou muito) e, opcionalmente, deixar um
            comentário sobre a avaliação.
          </li>
        </ol>
        <h2 className="instruction-subtitle">Em caso de dúvida,</h2>
        <p className="instruction-p question">
          ou algum problema no uso da ferramenta, entre em contato através do
          email ianpierreg@gmail.com.
        </p>
      </div>
      <div class="go-to-app">
        <a className="button is-success" href="/">
          Ir para aplicação
        </a>
      </div>
      <Footer />
    </div>
  ); 
};

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Instructions />, wrapper) : null;
