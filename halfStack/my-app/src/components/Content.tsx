import React from "react";
import { CoursePart } from '../types'
import coursePartData from "../data/courseParts";
import Part from './Part'
const Content: React.FC<{ courseParts: Array<CoursePart> }> 
  = (courseParts) => {
  return (
    <div>
      {Object.values(coursePartData).map((coursePart: CoursePart) => (
        <Part part={coursePart} />
      ))}
    </div>
    )
};

export default Content;