import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "../../components/Item";
import * as action from "../../store/actions";
import { Pagination } from "./index";
import { useSearchParams } from "react-router-dom";
const List = () => {
  const dispatch = useDispatch();
  const { totalPage, listPost } = useSelector(
    (state) => state.post.dataPostPagination
  );
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = Number(searchParams.get("page") || 1);
    dispatch(action.getPostsByLimit(page));
  }, [dispatch, searchParams]);

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
      <Pagination totalPage={totalPage} />
    </div>
  );
};

export default List;
