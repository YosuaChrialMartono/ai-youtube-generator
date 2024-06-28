import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export interface VideoCardProps {
  title: string;
  url: string;
}

const VideoCard = ({ props }: { props: VideoCardProps }) => {
  return (
    <Card className="w-[900px] bg-black border-2 rounded-lg border-gray-800 ">
      <CardHeader>
        <h1 className="text-2xl font-extrabold text-white">{props.title}</h1>
      </CardHeader>
      <CardContent>
        <iframe
          src={props.url.replace("watch?v=", "embed/")}
          className="w-full rounded-lg h-72"
          allowFullScreen
        />
      </CardContent>
      <CardFooter>
        <a
          href={props.url}
          target="_blank"
          rel="noreferrer"
          className="bg-black border-2 border-gray-800 rounded-lg text-white p-2 w-full text-center font-bold"
        >
          Watch on Youtube
        </a>
      </CardFooter>
    </Card>
  );
};

export default VideoCard;
