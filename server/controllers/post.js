import * as postService from "../services/post";
import { hasValue } from "../utils/commonUtils";
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

export const createPost = async (req, res) => {
  try {
    const {
      title,
      address,
      categoryCode,
      description,
      images,
      price,
      acreage,
      provinceName,
      targetName,
      labelCodeName,
      userId,
    } = req.body;
    if (
      !title ||
      !address ||
      !categoryCode ||
      !description ||
      !images ||
      price === "" ||
      acreage === "" ||
      !provinceName ||
      !targetName ||
      !labelCodeName ||
      !userId
    ) {
      return res.status(400).json({
        err: 1,
        msg: "Missing field",
      });
    }
    const response = await postService.createPost(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      err: -1,
      msg: "fail to create post " + error,
    });
  }
};

export const getPostDemoUpdate = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "missing field",
      });
    const response = await postService.getPostDemoUpdate(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      err: -1,
      msg: "fail to get news post " + error,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.user;
    const idPost = req.params.id;
    if (!id || !idPost)
      return res.status(400).json({
        err: 1,
        msg: "missing field",
      });
    const response = await postService.deletePost(idPost);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      err: -1,
      msg: "fail to get news post " + error,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await postService.getPost(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      err: -1,
      msg: "fail to get post " + error,
    });
  }
};
