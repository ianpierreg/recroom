import React from "react"

export default class Disclaimer extends React.Component {
  constructor(props) { super(props) }
  render() {
    return (
			<section className="wrapper">
				<div className="inner">
					<header className="special">
						<h3>RecRoom é um projeto experimental</h3>
						<p>
							O RecRoom trata-se de um projeto experimental, desenvolvido como trabalho de conclusão de curso.
							O <i>core</i> do sistema utiliza o algoritmo de similaridade do cosseno para definir as posições
							das casas nas listagens mostradas ao usuário. Todas moradias, perfis e atributos do sistema são
							fictícios.
						</p>
					</header>
				</div>
			</section>
		)
  }
}