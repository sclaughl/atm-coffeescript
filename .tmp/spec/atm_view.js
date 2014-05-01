(function() {
  describe('AtmView', function() {
    var assertResultDisplay, clickForBalance, createAccounts, createAtmView, setAccountNumberVal;
    createAccounts = function(accountData) {
      return new Accounts(accountData);
    };
    createAtmView = function(accountData) {
      return new AtmView({
        collection: createAccounts(accountData)
      });
    };
    setAccountNumberVal = function(view, val) {
      return view.$('[data-id=account-number]').val(val);
    };
    clickForBalance = function(view) {
      return view.$('[data-id=balance-button]').click();
    };
    assertResultDisplay = function(view, msg) {
      return expect(view.$('[data-id=result-message]').text()).toEqual(msg);
    };
    it('displays the balance', function() {
      var view;
      view = createAtmView([
        {
          account_number: '123',
          balance: 9.5
        }
      ]).render();
      setAccountNumberVal(view, '123');
      clickForBalance(view);
      return assertResultDisplay(view, '9.5');
    });
    it('errors if the account is not found', function() {
      var view;
      view = createAtmView([
        {
          account_number: '123',
          balance: 9.5
        }
      ]).render();
      setAccountNumberVal(view, '456');
      clickForBalance(view);
      return assertResultDisplay(view, view.accountNotFoundMessage);
    });
    it('allows deposits', function() {
      var account, view;
      view = createAtmView([
        {
          account_number: '123',
          balance: 9.5
        }
      ]).render();
      setAccountNumberVal(view, '123');
      view.$('[data-id=amount]').val(100);
      view.$('[data-id=deposit-button]').click();
      account = view.collection.first();
      return expect(account.get('balance')).toEqual(109.5);
    });
    it('does not allow deposits over $200', function() {
      var view;
      view = createAtmView([
        {
          account_number: '123',
          balance: 9.5
        }
      ]).render();
      setAccountNumberVal(view, '123');
      view.$('[data-id=amount]').val(201);
      view.$('[data-id=deposit-button]').click();
      return assertResultDisplay(view, view.depositTooLargeMessage);
    });
    it('allows withdrawals', function() {
      var account, view;
      view = createAtmView([
        {
          account_number: '123',
          balance: 9.5
        }
      ]).render();
      setAccountNumberVal(view, '123');
      view.$('[data-id=amount]').val(4.5);
      view.$('[data-id=withdraw-button]').click();
      account = view.collection.first();
      return expect(account.get('balance')).toEqual(5);
    });
    return it('does not allow withdrawals that exceed account balance', function() {
      var view;
      view = createAtmView([
        {
          account_number: '123',
          balance: 9.5
        }
      ]).render();
      setAccountNumberVal(view, '123');
      view.$('[data-id=amount]').val(10);
      view.$('[data-id=withdraw-button]').click();
      return assertResultDisplay(view, view.withdrawalTooLargeMessage);
    });
  });

}).call(this);
