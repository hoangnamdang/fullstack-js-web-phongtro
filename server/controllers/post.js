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
    const response = await postService.getPostByLimit(req.query);
    return res.status(200).json(response);
  } catch (error) {
    res.status(200).json({
      err: -1,
      msg: "fail to get post by limit " + error,
    });
  }
};

export const getNewsPost = async (req, res) => {
  try {
    const limit = 10;
    const response = await postService.getNewsPost(limit);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      err: -1,
      msg: "fail to get news post " + error,
    });
  }
};
