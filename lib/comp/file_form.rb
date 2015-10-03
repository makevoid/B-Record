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
