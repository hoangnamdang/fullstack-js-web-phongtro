import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilterAcreage, getFilterPrice } from "../../store/actions";
import { SideBarItem, RelatedPost } from "../../components";
const SideBar = () => {
  const dispatch = useDispatch();
  const dataFilterPrice = useSelector((state) => state.filter.dataFilterPrice);
  const categories = useSelector((state) => state.app.category);
  const dataFilterAcreage = useSelector(
    (state) => state.filter.datFilerAcreage
  );
  useEffect(() => {
    dispatch(getFilterPrice());
    dispatch(getFilterAcreage());
  }, [dispatch]);
  return (
    <div>
      <SideBarItem
        title={"xem bang gia"}
        type={"price"}
        dataFilter={dataFilterPrice}
      />
      <SideBarItem
        title={"xem theo dien tich"}
        type={"acreage"}
        dataFilter={dataFilterAcreage}
      />
      <SideBarItem
        title={"Danh muc cho thue"}
        type={"category"}
        dataFilter={categories}
      />
      <RelatedPost />
    </div>
  );
};

export default SideBar;
