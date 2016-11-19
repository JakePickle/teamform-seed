describe('test_loadMessage.js', function() {
   

   describe('teamform-messages-app', function() {
       beforeEach(module('teamform-messages-app'));
       var $controller;
       beforeEach(inject(function( _$controller_) {
          $controller = _$controller_;
       }));

       describe('tests', function() {
           it('dummy test', function() {
               expect('Dummy').toEqual('Dummy');
           });
       });

       describe('testing teamfrom-messages-crtl', function() {
           it('message control test', function() {
               var $scope = {};
              // var controller = $controller('teamform-messages-ctrl',{$scope:$scope});
           });
       });
   });

});