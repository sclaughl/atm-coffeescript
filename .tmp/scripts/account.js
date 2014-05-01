(function() {
  var Account,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Account = (function(_super) {
    __extends(Account, _super);

    function Account() {
      return Account.__super__.constructor.apply(this, arguments);
    }

    Account.prototype.balance = function() {
      return this.get('balance');
    };

    Account.prototype.setBalance = function(amount) {
      return this.set('balance', amount);
    };

    Account.prototype.deposit = function(amount) {
      return this.setBalance(this.balance() + parseFloat(amount));
    };

    return Account;

  })(Backbone.Model);

  window.Account = Account;

}).call(this);
