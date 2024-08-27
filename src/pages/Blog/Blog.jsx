import { useEffect, useState } from "react";
import { getAllBlogApi } from "../../api/internal";
import SearchIcon from "@mui/icons-material/Search";
import Loader from '../../components/Loader/Loader'
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";

const Blog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1)
  useEffect(() => {
    (async function getBlogsApiCall() {
      const response = await getAllBlogApi();
      if (response.status == 200) {
        setBlog(response.data.blogs);
      }
    })();
  }, []);
  const filteredData = blog.filter((data)=>{
    return data.title.toLowerCase().includes(searchTerm.toLocaleLowerCase());
  });
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * 8;
  const endIndex = startIndex + 8;
  const paginatedUsers = filteredData.slice(startIndex, endIndex);
  if(blog.length == 0){
    return <Loader text='Posts...'/>
  }
  
  
  return (
    <div className="home-container">
      <div className="top-search-heading">
        <h1>Posts</h1>{" "}
        <div className="search-post-blogs">
          <SearchIcon className="search-icon-post" />
          <input type="text" placeholder="Search blog post..." onChange={(e)=>setSearchTerm(e.target.value)}/>
        </div>
      </div>
      {filteredData.length == 0 && <p style={{textAlign: 'center'}}>No data available!</p>}
      <div className="articles-container">
        {paginatedUsers.map((b) => (
          <div className="box-container" onClick={()=>navigate(`/blog/blog-detail/${b.id}`)}>
            <div className="articles-img">
              <img src={b.photoPath == "null" ? '/no-image.webp' : b.photoPath} alt="" />
            </div>
            <h2>{b.title}</h2>
          </div>
        ))}
      </div>
      <Pagination
                  count={Math.ceil(filteredData.length / 8)} 
                  page={page} 
                  onChange={handlePageChange} 
                  variant="outlined" 
                  color="primary" 
                />
    </div>
  );
};

export default Blog;
