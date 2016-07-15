import BaseModel from './BaseModel';

class FoodModel extends BaseModel {
  defaults() {
    return {
      r,
      cx,
      cy,
      fill,
      createdAt: newDate(),
      updatedAt: newDate()
    };
  }

  constructor() {
   super('food');
 }
}

export default FoodModel;
