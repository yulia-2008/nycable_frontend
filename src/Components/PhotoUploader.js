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
           formData.append("photo", this.state.selectedFile) // key is "photo", value is this.state.selectedFile
           let options = { method: 'POST',          
                           headers: {
                              // Dont need to include 'Content-Type': 'application/json', it will cause a bug !!!!
                               Accept: 'application/json'
                               },
                           body: formData
                        }
           fetch(`https://nycable.herokuapp.com/users/${this.props.currentUser.id}/upload_photo`, options)
           .then(response => response.json())
           .then(response => {console.log("k", response); this.props.submitPhoto(response); this.setState({selectedFile: null})}
            )         
        }   
   }

    render() {
        // console.dir("uploader", this.props.currentUser)
        return (
            <>            
                <form id="container-for-input-file" onSubmit={this.photoUploader}>
                    Change picture &nbsp;   
                    <input type="file"  
                            name="picture" 
                            accept="image/*" 
                            multiple= "false" 
                            onChange={this.changeHandler}></input>                    
                </form>
               
                {this.state.selectedFile ?     
                    <>
                    <br/>
                    <img id="photo-preview" src={this.filePreview()} alt="userphoto"></img><br/>
                    <input id="submit" type="submit" value="Upload"></input>
                    <br/>
                    </>
                    : 
                    null
                }                
            </>
        );
    }
}

export default PhotoUploader;
