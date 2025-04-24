"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { motion as motionType } from "framer-motion";
import { ArticleDoc } from "@/types";
import Link from "next/link";
import { cn, isValidDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { MotionImage } from "@/components/ui/motion-image";

export default function FeaturedCard({
  post,
  index,
  motion,
  shouldReduceMotion,
}: {
  post: ArticleDoc;
  index: number;
  motion: typeof motionType;
  shouldReduceMotion: boolean | null;
}) {
  const [validDate, setValidDate] = useState("");
  useEffect(() => {
    const post_date = isValidDate(post.date)
      ? new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";
    if (post_date) {
      setValidDate(post_date);
    }
  }, [post.date]);

  return (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, y: 0 }
          : {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1.0,
                ease: "easeOut",
                delay: 0.3 + index * 0.2,
              },
            }
      }
    >
      <Card
        className={cn(
          "bg-web3-darker relative overflow-hidden bg-border-spin border border-transparent animate-border p-0",
          shouldReduceMotion ? "" : "hover:border-web3-primary/40"
        )}
      >
        <div className="flex flex-col md:flex-row">
          {post.coverImage && (
            <CardHeader className="p-0 gap-0 md:w-1/2">
              <MotionImage
                src={post.coverImage}
                alt={`${post.title} cover`}
                width={800}
                height={600}
                className="w-full h-64 md:h-full object-cover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  shouldReduceMotion
                    ? { opacity: 1, scale: 1 }
                    : {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 1.0,
                          ease: "easeOut",
                          delay: 0.2 + index * 0.2,
                        },
                      }
                }
              />
            </CardHeader>
          )}
          <div className="md:w-1/2 flex flex-col">
            <CardContent className="flex flex-col gap-2 p-6">
              <CardTitle className="text-3xl font-normal text-web3-light hover:text-web3-primary">
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                By {post.author} on {validDate ? validDate : ""}
              </p>
              {post.excerpt && <p className="text-gray-300">{post.excerpt}</p>}
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Link
                href={`/blog/${post.id}`}
                className="flex items-center text-web3-light font-semibold hover:text-web3-primary/80 transition-colors underline decoration-web3-primary/50"
              >
                Read More
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </CardFooter>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
