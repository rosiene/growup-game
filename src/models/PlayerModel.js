import BaseModel from './BaseModel';

class PlayerModel extends BaseModel {
  defaults() {
    return {
      r: "20",
      cx: 20,
      cy: 20,
      nx: 20,
      ny: 20,
      fill: "white",
      name: "",
      food_eaten: 0,
      time_alive: "00:00:00",
      delay: 5,
      ranking: 0,
      createdAt: newDate(),
      updatedAt: newDate()
    };
  }

  constructor() {
   super('player');
 }
}

export default PlayerModel;
