import { useEffect, useState } from "react"
import { getNewsApi } from "../../api/external";
import Loader from "../../components/Loader/Loader";
import { Pagination } from "@mui/material";


const Home = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1)
  useEffect(()=>{
    (async function newsApiCall(){
      const response = await getNewsApi();
      if(response.status == 'ok'){

        setArticles(response.articles);
      }else{
        setArticles([]);
      }
    })();
  }, []);
  
  const handleOpenDetailPage = (url)=>{
    window.open(url, '_blank');
  }
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * 8;
  const endIndex = startIndex + 8;
  const paginatedUsers = articles.slice(startIndex, endIndex);
  if(articles.length == 0){
    return <Loader text='Homepage'/>
  }
  return (
    <div className="home-container">
      <h1>Articles</h1>
      <div className="articles-container">
        {paginatedUsers.map((article)=>(
          <div className="box-container" onClick={()=>handleOpenDetailPage(article.url)}>
          <div className="articles-img">
            <img src={article.urlToImage} alt="" />
          </div>
          <h2>{article.title}</h2>
        </div>
        ))}
      </div>
      <Pagination
                  count={Math.ceil(articles.length / 8)} 
                  page={page} 
                  onChange={handlePageChange} 
                  variant="outlined" 
                  color="primary" 
                />
    </div>
  )
}

export default Home
