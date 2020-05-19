import { CoursePart } from "../types";

const data = [
  {
    name: "Fundamentals",
    exerciseCount: 10
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14
  }
];
const coursePartData: CoursePart [] = data.map(obj => {
   return obj;
  });

export default coursePartData