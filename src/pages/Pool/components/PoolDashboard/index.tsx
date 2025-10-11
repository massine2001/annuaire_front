import React, { useState } from "react";
import type { Pool } from "../../../../types/models";
import InfoTab from "../InfoTab";

import EmptyState from "./EmptyState";
import "./style.css";
import FilesTab from "../FilesTab";

type TabType = "info" | "members" | "invitations" | "documents";

const PoolDashboard = ({ pool }: { pool: Pool | null }) => {
  const [activeTab, setActiveTab] = useState<TabType>("info");

  if (!pool) {
    return <EmptyState />;
  }

  return (
    <div className="pool-dashboard">
      <header className="pool-dashboard__header">
        <h1 className="pool-dashboard__title">Espace {pool.name}</h1>
      </header>

      <nav className="pool-dashboard__tabs">
        <button
          className={`pool-dashboard__tab ${activeTab === "documents" ? "pool-dashboard__tab--active" : ""}`}
          onClick={() => setActiveTab("documents")}
        >
          Documents
        </button>
        <button
          className={`pool-dashboard__tab ${activeTab === "info" ? "pool-dashboard__tab--active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Informations
        </button>
        <button
          className={`pool-dashboard__tab ${activeTab === "members" ? "pool-dashboard__tab--active" : ""}`}
          onClick={() => setActiveTab("members")}
        >
          Membres
        </button>
        <button
          className={`pool-dashboard__tab ${activeTab === "invitations" ? "pool-dashboard__tab--active" : ""}`}
          onClick={() => setActiveTab("invitations")}
        >
          Invitations
        </button>

      </nav>

      <div className="pool-dashboard__content">
        {activeTab === "info" && <InfoTab poolId={pool.id} />}
        {activeTab === "documents" && <FilesTab poolId={pool.id} />}
     
      </div>
    </div>
  );
};

export default PoolDashboard;