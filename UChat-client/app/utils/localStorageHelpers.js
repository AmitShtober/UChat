// var localStorageHelpers = {
//     setUser: function (username, description) {
//         localStorage.setItem("user_nickname", username);
//         localStorage.setItem("user_description", description);
//     },
//     getUser: function () {
//         return {
//             user_nickname: localStorage.getItem("user_nickname"), 
//             user_description: localStorage.getItem("user_description")
//         };
//     },
//     clearData: function(){
//         localStorage.setItem("user_nickname", '');
//         localStorage.setItem("user_description", '');
//     },
//     isUserLogged: function(){
//         if(localStorage.getItem("user_nickname") != '' && localStorage.getItem("user_nickname") != undefined){
//             return true;
//         }
//         return false;
//     }
// };


var user_nickname = "";
var user_description = "";

// mock
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