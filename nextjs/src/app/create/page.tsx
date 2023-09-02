"use client"
import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();
    return (
        <form onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.currentTarget.body.valueOf;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body})
            }
            fetch(`http://localhost/9000/topics`, options)
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    const lastId = result.id;
                    router.push(`/read/${lastId}`);
                })
        }}>
            <p>
                <input type="text" name="title" placeholder="title" />
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