import BaseModel from './BaseModel';

class FoodModel extends BaseModel {
  defaults() {
    return {
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  constructor() {
   super('food');
 }
}

export default FoodModel;
