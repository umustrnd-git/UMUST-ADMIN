import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Main from '../../../MainComponents/Main';
import * as S from './Album.styled';

const formatDate = (timestamp) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(timestamp).toLocaleString('en-US', options);
};

const generatePageNumbers = (totalPages) => {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
};

const AlbumBoard = () => {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    const pageSize = 10; 
    const apiUrl = `https://eb-umust.umust302.shop/api/articles/ALBUM?page=${currentPage}&size=${pageSize}`;
 
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.content)) {
          setAlbums(data.content);
          setTotalPages(data.totalPages);
        } else {
          console.error('API 응답의 content 속성이 배열이 아닙니다:', data);
        }
      })
      .catch(error => console.error('게시글을 불러오는 중 오류 발생:', error));
  }, [currentPage]);

  const handleEditAlbum = (albumId) => {
    console.log(`Editing Album with ID: ${albumId}`);
  };

  const handleDeleteAlbum = (albumId) => {
    console.log(`Deleting Album with ID: ${albumId}`);
  };

  return (
    <S.Container>
      <Main />
      <S.AlbumGrid>
        {Array.isArray(albums) && albums.map(album => (
          <Link key={album.id} to={`/Board/albums/${album.id}`}>
            <S.AlbumItem>
              <S.Thumbnail>
                {/* 이미지와 관련된 데이터가 있는 경우에만 표시 */}
                {album.files && album.files.length > 0 && album.files[0].fileURL && (
                  <img src={album.files[0].fileURL} alt={`Thumbnail for ${album.title}`} />
                )}
              </S.Thumbnail>
              <S.AlbumTitle>{album.title}</S.AlbumTitle>
              <S.CreateDate>{formatDate(album.createdAt)}</S.CreateDate>
            </S.AlbumItem>
          </Link>
        ))}
      </S.AlbumGrid>
      <S.PaginationContainer>
        {generatePageNumbers(totalPages).map((pageNumber) => (
          <S.PaginationItem
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber - 1)}
            active={currentPage === pageNumber - 1}
          >
            {pageNumber}
          </S.PaginationItem>
        ))}
      </S.PaginationContainer>
    </S.Container>
  );
};

export default AlbumBoard;
