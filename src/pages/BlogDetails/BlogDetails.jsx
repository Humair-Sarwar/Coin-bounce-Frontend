import {
  Box,
  Button,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNewComment, deleteBlogDetails, getBlogDetails, getCommentsApi } from "../../api/internal";
import { useDispatch, useSelector } from "react-redux";
import { setSuccessState } from "../../store/alertSuccess";

const BlogDetails = () => {
  const [ownsBlog, setOwnsBlog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const author = useSelector(state=>state.user.id);
  const [reload, setReload] = useState(false);
  const params = useParams();
  const id = params.id;
  const [details, setDetails] = useState([]);
  const [comment, newComment] = useState('');
  const [comments, setComments] = useState([]);
  useEffect(()=>{
    async function getData(){
      const blogDetailsData = await getBlogDetails(id);
      if(blogDetailsData.status == 200){
        setDetails(blogDetailsData.data.blog);
        setOwnsBlog(author == blogDetailsData.data.blog.author)
      }

      const commentData = await getCommentsApi(id);
      if(commentData.status == 200){
        setComments(commentData.data.comments);
        console.log(commentData);
        
      }
    }
    getData();
  }, [reload]);
  const handlePost = async (e)=>{
    let data = {
      content: comment,
      author,
      blogId: id
    }
    const response = await createNewComment(data);
    if(response.status == 201){
      setReload(!reload);
      newComment('');
    }
  }
  const handleDeleteBlog = async ()=>{
    const response = await deleteBlogDetails(id);
    if(response.status == 200){
      let data = {
        successState: true,
        message: 'Blog Deleted Successfully'
      }
      dispatch(setSuccessState(data));
      navigate('/blog')
    }
  }
  return (
    <Paper sx={{ m: 9 }}>
      <Grid container spacing={2}>
        <Grid item xs={8} sx={{borderRight: '1px solid #f2f2f2'}} className="blog-details-container-padding">
          <CardMedia
            component="img"
            height="400"
            image={details.photoPath == "null" ? '/no-image.webp' : details.photoPath}
            alt="Paella dish"
            textAlign={"left"}
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" fontSize={"30px"}>
                {details.title}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
        <span>{new Date(details.createdAt).toDateString()}</span>
      </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" gutterBottom>
                {details.content}
              </Typography>
            </Grid>
            {ownsBlog && <Grid item xs={12}>
              <Button onClick={handleDeleteBlog} size="small" variant="outlined" color="error">
                Delete
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{ backgroundColor: "orange", ml: 2 }}
                onClick={()=>navigate(`/edit-blog/${id}`)}
              >
                Edit
              </Button>
            </Grid>}
            
          </Grid>
        </Grid>
        <Grid item xs={4} sx={{pr: 2}}>
          <Typography variant="h4" fontSize={"20px"}>
            Comments...
          </Typography>
          <Divider sx={{mb: 2}}/>
          {comments.map((comment)=>(
            <>
            <Typography variant="caption" display="block">
            {new Date(comment.createdAt).toDateString()}
          </Typography>
          <Typography variant="overline" display="block">
            {comment.content}
          </Typography>
          <Divider />
          </>
          ))}
     
      <Grid container spacing={2} sx={{pt: 2}}>
      <Grid item xs={10}>
      <TextField value={comment} onChange={(e)=>newComment(e.target.value)}  size="small" id="outlined-basic" label="Add comments..." fullWidth variant="outlined" />
      </Grid>
      <Grid item xs={2} sx={{p: '16px 15px 0 5px !important'}}>
      <Button onClick={handlePost} variant="contained" size="small" sx={{m: 0, height: 39}}>Post</Button>
      </Grid>
        </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BlogDetails;
