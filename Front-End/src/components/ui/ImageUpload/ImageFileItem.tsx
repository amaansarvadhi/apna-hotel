/** @format */

import { VscFilePdf, VscFileZip, VscFile } from "react-icons/vsc";

import type { CommonProps } from "../@types/common";

// const BYTE = 1000
// const getKB = (bytes: number) => Math.round(bytes / BYTE)

const FileIcon = ({ children }: CommonProps) => {
  return <span className="text-4xl">{children}</span>;
};

export interface FileItemProps extends CommonProps {
  file: File;
}

const ImageFileItem = (props: any) => {
  const { file, children } = props;
  // size
  const { type, name } = file;

  const renderThumbnail = () => {
    // const isImageFile = type.split('/')[0] === 'image'

    // if (isImageFile) {
    return (
      <img
        style={{ width: "100px" }}
        className="upload-file-image h-20"
        src={typeof file === "string" ? file : URL.createObjectURL(file)}
        alt={`file preview ${name}`}
      />
    );
    // }

    if (type === "application/zip") {
      return (
        <FileIcon>
          <VscFileZip />
        </FileIcon>
      );
    }

    if (type === "application/pdf") {
      return (
        <FileIcon>
          <VscFilePdf />
        </FileIcon>
      );
    }

    return (
      <FileIcon>
        <VscFile />
      </FileIcon>
    );
  };

  return (
    <div style={{ width: "100px" }} className="upload-file">
      <div className="flex">
        <div>{renderThumbnail()}</div>
        {/* <div>
                    <h6 className="upload-file-name">{name}</h6>
                    <span className="upload-file-size">{getKB(size)} kb</span>
                </div> */}
      </div>
      {children}
    </div>
  );
};

ImageFileItem.displayName = "ImageFileItem";

export default ImageFileItem;
