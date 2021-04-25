import React from "react"
import '../../../static/frontend/css/common.css'

export default function Highlights() {
  return (
    <React.Fragment>
      <section className="wrapper">
      <div className="inner">
        <header className="special">
          <h2>Como RecRoom funciona?</h2>
        </header>
        <div className="highlights">
          <section>
            <div className="content">
              <header>
                <a href="#" className="icon fa-vcard-o"><span className="label">Icon</span></a>
                <h3>Cadastre o seu perfil</h3>
              </header>
              <p>Forneça informações básicas e responda perguntas de múltiplas escolhas para que a gente construa o seu
                perfil</p>
            </div>
          </section>
          <section>
            <div className="content">
              <header>
                <a href="#" className="icon fa-list-ol"><span className="label">Icon</span></a>
                <h3>Ranking</h3>
              </header>
              <p>Receba uma lista de moradias que mais combinam com você em forma de ranking</p>
            </div>
          </section>
          <section>
            <div className="content">
              <header>
                <a href="#" className="icon fa-star"><span className="label">Icon</span></a>
                <h3>Ajude-nos avaliando</h3>
              </header>
              <p>Por favor, avalie as opções na listagem do ranking utilizando as estrelas ao lado do nome</p>
            </div>
          </section>
        </div>
      </div>
    </section>

      <section id="cta" className="wrapper">
        <div className="inner">
          <h2>O que é o RecRoom</h2>
          <p className="weight">Sabe aquela preocupação em ter que achar uma moradia compartilhada sem saber se você se
            dará bem com atuais e futuros moradores?
            Então, Resolvemos esse problema para você!.
          </p>
          <button>Saiba mais</button>
        </div>
      </section>

      <section className="wrapper">
        <div className="inner">
          <header className="special">
            <h3>RecRoom é um projeto protótipo</h3>
            <p>
              O RecRoom trata-se de um projeto protótipo, desenvolvido como trabalho de conclusão de curso.
              O <i>core</i> do sistema utiliza o algoritmo de similaridade do cosseno para definir as posições
              das casas nas listagens mostradas ao usuário. Todas moradias, perfis de locatários e outros moradores
              da moradia do sistema são fictícios.
            </p>
          </header>
        </div>
      </section>
    </React.Fragment>
  )
}