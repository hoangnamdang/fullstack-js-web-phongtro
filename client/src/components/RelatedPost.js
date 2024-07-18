import React, { useEffect } from "react";
import { RelatedPostItem } from "./index";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../store/actions";
const RelatedPost = () => {
  const dispatch = useDispatch();
  const newsPost = useSelector((state) => state.post.newsPost);

  useEffect(() => {
    dispatch(action.getNewsPost());
  }, [dispatch]);

  return (
    <div className="mb-4">
      <RelatedPostItem title="Tin moi dang" newsPost={newsPost} />
    </div>
  );
};

export default RelatedPost;
