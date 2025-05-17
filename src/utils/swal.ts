import Swal, { SweetAlertIcon } from "sweetalert2";

export const showSwal = (icon: SweetAlertIcon, title: string, text?: string) => {
  return Swal.fire({
    icon,
    title,
    text,
    allowOutsideClick: false,
    showConfirmButton: icon !== "info",
    ...(icon === "info" && {
      didOpen: () => {
        Swal.showLoading();
      }
    })
  });
};