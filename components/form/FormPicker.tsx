"use client";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export default function FormPicker({ id, errors }: FormPickerProps) {
  const { pending } = useFormStatus();
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const unsplashImages = result.response as Array<Record<string, any>>;
          setImages(unsplashImages);
        } else {
          console.error("Failed to get new images!");
        }
      } catch (error) {
        console.log(error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 mb-2 gap-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto",
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <Image
              src={image.urls.thumb}
              alt="unsplash image"
              className="object-cover rounded-sm"
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
