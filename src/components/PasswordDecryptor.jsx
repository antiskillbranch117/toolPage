import { useState } from "react";
import { Button, Input, Table, Alert, Card, Typography } from "antd";
import { LockOutlined, UnlockOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const { Title, Text } = Typography;

const SALT_LEN = 16;
const NONCE_LEN = 12;
const PBKDF2_ITERATIONS = 600_000;
const ENC_FILE_URL = "/PasswordForDevAccess.csv.enc";

async function deriveKey(password, salt) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
}

function parseCSV(text) {
  const lines = text.trim().split("\n").filter(Boolean);
  if (lines.length === 0) return { columns: [], rows: [] };

  const parse = (line) =>
    line.split(",").map((cell) => cell.trim().replace(/^"|"$/g, ""));

  const headers = parse(lines[0]);
  const dataLines = lines.slice(1);

  const columns = headers.map((h, i) => ({
    title: h || `Col ${i + 1}`,
    dataIndex: `col${i}`,
    key: `col${i}`,
    ellipsis: true,
  }));

  const rows = dataLines.map((line, rowIdx) => {
    const cells = parse(line);
    const row = { key: rowIdx };
    headers.forEach((_, i) => {
      row[`col${i}`] = cells[i] ?? "";
    });
    return row;
  });

  return { columns, rows };
}

export default function PasswordDecryptor({ embedded = false }) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [tableData, setTableData] = useState(null);

  async function handleDecrypt() {
    if (!password) return;
    setStatus("loading");
    setErrorMsg("");
    setTableData(null);

    try {
      const res = await fetch(ENC_FILE_URL);
      if (!res.ok) throw new Error("Failed to fetch encrypted file.");
      const buffer = await res.arrayBuffer();
      const data = new Uint8Array(buffer);

      const salt = data.slice(0, SALT_LEN);
      const nonce = data.slice(SALT_LEN, SALT_LEN + NONCE_LEN);
      const ciphertext = data.slice(SALT_LEN + NONCE_LEN);

      const key = await deriveKey(password, salt);
      const plainBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: nonce },
        key,
        ciphertext
      );

      const text = new TextDecoder().decode(plainBuffer);
      setTableData(parseCSV(text));
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setErrorMsg(
        e.message === "Failed to fetch encrypted file."
          ? e.message
          : "Decryption failed — wrong password or corrupted file."
      );
    }
  }

  function handleReset() {
    setPassword("");
    setStatus("idle");
    setErrorMsg("");
    setTableData(null);
  }

  const content = (
    <>
      {!embedded && (
        <>
          <Title level={2} className="flex items-center gap-2">
            <LockOutlined />
            <span>Dev Access Passwords</span>
          </Title>
          <Text type="secondary">
            Enter the team password to view credentials stored in{" "}
            <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-mono">
              PasswordForDevAccess.csv.enc
            </code>
          </Text>
        </>
      )}

      {status !== "success" && (
        <Card className={embedded ? "" : "mt-8"} style={{ maxWidth: 480 }}>
          <div className="flex flex-col gap-4">
            <Input.Password
              size="large"
              placeholder="Enter password"
              prefix={<LockOutlined className="text-gray-400" />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onPressEnter={handleDecrypt}
              disabled={status === "loading"}
            />
            {status === "error" && (
              <Alert type="error" message={errorMsg} showIcon />
            )}
            <Button
              type="primary"
              size="large"
              icon={<UnlockOutlined />}
              loading={status === "loading"}
              onClick={handleDecrypt}
              disabled={!password}
              block
            >
              Decrypt
            </Button>
          </div>
        </Card>
      )}

      {status === "success" && tableData && (
        <div className={embedded ? "" : "mt-8"}>
          <div className="flex items-center justify-between mb-4">
            <Text type="success" strong>
              <UnlockOutlined className="mr-1" />
              Decrypted successfully — {tableData.rows.length} entries
            </Text>
            <Button size="small" onClick={handleReset}>
              Lock
            </Button>
          </div>
          <Table
            columns={tableData.columns}
            dataSource={tableData.rows}
            pagination={false}
            size="middle"
            bordered
            scroll={{ x: true }}
          />
        </div>
      )}
    </>
  );

  if (embedded) return content;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <div className="max-w-6xl mx-auto px-12 py-12">{content}</div>
    </div>
  );
}
