'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.serviceRelationalFieldsMapper =
  exports.serviceRelationalFields =
  exports.serviceFilterAbleFields =
  exports.serviceSearchAbleFields =
    void 0;
exports.serviceSearchAbleFields = ['title', 'status'];
exports.serviceFilterAbleFields = [
  'searchTerm',
  'title',
  'status',
  'minPrice',
  'maxPrice',
  'categoryId',
];
exports.serviceRelationalFields = ['categoryId'];
exports.serviceRelationalFieldsMapper = {
  categoryId: 'category',
};
