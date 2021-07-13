import {getRatingLevel} from './utils';
import {RatingLabels} from './const';

describe('Function getRatingLevel',()=>{
  it('should return correct rating labels',()=>{
    expect(getRatingLevel(-1)).toBe(RatingLabels.BAD);
    expect(getRatingLevel(2.9)).toBe(RatingLabels.BAD);

    expect(getRatingLevel(3)).toBe(RatingLabels.NORMAL);
    expect(getRatingLevel(4.9)).toBe(RatingLabels.NORMAL);

    expect(getRatingLevel(5)).toBe(RatingLabels.GOOD);
    expect(getRatingLevel(7.9)).toBe(RatingLabels.GOOD);

    expect(getRatingLevel(8)).toBe(RatingLabels.VERY_GOOD);
    expect(getRatingLevel(9.9)).toBe(RatingLabels.VERY_GOOD);

    expect(getRatingLevel(10)).toBe(RatingLabels.AWESOME);
    expect(getRatingLevel(12)).toBe(RatingLabels.AWESOME);
  });
});
