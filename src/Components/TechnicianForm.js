import React, { Component } from 'react';
// import 'react-dropzone-uploader/dist/styles.css'
// import Dropzone from 'react-dropzone-uploader'



class TechnicianForm extends Component {
    state={
        firstName: "",
        lastName: "",
        company: "",
        city: "",
        selectedFile: null
    }

    // uploader = () => {  
    //     return (
    //       <Dropzone 
    //         getUploadParams={() => ({ url: 'https://httpbin.org/post' })} // specify upload params and url for your files
    //         onChangeStatus={({ meta, file }, status) => { console.log(status, meta, file) }}
    //         onSubmit={(files) => { console.log(files.map(f => f.meta)) }}
    //         accept="image/*,audio/*,video/*"
    //       />
    //     )
    //   }



   changeHandler = event => {this.setState({ [event.target.name]: event.target.value})
   }

   photoHandler = event => {
    this.setState({ selectedFile: event.target.files[0] })
   }

   photoUploader = event =>{
       event.preventDefault();
       if (this.state.selectedFile) {
           const formData = new FormData()
           formData.append("pic", this.state.selectedFile) // key is "pic", value is this.state.selected
        //    console.log("hey", formData)
       }
       
      
   }

    render() {console.log("render", this.state.selectedFile)
        return (
            <div> 
                <form onSubmit = {event => this.props.submitTechnicianHandler(event, this.state)}>
                <input type="text"  name="firstName" placeholder="First Name" onChange={this.changeHandler}></input>
                <br/>               
                <input type="text"  name="lastName" placeholder="Last Name" onChange={this.changeHandler}></input>
                <br/>               
                <input type="text"  name="city" placeholder="City/Town" onChange={this.changeHandler}></input>
                <br/> 

                <form onSubmit={this.photoUploader}>
                <input type="file"  name="picture" accept="image/*" multiple= "false" placeholder="Photo" onChange={this.photoHandler}></input>
                <br/> 
                <input type="submit" value="Upload" ></input>
                </form>
                {/* {this.uploader()} */}
                <br/>
                
                    <select id="select-field" name="company" onChange={this.changeHandler}>
                        <option value="">Choose Company</option>
                        <option value="Optimum">Optimum</option>
                        <option value="Dish">Dish</option>
                        <option value="Spectrum">Spectrum</option>
                        <option value="Direct TV">Direct TV</option>
                        <option value="Verizon">Verizon</option> 
                    </select> 
                    <br></br> <br></br>  
                                             
                <input type="submit" value="Submit"></input> &nbsp;
                <input type="reset" ></input>
                 
              </form>
              <br></br>
            
            </div>
        );
    }
}

export default TechnicianForm;
