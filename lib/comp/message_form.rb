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
