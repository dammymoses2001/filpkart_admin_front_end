import React, { useState } from 'react';
import { Product } from './redux/constant';
const list = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'Electronics',
    _id: '5f6951a2af284a45f87356cf',
    children: [
      {
        name: 'Mobiles',
        parentId: '5f6951a2af284a45f87356cf',
        slug: 'Mobiles',
        _id: '5f69dc74265cf04c88ff066a',
        children: [
          {
            _id: '5f69dcb6265cf04c88ff066b',
            name: 'Samsung',
            slug: 'Samsung',
            parentId: '5f69dc74265cf04c88ff066a',
            children: Array(0),
          },
          {
            name: 'realme',
            parentId: '5f69dc74265cf04c88ff066a',
            slug: 'realme',
            _id: '5f6dd1f4b89a2f29d06857d2',
            children: Array(0),
          },
        ],
      },
    ],
  },
  {
    children: [],
    name: 'Sports Books & More',
    slug: 'Sports-Books-and-More',
    _id: '5f6952f2af284a45f87356d0',
  },
];

const showList = (category) => {
  return category.map((cat) => (
    <li key={cat.name}>
      {cat.name} <ul>{showList(cat.children)}</ul>
    </li>
  ));
};

console.log(list);
function Test() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const updatecat = (List, category) => {
    const myCategory = [];
    List.map((cat) => {
      if (cat._id === category.parentId) {
        myCategory.push({
          ...cat,
          children:
            cat.children && cat.children
              ? updatecat(
                  [
                    ...cat.children,
                    {
                      name: category.name,
                      slug: category.name,
                      parentId: category.parentId,
                      _id: category._id,
                      children: category.children,
                    },
                  ],
                  category
                )
              : [],
        });
      } else {
        myCategory.push({
          ...cat,
          children:
            cat.children && cat.children.length > 0
              ? updatecat(cat.children, category)
              : [],
        });
      }
    });
    return myCategory;
  };
  const newUpdate = (existingProducts, newProduct) => {
    let updateProduct = [];

    // if (newProductParent === undefined) {
    //   return updateProduct([...existingProducts], { ...newProduct });
    // }
    existingProducts.map((product) => {
      //console.log(product);
      if (product._id === newProduct.parentId) {
        // console.log(product);
        updateProduct = [
          ...updateProduct,
          {
            ...product,
            children: product.children
              ? newUpdate(
                  [
                    ...product.children,
                    {
                      name: product.name,
                      slug: product.name,
                      parentId: product.parentId,
                      _id: product._id,
                      children: product.children,
                    },
                  ],
                  newProduct
                )
              : [],
          },
        ];
      } else {
        //console.log(product);
        updateProduct = [
          ...updateProduct,
          {
            ...product,
            children: product.children
              ? newUpdate(product.children, newProduct)
              : [],
          },
        ];
      }
    });
    return updateProduct;
  };

  const updateList = (e) => {
    e.preventDefault();
    const category = {
      name: name,
      parentId: id,
      slug: name,
      _id: Date.now(),
    };
    console.log(updatecat(list, category));
    // console.log(newUpdate(list, category));
  };

  return (
    <div className='container'>
      {showList(list)}

      <form>
        <input
          type='text'
          name='name'
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type='text'
          name='parentId'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <br />
        <button onClick={updateList}>Update</button>
      </form>
    </div>
  );
}

export default Test;
