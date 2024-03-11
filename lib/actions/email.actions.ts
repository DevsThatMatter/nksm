import EmailTemplate from "@/app/components/ProductPage/email-template";
import { Resend } from "resend";

interface State {
  error: string | null;
  success: boolean;
}

export async function sendEmail(
  senderEmail: string,
  receiverEmail: string,
  formData: FormData,
) {
  let priceString = formData.get("price")?.toString();
  if (priceString === undefined) {
    priceString = "0";
  }
  let price = parseFloat(priceString);

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const response = await resend.emails.send({
      from: senderEmail,
      to: receiverEmail,
      subject: "Bid offer",
      react: EmailTemplate({ senderEmail, price }),
    });

    if (response.error) {
      console.log(response.error);
    }
    return {
      error: null,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "There was an error sending the email. Please try again later.",
      success: false,
    };
  }
}
