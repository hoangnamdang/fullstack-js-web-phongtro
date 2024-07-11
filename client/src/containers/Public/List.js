import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/actions";
import { Pagination } from "./index";
import { useSearchParams } from "react-router-dom";
import ListItem from "../../components/ListItem";
const List = () => {
  const dispatch = useDispatch();
  const { totalPage, listPost } = useSelector(
    (state) => state.post.dataPostPagination
  );
  const [searchParams] = useSearchParams();
  useEffect(() => {
    let paramUrl = {};
    searchParams.forEach((value, key) => {
      paramUrl[key] = value;
    });
    dispatch(action.getPostsByLimit(paramUrl));
  }, [dispatch, searchParams]);

  return (
    <div className="bg-white rounded-md">
      <div className="p-5">
        <h4 className="font-bold text-xl text-gray-800">
          Tổng 128.761 kết quả
        </h4>
        <div className="flex items-center gap-4">
          <span>Sap xep:</span>
          <button>Mặc định</button>
          <button>Mới nhất</button>
        </div>
      </div>
      {listPost.length === 0 && (
        <p className="p-5">Không có kết quả tìm kiếm</p>
      )}
      {listPost.length > 0 &&
        listPost.map((post) => {
          return <ListItem key={post.id} data={post} />;
        })}
      {listPost.length > 0 && <Pagination totalPage={totalPage} />}
    </div>
  );
};

export default List;
