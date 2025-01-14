"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Share2, Search, Users, Shield } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Share Your Interview Experience
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Help others prepare by sharing your interview questions and experiences from top companies
          </p>
          
          <div className="flex gap-4 justify-center">
            {session ? (
              <>
                <Link href="/submissions/new">
                  <Button size="lg">
                    Share Experience <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/submissions">
                  <Button size="lg" variant="outline">
                    Browse Experiences <BookOpen className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button size="lg">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/submissions">
                  <Button size="lg" variant="outline">
                    Browse Experiences <BookOpen className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <Share2 className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Share Your Experience</h3>
            <p className="text-muted-foreground">
              Help others by sharing your interview questions and experiences from various companies
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <Search className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Browse Interviews</h3>
            <p className="text-muted-foreground">
              Explore real interview experiences from different companies and prepare better
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <Users className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
            <p className="text-muted-foreground">
              Join a community of professionals helping each other succeed in interviews
            </p>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-card p-8 rounded-lg shadow-lg text-center"
        >
          <Shield className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Experience?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your experience could help someone ace their next interview. Join our community today.
          </p>
          {!session && (
            <Link href="/register">
              <Button size="lg">
                Create Account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}