import React, { useState } from 'react';
import { connect } from 'react-redux';
import Layout from '../Layout';
import { Container, Col, Row, Form, Table } from 'react-bootstrap';
import { productAction, initialDataAction } from '../../redux/actions';
import { showProductImage } from '../../urlconfig';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import './style.css';

function Products({ productAction, product, category }) {
  const [show, setShow] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  //input for product details
  const [productDetails, setProductDetails] = useState(null);
  //input values for Product
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState([]);

  const handleClose = () => {
    const form = new FormData();
    form.append('name', productName);
    form.append('category', productCategory);
    form.append('price', productPrice);
    form.append('quantity', productQuantity);
    form.append('description', productDescription);

    productImage.map((Image) => form.append('productPicture', Image));

    productAction(form);

    setShow(false);
  };
  const handleShow = () => setShow(true);

  // useEffect(() => {
  //   categoryAction();
  // }, []);

  const categoryList = (category, option = []) => {
    category.map((cat) => {
      option.push({ value: cat._id, name: cat.name });
      if (cat.children.length > 0) {
        categoryList(cat.children, option);
      }
    });
    return option;
  };

  const handleCategoryImage = (e) => {
    setProductImage([...productImage, e.target.files[0]]);
  };
  console.log(product);
  const renderProduct = () => {
    return (
      <Table responsive='sm' className='small'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.product.map((product, index) => (
            <tr
              onClick={() => handleCloseProductDetails(product)}
              key={product._id}
            >
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
  const renderAddProduct = () => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        title='Add Product'
        onClick={handleClose}
        button='Add Product'
      >
        <Form>
          <Input
            label='Name'
            name='productName'
            type='text'
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
          <Input
            label='Price'
            name='productPrice'
            type='number'
            value={productPrice}
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
          />
          <Input
            label='Quantity'
            name='productQuantity'
            type='number'
            value={productQuantity}
            onChange={(e) => {
              setProductQuantity(e.target.value);
            }}
          />
          <select
            className='form-control'
            value={productCategory}
            name='parentId'
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option>Select Category</option>
            {categoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          <Input
            label='Images'
            name='parentid'
            type='file'
            accept='image/*'
            value={productImage}
            onChange={handleCategoryImage}
          />
          {productImage.map((images, index) => (
            <div className='text-success text-center' key={index}>
              {images.name}
            </div>
          ))}
          <Input
            label='Description'
            name='productDescription'
            type='text'
            value={setProductDescription}
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
          />
        </Form>
      </Modal>
    );
  };
  const handleCloseProductDetails = (product) => {
    setShowProductDetails(!showProductDetails);
    setProductDetails(product);
    // console.log(product);
  };

  const renderProductDetailModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <Modal
        show={showProductDetails}
        onHide={handleCloseProductDetails}
        title='Product Details'
        onClick={handleCloseProductDetails}
        size='lg'
      >
        <Row className='small'>
          <Col md='6'>
            <label> Name</label>
            <p>{productDetails.name}</p>
          </Col>
          <Col md='6'>
            <label> Price</label>
            <p>{productDetails.price}</p>
          </Col>
        </Row>
        <Row className='small'>
          <Col md='6'>
            <label> Quantity</label>
            <p>{productDetails.quantity}</p>
          </Col>
          <Col md='6'>
            <label> Category</label>
            <p>{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row className='small'>
          <Col md='12'>
            <label> Description</label>
            <p>{productDetails.description}</p>
          </Col>
        </Row>
        <Row className='small '>
          <Col>
            <label>Product Images</label>
            <div className='d-flex text-center'>
              {productDetails.productPictures.map((image) => (
                <div key={image._id} className='productImage'>
                  <img className='img-fluid' src={showProductImage(image)} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className='d-flex justify-content-between mt-2'>
              <h3>Products</h3>

              <button
                className='btn btn-primary btn-sm'
                variant='primary'
                onClick={handleShow}
              >
                Add
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>{renderProduct()}</Col>
        </Row>
      </Container>
      {renderAddProduct()}
      {renderProductDetailModal()}
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  category: state.category,
  product: state.product,
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
  productAction: (form) => dispatch(productAction(form)),
  initialDataAction: () => dispatch(initialDataAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
