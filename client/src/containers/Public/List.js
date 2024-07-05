import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "../../components/Item";
import * as action from "../../store/actions";
const List = () => {
  const dispatch = useDispatch();
  const listPost = useSelector((state) => state.post.posts);
  console.log(listPost);
  useEffect(() => {
    console.log("run dispatch");
    dispatch(action.getAllPost());
  }, [dispatch]);

  return (
    <div className="">
      <h4 className="font-bold text-xl text-gray-800">Tổng 128.761 kết quả</h4>
      <div className="flex items-center gap-4">
        <span>Sap xep:</span>
        <button>Mặc định</button>
        <button>Mới nhất</button>
      </div>
      {listPost.map((post) => {
        return <Item key={post.id} data={post} />;
      })}
    </div>
  );
};

export default List;
