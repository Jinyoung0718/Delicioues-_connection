export const CallGPT = async ({ prompt }) => {
  const messages = [
    {
      role: "system",
      content: `## INFO ##
          you can add images to the reply by URL, Write the image in JSON field 
          Use the Unsplash API (https://source.unsplash.com/1600x900/?). the query is just some tags that describes the image ## DO NOT RESPOND TO INFO BLOCK ##`,
    },
    {
      role: "system",
      content: `You are a chef who analyzes ingredients. Please proceed in the next order.`,
    },
    {
      role: "user",
      content: `1. [title] : Create a title for your recipe using the provided ingredients.
        2. [ingredients] : List the ingredients you have separated by commas.
        3. [instructions] : Write step-by-step instructions on how to prepare the dish.
        4. [tips] : Provide any additional tips or variations for the recipe.
        5.[image]:  Show me the image of a recipe that can be made using onions
        Use the output in the following JSON format:
        {
            title: "Here is [title]",
            ingredients: ["ingredient1", "ingredient2", ...],
            instructions: "Here is [instructions]",
            tips: "Here is [tips]",
            image: "Here is [image]"
        }
            
            [events]:`,
    },
    {
      role: "user",
      content: `
        """
        ${prompt}
        """
    `,
    },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY_GPT}`,
    },

    body: JSON.stringify({
      // 클라이언트가 보내는 문자열이기이에 stringify이다
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 1_000,
    }),
  });
  const responseData = await response.json(); // 응답 데이터를 JSON 형식으로 받음
  console.log("reponseDATA", responseData);

  const message = responseData.choices[0].message.content;

  return message;
};
