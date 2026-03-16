import axios from 'axios';

const API_URL = 'http://localhost:5000/api/blogs';

import { BlogPost } from '../data/types';

export const getBlogs = async (params: { page?: number; limit?: number; category?: string } = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const getBlogBySlug = async (slug: string) => {
  const response = await axios.get(`${API_URL}/${slug}`);
  return response.data;
};

export const createBlog = async (data: BlogPost) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateBlog = async (id: string, data: BlogPost) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteBlog = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
