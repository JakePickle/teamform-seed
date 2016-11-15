describe('test_search.js', function() {

    describe('test configure', function() {
       it('test', function() {
           // need further implementation
       })
   });

   describe('test editDistance', function() {
       it('test', function() {
           expect(Search.prototype.editDistance('','a')).toEqual(1);
       });

       it('test', function() {
           expect(Search.prototype.editDistance('b','')).toEqual(1);
       });

       it('test', function() {
           expect(Search.prototype.editDistance('b','a')).toEqual(1);
       });

       it('test', function() {
           expect(Search.prototype.editDistance('aaa','aa')).toEqual(1);
       });
   });

   describe('test extractWord', function() {
       it('test', function() {
           expect(Search.prototype.extractWord('a bc')[0]).toEqual('a');
       });

       it('test', function() {
           expect(Search.prototype.extractWord('a bc')[1]).toEqual('bc');
       });
   });

   describe('test uniqueArray', function() {
       it('test', function() {
           expect(Search.prototype.uniqueArray('aaa')[0]).toEqual('a');
       });
   });

//    describe('test fuzzySearch', function() {
//        it('test', function() {
//            expect(Search.prototype.fuzzySearch('a')).toEqual('a');
//        })
//    });

    describe('test matchSearchWords', function() {
       it('test', function() {
           expect(Search.prototype.matchSearchWords('a','abc')).toEqual(0);
       })
    });

    describe('test reduceList', function() {
       it('test', function() {
           expect(Search.prototype.reduceList('aa')).toEqual([{Path:'a', count:2}]);
       })
   });

//    describe('test renderSearchResult', function() {
//        it('test', function() {
//            expect(Search.prototype.renderSearchResult('a')).toEqual(1);
//        })
//    });

   
});