import React, { useCallback, useMemo, useState } from "react";
import { DataList } from "../../components/DataList";
import { fetchAllPools } from "../../api/poolPageApi";
import { useFetch } from "../../hooks/useFetch";
import type { Pool } from "../../types/models";
import PoolDashboard from "./components/PoolDashboard";
import './style.css'
import { useMediaQuery } from "../../hooks/useMediaQuery";
const PoolPage = () => {
  const fetcher = useCallback(() => fetchAllPools(), []);
  const { data: pools = [], loading, error } = useFetch<Pool[]>(fetcher);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedPool: Pool | null = useMemo(
    () => (pools ?? []).find(p => p.id === selectedId) ?? null,
    [pools, selectedId]
  );

  return (
    <div className={isDesktop ? 'dcontainer' : 'mcontainer'}>
      <DataList
        items={pools}
        loading={loading}
        error={error}
        selectedId={selectedId}
        onSelect={setSelectedId}
        config={{
          title: "Liste des Pools",
          searchPlaceholder: "Rechercher une pool...",
          actionButtonText: "Créer une Pool",
          onActionClick: () => console.log("Créer une nouvelle pool"),
          getSearchText: (pool) => pool.name,
          getDisplayText: (pool) => pool.name,
        }}
      />
      <PoolDashboard pool={selectedPool} />
    </div>
  )
}

export default PoolPage;