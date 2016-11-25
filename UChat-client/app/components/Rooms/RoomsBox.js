var React = require('react');
var CountableBox = require('../../components/Base/CountableBox');
var Room = require('../../components/Rooms/Room');
var serverHelpers = require('../../utils/serverHelpers');

class RoomsBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        var i = 0;

        var rooms = this.props.rooms.sort(function (r1, r2) {
            return ((r1.name).localeCompare(r2.name));
        }).map((item) => <Room key={i++} text={item.name} description={item.description} />);

        var roomsCount = rooms.length;
        
        return (
                <CountableBox header="Rooms" count={roomsCount}>
                    <ul className="sideBox">
                        {rooms}
                    </ul>
                    <div className="row">
                        <div className="col-md-11" style={{ marginBottom: 10 + 'px', marginLeft: 15 + 'px', marginTop: 0 + 'px', marginRight: 10 + 'px' }}>
                            <form>
                                <div className="input-group">
                                    <input type="text"
                                        style={{ width: 49 + '%' }}
                                        className="form-control"
                                        value={this.props.newRoomName}
                                        onChange={this.props.onRoomNameChanged}
                                        placeholder="Choose Name.." />
                                    <input type="text"
                                        className="form-control"
                                        value={this.props.newRoomDescription}
                                        style={{ width: 49 + '%', marginLeft: 3 + 'px' }}
                                        onChange={this.props.onRoomDescriptionChanged}
                                        placeholder="description.." />
                                    <span className="input-group-btn">
                                        <button onClick={this.props.onRoomSubmit}  className="btn btn-default"
                                            type="submit">Go!</button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </CountableBox>
        )
    }
}

module.exports = RoomsBox;