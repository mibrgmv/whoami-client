import { Endpoints } from "../endpoints";

export interface UploadQuizImageResponse {
  image_url: string;
}

export const uploadQuizImage = async (
  file: File,
  fetch: (url: string, options: RequestInit) => Promise<Response>,
): Promise<UploadQuizImageResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(Endpoints.uploadQuizImage, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `Failed to upload image: ${response.status}`,
    );
  }

  return await response.json();
};
