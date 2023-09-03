"use client";
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export function Control() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  return (
    <ul>
      <li><Link href="/create">Create</Link></li>
      {id ? <>
        <li><Link href={`/update/${id}`}>Update</Link></li>
        <li><input type="button" value="delete" onClick={() => {
          const options = { method: 'DELETE' }
          fetch(`http://localhost:9000/topics/${id}`, options)
          .then((res) => res.json())
          .then((result) => {
            router.refresh();
            router.push('/');
          })
        }} /></li>
      </> : null}
    </ul>
  );
}
