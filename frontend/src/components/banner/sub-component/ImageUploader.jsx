import React, { useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // File type validation
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    // File size validation (limit: 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("File size should be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setError(""); // Clear error on successful upload
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setError("");
  };

  return (
    <div className="p-4 border rounded-lg w-64">
  

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4 border border-gray-300 rounded p-2 w-full"
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {image && (
        <div className="relative">
          <img
            src={image}
            alt="Preview"
            className="w-28 h-28 rounded-lg object-cover border"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
