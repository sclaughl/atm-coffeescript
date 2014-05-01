class AtmView extends Backbone.View

  html = """
         <input type='text' data-id='account-number'>
         <input type='text' data-id='amount'>
         <p data-id='result-message'></p>
         <button data-id='balance-button'>Get Balance</button>
         <button data-id='deposit-button'>Deposit</button>
         <button data-id='withdraw-button'>Withdraw</button>
         """

  template:  _.template(html)

  events:
    'click [data-id=balance-button]' : 'showBalance'
    'click [data-id=deposit-button]' : 'makeDeposit'
    'click [data-id=withdraw-button]' : 'makeWithdrawal'

  accountNotFoundMessage:
    'Invalid account!'

  depositTooLargeMessage:
    'Deposit too large!'

  withdrawalTooLargeMessage:
    'Withdrawal too large!'

  render: ->
    @$el.html(@template)
    @

  showBalance: ->
    if account = @getAccount()
      @setResultText(account.get('balance'))
    else
      @setResultText(@accountNotFoundMessage)

  makeDeposit: ->
    account = @getAccount()
    depositAmount = parseFloat(@$('[data-id=amount]').val())
    if depositAmount > 200
      @setResultText(@depositTooLargeMessage)
    else
      currentBalance = parseFloat(account.get('balance'))
      account.set('balance', currentBalance + depositAmount)

  makeWithdrawal: ->
    account = @getAccount()
    withdrawalAmount = parseFloat(@$('[data-id=amount]').val())
    currentBalance = parseFloat(account.get('balance'))
    if withdrawalAmount > currentBalance
      @setResultText(@withdrawalTooLargeMessage)
    else
      account.set('balance', currentBalance - withdrawalAmount)

  accountNumber: ->
    @$('[data-id=account-number]').val()

  setResultText: (text) ->
    @$('[data-id=result-message]').text(text)

  getAccount:  -> 
    @collection.findWhere(account_number: @accountNumber())

window.AtmView = AtmView

