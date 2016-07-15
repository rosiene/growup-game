import BaseModel from './BaseModel';

class PlayerModel extends BaseModel {
  defaults() {
    return {
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  constructor() {
   super('player');
 }
}

export default PlayerModel;
