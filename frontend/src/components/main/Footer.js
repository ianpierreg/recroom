import React from "react"
import { render } from "react-dom"

export default class Footer extends React.Component {
  constructor(props) { super(props) }
  render() {
    return (
			<footer id="footer">
				<div className="inner">
					<div className="content">
						<section>
							<h3>RecRoom é um projeto experimental</h3>
							<p>
								O RecRoom trata-se de um projeto experimental, desenvolvido como trabalho de conclusão de curso.
								O <i>core</i> do sistema utiliza o algoritmo de similaridade do cosseno para definir as posições
								das casas nas listagens mostradas ao usuário. Todas moradias, perfis e atributos do sistema são
								fictícios.
							</p>
						</section>
					</div>
					<div className="copyright">
						&copy; Trabalho de conclusão de curso. <br/> Desenvolvido por <a
							href="https://www.linkedin.com/in/ian-pierre-dev/">Ian Pierre</a>.
					</div>
				</div>
			</footer>
		)
  }
}