import { UploadOutlined } from "@ant-design/icons";
import { Cloudinary } from "@cloudinary/url-gen";
import { Button, message, Upload } from "antd";
import React from "react";

// Remove the UploadApi initialization as it's not provided in the code.
const DataSent = () => {
  const cld = new Cloudinary({ cloud: { cloudName: "ds3ly9ddb" } });
  const uploadPreset = "ml_default";
  // Use cld to generate the upload URL.
  const uploadUrl = cld
    .uploadApi({ uploadPreset })
    .unsignedUploadUrl("ml_default");
  return uploadUrl;
};

const props = {
  name: "file",
  // Use DataSent() to get the upload URL
  action: DataSent(),
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const UploadImageV2: React.FC = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);

export default UploadImageV2;
