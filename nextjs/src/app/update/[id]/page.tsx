"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch('http://localhost:9000/topics/' + id)
      .then((resp) => resp.json())
      .then((result) => {
        setTitle(result.title)
        setBody(result.body)
        console.log(result);
    });
  }, []);

  return (
      <form onSubmit={(e) => {
          e.preventDefault();
          const body = e.currentTarget.body.value;
          console.log('title', title, 'body', body);
          const options = {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ title, body })
          }
          fetch(`http://localhost:9000/topics/${id}`, options)
              .then((res) => res.json())
              .then((result) => {
                  console.log(result);
                  const lastId = result.id;
                  router.refresh(); // 서버 컴포넌트 강제 다시 렌더링
                  router.push(`/read/${lastId}`);
              })
      }}>
          <p>
              <input id='myTitle' type="text" name="title"
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setTitle(e.currentTarget.value);
                      const {
                          currentTarget: { value },
                      } = e;
                      console.log(e.currentTarget.value);
                      setTitle(value);
                  }} placeholder="title" value={title} />
          </p>
          <p>
              <textarea name="body"
                onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
                  setBody(e.currentTarget.value);
              }} 
              placeholder="body" value={body}></textarea>
          </p>
          <p>
              <input type="submit" value="update" />
          </p>
      </form>
  )
}