"use server";

import { Chat } from "../models/chats.model";
import { User } from "../models/user.model";
import { mongo } from "mongoose";
import { connectToDB } from "../database/mongoose";
import nodemailer from "nodemailer";

async function getIdByEmail(email: string) {
  const id = (await User.findOne({ Email: email }))._id;
  return id;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_ACCOUNT,
    pass: process.env.SMTP_PASSKEY,
  },
});

export async function sendEmail(
  senderEmail: string,
  receiverEmail: string,
  productName: string,
  productImages: string[],
  productId: string,
  formData: {
    price: number;
  },
) {
  const { price } = formData;
  const inviteLink = `https://nksm.vercel.app/product/${productId}`;

  const htmlTemplate = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" lang="en">
  
    <head>
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      <style>
        @media(prefers-color-scheme:dark) {
          .dark_bg-white {
            background-color: rgb(255, 255, 255) !important
          }
  
          .dark_text-_AAAAAA {
            color: rgb(170, 170, 170) !important
          }
  
          .dark_text-black {
            color: rgb(0, 0, 0) !important
          }
  
          .dark_text-blue-700 {
            color: rgb(29, 78, 216) !important
          }
  
          .dark_invert {
            filter: invert(100%) !important
          }
        }
      </style>
    </head>
    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Visit NKSM to view the offer
    </div>
  
    <body style="margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;padding-left:0.5rem;padding-right:0.5rem;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">
      <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:550px;margin-left:auto;margin-right:auto;margin-top:40px;margin-bottom:40px;border-radius:0.5rem;border-width:1px;border-style:solid;border-color:rgb(234,234,234);padding:20px">
        <tbody>
          <tr style="width:100%">
            <td>
              <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-bottom:1.25rem;margin-top:1.75rem">
                <tbody>
                  <tr>
                    <td><img class="dark_invert" alt="NKSM" height="90" src="https://pub-2188c30af1504cb0a1acb7e6f7e0efae.r2.dev/logon.png" style="display:block;outline:none;border:none;text-decoration:none;margin-left:auto;margin-right:auto;margin-top:0px;margin-bottom:0px" width="200" /></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size:2.25rem;line-height:2.5rem;margin:16px 0;margin-bottom:0.25rem;font-weight:600">Bid Offer</p>
              <p style="font-size:1rem;line-height:1.5rem;margin:16px 0;margin-top:0.25rem">${senderEmail}<!-- --> has sent you an offer.</p>
              <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
            
                  <tr>
                    <td><img alt="Product Image" src="${productImages[0]}" style="display:block;outline:none;border:none;text-decoration:none;margin-bottom:0.5rem;aspect-ratio:4/3;width:100%;border-radius:0.375rem" />
                      <p style="font-size:1.875rem;line-height:2.25rem;margin:16px 0;margin-bottom:0px;margin-top:0.5rem;font-weight:500">${productName}</p>
                      <p style="font-size:1.25rem;line-height:1.75rem;margin:16px 0;margin-top:0px;margin-bottom:0px">₹ <!-- -->${price}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:2rem;margin-bottom:2rem;text-align:center">
                <tbody>
                  <tr>
                    <td><a class="dark_bg-white dark_text-black" href="${inviteLink}" style="line-height:1.25rem;text-decoration:none;display:inline-block;max-width:100%;border-radius:0.25rem;background-color:rgb(0,0,0);padding-left:1.25rem;padding-right:1.25rem;padding-top:0.75rem;padding-bottom:0.75rem;text-align:center;font-size:0.875rem;font-weight:600;color:rgb(255,255,255);text-decoration-line:none;padding:12px 20px 12px 20px" target="_blank"><span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Visit NKSM</span><span><!--[if mso]><i style="letter-spacing: 20px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size:14px;line-height:24px;margin:16px 0">or copy and paste this URL into your browser:<!-- --> <a href="https://nksm.vercel.app" class="dark_text-blue-700" style="color:rgb(37,99,235);text-decoration:none;text-decoration-line:none" target="_blank">https://nksm.vercel.app</a></p>
              <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin-left:0px;margin-right:0px;margin-top:1.5rem;margin-bottom:1.5rem;border-width:1px;border-style:solid;border-color:rgb(234,234,234)" />
              <p class="dark_text-_AAAAAA" style="font-size:0.75rem;line-height:1rem;margin:16px 0;color:rgb(102,102,102)">If you were not expecting this invitation, you can ignore this email. If you are concerned about your account&#x27;s safety, please reply to this email to get in touch with us.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  
  </html>
    `;
  try {
    await connectToDB();
    if (senderEmail === receiverEmail) {
      return {
        error: "Can't send invite to same user",
        msg: null,
        success: true,
      };
    }
    const existingInviteOrChat = await Chat.findOne({
      Seller: new mongo.ObjectId(await getIdByEmail(receiverEmail)),
      Buyer: new mongo.ObjectId(await getIdByEmail(senderEmail)),
      ProductId: new mongo.ObjectId(productId),
      status: { $ne: "dead" },
    }).countDocuments();
    if (existingInviteOrChat > 0) {
      return {
        error: "Already sent an invite!",
        msg: null,
        success: true,
      };
    }

    await transporter.sendMail({
      from: `"NKSM" <${senderEmail}>`,
      subject: `You've received a bid offer from ${senderEmail.substring(0, senderEmail.indexOf("@"))}`,
      to: receiverEmail,
      html: htmlTemplate,
    });
    const sellerId = new mongo.ObjectId(await getIdByEmail(receiverEmail));
    const buyerId = new mongo.ObjectId(await getIdByEmail(senderEmail));

    const invite = await Chat.create({
      Seller: sellerId,
      Buyer: buyerId,
      ProductId: productId,
      status: "invite",
      Messages: [],
      InitPrice: price,
    });

    const seller = await User.findOne({
      _id: sellerId,
    });
    seller.Chat_IDs.push(invite._id);

    const buyer = await User.findOne({
      _id: buyerId,
    });
    buyer.Chat_IDs.push(invite._id);

    return {
      error: null,
      msg: "An invite email has been sent.",
      success: true,
    };
  } catch (error) {
    return {
      msg: null,
      error: "Server issue. Please try again later.",
      success: false,
    };
  }
}
