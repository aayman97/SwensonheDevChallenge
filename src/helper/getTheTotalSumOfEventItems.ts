export function getTheTotalSumOfEventItems(
  e: EventCategoryAndType[],
  categoryID: EventCategory['id'],
) {
  const filteredArray = e.filter(obj => obj.categoryID === categoryID);

  let minBudget: number = 0;
  let maxBudget: number = 0;

  minBudget = filteredArray.reduce((acc: number, obj: EventCategoryAndType) => {
    return acc + obj.type.minBudget;
  }, 0);

  maxBudget = filteredArray.reduce((acc: number, obj: EventCategoryAndType) => {
    return acc + obj.type.maxBudget;
  }, 0);

  if (maxBudget === 0 && minBudget === 0) {
    return null;
  } else {
    return {minBudget, maxBudget};
  }
}
