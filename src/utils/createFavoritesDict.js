export function createFavoritesDict(items) {
  return items.reduce((total, item) => {
    total[item._id] = { isFavorite: false };
    return total;
  }, {});
}
