(function() {
  var AtmView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AtmView = (function(_super) {
    var html;

    __extends(AtmView, _super);

    function AtmView() {
      return AtmView.__super__.constructor.apply(this, arguments);
    }

    html = "<input type='text' data-id='account-number'>\n<input type='text' data-id='amount'>\n<p data-id='result-message'></p>\n<button data-id='balance-button'>Get Balance</button>\n<button data-id='deposit-button'>Deposit</button>\n<button data-id='withdraw-button'>Withdraw</button>";

    AtmView.prototype.template = _.template(html);

    AtmView.prototype.events = {
      'click [data-id=balance-button]': 'showBalance',
      'click [data-id=deposit-button]': 'makeDeposit',
      'click [data-id=withdraw-button]': 'makeWithdrawal'
    };

    AtmView.prototype.accountNotFoundMessage = 'Invalid account!';

    AtmView.prototype.depositTooLargeMessage = 'Deposit too large!';

    AtmView.prototype.withdrawalTooLargeMessage = 'Withdrawal too large!';

    AtmView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    AtmView.prototype.showBalance = function() {
      var account;
      if (account = this.getAccount()) {
        return this.setResultText(account.get('balance'));
      } else {
        return this.setResultText(this.accountNotFoundMessage);
      }
    };

    AtmView.prototype.makeDeposit = function() {
      var account, currentBalance, depositAmount;
      account = this.getAccount();
      depositAmount = parseFloat(this.$('[data-id=amount]').val());
      if (depositAmount > 200) {
        return this.setResultText(this.depositTooLargeMessage);
      } else {
        currentBalance = parseFloat(account.get('balance'));
        return account.set('balance', currentBalance + depositAmount);
      }
    };

    AtmView.prototype.makeWithdrawal = function() {
      var account, currentBalance, withdrawalAmount;
      account = this.getAccount();
      withdrawalAmount = parseFloat(this.$('[data-id=amount]').val());
      currentBalance = parseFloat(account.get('balance'));
      if (withdrawalAmount > currentBalance) {
        return this.setResultText(this.withdrawalTooLargeMessage);
      } else {
        return account.set('balance', currentBalance - withdrawalAmount);
      }
    };

    AtmView.prototype.accountNumber = function() {
      return this.$('[data-id=account-number]').val();
    };

    AtmView.prototype.setResultText = function(text) {
      return this.$('[data-id=result-message]').text(text);
    };

    AtmView.prototype.getAccount = function() {
      return this.collection.findWhere({
        account_number: this.accountNumber()
      });
    };

    return AtmView;

  })(Backbone.View);

  window.AtmView = AtmView;

}).call(this);
