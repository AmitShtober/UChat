var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var BoxHeader = require('../../components/Base/BoxHeader');

class Box extends React.Component {
    render() {
        return (
            <div className="chat_window" style={{ marginBottom: this.props.marginBottom }}>
                <BoxHeader header={this.props.header}
                    color={this.props.color} />
                {this.props.children}
            </div>
        )
    }
}

module.exports = Box;