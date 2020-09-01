import React from "react"
import ReactDOM from "react-dom"
import Highlights from "./main/Highlights";
import Banner from "./main/Banner";
import Header from "./main/Header";
import ReadMore from "./main/ReadMore";
import Disclaimer from "./main/Disclaimer";
import Footer from "./main/Footer";
import ListRoomContainer from "./house/ListRoomContainer";
import DataProvider from "./common/DataProvider";

class Site extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			logged: localStorage.getItem("token") != null, //true if the user is logged
		}
		this.renderListOrSite = this.renderListOrSite.bind(this)
	}

	renderListOrSite() {
		if(this.state.logged) {
			return (
				<DataProvider endpoint="/api/rooms/"
				render={data => <ListRoomContainer data={data}/>} />
			)
		} else {
		return (
			<React.Fragment>
				<Highlights />
				<ReadMore />
				<Disclaimer />
			</React.Fragment>
		)
		}
	}

	render() {
		return (
			<React.Fragment>
				<Header />
				<Banner />
				{this.renderListOrSite()}
				<Footer />
		 </React.Fragment>
		)
	}
}

const wrapper = document.getElementById("site-body");
wrapper ? ReactDOM.render(<Site />, wrapper) : null;