type AvailabilityRow = {
  sanity_product_id: string;
  sanity_variant_id: string;
  available: boolean;
};

export type CatalogAvailability = Map<string, Map<string, boolean>>;

export function isCatalogAvailabilityConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_MERCADINHO_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_MERCADINHO_SUPABASE_PUBLISHABLE_KEY,
  );
}

export async function getCatalogAvailability(
  ids: string[],
): Promise<CatalogAvailability | null | undefined> {
  const url = process.env.NEXT_PUBLIC_MERCADINHO_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_MERCADINHO_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key || ids.length === 0) return undefined;

  try {
    const response = await fetch(
      new URL('/rest/v1/rpc/get_catalog_availability', url),
      {
        method: 'POST',
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
        headers: {
          apikey: key,
          'Content-Type': 'application/json',
          ...(key.startsWith('eyJ') ? { Authorization: 'Bearer ' + key } : {}),
        },
        body: JSON.stringify({ product_ids: ids }),
      },
    );
    if (!response.ok)
      throw new Error('Stock lookup failed: ' + response.status);

    const result = new Map<string, Map<string, boolean>>();
    const rows = (await response.json()) as AvailabilityRow[];
    for (const row of rows) {
      const variants = result.get(row.sanity_product_id) ?? new Map();
      variants.set(row.sanity_variant_id, row.available);
      result.set(row.sanity_product_id, variants);
    }

    return result;
  } catch (error) {
    console.warn('Failed to retrieve Mercadinho stock:', error);

    return null;
  }
}
