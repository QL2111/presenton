import * as z from "zod";
import { ImageSchema } from "@/presentation-templates/defaultSchemes";

export const Schema = z.object({
  title: z.string().default("Contexte du Projet"),
  points: z.array(z.string()).default([
      "Demande croissante du marché pour des solutions IA respectueuses de la vie privée.",
      "Les systèmes hérités ralentissent l'efficacité opérationnelle.",
      "Besoin de capacités hors ligne dans les zones isolées."
  ]),
  image: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg",
    __image_prompt__: "Programmers working in a modern office"
  })
});

type SchemaType = z.infer<typeof Schema>;

const SlideComponent = ({ data }: { data: SchemaType }) => {
  return (
    <div className="h-full w-full flex bg-white font-sans">
        {/* Left Content */}
        <div className="w-1/2 p-16 flex flex-col justify-center relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#4B0082] to-[#8000FF]"></div>
            
            <h2 className="text-4xl font-bold text-[#4B0082] mb-12 flex items-center">
                <span className="w-8 h-8 rounded-full bg-[#FFA500] mr-4"></span>
                {data.title}
            </h2>

            <ul className="space-y-6">
                {data.points.map((point, i) => (
                    <li key={i} className="flex items-start text-lg text-slate-700">
                        <span className="text-[#8000FF] mr-3 mt-1">➤</span>
                        {point}
                    </li>
                ))}
            </ul>
        </div>

        {/* Right Image */}
        <div className="w-1/2 p-8 h-full">
            <div className="h-full w-full rounded-3xl overflow-hidden relative shadow-2xl">
                 <img 
                    src={data.image.__image_url__} 
                    alt={data.image.__image_prompt__} 
                    className="w-full h-full object-cover"
                />
                {/* Overlay Accent */}
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#4B0082]/80 to-transparent"></div>
            </div>
        </div>
    </div>
  );
};
export default SlideComponent;
