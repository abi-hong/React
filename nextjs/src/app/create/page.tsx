"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {
    const [title, setTitle] = useState("");
    const router = useRouter();
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const body = e.currentTarget.body.value;
            console.log('title', title, 'body', body);
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, body })
            }
            fetch(process.env.NEXT_PUBLIC_API_URL+'topics', options)
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
                        const {
                            currentTarget: { value },
                        } = e;
                        console.log(e.currentTarget.value);
                        setTitle(value);
                    }} placeholder="title" />
            </p>
            <p>
                <textarea name="body" placeholder="body"></textarea>
            </p>
            <p>
                <input type="submit" value="create" />
            </p>
        </form>
    )
}