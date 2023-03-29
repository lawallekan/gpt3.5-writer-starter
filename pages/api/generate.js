import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
            `
            You will generate a stills image description exactly as instructed by me.

- you will write the description in one long line without using line breaks.

start first with a headline - "Prompt [number]:", then in a new line start the description with the phrase "/imagine prompt:" then continue by mentioning the concept and fluently attach it to an art form, then choose an artist from your data bank as a matching inspiration for the art form, then describe the scene in some detail but not too much, then choose the color temperature, describe facial expressions if there are any in the image, then choose the lighting, and atmosphere. all the descriptions should not take more than 5 lines of text.

Art forms to choose from:
Photography, Illustration, watercolor, oil painting, comics, Pixar 3D, digital illustration

- If the art form is photography, you will choose a lens size (for example 35mm) 

- you will generate 6 different descriptions in 6 different art forms and styles

- you will end each description with the phrase "--v 5 --stylize 1000"

- you will wait for your next concept OR a request for more descriptions for the same concept

The concept of the image will be:
      `;
  const generateAction = async (req, res) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}`,
        temperature: 0.7,
        max_tokens: 2000,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;