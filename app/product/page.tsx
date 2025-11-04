"use client";

import { useTranslation } from "react-i18next";

export default function ProductsPage() {
  const { t } = useTranslation();
  return <h1 className="text-3xl font-bold">{t("products")}</h1>;
}
