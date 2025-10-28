"use client";

import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';


const MyProfile = () => {
    
    const {data: session} = useSession();
    const [posts, setPosts] = useState([]);
    const [tag, setTag] = useState([]);
    const router = useRouter();
    
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    
        if (hasConfirmed) {
            try  {data = await fetch(`/api/prompt/${post._id}`, {
                method: "DELETE"
            });
            setPosts((myposts) => myposts.filter((p) => p._id != post._id));
        } catch (error) {
            console.log(error);
        }
        }
    };

    useEffect( () => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
            console.log(data);
        };
        
        
        if ( session?.user.id){
               fetchPosts();   
        }               
    }, [session]);


    return (
        <Profile
            name="My"
            desc="Welcome to your personalied profile page"
            data= {posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            tag = {tag}
            setTag = {setTag}

        />
    )
}

export default MyProfile