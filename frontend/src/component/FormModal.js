import React, { useRef, useState } from "react"
import { FaTimes } from "react-icons/fa"
import { BsCalendar } from "react-icons/bs"
import obImg from "../assets/ob-img.png"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { createObituary } from "../api/obituary.api"

export function FormModal({ showForm, setShowForm }) {
  // States

  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("yyyy-mm-dd, --:--: --")
  const [deathDate, setDeathDate] = useState(new Date().toISOString())
  const [imageRef, setImageRef] = useState("") // Cloudanary
  const [obituaryText, setObituaryText] = useState("") // From ChatGPT
  const [buttonText, setButtonText] = useState("Write Obituary")

  // Refs
  const hiddenFileInput = useRef(null)

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleFileUploadButtonClick() {
    hiddenFileInput.current.click()
  }

  function handleImageChange(e) {
    const fileUploaded = e.target.files[0]
    console.log(fileUploaded)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log("Submitting request")

    setButtonText(
      "Please Wait. Its not like they're gonna be late for something.. "
    )
    await createObituary(name, birthDate, deathDate, imageRef, obituaryText)
    setButtonText("Write Obituary")
    setShowForm(false)
  }

  return (
    <div
      className={`${showForm ? "modal-overlay show-modal" : "modal-overlay"}`}
    >
      <div className="modal-container">
        <h3>Create a New Obituary</h3>
        <img src={obImg}></img>
        <button className="close-modal-btn" onClick={() => setShowForm(false)}>
          <FaTimes></FaTimes>
        </button>
        <div>
          <div className="image-upload-container">
            <button
              className="image-upload-btn"
              onClick={handleFileUploadButtonClick}
            >
              <p>Select an image for the deceased</p>
            </button>

            <input
              className=""
              type="file"
              accept="image/*"
              ref={hiddenFileInput}
              onChange={handleImageChange}
              style={{ visibility: "hidden" }}
            ></input>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name field */}
            <div className="name-input-container">
              <label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name of the deceased"
                  required={true}
                  className="form-input"
                  onChange={handleNameChange}
                ></input>
              </label>
            </div>

            <div className="datepickers">
              <div>
                Born: {birthDate}
                <DatePicker
                  showTimeSelect
                  dateFormat="yyyy-mm-dd hh:mm"
                  customInput={<BsCalendar></BsCalendar>}
                  onChange={(newDate) =>
                    setBirthDate(
                      newDate.toLocaleString("en-US", {
                        day: "2-digit",
                        year: "numeric",
                        month: "2-digit",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })
                    )
                  }
                ></DatePicker>
              </div>

              <div className="datepickers">
                <div>
                  Died: {deathDate}
                  <DatePicker
                    showTimeSelect
                    dateFormat="yyyy-mm-dd h:mm"
                    selectsStart
                    customInput={<BsCalendar ref={useRef()}></BsCalendar>}
                    onChange={(newDate) =>
                      setDeathDate(
                        newDate.toLocaleString("en-US", {
                          day: "2-digit",
                          year: "numeric",
                          month: "2-digit",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                      )
                    }
                  ></DatePicker>
                </div>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
