/** @format */

import { z } from "zod";

export const addCategorySchema = z.object({
  categoryName: z.coerce.string(),
});
