/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Swal from 'sweetalert2';
import './css/image.css';
import Picker from 'emoji-picker-react';
import { BiWinkSmile } from 'react-icons/bi';
import PostList from './PostList';

/**
 * get Post localstorage
 * @returns array
 */
const getDataPosts = () => {
  const data = localStorage.getItem('data');
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

export default function PostAdd() {
  // Declare a new state variable, which we'll call 'emoji True False';
  const [showPicker, setShowPicker] = useState(false);
  // Declare a new state variable, which we'll call 'get and set Data';
  const [posts, setPosts] = useState(getDataPosts());
  // Declare a new state variable, which we'll call 'set id in index';
  const [index, setIndex] = useState(null);
  // Declare a new state variable, which we'll call 'textarea';
  const [inputText, setInputText] = useState('');
  // Declare a new state variable, which we'll call 'set character Limit Words';
  const [characterLimit] = useState(250);
  // Declare a new state variable, which we'll call 'image file';
  const [inputImage, setInputImageFile] = useState('');
  // Declare a new state variable, which we'll call 'Video file ';
  const [inputVideo, setInputVideoFile] = useState('');
  // Declare a new state variable, which we'll call 'satatus';
  const [status, setStatus] = useState('Draft');
  const ref = useRef();
  // Declare a new state variable, which we'll call 'set Delete Button Disable ';
  const [buttonVisible, setButtonVisible] = useState(false);
  // Declare a new state variable, which we'll call 'set Button';
  const [buttonShow, setButtonShow] = useState(false);

  /**
   *  OnChange Select File likes Image/Video (Select Multiple) ;
   * @param {event} event
   * @returns array
   */
  const handleMultipleFileSelectOnChnage = (event) => {
    const fileInput = event.target;
    const filePath = fileInput.value;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.mp4|\.3gp)$/i;
    const sizes = fileInput.files[0].size;
    if (!allowedExtensions.exec(filePath)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please upload Image .jpeg/.jpg/.png/ && video .mp4/.3gp only',
      });
      fileInput.value = '';
      return false;
    } if (((sizes / 1024) / 1024) > 3 && ((sizes / 1024) / 1024) > 5) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your file should be Image less than 3MB && Video less than 5MB',
      });
      fileInput.value = '';
      return false;
    }
    if (filePath.match(/\.(jpg|jpeg|png)$/)) {
      if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = () => {
          setInputImageFile((imgs) => [...imgs, reader.result]);
        };
        reader.onerror = () => {
          // console.log(reader.error);
        };
      }
    } else if (filePath.match(/\.(mp4|mp3)$/)) {
      if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = () => {
          setInputVideoFile((imgs) => [...imgs, reader.result]);
        };
        reader.onerror = () => {
          // console.log(reader.error);
        };
      }
    }
    return 0;
  };

  /**
   * onChange Textarea
   * @param {event} event
   */
  const handleInputTextOnChnage = (event) => {
    setInputText(event.target.value);
  };

  /**
   * emoji picker
   * @param {event} event
   * @param {emoji} emojiObject
   */
  const onEmojiClick = (event, emojiObject) => {
    setInputText((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  /**
   * New Add Post Darft ;
   * @returns
   */
  const handleSubmission = () => {
    if (inputText || (inputImage || inputVideo)) {
      let arrList = [];
      let dataList = null;
      // creating an object
      const data = {
        text: inputText,
        image: inputImage,
        video: inputVideo,
        status,
      };
      dataList = [...posts];
      if (arrList !== null) {
        arrList = dataList;
        arrList.push(data);
      } else {
        arrList.push(data);
      }
      setPosts(arrList);
      setInputText('');
      setInputImageFile('');
      setInputVideoFile('');
      ref.current.value = '';
      Swal.fire({
        icon: 'success',
        title: 'Saved',
        text: 'You have successfully added a new post!',
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill in your text and upload image or video!',
      });
    }
  };

  /**
   * save post Publish
   */
  const handleSubmission1 = () => {
    if (inputText || (inputImage || inputVideo)) {
      let arrList = [];
      let dataList = null;
      // creating an object
      const data = {
        text: inputText,
        image: inputImage,
        video: inputVideo,
        status: 'Publish',
      };
      dataList = [...posts];
      if (arrList !== null) {
        arrList = dataList;
        arrList.push(data);
      } else {
        arrList.push(data);
      }
      setPosts(arrList);
      setInputText('');
      setInputImageFile('');
      setInputVideoFile('');
      ref.current.value = '';
      Swal.fire({
        icon: 'success',
        title: 'Saved',
        text: 'You have successfully added a new post!',
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill in your text and upload image or video!',
      });
    }
  };

  /**
   * Save Post in localstorage
   */
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(posts));
  }, [posts]);

  /**
   * Delete post using array method indexOf * splice
   * @param {id} id
   */
  const handleOnDeletePost = (id) => {
    const inde = posts.indexOf(id);
    if (inde !== -1) {
      const result = window.confirm('Are you sure you want to delete this Post?');
      if (result) {
        posts.splice(inde, 1);
        setPosts([...posts]);
        Swal.fire({
          icon: 'success',
          title: 'Delete..',
          text: 'You have successfully deleted a post!',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  /**
   * edit post or set value in  input box
   * @param {index} id
   */
  const editPost = (id) => {
    setIndex(id);
    // console.log(id);
    const items = posts.at(id);
    if (id !== null) {
      setInputText(items.text);
      setInputImageFile(items.image);
      setInputVideoFile(items.video);
      setStatus(items.status);
      setButtonVisible(true);
      setButtonShow(true);
    } else {
      setInputText('');
      setInputImageFile('');
      setInputVideoFile('');
      ref.current.value = '';
      setButtonVisible(false);
    }
  };

  /**
   * update Data
   */
  const handleUpdateSubmission = () => {
    const editdata = posts;
    const edit = {
      text: inputText,
      image: inputImage,
      video: inputVideo,
      status,
    };
    editdata[index] = edit;
    setPosts(editdata);
    ref.current.value = '';
    setInputText('');
    setInputImageFile('');
    setInputVideoFile('');
    setButtonShow(true);
    setButtonVisible(false);
    Swal.fire({
      icon: 'success',
      title: 'The changes were saved successfully Your Post',
      showConfirmButton: false,
      timer: 1500,
    });
    setButtonShow(false);
  };

  /**
    * Cancel button empty text input
    * @param {null} event
    */
  const handleCancel = () => {
    ref.current.value = '';
    setInputText('');
    setInputImageFile('');
    setInputVideoFile('');
    setButtonVisible(false);
    setButtonShow(!buttonShow);
  };

  return (
    <>
      <div className="main" style={{ padding: '50px' }}>
        <div className="contniner py-4">
          <form className="row g-3 needs-validation" onSubmit={(event) => event.preventDefault()}>
            <div className="card">
              <div className="col-md-3 col-lg-2 mx-3 mt-3">
                <h4>
                  Content
                </h4>
                <p className="text-nowrap bd-highlight wid">
                  Desing your social post.You can include text,link,emojis,and media.
                </p>
              </div>
              <div className="card-header">
                <div className="mb-3">
                  <h5 className="form-label">Text</h5>
                  <Form.Control
                    as="textarea"
                    value={inputText}
                    isInvalid={(inputText.length > characterLimit)}
                    className="form-control invalid "
                    onChange={handleInputTextOnChnage}
                    id="validationTextarea"
                    placeholder="What is your post about?"

                  />
                  <BiWinkSmile className="iconsmile" onClick={() => setShowPicker((val) => !val)} />
                  {showPicker && (
                    <Picker
                      pickerStyle={{ width: '100%' }}
                      onEmojiClick={onEmojiClick}
                    />
                  )}
                  &nbsp;&nbsp;
                  <Badge className="mt-3" bg={`${inputText.length > characterLimit ? 'danger' : 'primary'}`}>
                    {inputText.length}
                    /
                    {characterLimit}
                  </Badge>
                </div>
              </div>
              <div className="card-body">
                <h5>Media</h5>
                <div className="slideshow">
                  <div className="slide">
                    <div className="col-12">
                      <div className="contniner">
                        <div className="row1">
                          {/* map the image Select input image */}
                          {inputImage.length > 0 && inputImage.map((item) => (
                            <div className="col-md-41" align="left">
                              <img src={item} key={item.id} width="100px" height="100px" alt="..." className="imageThumb" />
                            </div>
                          ))}
                          {/* map the image Select input video */}
                          {inputVideo.length > 0 && inputVideo.map((item) => (
                            <div key={item.id} className="col-md-41" align="left">
                              <video className="video" controls>
                                <source src={item} className="imageThumb" type="video/mp4" />
                                <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
                              </video>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide1">
                    <div className="div">
                      <label className="label">
                        <i className="fa fa-2x fa-camera" />
                        <input
                          className="oinput"
                          type="file"
                          multiple
                          ref={ref}
                          onChange={handleMultipleFileSelectOnChnage}
                        />
                        <br />
                        <span className="imageName" />
                      </label>
                    </div>
                  </div>
                </div>
                <p className="card-text" />
                <div className="mb-4 ">
                  <div className="button-group py-3">
                    <div className="buttongroup">
                      {buttonShow
                        ? (<button className="px-3 py-1 m-1  btn btn-primary pointer" type="submit" onClick={handleUpdateSubmission}>Update</button>
                        ) : (<button className="px-3 py-1 m-1  btn btn-primary needs-validation pointer" type="submit" onClick={handleSubmission}>Save Darft</button>)}
                      {buttonShow
                        ? (<button className="px-3 py-1 m-1  btn btn-primary pointer " type="submit" onClick={handleCancel}>Cancel</button>
                        ) : (<button className=" px-3 py-1 m-1  btn btn-primary needs-validation pointer" type="submit" onClick={handleSubmission1}>Publish</button>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* passing props in PostList Component */}
      <PostList
        data={posts}
        onDelete={handleOnDeletePost}
        onEdit={editPost}
        buttonVisible={buttonVisible}
      />
    </>
  );
}
