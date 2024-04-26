/*import { useEffect, useState } from 'react';
import * as toxicity from '@tensorflow-models/toxicity';
import '@tensorflow/tfjs';

const ToxicityChecker = (inputSentence) => {
    const [result_toxic, setToxicity] = useState(null);
    const [result_insult, setInsult] = useState(null);
    const result = result_insult && result_toxic;
    const threshold = 0.9;

    useEffect(() => {
        const classifySentence = async () => {
            const model = await toxicity.load(threshold);
            const sentences = [inputSentence];
            const predictions = await model.classify(sentences);
            setInsult(JSON.stringify(predictions[1].results[0].match, null, 2));
            setToxicity(JSON.stringify(predictions[6].results[0].match, null, 2));
        };

        if (inputSentence) {
            classifySentence();
        }
    }, [inputSentence]);

    return {result} //{ result_toxic, result_insult };
};

export default ToxicityChecker;*/


import * as toxicity from '@tensorflow-models/toxicity';
import '@tensorflow/tfjs';

const ToxicityChecker = async (inputSentence) => {
    const threshold = 0.9;
    const model = await toxicity.load(threshold);
    const sentences = [inputSentence];
    const predictions = await model.classify(sentences);
    const result_insult = JSON.stringify(predictions[1].results[0].match, null, 2);
    const result_toxic = JSON.stringify(predictions[6].results[0].match, null, 2);
    const result = result_insult || result_toxic;
    console.log("result: ", result);
    console.log("result: ", typeof result_insult);

    return result; //{ result_toxic, result_insult };
};

export default ToxicityChecker;