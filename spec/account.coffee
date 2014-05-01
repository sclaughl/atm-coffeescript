describe 'Account', ->

  it 'allows deposits', ->
    account = new Account(balance: 100)
    account.deposit('50')
    expect(account.get('balance')).toEqual(150)

