(function() {
  var Accounts,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Accounts = (function(_super) {
    __extends(Accounts, _super);

    function Accounts() {
      return Accounts.__super__.constructor.apply(this, arguments);
    }

    return Accounts;

  })(Backbone.Collection);

  window.Accounts = Accounts;

}).call(this);
