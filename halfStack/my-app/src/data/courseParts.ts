import { CoursePart } from "../types";

/*
const data = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  }
 ];
 */
const part1: CoursePart = {
  name: "Fundamentals",
  exerciseCount: 10,
  description: "This is an awesome course part"
}
const part2: CoursePart = {
  name: "Using props to pass data",
  exerciseCount: 7,
  groupProjectCount: 3
}
const part3: CoursePart = {
  name: "Deeper type usage",
  exerciseCount: 14,
  description: "Confusing description",
  exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
}
const part4: CoursePart = {
  name: "Temporarily arrays come from deep",
  exerciseCount: 1,
  description: "Needed to do make it one by one",
}

let coursePartData: CoursePart[] = [];
coursePartData = coursePartData
  .concat(part1)
  .concat(part2)
  .concat(part3)
  .concat(part4)
/*
Didn't find the way to read data array
const coursePartData: CoursePart [] = data.map(obj => {
    return obj;
  }
) 
*/
export default coursePartData
