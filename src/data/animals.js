const animalsTree = [
  { id: 'animals', parent: null },
  { id: 'mammals', parent: 'animals' },
  { id: 'dogs', parent: 'mammals' },
  { id: 'cats', parent: 'mammals' },
  { id: 'birds', parent: 'animals' },
  { id: 'parrot', parent: 'birds' },
  { id: 'pigeon', parent: 'birds' }
];

// Export ES2015 Module
export default animalsTree;