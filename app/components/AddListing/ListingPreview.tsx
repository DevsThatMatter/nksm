import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import { CardContent, Card } from "@/app/components/ui/card";
import { Toaster } from "@/app/components/ui/toaster";
import { useToast } from "@/app/components/ui/use-toast";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { PreviewInputs } from "./Form";
import { addProductFromListing } from "@/lib/actions/add-listing.action";
import { useRouter } from "next/navigation";
const ListingPreview = ({
  data,
  userId,
  hidePreview,
}: {
  data: PreviewInputs;
  userId: string;
  hidePreview: () => void;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  async function onSubmit() {
    const {
      iname,
      quantity,
      category,
      description,
      price,
      condition,
      images,
      negotiate,
    } = data;

    const res = await addProductFromListing({
      iname,
      quantity,
      category,
      description,
      price,
      images,
      negotiate: negotiate === "Yes" ? true : false,
      condition,
      userId: userId,
    });
    if (res.success) {
      toast({
        title: res.message,
        description: "Your product has been added to the marketplace",
      });
      setTimeout(() => {
        router.push(`/product/${res.id}`);
      }, 1000);
    } else {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }
  }
  return (
    <>
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              This is how your product will be displayed:
            </AlertDialogTitle>
            <AlertDialogDescription>
              You can still make the changes after previewing
            </AlertDialogDescription>
            <Card>
              <CardContent className="relative flex items-start gap-6 p-6 @container">
                <div className="">
                  <Image
                    alt="Product Image"
                    className="aspect-square overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
                    height={200}
                    src={data.images.length > 0 ? data.images[0] : ""}
                    width={200}
                  />
                </div>
                <div className="grid gap-2 text-base">
                  <h2 className="line-clamp-2 max-w-48 overflow-ellipsis font-extrabold leading-tight md:text-xl">
                    {data.iname}
                  </h2>
                  <p className="line-clamp-3 max-w-48 overflow-ellipsis text-base leading-normal">
                    {data.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold">₹{data.price}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRightIcon className="h-5 w-5 fill-muted" />
                    <span className="text-sm text-muted-foreground">
                      {data.condition}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={hidePreview}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </>
  );
};
export default ListingPreview;
