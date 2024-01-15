// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";

// interface imageupload {
//   val?: string;
//   onChange: (value: string) => void;
// }

// const ImageUpload: React.FC<imageupload> = (val, onChange) => {

//     const [mounted, isMounted] = useState(false)
//     useEffect(() => {
//         isMounted(true)
//     })



//   const [disabled, setDisabled] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");
//   const [cloudinaryUrl, setCloudinaryUrl] = useState("");
//   const handleUpload = async () => {

//     try {
//       setDisabled(true);
//       const response = await fetch("http://localhost:3000/api", {
//         method: "POST",
//         body: JSON.stringify({
//           imageUrl: imageUrl,
//         }),
//         headers: {
//           "Content-type": "application/json",
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => setCloudinaryUrl(data.cloudinaryUrl));
//       // Set the Cloudinary URL in the component state
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     } finally {
//       setDisabled(false);
//     }
//     onChange(cloudinaryUrl);
//     console.log(val, onChange)

//   };




//   if(!mounted){
//     return null;
// }
//   return (
//     <div>
//       <Label htmlFor="question">Question</Label>
//       <Input
//         placeholder="Enter Image Url"
//         onChange={(e) => setImageUrl(e.target.value)}
//       />
//       <Button disabled={disabled} onClick={handleUpload}>
//         Upload Image
//       </Button>
//     </div>
//   );
// };

// export default ImageUpload;

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import toast from "react-hot-toast";

interface ImageUploadProps {
  val?: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ val, onChange }) => {
  const [mounted, isMounted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");

  useEffect(() => {
    isMounted(true);
  }, []);

  const handleUpload = async () => {
    try {
      setDisabled(true);
      const response = await fetch("http://localhost:3000/api", {
        method: "POST",
        body: JSON.stringify({
          imageUrl: imageUrl,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      setCloudinaryUrl(data.cloudinaryUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image")
    } finally {
      setDisabled(false);
      toast.success("Image uploaded successfully");
    }

    

  };

  useEffect(() => {
    if (mounted) {
      onChange(cloudinaryUrl);
    }
  }, [cloudinaryUrl, mounted, onChange]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="">
      <Input
        placeholder="Enter Image Url"
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <Button className="mt-2" disabled={disabled} onClick={handleUpload}>
        Upload Image
      </Button>
    </div>
  );
};

export default ImageUpload;
