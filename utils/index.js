// export function repleaceId(array) {
//   const mapperArray = array
//     .map((item) => {
//       return {
//         id: item._id.toString(),
//         ...item,
//       };
//     })
//     .map(({ _id, ...rest }) => rest);
//   return mapperArray;
// }

// export function repleaceIdObject(obj) {
//   const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
//   return updatedObj;
// }
export function replaceId(array) {
  return array.map((item) =>
    JSON.parse(
      JSON.stringify({
        id: item._id?.toString(),
        ...item,
        _id: undefined, // Removing _id explicitly
      })
    )
  );
}

export function replaceIdObject(obj) {
  if (!obj) return null; // Handle null/undefined safely
  return JSON.parse(
    JSON.stringify({
      id: obj._id?.toString(),
      ...obj,
      _id: undefined, // Removing _id explicitly
    })
  );
}
