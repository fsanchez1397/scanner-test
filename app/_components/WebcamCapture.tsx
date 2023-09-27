'use client'
import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";
const Tesseract = require('tesseract.js');
const WebcamCapture = () => {
    const webcamRef = useRef<Webcam | null>(null);
    const [imgSrc, setImgSrc] = useState<string | null | undefined>(null);
  
    const capture = useCallback(async () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        setImgSrc(imageSrc);
    
        // Perform OCR using Tesseract.js
        try {
          const { data } = await Tesseract.recognize(
            imageSrc,
            'eng', // Language code (e.g., 'eng' for English)
            {
              logger: (info: any) => console.log(info), // Optional: Logging
            }
          );
          console.log('Recognized Text:', data.text);
        } catch (error) {
          console.error('Error performing OCR:', error);
        }
      }, [webcamRef, setImgSrc]);
    
    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
        <button onClick={capture}>Capture photo</button>
        {imgSrc && (
          <img
            src={imgSrc}
          />
        )}
      </>
    );
  };
export default WebcamCapture