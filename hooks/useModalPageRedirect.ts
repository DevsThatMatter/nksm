"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export async function ModalPageRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.back();
  }, [router]);
  return null;
}
