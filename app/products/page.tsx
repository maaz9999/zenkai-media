"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function ProductsPage() {
  useEffect(() => {
    redirect("/");
  }, []);
  return null;
}
