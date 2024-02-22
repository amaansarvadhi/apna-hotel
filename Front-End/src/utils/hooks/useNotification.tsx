import { toast, Notification } from "@/components/ui";

export const useNotification = () => {
  const displayNotification = (title: any, type: any) => {
    toast.push(<Notification title={title} type={type} duration={2500} />, {
      placement: "top-end",
    });
  };

  return displayNotification;
};
