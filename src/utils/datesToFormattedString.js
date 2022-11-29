// accepts array of numbers representing dates and converting it to string
// example:
// [0, 1, 2, 3, 4, 5, 6] => 'Senin - Minggu'
// [0, 1, 2, 3, 4] => 'Senin - Jumat'
// [0, 1, 2, 3, 4, 6] => 'Senin - Jumat, Minggu'
// [0, 1, 2, 3, 5, 6] => 'Senin - Jumat, Sabtu - Minggu'
// [2, 4, 6] => 'Rabu, Jumat, Minggu'
// [1, 2, 4, 5, 6] => 'Selasa - Rabu, Jumat - Minggu'
const datesToFormattedString = dates => {
  if(!dates || dates.length < 1) return ""

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  let result = '';
  let i = 0;
  while (i < dates.length) {
    const temp = days[dates[i]]; // stores the current element's day


    // if the next element is consecutive
    if (i + 1 < dates.length && dates[i + 1] - dates[i] === 1) {
      // variable that checks if the next element breaks the consecutive sequence
      let comboBreaker = i + 1;

      // while the next element is consecutive
      while (comboBreaker + 1 < dates.length && dates[comboBreaker + 1] - dates[comboBreaker] === 1)
        comboBreaker++;

      // add the consecutive sequence to the result
      result += `${temp} - ${days[dates[comboBreaker]]}, `;
      // move the i pointer to where the consecutive sequence ends
      i = comboBreaker + 1;
    }

    // if the next element is not consecutive
    else {
      result += `${temp}, `;
      i++;
    }
  }

  return result.slice(0, -2); // remove the last comma and space ', '
};

export default datesToFormattedString
