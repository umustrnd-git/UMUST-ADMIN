import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as S from './Notice.styled';  
import Main from '../../../MainComponents/Main';


const NoticeForm = ({ onCreate }) => {
   const navigate = useNavigate();
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [file, setFile] = useState(null);
 
   const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title.trim() || !content.trim()) {
    alert('내용을 작성해주세요');
    return;
  }

  // 파일 업로드 로직 구현 (FormData 활용)
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('file', file);

  /* API 연동 */
  try {
    // 서버에 데이터 전송
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('게시글이 성공적으로 작성되었습니다.');
      setTitle('');
      setContent('');
      setFile(null);

      // NoticeBoard 페이지로 이동
      navigate('/Board/notices');
    } else {
      alert('게시글 작성에 실패했습니다.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
 
   // 파일 선택 핸들러
   const handleFileChange = (e) => {
     const selectedFile = e.target.files[0];
     setFile(selectedFile);
   };

   
 
   return (
     <S.NoticeFormContainer>
       <Main />
       <S.FormContainer>
         <S.FormTitle>공지 작성</S.FormTitle>
         <S.NoticeForm onSubmit={handleSubmit}>
           <S.Formcategory>제목:</S.Formcategory>
           <S.FormInput 
             type="text" 
             value={title} 
             onChange={(e) => setTitle(e.target.value)} 
             placeholder="제목을 입력하세요"
           />
           
           <S.Formcategory>본문</S.Formcategory>
           <ReactQuill
             style={{ height: '400px' }} 
             value={content}
             onChange={(value) => setContent(value)}
             placeholder="내용을 입력하세요"
             modules={{
               toolbar: [
                 [{ header: [1, 2, false] }],
                 ['bold', 'italic', 'underline', 'strike'],
                 [{ list: 'ordered' }, { list: 'bullet' }],
                 [{ script: 'sub' }, { script: 'super' }],
                 ['blockquote', 'code-block'],
                 [{ align: [] }],
                 ['image'],
                 ['table'],
                 ['clean'],
               ],
             }}
             formats={[
               'header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'script', 'blockquote', 'code-block', 'align', 'image', 'table',
             ]}
           />
           
           <label>파일 선택</label>
           <input type="file" onChange={handleFileChange} />
           
           <S.FormButton type="submit">작성</S.FormButton>
         </S.NoticeForm>
       </S.FormContainer>
     </S.NoticeFormContainer>
   );
 };
 
 export default NoticeForm;
 