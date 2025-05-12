"use client";

import type { FC } from 'react';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, ImagePlus } from 'lucide-react';

const MemeSubmissionForm: FC = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      toast({
        title: 'No Meme Selected',
        description: 'Please select an image file to submit.',
        variant: 'destructive',
      });
      return;
    }

    // Simulate submission
    toast({
      title: 'Meme Submitted!',
      description: `"${selectedFile.name}" is on its way to spread joy (simulated).`,
    });

    // Reset form
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

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
            <div>
              <label htmlFor="memeFile" className="sr-only">Choose meme file</label>
              <Input
                id="memeFile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
            </div>

            {previewUrl && (
              <div className="mt-4 border border-border rounded-md p-2 bg-muted/50">
                <p className="text-sm font-medium text-muted-foreground mb-2">Preview:</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Meme preview" className="max-w-xs max-h-64 rounded-md mx-auto" />
              </div>
            )}

            <Button type="submit" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
              <UploadCloud className="h-4 w-4 mr-2" /> Submit Meme
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default MemeSubmissionForm;
