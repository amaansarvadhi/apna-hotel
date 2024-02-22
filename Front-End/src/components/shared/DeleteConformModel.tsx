/** @format */

import ConfirmDialog from "@/components/shared/ConfirmDialog";

export const DeleteConfirmPopup = ({
  drawer,
  status,
  conformDelete,
  deleteRow,
  title,
  setOpenDrawer,
}: any) => {
  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  // const handleConfirm = () => {
  //   conformDelete(); // Call the conformDelete function
  // };
  console.log();

  // // Reset the confirming state when the ConfirmDialog is closed
  // const handleDialogClose = () => {
  //   closeDrawer();
  // };

  return (
    <div>
      <ConfirmDialog
        isOpen={drawer}
        type="danger"
        title={title}
        confirmButtonColor="red-600"
        onClose={closeDrawer}
        onRequestClose={closeDrawer}
        onCancel={closeDrawer}
        onConfirm={conformDelete}
        loading={status}
      >
        <p>
          Are you sure you want to delete <b>{deleteRow}</b> {title}?
        </p>
      </ConfirmDialog>
    </div>
  );
};
