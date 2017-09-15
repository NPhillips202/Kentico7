'use strict';

/**
 * @ngdoc overview
 * @name opalSandsResortInteractiveMapApp
 * @description
 * # opalSandsResortInteractiveMapApp
 *
 * Main module of the application.
 */
 
 angular
  .module('map', [
    'ngAria',
    'ngTouch',
    'ui.router',
    'ngAnimate',
    'angularPubsub',
    'matchMedia'
  ]);

(function (angular) {

   angular
    .module('map')
    .config(AppConfig);

  AppConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$logProvider'];

  function AppConfig($stateProvider, $urlRouterProvider, $logProvider) {

    //Enabled/Disable debug log output
    $logProvider.debugEnabled(false);

    // For any unmatched url, redirect to main state
    $urlRouterProvider.otherwise("/map");

    // Now set up the states
    $stateProvider
      .state('main', {
        url: "/",
        templateUrl: "/templates/main.html",
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .state('main.map', {
        url: "map",
        templateUrl: "/templates/map.html",
        controller: 'MapCtrl',
        controllerAs: 'vm',
        resolve: {
          MapData: ['DataService', function(DataService) {
            return DataService.load();
          }]
        }
      })
      .state('main.map.region', {
        url: "region/:regionName",
        templateUrl: "/templates/region.html",
        controller: 'RegionCtrl',
        controllerAs: 'vm',
        resolve: {
          RegionData: ['DataService', '$stateParams', function(DataService, $stateParams) {
            return DataService.getRegionByName($stateParams.regionName);
          }]
        }
      })
      .state('main.map.region.propertydetails', {
        url: "/:propertyName/details",
        templateUrl: "/templates/region-propertydetails.html",
        controller: 'PropertyDetailsCtrl',
        controllerAs: 'vm',
        resolve: {
          PropertyData: ['DataService', '$stateParams', function(DataService, $stateParams) {
            return DataService.getPropertyDetails($stateParams.regionName, $stateParams.propertyName);
          }]
        }
      })
      .state('main.list', {
        url: "list",
        templateUrl: "/templates/list.html",
        controller: 'ListCtrl',
        controllerAs: 'vm',
        resolve: {
          ListData: ['DataService', function(DataService) {
            return DataService.load();
          }]
        }
      });
  }

})(angular);

(function (angular) {

  angular
    .module('map')
    .constant('PUBSUB_MESSAGES', {
      MSG_PANEL_OPEN: 'panelIsOpen',
      MSG_PANEL_CLOSED: 'panelIsClosed',
      MSG_LIST_VIEW_OPEN: 'listViewSelected',
      MSG_MAP_VIEW_OPEN: 'mapViewSelected',
      MSG_MAP_VIEW_RESET: 'mapViewReset',
      PARENT_SIZE_REFRESH_REQUESTED: 'parentSizeRefreshRequested'
    })
    .constant('CONSTANTS', {
      HASH_PREFIX: 'pid-'
    });


})(angular);

'use strict';

(function (angular) {

/**
 * @ngdoc function
 * @name opalSandsResortInteractiveMapApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the list view
 */
angular.module('map')
  .controller('ListCtrl', ListCtrl);

  ListCtrl.$inject = ['DataService', 'ListData', '$log', 'CONSTANTS', 'PubSub', 'PUBSUB_MESSAGES'];

  function ListCtrl(DataService, ListData, $log, CONSTANTS, PubSub, PUBSUB_MESSAGES) {

   // console.log('If you can see this message you are outputting DEBUG log messages. For production turn off the debug logs in the map config file.');

    var vm = this;
    //console.log(this);
    PubSub.publish(PUBSUB_MESSAGES.MSG_LIST_VIEW_OPEN);

    angular.forEach(ListData.regions, function(value, key) {
      //console.log('[ListCtrl] Map Data ID: ' + key + ' | Property Count: ' + value.length);
    });

    vm.regions = ListData.regions;

    vm.generateId = function (value) {
      return CONSTANTS.HASH_PREFIX + value.replace(/[\s\&\,]+/g, '').toLowerCase();
    }

    vm.isEven = function (n) {
      return n % 2 == 0;
    }

  }

})(angular);

'use strict';

(function (angular) {

/**
 * @ngdoc function
 * @name opalSandsResortInteractiveMapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the general map view
 */
angular.module('map')
  .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$log', 'PubSub', 'PUBSUB_MESSAGES', '$window', '$document', '$timeout', 'screenSize'];

  function MainCtrl($log, PubSub, PUBSUB_MESSAGES, $window, $document, $timeout, screenSize) {

  //  console.log('If you can see this message you are outputting DEBUG log messages. For production turn off the debug logs in the map config file.');

    var vm = this;
    var currentMessage;
    var lastWidth;
    var lastHeight;

    vm.mapIsActive = false;
    vm.listIsActive = false;

    PubSub.subscribe(PUBSUB_MESSAGES.MSG_LIST_VIEW_OPEN, onListSelect);
    PubSub.subscribe(PUBSUB_MESSAGES.MSG_MAP_VIEW_OPEN, onMapSelect);
    PubSub.subscribe(PUBSUB_MESSAGES.PARENT_SIZE_REFRESH_REQUESTED, onSizeRefreshRequest);

    screenSize.rules = {
      tablet: '(max-width: 768px)'
    };


    angular.element($window).bind('resize', function(){
      onSizeRefreshRequest();
    });

    function onSizeRefreshRequest () {

      $timeout(function () {
        var width = angular.element($document[0].documentElement)[0].scrollWidth;
        var height = angular.element($document[0].body)[0].offsetHeight;

        if(lastWidth !== width || lastHeight !== height) {
          lastWidth = width;
          lastHeight = height;
          $window.parent.postMessage(JSON.stringify({type: currentMessage, height: height}), '*');
        }

      });

    }

    function onListSelect () {
    //  console.log('MainCtrl: List View Selected');

      vm.mapIsActive = false;
      vm.listIsActive = true;
      currentMessage = PUBSUB_MESSAGES.MSG_LIST_VIEW_OPEN;

      $timeout(function () {
        var width = angular.element($document[0].documentElement)[0].scrollWidth;
        var height = angular.element($document[0].body)[0].offsetHeight + 1;

      //  console.log('MainCtrl: body height: ', height);

        lastWidth = width;
        lastHeight = height;

        $window.parent.postMessage(JSON.stringify({type: currentMessage, height: height}), '*');

      });

    }

    function onMapSelect () {
    //  console.log('MainCtrl: Map View Selected');

      vm.mapIsActive = true;
      vm.listIsActive = false;
      currentMessage = PUBSUB_MESSAGES.MSG_MAP_VIEW_OPEN;

      $timeout(function () {
        var width = angular.element($document[0].documentElement)[0].scrollWidth;
        var height = angular.element($document[0].body)[0].offsetHeight + 1;

      //  console.log('MainCtrl: body height: ', height);

        lastWidth = width;
        lastHeight = height;

        $window.parent.postMessage(JSON.stringify({type: currentMessage, height: height}), '*');
      });
    }

    vm.onMapLinkClicked = function () {
      currentMessage = PUBSUB_MESSAGES.MSG_MAP_VIEW_OPEN;

     // console.log('MainCtrl: Map Link Clicked');

      PubSub.publish(PUBSUB_MESSAGES.MSG_MAP_VIEW_RESET);

    }

  }

})(angular);

'use strict';

(function (angular) {

/**
 * @ngdoc function
 * @name opalSandsResortInteractiveMapApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the general map view
 */
angular.module('map')
  .controller('MapCtrl', MapCtrl);

  MapCtrl.$inject = ['DataService', 'MapData', '$log', 'PubSub', 'PUBSUB_MESSAGES'];

  function MapCtrl(DataService, MapData, $log, PubSub, PUBSUB_MESSAGES) {

   // console.log('If you can see this message you are outputting DEBUG log messages. For production turn off the debug logs in the map config file.');

    var vm = this;
    //console.log(vm);
    PubSub.publish(PUBSUB_MESSAGES.MSG_MAP_VIEW_OPEN);
    PubSub.subscribe(PUBSUB_MESSAGES.MSG_MAP_VIEW_RESET, onMapReset);

    angular.forEach(MapData.regions, function(value, key) {
      //console.log('[MapCtrl] Map Data ID: ' + key + ' | Property Count: ' + value.length);
    });

    vm.regions = MapData.regions;
    console.log(vm.regions);
    vm.currentSection = undefined;

    vm.setCurrentSection = function (name) {
      vm.currentSection = name;
      PubSub.publish(PUBSUB_MESSAGES.MSG_PANEL_CLOSED);
      PubSub.publish(PUBSUB_MESSAGES.PARENT_SIZE_REFRESH_REQUESTED);
    }

    function onMapReset () {
      vm.currentSection = undefined;
    }

  }

})(angular);

'use strict';

(function (angular) {

/**
 * @ngdoc function
 * @name opalSandsResortInteractiveMapApp.controller:PropertyDetailsCtrl
 * @description
 * # PropertyDetailsCtrl
 * Controller of the property details view
 */
angular.module('map')
  .controller('PropertyDetailsCtrl', PropertyDetailsCtrl);

  PropertyDetailsCtrl.$inject = ['$log', 'PropertyData'];

  function PropertyDetailsCtrl($log, PropertyData) {
    var vm = this;

    vm.data = PropertyData;

    angular.forEach(vm.data.data, function(value, key) {
      //console.log('[PropertyDetailsCtrl] Property Data: Key: ' + key + ' | Value: ' + value);
    });
  }


})(angular);

'use strict';

(function (angular) {

/**
 * @ngdoc function
 * @name opalSandsResortInteractiveMapApp.controller:RegionCtrl
 * @description
 * # RegionCtrl
 * Controller of the region view
 */
angular.module('map')
  .controller('RegionCtrl', RegionCtrl);

  RegionCtrl.$inject = ['$log', 'RegionData', 'PubSub', 'PUBSUB_MESSAGES', 'screenSize'];

  function RegionCtrl($log, RegionData, PubSub, PUBSUB_MESSAGES, screenSize) {
    var vm = this;

    vm.data = RegionData.data;
    vm.regionName = RegionData.regionName;
    vm.mapUrl = vm.data.map;
    vm.panelIsOpen = false;
    vm.isTablet = screenSize.on('tablet', function(match){
      vm.isTablet = match;

      if(!vm.isTablet && vm.panelIsOpen) {
        vm.mapClass = 'region__map--open';
      } else {
        vm.mapClass = 'region__map--closed';
      }

    });

    angular.forEach(vm.data, function(value, key) {
    //  console.log('[RegionCtrl] Region Data Key: ' + key + ' | Value: ' + value);
    });

    PubSub.subscribe(PUBSUB_MESSAGES.MSG_PANEL_OPEN, onPanelOpen);
    PubSub.subscribe(PUBSUB_MESSAGES.MSG_PANEL_CLOSED, onPanelClosed);

    function onPanelOpen() {
      vm.panelIsOpen = true;
      vm.mapClass = !vm.isTablet ? 'region__map--open' : undefined;
    }

    function onPanelClosed() {
      vm.panelIsOpen = false;
      vm.mapClass = 'region__map--closed';
    }

  }


})(angular);

(function (angular) {
  angular
    .module('map')
    .service('DataService', DataService);

  DataService.$inject = ['$q', '$log'];

  function DataService($q, $log) {

    var loadedData = null;

    this.load = function () {

      var defer = $q.defer();
	
      if(loadedData === null) {
      //  console.log('Loading All Data...');

		loadedData = JSON.parse(parent.map_data);
        //console.log(loadedData);
        defer.resolve(loadedData);
      } else {
      //  console.log('All data was already loaded, returning saved data...');
        defer.resolve(loadedData);
         //console.log(loadedData);
      }

      return defer.promise;

    };

    this.getRegionByName = function(name) {

      var defer = $q.defer();

    //  console.log('getRegionByName: ' + name);

      if(loadedData === null) {

      //  console.log('loadedData not defined. Will get all data...');

        this.load().then(
          function(){
          //  console.log('All data load success, returning regionQuery...');
            defer.resolve({ regionName: name,  data: loadedData.regions[name]});
          },
          function(error){
          //  console.log(error);
            defer.reject(error);
          }
        );

      } else {

      //  console.log('Region query result: ' + loadedData.regions[name]);
        defer.resolve({ regionName: name,  data: loadedData.regions[name]});

      }

      return defer.promise;

    };

    this.getPropertyDetails = function(regionName, propertyName) {

      var defer = $q.defer();
      var data;

    //  console.log('getPropertyDetails: ' + regionName + '|' + propertyName);

      if(loadedData === null) {

      //  console.log('loadedData not defined. Will get all data...');

        this.load().then(
          function(){
          //  console.log('All data load success, returning property details...');

            data = {
              regionName: regionName,
              propertyName: propertyName,
              data: getDetails(propertyName, loadedData.regions[regionName].properties)
            };

            defer.resolve(data);
          },
          function(error){
          //  console.log(error);
            defer.reject(error);
          }
        );

      } else {

        data = {
          regionName: regionName,
          propertyName: propertyName,
          data: getDetails(propertyName, loadedData.regions[regionName].properties)
        };

      //  console.log('Property details query result: ' + data.data);

        defer.resolve(data);

      }

      return defer.promise;

    };

    function getDetails(propertyName, array) {

      var data;
      var i;

      for(i = 0; i < array.length; i +=1) {
        data = array[i];
        if(data.name === propertyName) {
          break;
        }
      }

    //  console.log('Returning details for ' + propertyName + ': ' + data);
      return data;
    }
  }

})(angular);

'use strict';

(function (angular) {

  angular
    .module('map')
    .directive('imageOnLoad', imageOnLoad);

  function imageOnLoad(PubSub, PUBSUB_MESSAGES) {
    return {
      scope: {},
      restrict: 'A',
      link: imageLink
    };

    function imageLink(scope, elem, attrs, controller) {

      elem.on('load', onLoaded);
      elem.on('error', onError);

      scope.$on('$destroy', function() {
        elem.off('load', onLoaded);
        elem.off('error', onError);
      });

      function onLoaded () {
        PubSub.publish(PUBSUB_MESSAGES.PARENT_SIZE_REFRESH_REQUESTED);
      }

      function onError (){
        PubSub.publish(PUBSUB_MESSAGES.PARENT_SIZE_REFRESH_REQUESTED);
      }

    }
  }

})(angular);

'use strict';

(function (angular) {

  angular
    .module('map')
    .directive('markerWithCounter', markerWithCounter);

  function markerWithCounter($log, $state) {
    return {
      scope: {},
      restrict: 'AE',
      templateUrl: '/directives/marker-with-counter.html',
      controller: MarkerWithCounterCtrl,
      link: MarkerWithCounterLink,
      controllerAs: 'vm',
      bindToController: {
        count: '=', 
        data: '=',
        markerImage: '=',
        markerData: '='     
      }
    };

    function MarkerWithCounterLink(scope, elem, attrs, controller) {
      //console.log(elem);
      console.log(scope.$parent.value['marker-image']);
      elem.attr('data-marker-image', 'value[\'marker-image\']')
      elem.css('text-decoration', 'none');
      elem.css('position', 'absolute');
      elem.css('z-index', '200');
      elem.css('left', controller.markerData.left + '%');
      elem.css('top', controller.markerData.top + '%');

    }
  }

  MarkerWithCounterCtrl.$inject = ['$log'];

  function MarkerWithCounterCtrl($log) {
  var vm = this;
    //console.log('[Marker with Counter] Created. count: ' + vm.count + ' markerData: {left: ' + vm.markerData.left + ' top: ' + vm.markerData.top + '} marker-image: ' + vm.markerImage);
   // console.log(vm);
   // debugger;
  }

})(angular);

'use strict';

(function (angular) {

  angular
    .module('map')
    .directive('propertyColumn', propertyColumn);

  function propertyColumn($log, $state) {
    return {
      scope: {},
      restrict: 'AE',
      templateUrl: '/directives/property-column.html',
      controller: PropertyColumnCtrl,
      controllerAs: 'vm',
      bindToController: {
        data: '='
      }
    };

  }

  PropertyColumnCtrl.$inject = ['$log', '$location', '$anchorScroll', 'CONSTANTS'];

  function PropertyColumnCtrl($log, $location, $anchorScroll, CONSTANTS) {
    var vm = this;
    //console.log(vm);
    $anchorScroll.yOffset = 500;
    vm.title = vm.data.title.toUpperCase();

    vm.onClick = function (value) {
      var normalizedValue = CONSTANTS.HASH_PREFIX + value.replace(/[\s\&\,]+/g, '').toLowerCase();
      $location.hash(normalizedValue);
    }
  }
})(angular);

'use strict';

(function (angular) {

  angular
    .module('map')
    .directive('propertyDetailsPanel', propertyDetailsPanel);

  function propertyDetailsPanel($log, $state) {
    return {
      scope: {},
      restrict: 'AE',
      templateUrl: '/directives/property-details-panel.html',
      controller: PropertyDetailsPanelCtrl,
      controllerAs: 'vm',
      bindToController: {
        data: '='
      }
    };

  }

  PropertyDetailsPanelCtrl.$inject = ['$log', 'PubSub', 'PUBSUB_MESSAGES', 'screenSize'];

  function PropertyDetailsPanelCtrl($log, PubSub, PUBSUB_MESSAGES, screenSize) {
    var vm = this;
    vm.image = vm.data.data.image;
    vm.book = vm.data.data.book;
    vm.explore = vm.data.data.explore;
    vm.name = vm.data.data.name.toUpperCase();
    vm.address = vm.data.data.address.toUpperCase();
    vm.isTablet = screenSize.on('tablet', function(match){
      vm.isTablet = match;
    });

    PubSub.publish(PUBSUB_MESSAGES.MSG_PANEL_OPEN);
    PubSub.publish(PUBSUB_MESSAGES.PARENT_SIZE_REFRESH_REQUESTED);

    vm.onCloseClick = function () {
      PubSub.publish(PUBSUB_MESSAGES.MSG_PANEL_CLOSED);
      PubSub.publish(PUBSUB_MESSAGES.PARENT_SIZE_REFRESH_REQUESTED);
    }
  }

})(angular);

'use strict';

(function (angular) {

  angular
    .module('map')
    .directive('propertyMarker', propertyMarker);

  function propertyMarker($log, $state) {
    return {
      scope: {},
      restrict: 'AE',
      templateUrl: '/directives/property-marker.html',
      controller: PropertyMarkerCtrl,
      link: PropertyMarkerLink,
      controllerAs: 'vm',
      bindToController: {
        data: '='
      }
    };

    function PropertyMarkerLink(scope, elem, attrs, controller) {

      elem.css('position', 'absolute');
      elem.css('left', controller.markerData.left + '%');
      elem.css('top', controller.markerData.top + '%');

    }
  }

  PropertyMarkerCtrl.$inject = ['$log', 'screenSize'];

  function PropertyMarkerCtrl($log, screenSize) {
    var vm = this;
    var vertClass;
    var horClass;
    vm.markerData = vm.data['marker-data'];
    vm.hovered = false;
    vm.name = vm.data.name;
    vm.address = vm.data.address;
    vm.isTablet = screenSize.on('tablet', function(match){
      vm.isTablet = match;
    });

    vertClass = vm.markerData.top > 80 ? 'talkbubble-over' : 'talkbubble-under';
    horClass = vm.markerData.left > 70 ? 'talkbubble-right' : 'talkbubble-left';

    vm.bubbleClass = vertClass + ' ' + horClass;

  //  console.log('[Property Counter] Created.  markerData: {left: ' + vm.markerData.left + ' top: ' + vm.markerData.top + '}');
  }

})(angular);