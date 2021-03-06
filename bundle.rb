`console.log("loading app environment")`

`self.$require("browser");`
`self.$require("browser/http");`

`window.bitcore = require('bitcore')`

class HTTP
  def self.get(url, callback)
    `$.getJSON(url, function(data){
      console.log("GET", url)
      callback(data)
    })`
  end

  def self.post(url, params, callback)
    # console.log
    # url = "/test"
    `var success = function(data){
      console.log("POST", url)
      callback(data)
    }`


    `var data = {
      tx: params.tx
    }


    console.log(JSON.stringify(data))
    `


    `ajax = {
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      processData: false,
      type: 'POST',
      success: success,
      url: url
    }`


    `$.ajax(ajax)`

    # `$.ajax(url, ajax, function(data){
    #   console.log("POST", url)
    #   callback(data)
    # })`
  end
end

module RModel
  def attributes
    attrs = instance_variables.map{ |a| a.to_s[1..-1] }
    (attrs - ["constructor", "toString"]).map(&:to_sym)
  end
end

module DebugHelpers
  def log(*mex)
    if mex.size == 1
      `console.log(mex[0])`
    else
      `console.log(mex[0], mex[1])`
    end
  end
end

module UIHelpers
  extend DebugHelpers
  include DebugHelpers

  def q(selector)
    `document.querySelector(selector)`
  end

  def write(elem, content)
    `#{elem}.innerHTML = '#{content}'`
  end
end

class Blockchain

  def self.utxo(address, callback)
    `console.log(address)`
    utxo_url = "https://blockchain.info/unspent?active=#{address}&format=json&cors=true"

    HTTP.get utxo_url, self.utxo_callback(callback)
  end

  def self.utxo_callback(callback)
    -> (utxo) do
      `callback(utxo.unspent_outputs)`
    end
  end

  def self.pushtx(tx_hash, callback)
    pushtx_url = "https://api.blockcypher.com/v1/btc/main/txs/push"
    post_params = { tx: tx_hash }.to_n
    # pushtx_url = "https://insight.bitpay.com/api/tx/send"
    # post_params = { rawtx: tx_hash }.to_n
    HTTP.post pushtx_url, post_params, self.pushtx_callback(callback)
  end

  def self.pushtx_callback(callback)
    -> (tx_info) do
      `console.log("TX INFO", tx_info)`
      `callback(tx_info.tx.hash)`
    end
  end

end

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

require 'native'
require 'json'

class BitCore
  include DebugHelpers

  TX_FEE = 8000

  def initialize(pvt_key_string)
    @pvt_key_string = pvt_key_string
    @pvt_key = PrivateKey.new pvt_key_string
    log 'pvt key', @pvt_key
    @address = @pvt_key.address_str
    log 'address', @address
  end

  def sign_and_broadcast
    -> (message, utxos, callback) do
      log "sign and broadcast"
      # tx_amount = 1000
      tx_amount = 2000

      utxos = hashes_convert utxos

      log "utxo_size", utxos.size
      utxos_out = []
      total_amount_sathoshis = 0

      # TODO: save utxo used in local storage if the transaction succeeded in cache for 2 minutes
      # lock utxo and don't reuse it

      utxos.each do |utxo|
        amount_satoshis = utxo["value"]
        total_amount_sathoshis += amount_satoshis
        amount_btc = `new bitcore.Unit.fromSatoshis(amount_satoshis).BTC`
        log amount_btc
        tx_id = utxo["tx_hash_big_endian"]

        if store.utxos && JSON.parse(store.utxos).include?(tx_id)
          log "skipping transaction: #{tx_id}"
          next
        end

        utxos_out.push({
          address:      @address,
          txId:         tx_id,
          scriptPubKey: utxo["script"],
          amount:       amount_btc,
          vout:         utxo["tx_output_n"],
        })
        break if amount_satoshis > TX_FEE+tx_amount
      end
      log "utxos_out:",  utxos_out.size

      unless utxos.empty?
        fee = TX_FEE # from 5000 it should be a good fee
        utxos_out = utxos_out.to_n
        address = @address
        amount  = tx_amount
        pvt_key = @pvt_key_string
        log "utxos_out: ", utxos_out

        transaction = `new bitcore.Transaction()
          .from(utxos_out)
          .to(address, amount)
          .change(address)
          .fee(fee)
          .addData(message)
          .sign(pvt_key)`

        # log transaction
        tx_hash = `transaction.serialize()`
        log tx_hash

        Blockchain.pushtx tx_hash, self.pushtx_callback(utxos_out, callback)

        # TODO:
        #
        # try {
        #
        #   txHash = transaction.serialize();
        # } catch(error) {
        #
        #   reject({
        #     'message': 'Error serializing the transaction: ' + error.message
        #   });
        # }
      else
        log "ERROR: Not enough UTXOs"
      end

      log "END"

    end
  end

  def pushtx_callback(utxos_out, callback)
    -> (tx_id) do
      log "save in localStorage", tx_id
      log "utxos_out: ", utxos_out

      utxos = store.utxos ? JSON.parse(store.utxos) : []
      utxos = utxos + utxos_out.map{ |utxo| `utxo.txId` }
      store.utxos = utxos.to_json

      log "received tx_id:", tx_id
      log "TX pushed!!!"

      callback.(tx_id)
    end
  end

  def received_utxo(message, callback)
    -> (utxo) do
      log "received UTXO:", utxo
      self.sign_and_broadcast.(message, utxo, callback)
    end
  end

  def op_return(message, callback)
    Blockchain.utxo @address, self.received_utxo(message, callback)
  end

  def store
    Native(`localStorage`)
  end

  # TODO: use require 'json'; JSON.parse; zepto get
  def hashes_convert(array)
    Array.new(array).map do |elem|
      Hash.new elem
    end
  end


end

class Pen
  extend DebugHelpers

  def self.pvt_key
    "L1dkBEcCKUdbn5xgmgmeJWJYE6jWb1UmiwQJjet2ZuQPrYLHoKKM" # 1PzTDHe2GKjv2sHHKoN4Gbu2njLtekkYHh
  end

  def self.write(message, callback)
    log "stylus - preparing to write: #{message}"
    bitcore = BitCore.new(pvt_key)
    bitcore.op_return message, self.callback_write(callback)
  end

  def self.callback_write(callback)
    -> (tx_id) do
      log 'stylus - wrote message! tx_id:', tx_id
      log "https://live.blockcypher.com/btc/tx/#{tx_id}"
      log "https://blockchain.info/tx/#{tx_id}"
      callback.(tx_id)
    end
  end

end

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

class Hasher

  def self.hash_file

  end

  def self.hash(file)

   `

    reader = new FileReader();
    reader.onload = function(data) {
      window.crypto.subtle.digest(
        {
            name: "SHA-256",
        },
        data
      )
      .then(function(hash){
        console.log(new Uint8Array(hash))
      })
      .catch(function(err){
          console.error(err)
      })
    }
    reader.readAsArrayBuffer(file)

    `
  end

end

class MessageForm
  include React::Component
  extend DebugHelpers
  extend UIHelpers
  include UIHelpers

  define_state(:chars)  { 0 }
  define_state(:submit_disabled)  { false }
  define_state(:tx_id)  { nil }
  define_state(:loading) { false }
  define_state(:preview) { "{}" }

  MAX_CHARS = 75

  def write
    log "writing message: #{self.message}"
    self.loading = true
    Pen.write self.message, self.callback_write
  end

  def message
    # mex = q "input[name=message]"
    `document.querySelector("input[name=message]").value`
  end

  def update_counter
    self.chars = String.new(message).size
    self.submit_disabled = true if self.chars > MAX_CHARS
  end

  def input_change
    key = `$('form').serializeArray()`
    # artist = `key[0].value`
    # song   = `key[1].value`
    # url    = `key[2].value`
    # magnet = `key[3].value`
    # btc    = `$('.bitcoin_address').text()`
    # extra  = `key[4].value`
    # log artist
    # key = Array.new key
    # key = {
    #   artist: artist,
    #   song:   song,
    #   url:    url,
    #   magnet: magnet,
    #   btc:    btc,
    #   extra:  extra,
    # }
    prev = `JSON.stringify(#{key})`
    log prev
    prev = prev.split(",").join(",\n")
    self.preview = prev
  end

  def render
    div className: "message_input" do
      form do
        # INPUT
        # div className: "row align-right" do
        #   span do
        #     self.chars
        #   end
        #   span do
        #     " / #{MAX_CHARS} chars"
        #   end
        # end
        # spacer
        div className: "row" do
          div className: "four columns" do
            input(name: "artist", placeholder: "Artist name", type: "text")
          end
        end
        div className: "row" do
          div className: "four columns" do
            input(name: "song", placeholder: "Song name", type: "text")
          end
        end
        div className: "row" do
          div className: "four columns" do
            input(name: "url", placeholder: "URL", type: "text")
          end
        end
        div className: "row" do
          div className: "four columns" do
            input(name: "magnet", placeholder: "Place the magnet link here...", type: "text")
              #.on(:change){ update_counter }
          end
          div className: "two columns" do
            # button(disabled: self.submit_disabled) do
            #   "Write"
            # end.on(:click){ write }
          end
        end
        div className: "row" do
          div className: "four columns" do
            input(name: "extra", placeholder: "Extra data: label, etc", type: "text")
          end
        end
        div className: "row" do
          div className: "two columns" do
            "- or -"
          end
        end
        spacer

        # FILE + BUTTON
        div className: "message_input" do
          div className: "row" do
            div className: "four columns" do
              label do
                div{ "MP3 file" }
                input name: "file", type: "file"
              end
            end
          end
          div className: "row" do
            div className: "four columns" do
              label do
                div{ "FLAC file (optional)" }
                input name: "file_flac", type: "file"
              end
            end
          end
          div className: "row" do
            div className: "four columns" do
              label do
                div{ "preview:" }
                pre className: "preview", type: "file" do
                  self.preview
                end
              end
            end
            div className: "two columns" do
              label do
                div{ "\u00a0" }
                button(disabled: self.submit_disabled) do
                  "Register"
                end.on(:click){ hash_file }
              end
            end
          end
        end

        # MESSAGE
        div className: "spinner" do
          span { "loading..." }
        end if self.loading
        if self.tx_id
          div className: "row" do
            div className: "spacer30"
            div { "the message has been written: #{self.tx_id}" }
            div do
              span do
                a href: "https://live.blockcypher.com/btc/tx/#{self.tx_id}" do
                  "blockcypher.com"
                end
              end
              span { " - " }
              span do
                a href: "https://blockchain.info/tx/#{self.tx_id}" do
                  "blockchain.info"
                end
              end
              span { " - " }
              span do
                a href: "https://chain.so/tx/BTC/#{self.tx_id}" do
                  "chain.so"
                end
              end
              span { " - " }
              span do
                a href: "http://eternitywall.it/m/#{self.tx_id}" do
                  "eternitywall.it"
                end
              end
            end
          end
        end
      end.on(:change){ input_change }
    end
  end

  def callback_write
    -> (tx_id) do
      self.tx_id = tx_id
      self.loading = false
    end
  end

  def spacer
    div className: "spacer10"
  end
end

class Address
  include React::Component
  extend DebugHelpers

  # cmd:  >/apps/vanitygen 1iMoG

  # Address: 1iMoGCdd1spPGWXjhKfBQHsugqgd9L3Fo
  # 5KJJ774B9S1z72Q1THqccVQcjHzMNfU6heKwaLVJ1CtDVZJgrPr


  define_state(:pvt_key)  { PrivateKey.new }
  # define_state(:pvt_key)  { PrivateKey.new }
  # define_state(:pvt_key_string)  { self.pvt_key.to_wif  }
  define_state(:pvt_key_string)  { "" }
  define_state(:address)  { "1iMoGCdd1spPGWXjhKfBQHsugqgd9L3Fo" }

  define_state(:pvt_key_show)  { false }

  # Imogen Heap
  # Tiny Human (instrumental)
  # magnet:?xt=urn:btih:604811df8bd84150e892223c0dca36e47587886b&dn=th.mp3
  # bitcoin:15VKdkSWq9x58ViNAoMaLNUawoF6iC5kUh - don't donate - this is a test!


  # magnet:?xt=urn:btih:10b13913acdd6e62764c3f1554fa99717702c287&dn=makevoid%5FBeta%5FB.mp3&tr=http%3A%2F%2Fs3-tracker.eu-west-1.amazonaws.com%3A6969%2Fannounce

  # define_state(:address)  { self.pvt_key.to_address }
  # define_state(:pvt_key)  { PrivateKey.new }
  # define_state(:pvt_key_wif)  { self.pvt_key.to_wif }

  def show_key
    self.pvt_key_show = true
  end

  def render
    div className: "row" do
      div className: "six columns" do
        div do
          span { "address: " }
          span(className: "bitcoin_address") do
            # key = self.pvt_key
            # `key.toAddress()`
          end
        end
        div do
          div className: "row" do
            div className: "four columns" do
              "\u00a0"
            end
            div className: "two columns #{"hidden" if self.pvt_key_show}" do
              button { "Show key" }.on(:click){ show_key }
            end
          end
        end
        div className: "#{"hidden" unless self.pvt_key_show}" do
          "private key: #{self.pvt_key.to_wif}"
        end
      end
    end
  end
end

class FileForm
  include React::Component
  extend DebugHelpers

  define_state(:submit_disabled)  { false }

  def hash_file
  #  Hasher.hash `document.querySelector("input[name=file]").files[0]`
  #  `console.log("hash file called!!!")`
  end

  def render
    div className: "message_input" do
      div className: "row" do
        div className: "four columns" do
          label do
            div{ "Your MP3 file" }
            input name: "file", type: "file"
          end
        end
      end
      div className: "row" do
        div className: "four columns" do
          label do
            div{ "Your FLAC file (optional)" }
            input name: "file_flac", type: "file"
          end
        end
        div className: "two columns" do
          label do
            div{ "\u00a0" }
            button(disabled: self.submit_disabled) do
              "Register"
            end.on(:click){ hash_file }
          end
        end
      end
    end
  end
end

class Success
  include React::Component

  define_state(:tx_id) { "" }

  def render
    div className: "success" do
      p "Message written:"
      p self.tx_id
    end
  end
end

class BCPen
  include React::Component

  def render
    div className: "bc_stylus" do
      present MessageForm
      # div className: "spacer30"
      # present FileForm # alpha
      div className: "spacer300"
      div className: "address" do
        present Address
      end
    end
  end
end

extend UIHelpers

log "loading app.rb"

content = q ".content"

React.render(
  React.create_element(BCPen),
  `content`
)
