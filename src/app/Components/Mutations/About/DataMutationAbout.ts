/** @format */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAbout,
  deleteSocialLinks,
} from "../../server/actions/RenderComp/addAbout";

export default function useAboutMutations() {
  const queryClient = useQueryClient();

  const { mutateAsync: addData } = useMutation({
    mutationFn: createAbout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutData"] });
    },
  });
  const { mutateAsync: deleteSocial } = useMutation({
    mutationFn: deleteSocialLinks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutData"] });
    },
  });
  // const { mutateAsync: updateData } = useMutation({
  //   mutationFn: updateAbout,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["branchData"] });
  //   },
  // });

  return {
    addData,
    deleteSocial,
  };
}
