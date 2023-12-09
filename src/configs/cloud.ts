import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

const cloud = async (value: string[] | any): Promise<string[]> => {
  return await cloudinary.uploader
    .upload(value, { overwrite: true, invalidate: true, resource_type: "auto" })
    .then((result: UploadApiResponse) => {
        return result;
    })
    .catch((error: any) => error);
};

export default cloud;