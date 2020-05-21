interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartZero extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartZero {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartZero {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartZero {
  name: "TypeScript looks good";
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree |CoursePartFour;