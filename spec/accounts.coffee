describe 'Accounts', ->
  it 'behaves like a backbone collection', ->
    collection = new Accounts([{account_number: 1234}])
    expect(collection.first().get('account_number')).toEqual(1234)
