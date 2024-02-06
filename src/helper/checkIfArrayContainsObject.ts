export function checkIfArrayContainsObject(
  eventsTemp: EventCategoryAndType[],
  objToCheck: EventCategoryAndType,
) {
  return eventsTemp.some(
    obj =>
      obj.categoryID === objToCheck.categoryID &&
      obj.type.id === objToCheck.type.id,
  );
}
