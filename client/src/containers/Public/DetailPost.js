import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetPost } from "../../services/post";
import Slider from "react-slick";
import { RelatedPost } from "../../components";
import imgUser from "../../asset/img/user.png";
import {
  CiLocationOn,
  IoPricetagOutline,
  BiArea,
  FaStar,
  RiHashtag,
  FaRegClock,
  FaHeart,
  FaPhoneAlt,
  SiZalo,
} from "../../utils/icon";
const DetailPost = () => {
  const { postId } = useParams();
  const [postDetail, setPostDetail] = useState(null);

  useEffect(() => {
    const getPostById = async () => {
      const response = await apiGetPost(postId);
      if (response.data.err === 0) {
        setPostDetail(response.data.data);
      }
    };
    getPostById();
  }, [postId]);

  const CustomArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, fontSize: 50 }}
        onClick={onClick}
      />
    );
  };

  let settings = {
    className: "mb-8",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomArrow />,
    prevArrow: <CustomArrow />,
  };

  const images =
    postDetail?.images?.image && JSON.parse(postDetail?.images?.image);

  return (
    <div className="w-1100 m-auto mt-4">
      <div className="flex gap-3">
        <div className="w-4/6">
          <Slider {...settings}>
            {images?.map((image) => {
              return (
                <div
                  key={image}
                  className="!flex items-center justify-center h-[300px] bg-black"
                >
                  <img
                    src={image}
                    className="block w-[500px] h-[250px] object-cover"
                    alt=""
                  />
                </div>
              );
            })}
          </Slider>
          <div>
            <span className="inline-flex float-left text-xl h-[30px] items-center">
              {Array(Number(postDetail?.star) || 0)
                .fill()
                .map((_, idx) => {
                  return <FaStar key={idx} className="text-yellow-500" />;
                })}
            </span>
            <p className="text-2xl text-orange-500 font-bold mb-2">
              {postDetail?.title}
            </p>
          </div>
          <p className="flex items-center gap-2 mb-2">
            <CiLocationOn color="blue" fontSize={20} />
            {postDetail?.address}
          </p>
          <div className="flex items-center gap-10 mb-4">
            <p className="flex items-center gap-2 ">
              <IoPricetagOutline fontSize={20} />
              <span className="text-green-600 text-xl font-semibold">
                {postDetail?.price}
              </span>
            </p>
            <p className="flex items-center gap-2 ">
              <BiArea fontSize={20} />
              <span className="text-base">{postDetail?.acreage || 0}m2</span>
            </p>
            <p className="flex items-center gap-2 ">
              <FaRegClock fontSize={20} />
              <span className="text-base">
                {postDetail?.attributes?.published}
              </span>
            </p>
            <p className="flex items-center gap-2 ">
              <RiHashtag fontSize={20} />
              <span className="text-base">
                {postDetail?.attributes?.hashtag}
              </span>
            </p>
          </div>
          <p className="text-2xl font-semibold mb-2s">Thông tin mô tả</p>
          <p className="mb-4">
            {postDetail?.description &&
              JSON.parse(postDetail?.description).join(", ")}
          </p>
          <p className="text-2xl font-semibold">Đặc điểm tin đăng</p>
          <table className="w-full mb-4">
            <tr>
              <td>Ma tin</td>
              <td>{postDetail?.overviews?.code}</td>
            </tr>
            <tr>
              <td>Chuyen muc</td>
              <td>{postDetail?.overviews?.area}</td>
            </tr>
            <tr>
              <td>Loai tin rao</td>
              <td>{postDetail?.overviews?.type}</td>
            </tr>
            <tr>
              <td>Doi tuong thue</td>
              <td>{postDetail?.overviews?.target}</td>
            </tr>
            <tr>
              <td>goi tin</td>
              <td>{postDetail?.overviews?.bonus}</td>
            </tr>
            <tr>
              <td>Ngay dang</td>
              <td>{postDetail?.overviews?.created}</td>
            </tr>
            <tr>
              <td>Ngay het hang</td>
              <td>{postDetail?.overviews?.expired}</td>
            </tr>
          </table>
          <p className="text-2xl font-semibold">Thong tin lien he</p>
          <table className="w-full mb-6">
            <tr>
              <td>Lien he</td>
              <td>{postDetail?.user?.name}</td>
            </tr>
            <tr>
              <td>Dien thoai</td>
              <td>{postDetail?.user?.phone}</td>
            </tr>
            <tr>
              <td>Zalo</td>
              <td>{postDetail?.user?.zalo}</td>
            </tr>
          </table>
        </div>
        <div className="w-2/6">
          <div className="flex flex-col items-center p-3 bg-yellow-400 w-full h-[300px] rounded-md">
            <img src={imgUser} width={80} height={80} alt="" />
            <p className="text-xl font-semibold">user</p>
            <p className="text-base">Dang hoat dong</p>
            <button className="text-xl font-semibold w-full p-1 bg-green-500 text-white rounded-sm mb-2 inline-flex items-center justify-center gap-2">
              <FaPhoneAlt /> 09876533
            </button>
            <button className="text-base font-semibold w-full p-2 bg-white text-gray-700 rounded-sm hover:underline flex items-center justify-center gap-2 mb-2">
              <SiZalo className="text-blue-500 text-xl" /> Nhan Zalo
            </button>
            <button className="text-base font-semibold w-full p-2 bg-white rounded-sm hover:underline mb-3 flex items-center justify-center gap-2">
              <FaHeart /> Yeu thich
            </button>
          </div>
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
