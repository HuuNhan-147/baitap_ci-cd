import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Container from "../components/Container";
import { ArrowLeft, Save } from "lucide-react";
import { getBlogs, createBlog, updateBlog } from "../services/blogApi";
import { BlogPost } from "../data/types";
import { categories } from "../data/posts";

export default function BlogForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: categories[0]?.name || "Development",
    tags: [],
    author: "Cao Huu Nhan",
    readTime: "5 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  });
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing && id) {
      const fetchPost = async () => {
        try {
          // Because we don't have getBlogById, we can list them all and find,
          // OR if backend had getBlogById, use it. Wait, the backend actually handles /api/blogs/:id via update/delete but get is /:slug.
          // Let's use getBlogs to find it. Or just use getBlogById if we add it...
          const res = await getBlogs({ limit: 100 });
          const post = res.data.find((p: BlogPost) => p._id === id || String(p.id) === id);
          if (post) {
            setFormData(post);
          } else {
            setError("Không tìm thấy bài viết");
          }
        } catch (err) {
          console.error(err);
          setError("Lỗi khi tải bài viết");
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    const type = target.type;
    let finalValue: string | boolean | string[] = target.value;
    
    if (type === "checkbox") {
      finalValue = (target as HTMLInputElement).checked;
    } else if (name === "tags") {
      finalValue = target.value.split(",").map((s: string) => s.trim());
    }

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));

    if (name === "title" && !isEditing) {
      setFormData(prev => ({
        ...prev,
        slug: target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (isEditing && id) {
        await updateBlog(id, formData as BlogPost);
      } else {
        await createBlog(formData as BlogPost);
      }
      navigate("/blog");
    } catch (err: unknown) {
      console.error(err);
      let errorMessage = "Đã có lỗi xảy ra";
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorObj = err as { response?: { data?: { error?: string } } };
        if (errorObj.response?.data?.error) {
          errorMessage = errorObj.response.data.error;
        }
      }
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen pt-32 pb-20 flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-dark-50 dark:bg-dark-950">
      <Container>
        <Link to={isEditing ? `/blog` : "/blog"} className="inline-flex items-center text-dark-500 hover:text-primary-600 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Link>
        
        <div className="max-w-3xl mx-auto bg-white dark:bg-dark-900 rounded-2xl shadow-sm border border-dark-100 dark:border-dark-800 p-8">
          <h1 className="text-3xl font-bold mb-8 text-dark-900 dark:text-white">
            {isEditing ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
          </h1>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Tiêu đề</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-dark-800 dark:border-dark-700 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Nhập tiêu đề..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Slug</label>
              <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-dark-800 dark:border-dark-700 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Hình ảnh (URL)</label>
              <input required type="text" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-dark-800 dark:border-dark-700 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Thể loại</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-dark-800 dark:border-dark-700 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none">
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Tác giả</label>
                <input required type="text" name="author" value={formData.author} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-dark-800 dark:border-dark-700 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Tags (Phân cách bằng dấu phẩy)</label>
              <input type="text" name="tags" value={(formData.tags || []).join(", ")} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg dark:bg-dark-800 dark:border-dark-700 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Tóm tắt ngắn (Excerpt)</label>
              <textarea required name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} className="w-full px-4 py-2 border rounded-lg dark:bg-dark-800 dark:border-dark-700 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1">Nội dung (Markdown)</label>
              <textarea required name="content" value={formData.content} onChange={handleChange} rows={12} className="w-full px-4 py-2 border rounded-lg dark:bg-dark-800 dark:border-dark-700 dark:text-white font-mono text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="h-4 w-4 text-primary-600 rounded" />
              <label htmlFor="featured" className="ml-2 text-sm text-dark-700 dark:text-dark-300">Bài viết nổi bật (Featured)</label>
            </div>

            <div className="pt-4 border-t border-dark-100 dark:border-dark-800">
              <button 
                type="submit" 
                disabled={saving}
                className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg flex items-center justify-center font-medium hover:bg-primary-700 transition disabled:opacity-70"
              >
                {saving ? "Đang lưu..." : <><Save className="h-5 w-5 mr-2" /> Lưu bài viết</>}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
