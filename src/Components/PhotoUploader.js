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
           
           let options = { method: 'POST',          
                           headers: {
                              // Dont need to include 'Content-Type': 'application/json', it will cause a bug !!!!
                               Accept: 'application/json'
                               },
                           body: formData
                        }
           fetch(`https://nycable.herokuapp.com/users/${this.props.currentUser.id}/upload_photo`, options)
           .then(response => response.json())
           .then(response => {this.props.submitPhoto(response); this.setState({selectedFile: null})}
            )         
        }   
   }

    render() {
        // console.dir("uploader", this.props.currentUser)
        return (
            < div id="flex">            
                <form id="margin" onSubmit={this.photoUploader}>
                  Change picture &nbsp;   
                <input id="file" type="file"  
                       name="picture" 
                       accept="image/*" 
                       multiple= "false" 
                       onChange={this.changeHandler}></input>
                    <br/> 
                      {this.state.selectedFile ?     
                     <><img id="photo-preview" src={this.filePreview()} alt="userphoto"></img><br/>
                      <input type="submit" value="Upload" ></input></>

                     : null} 

                </form>
            </div>
        );
    }
}

export default PhotoUploader;
