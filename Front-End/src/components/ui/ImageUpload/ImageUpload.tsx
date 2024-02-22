/** @format */

import classNames from "classnames";
import cloneDeep from "lodash/cloneDeep";
import {
  forwardRef,
  useRef,
  useState,
  useCallback,
  useEffect,
  ReactNode,
  ChangeEvent,
  MouseEvent,
} from "react";
import { RxUpload } from "react-icons/rx";
import * as XLSX from "xlsx";

// import {
//   setExcelTableData,
//   useAppDispatch,
// } from "@/views/project/ProjectDashboard/store";

import ImageFileItem from "./ImageFileItem";
import type { CommonProps } from "../@types/common";
import Button from "../Button/Button";
import CloseButton from "../CloseButton";
import { useConfig } from "../ConfigProvider";
import Notification from "../Notification/Notification";
import toast from "../toast/toast";
// import {
//   setExcelTableData,
//   useAppDispatch,
// } from "@/views/project/ProjectDashboard/store";

// import type { ReactNode, ChangeEvent, MouseEvent } from 'react'

export interface UploadProps extends CommonProps {
  accept?: string;
  beforeUpload?: (file: FileList | null, fileList: File[]) => boolean | string;
  disabled?: boolean;
  draggable?: boolean;
  fileList?: File[];
  multiple?: boolean;
  onChange?: (file: File[], fileList: File[]) => void;
  onFileRemove?: (file: File[]) => void;
  showList?: boolean;
  tip?: string | ReactNode;
  uploadLimit?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field?: any;
  onSheetChange?: (sheet: XLSX.WorkSheet) => void;
}

const filesToArray = (files: File[]) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.keys(files).map((key) => files[key as any]);

const ImageUpload = forwardRef<HTMLDivElement, UploadProps>((props, ref) => {
  const {
    accept,
    beforeUpload,
    disabled = false,
    draggable = false,
    fileList = [],
    multiple,
    onChange,
    onFileRemove,
    showList = true,
    tip,
    uploadLimit,
    children,
    className,
    field,
    ...rest
  } = props;

  const fileInputField = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<any>(fileList);

  // const dispatch = useAppDispatch();

  const [dragOver, setDragOver] = useState(false);

  const [excelData, setExcelData] = useState({
    header: [],
    data: [],
  });

  const { themeColor, primaryColorLevel } = useConfig();

  useEffect(() => {
    // const fileObjects = files.map((file) => {
    //   const { name, lastModified, webkitRelativePath, size } = file;
    //   return {
    //     name,
    //     lastModified,
    //     webkitRelativePath,
    //     size,
    //   };
    // });
  }, [files, excelData]);

  const triggerMessage = (msg: string | ReactNode = "") => {
    toast.push(
      <Notification type="danger" duration={2000}>
        {msg || "Upload Failed!"}
      </Notification>,
      {
        placement: "top-center",
      },
    );
  };

  const pushFile = (newFiles: FileList | null, file: File[]) => {
    if (newFiles) {
      for (const f of newFiles) {
        file.push(f);
      }
    }
    return file;
  };

  const addNewFiles = (newFiles: FileList | null) => {
    let file = cloneDeep(files);
    if (typeof uploadLimit === "number" && uploadLimit !== 0) {
      if (Object.keys(file).length >= uploadLimit) {
        if (uploadLimit === 1) {
          file.shift();
          file = pushFile(newFiles, file);
        }

        return filesToArray({ ...file });
      }
    }
    file = newFiles ? [...newFiles] : [];
    return filesToArray({ ...file });
  };

  const readExcelFile = (file: File): Promise<XLSX.WorkBook> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "binary" });
          resolve(workbook);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsBinaryString(file);
    });
  };

  const onNewFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles }: any = e.target;

    if (typeof newFiles === "string") {
      setFiles(newFiles);
      return;
    }

    let result: boolean | string = true;

    if (beforeUpload) {
      result = beforeUpload(newFiles, files);

      if (result === false) {
        triggerMessage();
        return;
      }

      if (typeof result === "string" && result.length > 0) {
        triggerMessage(result);
        return;
      }
    }

    if (result) {
      const updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      onChange?.(updatedFiles, files);

      if (newFiles && newFiles.length > 0) {
        try {
          const file = newFiles[0];

          if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ) {
            const workbook = await readExcelFile(file);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            props.onSheetChange?.(sheet);
            const header: any = XLSX.utils.sheet_to_json(sheet, {
              header: 1,
            })[0];
            const data: any = XLSX.utils.sheet_to_json(sheet, {
              header: header,
            });
            setExcelData({ header, data });
          }
        } catch (error) {
          console.error("Error reading Excel file:", error);
        }
      }
    }
  };

  const removeFile = (fileIndex: number) => {
    if (files.length > 1) {
      setFiles([]);
      return;
    }
    const deletedFileList = files.filter(
      (_: any, index: any) => index !== fileIndex,
    );
    setFiles(deletedFileList);
    onFileRemove?.(deletedFileList);
  };

  const triggerUpload = (e: MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      fileInputField.current?.click();
    }
    e.stopPropagation();
  };

  const renderChildren = () => {
    if (!draggable && !children) {
      return (
        <Button
          disabled={disabled}
          className="flex items-center mt-2"
          style={{
            height: "40px",
            border: `2px solid rgba(99, 102, 241, var(--tw-border-opacity))`,
            color: `rgba(99, 102, 241, var(--tw-border-opacity))`,
          }}
          onClick={(e) => e.preventDefault()}
        >
          <RxUpload
            style={{
              fontSize: "14px",
              marginRight: "6px",
              color: `rgba(99, 102, 241, var(--tw-border-opacity))`,
            }}
          />
          Upload file
        </Button>
      );
    }

    if (draggable && !children) {
      return <span>Choose a file or drag and drop here</span>;
    }

    return children;
  };

  const handleDragLeave = useCallback(() => {
    if (draggable) {
      setDragOver(false);
    }
  }, [draggable]);

  const handleDragOver = useCallback(() => {
    if (draggable && !disabled) {
      setDragOver(true);
    }
  }, [draggable, disabled]);

  const handleDrop = useCallback(() => {
    if (draggable) {
      setDragOver(false);
    }
  }, [draggable]);

  const draggableProp = {
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
  };

  const draggableEventFeedbackClass = `border-${themeColor}-${primaryColorLevel}`;

  const uploadClass = classNames(
    "upload",
    draggable && `upload-draggable`,
    draggable && !disabled && `hover:${draggableEventFeedbackClass}`,
    draggable && disabled && "disabled",
    dragOver && draggableEventFeedbackClass,
    className,
  );

  const uploadInputClass = classNames("upload-input", draggable && `draggable`);

  return (
    <div style={{ display: "flex" }}>
      <div
        ref={ref}
        className={uploadClass}
        {...(draggable ? draggableProp : { onClick: triggerUpload })}
        {...rest}
      >
        <input
          ref={fileInputField}
          className={uploadInputClass}
          type="file"
          disabled={disabled}
          multiple={multiple}
          accept={accept}
          title=""
          value=""
          onChange={onNewFileUpload}
          {...field}
          {...rest}
        ></input>
        {renderChildren()}
      </div>
      {tip}
      {showList && (
        <div className="ml-6">
          {typeof files === "string" ? (
            <>
              {/* Handle case when files is a string */}
              <CloseButton
                style={{ width: "110px" }}
                className="flex justify-end mb-2 mt-0"
                onClick={() => removeFile(0)}
              />
              <ImageFileItem key={files} file={files} />
            </>
          ) : (
            files?.map((file: any, index: any) => (
              <>
                <CloseButton
                  style={{ width: "110px" }}
                  className="flex justify-end mb-2 mt-0"
                  onClick={() => removeFile(index)}
                />
                <ImageFileItem key={file.name + index} file={file} />
              </>
            ))
          )}
        </div>
      )}
    </div>
  );
});

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
