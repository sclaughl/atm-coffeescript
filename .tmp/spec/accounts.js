(function() {
  describe('Accounts', function() {
    return it('behaves like a backbone collection', function() {
      var collection;
      collection = new Accounts([
        {
          account_number: 1234
        }
      ]);
      return expect(collection.first().get('account_number')).toEqual(1234);
    });
  });

}).call(this);
