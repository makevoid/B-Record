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
