"use strict";
angular.module("map", ["ngAria", "ngTouch", "ui.router", "ngAnimate", "angularPubsub", "matchMedia"]),
    function(angular) {
        function AppConfig($stateProvider, $urlRouterProvider, $logProvider) {
            $logProvider.debugEnabled(!1), $urlRouterProvider.otherwise("/map"), $stateProvider.state("main", {
                url: "/",
                templateUrl: "http://0098.client-qa.com/templates/main/",
                controller: "MainCtrl",
                controllerAs: "vm"
            }).state("main.map", {
                url: "map",
                templateUrl: "http://0098.client-qa.com/templates/map/",
                controller: "MapCtrl",
                controllerAs: "vm",
                resolve: {
                    MapData: ["DataService", function(DataService) {
                        return DataService.load()
                    }]
                }
            }).state("main.map.region", {
                url: "region/:regionName",
                templateUrl: "http://0098.client-qa.com/templates/region/",
                controller: "RegionCtrl",
                controllerAs: "vm",
                resolve: {
                    RegionData: ["DataService", "$stateParams", function(DataService, $stateParams) {
                        return DataService.getRegionByName($stateParams.regionName)
                    }]
                }
            }).state("main.map.region.propertydetails", {
                url: "/:propertyName/details",
                templateUrl: "http://0098.client-qa.com/templates/region-propertydetails/",
                controller: "PropertyDetailsCtrl",
                controllerAs: "vm",
                resolve: {
                    PropertyData: ["DataService", "$stateParams", function(DataService, $stateParams) {
                        return DataService.getPropertyDetails($stateParams.regionName, $stateParams.propertyName)
                    }]
                }
            }).state("main.list", {
                url: "list",
                templateUrl: "http://0098.client-qa.com/templates/list/",
                controller: "ListCtrl",
                controllerAs: "vm",
                resolve: {
                    ListData: ["DataService", function(DataService) {
                        return DataService.load()
                    }]
                }
            })
        }
        angular.module("map").config(AppConfig), AppConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$logProvider"]
    }(angular),
    function(angular) {
        angular.module("map").constant("PUBSUB_MESSAGES", {
            MSG_PANEL_OPEN: "panelIsOpen",
            MSG_PANEL_CLOSED: "panelIsClosed",
            MSG_LIST_VIEW_OPEN: "listViewSelected",
            MSG_MAP_VIEW_OPEN: "mapViewSelected",
            MSG_MAP_VIEW_RESET: "mapViewReset",
            PARENT_SIZE_REFRESH_REQUESTED: "parentSizeRefreshRequested"
        }).constant("CONSTANTS", {
            HASH_PREFIX: "pid-"
        })
    }(angular),
    function(angular) {
        function imageOnLoad(PubSub, PUBSUB_MESSAGES) {
            function imageLink(scope, elem, attrs, controller) {
                function onLoaded() {
                    PubSub.publish(PUBSUB_MESSAGES.PARENT_SIZE_REFRESH_REQUESTED)
                }

                function onError() {
                    PubSub.publish(PUBSUB_MESSAGES.PARENT_SIZE_REFRESH_REQUESTED)
                }
                elem.on("load", onLoaded), elem.on("error", onError), scope.$on("$destroy", function() {
                    elem.off("load", onLoaded), elem.off("error", onError)
                })
            }
            return {
                scope: {},
                restrict: "A",
                link: imageLink
            }
        }
        angular.module("map").directive("imageOnLoad", imageOnLoad)
    }(angular),
    function(angular) {
        function markerWithCounter($log, $state) {
            function MarkerWithCounterLink(scope, elem, attrs, controller) {
                elem.css("text-decoration", "none"), elem.css("position", "absolute"), elem.css("z-index", "200"), elem.css("left", controller.markerData.left + "%"), elem.css("top", controller.markerData.top + "%")
            }
            return {
                scope: {},
                restrict: "AE",
                templateUrl: "http://0098.client-qa.com/directives/marker-with-counter/",
                controller: MarkerWithCounterCtrl,
                link: MarkerWithCounterLink,
                controllerAs: "vm",
                bindToController: {
                    count: "=",
                    markerData: "="
                }
            }
        }

        function MarkerWithCounterCtrl($log) {
            var vm = this;
            $log.debug("[Marker with Counter] Created. count: " + vm.count + " markerData: {left: " + vm.markerData.left + " top: " + vm.markerData.top + "}")
        }
        angular.module("map").directive("markerWithCounter", markerWithCounter), MarkerWithCounterCtrl.$inject = ["$log"]
    }(angular),
    function(angular) {
        function propertyColumn($log, $state) {
            return {
                scope: {},
                restrict: "AE",
                templateUrl: "http://0098.client-qa.com/directives/property-column/",
                controller: PropertyColumnCtrl,
                controllerAs: "vm",
                bindToController: {
                    data: "="
                }
            }
        }

        function PropertyColumnCtrl($log, $location, $anchorScroll, CONSTANTS) {
              //console.log("my function calling");
            var vm = this;
            vm.title = vm.data.title.toUpperCase(), vm.onClick = function(value) {
                 alert(vm.title);
                var normalizedValue = CONSTANTS.HASH_PREFIX + value.replace(/\s+/g, "").toLowerCase();
                $location.hash(normalizedValue)
            }
      
        }
        angular.module("map").directive("propertyColumn", propertyColumn), PropertyColumnCtrl.$inject = ["$log", "$location", "$anchorScroll", "CONSTANTS"]
    }(angular),
    function(angular) {
        function propertyDetailsPanel($log, $state) {
            return {
                scope: {},
                restrict: "AE",
                templateUrl: "https://0098.client-qa.com/directives/property-details-panel/",
                controller: PropertyDetailsPanelCtrl,
                controllerAs: "vm",
                bindToController: {
                    data: "="
                }
            }
        }

        function PropertyDetailsPanelCtrl($log, PubSub, PUBSUB_MESSAGES, screenSize) {
            var vm = this;
            vm.image = vm.data.data.image, vm.book = vm.data.data.book, vm.explore = vm.data.data.explore, vm.name = vm.data.data.name.toUpperCase(), vm.address = vm.data.data.address.toUpperCase(), vm.isTablet = screenSize.on("tablet", function(match) {
                vm.isTablet = match
            }), PubSub.publish(PUBSUB_MESSAGES.MSG_PANEL_OPEN), PubSub.publish(PUBSUB_MESSAGES.PARENT_SIZE_REFRESH_REQUESTED), vm.onCloseClick = function() {
                PubSub.publish(PUBSUB_MESSAGES.MSG_PANEL_CLOSED), PubSub.publish(PUBSUB_MESSAGES.PARENT_SIZE_REFRESH_REQUESTED)
            }
        }
        angular.module("map").directive("propertyDetailsPanel", propertyDetailsPanel), PropertyDetailsPanelCtrl.$inject = ["$log", "PubSub", "PUBSUB_MESSAGES", "screenSize"]
    }(angular),
    function(angular) {
        function propertyMarker($log, $state) {
            function PropertyMarkerLink(scope, elem, attrs, controller) {
                elem.css("position", "absolute"), elem.css("left", controller.markerData.left + "%"), elem.css("top", controller.markerData.top + "%")
            }
            return {
                scope: {},
                restrict: "AE",
                templateUrl: "https://0098.client-qa.com/directives/property-marker/",
                controller: PropertyMarkerCtrl,
                link: PropertyMarkerLink,
                controllerAs: "vm",
                bindToController: {
                    data: "="
                }
            }
        }

        function PropertyMarkerCtrl($log, screenSize) {
            var vertClass, horClass, vm = this;
            vm.markerData = vm.data["marker-data"], vm.hovered = !1, vm.name = vm.data.name, vm.address = vm.data.address, vm.isTablet = screenSize.on("tablet", function(match) {
                vm.isTablet = match
            }), vertClass = vm.markerData.top > 80 ? "talkbubble-over" : "talkbubble-under", horClass = vm.markerData.left > 70 ? "talkbubble-right" : "talkbubble-left", vm.bubbleClass = vertClass + " " + horClass, $log.debug("[Property Counter] Created.  markerData: {left: " + vm.markerData.left + " top: " + vm.markerData.top + "}")
        }
        angular.module("map").directive("propertyMarker", propertyMarker), PropertyMarkerCtrl.$inject = ["$log", "screenSize"]
    }(angular),
    function(angular) {
        function ListCtrl(DataService, ListData, $log, CONSTANTS, PubSub, PUBSUB_MESSAGES) {
            $log.debug("If you can see this message you are outputting DEBUG log messages. For production turn off the debug logs in the map config file.");
            var vm = this;
            PubSub.publish(PUBSUB_MESSAGES.MSG_LIST_VIEW_OPEN), angular.forEach(ListData.regions, function(value, key) {
                $log.debug("[ListCtrl] Map Data ID: " + key + " | Property Count: " + value.length)
            }), vm.regions = ListData.regions, vm.generateId = function(value) {
                return CONSTANTS.HASH_PREFIX + value.replace(/\s+/g, "").toLowerCase()
            }, vm.isEven = function(n) {
                return n % 2 == 0
            }
        }
        angular.module("map").controller("ListCtrl", ListCtrl), ListCtrl.$inject = ["DataService", "ListData", "$log", "CONSTANTS", "PubSub", "PUBSUB_MESSAGES"]
    }(angular),
    function(angular) {
        function MainCtrl($log, PubSub, PUBSUB_MESSAGES, $window, $document, $timeout, screenSize) {
            function onSizeRefreshRequest() {
                $timeout(function() {
                    var width = angular.element($document[0].documentElement)[0].scrollWidth,
                        height = angular.element($document[0].body)[0].offsetHeight;
                    lastWidth === width && lastHeight === height || (lastWidth = width, lastHeight = height, $window.parent.postMessage(JSON.stringify({
                        type: currentMessage,
                        height: height
                    }), "*"))
                })
            }

            function onListSelect() {
                $log.debug("MainCtrl: List View Selected"), vm.mapIsActive = !1, vm.listIsActive = !0, currentMessage = PUBSUB_MESSAGES.MSG_LIST_VIEW_OPEN, $timeout(function() {
                    var width = angular.element($document[0].documentElement)[0].scrollWidth,
                        height = angular.element($document[0].body)[0].offsetHeight + 1;
                    $log.debug("MainCtrl: body height: ", height), lastWidth = width, lastHeight = height, $window.parent.postMessage(JSON.stringify({
                        type: currentMessage,
                        height: height
                    }), "*")
                })
            }

            function onMapSelect() {
                $log.debug("MainCtrl: Map View Selected"), vm.mapIsActive = !0, vm.listIsActive = !1, currentMessage = PUBSUB_MESSAGES.MSG_MAP_VIEW_OPEN, $timeout(function() {
                    var width = angular.element($document[0].documentElement)[0].scrollWidth,
                        height = angular.element($document[0].body)[0].offsetHeight + 1;
                    $log.debug("MainCtrl: body height: ", height), lastWidth = width, lastHeight = height, $window.parent.postMessage(JSON.stringify({
                        type: currentMessage,
                        height: height
                    }), "*")
                })
            }
            $log.debug("If you can see this message you are outputting DEBUG log messages. For production turn off the debug logs in the map config file.");
            var currentMessage, lastWidth, lastHeight, vm = this;
            vm.mapIsActive = !1, vm.listIsActive = !1, PubSub.subscribe(PUBSUB_MESSAGES.MSG_LIST_VIEW_OPEN, onListSelect), PubSub.subscribe(PUBSUB_MESSAGES.MSG_MAP_VIEW_OPEN, onMapSelect), PubSub.subscribe(PUBSUB_MESSAGES.PARENT_SIZE_REFRESH_REQUESTED, onSizeRefreshRequest), screenSize.rules = {
                tablet: "(max-width: 768px)"
            }, angular.element($window).bind("resize", function() {
                onSizeRefreshRequest()
            }), vm.onMapLinkClicked = function() {
                currentMessage = PUBSUB_MESSAGES.MSG_MAP_VIEW_OPEN, $log.debug("MainCtrl: Map Link Clicked"), PubSub.publish(PUBSUB_MESSAGES.MSG_MAP_VIEW_RESET)
            }
        }
        angular.module("map").controller("MainCtrl", MainCtrl), MainCtrl.$inject = ["$log", "PubSub", "PUBSUB_MESSAGES", "$window", "$document", "$timeout", "screenSize"]
    }(angular),
    function(angular) {
        function MapCtrl(DataService, MapData, $log, PubSub, PUBSUB_MESSAGES) {
            function onMapReset() {
                vm.currentSection = void 0
            }
            $log.debug("If you can see this message you are outputting DEBUG log messages. For production turn off the debug logs in the map config file.");
            var vm = this;
            PubSub.publish(PUBSUB_MESSAGES.MSG_MAP_VIEW_OPEN), PubSub.subscribe(PUBSUB_MESSAGES.MSG_MAP_VIEW_RESET, onMapReset), angular.forEach(MapData.regions, function(value, key) {
                $log.debug("[MapCtrl] Map Data ID: " + key + " | Property Count: " + value.length)
            }), vm.regions = MapData.regions, vm.currentSection = void 0, vm.setCurrentSection = function(name) {
                vm.currentSection = name, PubSub.publish(PUBSUB_MESSAGES.MSG_PANEL_CLOSED), PubSub.publish(PUBSUB_MESSAGES.PARENT_SIZE_REFRESH_REQUESTED)
            }
        }
        angular.module("map").controller("MapCtrl", MapCtrl), MapCtrl.$inject = ["DataService", "MapData", "$log", "PubSub", "PUBSUB_MESSAGES"]
    }(angular),
    function(angular) {
        function PropertyDetailsCtrl($log, PropertyData) {
            var vm = this;
            vm.data = PropertyData, angular.forEach(vm.data.data, function(value, key) {
                $log.debug("[PropertyDetailsCtrl] Property Data: Key: " + key + " | Value: " + value)
            })
        }
        angular.module("map").controller("PropertyDetailsCtrl", PropertyDetailsCtrl), PropertyDetailsCtrl.$inject = ["$log", "PropertyData"]
    }(angular),
    function(angular) {
        function RegionCtrl($log, RegionData, PubSub, PUBSUB_MESSAGES, screenSize) {
            function onPanelOpen() {
                vm.panelIsOpen = !0, vm.mapClass = vm.isTablet ? void 0 : "region__map--open"
            }

            function onPanelClosed() {
                vm.panelIsOpen = !1, vm.mapClass = "region__map--closed"
            }
            var vm = this;
            vm.data = RegionData.data, vm.regionName = RegionData.regionName, vm.mapUrl = vm.data.map, vm.panelIsOpen = !1, vm.isTablet = screenSize.on("tablet", function(match) {
                vm.isTablet = match, !vm.isTablet && vm.panelIsOpen ? vm.mapClass = "region__map--open" : vm.mapClass = "region__map--closed"
            }), angular.forEach(vm.data, function(value, key) {
                $log.debug("[RegionCtrl] Region Data Key: " + key + " | Value: " + value)
            }), PubSub.subscribe(PUBSUB_MESSAGES.MSG_PANEL_OPEN, onPanelOpen), PubSub.subscribe(PUBSUB_MESSAGES.MSG_PANEL_CLOSED, onPanelClosed)
        }
        angular.module("map").controller("RegionCtrl", RegionCtrl), RegionCtrl.$inject = ["$log", "RegionData", "PubSub", "PUBSUB_MESSAGES", "screenSize"]
    }(angular),
    function(angular) {
        function DataService($q, $log, $http) {
            function getDetails(propertyName, array) {
                var data, i;
                for (i = 0; i < array.length && (data = array[i], data.name !== propertyName); i += 1);
                return $log.debug("Returning details for " + propertyName + ": " + data), data
            }
            var loadedData = null;
            this.load = function() {
                var defer = $q.defer();
               //var json = $.parseJSON(JSON.stringify(j));
               // console.log(json);
               return null === loadedData ? ($log.debug("Loading All Data..."), $http.get("http://0098.client-qa.com/map-data/").then(function(data) {
               // return null === loadedData ? ($log.debug("Loading All Data..."), $http.get(json).then(function(data) {
                    loadedData = data.data, $log.debug("All data loaded..."), defer.resolve(data.data)
                }, function(error) {
                    $log.error(error), defer.reject(error)
                })) : ($log.debug("All data was already loaded, returning saved data..."), defer.resolve(loadedData)), defer.promise
            }, this.getRegionByName = function(name) {
                var defer = $q.defer();
                return $log.debug("getRegionByName: " + name), null === loadedData ? ($log.debug("loadedData not defined. Will get all data..."), this.load().then(function() {
                    $log.debug("All data load success, returning regionQuery..."), defer.resolve({
                        regionName: name,
                        data: loadedData.regions[name]
                    })
                }, function(error) {
                    $log.error(error), defer.reject(error)
                })) : ($log.debug("Region query result: " + loadedData.regions[name]), defer.resolve({
                    regionName: name,
                    data: loadedData.regions[name]
                })), defer.promise
            }, this.getPropertyDetails = function(regionName, propertyName) {
                var data, defer = $q.defer();
                return $log.debug("getPropertyDetails: " + regionName + "|" + propertyName), null === loadedData ? ($log.debug("loadedData not defined. Will get all data..."), this.load().then(function() {
                    $log.debug("All data load success, returning property details..."), data = {
                        regionName: regionName,
                        propertyName: propertyName,
                        data: getDetails(propertyName, loadedData.regions[regionName].properties)
                    }, defer.resolve(data)
                }, function(error) {
                    $log.error(error), defer.reject(error)
                })) : (data = {
                    regionName: regionName,
                    propertyName: propertyName,
                    data: getDetails(propertyName, loadedData.regions[regionName].properties)
                }, $log.debug("Property details query result: " + data.data), defer.resolve(data)), defer.promise
            }
        }
        angular.module("map").service("DataService", DataService), DataService.$inject = ["$q", "$log", "$http"]
    }(angular);