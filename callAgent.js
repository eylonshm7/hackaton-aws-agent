import {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const client = new BedrockAgentRuntimeClient({
  region: "us-east-1",
  credentials: config,
});

export const invokeAgent = async function ({ sessionId, inputText } = {}) {
  let completion = "";
  const input = {
    agentId: "BDDTKWNTKO",
    agentAliasId: "XHZRS847GJ",
    sessionId: sessionId,
    inputText: inputText,
  };
  const command = new InvokeAgentCommand(input);
  const response = await client.send(command);

  for await (const chunkEvent of response.completion) {
    if (chunkEvent.chunk) {
      const chunk = chunkEvent.chunk;
      let decoded = new TextDecoder("utf-8").decode(chunk.bytes);
      completion += decoded;
      console.log("completion: ", completion);
    }
  }
  return completion;
};
