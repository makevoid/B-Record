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
