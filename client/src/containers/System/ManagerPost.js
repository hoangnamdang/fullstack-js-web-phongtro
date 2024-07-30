import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/actions";
import PopupEdit from "../../components/PopupEdit";
import { apiDeletePost } from "../../services/post";
import Swal from "sweetalert2";
const ManagerPost = () => {
  const dispatch = useDispatch();
  const listPost = useSelector((state) => state.post.listPostDemoUpdate);
  const [isShowPopup, setShowPopup] = useState(false);
  const [dataEditPost, setDataEditPost] = useState("");
  useEffect(() => {
    dispatch(action.getPostDemoUpdate());
  }, [dispatch]);

  const handelEdit = (item) => {
    setShowPopup(true);
    setDataEditPost(item);
  };
  const handelDelete = async (id) => {
    const response = await apiDeletePost(id);
    if (response.data.err === 0) {
      Swal.fire({
        title: "success",
        text: response.data.msg,
        icon: "success",
      });
    }
    dispatch(action.getPostDemoUpdate());
  };
  return (
    <div>
      {isShowPopup && <PopupEdit dataEditPost={dataEditPost} />}
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      title
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      categoryCode
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      description
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      address
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  {listPost.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item.title}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.categoryCode}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.description}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.address}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button
                            onClick={() => handelEdit(item)}
                            type="button"
                            class="mr-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handelDelete(item.id)}
                            type="button"
                            class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-orange-600 hover:text-orange-800 focus:outline-none focus:text-orange-800 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerPost;
