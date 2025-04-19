'use client';

import { useCallback } from "react";
import { CldUploadWidget, cloudinaryLoader, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

declare global {
    interface Window {
      cloudinary: typeof cloudinaryLoader; 
    }
  }
  
  export {};
  

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
}) => {
  const handleUpload = useCallback((result: CloudinaryUploadWidgetResults) => {
    if (
      result.info &&
      typeof result.info === 'object' &&
      'secure_url' in result.info
    ) {
      onChange((result.info as { secure_url: string }).secure_url);
    }
  }, [onChange]);

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="best-hyd"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => (
        <div
          onClick={() => open?.()}
          className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
        >
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">
            Click to upload
          </div>

          {value && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                alt="upload"
                fill
                style={{ objectFit: "cover" }}
                src={value}
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
