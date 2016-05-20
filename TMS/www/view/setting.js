'use strict';
  app.controller('SettingCtrl', ['ENV', '$scope', '$state', '$ionicHistory', '$ionicPopup', '$cordovaToast', '$cordovaFile',
    function(ENV, $scope, $state, $ionicHistory, $ionicPopup, $cordovaToast, $cordovaFile) {
      $scope.Setting = {
        Version: ENV.version,
        WebApiURL: ENV.api.replace('http://', ''),
        WebSiteUrl: ENV.website.replace('http://', ''),
        // MapProvider: ENV.mapProvider
      };
      $scope.returnLogin = function() {
        // if ($ionicHistory.backView()) {
        //     $ionicHistory.goBack();
        // }else{
        $state.go('login', {
          'CheckUpdate': 'Y'
        }, {
          reload: true
        });
        // }
      };
      $scope.saveSetting = function() {
        if (is.not.empty($scope.Setting.WebApiURL)) {
          ENV.api = onStrToURL($scope.Setting.WebApiURL);
        } else {
          $scope.Setting.WebApiURL = ENV.website.replace('http://', '');
        }
        if (is.not.empty($scope.Setting.WebSiteUrl)) {
          ENV.website = onStrToURL($scope.Setting.WebSiteUrl);
        } else {
          $scope.Setting.WebSiteUrl = ENV.api.replace('http://', '');
        }
        // if (is.not.empty($scope.Setting.MapProvider)) {
        //   ENV.mapProvider = $scope.Setting.MapProvider;
        // } else {
        //   $scope.Setting.MapProvider = ENV.mapProvider;
        // }

        if (!ENV.fromWeb) {
          var data = 'website=' + ENV.website + '##api=' + ENV.api + '##map=' + ENV.mapProvider;
          var data = 'website=' + ENV.website + '##api=' + ENV.api;
          var path = cordova.file.externalRootDirectory;
          var file = ENV.rootPath + '/' + ENV.configFile;
          $cordovaFile.writeFile(path, file, data, true)
            .then(function(success) {
              $state.go('index.login', {}, {
                reload: true
              });
            }, function(error) {
              $cordovaToast.showShortBottom(error);
              console.error(error);
              alert(error);
            });
        } else {
          $state.go('login', {}, {
            reload: true
          });
        }
      };
      // $scope.reset = function() {
      //     $scope.Setting.WebApiURL = 'www.sysfreight.net:8081';
      //     $scope.Setting.WebSiteUrl = 'www.sysfreight.net:8081/tmsapp';
      //     $scope.Setting.MapProvider = 'baidu';
      //     if(!ENV.fromWeb){
      //         var path = cordova.file.externalRootDirectory;
      //         var file = ENV.rootPath + '/' + ENV.configFile;
      //         $cordovaFile.removeFile(path, file)
      //             .then(function(success) {
      //
      //             }, function(error) {
      //                 $cordovaToast.showShortBottom(error);
      //             });
      //     }
      // };



    }
  ]);
