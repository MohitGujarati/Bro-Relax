
"use client"; // Needs state for file, preview, and uses client-side APIs like File API and URL.createObjectURL.

import type { FC } from 'react';
import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, ImagePlus } from 'lucide-react';

/**
 * Provides a form for users to (simulate) uploading their own meme images.
 * Includes file selection, preview, and submission feedback.
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
      setSelectedFile(file);
      // Create a temporary URL for previewing the selected image
      // Remember to revoke this URL later if needed to free up memory,
      // though for short-lived previews it might not be critical.
      const newPreviewUrl = URL.createObjectURL(file);
      // Clean up previous preview URL if it exists
      if (previewUrl) {
         URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(newPreviewUrl);

    } else {
      // If no file is selected (e.g., user cancelled), clear state
      setSelectedFile(null);
       if (previewUrl) {
         URL.revokeObjectURL(previewUrl);
       }
      setPreviewUrl(null);
    }
  };

  // Handles the form submission event
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    // Check if a file has been selected
    if (!selectedFile) {
      toast({
        title: 'No Meme Selected',
        description: 'Please select an image file to submit.',
        variant: 'destructive',
      });
      return; // Stop submission if no file
    }

    // --- Simulation ---
    // In a real application, you would typically:
    // 1. Upload `selectedFile` to a server or cloud storage.
    // 2. Handle the response (success/error).
    console.log('Simulating submission for:', selectedFile.name);
    toast({
      title: 'Meme Submitted!',
      description: `"${selectedFile.name}" is on its way to spread joy (simulated).`,
    });
    // --- End Simulation ---

    // Reset the form state after successful (simulated) submission
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // Clean up the object URL
    }
    setPreviewUrl(null);
    // Reset the file input visually
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

   // Cleanup object URL on component unmount
   // This prevents memory leaks if the component is unmounted before submission
   // eslint-disable-next-line react-hooks/exhaustive-deps
   // useEffect(() => {
   //   return () => {
   //     if (previewUrl) {
   //       URL.revokeObjectURL(previewUrl);
   //     }
   //   };
   // }, [previewUrl]); // Run cleanup when previewUrl changes or component unmounts - Disabled due to potential complexity for beginners

  return (
    <section aria-labelledby="meme-submission-title" className="mt-16">
      <Card className="shadow-lg border-dashed border-2 border-primary/50">
        <CardHeader className="text-center">
           <div className="flex justify-center items-center mb-2">
            <ImagePlus className="h-10 w-10 text-primary" />
          </div>
          <CardTitle id="meme-submission-title" className="text-2xl font-semibold tracking-tight text-primary">
            Share Your Own Meme!
          </CardTitle>
          <CardDescription className="mt-1 text-md text-muted-foreground">
            Got a funny meme? Upload it here and make someone's day! (Frontend demo only)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Input */}
            <div>
              <label htmlFor="memeFile" className="sr-only">Choose meme file</label>
              <Input
                id="memeFile"
                type="file"
                accept="image/*" // Accept only image files
                onChange={handleFileChange}
                ref={fileInputRef} // Attach ref
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                aria-describedby="file-constraints" // Describe accepted file types
              />
               <p id="file-constraints" className="text-xs text-muted-foreground mt-1">Accepts image files (e.g., JPG, PNG, GIF).</p>
            </div>

            {/* Image Preview */}
            {previewUrl && (
              <div className="mt-4 border border-border rounded-md p-2 bg-muted/50">
                <p className="text-sm font-medium text-muted-foreground mb-2">Preview:</p>
                {/* Using standard img tag for preview from Object URL */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={previewUrl}
                    alt="Meme preview"
                    className="max-w-xs max-h-64 rounded-md mx-auto object-contain" // Use object-contain
                 />
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90" disabled={!selectedFile}> {/* Disable button if no file selected */}
              <UploadCloud className="h-4 w-4 mr-2" /> Submit Meme
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default MemeSubmissionForm;
