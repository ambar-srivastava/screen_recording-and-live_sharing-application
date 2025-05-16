"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { title } from "process";
import { desc } from "drizzle-orm";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE, visibilities } from "@/constants";
import { useFileInput } from "@/lib/hooks/useFileInput";

const page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "public",
  });

  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  const [error, setError] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!video.file || !thumbnail.file) {
        setError("Please upload both video and thumbnail files.");
        return;
      }
      if (!formData.title || !formData.description) {
        setError("Please fill in all fields.");
        return;
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wrapper-md upload-page">
      <h1 className="text-2xl font-medium">Upload your video</h1>
      {error && <div className="error-field">{error}</div>}
      <form
        className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5"
        onSubmit={handleSubmit}
      >
        <FormField
          id="title"
          label="Title"
          placeholder="Enter a clear and concise video title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <FormField
          id="description"
          label="Description"
          placeholder="Describe what this video is about"
          value={formData.description}
          as="textarea"
          onChange={handleInputChange}
        />
        <FileInput
          id="video"
          label="Video"
          accept="video/*"
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onChange={video.handleFileChange}
          onReset={video.resetFile}
          type="video"
        />
        <FileInput
          id="thumbnail"
          label="Thumbnail"
          accept="image/*"
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
          type="image"
        />
        <FormField
          id="visibility"
          label="Visibility"
          value={formData.visibility}
          as="select"
          options={[
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
          ]}
          onChange={handleInputChange}
        />

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default page;
