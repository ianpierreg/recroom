import React from "react"

export default class Highlights extends React.Component {
  constructor(props) { super(props) }

  render() {
    return (
				<section className="wrapper">
					<div className="inner">
						<div className="highlights">
							<section>
								<div className="content">
									<header>
										<a href="#" className="icon fa-vcard-o"><span className="label">Icon</span></a>
										<h3>Cadastre o seu perfil</h3>
									</header>
									<p>Forneça informações básicas e responda perguntas de múltiplas escolhas para que a gente construa o
										seu perfil</p>
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
    )
  }
}
