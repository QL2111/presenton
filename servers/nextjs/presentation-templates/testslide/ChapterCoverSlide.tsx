import * as z from "zod";
import { ImageSchema } from "@/presentation-templates/defaultSchemes";

export const Schema = z.object({
  title: z.string().default("Analyse des Besoins"),
  image: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    __image_prompt__: "Team analyzing documents in a meeting"
  }).meta({
    description: "Cover image for the section"
  }),
});

type SchemaType = z.infer<typeof Schema>;

const SlideComponent = ({ data }: { data: SchemaType }) => {
  return (
    <div className="h-full w-full relative overflow-hidden font-sans">
        {/* Full Background Image */}
        <div className="absolute inset-0 z-0">
             <img 
                src={data.image.__image_url__} 
                alt={data.image.__image_prompt__} 
                className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4B0082]/90 via-[#4B0082]/70 to-transparent mix-blend-multiply"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-20 max-w-4xl">
            <div className="w-24 h-2 bg-[#FFA500] mb-8"></div>
            <h1 className="text-7xl font-bold text-white leading-tight drop-shadow-lg">
                {data.title}
            </h1>
        </div>
    </div>
  );
};
export default SlideComponent;
