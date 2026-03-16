const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

router.route('/')
  .get(getBlogs)
  .post(createBlog);

// Important: Put /:id route before /:slug if they share methods, but since they don't share identical method here, it's fine.
// Actually, to make sure there's no conflict:
router.route('/:id')
  .put(updateBlog)
  .delete(deleteBlog);

router.route('/:slug')
  .get(getBlogBySlug);

module.exports = router;
