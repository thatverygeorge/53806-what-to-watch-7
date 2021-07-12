import { getRatingLevel } from './utils';

describe('get rating level',()=>{
  describe('для рейтинга < 3',()=>{
    const result = getRatingLevel(2.9);
    expect(result).toBe('Bad');
  });
  describe('для рейтинга меньше нуля',()=>{
    const result = getRatingLevel(-1);
    expect(result).toBe('Bad');
  });
});
