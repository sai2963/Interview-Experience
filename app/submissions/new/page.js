"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function NewSubmission() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    company: "",
    questions: [""],
  });
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create submission");
      }

      toast({
        title: "Success",
        description: "Experience shared successfully",
      });
      router.push("/submissions");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, ""],
    }));
  };

  const updateQuestion = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = value;
    setFormData(prev => ({
      ...prev,
      questions: newQuestions,
    }));
  };

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Share Your Interview Experience</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-4">
          <Label>Interview Questions</Label>
          {formData.questions.map((question, index) => (
            <Input
              key={index}
              value={question}
              onChange={(e) => updateQuestion(index, e.target.value)}
              placeholder={`Question ${index + 1}`}
              required
            />
          ))}
          <Button type="button" variant="outline" onClick={addQuestion}>
            Add Another Question
          </Button>
        </div>
        <Button type="submit" className="w-full">
          Share Experience
        </Button>
      </form>
    </div>
  );
}