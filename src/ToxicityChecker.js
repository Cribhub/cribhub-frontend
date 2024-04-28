import * as toxicity from '@tensorflow-models/toxicity'
import '@tensorflow/tfjs'

const ToxicityChecker = async (inputSentence) => {
    const threshold = 0.9
    const model = await toxicity.load(threshold)
    const sentences = [inputSentence]
    const predictions = await model.classify(sentences)
    const result_insult = JSON.stringify(
        predictions[1].results[0].match,
        null,
        2
    )
    const result_toxic = JSON.stringify(
        predictions[6].results[0].match,
        null,
        2
    )
    const result = result_insult || result_toxic

    return result
}

export default ToxicityChecker

