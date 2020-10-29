import React, { Component } from 'react';


class PhotoUploader extends Component {
    state={
        selectedFile: null,
    }

changeHandler = event => {   
      this.setState({ 
          selectedFile: event.target.files[0]
      })
    }

filePreview=()=>{
    let  url= URL.createObjectURL(this.state.selectedFile)
    return url
}



photoUploader = event =>{
       event.preventDefault();
       if (this.state.selectedFile) {
       
           let formData = new FormData()
           formData.append("photo", this.state.selectedFile) // key is "pic", value is this.state.selectedFile
            console.log("data", formData.get("photo"))
           
           let options = { method: 'POST',          
                           headers: {
                              // Dont need to include 'Content-Type': 'application/json', it will couse a bug !!!!
                               Accept: 'application/json'
                               },
                           body: formData
                        }
           fetch(`http://localhost:4000/users/${this.props.currentUser.id}/upload_photo`, options)
           .then(response => response.json())
           .then(response => {console.log("uploadre", response); this.props.submitPhoto(response); this.setState({selectedFile: null})}
            )         
       }   
   }

    render() {
        // console.dir("uploader", this.props.currentUser)
        return (
            <div>            

                <form onSubmit={this.photoUploader}>
                 Add of change picture:      
                <input id="file" type="file"  name="picture" accept="image/*" multiple= "false" placeholder="Photo" onChange={this.changeHandler}></input>
                <br/> 
                      {this.state.selectedFile ?     
                     <><img id="photo-preview" src={this.filePreview()}></img><br></br>
                      <input type="submit" value="Upload" ></input></>

                     : null} 
                
                </form>
              <br></br>
            </div>
        );
    }
}

export default PhotoUploader;
