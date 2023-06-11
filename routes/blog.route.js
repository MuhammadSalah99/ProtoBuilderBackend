const express = require('express')
const blogCont = require('../controllers/blog.controller.js')
const {getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog }  = blogCont;
const router  = express.Router()

router.get('/blogs', blogCont.getAllBlogs);

router.post('/blogs', blogCont.createBlog);

router.get('/blogs/:id', blogCont.getBlogById);

router.get('/blogs/:userId', blogCont.getBlogsByUser);

router.put('/blogs/:id', blogCont.updateBlog);

router.delete('/blogs/:id', blogCont.deleteBlog);


module.exports = router

