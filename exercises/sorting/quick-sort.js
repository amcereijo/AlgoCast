/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var sortArray = function(nums) {
  //console.log('sort', nums, nums.length)
  if (nums.length < 2) {
    //  console.log('returning', nums)
      return nums;
  }
  const markPoint = parseInt((nums.length-1)/2, 10);
  const mark = nums[markPoint];
  const minus = [];
  const major = [];

  for(let i=0;i<nums.length;i++) {
      if(i === markPoint){
          continue;
      }

      if(nums[i] <= mark) {
          minus.push(nums[i]);
      } else if(nums[i] > mark) {
          major.push(nums[i]);
      }
  }
 // console.log(minus, mark, major);
  return [...sortArray(minus), mark, ...sortArray(major)];
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var sortArray2 = function(nums) {
  //console.log('sort', nums, nums.length)
  if (nums.length < 2) {
      return nums;
  }
  const markPoint = parseInt((nums.length-1)/2, 10);
  const mark = nums[markPoint];
  const minus = [];
  const major = [];

  for(let i=0;i<markPoint;i++) {
      if(nums[i] <= mark) {
          minus.push(nums[i]);
      } else if(nums[i] > mark) {
          major.push(nums[i]);
      }
  }

  for(let i=markPoint+1;i<nums.length;i++) {
      if(nums[i] <= mark) {
          minus.push(nums[i]);
      } else if(nums[i] > mark) {
          major.push(nums[i]);
      }
  }

 // console.log(minus, mark, major);
  return [...sortArray(minus), mark, ...sortArray(major)];
};
