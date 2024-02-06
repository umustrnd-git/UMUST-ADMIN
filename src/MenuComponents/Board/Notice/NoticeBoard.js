import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as S from './Notice.styled'; 
import Main from '../../../MainComponents/Main';

const formatDate = (timestamp) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(timestamp).toLocaleString('en-US', options);
};


const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch('https://eb-umust.umust302.shop/api/articles/NOTICE')
      .then(response => response.json())
      .then(data => setNotices(data))
      .catch(error => console.error('Error fetching notices:', error));
  }, []);

  const handleEditNotice = (noticeId) => {
    console.log(`Editing notice with ID: ${noticeId}`);
  };

  const handleDeleteNotice = (noticeId) => {
    console.log(`Deleting notice with ID: ${noticeId}`);
  };

  return (
    <S.Container> 
      <Main />
      <S.NoticeHeader>
        <S.PostListLabel>번호</S.PostListLabel>
        <S.PostListLabel>제목</S.PostListLabel>
        <S.PostListLabel>작성자</S.PostListLabel>
        <S.PostListLabel>작성일</S.PostListLabel>
        {/* <S.PostListLabel>조회수</S.PostListLabel> */}
        {/* <S.PostListLabel>액션</S.PostListLabel> */}
      </S.NoticeHeader>

      <S.NoticeContent>
      {notices.map((notice, index) => (
        <Link key={notice.id} to={`/Board/notices/${notice.id}`}>
          <S.NoticeItem>
            <S.NoticeId>{notice.id}</S.NoticeId>
            <S.ItemContent>{notice.title.length > 13 ? `${notice.title.substring(0, 13)}...` : notice.title}</S.ItemContent>
            <S.Create><span>{notice.createdBy}</span></S.Create>
            <S.Date><span>{formatDate(notice.createdAt)}</span></S.Date>
            {/* <S.View><span>{notice.view}</span></S.View> */}
          </S.NoticeItem>
        </Link>
        
      ))}
      </S.NoticeContent>
    </S.Container>
  );
};

export default NoticeBoard;
