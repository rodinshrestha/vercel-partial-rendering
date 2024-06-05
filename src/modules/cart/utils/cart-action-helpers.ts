import { revalidatePath } from "next/cache";

export const revalidateCart = () => {
  revalidatePath("cart");
};
