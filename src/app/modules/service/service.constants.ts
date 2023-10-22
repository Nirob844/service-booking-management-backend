export const serviceSearchAbleFields: string[] = ['title'];

export const serviceFilterAbleFields: string[] = [
  'searchTerm',
  'title',
  'status',
  'minPrice',
  'maxPrice',
  'categoryId',
];
export const serviceRelationalFields: string[] = ['categoryId'];
export const serviceRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
