import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralError } from "../ui";
import {
  QuizFormContainer,
  FormHeader,
  TextField,
  ImageUpload,
  ResultsList,
  FormActions,
} from "../ui/QuizFormComponents";
import { useCreateQuiz, useUploadQuizImage } from "../../hooks";

export const CreateQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [results, setResults] = useState<string[]>(["", ""]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createQuiz } = useCreateQuiz();
  const { uploadQuizImage } = useUploadQuizImage();

  const handleAddResult = () => {
    setResults([...results, ""]);
  };

  const handleRemoveResult = (index: number) => {
    if (results.length <= 2) {
      setError("A quiz must have at least 2 possible results");
      return;
    }

    const newResults = [...results];
    newResults.splice(index, 1);
    setResults(newResults);
    setError(null);
  };

  const handleResultChange = (index: number, value: string) => {
    const newResults = [...results];
    newResults[index] = value;
    setResults(newResults);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should not exceed 5MB");
      return;
    }

    if (!file.type.match("image.*")) {
      setError("Please select an image file");
      return;
    }

    setSelectedImage(file);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a quiz title");
      return;
    }

    const emptyResults = results.some((result) => !result.trim());
    if (emptyResults) {
      setError("Please fill all result fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrl;

      if (selectedImage) {
        const imageResponse = await uploadQuizImage(selectedImage);
        imageUrl = imageResponse.image_url;
      }

      await createQuiz({
        title: title,
        results: results,
        image_url: imageUrl,
      });

      navigate("/quizzes");
    } catch (err: any) {
      setError(err.message || "Failed to create quiz");
      setIsSubmitting(false);
    }
  };

  return (
    <QuizFormContainer>
      <FormHeader
        title="Create New Quiz"
        description="Add a title, possible results, and an optional image"
      />

      {error && (
        <div className="px-6 py-4">
          <GeneralError message={error} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6">
        <TextField
          id="title"
          label="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter quiz title"
          disabled={isSubmitting}
        />

        <ImageUpload
          imagePreview={imagePreview}
          selectedImage={selectedImage}
          onImageChange={handleImageChange}
          disabled={isSubmitting}
        />

        <ResultsList
          results={results}
          onResultChange={handleResultChange}
          onAddResult={handleAddResult}
          onRemoveResult={handleRemoveResult}
          disabled={isSubmitting}
        />

        <FormActions
          onCancel={() => navigate("/quizzes")}
          isSubmitting={isSubmitting}
        />
      </form>
    </QuizFormContainer>
  );
};
