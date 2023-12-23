const { success } = require("../utils/responseWrapper");

const getAllPostsController = async (req, res) => {
  try {
    console.log("id: ", req._id);
    return res.send(success(200, "These are all the posts."));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllPostsController };
