import React, {useState}from 'react'
import modelStyleSheet from  '../../../utils/modalCss/modal.module.css'
import axios from 'axios'
import {baseUrl} from '../../../utils/baseUrl/baseurl'
import {connect} from 'react-redux'

const UpdateAmbulance = ({
  value,
  openModal,
  closeModal,
  modalIsOpen,
  header,
  setIsChange,
  isChange
}) => {
  console.log({value});
  const  [formData, setFormdata] = useState({
    firstName : value.personalInfo.firstName,
    lastName: value.personalInfo.lastName,
    email: value.personalInfo.contact.email,
    number: value.personalInfo.contact.number[0]
  })

  // update form submit handlers
  const submitHandler = async(e) => {
    e.preventDefault() 
    const body = {
      ...value,
      personalInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        contact: {
          email: formData.email
        },
        number: [formData.number]
      }
    }
    const {_id} = value
    const responseOfUpdate = await axios.post(`${baseUrl}/doctor/update/${_id}`, body, header) //request for update 
    if(responseOfUpdate.status == 202) {
      closeModal()
      setIsChange(!isChange)
    }
  }
  return (
    <div className= {`${modelStyleSheet.wrap}`} >
              <div  tabindex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Update Doctor Information</h5>
                      <button 
                      type="button" 
                      className="btn-close" 
                      data-bs-dismiss="modal" 
                      aria-label="Close"
                      onClick = {(e) => {closeModal()}}></button>
                    </div>
                    <div className="modal-body">
                        <form className="col-md-12">

                          {/* First Name */}
                          <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">
                              First Name
                            </label>
                            <input
                              type="text"
                              onChange={(e) => setFormdata({...formData, firstName: e.target.value})}
                              className="form-control"
                              id="exampleInputEmail1"
                              value = {formData.firstName}
                              aria-describedby="emailHelp"
                            ></input>
                          </div>

                         
                          <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">
                              Last Name
                            </label>
                            <input
                              onChange={(e) => setFormdata({...formData, lastName: e.target.value})}
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              value = {formData.lastName}
                              aria-describedby="emailHelp"
                            ></input>
                          </div>

                          <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">
                              Email
                            </label>
                            <input
                              type="text"
                              onChange={(e) => setFormdata({...formData, email: e.target.value})}
                              value = {formData.email}
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            ></input>
                          </div>

                          
                          <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">
                              Contact Number
                            </label>
                            <input
                              type="text"
                              onChange={(e) => setFormdata({...formData, number: e.target.value})}
                              value = {formData.number}
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            ></input>
                          </div>
                          <button
                              className="form-control mt-3 btn btn-danger"
                              onClick = {(e) => submitHandler(e)}
                            >Update</button>
                      </form> 
                    </div>
                    {/* <div class="modal-footer">
                      <button 
                      type="button" 
                      class="btn btn-secondary" 
                      data-bs-dismiss="modal"
                      onClick = {(e) => {closeModal()}}>Close</button>
                    </div> */}
                  </div>
                </div>
              </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    header: state.login.headers
  }
}

export default  connect(mapStateToProps)(UpdateAmbulance)

