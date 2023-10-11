// Pega o primeiro e ultimo nome de uma string
export default function getMostUsedCategoryId(arr) {
    const indexCounts = {};

    for (let i = 0; i < arr.length; i++) {
        const index = arr[i];
        if (indexCounts[index]) {
            indexCounts[index]++;
        } else {
            indexCounts[index] = 1;
        }
    }

    let mostRepeatedIndex;
    let maxCount = 0;

    for (const index in indexCounts) {
        if (indexCounts[index] > maxCount) {
            mostRepeatedIndex = index;
            maxCount = indexCounts[index];
        }
    }

    return mostRepeatedIndex;
}