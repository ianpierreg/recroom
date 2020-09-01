import React from "react"

export default class ReadMore extends React.Component {
  constructor(props) { super(props) }
  render() {
    return (
				<section id="cta" className="wrapper">
					<div className="inner">
						<h2>O que é o RecRoom</h2>
						<p className="weight">Sabe aquela preocupação em ter que achar uma moradia compartilhada sem saber se você
							se dará bem com atuais e futuros moradores?
							Então, Resolvemos esse problema para você!.
						</p>
						<button>Saiba mais</button>
					</div>
				</section>
    )
  }
}