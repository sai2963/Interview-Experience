"use client";
import { PrismaClient } from "@prisma/client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();
  const Prisma = new PrismaClient;
  const prisma=Prisma;
  
  useEffect(() => {
    fetchSubmissions();
  }, [page]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`/api/submissions?page=${page}&limit=10`);
      const data = await response.json();
      setSubmissions(data.submissions);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch submissions",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Interview Experiences</h1>
      <div className="grid gap-6">
        {submissions.map((submission, index) => (
          <motion.div
            key={submission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-2">{submission.company}</h2>
              <p className="text-muted-foreground mb-4">
                Shared by {submission.user.name} from {submission.country}
              </p>
              <div className="space-y-2">
                {submission.questions.map((question, i) => (
                  <p key={i} className="text-sm">
                    • {question}
                  </p>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <Button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}