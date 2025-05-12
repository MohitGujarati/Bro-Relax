'use client';

import type { FC } from 'react';
import { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud } from 'lucide-react'; // Icon for submit button

interface MemeSubmissionFormProps {
  onSuccess?: () => void;
}

/**
 * Provides a form for users to (simulate) uploading their own meme images.
 * Styled for a minimal, modern UI.
 */
const MemeSubmissionForm: FC<MemeSubmissionFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid File Type',
          description: 'Please select an image (JPEG, PNG, GIF, WEBP).',
          variant: 'destructive',
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }
      setSelectedFile(file);
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      toast({
        title: 'No Image Selected',
        description: 'Please choose an image file to share.',
        variant: 'destructive',
      });
      return;
    }

    console.log('Simulating submission for:', selectedFile.name);
    toast({
      title: 'Meme Shared!',
      description: `"${selectedFile.name}" is spreading joy (simulated).`,
    });

    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onSuccess?.();
  };

  useEffect(() => {
    let currentPreviewUrl = previewUrl;
    return () => {
      if (currentPreviewUrl) URL.revokeObjectURL(currentPreviewUrl);
    };
  }, [previewUrl]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-1"> {/* Added slight padding for breathing room */}
      <div>
        <label htmlFor="memeFile" className="sr-only">Choose meme file</label>
        <Input
          id="memeFile"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="w-full text-sm bg-input border-border/70 text-foreground focus-visible:ring-primary/50 
                     file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium 
                     file:bg-secondary file:text-secondary-foreground hover:file:bg-accent/80 cursor-pointer rounded-lg" // Modernized file input
          aria-describedby="file-constraints"
        />
        <p id="file-constraints" className="text-xs text-muted-foreground mt-2 px-1">Supports JPG, PNG, GIF, WEBP. Max 5MB.</p> {/* Added max size example */}
      </div>

      {previewUrl && (
        <div className="mt-4 border border-border/30 rounded-lg p-2 bg-black/10 flex justify-center items-center max-h-60"> {/* Max height for preview */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Meme preview"
            className="max-w-full max-h-56 h-auto rounded-md object-contain" // Ensure preview is contained and looks good
          />
        </div>
      )}

      <div className="flex justify-end pt-2">
        <Button 
          type="submit" 
          size="sm" 
          className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-md text-sm" // Consistent button styling
          disabled={!selectedFile}
        >
          <UploadCloud className="h-4 w-4 mr-2" /> Submit Meme
        </Button>
      </div>
    </form>
  );
};

export default MemeSubmissionForm;
