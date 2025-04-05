import { Dialog } from "../../stories/Dialog/Dialog";

type DialogContentProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export const DialogContent = ({ label, children, className = "" }: DialogContentProps) => {
  return (
    <Dialog
      label={label}
      type="button"
      className={className}
      onChange={() => {}}
    >
      <div className="p-8">
        {children}
      </div>
    </Dialog>
  );
};