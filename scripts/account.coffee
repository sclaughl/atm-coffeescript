class Account extends Backbone.Model

  balance: ->
    @get('balance')

  setBalance: (amount )->
    @set('balance', amount)

  deposit: (amount) ->
    @setBalance(@balance() + parseFloat(amount))


window.Account = Account
