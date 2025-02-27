const Blog = require("../models/Blog");
const express = require("express");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs) {
      res.status(400).json(res.error);
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).send("Error getting posts : " + error.message);
  }
};

exports.createblog = async (req, res) => {
  const { title, description, date, image } = req.body;

  // Validate required fields
  if (!title || !description) {
    return res.status(400).send("Title and description are required.");
  }
  const blog = new Blog({
    title,
    description,
    image,
    date,
  });

  try {
    await blog.save();
    return res.status(200).json({ msg: "Blog created success" });
  } catch (error) {
    res.status(500).send("Error creating post : " + error.message);
  }
};

//Get blog by id
exports.getSingleblog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log("There is a error:", error);
    res.status(500).send("error getting single blog : " + error.message);
  }
};

// Like a post
exports.likeblog = async (req, res) => {
  const blogId = req.params.id;
  try {
    await Blog.findByIdAndUpdate(blogId, { $inc: { likes: 1 } });
    return res.status(200).json({ msg: "Blog liked" });
  } catch (error) {
    res.status(500).send("Error liking post: " + error.message);
  }
};

//delete a post
exports.deleteblog = async (req, res) => {
  const blogId = await Blog.findByIdAndDelete(req.params.id);
  try {
    if (!blogId) {
      return res.status(404).json({ message: "blog not found" });
    }
    return res.status(200).json({ msg: "blog deleted success" });
  } catch (error) {
    res.status(500).send("Error liking post: " + error.message);
  }
};

//update a post
exports.updateblog = async (req, res) => {
  const { title, description, image, date } = req.body;
  const blogId = await Blog.findByIdAndUpdate(req.params.id, {
    title,
    description,
    image,
    date,
  });
  try {
    if (!blogId) {
      return res.status(404).json({ message: "blog not found" });
    }
    res.status(200).json(blogId);
  } catch (error) {
    res.status(500).send("Error update post: " + error.message);
  }
};
