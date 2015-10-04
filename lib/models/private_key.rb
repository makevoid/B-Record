class PrivateKey
  def initialize(key)
    @key = `new bitcore.PrivateKey(key)`
  end

  def address
    key = @key
    `key.toAddress()`
  end

  # alias :to_address :address

  def address_str
    address = self.address
    `address.toString()`
  end

  def to_wif
    key = @key
    `key.toWIF()`
  end
end
