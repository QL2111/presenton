import React from 'react';
import * as z from 'zod';

export const Schema = z.object({
  section_number: z.string().default("01"),
  title: z.string().default("Vue d'Ensemble"),
  subtitle: z.string().default("Introduction au problème et à l'opportunité."),
});

type SchemaType = z.infer<typeof Schema>;

const SlideComponent = ({ data }: { data: SchemaType }) => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-slate-900 text-white font-sans relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>

      <div className="max-w-4xl w-full text-center space-y-8 z-10">
        <div className="text-[12rem] leading-none font-bold text-white opacity-5 select-none">
            {data.section_number}
        </div>
        <div className="space-y-6 relative -mt-32">
            <h1 className="text-7xl font-black tracking-tight">{data.title}</h1>
            <p className="text-3xl text-gray-300 font-light max-w-2xl mx-auto">{data.subtitle}</p>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-12 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
export default SlideComponent;
