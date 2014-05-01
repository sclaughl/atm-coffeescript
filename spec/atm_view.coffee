describe 'AtmView', ->
  createAccounts = (accountData) ->
    new Accounts(accountData)

  createAtmView = (accountData) ->
    new AtmView(collection: createAccounts(accountData))

  setAccountNumberVal = (view, val) ->
    view.$('[data-id=account-number]').val(val)

  clickForBalance = (view) ->
    view.$('[data-id=balance-button]').click()

  assertResultDisplay = (view, msg) ->
    expect(view.$('[data-id=result-message]').text()).toEqual(msg)

  it 'displays the balance', ->
    view = createAtmView([{account_number: '123', balance: 9.5}]).render()
    setAccountNumberVal(view, '123')
    clickForBalance(view)
    assertResultDisplay(view, '9.5')

  it 'errors if the account is not found', ->
    view = createAtmView([{account_number: '123', balance: 9.5}]).render()
    setAccountNumberVal(view, '456')
    clickForBalance(view)
    assertResultDisplay(view, view.accountNotFoundMessage)

  it 'allows deposits', ->
    view = createAtmView([{account_number: '123', balance: 9.5}]).render()
    setAccountNumberVal(view, '123')
    view.$('[data-id=amount]').val(100)
    view.$('[data-id=deposit-button]').click()
    account = view.collection.first()
    expect(account.get('balance')).toEqual(109.5)

  it 'does not allow deposits over $200', -> 
    view = createAtmView([{account_number: '123', balance: 9.5}]).render()
    setAccountNumberVal(view, '123')
    view.$('[data-id=amount]').val(201)
    view.$('[data-id=deposit-button]').click()
    assertResultDisplay(view, view.depositTooLargeMessage)

  it 'allows withdrawals', ->
    view = createAtmView([{account_number: '123', balance: 9.5}]).render()
    setAccountNumberVal(view, '123')
    view.$('[data-id=amount]').val(4.5)
    view.$('[data-id=withdraw-button]').click()
    account = view.collection.first()
    expect(account.get('balance')).toEqual(5)

  it 'does not allow withdrawals that exceed account balance', ->
    view = createAtmView([{account_number: '123', balance: 9.5}]).render()
    setAccountNumberVal(view, '123')
    view.$('[data-id=amount]').val(10)
    view.$('[data-id=withdraw-button]').click()
    assertResultDisplay(view, view.withdrawalTooLargeMessage)

