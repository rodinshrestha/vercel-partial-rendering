'use server';
import { revalidateTag } from 'next/cache';

export default async function revalidateDeliveryAddress() {
  revalidateTag('delivery-addresses');
}
