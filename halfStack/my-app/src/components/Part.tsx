import React from "react";
import { CoursePart } from '../types'

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> 
  = ({ part }) => {
    let rest = '' 
    switch (part.name) {
      case "Fundamentals": 
        rest = rest.concat(' ', part.description);
        break;
      case "Using props to pass data": 
        rest = rest.concat(' ' + part.groupProjectCount);
        break;
      case "Deeper type usage": 
        rest = rest.concat(' ', part.description, ' ', part.exerciseSubmissionLink);
        break;
      case "Temporarily arrays come from deep":
        rest = rest.concat(' ', part.description);
        break;
      default: 
        assertNever(part);
        break;
    }
  return (
    <p>
      {part.name} {part.exerciseCount} {rest}
    </p>
    )
  };

export default Part;