import { useState } from "react";
import axios from "axios";

const UploadForm = ({ setCompressedImage }) => {
  const [image, setImage] = useState(null);
  const [quality, setQuality] = useState(25);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const uploadResponse = await axios.post(
        "http://localhost:5000/api/images/upload",
        formData
      );
      if (!uploadResponse.data.imageName) {
        throw new Error("Image upload failed: No imageName returned.");
      }

      const imageName = uploadResponse.data.imageName;
      console.log("Uploaded Image:", imageName);

      const compressResponse = await axios.get(
        `http://localhost:5000/api/images/compress/${imageName}?quality=${quality}`,
        { responseType: "blob" }
      );

      setCompressedImage(URL.createObjectURL(compressResponse.data));
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading or compressing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
        Upload & Compress Image
      </h2>

      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-gray-100 transition w-full">
        <input type="file" onChange={handleImageChange} className="hidden" />
        <span className="text-gray-500 text-sm">
          Click to select or drag an image
        </span>
      </label>

      {preview && (
        <div className="mt-4 flex justify-center">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-md border"
          />
        </div>
      )}

      <label className="block text-gray-700 mt-4">
        Compression Quality (%):
      </label>
      <input
        type="number"
        min="1"
        max="100"
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
        className="w-full border p-2 mt-2 rounded-md"
      />

      <button
        onClick={handleUpload}
        className={`w-full mt-4 py-2 rounded-lg text-white font-medium transition cursor-pointer ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-[#00b4db] to-[#0083b0] hover:opacity-90 shadow-md"
        }`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload & Compress"}
      </button>
    </div>
  );
};

export default UploadForm;
