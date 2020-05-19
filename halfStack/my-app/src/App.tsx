import React from 'react';
import './App.css';
import { CoursePart } from './types'
import coursePartData from './data/courseParts'
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'
function App() {
  const courseName = "Half Stack application development";
  const courseParts: Array<CoursePart> = coursePartData;

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
}

export default App;
