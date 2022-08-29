import React, { useState, useEffect } from 'react';

export default function PostDisplay({
  // props
  data,
  onDelete,
  onEdit,
  buttonVisible,
}) {
  // Declare a new state variable, which we'll call 'number';
  const [number, setNumber] = useState(1);
  // Declare a new state variable, which we'll call 'set Per Page Limit show';
  const [postPerPage] = useState(10);

  /**
   * Post per Post 3 Pagination using Slice Method  in Array
   *
   */
  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = data.slice(firstPost, lastPost);
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(data.length / postPerPage); i += 1) {
    pageNumber.push(i);
  }
  // eslint-disable-next-line no-shadow
  const ChangePage = (pageNumber) => {
    setNumber(pageNumber);
  };
  useEffect(() => {
    setNumber(number);
  }, [number, setNumber]);

  return (
    <div className="post-display">
      <h3>Post List</h3>
      {/* map the data using array method */}
      {currentPost.length > 0 ? (currentPost.map((item, index) => (
        <div className="main-contniner py-3">
          <div className="image-div row">
            {item.video && (
              <video className="video_image" controls>
                <source src={item.video} type="video/mp4" />
                <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
              </video>
            )}
            {/* map the mutiple image using array method */}
            {item.image && item.image.map((items) => (
              <div key={items} className="col-md-5">
                <img src={items} alt={items} style={{ height: '190px', width: '100px' }} className="image" />
              </div>
            ))}
          </div>
          <div className="contniner-niner">
            <div className="text-niner">
              <p>{item.text}</p>
              <div className="button-group">
                <button type="button" className="darft-button">{item.status}</button>
                {item.status === 'Draft'
                  && (
                    <button
                      type="button"
                      aria-label="Save"
                      onClick={() => onEdit(index)}
                      className="edit-button fa fa-edit  btn btn-primary bg-primary"
                    />
                  )}
                {'  '}
                <button
                  type="button"
                  aria-label="Save"
                  className={`${!buttonVisible ? ('delete-button fa fa-trash  btn btn-primary pointer bg-primary ') : ('delete-button fa fa-trash  btn btn-primary pointer bg-primary disabled')}`}
                  onClick={() => onDelete(item)}
                />
              </div>
            </div>
          </div>
        </div>
      ))) : (<div className="post-avaliable"><div className="not-post-avaliable"> Post Not Avaliable Add New Post </div></div>
      )}
      {currentPost.length > 0 ? (
        <div className="my-3 text-center">
          <button
            className={`${number === 1 ? ('px-3 py-1 m-1 text-center btn btn-primary pointer disabled') : ('px-3 py-1 m-1 text-center btn btn-primary pointer')}`}
            type="button"
            onClick={() => setNumber((numbers) => (numbers === 1 ? numbers : numbers - 1))}
          >
            Pevious
          </button>
          {pageNumber.map((pages) => (
            <button
              className={`${number === pages ? ('px-3 py-1 m-1 text-center btn btn-primary pointer active') : ('px-3 py-1 m-1 text-center btn btn-primary pointer')}`}
              type="button"
              onClick={() => ChangePage(pages)}
            >
              {pages}
            </button>
          ))}
          <button
            className={`${number === pageNumber.length ? ('px-3 py-1 m-1 text-center btn btn-primary pointer disabled') : ('px-3 py-1 m-1 text-center btn btn-primary pointer')}`}
            type="button"
            onClick={
              () => setNumber((numbers) => (numbers === pageNumber.length ? numbers : numbers + 1))
            }
          >
            Next
          </button>
        </div>
      ) : (<div />
      )}
    </div>
  );
}
