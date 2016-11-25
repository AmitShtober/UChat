var user_nickname = "";
var user_description = "";

var localStorageHelpers = {
    setUser: function (username, description) {
        user_nickname = username;
        user_description = description;
    },
    getUser: function () {
        return {
            user_nickname: user_nickname,
            user_description: user_description
        };
    },
    clearData: function () {
        user_nickname = '';
        user_description = '';
    },
    isUserLogged: function () {
        if (user_nickname != '' && user_nickname != undefined) {
            return true;
        }
        return false;
    },
    isUserLoggedAndMove: function (nextState, replace) {
         if (!(user_nickname != '' && user_nickname != undefined)) {
            replace({
                pathname: '/'
            });
        }
    }
};

module.exports = localStorageHelpers;