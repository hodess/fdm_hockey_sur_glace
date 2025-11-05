import "./import_file.scss";
import { useState } from "react";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Upload, Space, Spin, message } from "antd";
import type { UploadFile, UploadProps } from "antd";
import {
  extractTextFromPDF,
  parseRosterFFHG,
  type FilePlayersMap,
} from "../../lib/ffhgParser";

export type Player = ReturnType<typeof parseRosterFFHG>[number];

type ImportFileComponentProps = {
  onParsedChange?: (map: FilePlayersMap) => void;
};

export default function ImportFileComponent({
  onParsedChange,
}: ImportFileComponentProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [filePlayersMap, setFilePlayersMap] = useState<FilePlayersMap>(
    new Map(),
  );

  const props: UploadProps = {
    beforeUpload: async (file: File) => {
      setLoading(true);
      try {
        const text = await extractTextFromPDF(file);
        const players = parseRosterFFHG(text);

        setFilePlayersMap((prev) => {
          const next = new Map(prev);
          next.set(file, players);
          onParsedChange?.(next);
          return next;
        });
        message.success(`${file.name} importé avec succès`);
      } catch (err) {
        console.error(err);
        message.error(`Erreur lors du parsing du fichier : ${file.name}`);
      } finally {
        setLoading(false);
      }
      return false; // empêche le vrai upload
    },
    onRemove: (file) => {
      setFilePlayersMap((prev) => {
        const next = new Map(prev);
        next.delete(file.originFileObj as File);
        onParsedChange?.(next);
        return next;
      });
    },
    onChange(info) {
      setFileList(info.fileList);
    },
    fileList,
    itemRender: (_originNode, file, _files, { remove }) => {
      return (
        <div key={file.uid} className="file-item">
          <span style={{ flex: 1 }}>{file.name}</span>

          <span style={{ color: "#888", margin: "0 8px" }}>
            {filePlayersMap.get(file.originFileObj as File)?.length} joueurs
          </span>

          <DeleteOutlined
            onClick={() => remove?.()}
            style={{ color: "#ff4d4f", cursor: "pointer" }}
          />
        </div>
      );
    },
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Upload {...props}>
          <Button icon={<UploadOutlined />} disabled={loading}>
            {loading ? "Chargement..." : "Choisir un fichier"}
          </Button>
        </Upload>
        {loading && <Spin />}
      </Space>
    </div>
  );
}
