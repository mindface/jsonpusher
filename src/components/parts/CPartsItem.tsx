
import { Button } from "../../stories/Button/Button";

export type CPartsItemProps<T> = {
  item: T;
  itemType: "edit" | "delete" | "base";
  renderTitle: (item: T) => React.ReactNode;
  renderDetails?: (item: T) => React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  extra?: React.ReactNode;
};

export default function CPartsItem<T>({
  item,
  itemType,
  renderTitle,
  renderDetails,
  onEdit,
  onDelete,
  extra,
}: CPartsItemProps<T>) {
  const editButtonLabel = () => {
    return (itemType !== "delete" ) ? "view edit" : "close"
  };
  return (
    <div className="parts-item p-2">
      <div className="flex justify-between">
        <h4 className="next-plan-item__title pb-2">{renderTitle(item)}</h4>
        {renderDetails && <div>{renderDetails(item)}</div>}
        {extra}
        <div>
          {onEdit && <Button
            label={editButtonLabel()}
            onClick={onEdit}
            size="small"
          />}
          {onDelete && <Button label="削除" onClick={onDelete} />}
        </div>
      </div>
    </div>
  );
}
