describe('test_search.js', function() {
	
   //
   // Example: A test case of getRandomIntInclusive
   //
   describe('getRandomIntInclusive Coverage Test', function() {

	  it('value within 1 to 3', function() {
	  	var value = getRandomIntInclusive(1, 3);
	  	expect( value>=1 && value <= 3 ).toEqual(true);
	  });

   });

   describe('test editDistance', function() {
       it('test', function() {
           expect(editDistance('','a')).toEqual(1);
       });

       it('test', function() {
           expect(editDistance('b','')).toEqual(1);
       });

       it('test', function() {
           expect(editDistance('b','a')).toEqual(1);
       });

       it('test', function() {
           expect(editDistance('aaa','aa')).toEqual(1);
       });
   });

   describe('test extractWord', function() {
       it('test', function() {
           expect(extractWord('a bc')[0]).toEqual('a');
       });

       it('test', function() {
           expect(extractWord('a bc')[1]).toEqual('bc');
       });
   });

   describe('test uniqueArray', function() {
       it('test', function() {
           expect(uniqueArray('aaa')[0]).toEqual('a');
       });
   });
});