import { useState, useEffect } from "react";
import { fetchPoolsByUserId, fetchPoolStats } from "../../api/poolPageApi";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";
import { Toast } from "../../components/Toast";
import Description from "./components/Description";
import QuickData from "./components/QuickData";
import PoolList from "./components/PoolList";
import PoolsEmptyState from "./components/PoolsEmptyState";
import CreatePoolModal from "./components/CreatePoolModal";
import type { Pool, PoolStats } from "../../types/models";
import './style.css';

interface PoolWithStats extends Pool {
  memberCount?: number;
  fileCount?: number;
  userRole?: string;
}

const Home = () => {
  const { toast, hideToast } = useToast();
  const { user } = useAuth();
  const [pools, setPools] = useState<PoolWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const loadPools = async () => {
    if (!user?.id) {
      setPools([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const userPools = await fetchPoolsByUserId(user.id);
      if (!Array.isArray(userPools)) {
        setPools([]);
        return;
      }

      const poolsWithStats = await Promise.all(
        userPools.map(async (pool) => {
          try {
            const stats: PoolStats = await fetchPoolStats(pool.id);
            return {
              ...pool,
              memberCount: stats.membersCount,
              fileCount: stats.filesCount,
              userRole: stats.accesses.find(
                (access) => access.user.id === user.id
              )?.role || "member",
            };
          } catch (error) {
            return {
              ...pool,
              memberCount: 0,
              fileCount: 0,
              userRole: "member",
            };
          }
        })
      );

      setPools(poolsWithStats);
    } catch (error) {
      setPools([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadPools();
    }
  }, [user?.id]);

  const handleCreateSuccess = () => {
    loadPools();
  };

  return (
    <div className="home">
      <div className="home-first-row">
        <Description />
        <QuickData />
      </div>

      <div className="home-pools-section">
        <div className="home-pools-header">
          <div>
            <h2 className="home-pools-title">Mes Pools</h2>
            <p className="home-pools-subtitle">
              Gérez vos espaces de collaboration
            </p>
          </div>
          {pools.length > 0 && !loading && (
            <button
              className="home-create-pool-button"
              onClick={() => setIsCreateModalOpen(true)}
            >
              ✨ Créer une pool
            </button>
          )}
        </div>

        {loading ? (
          <PoolList pools={[]} loading={true} />
        ) : pools.length === 0 ? (
          <PoolsEmptyState onCreatePool={() => setIsCreateModalOpen(true)} />
        ) : (
          <PoolList pools={pools} />
        )}
      </div>

      <CreatePoolModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
}

export default Home;
