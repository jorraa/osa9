interface BmiValues {
  weight: number;
  height: number;
}

interface BmiResponse {
  data: string,
  error: string
} 

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}
const getBmiText = (bmi: number) => {
console.log('bmi', bmi)  
  return bmi < 18.5 
    ?'underweight'
    : !(bmi > 25)
      ?'Normal (healthy weight)'
      :bmi > 30 
        ?'obese'
        :'overweight' 
}

const calculateBmi = (weight: number, height: number) : number => {
  return weight / Math.pow(height/100,2)
}

export const bmiCalculator = (height:number, weight: number ):BmiResponse => { 
  try {
    //const { weight, height } = parseArguments(process.argv);
    if( height === 0) throw new Error('Can\'t divide by 0!');
    return {data: getBmiText( calculateBmi(weight, height)), error:'' };
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
    return { error: e.message, data: ''}
  }
}
