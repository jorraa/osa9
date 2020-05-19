import React from "react";
import { CoursePart } from '../types'
import coursePartData from "../data/courseParts";

const Content: React.FC<{ courseParts: Array<CoursePart> }> 
  = (courseParts) => {
  return (
    <div>
      {Object.values(coursePartData).map((coursePart: CoursePart) => (
        <p>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      ))}
    </div>
    )
};

export default Content;