
'use client'; // Needs state for file, preview, and uses client-side APIs like File API and URL.createObjectURL.

import type { FC } from 'react';
import { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, ImagePlus } from 'lucide-react';

/**
 * Provides a form for users to (simulate) uploading their own meme images.
 * Styled as a prominent card in the feed layout.
 * NOTE: The actual upload functionality is not implemented, this is frontend only.
 */
const MemeSubmissionForm: FC = () => {
  const { toast } = useToast(); // Hook for showing notifications
  // State to hold the selected file object
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // State to hold the URL for the image preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // Ref to access the file input element directly (e.g., for resetting)
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handles changes to the file input element
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Safely access the first selected file

    if (file) {
      // Basic type check (optional, browser usually handles 'accept')
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid File Type',
          description: 'Please select an image file (e.g., JPG, PNG, GIF).',
          variant: 'destructive',
        });
        // Reset if invalid file type selected
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setSelectedFile(null);
        setPreviewUrl(null); // Ensure no old preview lingers
        return;
      }

      setSelectedFile(file);
      // Create a temporary URL for previewing the selected image
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl); // Set new preview URL

    } else {
      // If no file is selected (e.g., user cancelled), clear state
      setSelectedFile(null);
      setPreviewUrl(null); // Clear preview URL
    }
  };

  // Handles the form submission event
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    if (!selectedFile) {
      toast({
        title: 'No Meme Selected',
        description: 'Please select an image file to submit.',
        variant: 'destructive',
      });
      return; // Stop submission if no file
    }

    // --- Simulation ---
    console.log('Simulating submission for:', selectedFile.name);
    toast({
      title: 'Meme Submitted!',
      description: `"${selectedFile.name}" is ready to spread joy (simulated).`,
    });
    // --- End Simulation ---

    // Reset the form state after successful (simulated) submission
    setSelectedFile(null);
    setPreviewUrl(null); // Clear preview URL on submit
    // Reset the file input visually
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Cleanup Object URL effect
  useEffect(() => {
    // This function will be called when the component unmounts or before the effect runs again
    // if previewUrl changes and had a previous value.
    let currentPreviewUrl = previewUrl;
    return () => {
      if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
      }
    };
  }, [previewUrl]); // Depend only on previewUrl


  return (
    // Use Card component for structure, removed dashed border
    <Card className="shadow-md bg-card border border-border">
        <CardHeader>
           {/* Icon centered above title */}
           <div className="flex justify-center items-center mb-3">
            <ImagePlus className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-xl font-semibold tracking-tight text-center">
            Share a Meme
          </CardTitle>
          <CardDescription className="text-center text-sm text-muted-foreground pt-1">
            Upload an image to share with the community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* File Input */}
            <div>
              <label htmlFor="memeFile" className="sr-only">Choose meme file</label>
              <Input
                id="memeFile"
                type="file"
                accept="image/jpeg, image/png, image/gif, image/webp" // Be more specific
                onChange={handleFileChange}
                ref={fileInputRef} // Attach ref
                className="w-full text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer bg-input border-border text-foreground focus-visible:ring-primary"
                aria-describedby="file-constraints"
              />
               <p id="file-constraints" className="text-xs text-muted-foreground mt-1.5 px-1">Supports JPG, PNG, GIF, WEBP.</p>
            </div>

            {/* Image Preview */}
            {previewUrl && (
              <div className="mt-4 border border-border rounded-lg p-3 bg-muted/20 flex justify-center">
                {/* Using standard img tag for preview from Object URL */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={previewUrl}
                    alt="Meme preview"
                    className="max-w-full max-h-48 h-auto rounded-md object-contain shadow-sm" // Adjusted preview size
                 />
              </div>
            )}

            {/* Submit Button - Centered */}
             <div className="flex justify-end pt-2">
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90" disabled={!selectedFile}>
                  <UploadCloud className="h-4 w-4 mr-2" /> Submit
                </Button>
              </div>
          </form>
        </CardContent>
      </Card>
  );
};

export default MemeSubmissionForm;
