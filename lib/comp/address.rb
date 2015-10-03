class Address
  include React::Component
  extend DebugHelpers

  # cmd:  >/apps/vanitygen 1iMoG

  # Address: 1iMoGCdd1spPGWXjhKfBQHsugqgd9L3Fo
  # 5KJJ774B9S1z72Q1THqccVQcjHzMNfU6heKwaLVJ1CtDVZJgrPr
  define_state(:address_asd)  { "1iMoGCdd1spPGWXjhKfBQHsugqgd9L3Fo" }
  define_state(:pvt_key)  { PrivateKey.new }
  define_state(:pvt_key_string)  { pvt_key  }
  define_state(:address)  { "1iMoGCdd1spPGWXjhKfBQHsugqgd9L3Fo" }

  define_state(:pvt_key_show)  { "hidden" }



  # magnet:?xt=urn:btih:10b13913acdd6e62764c3f1554fa99717702c287&dn=makevoid%5FBeta%5FB.mp3&tr=http%3A%2F%2Fs3-tracker.eu-west-1.amazonaws.com%3A6969%2Fannounce

  # define_state(:address)  { self.pvt_key.to_address }
  # define_state(:pvt_key)  { PrivateKey.new }
  # define_state(:pvt_key_wif)  { self.pvt_key.to_wif }

  def render
    div className: "row" do
      div className: "six columns" do
        div do
          "address: #{self.address}"
        end
        div do
          div className: "row" do
            div className: "five columns" do
              "-"
            end
            div className: "one columns #{self.pvt_key_show}" do
              button { "Show key" }
            end.on(:click){ show_key }
          end
        end
        div do
          "private key: #{self.address}"
        end
      end
    end
  end
end
