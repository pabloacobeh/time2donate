import React from "react";

const CommentForm = ({ singleComment, func, handleCommentChange }) => {
  return (
    <>
      <form style={{ border: "solid 1px lightgrey", margin: "20px 0" }}>
        <h5>Have any Question?</h5>
        <textarea
          value={singleComment.content}
          onChange={handleCommentChange}
          className="form-control my-3"
          name="content"
        />

        <button
          onClick={func}
          className="form-control my-3 btn btn-outline-dark"
        >
          Ask
        </button>
      </form>
    </>
  );
};

export default CommentForm;
