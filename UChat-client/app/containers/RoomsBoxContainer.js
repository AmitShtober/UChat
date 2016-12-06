var React = require('react');
var CountableBox = require('../components/Base/CountableBox');
var Room = require('../components/Rooms/Room');
var serverHelpers = require('../utils/serverHelpers');
var RoomsBox = require('../components/Rooms/RoomsBox');
var localStorageHelpers = require('../utils/localStorageHelpers');
var NotificationManager = require('react-notifications').NotificationManager

class RoomsBoxContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleNameChanged = this.handleNameChanged.bind(this);
        this.handleDescriptionChanged = this.handleDescriptionChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.newRoomNotification = this.newRoomNotification.bind(this);
        this.initRooms = this.initRooms.bind(this);

        this.state =
            {
                newRoomName: "",
                newRoomDescription: "",
                rooms: []
            };
    }

    render() {
        return (
            <RoomsBox
                rooms={this.state.rooms}
                newRoomName={this.state.newRoomName}
                currentRoomName={this.props.roomName}
                onRoomNameChanged={this.handleNameChanged}
                newRoomDescription={this.state.newRoomDescription}
                onRoomDescriptionChanged={this.handleDescriptionChanged}
                onRoomSubmit={this.handleSubmit} />
        )
    }

    isRoomsExists(roomObject) {
        var found = false;
        var rooms = this.state.rooms;

        rooms.forEach(function (item) {
            if (item.name.toLowerCase() == roomObject.name.toLowerCase()) {
                found = true;
            }
        }, this);

        return found;
    }

    newRoomNotification(data) {

        if (!isRoomsExists(data)) {
            var allRooms = this.state.rooms;
            var newRoom = { name: data["name"], description: data["description"], link: `/#/room/${data["name"]}` };

            allRooms.push(newRoom);

            this.setState({
                newRoomName: "",
                newRoomDescription: "",
                rooms: allRooms.sort()
            });
        }
    }

    initRooms(data) {
        var rooms = [];

        data.forEach(function (item) {
            var newRoom = { name: item["name"], description: item["description"], link: `/#/room/${item["name"]}` };
            rooms.push(newRoom);
        });

        this.setState({
            newRoomName: "",
            newRoomDescription: "",
            rooms: rooms.sort()
        });

    }

    handleNameChanged(event) {
        this.setState({ newRoomName: event.target.value });
    }

    handleDescriptionChanged(event) {
        this.setState({ newRoomDescription: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        var newRoomName = this.state.newRoomName;
        var newRoomDescription = this.state.newRoomDescription;

        if (newRoomName == '') {
            NotificationManager.error("You can't use an empty room name...");
            return;
        }

        var allRooms = this.state.rooms;

        var newRoom = { name: newRoomName, description: newRoomDescription, link: `/#/room/${newRoomName}` };

        if (this.isRoomsExists(newRoom)) {
            NotificationManager.error("This room name is already in use!");
            this.setState({
                newRoomName: ""
            });
        } else {
            serverHelpers.addRoom(newRoom, function (isCreated) {
                if (isCreated) {
                    allRooms.push(newRoom);
                    this.setState({
                        newRoomName: "",
                        newRoomDescription: "",
                        rooms: allRooms.sort()
                    });

                    NotificationManager.success("The room was added!");

                } else {
                    NotificationManager.error("There was an error while trying to add a room! please try agagin");
                }
            }.bind(this));
        }
    }

    componentDidMount(s, d) {
        serverHelpers.registerToNewRoom(this.newRoomNotification);
        serverHelpers.getRooms(this.initRooms);

    }

    componentWillUnmount(s, d) {
        serverHelpers.unRegisterToNewRoom(this.newRoomNotification);
    }
}


module.exports = RoomsBoxContainer;