/* global angular */
(function() {
    'use strict'

    angular.module('client.layout', ['ui.router']).config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('site', {
                abstract: true,
                views: {
                    root: {
                        templateUrl: 'client/layout/layout.tpl.html'
                    }
                    ,
                    'navbar@site': {
                        templateUrl: 'client/layout/navbar/navbar.html',
                        controller: 'navbarController as navbarCtrl',
                    }
                }
            })
    }
})()

