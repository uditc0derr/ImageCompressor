import UploadForm from "../components/UploadForm";
import { useState } from "react";
import ImagePreview from "../components/ImagePreview";

const Home = () => {
  const [compressedImage, setCompressedImage] = useState(null);

  return (
    <div className="h-[80%]bg-gray-100 flex flex-col md:flex-row items-center justify-center p-18 gap-6 md:gap-12">
      <div className="w-full md:w-1/2 flex justify-center">
        <UploadForm setCompressedImage={setCompressedImage} />
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        {compressedImage ? (
          <ImagePreview image={compressedImage} />
        ) : (
          <div className="w-full max-w-md"></div> 
        )}
      </div>
    </div>
  );
};

export default Home;
