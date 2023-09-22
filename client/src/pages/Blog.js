import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Meta from '../components/Meta'
import BlogCard from '../components/BlogCard'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from '../features/blogs/blogSlice'
import moment from "moment";


function Blog() {
    const dispatch = useDispatch();
    const blogState = useSelector((state) => state.blog.blog);
    
    useEffect(() => {
        const getBlogs = () => {
            dispatch(getAllBlogs());
        };
        getBlogs();
    }, [dispatch]);
    
  return (
    <>
        <Meta title={'Blogs'}/>
        <Breadcrumb title='Blogs' />
            <Container class1='blog-wrapper home-wrapper-2 py-5'>
                <div className='row'>
                    <div className='col-3'>
                        <div className='filter-card mb-3'>
                            <h3 className='filter-title'>Find By Categories</h3>
                            <div className='ps-0'>
                                <ul>
                                    <li>Watch</li>
                                    <li>TV</li>
                                    <li>Camera</li>
                                    <li>Laptop</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-9'>
                        <div className='row'>
                            {
                                blogState && blogState?.map(( item, index ) => {
                                    return (
                                        <div className = 'col-6 mb-3' key = { index }>
                                            <BlogCard 
                                                id = {item?._id}
                                                title = {item?.title}
                                                description = {item?.description}
                                                date = {moment(item?.createdAt).format("MM-DD-YYYY, h:MM:A")}
                                                image = {item?.images[0].url && item?.images[0].url || ""}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Container>
    </>
  )
}

export default Blog