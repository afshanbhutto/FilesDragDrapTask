/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import {
    getWhatsAppUrl,
    getFacebookUrl,
    getTwitterUrl,
} from "@phntms/react-share";
import { FacebookProvider, ShareButton } from 'react-facebook';
import { IoChatbubblesOutline } from "react-icons/io5";
import { BsQrCode } from "react-icons/bs";
import { FaWhatsapp, FaTwitter } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import { BiSolidLockAlt } from "react-icons/bi";
import { GrFacebookOption } from "react-icons/gr";
import QRCode from "qrcode";
import { saveAs } from "file-saver";

const SelectedFilesList = ({ selectedFiles }) => {
    const [showQrCode, setShowQrCode] = useState(false);
    const [qrCodeValue, setQrCodeValue] = useState("");
    const [showFacebookShare, setShowFacebookShare] = useState(false);
    const [showTwitter, setShowTwitter] = useState(false);
    const [showWhatsapp, setShowWhatsapp] = useState(false);
    const [qrCodeImageSrc, setQrCodeImageSrc] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (showQrCode) {
            setShowFacebookShare(false);
            setShowTwitter(false);
            setShowWhatsapp(false);
        }
    }, [showQrCode]);

    const generateQRCode = async (text, size = 100) => {
        try {
            const canvas = document.createElement("canvas");
            await QRCode.toCanvas(canvas, text, { width: size, height: size });

            const qrCodeImage = canvas.toDataURL();
            setQrCodeImageSrc(qrCodeImage);
        } catch (error) {
            console.error("Error generating QR code:", error);
        }
    };

    const handleQrCodeClick = () => {
        const qrCodeValue = "https://example.com/qr-code";
        setQrCodeValue(qrCodeValue); // Set qrCodeValue state
        generateQRCode(qrCodeValue, 100); // Adjust the size to 50x50

        setShowQrCode(true);
        setShowFacebookShare(false);
        setShowTwitter(false);
        setShowWhatsapp(false);
        setShowMessage(false);
    };

    const handleDownloadClick = async () => {
        try {
            const canvas = document.createElement("canvas");
            await QRCode.toCanvas(canvas, qrCodeValue, { width: 50, height: 50 });

            canvas.toBlob((blob) => {
                saveAs(blob, "qr-code.png");
            });
        } catch (error) {
            console.error("Error downloading QR code:", error);
        }
    };

    const handleCopyLinkClick = () => {
        // Generate link or handle copy link logic here
        const link = "https://example.com/qr-code";
        navigator.clipboard.writeText(link);
        alert("Link copied to clipboard!");
    };
    const handleFacebookClick = () => {
        setShowQrCode(false); // Hide QR code
        setShowFacebookShare(true);
        setShowMessage(false);
        setShowTwitter(false); // Hide Twitter content
        setShowWhatsapp(false); // Hide WhatsApp content
    };

    const handleTwitterClick = () => {
        setShowQrCode(false); // Hide QR code
        setShowFacebookShare(false); // Hide Facebook content
        setShowTwitter(true);
        setShowMessage(false);
        setShowWhatsapp(false); // Hide WhatsApp content
    };

    const handleWhatsappClick = () => {
        setShowQrCode(false); // Hide QR code
        setShowFacebookShare(false); // Hide Facebook content
        setShowTwitter(false); // Hide Twitter content
        setShowWhatsapp(true);
        setShowMessage(false);
    };

    const handleMessageClick = () => {
        setShowQrCode(false); // Hide QR code
        setShowFacebookShare(false); // Hide Facebook content
        setShowTwitter(false); // Hide Twitter content
        setShowWhatsapp(false);
        setShowMessage(true);
    };

    const url = "https://example.com";
    const title = "Check out this!";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const handleClickForMessage = () => {
        const messageBody = `Check out this! ${url}`;

        const smsUri = `sms:?body=${encodeURIComponent(messageBody)}`;
        window.location.href = smsUri;
    };

    const handleClickForTwitter = () => {
        const shareableUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
        )}&text=${encodeURIComponent(title)}`;
        if (isMobile) {
            window.location.href = shareableUrl;
        } else {
            window.open(shareableUrl, "_blank");
        }
    };
    // Reset visibility when selected files change
    useEffect(() => {
        setShowFacebookShare(false);
        setShowTwitter(false);
        setShowWhatsapp(false);
        setShowQrCode(false);
    }, [selectedFiles]);
    return (
        <div className=" flex flex-col gap-2 md:flex-row md:gap-0">
            <div className="container mx-auto w-full  md:w-[700px] bg-black text-white grow rounded-md min-h-[300px] min-w-[300px] flex flex-col md:flex-row  p-2 ">
                {/* MainSection- div1 */}
                <div id="link-info" className=" flex flex-col md:basis-1/3 mt-2 md:mt-0  ">
                    <div>
                        <h2 className="text-xl font-bold">Title</h2>
                        <ul>
                            {selectedFiles.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="pt-20">Add more</div>
                </div>

                {/* MainSection- div2 */}
                <div className="flex flex-col md:basis-1/3 mt-2 md:mt-0">
                    <button
                        className="flex gap-4 items-center px-2 py-2"
                        onClick={handleQrCodeClick}
                    >
                        <div id="icon">
                            <BsQrCode size={32} round />
                        </div>
                        <div id="platform-name" className="uppercase">
                            GET a qr code
                        </div>
                    </button>

                    <div className=" h-[2px] bg-yellow-400 "></div>

                    <button
                        className="flex gap-4 items-center px-2 py-2 "
                        onClick={handleWhatsappClick}
                    >
                        <div id="icon">
                            <FaWhatsapp
                                size={30}
                                round
                                className="text-white bg-[#25D366] p-1 rounded-full"
                            />
                        </div>
                        <div id="platform-name" className="uppercase">
                            WHastsapp
                        </div>
                    </button>

                    <div className=" h-[2px] bg-yellow-400 "></div>

                    <button
                        className="flex gap-4 items-center px-2 py-2 "
                        id="message-btn"
                        onClick={handleMessageClick}
                    >
                        <div id="icon">
                            <IoChatbubblesOutline size={32} round />
                        </div>
                        <div id="platform-name" className="uppercase">
                            Messages
                        </div>
                    </button>

                    <div className=" h-[2px] bg-yellow-400 "></div>

                    <button
                        className="flex gap-4 items-center px-2 py-2 "
                        onClick={handleFacebookClick}
                    >
                        <div id="icon">
                            <GrFacebookOption
                                size={30}
                                round
                                className="text-white bg-[#4267B2] p-1.5 rounded-full"
                            />
                        </div>
                        <div id="platform-name" className="uppercase">
                            Facebook
                        </div>
                    </button>

                    <div className=" h-[2px] bg-yellow-400 "></div>

                    <button
                        className="flex gap-4 items-center px-2 py-2 "
                        onClick={handleTwitterClick}
                    >
                        <div id="icon">
                            <FaTwitter
                                size={30}
                                round
                                className="text-white bg-[#1DA1F2] p-1.5 rounded-full"
                            />
                        </div>
                        <div id="platform-name" className="uppercase">
                            Twitter
                        </div>
                    </button>

                    <div className=" h-[2px] bg-yellow-400 "></div>
                </div>

                {/* MainSection- div3 */}

                <div id="customization" className=" flex flex-col md:basis-1/3 mt-2 md:mt-0 ">
                    <div className="flex  gap-4 items-center">
                        {" "}
                        <AiOutlineLink size={20} className="text-white" />
                        <input
                            type="text"
                            placeholder="CUSTOMIZE LINK"
                            className="bg-transparent border-b-2 w-full mr-2 text-black focus:outline-none"
                        />
                    </div>
                    <div className="flex  gap-4 items-center">
                        {" "}
                        <BiSolidLockAlt size={20} className="text-white" />
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            className="bg-transparent border-b-2 w-full mr-2 text-black focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Section-3 */}
            {showQrCode && (
                <div className="bg-black flex flex-col items-center w-full justify-center rounded-md md:w-[300px] min-h-[300px] text-white ml-2 pt-2 ">
                    <div className="qr-code-container">
                        <img src={qrCodeImageSrc} alt="QR Code" width="100" height="100" />
                    </div>
                    <button onClick={handleDownloadClick}>Download</button>
                    <button onClick={handleCopyLinkClick}>Copy Link</button>
                    <div className="flex  gap-4 items-center">
                        {" "}
                        <BiSolidLockAlt size={20} className="text-white" />
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            className="bg-transparent border-b-2 w-full mr-2 text-black  mb-2 focus:outline-none"
                        />
                    </div>
                </div>
            )}

            {showWhatsapp && (
                <div className="bg-black flex flex-col items-center justify-center rounded-md w-full  md:w-[300px] min-h-[300px] text-white ml-2 pt-2 md:pt-0">
                    <a href={getWhatsAppUrl({ url })}>
                        <button className="flex gap-4 items-center px-2 py-2 bg-black flex-col">
                            <div id="icon">
                                <FaWhatsapp
                                    size={40}
                                    round
                                    className="text-white bg-[#25D366] p-1 rounded-full"
                                />
                            </div>
                        </button>
                    </a>
                </div>
            )}

            {showMessage && (
                <div className="bg-black flex flex-col items-center w-full justify-center rounded-md  md:w-[300px] min-h-[300px] text-white ml-2 pt-2 md:pt-0">
                    <button
                        className="flex gap-4 items-center px-2 py-2 bg-black flex-col"
                        onClick={handleClickForMessage}
                    >
                        <div id="icon">
                            <IoChatbubblesOutline size={40} round />
                        </div>
                    </button>
                </div>
            )}

            {showFacebookShare && (
                <div className="bg-black flex flex-col items-center justify-center rounded-md w-full  md:w-[300px] min-h-[300px] text-white ml-2 pt-2 md:pt-0">
                    {/* <a href={getFacebookUrl({ url })} target="_blank">
                        <button className="flex gap-4 items-center px-2 py-2 bg-black flex-col">
                            <div id="icon">
                                <GrFacebookOption
                                    size={30}
                                    round
                                    className="text-white bg-[#4267B2] p-1.5 rounded-full"
                                />
                            </div>
                            <p>Share on Facebook</p>
                        </button>
                    </a> */}

                    <FacebookProvider appId="1190324285693752">
                        <ShareButton href={url} target="_blank">
                            <GrFacebookOption
                                size={40}
                                round
                                className="text-white bg-[#4267B2] p-1.5 rounded-full"
                            />
                        </ShareButton>
                    </FacebookProvider>
                </div>
            )}

            {showTwitter && (
                <div className="bg-black flex flex-col items-center justify-center rounded-md w-full  md:w-[300px] min-h-[300px] text-white ml-2 pt-2 md:pt-0">

                    <button
                        className="flex gap-4 items-center px-2 py-2 bg-black flex-col"
                        onClick={handleClickForTwitter}
                    >
                        <div id="icon">
                            <FaTwitter
                                size={40}
                                round
                                className="text-white bg-[#1DA1F2] p-1.5 rounded-full"
                            />
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
}

export default SelectedFilesList;
