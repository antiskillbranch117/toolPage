import { useState } from "react";
import { Button, Input, Table, Alert, Card, Typography } from "antd";
import { LockOutlined, UnlockOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const { Title, Text } = Typography;

const SALT_LEN = 16;
const NONCE_LEN = 12;
const PBKDF2_ITERATIONS = 600_000;

async function deriveKey(password, salt) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
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

function b64ToBytes(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function decryptBlob(password, b64) {
  const blob = b64ToBytes(b64);
  const salt       = blob.slice(0, SALT_LEN);
  const nonce      = blob.slice(SALT_LEN, SALT_LEN + NONCE_LEN);
  const ciphertext = blob.slice(SALT_LEN + NONCE_LEN);
  const key = await deriveKey(password, salt);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: nonce }, key, ciphertext);
  return new TextDecoder().decode(plain);
}

const resultColumns = [
  { title: "Tool", dataIndex: "name", key: "name",
    render: (name, record) => <span>{record.emoji} {name}</span> },
  { title: "Username", dataIndex: "username", key: "username",
    render: (u) => u
      ? <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-mono">{u}</code>
      : <span className="text-gray-400 text-sm">—</span> },
  { title: "Password", dataIndex: "password", key: "password",
    render: (pw) => <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-mono">{pw}</code> },
];

export default function PasswordDecryptor({ embedded = false, tools = [], onDecrypt }) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [rows, setRows] = useState([]);

  const targets = tools.filter((t) => t.encryptedCredentials);
  const notConfigured = targets.length === 0;

  async function handleDecrypt() {
    if (!password || notConfigured) return;
    setStatus("loading");
    setErrorMsg("");
    setRows([]);

    try {
      const results = await Promise.all(
        targets.map(async (tool) => {
          const plaintext = await decryptBlob(password, tool.encryptedCredentials);
          const creds = JSON.parse(plaintext);
          return {
            key: tool.name,
            emoji: tool.emoji,
            name: tool.name,
            username: creds.username ?? null,
            password: creds.password,
          };
        })
      );
      setRows(results);
      setStatus("success");
      if (onDecrypt) {
        const map = Object.fromEntries(
          results.map(({ name, username, password }) => [name, { username, password }])
        );
        onDecrypt(map);
      }
    } catch {
      setStatus("error");
      setErrorMsg("Decryption failed — wrong password or corrupted data.");
    }
  }

  function handleReset() {
    setPassword("");
    setStatus("idle");
    setErrorMsg("");
    setRows([]);
  }

  const content = (
    <>
      {!embedded && (
        <Title level={2} className="flex items-center gap-2">
          <LockOutlined />
          <span>Dev Access Passwords</span>
        </Title>
      )}

      {status !== "success" && (
        <Card className={embedded ? "" : "mt-8"} style={{ maxWidth: 480 }}>
          <div className="flex flex-col gap-4">
            {notConfigured && (
              <Alert
                type="warning"
                showIcon
                message="No encrypted passwords configured"
                description="Paste a base64 encrypted blob into each tool's encryptedCredentials field in MainPage.jsx."
              />
            )}
            <Input.Password
              size="large"
              placeholder="Enter password"
              prefix={<LockOutlined className="text-gray-400" />}
              iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onPressEnter={handleDecrypt}
              disabled={status === "loading" || notConfigured}
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
              disabled={!password || notConfigured}
              block
            >
              Decrypt all ({targets.length})
            </Button>
          </div>
        </Card>
      )}

      {status === "success" && (
        <div className={embedded ? "" : "mt-8"}>
          <div className="flex items-center justify-between mb-4">
            <Text type="success" strong>
              <UnlockOutlined className="mr-1" />
              Decrypted — {rows.length} passwords
            </Text>
            <Button size="small" onClick={handleReset}>Lock</Button>
          </div>
          <Table
            columns={resultColumns}
            dataSource={rows}
            pagination={false}
            size="middle"
            bordered
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
