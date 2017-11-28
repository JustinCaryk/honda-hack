(function () {
    'use strict';
    angular.module('client.layout')
        .controller('navbarController', NavBarController)
  
        NavBarController.$inject = ['$window','userService'];
  
    function NavBarController($window, userService) {
        var $ctrl = this;

        $ctrl.logout = () => {
            userService.logout()
                .then(_onLogoutSuccess)
                .catch(_onError);
        }
       
        function _onLogoutSuccess(res) {
            console.log(res)
            localStorage.clear();
            $window.location.href = '/';
        }
        function _onError(err) {
            console.log(err);
        }
    }
})();