import "./WritePost.css";
function WritePost() {
  return (
    <div className="container-fluid">
      <div className="writePostRectangle">
        <div className="postUpFont">Upload A Post</div>
        <input
          className="form-control"
          id="uploadInput"
          type="text"
          placeholder="Write about something !"
          aria-label="Write about something !"
        ></input>
        <input id="postUploadButton" className="btn btn-success" type="submit" value="Upload"></input>
      </div>
    </div>
  );
}
export default WritePost;