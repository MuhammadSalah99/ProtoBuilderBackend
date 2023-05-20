const db = require('../models')
const Blog = db.blogs;


// GET /blogs
const getAllBlogs = async (req, res) =>  {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// POST /blogs
async function createBlog(req, res) {
  const { title, content, userId } = req.body;
  
  try {
    const blog = await Blog.create({ title, content, userId });
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// GET /blogs/:id
async function getBlogById(req, res) {
  const blogId = req.params.id;
  
  try {
    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// PUT /blogs/:id
async function updateBlog(req, res) {
  const blogId = req.params.id;
  const { title, content } = req.body;
  
  try {
    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    blog.title = title;
    blog.content = content;
    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// DELETE /blogs/:id
async function deleteBlog(req, res) {
  const blogId = req.params.id;
  
  try {
    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    await blog.destroy();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog
};

