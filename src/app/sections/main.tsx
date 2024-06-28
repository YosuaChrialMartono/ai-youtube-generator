"use client";
import { useState } from "react";
import { GetYoutubeVideos } from "@/api/GetYoutubeVideos";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import VideoCard, { VideoCardProps } from "@/components/youtube-video-card";

const MainPage = () => {
  const [query, setQuery] = useState<string>("");
  const [videos, setVideos] = useState<VideoCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getYoutubeVideos = async () => {
    setLoading(true);
    try {
      const response = await GetYoutubeVideos({ amount: 5, query });
      console.log(response.message.content);
      const videos = JSON.parse(response.message.content || "").videos;
      setVideos(videos);
      toast("Youtube videos found");
    } catch (error: any) {
      setError(error.message);
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <div>
        <span className="text-6xl font-extrabold text-center text-white">
          ai youtube link generator.
        </span>
      </div>
      <div className="w-full flex gap-3">
        <Input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search"
          className="w-full bg-black text-white border-[#27272a]"
        />
        <Button
          className="w-32 font-bold"
          onClick={() => {
            toast("Searching for youtube videos");
            getYoutubeVideos();
          }}
        >
          search
        </Button>
      </div>
      <div className="w-full flex overflow-auto gap-3 justify-center">
        {loading
          ? "Loading..."
          : error
          ? error
          : videos.map((video, index) => (
              <VideoCard key={`${index}-video-card`} props={video} />
            ))}
      </div>
    </>
  );
};

export default MainPage;
