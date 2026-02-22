import z from "zod";

export const postSchema = z.object({
  title: z.string().min(5).max(50),
  content: z.string().min(10),
  image: z.instanceof(File).optional(),
  componentName: z.string().min(3).max(30),
  tags: z.array(z.string().min(2).max(20)).optional(),
});
