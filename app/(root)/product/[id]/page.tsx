import ProductPage from "@/app/components/ProductPage";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return <ProductPage id={id} />;
}
