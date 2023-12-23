const getAllPostsController = async (req, res) => {
  try {
    console.log('id: ',req._id);
    return res.send("These are all the posts.");
    console.log("hasdf");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllPostsController };
