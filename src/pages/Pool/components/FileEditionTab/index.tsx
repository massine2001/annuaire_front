import React, { useState } from "react";
import ModeSelector, { type EditionMode } from "./components/ModeSelector";
import AddDocument from "./components/AddDocument";
import DeleteDocument from "./components/DeleteDocument";
import ModifyDocument from "./components/ModifyDocument";

type Props = {
    poolId: number;
};

const FileEditionTab = ({ poolId }: Props) => {
    const [mode, setMode] = useState<EditionMode>("add");

    return (
        <React.Fragment>
            <ModeSelector mode={mode} onModeChange={setMode} />  
            {mode === "add" && <AddDocument poolId={poolId} />}
            {mode === "edit" && <ModifyDocument poolId={poolId} />}
            {mode === "delete" && <DeleteDocument poolId={poolId} />}
        </React.Fragment>
    )
}

export default FileEditionTab;