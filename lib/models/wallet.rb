# class Wallet
#   include RModel
#
#   attr_accessor :address, :balance
#
#   def initialize(address:, balance:)
#     @address = address
#     @balance = balance
#   end
#
#   TEST = ->{ Wallet.new address: "1asd", balance: 10_000 }
# end

class Wallet
  extend DebugHelpers

  def initialize
    @pvt_key = PrivateKey.new
    @address = @pvt_key.address_str
  end

  def method_name
    store.pvt_key
  end

  def store
    Native(`localStorage`)
  end
end


# test
# w = Wallet::TEST.(); puts w.attributes
