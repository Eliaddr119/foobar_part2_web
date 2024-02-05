import './WritePost.css';
function WritePost(){
    return(
        <div className="container-fluid">
        <div className="writePostRectangle">
            <div className="postUpFont">Upload A Post</div>
          <input class="form-control" id="uploadInput" type="text" placeholder="Write about something !" aria-label="Write about something !"></input>
        </div>
        </div>
    );
}
export default WritePost;