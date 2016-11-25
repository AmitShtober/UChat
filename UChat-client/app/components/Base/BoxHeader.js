var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');

class BoxHeader extends React.Component {
    render() {
        var headerClass = 'top_menu';
        var titleClass = 'title';
        if (this.props.color == 'blue') headerClass += ' blue';
        if (this.props.color == 'blue') titleClass += ' blue';
        return (
            <div className={headerClass}>
                <div className="buttons">
                    <div className="button close"></div>
                    <div className="button minimize"></div>
                    <div className="button maximize"></div>
                </div>
                <div className={titleClass}>{this.props.header}</div>
            </div>
        )
    }
}


module.exports = BoxHeader;