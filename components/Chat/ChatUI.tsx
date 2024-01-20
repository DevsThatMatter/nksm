"use client" // Bits
import { ImageIcon, Link1Icon, PaperPlaneIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface ChatType {
    userName: string;
    phoneNumber: string;
    message: { msg: string, mainUser: boolean }[]; // all types => voice, image, text
}

export default function ChatUI() {
    // dummy data
    const chatMessages: ChatType =
        { userName: "John", phoneNumber: "123456789", message: [{ msg: "Hello", mainUser: false }, { msg: "Hello", mainUser: true }, { msg: "Hello", mainUser: false }, { msg: "How are you?", mainUser: true }, { msg: "How are you?", mainUser: false }] }
    const isLoading = true

    const [completeUserDisplay, setCompleteUserDisplay] = useState<boolean>(false)
    return (
        <div className="mt-14 h-full flex flex-col items-center">
            <div className="rounded-md border border-gray-300 h-[90%] p-4 relative w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
                {/* User display */}
                {!completeUserDisplay ? (
                    <div className="z-10 w-10 h-10 border p-2 bg-gray-100 rounded-full flex items-center justify-center mb-4 absolute -top-4 -left-4 hover:border-blue-500 hover:bg-blue-100 transition-all cursor-pointer" onClick={() => setCompleteUserDisplay(true)}>
                        <span className="text-lg font-semibold">{chatMessages.userName.charAt(0).toUpperCase()}</span>
                    </div>
                ) : (
                    <div className="user-display z-10 border p-2 bg-gray-100 rounded-md flex items-center justify-between mb-4 cursor-pointer" onClick={() => setCompleteUserDisplay(false)}>
                        <span className="text-lg font-semibold">{chatMessages.userName}</span>
                        <span className="text-sm font-normal text-gray-600">{chatMessages.phoneNumber}</span>
                    </div>
                ) || <Skeleton circle width={40} height={40} />}

                <div className="chat-display overflow-y-auto mt-2 my-auto">
                    <div className="flex flex-col space-y-4">
                        {chatMessages.message.map((msg, id) => (
                            <div key={id} className={`text-gray-900  p-1.5 w-auto text-wrap rounded-md antialiased ${msg.mainUser ? "self-end" : "self-start"} border`} style={{ width: `${msg.msg.length % 100}rem` }}>
                                {msg.msg ? (
                                    <span>{msg.msg}</span>
                                ) : (
                                    <span>
                                        <Skeleton />
                                    </span>
                                )}
                            </div>

                        ))}
                    </div>
                </div>

                {/* Input and action buttons */}
                <div className="flex items-center space-x-2 absolute bottom-0 left-0 right-0 p-2">
                    {
                        <div className="border p-2 rounded-md border-gray-300 flex justify-between">
                            <input
                                type="text"
                                name="ChatInput"
                                id="chatInput"
                                placeholder="Type a message..."
                                className="flex-1 focus:outline-none rounded-md antialiased"
                            />
                            <div className="flex space-x-1">
                                <Link1Icon className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700 transform hover:scale-105 transition-transform" />
                                <ImageIcon className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700 transform hover:scale-105 transition-transform" />
                            </div>
                        </div> || <Skeleton width={200} height={40} />}

                    <div>
                        {<PaperPlaneIcon className="w-6 h-6 hover:bg-blue-200 p-1 rounded-md text-blue-500 cursor-pointer hover:text-blue-700 transform hover:scale-105 transition-transform" /> || <Skeleton circle width={40} height={40} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
