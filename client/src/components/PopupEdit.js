import React from "react";
import CreatePost from "../containers/System/CreatePost";

const PopupEdit = ({ dataEditPost }) => {
  return (
    <div className="w-4/5 bg-white m-auto overflow-y-auto p-2 fixed top-0 left-0 right-0 bottom-0">
      <CreatePost dataEditPost={dataEditPost} />
    </div>
  );
};

export default PopupEdit;
