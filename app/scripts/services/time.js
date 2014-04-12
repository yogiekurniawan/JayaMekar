'use strict';

angular.module('jayaMekarApp')
  .factory('time', function ($timeout) {
    var time = {};
      ( function tick(){
          var d = new Date();
          time.now = d.toString();
          $timeout(tick, 1000);
      })();
    return time;
  })

  .factory('nilai' , function(){
    var nilai = {};
      ( function hitung(){
        nilai.a;
      })();
    return nilai;
  });

  