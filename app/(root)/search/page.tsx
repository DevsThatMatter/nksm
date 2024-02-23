export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const valuesString = Object.values(searchParams).join(", ");

  return <div>Showing related products for {valuesString}</div>;
}
