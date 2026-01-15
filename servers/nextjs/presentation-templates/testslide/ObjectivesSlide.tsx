import * as z from "zod";
import { ImageSchema } from "@/presentation-templates/defaultSchemes";

export const Schema = z.object({
  title: z.string().default("Objectifs Clés"),
  points: z.array(z.string()).default([
      "Réduire le temps de traitement de 40% grâce à l'inférence locale.",
      "Garantir 100% de souveraineté des données pour les clients entreprises.",
      "Intégration transparente avec les modèles PPTX existants."
  ]),
  image: ImageSchema.default({
    __image_url__: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg",
    __image_prompt__: "Target board with arrow hitting center"
  })
});

type SchemaType = z.infer<typeof Schema>;

const SlideComponent = ({ data }: { data: SchemaType }) => {
  return (
    <div className="h-full w-full flex bg-[#F7F5FF] font-sans">
        {/* Left Image (Mirrored layout from Context) */}
        <div className="w-1/2 p-8 h-full">
            <div className="h-full w-full rounded-3xl overflow-hidden relative shadow-2xl border-4 border-white">
                 <img 
                    src={data.image.__image_url__} 
                    alt={data.image.__image_prompt__} 
                    className="w-full h-full object-cover"
                />
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFA500] mix-blend-overlay opacity-50 rounded-bl-full"></div>
            </div>
        </div>

        {/* Right Content */}
        <div className="w-1/2 p-16 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-[#4B0082] mb-12 border-b-2 border-[#FFA500] pb-4 inline-block w-fit">
                {data.title}
            </h2>

            <div className="space-y-8">
                {data.points.map((point, i) => (
                    <div key={i} className="flex items-center bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-[#8000FF] transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F7F5FF] flex items-center justify-center text-[#8000FF] font-bold mr-4 border border-[#8000FF]">
                            {i + 1}
                        </div>
                        <p className="text-lg text-slate-700 font-medium">{point}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};
export default SlideComponent;
