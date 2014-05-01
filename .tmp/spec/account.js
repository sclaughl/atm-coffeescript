(function() {
  describe('Account', function() {
    return it('allows deposits', function() {
      var account;
      account = new Account({
        balance: 100
      });
      account.deposit('50');
      return expect(account.get('balance')).toEqual(150);
    });
  });

}).call(this);
