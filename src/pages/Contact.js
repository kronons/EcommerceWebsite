import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Meta from '../components/Meta'
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai'
import { BiPhoneCall, BiInfoCircle } from 'react-icons/bi'
import Container from '../components/Container'

function Contact() {
  return (
    <>
        <Meta title={'Contact Us'}/>
        <Breadcrumb title='Contact Us' />
        <Container class1='contact-wrapper py-5 home-wrapper-2'>
            <div className='row'>
              <div className='col-12'>
              <iframe 
                  title='map'
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2828.364746260911!2d-93.24478972288833!3d44.85486887388643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87f62f6c393c612d%3A0xb3c6f1806e78286b!2sMall%20of%20America%C2%AE!5e0!3m2!1sen!2sus!4v1684010861901!5m2!1sen!2sus" 
                  width="600" 
                  height="450" 
                  className='border-0 w-100'
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
              </iframe>
              </div>
              <div className='col-12 mt-5'>
                <div className='contact-inner-wrapper d-flex justify-content-between'>
                  <div>
                    <h3 className='contact-title mn-4'>Contact Us</h3>
                    <form action='' className='d-flex flex-column gap-15'> 
                      <div>
                        <input 
                          type='text' 
                          className='form-control' 
                          placeholder='Name'
                        />
                      </div>
                      <div>
                        <input 
                          type='email' 
                          className='form-control' 
                          placeholder='Email'
                        />
                      </div>
                      <div>
                        <input 
                          type='tel' 
                          className='form-control' 
                          placeholder='Mobile Number'
                        />
                      </div>
                      <div>
                        <textarea 
                          name='' 
                          id='' 
                          className='w-100 form-control' 
                          cols='30' 
                          rows='4' 
                          placeholder='Comments'
                        />
                      </div>
                      <div>
                        <button className='button border-0'>Submit</button>
                      </div>
                    </form>
                  </div>
                  <div>
                    <h3 className='contact-title mb-4'>Contact Information</h3>
                    <div>
                      <ul className='ps-0'>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <AiOutlineHome className='fs-5' />
                          <address className='mb-0'>60 W Broadway, Bloomington, MN 55425</address>
                        </li>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <BiPhoneCall className='fs-5' />
                          <a href='tel: 123-123-1234'>(123)-123-124</a>
                        </li>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <AiOutlineMail className='fs-5' />
                          <a href='mailto:test@test.com'>Email : test@test.com</a>
                        </li>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <BiInfoCircle className='fs-5' />
                          <p className='mb-0'> Monday-Friday 10 AM - 8 PM</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Container>
    </>
  )
}

export default Contact