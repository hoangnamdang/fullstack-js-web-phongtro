import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Button } from "../../components";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "../../utils/icon";
import { appendUrl } from "../../utils/commonUtil";
const Pagination = ({ totalPage }) => {
  const [arrPage, setArrPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHiddenStar, setIsHiddenStar] = useState(false);
  const [isHiddenEnd, setIsHiddenEnd] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const queryUrlParams = searchParams.entries();
  useEffect(() => {
    if (searchParams) {
      searchParams.get("page") &&
        setCurrentPage(Number(searchParams.get("page")));
      !searchParams.get("page") && setCurrentPage(1);
    }
  }, [searchParams]);

  const handleStepStart = (current, maxPage) => {
    if (current === 1 || current - 4 <= 1 || maxPage < 4) {
      return 1;
    } else if (current >= 6) {
      return current - 3;
    }
  };

  const handleStepEnds = (start, current, maxPage) => {
    if (maxPage < 4) return maxPage;
    const countThree = current + 3;
    if (start === 1 && current === 1) {
      return 4;
    } else if (countThree > maxPage) {
      return maxPage;
    } else {
      return countThree;
    }
  };

  useEffect(() => {
    let start = handleStepStart(currentPage, totalPage);
    let end = handleStepEnds(start, currentPage, totalPage);
    let tempArr = [];
    for (let i = start; i <= end; i++) {
      tempArr.push(i);
    }
    currentPage >= 6 ? setIsHiddenStar(true) : setIsHiddenStar(false);
    totalPage > currentPage ? setIsHiddenEnd(true) : setIsHiddenEnd(false);
    setArrPage(tempArr);
  }, [totalPage, currentPage]);

  const handleChangePage = (page) => {
    const paramSearch = createSearchParams(
      appendUrl(queryUrlParams, { page: page })
    ).toString();
    navigate({
      pathname: location.pathname,
      search: paramSearch,
    });
  };

  const styleBtn = "px-4 py-2 no-underline rounded cursor-pointer";
  const isDisabledNextPage = currentPage === totalPage;
  const isDisabledPrevPage = currentPage === 1;
  const nextPage = !isDisabledNextPage ? currentPage + 1 : 0;
  const prevPage = !isDisabledPrevPage ? currentPage - 1 : 0;
  return (
    <div className="mb-4 mt-4">
      <div className="flex items-center justify-center gap-2 ">
        <Button
          text="trang truoc"
          IcBefore={<MdKeyboardDoubleArrowLeft />}
          customStyle={`${styleBtn} bg-white ${
            isDisabledPrevPage ? "cursor-not-allowed" : "hover:bg-gray-400"
          }`}
          handleClick={() => handleChangePage(prevPage)}
          disabled={isDisabledPrevPage}
        />
        {isHiddenStar && (
          <Button
            text="1"
            customStyle={styleBtn}
            handleClick={() => handleChangePage(1)}
          />
        )}
        {isHiddenStar && <Button text="..." customStyle={styleBtn} />}
        {arrPage.map((d) => {
          return (
            <Button
              key={d}
              text={d}
              customStyle={`${styleBtn} ${
                d === currentPage
                  ? "bg-red-600 text-white"
                  : "bg-white hover:bg-gray-400"
              }`}
              handleClick={() => handleChangePage(d)}
            />
          );
        })}
        {isHiddenEnd && (
          <Button
            text="..."
            customStyle={`${styleBtn} bg-white hover:bg-gray-400`}
          />
        )}
        {isHiddenEnd && (
          <Button
            IcBefore={
              <>
                <MdKeyboardDoubleArrowRight />
                <MdKeyboardDoubleArrowRight />
              </>
            }
            handleClick={() => handleChangePage(totalPage)}
            customStyle={`${styleBtn} bg-white hover:bg-gray-400`}
          />
        )}
        <Button
          IcAfter={<MdKeyboardDoubleArrowRight />}
          text="trang sau"
          customStyle={`${styleBtn} bg-white ${
            isDisabledNextPage ? "cursor-not-allowed" : "hover:bg-gray-400"
          }`}
          handleClick={() => handleChangePage(nextPage)}
          disabled={isDisabledNextPage}
        />
      </div>
    </div>
  );
};

export default Pagination;
