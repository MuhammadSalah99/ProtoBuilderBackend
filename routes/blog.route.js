const express = require('express')
const blogCont = require('../controllers/blog.controller.js')
const {getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog }  = blogCont;
const router  = express.Router()

router.get('/blogs', blogCont.getAllBlogs);

// POST /blogs
router.post('/blogs', blogCont.createBlog);

// GET /blogs/:id
router.get('/blogs/:id', blogCont.getBlogById);

// PUT /blogs/:id
router.put('/blogs/:id', blogCont.updateBlog);

// DELETE /blogs/:id
router.delete('/blogs/:id', blogCont.deleteBlog);


module.exports = router

