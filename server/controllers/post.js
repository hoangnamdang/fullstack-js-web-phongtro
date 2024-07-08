import * as postService from "../services/post";
export const getPosts = async (req, res) => {
  try {
    const response = await postService.getPosts();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      err: -1,
      msg: "fail get post" + error,
    });
  }
};

export const getPostsByLimit = async (req, res) => {
  try {
    const page = Number(req.body?.page || 0);
    const limit = Number(req.body?.limit || 0);
    const response = await postService.getPostByLimit(page, limit);
    return res.status(200).json(response);
  } catch (error) {
    res.status(200).json({
      err: -1,
      msg: "fail to get post by limit " + error,
    });
  }
};
