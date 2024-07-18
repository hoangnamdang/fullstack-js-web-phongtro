import React from "react";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
const RelatedPostItem = ({ title, newsPost }) => {
  return (
    <div className="bg-white p-5 rounded">
      <h4 className="font-bold text-xl mb-4">{title}</h4>
      {newsPost.length > 0 &&
        newsPost.map((post) => {
          const date1 = dayjs();
          const date2 = dayjs(post.createdAt).format("YYYY-MM-DD");
          const diffDate = date1.diff(date2, "day");
          const listImage = JSON.parse(post?.images?.image || []);
          return (
            <div
              key={post.id}
              className="flex justify-between gap-4 mb-3 pb-3 last:border-0 border-b"
            >
              <img
                className="w-[65px] h-[65px] object-cover flex-shrink-0"
                src={listImage[0]}
                alt=""
              />
              <div>
                <Link to={""}>
                  <h6 className="text-blue-500 text-base leading-5 mb-1">
                    {`${post.title.slice(0, 40)} ...`}
                  </h6>
                </Link>
                <div className="flex justify-between">
                  <span className="text-green-600 font-medium">
                    {post.price}
                  </span>
                  <span className="text-gray-700">{diffDate} ngày trước</span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default RelatedPostItem;
