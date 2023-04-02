import {
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    Box,
} from '@mui/material';
import { Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from './Sidebar';
import Spinner from './Spiner';

interface PropState {
    test: string | null;
}

const Posts = () => {
    const location = useLocation();

    const test = location.state as PropState;

    console.log(test);

    const [posts, setPosts] = useState<
        { title: string; body: string }[] | null
    >([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((json) => setPosts(json))
            .catch((error) => console.log(error));
    }, []);

    return (
        <Grid item xs={12} md={9} lg={9} xl={9} marginTop={10}>
            {posts &&
                posts.map((post, index) => {
                    return (
                        <Card key={index} sx={{ marginBottom: '10px' }}>
                            <CardContent>
                                <Typography variant="h4" component="h1">
                                    {post.title}
                                </Typography>
                                <Typography variant="body1" component="p">
                                    {post.body}
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                })}
        </Grid>
    );
};

export default Posts;
