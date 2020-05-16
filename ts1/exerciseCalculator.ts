interface ExerciseValues {
  hours: number[];
  target: number;
}

interface ExerciseResults {
  days: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number
}

const calculateExercises = (hours: number[], target: number) :ExerciseResults => {

  const avg = hours.reduce((a, b) => a + b, 0)/hours.length
  const rating = avg < target/2
                    ?1
                    :avg < target
                      ?2:3 

  return {
    days: hours.length,
    trainingDays: hours.filter(h => h> 0).length,
    target: target,
    average: avg,
    success: avg < target ? false : true,
    rating: rating,
    ratingDescription: rating === 1 
                        ? 'you want to do it, go training!'
                        : rating ===2 
                          ? 'not too bad but could be better'
                          : 'you are doing fine, excellent'
  }
}
const parseExerciseArguments = (args: Array<string>): ExerciseValues => {

  if (args.length < 4) throw new Error('Not enough arguments');
  
  const hours = args.slice(2, -1).map(h => {
    const hour =  Number(h)
    if(isNaN(hour)) { 
      throw new Error(`${h} is not number`)
    }
    return hour
  })
  const target = Number(args[args.length-1])
  if(isNaN(target)) { 
    throw new Error(`${args[args.length-1]} is not number`)
  }

  return {
    hours: hours,
    target: target
  }
}

try {
  const { hours, target } = parseExerciseArguments(process.argv);
  const result = calculateExercises(hours, target)
  console.log(result)

} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}