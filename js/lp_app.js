var app = angular.module('rsLpApp', []);

app.factory('SharedData', function () {
    return {
        user_data: {}
    };
});


app.controller('RsLoginController', ['$scope', '$http', 'SharedData', function ($scope, $http, SharedData) {

    $scope.SharedData = SharedData;
    $scope.login_data = {};
    $scope.successMessage = '';
    $scope.errorMessage = '';

    // ログインする前に行う処理
    $scope.doLogin = function($event) {
        $event.preventDefault();
        //noinspection JSCheckFunctionSignatures
        /** @namespace $scope.login_data */
        $http.post('/do_login', {
            u_mail: $scope.login_data.u_mail,
            u_pw:$scope.login_data.u_pw,
            remember: '0'
        }).success(function(response) {
            /** @namespace response.error_message */
            $scope.errorMessage = response.error_message;

            /** @namespace response.login_result */
            /** @namespace response.user_data */
            if(response.login_result)
            {
                $scope.SharedData.is_user_login                 = true;
                $scope.SharedData.user_data                     = response.user_data;
                $scope.SharedData.user_data.payment_type_id     = '1';
                $scope.SharedData.user_data.agency_id           = '';

                location.reload();
            }
        });
    };
}]);