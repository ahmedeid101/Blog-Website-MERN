import './Home.css';
import PostList from './../../components/posts/PostList';
import Sidebar from '../../components/sidebar/Sidebar';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPosts } from '../../redux/apiCalls/postApiCalls';

const HomePage = () => {
    const {posts} = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(1));
    }, [dispatch]);

    return ( 
        <section className='home'>
            <div className="hero-header">
                <div className="hero-header-layouy">
                    <h1 className="home-title">Welcom To Blog</h1>
                </div>
            </div>

            <div className="home-latest-posts"> Latest Posts</div>
            <div className="home-container">
                <PostList posts={posts}/>
                <Sidebar/>
            </div>
            <div className="see-all-posts">
                <Link to='./posts' className="posts-link">See All Posts</Link>
            </div>
        </section>
     );
}
 
export default HomePage;