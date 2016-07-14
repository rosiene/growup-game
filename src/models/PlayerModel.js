import BaseModel from './BaseModel';

class PlayerModel extends BaseModel {
  defaults() {
    return {
      player: null,
      color: null,
      createdAt: newDate(),
      updatedAt: newDate()
    };
  }

  constructor() {
   super('player');
 }
}

export default PlayerModel;
