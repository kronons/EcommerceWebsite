import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import {HiOutlineArrowLeft} from 'react-icons/hi'
import Container from '../components/Container'

const SingleBlog = () => {
  return (
    <>
        <Meta title={'Dynamic Blog Name'}/>
        <Breadcrumb title='Dynamic Blog Name' />
        <Container class1='blog-wrapper home-wrapper-2 py-5'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='single-blog-card'>
                                <Link to='/blogs' className='d-flex align-items-center gap-10'> 
                                    <HiOutlineArrowLeft className='fs-4' /> Go Back To Blogs
                                </Link>
                                <h3 className='title'>
                                    A beautiful Sunday Morning Renissance
                                </h3>
                                <img src='/images/blog-1.jpg' className='img-fluid w-100 my-4' alt='blog' />
                                <p>
                                    You're only as good as your last collection, which is an enormous pressure.
                                    I think there is something about luxury it's not something poeple need, but
                                    it's what they want. It really pulls at their heart. I have a fantastic
                                    relationship with money. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </div>
            </Container>
    </>
  )
}

export default SingleBlog