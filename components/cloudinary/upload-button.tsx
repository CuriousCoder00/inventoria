"use client";
import { CldUploadButton, CldImage } from 'next-cloudinary';
import { useState } from 'react';

function UploadButton() {
  const [imageUrl, setImageUrl] = useState('');

  const handleUploadSuccess = (result: any) => {
      setImageUrl(result.info.secure_url);
      console.log(imageUrl)
  };

  return (
    <div>
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleUploadSuccess}
      />
      {imageUrl && (
        <CldImage
          src={imageUrl}
          width={200}
          height={200}
          alt="Uploaded image"
        />
      )}
    </div>
  );
}
export default UploadButton;