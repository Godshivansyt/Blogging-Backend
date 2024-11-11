// utils/validators.js
exports.validatePost = (postData) => {
  const { title, content, category } = postData;
  return title && content && category;
};
