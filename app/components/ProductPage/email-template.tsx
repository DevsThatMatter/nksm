import { Html, Heading, Text } from "@react-email/components";

export default function EmailTemplate({
  senderEmail,
  price,
}: {
  senderEmail: string;
  price: number;
}) {
  return (
    <Html lang="en">
      <Heading as="h1">Bid offer</Heading>
      <Text>You just sent a bid. Here are the details:</Text>
      <Text>Sender: {senderEmail}</Text>
      <Text>Price: {price}</Text>
    </Html>
  );
}
