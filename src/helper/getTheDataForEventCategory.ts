export function getTheDataForEventCategory(
  e: EventCategoryAndType[],
  categoryID: EventCategory['id'] | null,
) {
  let filterArray = e.filter(obj => obj.categoryID === categoryID);

  let minBudget = 0;
  let maxBudget = 0;

  minBudget = e.reduce((acc: number, obj: EventCategoryAndType) => {
    return acc + obj.type.minBudget;
  }, 0);

  maxBudget = e.reduce((acc: number, obj: EventCategoryAndType) => {
    return acc + obj.type.maxBudget;
  }, 0);

  return {
    length: filterArray.length,
    minBudget: minBudget,
    maxBudget: maxBudget,
  };
}
