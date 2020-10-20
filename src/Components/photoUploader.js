import React, { Component } from 'react';
// import 'react-dropzone-uploader/dist/styles.css'
// import Dropzone from 'react-dropzone-uploader'



class photoUploader extends Component {
    state={
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
                {/* <form onSubmit = {event => this.props.submitTechnicianHandler(event, this.state)}> */}
              

                <form onSubmit={this.photoUploader}>
                <input type="file"  name="picture" accept="image/*" multiple= "false" placeholder="Photo" onChange={this.photoHandler}></input>
                <br/> 
                <input type="submit" value="Upload" ></input>
                </form>
                {/* {this.uploader()} */}
                <br/>
                      
             
              <br></br>
            
            </div>
        );
    }
}

export default photoUploader;
