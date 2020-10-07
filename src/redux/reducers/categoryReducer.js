import { category } from '../constant';

const initialState = {
  loading: false,
  categories: [],
  errors: '',
};

const buildNewCategories = (existingCategories, newcategory) => {
  console.log(newcategory);
  if (newcategory.parentId === undefined) {
    return [
      ...existingCategories,
      {
        _id: newcategory._id,
        name: newcategory.name,
        slug: newcategory.slug,
        children: [],
      },
    ];
  }

  const myCategory = [];
  existingCategories.map((category) => {
    if (category._id === newcategory.parentId) {
      const newCategory1 = {
        _id: newcategory._id,
        name: newcategory.name,
        slug: newcategory.slug,
        parentId: newcategory.parentId,
        children: [],
      };

      myCategory.push({
        ...category,
        children:
          category.children.length > 0
            ? [...category.children, newCategory1]
            : [newCategory1],
      });
    } else {
      myCategory.push({
        ...category,
        children: category.children
          ? buildNewCategories(category.children, newcategory)
          : [],
      });
    }
  });
  return myCategory;
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case category.CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case category.CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case category.CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case category.ADD_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case category.ADD_CATEGORY_SUCCESS:
      const newcategory = action.payload;
      const updateCategory = buildNewCategories(state.categories, newcategory);
      console.log(updateCategory);
      return {
        ...state,
        loading: false,
        categories: updateCategory,
      };
    case category.ADD_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
