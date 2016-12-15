var localStorageHelpers = {
    setUser: function (username, description) {
        localStorage.setItem("user_nickname", username);
        localStorage.setItem("user_description", description);
    },
    getUser: function () {
        return {
            user_nickname: localStorage.getItem("user_nickname"), 
            user_description: localStorage.getItem("user_description")
        };
    },
    clearData: function(){
        localStorage.setItem("user_nickname", '');
        localStorage.setItem("user_description", '');
    },
    isUserLogged: function(){
        if(localStorage.getItem("user_nickname") != '' && localStorage.getItem("user_nickname") != undefined){
            return true;
        }
        return false;
    },
    isUserLoggedAndMove: function (nextState, replace) {
         if (!(localStorage.getItem("user_nickname") != '' && localStorage.getItem("user_nickname") != undefined)) {
            replace({
                pathname: '/'
            });
        }
    }
};

//module.exports = localStorageHelpers;