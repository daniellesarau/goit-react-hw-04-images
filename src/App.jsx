import React, { useState, useEffect, useRef } from 'react';
import { Notify } from 'notiflix';
import css from './App.module.css';
import { getImages } from './components/Api/Api';
import SearchBar from 'components/SearchBar/SearchBar';
import Modal from 'components/Modal/Modal';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [loadMore, setLoadMore] = useState(false);

  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [images]);

  const handleSubmit = query => {
    setLoading(true);
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  const handleOpenModal = url => {
    setOpenModal(true);
    setLargeImageURL(url);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    setLoading(true);
    setLoadMore(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setLargeImageURL('');
  };

  useEffect(() => {
    if (!query) return;

    const getGallery = async query => {
      try {
        const response = await getImages(query, page);
        let imageData = response.data;
        let imageCount = imageData.hits.length;
        let imageTotal = imageData.totalHits;

        if (page === 42) {
          setImages(prev => [...prev, ...imageData.hits.slice(4)]);
        } else if (
          Number.isInteger(imageTotal / imageCount) === true &&
          page === imageTotal / imageCount
        ) {
          setImages(prev => [...prev, ...imageData.hits]);
          setLoadMore(false);
          return;
        } else {
          setImages(prev => [...prev, ...imageData.hits]);
        }

        if (imageCount === 0) {
          setImages([]);
          setLoadMore(false);

          Notify.failure(
            'Sorry, there are no matching images found, please try another search.'
          );
          return;
        }

        if (imageCount < 12 && page === 1) {
          setLoading(false);
          setLoadMore(false);

          Notify.success(
            `Woot! Maximum search value found, there are ${imageCount} images.`
          );
          return;
        }

        if (page >= 2 && page <= 41) {
          setLoadMore(true);

          return;
        }

        if (imageTotal > 12) {
          setLoading(true);
          setLoadMore(true);

          Notify.success(`Hooray! We found ${imageTotal} images.`);
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    getGallery(query, page);
  }, [query, page]);

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSubmit} />

      <ImageGallery
        images={images}
        openModal={handleOpenModal}
        loadMore={handleLoadMore}
      />
      {loading && <Loader />}
      <div className={css.button}>
        {loadMore && <Button clickHandler={handleLoadMore} text="Load More" />}
      </div>
      {openModal && (
        <Modal largeImageURL={largeImageURL} modalClose={handleModalClose} />
      )}
    </div>
  );
};
