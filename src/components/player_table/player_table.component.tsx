import { useEffect, useState } from "react";
import { Table, Input, InputNumber, Select, Button } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import type { FilePlayersMap, Player } from "../../lib/ffhgParser";

type PlayerTableProps = {
  playersMap: FilePlayersMap;
};

// Même type que Player mais avec une clé pour le tableau AntD
type PlayerWithKey = Player & { key: string };

// Helper: fusionne les joueurs de tous les fichiers et déduplique par licence
function mergePlayers(playersMap: FilePlayersMap): PlayerWithKey[] {
  const seenLicences = new Set<string>();
  const merged: PlayerWithKey[] = [];

  for (const [file, filePlayers] of playersMap.entries()) {
    for (const p of filePlayers) {
      const licence = (p.licence ?? "").trim();
      if (licence !== "") {
        if (seenLicences.has(licence)) continue;
        seenLicences.add(licence);
      }
      merged.push({
        ...p,
        key: p.id ?? `${file.name}-${p.lastName}-${p.firstName}`,
      });
    }
  }

  return merged;
}

export default function PlayerTableComponent({ playersMap }: PlayerTableProps) {
  // Construit une liste unique de joueurs (fusion de tous les fichiers) dédupliquée par licence
  const [players, setPlayers] = useState<PlayerWithKey[]>(() =>
    mergePlayers(playersMap),
  );

  useEffect(() => {
    setPlayers(mergePlayers(playersMap));
  }, [playersMap]);

  const updatePlayerField = (
    playerId: string,
    field: keyof Player,
    value: Player[typeof field],
  ) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, [field]: value } : p)),
    );
  };

  const addPlayer = () => {
    setPlayers((prev) => {
      const newId = `new-${Date.now()}-${prev.length + 1}`;
      const newPlayer: PlayerWithKey = {
        id: newId,
        key: newId,
        firstName: "",
        lastName: "",
        position: "A",
        licence: "",
        birthYear: undefined,
        number: undefined,
        captainMark: undefined,
        line: undefined,
      };
      return [...prev, newPlayer];
    });
  };

  const deletePlayer = (playerId: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== playerId));
  };

  return (
    <div style={{ maxWidth: "90%", overflowX: "auto" }}>
      <div style={{ width: "100%", marginTop: 16 }}>
        <Table<PlayerWithKey>
          columns={(() => {
            const columns: ColumnsType<PlayerWithKey> = [
              {
                title: "Licence",
                dataIndex: "licence",
                key: "licence",
                width: 140,
                ellipsis: true,
                render: (value, record) => (
                  <Input
                    value={value}
                    onChange={(e) =>
                      updatePlayerField(record.id, "licence", e.target.value)
                    }
                    size="small"
                  />
                ),
              },
              {
                title: "Prénom",
                dataIndex: "firstName",
                key: "firstName",
                width: 160,
                ellipsis: true,
                render: (value, record) => (
                  <Input
                    value={value}
                    onChange={(e) =>
                      updatePlayerField(record.id, "firstName", e.target.value)
                    }
                    size="small"
                  />
                ),
              },
              {
                title: "Nom",
                dataIndex: "lastName",
                key: "lastName",
                width: 160,
                ellipsis: true,
                render: (value, record) => (
                  <Input
                    value={value}
                    onChange={(e) =>
                      updatePlayerField(record.id, "lastName", e.target.value)
                    }
                    size="small"
                  />
                ),
              },
              {
                title: "Année de naissance",
                dataIndex: "birthYear",
                key: "birthYear",
                width: 100,
                sorter: (a, b) =>
                  (a.birthYear ?? Infinity) - (b.birthYear ?? Infinity),
                sortDirections: ["ascend", "descend"],
                render: (value, record) => (
                  <InputNumber
                    value={value}
                    onChange={(val) =>
                      updatePlayerField(
                        record.id,
                        "birthYear",
                        val ?? undefined,
                      )
                    }
                    min={1900}
                    max={2100}
                    size="small"
                    style={{ width: "100%" }}
                  />
                ),
              },
              {
                title: "Numéro",
                dataIndex: "number",
                key: "number",
                width: 60,
                sorter: (a, b) =>
                  (a.number ?? Infinity) - (b.number ?? Infinity),
                defaultSortOrder: "ascend",
                sortDirections: ["ascend", "descend"],
                render: (value, record) => (
                  <InputNumber
                    value={value}
                    onChange={(val) =>
                      updatePlayerField(record.id, "number", val ?? undefined)
                    }
                    min={0}
                    max={99}
                    size="small"
                    style={{ width: 60 }}
                  />
                ),
              },
              {
                title: "Poste",
                dataIndex: "position",
                key: "position",
                width: 60,
                render: (value, record) => (
                  <Select
                    value={value}
                    onChange={(val) =>
                      updatePlayerField(record.id, "position", val)
                    }
                    size="small"
                    style={{ width: 60 }}
                    options={[
                      { label: "G", value: "G" },
                      { label: "D", value: "D" },
                      { label: "A", value: "A" },
                    ]}
                  />
                ),
              },
              {
                title: "Capitaine",
                dataIndex: "captainMark",
                key: "captainMark",
                width: 60,
                render: (value, record) => (
                  <Select
                    allowClear
                    value={value}
                    onChange={(val) =>
                      updatePlayerField(
                        record.id,
                        "captainMark",
                        (val as Player["captainMark"]) ?? undefined,
                      )
                    }
                    size="small"
                    style={{ width: 60 }}
                    options={[
                      { label: "C", value: "C" },
                      { label: "A", value: "A" },
                    ]}
                  />
                ),
              },
              {
                title: "",
                key: "actions",
                width: 10,
                render: (_, record) => (
                  <DeleteOutlined
                    onClick={() => deletePlayer(record.id)}
                    aria-label="Delete player"
                    role="button"
                  />
                ),
              },
            ];
            return columns;
          })()}
          dataSource={players}
          pagination={false}
          rowKey="id"
          size="small"
          tableLayout="fixed"
          scroll={{ x: true }}
        />

        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={addPlayer}
          style={{ marginTop: 8 }}
          block
        >
          Ajouter une ligne
        </Button>
      </div>
    </div>
  );
}
