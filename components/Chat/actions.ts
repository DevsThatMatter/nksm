"use server"

//  TODO: this need to be replaced by the actual database
const chatModel: Array<{
  Chat_ID: number;
  Participants: string[];
  Messages: { Sender: string; Message: string; Timestamp: string }[];
  Created_Timestamp: string;
  Updated_Timestamp: string;
}> = [
    {
      Chat_ID: 1,
      Participants: ["101", "102"],
      Messages: [
        { Sender: "101", Message: "Hello!", Timestamp: "2024-01-25T10:00:00Z" },
        { Sender: "102", Message: "Hi there!", Timestamp: "2024-01-25T10:05:00Z" },
      ],
      Created_Timestamp: "2024-01-25T09:55:00Z",
      Updated_Timestamp: "2024-01-25T10:10:00Z",
    },
    {
      Chat_ID: 2,
      Participants: ["103", "104"],
      Messages: [
        { Sender: "103", Message: "Good morning!", Timestamp: "2024-01-25T08:30:00Z" },
        { Sender: "104", Message: "Morning!", Timestamp: "2024-01-25T08:35:00Z" },
      ],
      Created_Timestamp: "2024-01-25T08:25:00Z",
      Updated_Timestamp: "2024-01-25T08:40:00Z",
    },
    {
      Chat_ID: 3,
      Participants: ["105", "106"],
      Messages: [
        { Sender: "105", Message: "How are you?", Timestamp: "2024-01-25T15:20:00Z" },
        { Sender: "106", Message: "I'm good, thanks!", Timestamp: "2024-01-25T15:25:00Z" },
      ],
      Created_Timestamp: "2024-01-25T15:15:00Z",
      Updated_Timestamp: "2024-01-25T15:30:00Z",
    },
  ];


export async function chatHandler(userId1: string, userId2: string) {
  console.log("hello from backend")
  try {
    const chatId = chatModel.find((chat) =>
      chat.Participants.includes(userId1) && chat.Participants.includes(userId2)
    )?.Chat_ID;

    if (chatId) {
      console.log(`Chat ID found: ${chatId}`);

    } else {
      console.log(`Chat not found for participants ${userId1} and ${userId2}.`);
    }
    return "hello"
  } catch (error) {
    console.error("Error in chatHandler:", error);
  }
}
