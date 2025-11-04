import { useState } from "react";
import ImportFileComponent from "../import_file/import_file";
import type { FilePlayersMap } from "../../lib/ffhgParser";
import { getTotalPlayers } from "../../lib/ffhgParser";
import PlayerTableComponent from "../player_table/player_table.component";

export default function CreateTeamComponent() {
  const [filePlayersMap, setFilePlayersMap] = useState<FilePlayersMap>(
    new Map(),
  );

  const handleParsedChange = (map: FilePlayersMap) => {
    console.log("Map reçue depuis enfant :", map);
    setFilePlayersMap(map);
  };

  return (
    <div>
      <div>
        <ImportFileComponent onParsedChange={handleParsedChange} />
        <div style={{ marginTop: 20 }}>
          <strong>Total des joueurs uniques :</strong>{" "}
          {getTotalPlayers(filePlayersMap)}
        </div>
      </div>
      <div>
        <PlayerTableComponent playersMap={filePlayersMap} />
      </div>
    </div>
  );
}
