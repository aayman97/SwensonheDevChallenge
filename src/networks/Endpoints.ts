const Endpoints = {
  categories: '/categories.json',
  categoriesID: (id: string | number) => {
    return `/categories/${id}.json`;
  },
};

export default Endpoints;
