import { memo, useMemo } from "react";
import type { File } from "../../../../../types/models";
import { formatDate, getExt } from "../utils/format";

type Props = {
  file: File;
  onPreview: (id: number, name: string) => void;
  onDownload: (id: number, name: string) => void;
  isPreviewing: boolean;
  isDownloading: boolean;
};

export const FileRow = memo(({ file, onPreview, onDownload, isPreviewing, isDownloading }: Props) => {
  const ext = useMemo(() => (getExt(file.name) || "").slice(0, 3).toUpperCase(), [file.name]);

  return (
    <div className="files-tab__file">
      <div className="files-tab__file-icon">{ext}</div>

      <div className="files-tab__file-info">
        <div className="files-tab__file-name">{file.name}</div>
        <div className="files-tab__file-meta">
          <span>{file.userUploader?.firstName} {file.userUploader?.lastName}</span>
          <span>•</span>
          <span>{formatDate(file.createdAt)}</span>
        </div>
      </div>

      <div className="files-tab__file-actions">
        <button
          className="files-tab__action-btn"
          title="Prévisualiser"
          onClick={() => onPreview(file.id, file.name)}
          disabled={isPreviewing}
        >
          {isPreviewing ? "⏳" : "👁"}
        </button>
        <button
          className="files-tab__action-btn"
          title="Télécharger"
          onClick={() => onDownload(file.id, file.name)}
          disabled={isDownloading}
        >
          {isDownloading ? "⏳" : "↓"}
        </button>
      </div>
    </div>
  );
});
FileRow.displayName = "FileRow";
