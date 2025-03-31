const ImagePreview = ({ image }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center border w-full max-w-md">
      <h3 className="text-xl font-semibold text-gray-700">Compressed Image</h3>

      <img
        src={image}
        alt="Compressed Preview"
        className="mt-4 w-[300px] h-[300px] object-contain rounded-lg shadow-md border"
      />

      <a
        href={image}
        download="compressed-image.jpg"
        className="mt-4 bg-gradient-to-r from-[#00b4db] to-[#0083b0] text-white px-6 py-2 rounded-lg transition duration-300 hover:opacity-90 shadow-md"
      >
        ⬇ Download Image
      </a>
    </div>
  );
};

export default ImagePreview;
