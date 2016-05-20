//  var appControllers = angular.module('EventMob.controllers', [
//     'ionic',
//     'ngCordova.plugins.dialogs',
//     'ngCordova.plugins.toast',
//     'ngCordova.plugins.appVersion',
//     'ngCordova.plugins.file',
//     'ngCordova.plugins.fileTransfer',
//     'ngCordova.plugins.fileOpener2',
//     'ngCordova.plugins.datePicker',
//     'ngMessages',
//     'EventMob.services',
//     'EventMob.directives',
//     'EventMob.config'
// ]);

// appControllers.controller('LoadingCtrl',
//         ['$state', '$timeout',
//         function ($state, $timeout) {
//             $timeout(function () {
//                 $state.go('login', { 'CheckUpdate': 'Y' }, { reload: true });
//             }, 2500);
//         }]);
//
// appControllers.controller('LoginCtrl',
//         ['$scope', '$http', '$state', '$stateParams', '$ionicPopup', '$timeout', '$ionicLoading', '$cordovaToast', '$cordovaFile', '$cordovaAppVersion', 'JsonServiceClient',
//         function ($scope, $http, $state, $stateParams, $ionicPopup, $timeout, $ionicLoading, $cordovaToast, $cordovaFile, $cordovaAppVersion, JsonServiceClient) {
//             var path = '';
//             var directory = 'TmsApp';
//             var file = directory + '/Config.txt';
//             $scope.logininfo = {
//                 strPhoneNumber: '',
//                 strCustomerCode: '',
//                 strJobNo: '',
//                 strRole: '',
//                 CurRole: '1',
//                 NewRole: '1'
//             };
//             $scope.roles = [
//                 { text: 'Driver/Ops', value: '1' },
//                 { text: 'Customer', value: '2' },
//                 { text: 'Transporter', value: '3' }
//             ];
//             $scope.funcChangeRole = function () {
//                 var myPopup = $ionicPopup.show({
//                     template: '<ion-radio ng-repeat="role in roles" ng-value="role.value" ng-model="logininfo.NewRole">{{ role.text }}</ion-radio>',
//                     title: 'Select Login Role',
//                     scope: $scope,
//
//                     buttons: [
//                         {
//                             text: 'Cancel',
//                             onTap: function (e) {
//                                 $scope.logininfo.NewRole = $scope.logininfo.CurRole;
//                             }
//                         },
//                         {
//                             text: 'Save',
//                             type: 'button-positive',
//                             onTap: function (e) {
//                                 for (var r in $scope.roles) {
//                                     if ($scope.logininfo.NewRole === $scope.roles[r].value) {
//                                         $scope.logininfo.CurRole = $scope.logininfo.NewRole;
//                                         $scope.logininfo.strRole = $scope.roles[r].text;
//                                         if (window.cordova) {
//                                             path = cordova.file.externalRootDirectory;
//                                             var data = 'BaseUrl=' + strBaseUrl.replace('/', '') + '##WebServiceURL=' + strWebServiceURL.replace('http://', '') + '##WebSiteURL=' + strWebSiteURL.replace('http://', '') + '##LoginRole=' + $scope.logininfo.strRole;
//                                             $cordovaFile.writeFile(path, file, data, true)
//                                                 .then(function (success) {
//                                                     //
//                                                 }, function (error) {
//                                                     $cordovaToast.showShortBottom(error);
//                                                 });
//                                         }
//                                     }
//                                 }
//                             }
//                         }
//                     ]
//
//
//                 });
//             };
//             $scope.funcRoleJuage = function (roleType) {
//                 if (roleType === 1) {
//                     if ($scope.logininfo.strRole === 'Driver/Ops') {
//                         return true;
//                     } else {
//                         return false;
//                     }
//                 }
//                 else if (roleType === 2) {
//                     if ($scope.logininfo.strRole === 'Customer') {
//                         return true;
//                     }
//                     else if ($scope.logininfo.strRole === 'Transporter') {
//                         return true;
//                     } else {
//                         return false;
//                     }
//                 }
//             };
//             $scope.funcCheckUpdate = function () {
//                 var url = strWebSiteURL + '/update.json';
//                 $http.get(url)
//                     .success(function (res) {
//                         var serverAppVersion = res.version;
//                         $cordovaAppVersion.getVersionNumber().then(function (version) {
//                             if (version != serverAppVersion) {
//                                 $state.go('update', { 'Version': serverAppVersion });
//                             } else {
//                                 var alertPopup = $ionicPopup.alert({
//                                     title: "Already the Latest Version!",
//                                     okType: 'button-assertive'
//                                 });
//                                 $timeout(function () {
//                                     alertPopup.close();
//                                 }, 2500);
//                             }
//                         });
//                     })
//                     .error(function (res) {
//                         var alertPopup = $ionicPopup.alert({
//                             title: "Connect Update Server Error!",
//                             okType: 'button-assertive'
//                         });
//                         $timeout(function () {
//                             alertPopup.close();
//                         }, 2500);
//                     });
//             };
//             $scope.funcSetConf = function () {
//                 $state.go('setting', {}, { reload: true });
//             };
//             $scope.funcLogin = function () {
//                 if (window.cordova && window.cordova.plugins.Keyboard) {
//                     cordova.plugins.Keyboard.close();
//                 }
//                 var jsonData = { };
//                 var strUri = '';
//                 var onSuccess = null;
//                 var onError = function () {
//                     $ionicLoading.hide();
//                 };
//                 if ($scope.logininfo.CurRole === '1') {
//                     if ($scope.logininfo.strPhoneNumber === '') {
//                         var alertPopup = $ionicPopup.alert({
//                             title: 'Please Enter Phone Number.',
//                             okType: 'button-assertive'
//                         });
//                         $timeout(function () {
//                             alertPopup.close();
//                         }, 2500);
//                         return;
//                     }
//                     $ionicLoading.show();
//                     jsonData = { 'PhoneNumber': $scope.logininfo.strPhoneNumber, 'CustomerCode': '', 'JobNo': '' };
//                     strUri = '/api/event/action/list/login';
//                     onSuccess = function (response) {
//                         $ionicLoading.hide();
//                         sessionStorage.clear();
//                         sessionStorage.setItem('strPhoneNumber', $scope.logininfo.strPhoneNumber);
//                         sessionStorage.setItem('strDriverName', response.data.results);
//                         sessionStorage.setItem('strCustomerCode', '');
//                         sessionStorage.setItem('strJobNo', '');
//                         sessionStorage.setItem('strRole', $scope.logininfo.strRole);
//                         $state.go('main', { 'blnForcedReturn': 'N' }, { reload: true });
//                     };
//                 } else {
//                     if ($scope.logininfo.strCustomerCode === '') {
//                         var alertPopup = $ionicPopup.alert({
//                             title: 'Please Enter User ID.',
//                             okType: 'button-assertive'
//                         });
//                         $timeout(function () {
//                             alertPopup.close();
//                         }, 2500);
//                         return;
//                     }
//                     if ($scope.logininfo.strJobNo === '') {
//                         var alertPopup = $ionicPopup.alert({
//                             title: 'Please Enter Event Job No.',
//                             okType: 'button-assertive'
//                         });
//                         $timeout(function () {
//                             alertPopup.close();
//                         }, 2500);
//                         return;
//                     }
//                     $ionicLoading.show();
//                     if ($scope.logininfo.CurRole === '2' || $scope.logininfo.CurRole === '3') {
//                         jsonData = { 'PhoneNumber': '', 'CustomerCode': $scope.logininfo.strCustomerCode, 'JobNo': $scope.logininfo.strJobNo };
//                         strUri = '/api/event/action/list/login';
//                         onSuccess = function (response) {
//                             $ionicLoading.hide();
//                             sessionStorage.clear();
//                             sessionStorage.setItem('strPhoneNumber', '');
//                             sessionStorage.setItem('strDriverName', '');
//                             sessionStorage.setItem('strCustomerCode', $scope.logininfo.strCustomerCode);
//                             sessionStorage.setItem('strJobNo', $scope.logininfo.strJobNo);
//                             sessionStorage.setItem('strRole', $scope.logininfo.strRole);
//                             $state.go('listDirect', { 'JobNo': $scope.logininfo.strJobNo }, { reload: true });
//                         };
//                     }
//                 }
//                 JsonServiceClient.postToService(strUri, jsonData, onSuccess, onError);
//             };
//             $('#iPhoneNumber').on('keydown', function (e) {
//                 if (e.which === 9 || e.which === 13) {
//                     $scope.funcLogin();
//                 }
//             });
//             if ($stateParams.CheckUpdate === 'Y') {
//                 var url = strWebSiteURL + '/update.json';
//                 $http.get(url)
//                     .success(function (res) {
//                         var serverAppVersion = res.version;
//                         $cordovaAppVersion.getVersionNumber().then(function (version) {
//                             if (version != serverAppVersion) {
//                                 $state.go('update', { 'Version': serverAppVersion });
//                             }
//                         });
//                     })
//                     .error(function (res) { });
//             }
//             if (window.cordova) {
//                 path = cordova.file.externalRootDirectory;
//                 $cordovaFile.checkFile(path, file)
//                     .then(function (success) {
//                         $cordovaFile.readAsText(path, file)
//                             .then(function (success) {
//                                 var arConf = success.split("##");
//                                 if (arConf.length > 3) {
//                                     var arRole = arConf[3].split("=");
//                                     if (arRole[1].length > 0) {
//                                         $scope.logininfo.strRole = arRole[1];
//                                         if ($scope.logininfo.strRole === 'Customer') {
//                                             $scope.logininfo.CurRole = '2';
//                                             $scope.logininfo.NewRole = $scope.logininfo.CurRole;
//                                         } else if ($scope.logininfo.strRole === 'Transporter') {
//                                             $scope.logininfo.CurRole = '3';
//                                             $scope.logininfo.NewRole = $scope.logininfo.CurRole;
//                                         }
//                                     }
//                                 } else {
//                                     $scope.logininfo.strRole = "Driver/Ops";
//                                 }
//                             }, function (error) {
//                                 $cordovaToast.showShortBottom(error);
//                             });
//                     }, function (error) {
//                         $scope.logininfo.strRole = "Driver/Ops";
//                     });
//             } else {
//                 $scope.logininfo.strRole = 'Driver/Ops';
//             }
//         }]);
//
// appControllers.controller('SettingCtrl',
//         ['$scope', '$state', '$timeout', '$ionicLoading', '$ionicPopup', '$cordovaToast', '$cordovaFile',
//         function ($scope, $state, $timeout, $ionicLoading, $ionicPopup, $cordovaToast, $cordovaFile) {
//             $scope.Setting = {};
//             $scope.Setting.WebServiceURL = strWebServiceURL.replace('http://', '');
//             $scope.Setting.BaseUrl = strBaseUrl.replace('/', '');
//             $scope.Setting.WebSiteUrl = strWebSiteURL.replace('http://', '');
//             $scope.returnLogin = function () {
//                 $state.go('login', { 'CheckUpdate': 'Y' }, { reload: true });
//             };
//             $scope.saveSetting = function () {
//                 if ($scope.Setting.WebServiceURL.length > 0) {
//                     strWebServiceURL = $scope.Setting.WebServiceURL;
//                     if (strWebServiceURL.length > 0) {
//                         strWebServiceURL = "http://" + strWebServiceURL;
//                     }
//                 } else { $scope.Setting.WebServiceURL = strWebServiceURL }
//                 if ($scope.Setting.BaseUrl.length > 0) {
//                     strBaseUrl = $scope.Setting.BaseUrl;
//                     if (strBaseUrl.length > 0) {
//                         strBaseUrl = "/" + strBaseUrl;
//                     }
//                 } else { $scope.Setting.BaseUrl = strBaseUrl }
//                 if ($scope.Setting.WebSiteUrl.length > 0) {
//                     strWebSiteURL = $scope.Setting.WebSiteUrl;
//                     if (strWebSiteURL.length > 0) {
//                         strWebSiteURL = "http://" + strWebSiteURL;
//                     }
//                 } else { $scope.Setting.WebSiteUrl = strWebSiteURL }
//                 var data = 'BaseUrl=' + $scope.Setting.BaseUrl + '##WebServiceURL=' + $scope.Setting.WebServiceURL + '##WebSiteURL=' + strWebSiteURL;
//                 var path = cordova.file.externalRootDirectory;
//                 var directory = "TmsApp";
//                 var file = directory + "/Config.txt";
//                 $cordovaFile.writeFile(path, file, data, true)
//                     .then(function (success) {
//                         $state.go('login', { 'CheckUpdate': 'Y' }, { reload: true });
//                     }, function (error) {
//                         $cordovaToast.showShortBottom(error);
//                     });
//             };
//             $scope.delSetting = function () {
//                 var path = cordova.file.externalRootDirectory;
//                 var directory = "TmsApp";
//                 var file = directory + "/Config.txt";
//                 $cordovaFile.removeFile(path, file)
//                     .then(function (success) {
//                         var alertPopup = $ionicPopup.alert({
//                             title: 'Delete Config File Success.',
//                             okType: 'button-calm'
//                         });
//                         $timeout(function () {
//                             alertPopup.close();
//                         }, 2500);
//                     }, function (error) {
//                         $cordovaToast.showShortBottom(error);
//                     });
//             };
//         }]);
//
// appControllers.controller('UpdateCtrl',
//         ['$scope', '$stateParams', '$state', '$timeout', '$ionicLoading', '$cordovaToast', '$cordovaFile', '$cordovaFileTransfer', '$cordovaFileOpener2',
//         function ($scope, $stateParams, $state, $timeout, $ionicLoading, $cordovaToast, $cordovaFile, $cordovaFileTransfer, $cordovaFileOpener2) {
//             $scope.strVersion = $stateParams.Version;
//             $scope.returnLogin = function () {
//                 $state.go('login', { 'CheckUpdate': 'N' }, { reload: true });
//             };
//             $scope.upgrade = function () {
//                 $ionicLoading.show({
//                     template: "Download  0%"
//                 });
//                 var url = strWebServiceURL + strBaseUrl + "/TMS.apk";
//                 var blnError = false;
//                 $cordovaFile.checkFile(cordova.file.externalRootDirectory, "TMS.apk")
//                 .then(function (success) {
//                     //
//                 }, function (error) {
//                     blnError = true;
//                 });
//                 var targetPath = cordova.file.externalRootDirectory + "TMS.apk";
//                 var trustHosts = true;
//                 var options = {};
//                 if (!blnError) {
//                     $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
//                         $ionicLoading.hide();
//                         $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive'
//                         ).then(function () {
//                             // success
//                         }, function (err) {
//                             // error
//                         });
//                     }, function (err) {
//                         $cordovaToast.showShortCenter('Download faild.');
//                         $ionicLoading.hide();
//                         $state.go('login', { 'CheckUpdate': 'N' }, { reload: true });
//                     }, function (progress) {
//                         $timeout(function () {
//                             var downloadProgress = (progress.loaded / progress.total) * 100;
//                             $ionicLoading.show({
//                                 template: "Download  " + Math.floor(downloadProgress) + "%"
//                             });
//                             if (downloadProgress > 99) {
//                                 $ionicLoading.hide();
//                             }
//                         })
//                     });
//                 } else {
//                     $ionicLoading.hide();
//                     $cordovaToast.showShortCenter('Check APK file faild.');
//                     $state.go('login', { 'CheckUpdate': 'N' }, { reload: true });
//                 }
//             };
//         }]);
//
// appControllers.controller('MainCtrl',
//         ['$scope', '$http', '$state', '$stateParams', '$ionicLoading', '$ionicPopup', '$timeout', 'JsonServiceClient',
//         function ($scope, $http, $state, $stateParams, $ionicLoading, $ionicPopup, $timeout, JsonServiceClient) {
//             $scope.returnLogin = function () {
//                 $state.go('login', { 'CheckUpdate': 'N' }, { reload: true });
//             };
//             var strDriverName = sessionStorage.getItem('strDriverName');
//             var strPhoneNumber = sessionStorage.getItem('strPhoneNumber');
//             if (strDriverName != null && strDriverName.length > 0) {
//                 $scope.strName = strDriverName;
//             } else {
//                 $scope.strName = "Driver";
//             }
//             if (strPhoneNumber === null) {
//                 strPhoneNumber = '5888865';
//             }
//             $scope.strItemsCount = "loading...";
//             $scope.showList = function (strJobNo) {
//                 $state.go('list', { 'JobNo': strJobNo }, { reload: true });
//             };
//             var funcShowList = function () {
//                 $ionicLoading.show();
//                 var strUri = '/api/event/action/list/jobno/' + strPhoneNumber;
//                 var onSuccess = function (response) {
//                     $ionicLoading.hide();
//                         $scope.Jobs = response.data.results;
//                         if (response.data.results.length === 1 && $stateParams.blnForcedReturn === 'N') {
//                             $state.go('list', { 'JobNo': response.data.results[0].JobNo }, { reload: true });
//                         } else if (response.data.results.length < 1) {
//                             var alertPopup = $ionicPopup.alert({
//                                 title: 'No Tasks.',
//                                 okType: 'button-calm'
//                             });
//                         }
//                     };
//                 var onError = function () {
//                     $ionicLoading.hide();
//                 };
//                 JsonServiceClient.getFromService(strUri, onSuccess, onError);
//             };
//             funcShowList();
//         }]);
//
// appControllers.controller('ListCtrl',
//         ['$scope', '$state', '$stateParams', '$http', '$ionicPopup', '$timeout', '$ionicLoading', '$cordovaDialogs', 'JsonServiceClient',
//         function ($scope, $state, $stateParams, $http, $ionicPopup, $timeout, $ionicLoading, $cordovaDialogs, JsonServiceClient) {
//             $scope.JobNo = $stateParams.JobNo;
//             var strJobNo = $scope.JobNo;
//             var strPhoneNumber = sessionStorage.getItem("strPhoneNumber");
//             var strCustomerCode = sessionStorage.getItem("strCustomerCode");
//             var strRole = sessionStorage.getItem("strRole");
//             if (strCustomerCode === null) {
//                 strCustomerCode = '';
//             }
//             if (strPhoneNumber === null) {
//                 strPhoneNumber = '5888865';
//             }
//             if (strRole === null) {
//                 strRole = 'Driver/Ops';
//             }
//             //var strJobNo = sessionStorage.getItem("strJobNo").toString();
//             $scope.shouldShowDelete = false;
//             if (strRole === 'Driver/Ops') {
//                 $scope.listCanSwipe = true;
//             } else {
//                 $scope.listCanSwipe = false;
//             }
//             $scope.returnMain = function () {
//                 if (strRole === 'Driver/Ops') {
//                     $state.go('main', { 'blnForcedReturn': 'Y' }, { reload: true });
//                 } else {
//                     $state.go('login', { 'CheckUpdate': 'N' }, { reload: true });
//                 }
//             };
//             $scope.funcShowRole = function (roleType) {
//                 if (roleType === 1) {
//                     if (strRole === 'Driver/Ops') {
//                         return true;
//                     } else {
//                         return false;
//                     }
//                 }
//                 else if (roleType === 2) {
//                     if (strRole === 'Customer') {
//                         return true;
//                     } else {
//                         return false;
//                     }
//                 }
//                 else if (roleType === 3) {
//                     if (strRole === 'Transporter') {
//                         return true;
//                     } else {
//                         return false;
//                     }
//                 }
//             };
//             $scope.funcShowTruckType = function (task) {
//                 if (task.JobType === 'IM') {
//                     return 'In';
//                 } else if (task.JobType === 'EX' || task.JobType === 'TP') {
//                     return 'Out';
//                 } else {
//                     return '';
//                 }
//             };
//             $scope.funcShowLoadType = function (task) {
//                 if (task.JobType === 'IM') {
//                     return 'Unload';
//                 } else if (task.JobType === 'EX' || task.JobType === 'TP') {
//                     return 'Load';
//                 } else {
//                     return '';
//                 }
//             };
//             $scope.funcShowDatetime = function (utc) {
//                 if (typeof(utc) === 'undefined') return ''
//                 var utcDate = Number(utc.substring(utc.indexOf('(') + 1, utc.lastIndexOf('-')));
//                 var newDate = new Date(utcDate);
//                 if (newDate.getUTCFullYear() < 2166 && newDate.getUTCFullYear() > 1899) {
//                     return newDate.Format('yyyy-MM-dd hh:mm');
//                 } else {
//                     return '';
//                 }
//             };
//             var strUri = '';
//             var onSuccess = null;
//             var onError = function () {
//                 $ionicLoading.hide();
//             };
//             var onFinally = function () {
//                 $scope.$broadcast('scroll.refreshComplete');
//             };
//             if (strCustomerCode.length > 0) {
//                 strUri = "/api/event/action/list/jmjm6/" + strJobNo;
//                 onSuccess = function (response) {
//                     $ionicLoading.hide();
//                     $scope.tasks = response.data.results;
//                     if (response.data.results.length == 0) {
//                         var alertPopup = $ionicPopup.alert({
//                             title: 'No Tasks.',
//                             okType: 'button-calm'
//                         });
//                         $timeout(function () {
//                             alertPopup.close();
//                         }, 2500);
//                     }
//                 };
//             } else {
//                 strUri = "/api/event/action/list/container/" + strPhoneNumber + "/" + strJobNo;
//                 onSuccess = function (response) {
//                     $ionicLoading.hide();
//                     $scope.tasks = response.data.results;
//                     if (response.data.results.length == 0) {
//                         var alertPopup = $ionicPopup.alert({
//                             title: 'No Tasks.',
//                             okType: 'button-calm'
//                         });
//                         $timeout(function () {
//                             alertPopup.close();
//                         }, 2500);
//                     }
//                 };
//             }
//             var getTasks = function () {
//                 $ionicLoading.show();
//                 getData();
//             };
//             var getData = function () {
//                 JsonServiceClient.getFromService(strUri, onSuccess, onError);
//             };
//             $scope.doRefresh = function () {
//                 JsonServiceClient.getFromService(strUri, onSuccess, onError, onFinally);
//                 $scope.$apply();
//             };
//             $scope.showContainerNo = function (task) {
//                 if (typeof (task.ContainerNo) === 'undefined') {
//                     return false;
//                 } else {
//                     if (task.ContainerNo.length > 0) {
//                         return true;
//                     } else {
//                         return false;
//                     }
//                 }
//             };
//             var checkEventOrder = function (task) {
//                 for (var i = 0; i <= $scope.tasks.length - 1; i++) {
//                     if ($scope.tasks[i].JobLineItemNo < task.JobLineItemNo && $scope.tasks[i].AllowSkipFlag != 'Y') {
//                         if($scope.tasks[i].DoneFlag != 'Y'){
//                             return false;
//                         }
//                     }
//                 }
//                 return true;
//             };
//             $scope.slideDone = function (task, type) {
//                 if (type === 'OPEN') {
//                     $state.go('detail', { 'Type': 'OPEN', 'ContainerNo': task.ContainerNo, 'JobNo': task.JobNo, 'JobLineItemNo': task.JobLineItemNo, 'LineItemNo': task.LineItemNo, 'Description': task.Description, 'Remark': task.Remark, 'DoneFlag': task.DoneFlag });
//                 } else if (type === 'UPDATE') {
//                     $state.go('detail', { 'Type': 'UPDATE', 'ContainerNo': task.ContainerNo, 'JobNo': task.JobNo, 'JobLineItemNo': task.JobLineItemNo, 'LineItemNo': task.LineItemNo, 'Description': task.Description, 'Remark': task.Remark, 'DoneFlag': task.DoneFlag });
//                 } else {
//                     if (checkEventOrder(task)) {
//                         $state.go('detail', { 'Type': 'DONE', 'ContainerNo': task.ContainerNo, 'JobNo': task.JobNo, 'JobLineItemNo': task.JobLineItemNo, 'LineItemNo': task.LineItemNo, 'Description': task.Description, 'Remark': task.Remark, 'DoneFlag': task.DoneFlag });
//                     } else {
//                         var alertPopup = $ionicPopup.alert({
//                             title: 'Previous event not Done.<br/>Not allow to do this one.',
//                             okType: 'button-assertive'
//                         });
//                         $timeout(function () {
//                             alertPopup.close();
//                         }, 2500);
//                     }
//                 }
//             };
//             getTasks();
//         }]);
//
// appControllers.controller('DetailCtrl',
//         ['$scope', '$stateParams', '$state', '$http', '$timeout', '$ionicLoading', '$ionicPopup', 'JsonServiceClient',
//         function ($scope, $stateParams, $state, $http, $timeout, $ionicLoading, $ionicPopup, JsonServiceClient) {
//             $scope.detail = {
//                 Type            : $stateParams.Type,
//                 ContainerNo     : $stateParams.ContainerNo,
//                 JobNo           : $stateParams.JobNo,
//                 JobLineItemNo   : $stateParams.JobLineItemNo,
//                 LineItemNo      : $stateParams.LineItemNo,
//                 Description     : $stateParams.Description,
//                 DoneFlag        : $stateParams.DoneFlag
//             };
//             var currentDate = new Date();
//             $scope.Update = {
//                 ContainerNo : $scope.detail.ContainerNo,
//                 remark      : $stateParams.Remark,
//                 datetime    : currentDate,
//                 strDatetime : currentDate.getTime()
//             };
//             if ($scope.detail.Type === 'OPEN') {
//                 $scope.strDoneOrUpdateTitle = 'Detail Infos';
//                 $scope.strDoneOrUpdate = '';
//             }
//             else if ($scope.detail.Type === 'UPDATE') {
//                 $scope.strDoneOrUpdateTitle = 'Update Remark';
//                 $scope.strDoneOrUpdate = 'Update';
//             }
//             else {
//                 $scope.strDoneOrUpdateTitle = 'Detail Infos';
//                 $scope.strDoneOrUpdate = 'Done';
//             }
//             $scope.returnList = function () {
//                 $state.go('list', { 'JobNo': $scope.detail.JobNo }, { reload: true });
//             };
//             $scope.update = function () {
//                 $ionicLoading.show();
//                 currentDate.setFullYear($scope.Update.datetime.getFullYear());
//                 currentDate.setMonth($scope.Update.datetime.getMonth());
//                 currentDate.setDate($scope.Update.datetime.getDate());
//                 currentDate.setHours($scope.Update.datetime.getHours());
//                 currentDate.setMinutes($scope.Update.datetime.getMinutes());
//                 var jsonData = null;
//                 if ($scope.detail.Type === 'UPDATE') {
//                     jsonData = { "JobNo": $scope.detail.JobNo, "JobLineItemNo": $scope.detail.JobLineItemNo, "LineItemNo": $scope.detail.LineItemNo, "DoneFlag": 'N', "Remark": $scope.Update.remark, "ContainerNo": $scope.Update.ContainerNo };
//                 } else if ($scope.detail.Type === 'DONE') {
//                     jsonData = { "JobNo": $scope.detail.JobNo, "JobLineItemNo": $scope.detail.JobLineItemNo, "LineItemNo": $scope.detail.LineItemNo, "DoneFlag": 'Y', "DoneDatetime": currentDate, "Remark": $scope.Update.remark, "ContainerNo": $scope.Update.ContainerNo };
//                 }
//                 var strUri = "/api/event/action/update/done";
//                 var onSuccess = function (response) {
//                     $ionicLoading.hide();
//                     $state.go('list', { 'JobNo': $scope.detail.JobNo }, { reload: true });
//                 };
//                 var onError = function (response) {
//                     $ionicLoading.hide();
//                     var alertPopup = $ionicPopup.alert({
//                         title: 'Connect to WebService failed.',
//                         okType: 'button-assertive'
//                     });
//                     $timeout(function () {
//                         alertPopup.close();
//                         $state.go('list', { 'JobNo': $scope.detail.JobNo }, { reload: true });
//                     }, 2500);
//                 };
//                 JsonServiceClient.postToService(strUri, jsonData, onSuccess, onError);
//             };
//         }]);
