// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}


const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate () {
     let randIndex = Math.floor(Math.random()* 15);
     let newBase = returnRandBase();
     console.log(`The random index is ${randIndex} and the mutated base is ${newBase}`);
    for (let baseNum = 0; baseNum < this.dna.length; baseNum ++) {
      if (this.dna[randIndex] !== newBase) {
        return this.dna.splice(randIndex,1,newBase);
      } else {
        randIndex = Math.floor(Math.random()* 15); 
      }
    } 
    },
    compareDNA (otherpAequor) {
      let thisDNA = this.dna;
      let thatDNA = otherpAequor.dna;
      let dnaInCommon = [];

     for (let baseNum = 0; baseNum < thisDNA.length; baseNum ++) {
       if (thisDNA[baseNum] === thatDNA[baseNum]) {
         dnaInCommon.push(thisDNA[baseNum]);
       }
     };
     let commonality = Math.floor((dnaInCommon.length / thisDNA.length) * 100);
     console.log(`Specimen No. ${this.specimenNum} and Specimen No. ${otherpAequor.specimenNum} have ${commonality} percent in common.`)
    },
    willLikelySurvive () {
      let basesCOrG = [];

     for (let baseNum = 0; baseNum < this.dna.length; baseNum ++) {
        if (this.dna[baseNum] === 'C') {
          basesCOrG.push('C');
        };
        if (this.dna[baseNum] === 'G') {
          basesCOrG.push('G')
        };
      }
      let numGoodBases = basesCOrG.length
      let percentCorG = Math.floor((basesCOrG.length / this.dna.length) * 100);


  // Log the good bases    console.log(basesCOrG);
  // Log the Number good bases    console.log(numGoodBases);
  // log the percentage good bases    console.log(percentCorG);

      if (percentCorG >= 60) {
        return true;
      } else {
        return false;
      }
    },

    complementStrand () {
      let strand1 = this.dna;
      let strand2 = [];
      for (let i = 0; i < strand1.length; i++) {
        if (strand1[i] === 'A') {
          strand2.push('T');
        } else if (strand1[i] === 'T') {
          strand2.push('A');
        } else if (strand1[i] === 'C') {
          strand2.push('G');
        } else if (strand1[i] === 'G') {
          strand2.push('C');
        };
      };
      return console.log(`Original: ${strand1}` + `Complement: ${strand2}`);
    },

  };
}



// Printing to the console to test code
// Created two sample P.aequor
// let firstSample = pAequorFactory(1, mockUpStrand());
// let secondSample = pAequorFactory(2, mockUpStrand());

// log the specimen number and dna of first sample
// console.log(`Specimen No.${firstSample.specimenNum}: ${firstSample.dna}`);

// run mutation code on first sample and log the mutation to the console
/* let firstMutation = firstSample.mutate();
console.log(`Specimen No.${firstSample.specimenNum}: ${firstSample.dna}`);
*/

// log the specimen number and dna of the second sample to the console
/* console.log(`Specimen No.${secondSample.specimenNum}: ${secondSample.dna}`);
*/

// Compare the dna of the first and second sample. The .compareDNA method will print percentage in common to the console.
/*
firstSample.compareDNA(secondSample);
*/

// log the .willLikelySurvive method to the console
// console.log(firstSample.willLikelySurvive());

let arrayOf30Survivors = []

const createSurvivors = () => {
  let newSpecimenNum = 1;
  do {
    let newSpecimen = pAequorFactory(newSpecimenNum, mockUpStrand());
    let survivalTest = newSpecimen.willLikelySurvive();

    if (survivalTest === true) {
      arrayOf30Survivors.push(newSpecimen);
    } else if (survivalTest === false) {
      newSpecimenNum = newSpecimenNum + 1;
    }
  } while (arrayOf30Survivors.length < 30)
}

createSurvivors();

console.log('Length of Survivor Array: ' + arrayOf30Survivors.length)
arrayOf30Survivors.forEach(specimen => {
  console.log(`Specimen No. ${specimen.specimenNum} DNA: ${specimen.dna}`)
})

console.log('// // // // // // // // //');

arrayOf30Survivors[0].complementStrand();


