import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export function useUser() {
  const router = useRouter();
  const { mutate: deleteUser } = api.user.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return { deleteUser };
}
