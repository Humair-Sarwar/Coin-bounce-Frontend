import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { submitBlogSchema } from "../../schemas/submitBlogSchema";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlogApi, getBlogDetails, updateBlogApi } from "../../api/internal";
import { setSuccessState } from "../../store/alertSuccess";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const EditBlog = () => {
  const params = useParams();
  const blogId = params.id;
  const navigate = useNavigate();
  const handleCancelSubmitBlog = () => {
    navigate(`/blog/blog-detail/${blogId}`);
  };
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState('');
  const author = useSelector((state) => state.user.id);
  const [initialValues, setInitialValues] = useState({
    title: '',
    content: ''
  });

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  useEffect(() => {
    (async function getByIdBlogData() {
      try {
        const response = await getBlogDetails(blogId);
        if (response.status === 200) {
          const { title, content } = response.data.blog;
          setInitialValues({ title, content });
          setPhoto(response.data.blog.photoPath);
          
        }
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    })();
  }, [blogId]);

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: initialValues,
      validationSchema: submitBlogSchema,
      onSubmit: async (values, action) => {
        console.log(photo, '----------->?????');
        
        let data;
        if(photo.includes('http') || photo == 'null'){
            data = {
                blogId,
                  title: values.title,
                  content: values.content,
                  author
                };
        }else{
            data = {
                blogId,
                  title: values.title,
                  content: values.content,
                  photo,
                  author
                };
        }
        const response = await updateBlogApi(data);
        if (response.status === 200) {
          let successData = {
            successState: true,
            message: 'Post Updated Successfully'
          };
          dispatch(setSuccessState(successData));
          navigate('/blog');
          action.resetForm();
          setPhoto('');
        }
      },
    });

  return (
    <div className="submit-blog-container">
      <div>
        <h1>Edit Blog Post</h1>
      </div>
      <div className="main-submit-container">
        <div className="left-container">
          {errors.title && touched.title ? (
            <p className="errorMessage">{errors.title}</p>
          ) : (
            ""
          )}
          <TextField
            size="small"
            label="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.content && touched.content ? (
            <p className="errorMessage">{errors.content}</p>
          ) : (
            ""
          )}
          <TextField
            size="small"
            label="Content"
            multiline
            rows={4}
            name="content"
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="submit-blog-btns">
            <Button
              onClick={handleCancelSubmitBlog}
              variant="outlined"
              style={{ marginRight: "20px" }}
              color="error"
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>Update</Button>
          </div>
        </div>
        <div className="right-container">
          <div className="image-upload">
            <img src={photo == 'null' ? "/no-image.webp" : photo} alt="" />
            <Button
              className="upload-btn-set"
              style={{
                position: "absolute",
                left: "-14px",
                bottom: "-10px",
                minWidth: "0",
                padding: "6px 6px",
              }}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CameraAltIcon />}
            >
              <VisuallyHiddenInput type="file" name='photo' accept="image/jpg, image/jpeg, image/png" onChange={getPhoto}/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
