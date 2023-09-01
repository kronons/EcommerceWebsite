import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Table } from "antd";
import { deleteAProduct, getProducts, resetState } from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import CustomModal from "../components/CustomModal";



const columns = [
  {
    title: "ID Number",
    dataIndex: "key",
    sorter: (a, b) => a.key.localeCompare(b.key),
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: (a, b) => a.description.length - b.description.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Tags",
    dataIndex: "tags",
    sorter: (a, b) => a.tags.length - b.tags.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Images",
    dataIndex: "image",
    render: (imageURL) => <img src={imageURL} alt="No Product" style={{ maxWidth: '100px' }} />,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist= () => {
  const dispatch = useDispatch();

  const [ open, setOpen ] = useState(false);
  const [ productId, setProductId ] = useState("");
  const [ productTitle, setProductTitle ] = useState("");

  const showModal = (id, title) => {
    setOpen(true);
    setProductId(id);
    setProductTitle(title);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);

  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: productState[i]._id,
      title: productState[i].title,
      description: productState[i].description,
      price: productState[i].price,
      brand: productState[i].brand,
      category: productState[i].category,
      tags: productState[i].tags,
      color: productState[i].color,
      quantity: productState[i].quantity,
      image: productState[i].images && productState[i].images.length > 0 ? productState[i].images[0].url : null,
      action: 
      <>
        <Link 
          className='fs-3 text-danger' 
          to={`/admin/product/${productState[i]._id}`}
        >
          <BiEdit />
        </Link>
        <button 
          className='ms-3 fs-3 text-danger bg-transparent border-0'
          onClick={() => showModal(productState[i]._id, productState[i].title)}
        >
          <AiFillDelete />
        </button>
      </>
    });
  }

  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };

  return (
    <div>
    <h3 className="mb-4 title">Product List</h3>
    <div>
      <Table 
          columns={columns} 
          dataSource={data1} 
        />
    </div>
    <CustomModal
        hideModal = {hideModal}
        open = {open}
        performAction = {() => {
          deleteProduct(productId);
        }}
        title={
          <>
            Are you sure you want to delete this product?
            <br />
             <p className='text-danger'>{productTitle} </p>
          </>
        }
      />
</div>
  )
}

export default Productlist