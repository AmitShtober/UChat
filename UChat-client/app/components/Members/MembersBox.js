var React = require('react');
var CountableBox = require('../../components/Base/CountableBox');

class MembersBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		
		var i = 0;

		var members = this.props.clients.map((item) =>
			<li key={i++}>{item}</li>
		);

		var count = members.length;

		return (
			<CountableBox marginBottom='20px' count={count} header="Room's Members" color="blue">
				<ul className="sideBox">
					{members}
				</ul>
			</CountableBox>
		)
	}
}


module.exports = MembersBox;