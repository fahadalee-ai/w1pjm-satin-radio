import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useApp } from "@/lib/store";

export function useRequireListener() {
  const { hydrated, user, guest } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && !user && !guest) navigate({ to: "/auth", replace: true });
  }, [hydrated, user, guest, navigate]);
}
