import { useCallback } from "react";
import {
  uploadQuizImage as uploadQuizImageApi,
  UploadQuizImageResponse,
} from "../api/POST/uploadQuizImage.ts";
import { useApiClient } from "./useApiClient";

export const useUploadQuizImage = () => {
  const { fetch } = useApiClient();

  const uploadQuizImage = useCallback(
    async (file: File): Promise<UploadQuizImageResponse> => {
      return uploadQuizImageApi(file, fetch);
    },
    [fetch],
  );

  return { uploadQuizImage };
};
