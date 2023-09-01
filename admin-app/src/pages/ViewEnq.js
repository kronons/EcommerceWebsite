import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getEnquiry } from '../features/enquiry/enquirySlice';
import { BiArrowBack } from 'react-icons/bi'
import { updateEnquiry, resetState } from '../features/enquiry/enquirySlice';


const ViewEnq = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const getEnqId = location.pathname.split("/")[3];
    const enqState = useSelector(state => state.enquiry);
    const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = enqState

    const [selectedStatus, setSelectedStatus] = useState(enqStatus);

    useEffect(() => {
        dispatch(getEnquiry(getEnqId));
    }, [getEnqId, dispatch]);

    useEffect(() => {
        setSelectedStatus(enqStatus);
    }, [enqStatus]);

    const goBack = () => {
        navigate(-1)
    };

    const setEnquiryStatus = (e, i) => {
        const data = { id: i, enqData: e };
        dispatch(updateEnquiry(data));
        dispatch(resetState());
        setTimeout(() => {
          dispatch(getEnquiry(getEnqId));
        }, 100);
      };

    
  return (
    <div>
        <div className='d-flex justify-content-between align-items-center'>
            <h3 className="mb-4 title">View Enquiry</h3>
            <button 
                className='bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1' 
                onClick={goBack}>

                <BiArrowBack className='fs-5' />  <h5 className='mt-1'>Go Back</h5>
            </button>
        </div>
        <div className='mt-5 bg-white p-4 rounded-3 d-flex gap-3 flex-column'>
            <div className='d-flex align-items-center gap-3'>
                <h6 className='mb-0'>Name: </h6>
                <p className='mb-0'>{enqName}</p>
            </div>
            <div className='d-flex align-items-center gap-3'>
                <h6 className='mb-0'>Mobile: </h6>
                <p className='mb-0'><a href={`tel:${enqMobile}`}>{enqMobile}</a></p>
            </div>
            <div className='d-flex align-items-center gap-3'>
                <h6 className='mb-0'>Email: </h6>
                <p className='mb-0'><a href={`mailto:${enqEmail}`}>{enqEmail}</a></p>
            </div>
            <div className='d-flex align-items-center gap-3'>
                <h6 className='mb-0'>Comment: </h6>
                <p className='mb-0'>{enqComment}</p>
            </div>
            <div className='d-flex align-items-center gap-3'>
                <h6 className='mb-0'>Status: </h6>
                <p className='mb-0'>{enqStatus}</p>
            </div>
            <div className='d-flex align-items-center gap-3'>
                <h6 className='mb-0'>Change Status: </h6>
                <div>
                <select 
                        value={selectedStatus} 
                        className='form-contol form-select'
                        onChange={(e) => {
                            setSelectedStatus(e.target.value);
                            setEnquiryStatus(e.target.value, getEnqId);
                        }}
                    >
                        <option value="Submitted">Submitted</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ViewEnq