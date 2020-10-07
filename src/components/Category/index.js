import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Layout';
import { Container, Col, Row, Form } from 'react-bootstrap';
import {
  categoryAction,
  addcategoryAction,
  updatecategoryAction,
} from '../../redux/actions';
import CheckboxTree from 'react-checkbox-tree';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import {
  IoIosCheckbox,
  IoMdCheckboxOutline,
  IoIosArrowForward,
  IoIosArrowDown,
} from 'react-icons/io';

import 'react-checkbox-tree/lib/react-checkbox-tree.css';
//import Select from '../UI/Select';

function Category() {
  //console.log(category);
  const dispatch = new useDispatch();
  const category = useSelector((state) => state.category);
  const [show, setShow] = useState(false);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState();
  //for checkbox tree
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);

  const handleShow = () => setShow(true);
  // const handleShowEditModal = () => setShowEditProduct(true);
  // useEffect(() => {
  //   // categoryAction();
  // }, []);
  //console.log(categoryImage);

  const renderCategories = (category) => {
    return category.map(
      (cate) =>
        //categoryList.push(
        ({
          label: cate.name,
          value: cate._id,
          children: cate.children.length > 0 && renderCategories(cate.children),
        })

      // )
    );
  };

  const categoryList = (category, option = []) => {
    category.map((cat) => {
      //console.log(cat);
      option.push({ value: cat._id, parentId: cat.parentId, name: cat.name });
      if (cat.children.length > 0) {
        categoryList(cat.children, option);
      }
    });
    return option;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleClose = () => {
    const form = new FormData();
    form.append('name', categoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', categoryImage);
    //console.log(form);

    dispatch(addcategoryAction(form));
    setCategoryName('');
    setParentCategoryId('');
    setCategoryImage('');
    setShow(false);
  };

  const updateCategory = () => {
    const checkedArray = [];
    const expandedArray = [];
    const categories = categoryList(category.categories);
    checked.length > 0 &&
      checked.map((cateId, index) => {
        const category = categories.find(
          (cate, _index) => cate.value === cateId
        );
        checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.map((cateId, index) => {
        const category = categories.find(
          (cate, _index) => cate.value === cateId
        );
        expandedArray.push(category);
      });
    setExpandedArray(expandedArray);
    setCheckedArray(checkedArray);
    setUpdateCategoryModal(true);
    console.log(checkedArray, expandedArray);
  };

  const handleCategoryInput = (name, value, index, type) => {
    if (type === 'expanded') {
      const updateExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [name]: value } : item
      );
      setExpandedArray(updateExpandedArray);
    }
    if (type === 'checked') {
      const updateCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [name]: value } : item
      );
      setCheckedArray(updateCheckedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();

    expandedArray.map((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : '');
      form.append('type', item.type);
      // form.append('categoryImage', item.);
    });
    checkedArray.map((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : '');
      form.append('type', item.type);
      // form.append('categoryImage', item.);
    });

    dispatch(updatecategoryAction(form)).then((result) => {
      if (result) {
        dispatch(categoryAction());
      }
    });
    categoryAction();
    setUpdateCategoryModal(false);
  };

  const createNewCateory = () => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        onClick={handleClose}
        title='Add Category'
        button='Add Category'
        size='lg'
      >
        <Form>
          <Input
            label='Name'
            name='name'
            type='text'
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
          <select
            className='form-control'
            value={parentCategoryId}
            name='parentId'
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {categoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          <Input
            label='ParentID'
            name='parentid'
            className='text-success'
            type='file'
            accept='image/*'
            value={categoryImage}
            onChange={handleCategoryImage}
          />
          {/* <div className='text-success'>{categoryImage.name}</div> */}
        </Form>
      </Modal>
    );
  };

  const updateCategories = () => {
    return (
      <Modal
        show={updateCategoryModal}
        onHide={updateCategoriesForm}
        onClick={updateCategoriesForm}
        title='Update Category'
        button='Update Category'
        size='lg'
      >
        <Form>
          <Row>
            <Col>Expanded</Col>
          </Row>

          {expandedArray.length > 0 &&
            expandedArray.map((item, index) => (
              <Row key={index}>
                <Col>
                  <Input
                    // label='Name'
                    className='form-control'
                    name='name'
                    placeholder='Enter Product Name'
                    type='text'
                    value={item.name}
                    onChange={(e) => {
                      handleCategoryInput(
                        e.target.name,
                        e.target.value,
                        index,
                        'expanded'
                      );
                    }}
                  />
                </Col>
                <Col>
                  <select
                    className='form-control'
                    value={item.parentId}
                    name='parentId'
                    onChange={(e) => {
                      handleCategoryInput(
                        e.target.name,
                        e.target.value,
                        index,
                        'expanded'
                      );
                    }}
                  >
                    <option>Select Category</option>
                    {categoryList(category.categories).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select
                    className='form-control'
                    // value={parentCategoryId}
                    name='type'
                    onChange={(e) => {
                      handleCategoryInput(
                        e.target.name,
                        e.target.value,
                        index,
                        'expanded'
                      );
                    }}
                    // onChange={(e) => setParentCategoryId(e.target.value)}
                  >
                    <option>Select Type</option>
                    <option value='store'>Store</option>
                    <option value='product'>Product</option>
                    <option value='page'>Page</option>
                  </select>
                </Col>
              </Row>
            ))}

          {/* <Input
        label='ParentID'
        name='parentid'
        className='text-success'
        type='file'
        accept='image/*'
        value={categoryImage}
        onChange={handleCategoryImage}
      /> */}
          {/* <div className='text-success'>{categoryImage.name}</div> */}
        </Form>

        {/* Chekecd */}

        <Form>
          <Row>
            <Col>Checked</Col>
          </Row>

          {checkedArray.length > 0 &&
            checkedArray.map((item, index) => (
              <Row key={index}>
                <Col>
                  <Input
                    // label='Name'
                    className='form-control'
                    name='name'
                    placeholder='Enter Product Name'
                    type='text'
                    value={item.name}
                    onChange={(e) => {
                      handleCategoryInput(
                        e.target.name,
                        e.target.value,
                        index,
                        'checked'
                      );
                    }}
                  />
                </Col>
                <Col>
                  <select
                    className='form-control'
                    value={item.parentId}
                    name='parentId'
                    onChange={(e) => {
                      handleCategoryInput(
                        e.target.name,
                        e.target.value,
                        index,
                        'checked'
                      );
                    }}
                  >
                    <option>Select Category</option>
                    {categoryList(category.categories).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select
                    className='form-control'
                    value={parentCategoryId}
                    name='type'
                    onChange={(e) => {
                      handleCategoryInput(
                        e.target.name,
                        e.target.value,
                        index,
                        'checked'
                      );
                    }}
                    // onChange={(e) => setParentCategoryId(e.target.value)}
                  >
                    <option>Select Type</option>
                    <option value='store'>Store</option>
                    <option value='product'>Product</option>
                    <option value='page'>Page</option>
                  </select>
                </Col>
              </Row>
            ))}

          {/* <Input
        label='ParentID'
        name='parentid'
        className='text-success'
        type='file'
        accept='image/*'
        value={categoryImage}
        onChange={handleCategoryImage}
      /> */}
          {/* <div className='text-success'>{categoryImage.name}</div> */}
        </Form>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className='d-flex justify-content-between mt-2'>
              <h3>Category</h3>

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
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoMdCheckboxOutline />,
                halfCheck: <IoMdCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
            {/* <ul>{renderCategories(category.categories)}</ul>; */}
          </Col>
        </Row>
      </Container>
      {createNewCateory()}
      {/* Update Category */}
      {updateCategories()}
      <Row>
        <Col>
          <button className='btn btn-danger btn-sm m-2'>Delete</button>
          <button
            className='btn btn-warning btn-sm m-2'
            onClick={updateCategory}
          >
            Edit
          </button>
        </Col>
      </Row>
    </Layout>
  );
}

export default Category;
