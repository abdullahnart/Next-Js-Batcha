"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GradientShapes from "@/components/common/GradientShapes";

interface VideoSection {
  video?: string;
}

interface PageData {
  video_section?: VideoSection;
  // Add other sections if needed
}

const VideoSection = () => {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://batchatv.clickysoft.us/wp-json/wp/v1/page"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: PageData = await response.json();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-[#0b151f] min-[320px]:max-[768px]:bg-black py-[50px]">
      <div className="min-[320px]:max-[768px]:hidden block">
        <GradientShapes />
      </div>
      <Container>
        <Dialog>
          <div className="relative z-20">
            {/* Trigger opens the modal */}
            <DialogTrigger asChild>
              <div className="flex absolute left-0 w-full h-full justify-center items-center z-10">
                <button
                  type="button"
                  className="outline-none border-none cursor-pointer"
                >
                  <Image
                    src="/assets/images/play-icon.svg"
                    alt="Play Video"
                    className="min-[320px]:max-[768]:w-[36px] min-[320px]:max-[768]:h-[46px]"
                    width={70}
                    height={90}
                  />
                </button>
              </div>
            </DialogTrigger>

            <Image
              src="/assets/images/video-frame.png"
              alt="Video Background"
              width={1150}
              height={650}
              className="w-full"
            />
          </div>

          {/* Dialog content with video */}
          <DialogContent className="border-none max-w-[90vw] sm:max-w-[800px] bg-black p-0 overflow-hidden rounded-xl">
            <DialogTitle className="sr-only">Video Playback</DialogTitle>

            {data?.video_section?.video && (
              <video controls autoPlay className="w-full h-auto">
                <source src={data.video_section.video} type="video/mp4" />
              </video>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </section>
  );
};

export default VideoSection;
